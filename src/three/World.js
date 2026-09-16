import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const C = { cyan: 0x29e7ff, blue: 0x4b7cff, violet: 0x7c4dff, pink: 0xff4fd8, orange: 0xffa438, lime: 0x8dff72, yellow: 0xffef65, white: 0xf7fbff };
const palette = [C.cyan, C.violet, C.pink, C.orange, C.lime, C.yellow];

function mat(color, glow = 1.2) {
  return new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: glow, roughness: .3, metalness: .25 });
}
function line(a, b, color = C.cyan, opacity = .35) {
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
}
function label(text, color = '#fff', size = 26) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `700 ${size}px Inter, Arial`;
  const w = Math.max(120, Math.ceil(ctx.measureText(text).width + 30));
  canvas.width = w; canvas.height = size + 26;
  ctx.font = `700 ${size}px Inter, Arial`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = color;
  ctx.fillText(text, w / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  s.scale.set(w / 95, canvas.height / 95, 1);
  return s;
}

export class AIWorld {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x07121f);
    this.scene.fog = new THREE.FogExp2(0x07121f, .035);
    this.camera = new THREE.PerspectiveCamera(46, 1, .1, 100);
    this.camera.position.set(0, 1, 9);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; this.controls.enablePan = false; this.controls.minDistance = 4; this.controls.maxDistance = 16;
    this.controls.target.set(0, .25, 0);
    this.root = new THREE.Group(); this.scene.add(this.root);
    this.clock = new THREE.Clock(); this.effects = []; this.interactive = [];
    this.raycaster = new THREE.Raycaster(); this.pointer = new THREE.Vector2();
    this.neuronParams = { inputA: .7, inputB: .35, weightA: 1.2, weightB: -.6, bias: .15 };
    this.tokenText = 'Artificial intelligence is amazing.'; this.generationSpeed = 1.1; this.denoise = 0;
    this.setupWorld(); this.bind(); this.resize(); this.ready = Promise.resolve(); this.animate();
  }

  setupWorld() {
    this.scene.add(new THREE.HemisphereLight(0xa9efff, 0x130d2f, 1.8));
    const key = new THREE.DirectionalLight(0xffffff, 3.2); key.position.set(4, 7, 5); key.castShadow = true; this.scene.add(key);
    const a = new THREE.PointLight(C.cyan, 16, 16); a.position.set(-4, 2, 3); this.scene.add(a);
    const b = new THREE.PointLight(C.pink, 12, 14); b.position.set(4, 1, 1); this.scene.add(b);
    const count = innerWidth < 700 ? 90 : 180, pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { const r = 20 * Math.cbrt(Math.random()), t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1); pos[i*3] = r*Math.sin(p)*Math.cos(t); pos[i*3+1] = r*Math.cos(p); pos[i*3+2] = r*Math.sin(p)*Math.sin(t); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.stars = new THREE.Points(g, new THREE.PointsMaterial({ size: .045, color: 0x65dfff, transparent: true, opacity: .42 })); this.scene.add(this.stars);
    const grid = new THREE.GridHelper(36, 36, 0x2a7ea0, 0x143249); grid.position.y = -2; grid.material.opacity = .16; grid.material.transparent = true; this.scene.add(grid);
  }

  bind() {
    addEventListener('resize', () => this.resize());
    this.renderer.domElement.addEventListener('pointermove', e => {
      const r = this.renderer.domElement.getBoundingClientRect(); this.pointer.set(((e.clientX-r.left)/r.width)*2-1, -((e.clientY-r.top)/r.height)*2+1);
      if (this.robotHead) { this.robotHead.rotation.y = this.pointer.x * .24; this.robotHead.rotation.x = -this.pointer.y * .1; }
    });
    this.renderer.domElement.addEventListener('click', e => {
      const r = this.renderer.domElement.getBoundingClientRect(); this.pointer.set(((e.clientX-r.left)/r.width)*2-1, -((e.clientY-r.top)/r.height)*2+1);
      this.raycaster.setFromCamera(this.pointer, this.camera); const hit = this.raycaster.intersectObjects(this.interactive, true)[0];
      if (!hit) return; let o = hit.object; while (o.parent && !o.userData.action && o !== this.root) o = o.parent; o.userData.action?.();
    });
  }

  resize() { const w = this.container.clientWidth || innerWidth, h = this.container.clientHeight || innerHeight; this.renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 700 ? 1.4 : 1.8)); this.renderer.setSize(w, h, false); this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); }
  clear() { this.effects = []; this.interactive = []; this.network = null; this.pipeline = null; this.attentionNodes = null; this.diffusion = null; this.generation = null; this.neuron = null; while (this.root.children.length) { const o = this.root.children.pop(); o.traverse(n => { n.geometry?.dispose?.(); if (n.material && !n.material.map) n.material.dispose?.(); }); } }

  sphere(p, color, r = .28, text = '') { const g = new THREE.Group(); g.position.copy(p); const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 18), mat(color, 1.7)); m.castShadow = true; g.add(m); if (text) { const s = label(text); s.position.y = r + .38; g.add(s); } this.root.add(g); return g; }
  box(p, text, color, scale = 1) { const g = new THREE.Group(); g.position.copy(p); const m = new THREE.Mesh(new THREE.BoxGeometry(1.45*scale, .68*scale, .36*scale), mat(color, .65)); m.geometry.translate(0,0,0); m.castShadow = true; g.add(m); const s = label(text, '#fff', 23); s.position.z = .25; s.scale.multiplyScalar(.62*scale); g.add(s); this.root.add(g); return g; }
  connect(a, b, color = C.cyan, opacity = .3) { const l = line(a.position || a, b.position || b, color, opacity); this.root.add(l); return l; }

  createRobot(scale = 1) {
    const g = new THREE.Group(), white = new THREE.MeshStandardMaterial({ color: 0xe8f8ff, roughness: .24, metalness: .55 }), dark = new THREE.MeshStandardMaterial({ color: 0x0b1830, roughness: .2, metalness: .5 });
    const body = new THREE.Mesh(new THREE.SphereGeometry(.92, 32, 24), white); body.scale.set(1,.95,.72); g.add(body);
    const core = new THREE.Mesh(new THREE.SphereGeometry(.23, 24, 18), mat(C.cyan, 3)); core.position.set(0,-.08,.69); g.add(core);
    const head = new THREE.Group(); head.position.y = 1.1; g.add(head); const skull = new THREE.Mesh(new THREE.BoxGeometry(1.35,.8,.7), white); skull.scale.set(1,1,.9); head.add(skull); const face = new THREE.Mesh(new THREE.PlaneGeometry(1.04,.5), dark); face.position.z = .36; head.add(face);
    const eyeGeo = new THREE.SphereGeometry(.09, 16, 12), eyeMat = mat(C.cyan, 4), e1 = new THREE.Mesh(eyeGeo, eyeMat), e2 = new THREE.Mesh(eyeGeo, eyeMat); e1.position.set(-.25,.02,.39); e2.position.set(.25,.02,.39); head.add(e1,e2);
    const armGeo = new THREE.CapsuleGeometry(.1,.6,5,10), l = new THREE.Mesh(armGeo, white), r = new THREE.Mesh(armGeo, white); l.position.set(-.9,0,0); l.rotation.z = -.5; r.position.set(.9,0,0); r.rotation.z = .5; g.add(l,r); g.scale.setScalar(scale);
    this.effects.push(t => { g.position.y += Math.sin(t*1.7)*.0015; core.scale.setScalar(1+Math.sin(t*3)*.05); const blink = Math.sin(t*.7)>.988 ? .12 : 1; e1.scale.y = blink; e2.scale.y = blink; });
    this.robotHead = head; return g;
  }

  showHome(onEnter) {
    this.clear(); this.controls.enabled = false; this.camera.position.set(0,.8,9); this.controls.target.set(0,.3,0);
    const robot = this.createRobot(1.15); robot.position.set(1.9,.05,0); robot.userData.action = () => { robot.scale.multiplyScalar(1.08); this.tweenCamera(new THREE.Vector3(1.9,.7,3.1), new THREE.Vector3(1.9,.35,0)); setTimeout(onEnter, 560); }; this.interactive.push(robot); this.root.add(robot);
    for (let i=0;i<4;i++){ const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1+i*.42,.018,8,96), new THREE.MeshBasicMaterial({ color: palette[i], transparent:true, opacity:.22 })); ring.position.set(1.9,.35,-.25); ring.rotation.x = Math.PI/2+i*.11; this.root.add(ring); this.effects.push(t => ring.rotation.z = t*(.05+i*.015)); }
  }

  showLesson(slug) {
    this.clear(); this.controls.enabled = true; this.currentSlug = slug; this.tweenCamera(new THREE.Vector3(0,1,9), new THREE.Vector3(0,.25,0));
    const map = {
      introduction:()=>this.intro(), 'artificial-neuron':()=>this.artificialNeuron(), 'neural-network':()=>this.neuralNetwork(), training:()=>this.training(), 'training-data':()=>this.trainingData(), 'machine-learning':()=>this.machineLearning(), 'deep-learning':()=>this.deepLearning(), 'model-training':()=>this.modelTraining(), tokens:()=>this.tokens(this.tokenText), embeddings:()=>this.embeddings(), llm:()=>this.llm(), transformer:()=>this.transformer(), attention:()=>this.attention(), prompt:()=>this.promptPipeline(), generation:()=>this.generationScene(), 'generative-ai':()=>this.generativeAI(), 'computer-vision':()=>this.vision(), 'image-generation':()=>this.imageGeneration(), hallucinations:()=>this.hallucinations(), 'ai-pipeline':()=>this.completePipeline()
    }; (map[slug] || map.introduction)();
    const mini = this.createRobot(.25); mini.position.set(3.8,-1.45,1.2); this.root.add(mini);
  }

  intro(){ const names=['DATA','MODEL','LEARNING','PATTERNS','PREDICTION','OUTPUT'], nodes=[]; names.forEach((n,i)=>{ const a=i/names.length*Math.PI*2-.3, o=this.sphere(new THREE.Vector3(Math.cos(a)*3.2,Math.sin(a)*1.6,Math.sin(a*2)*.5),palette[i],.4,n); o.userData.action=()=>{o.scale.setScalar(1.3);setTimeout(()=>o.scale.setScalar(1),250);}; this.interactive.push(o); nodes.push(o); }); const core=this.sphere(new THREE.Vector3(0,.2,0),C.white,.65,'AI SYSTEM'); nodes.forEach((n,i)=>this.connect(n,core,palette[i],.22)); }
  artificialNeuron(){ const a=this.sphere(new THREE.Vector3(-3.4,1,0),C.cyan,.4,'INPUT A'), b=this.sphere(new THREE.Vector3(-3.4,-1,0),C.violet,.4,'INPUT B'), sum=this.sphere(new THREE.Vector3(-.5,0,0),C.pink,.62,'Σ + BIAS'), act=this.box(new THREE.Vector3(1.55,0,0),'ACTIVATION',C.orange,.9), out=this.sphere(new THREE.Vector3(3.5,0,0),C.lime,.48,'OUTPUT'); this.connect(a,sum,C.cyan,.7);this.connect(b,sum,C.violet,.7);this.connect(sum,act,C.pink,.7);this.connect(act,out,C.lime,.7); this.neuron={a,b,sum,out}; this.updateNeuron(); }
  setNeuronParams(p){ this.neuronParams={...this.neuronParams,...p}; this.updateNeuron(); }
  updateNeuron(){ if(!this.neuron)return; const p=this.neuronParams, s=p.inputA*p.weightA+p.inputB*p.weightB+p.bias, y=1/(1+Math.exp(-s)); this.neuron.a.scale.setScalar(.85+p.inputA*.3); this.neuron.b.scale.setScalar(.85+p.inputB*.3); this.neuron.sum.rotation.z=s*.17; this.neuron.out.scale.setScalar(.75+y*.7); }

  buildNetwork(deep=false){ const layers=deep?[5,7,8,7,5,3]:[4,6,5,3], spacing=deep?1.45:2.2, start=-(layers.length-1)*spacing/2, all=[]; layers.forEach((count,li)=>{ const layer=[]; for(let i=0;i<count;i++){ const y=(i-(count-1)/2)*(deep ? .58 : .8); layer.push(this.sphere(new THREE.Vector3(start+li*spacing,y,Math.sin(i+li)*.25),palette[li%palette.length],deep?.16:.22)); } all.push(layer); }); for(let l=0;l<all.length-1;l++) all[l].forEach(a=>all[l+1].forEach(b=>this.connect(a,b,0x6e84a9,deep?.07:.12))); this.network=all; }
  neuralNetwork(){ this.buildNetwork(false); }
  training(){ this.buildNetwork(false); const s=label('PREDICTION → ERROR → BACKPROPAGATION','#ffbf72',24); s.position.set(0,2.8,0);this.root.add(s); }
  trainingData(){ [['TEXT','Aa'],['IMAGE','▧'],['AUDIO','♪'],['VIDEO','▶'],['NUMBERS','123'],['SENSORS','⌁']].forEach(([n,i],k)=>{ const a=k/6*Math.PI*2; this.box(new THREE.Vector3(Math.cos(a)*3.2,Math.sin(a)*1.65,Math.sin(a*2)*.5),`${i} ${n}`,palette[k],.78); }); this.box(new THREE.Vector3(0,0,0),'TRAINING SYSTEM',C.white,1.05); }
  machineLearning(){ const centers=[[-2.4,.6,C.cyan],[0,-.8,C.pink],[2.4,.6,C.lime]]; centers.forEach(([x,y,c],k)=>{ for(let i=0;i<14;i++)this.sphere(new THREE.Vector3(x+(Math.random()-.5)*1.2,y+(Math.random()-.5)*1.2,(Math.random()-.5)*1.2),c,.08); const s=label(['SUPERVISED','UNSUPERVISED','REINFORCEMENT'][k],'#fff',20);s.position.set(x,y+1.4,0);this.root.add(s); }); }
  deepLearning(){ this.buildNetwork(true); }
  modelTraining(){ this.trainingBars=[]; for(let i=0;i<12;i++){ const h=.3+(1-Math.exp(-i/4))*2.1,m=new THREE.Mesh(new THREE.BoxGeometry(.32,h,.46),mat(palette[i%palette.length],.5));m.position.set(-3+i*.55,-1.5+h/2,0);this.root.add(m);this.trainingBars.push(m);} const s=label('MODEL QUALITY ↑','#8dff72',24);s.position.set(0,2.1,0);this.root.add(s); }
  tokens(text){ const t=(text.trim().match(/[\p{L}\p{N}]+|[^\s\p{L}\p{N}]/gu)||[]).slice(0,14); t.forEach((x,i)=>this.box(new THREE.Vector3((i%5-2)*1.45,1.35-Math.floor(i/5)*1.05,Math.sin(i)*.22),x,palette[i%palette.length],.72)); const s=label(`${t.length} simplified tokens`,'#bfefff',22);s.position.set(0,-2,0);this.root.add(s); }
  setTokenText(text){ this.tokenText=text||'AI'; if(this.currentSlug==='tokens') this.showLesson('tokens'); }
  embeddings(){ const data=[['King',-2.3,1.1,C.violet],['Queen',-1.6,1.3,C.pink],['Man',-2,.2,C.blue],['Woman',-1.35,.4,C.cyan],['Car',1.2,1.1,C.orange],['Truck',2,1,C.yellow],['Cat',.8,-.9,C.lime],['Dog',1.5,-.75,C.cyan]]; data.forEach(([n,x,y,c])=>{const o=this.sphere(new THREE.Vector3(x,y,(x*y)%1),c,.17,n);o.userData.action=()=>{o.scale.setScalar(1.5);setTimeout(()=>o.scale.setScalar(1),300);};this.interactive.push(o);}); }
  llm(){ this.buildNetwork(true); this.box(new THREE.Vector3(-4.5,2.25,0),'“The sky is…”',C.cyan,.78); [['blue 72%',C.cyan],['clear 12%',C.lime],['beautiful 7%',C.pink],['dark 5%',C.violet]].forEach(([t,c],i)=>this.box(new THREE.Vector3(3.65,1.7-i*.8,0),t,c,.62)); }
  transformer(){ [['TOKEN INPUT',C.cyan],['EMBEDDING',C.blue],['POSITION',C.violet],['ATTENTION',C.pink],['FEED FORWARD',C.orange],['OUTPUT',C.lime]].forEach(([n,c],i)=>{const o=this.box(new THREE.Vector3(0,2.2-i*.85,0),n,c,.9);o.userData.action=()=>this.tweenCamera(new THREE.Vector3(0,2.2-i*.85,5),new THREE.Vector3(0,2.2-i*.85,0));this.interactive.push(o);}); }
  attention(){ const words=['The','robot','picked','up','the','ball','because','it','was','red']; this.attentionNodes=words.map((w,i)=>{const o=this.sphere(new THREE.Vector3((i-4.5)*.8,Math.sin(i*.8)*.4,0),i===7?C.pink:C.cyan,.16,w);o.userData.action=()=>this.focusAttention(i);this.interactive.push(o);return o;});this.focusAttention(7); }
  focusAttention(index){ if(!this.attentionNodes)return; this.attentionLines?.forEach(l=>this.root.remove(l)); const f=this.attentionNodes[index]; this.attentionLines=this.attentionNodes.map((n,i)=>{if(i===index)return null;const d=Math.abs(i-index),boost=(index===7&&[1,5,9].includes(i))?.7:0,l=line(f.position,n.position,(1/(d+1)+boost)>.5?C.pink:C.violet,Math.min(.9,.15+1/(d+1)+boost));this.root.add(l);return l;}).filter(Boolean); this.attentionNodes.forEach((n,i)=>n.scale.setScalar(i===index?1.5:1)); }
  promptPipeline(){ const names=['USER PROMPT','TOKENIZATION','EMBEDDINGS','TRANSFORMER','ATTENTION','NEXT TOKEN','RESPONSE']; this.pipeline=names.map((n,i)=>this.box(new THREE.Vector3((i-3)*1.25,Math.sin(i/6*Math.PI)*.75-.15,0),n,palette[i%palette.length],.6)); for(let i=1;i<this.pipeline.length;i++)this.connect(this.pipeline[i-1],this.pipeline[i],palette[i],.4); }
  runPrompt(){ if(this.currentSlug==='prompt')this.animatePipeline(); }
  generationScene(){ this.box(new THREE.Vector3(0,2.2,0),'Explain gravity simply.',C.cyan,.8); this.generation=new THREE.Group();this.root.add(this.generation); }
  generativeAI(){ [['TEXT','Aa'],['IMAGE','◩'],['AUDIO','♪'],['VIDEO','▶'],['3D','⬡']].forEach(([n,ic],i)=>{const a=i/5*Math.PI*2+Math.PI/2,t=new THREE.Mesh(new THREE.TorusGeometry(.68,.1,12,56),mat(palette[i],2));t.position.set(Math.cos(a)*3,Math.sin(a)*1.55,0);this.root.add(t);const s=label(`${ic} ${n}`,'#fff',22);s.position.copy(t.position).add(new THREE.Vector3(0,-.95,0));this.root.add(s);this.effects.push(x=>t.rotation.z=x*(.2+i*.03));}); }
  vision(){ const screen=new THREE.Mesh(new THREE.PlaneGeometry(6.6,4),new THREE.MeshStandardMaterial({color:0x16324a,roughness:.7}));screen.position.z=-.3;this.root.add(screen);[['PERSON',-2,.4,1,2,C.cyan],['CAR',.8,-.75,2.3,1,C.orange],['CAT',2,.6,1,.9,C.pink],['CHAIR',-.4,-.8,1.1,1.2,C.lime]].forEach(([n,x,y,w,h,c])=>{const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(w,h)),new THREE.LineBasicMaterial({color:c}));e.position.set(x,y,0);this.root.add(e);const s=label(`${n} ${88+Math.floor(Math.random()*9)}%`,'#fff',17);s.position.set(x,y+h/2+.2,.02);s.scale.multiplyScalar(.7);this.root.add(s);}); }
  imageGeneration(){ this.diffusion=[]; for(let x=0;x<15;x++)for(let y=0;y<15;y++){const m=new THREE.Mesh(new THREE.BoxGeometry(.24,.24,.12),new THREE.MeshStandardMaterial({color:Math.random()*0xffffff,roughness:.75}));m.position.set((x-7.5)*.26,(y-7.5)*.26,Math.random()*.2);this.root.add(m);this.diffusion.push({m,x,y,n:Math.random()});}this.setDenoise(0); }
  setDenoise(v){this.denoise=v;this.diffusion?.forEach(({m,x,y,n})=>{const nx=x/14-.5,ny=y/14-.5,shape=Math.exp(-((nx*1.2)**2+(ny*1.1)**2)*3.2),target=new THREE.Color().setHSL(.55+shape*.12,.7,.28+shape*.45),random=new THREE.Color().setHSL(n,.85,.55);m.material.color.copy(random.lerp(target,v));m.position.z=(1-v)*(n-.5)*.35+v*shape*.25;});}
  hallucinations(){[['Supported answer',C.lime,'VERIFIED'],['Plausible but wrong',C.pink,'CHECK'],['Uncertain answer',C.orange,'LOW EVIDENCE']].forEach(([n,c,t],i)=>{this.box(new THREE.Vector3(0,1.3-i*1.3,0),n,c,1.05);const s=label(t,i===0?'#8dff72':'#ffba75',18);s.position.set(0,.72-i*1.3,0);this.root.add(s);});}
  completePipeline(){ const names=['TRAINING DATA','TOKENIZATION','EMBEDDINGS','NEURAL NETWORK','TRANSFORMER','ATTENTION','PARAMETERS','PROMPT','TOKEN PREDICTION','RESPONSE'];this.complete=names.map((n,i)=>{const a=i/names.length*Math.PI*2-Math.PI/2;return this.box(new THREE.Vector3(Math.cos(a)*3.3,Math.sin(a)*1.8,Math.sin(a*2)*.4),n,palette[i%palette.length],.56);});this.complete.forEach((b,i)=>this.connect(b,this.complete[(i+1)%this.complete.length],palette[i%palette.length],.35));this.sphere(new THREE.Vector3(0,0,0),C.white,.6,'AI SYSTEM');}

  handleAction(action,payload){if(action==='denoise')return this.setDenoise(payload);if(action==='speed'){this.generationSpeed=payload;return;}if(action==='generate')return this.animateGeneration();if(action!=='run')return; if(['neural-network','training','llm'].includes(payload))this.animateNetwork(payload==='training'); else if(payload==='model-training')this.animateBars(); else if(payload==='attention')this.focusAttention(Math.floor(Math.random()*this.attentionNodes.length)); else if(payload==='ai-pipeline')this.animateComplete(); else this.pulse();}
  animateNetwork(reverse=false){if(!this.network)return;const layers=reverse?[...this.network].reverse():this.network;layers.forEach((layer,li)=>setTimeout(()=>layer.forEach(n=>{n.scale.setScalar(1.45);setTimeout(()=>n.scale.setScalar(1),240);}),li*330));}
  animateBars(){this.trainingBars?.forEach((b,i)=>{b.scale.y=.08;setTimeout(()=>b.scale.y=1,i*85);});}
  animatePipeline(){this.pipeline?.forEach((b,i)=>setTimeout(()=>{b.scale.setScalar(1.28);setTimeout(()=>b.scale.setScalar(1),250);},i*230));}
  animateGeneration(){if(!this.generation)return;this.generation.clear();['Gravity','is','the','pull','that','brings','objects','toward','each','other.'].forEach((t,i)=>setTimeout(()=>{const g=new THREE.Group(),m=new THREE.Mesh(new THREE.BoxGeometry(.95,.48,.22),mat(palette[i%palette.length],.7)),s=label(t,'#fff',20);s.position.z=.15;s.scale.multiplyScalar(.52);g.add(m,s);g.position.set((i%5-2)*1.08,.7-Math.floor(i/5)*.85,.15);this.generation.add(g);},i*(420/this.generationSpeed)));}
  animateComplete(){this.complete?.forEach((b,i)=>setTimeout(()=>{b.scale.setScalar(1.3);setTimeout(()=>b.scale.setScalar(1),230);},i*170));}
  pulse(){this.root.children.forEach((o,i)=>setTimeout(()=>{const s=o.scale.clone();o.scale.multiplyScalar(1.05);setTimeout(()=>o.scale.copy(s),170);},i*18));}
  tweenCamera(to,target){const from=this.camera.position.clone(),ft=this.controls.target.clone(),start=performance.now();const step=now=>{const p=Math.min(1,(now-start)/550),e=1-(1-p)**3;this.camera.position.lerpVectors(from,to,e);this.controls.target.lerpVectors(ft,target,e);if(p<1)requestAnimationFrame(step);};requestAnimationFrame(step);}
  setSound(enabled){this.sound=enabled;}
  animate(){this.raf=requestAnimationFrame(()=>this.animate());const t=this.clock.getElapsedTime();this.controls.update();this.stars.rotation.y=t*.006;this.effects.forEach(fn=>fn(t));this.renderer.render(this.scene,this.camera);}
  dispose(){cancelAnimationFrame(this.raf);this.controls.dispose();this.renderer.dispose();}
}
