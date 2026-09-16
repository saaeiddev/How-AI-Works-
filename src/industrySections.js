import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const sections = {
  'ai-entertainment': {
    number: 21,
    category: { en: 'AI IN CREATIVE INDUSTRIES', fa: 'هوش مصنوعی در صنایع خلاق' },
    title: {
      en: 'How AI Helps Game Development, Animation & Entertainment',
      fa: 'هوش مصنوعی چطور در بازی‌سازی، انیمیشن‌سازی و صنعت سرگرمی کمک می‌کند؟'
    },
    intro: {
      en: 'Explore an interactive creative pipeline showing where AI can assist artists, animators, game developers, filmmakers, and audio teams—while people remain responsible for creative direction and final decisions.',
      fa: 'در این مسیر سه‌بعدی ببینید هوش مصنوعی در کدام مراحل می‌تواند به هنرمندان، انیماتورها، بازی‌سازها، فیلم‌سازها و تیم‌های صدا کمک کند؛ در حالی که هدایت خلاقانه و تصمیم نهایی همچنان با انسان است.'
    },
    items: [
      { icon:'idea', color:0x35efff, en:['Concept & Story','AI can brainstorm story directions, character variations, dialogue drafts, mood boards, and references. Human creators choose the direction and refine the result.'], fa:['ایده و داستان','هوش مصنوعی می‌تواند برای داستان، شخصیت، دیالوگ، مودبرد و رفرنس پیشنهاد بسازد. انتخاب مسیر و اصلاح نهایی با تیم خلاق است.'] },
      { icon:'asset', color:0x7657ff, en:['3D Assets & Textures','Generative tools can accelerate concept art, texture ideation, material variations, rough 3D assets, retopology assistance, and asset search.'], fa:['مدل سه‌بعدی و تکسچر','ابزارهای مولد می‌توانند کانسپت‌آرت، ایده تکسچر و متریال، مدل‌های اولیه سه‌بعدی، کمک به Retopology و جستجوی Asset را سریع‌تر کنند.'] },
      { icon:'rig', color:0xff4fc8, en:['Animation & Performance','AI can help with motion capture cleanup, pose interpolation, lip-sync, facial animation, in-betweening, rotoscoping, and animation retargeting.'], fa:['انیمیشن و اجرا','هوش مصنوعی می‌تواند در پاک‌سازی موشن‌کپچر، ساخت فریم‌های میانی، Lip Sync، انیمیشن چهره، روتوسکوپی و Retargeting کمک کند.'] },
      { icon:'game', color:0xffb348, en:['Game AI & NPCs','AI can support navigation, decision systems, adaptive difficulty, procedural behaviors, testing bots, and richer NPC interactions.'], fa:['هوش بازی و NPC','هوش مصنوعی می‌تواند در مسیریابی، سیستم تصمیم‌گیری، سختی تطبیقی، رفتارهای رویه‌ای، بات‌های تست و تعامل غنی‌تر NPCها استفاده شود.'] },
      { icon:'audio', color:0xa1ff72, en:['Voice, Music & Sound','AI tools can assist voice cleanup, localization drafts, sound search, music sketches, ambience generation, and audio restoration. Rights and consent still matter.'], fa:['صدا، موسیقی و دوبله','ابزارهای AI می‌توانند در پاک‌سازی صدا، پیش‌نویس بومی‌سازی، جستجوی افکت، اسکچ موسیقی، ساخت Ambience و ترمیم صدا کمک کنند؛ حقوق و رضایت افراد همچنان مهم است.'] },
      { icon:'screen', color:0x4b7cff, en:['VFX, Previs & Post','AI can speed masking, tracking, cleanup, upscaling, previs, storyboard iteration, shot organization, and some compositing tasks.'], fa:['VFX، پیش‌تصویر و پس‌تولید','AI می‌تواند ماسک، ترکینگ، Cleanup، Upscale، Previs، تکرار استوری‌بورد، سازمان‌دهی شات‌ها و بعضی کارهای کامپوزیت را سریع‌تر کند.'] }
    ]
  },
  'ai-software': {
    number: 22,
    category: { en: 'AI IN SOFTWARE DEVELOPMENT', fa: 'هوش مصنوعی در توسعه نرم‌افزار' },
    title: {
      en: 'How AI Helps Programming & Software Projects',
      fa: 'هوش مصنوعی چطور در برنامه‌نویسی و پروژه‌های نرم‌افزاری کمک می‌کند؟'
    },
    intro: {
      en: 'Follow a software project from requirements to deployment and see where AI can accelerate coding, debugging, testing, documentation, and operations—without replacing engineering judgment.',
      fa: 'مسیر یک پروژه نرم‌افزاری را از نیازمندی تا استقرار دنبال کنید و ببینید AI چطور می‌تواند کدنویسی، دیباگ، تست، مستندسازی و عملیات را سریع‌تر کند؛ بدون اینکه جای قضاوت مهندسی را بگیرد.'
    },
    items: [
      { icon:'plan', color:0x35efff, en:['Requirements & Architecture','AI can summarize requirements, identify ambiguities, draft user stories, compare architecture options, and turn rough ideas into a clearer technical plan.'], fa:['نیازمندی و معماری','AI می‌تواند نیازمندی‌ها را خلاصه کند، ابهام‌ها را پیدا کند، User Story بسازد، گزینه‌های معماری را مقایسه کند و ایده خام را به برنامه فنی روشن‌تری تبدیل کند.'] },
      { icon:'code', color:0x7657ff, en:['Code Generation','Coding assistants can draft functions, components, API clients, SQL, scripts, migrations, and repetitive boilerplate from a well-scoped request.'], fa:['تولید کد','دستیارهای برنامه‌نویسی می‌توانند از یک درخواست دقیق، تابع، کامپوننت، API Client، SQL، اسکریپت، Migration و کدهای تکراری را پیش‌نویس کنند.'] },
      { icon:'bug', color:0xff4fc8, en:['Debugging & Refactoring','AI can explain stack traces, trace suspicious code paths, suggest fixes, simplify complex functions, and propose safer refactors for review.'], fa:['دیباگ و Refactor','AI می‌تواند Stack Trace را توضیح دهد، مسیرهای مشکوک کد را دنبال کند، اصلاح پیشنهاد دهد، توابع پیچیده را ساده‌تر کند و Refactorهای قابل بررسی پیشنهاد کند.'] },
      { icon:'test', color:0xffb348, en:['Testing & Quality','AI can draft unit, integration, and edge-case tests, generate test data, review coverage gaps, and help analyze failures.'], fa:['تست و کیفیت','AI می‌تواند تست Unit و Integration و Edge Case بنویسد، داده تست تولید کند، کمبودهای Coverage را بررسی کند و در تحلیل Failureها کمک کند.'] },
      { icon:'docs', color:0xa1ff72, en:['Documentation & Review','AI can generate documentation drafts, explain unfamiliar code, summarize pull requests, propose comments, and help keep technical knowledge searchable.'], fa:['مستندسازی و بازبینی','AI می‌تواند پیش‌نویس مستندات بسازد، کد ناآشنا را توضیح دهد، Pull Request را خلاصه کند و دانش فنی پروژه را قابل جستجوتر نگه دارد.'] },
      { icon:'deploy', color:0x4b7cff, en:['DevOps & Optimization','AI can help inspect logs, write CI/CD configuration, suggest performance investigations, classify incidents, and automate repetitive operational tasks.'], fa:['DevOps و بهینه‌سازی','AI می‌تواند در بررسی Logها، نوشتن پیکربندی CI/CD، پیشنهاد مسیر بررسی Performance، دسته‌بندی Incident و خودکارسازی کارهای تکراری عملیات کمک کند.'] }
    ]
  }
};

let activeSlug = null;
let renderer = null, scene = null, camera = null, controls = null, raf = 0;
let host = null, labelLayer = null, guideTitle = null, guideText = null;
let clickable = [], labelEntries = [], flows = [], animated = [], coreGroup = null;
let raycaster = null, pointer = null, selectedIndex = 0;
let observer = null;
const stage = () => document.querySelector('#stage');
const annotationLayer = () => document.querySelector('#annotationLayer');
const lang = () => document.documentElement.lang === 'fa' ? 'fa' : 'en';

function injectStyles() {
  if (document.querySelector('#industry-sections-style')) return;
  const style = document.createElement('style');
  style.id = 'industry-sections-style';
  style.textContent = `
    .industry-ui .lesson-heading{max-width:min(680px,calc(100vw - 32px))}
    .industry-ui .industry-badge{display:inline-flex;align-items:center;gap:.45rem;margin-top:.75rem;padding:.38rem .65rem;border:1px solid rgba(101,239,255,.22);border-radius:999px;background:rgba(13,34,56,.45);font-size:.72rem;letter-spacing:.08em;color:#bfefff}
    .industry-label-layer{position:fixed;inset:0;z-index:7;pointer-events:none}
    .industry-node-label{position:absolute;transform:translate(-50%,-50%);pointer-events:auto;border:1px solid rgba(114,226,255,.32);background:rgba(5,14,28,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);color:#f7fbff;border-radius:12px;padding:8px 11px;box-shadow:0 10px 35px rgba(0,0,0,.24);font:700 12px/1.2 Inter,system-ui,sans-serif;white-space:nowrap;cursor:pointer;transition:.2s ease}
    .industry-node-label:hover,.industry-node-label.active{transform:translate(-50%,-50%) scale(1.06);border-color:rgba(125,239,255,.8);box-shadow:0 0 24px rgba(53,239,255,.2)}
    html[dir="rtl"] .industry-node-label{font-family:inherit}
    .industry-scene-note{position:fixed;left:50%;bottom:94px;transform:translateX(-50%);z-index:6;padding:8px 12px;border-radius:999px;background:rgba(5,14,28,.55);border:1px solid rgba(126,220,255,.15);color:#9fc9dd;font-size:11px;pointer-events:none}
    @media(max-width:720px){.industry-node-label{font-size:10px;padding:6px 8px}.industry-scene-note{bottom:124px}.industry-ui .lesson-heading{max-width:calc(100vw - 22px)}}
  `;
  document.head.appendChild(style);
}

function patchBaseUI() {
  const list = document.querySelector('#lessonList');
  if (list && !list.querySelector('[data-industry-group]')) {
    const group = document.createElement('div');
    group.className = 'lesson-group';
    group.dataset.industryGroup = 'true';
    const l = lang();
    group.innerHTML = `<p>${l==='fa'?'کاربردهای واقعی هوش مصنوعی':'AI IN PRACTICE'}</p>
      ${Object.values(sections).map(s=>`<button class="lesson-link" data-industry-slug="${s.number===21?'ai-entertainment':'ai-software'}"><span>${String(s.number).padStart(2,'0')}</span><b>${s.title[l]}</b><i>→</i></button>`).join('')}`;
    list.appendChild(group);
    group.querySelectorAll('[data-industry-slug]').forEach(btn=>btn.onclick=()=>{
      document.querySelector('#drawer')?.classList.remove('open');
      openIndustry(btn.dataset.industrySlug);
    });
  }

  const journey = document.querySelector('.journey strong');
  if (journey) {
    const current = (journey.textContent.match(/^\d+/)||['0'])[0];
    journey.textContent = `${current}/22`;
    const bar = document.querySelector('.journey i em');
    if (bar) bar.style.width = `${Math.min(100, Number(current)/22*100)}%`;
  }
  const meta = document.querySelector('.hero-meta span:first-child');
  if (meta) meta.textContent = lang()==='fa' ? '۲۲ درس تعاملی' : '22 interactive lessons';
  const desc = document.querySelector('.hero-copy > p:not(.eyebrow)');
  if (desc) desc.textContent = desc.textContent.replace('20','22').replace('۲۰','۲۲');

  if (activeSlug && sections[activeSlug]) restoreIndustryUI();
}

function restoreIndustryUI() {
  const baseHome = document.querySelector('.home-ui');
  const baseLesson = document.querySelector('.lesson-ui:not(.industry-ui)');
  if (baseHome) baseHome.hidden = true;
  if (baseLesson) baseLesson.hidden = true;
  if (!document.querySelector('.industry-ui')) buildIndustryUI(activeSlug);
  annotationLayer()?.setAttribute('hidden','');
  if (host) host.hidden = false;
  if (labelLayer) labelLayer.hidden = false;
}

function buildIndustryUI(slug) {
  document.querySelector('.industry-ui')?.remove();
  const shell = document.querySelector('.app-shell');
  if (!shell) return;
  const s = sections[slug], l = lang();
  const section = document.createElement('section');
  section.className = 'lesson-ui industry-ui';
  section.innerHTML = `
    <div class="lesson-heading glass">
      <p class="eyebrow">${String(s.number).padStart(2,'0')} / ${s.category[l]}</p>
      <h1>${s.title[l]}</h1>
      <p>${s.intro[l]}</p>
      <div class="industry-badge">${l==='fa'?'● صحنه سه‌بعدی تعاملی — روی بخش‌ها کلیک کنید':'● INTERACTIVE 3D SCENE — CLICK THE MODULES'}</div>
    </div>
    <div class="guide-panel glass">
      <div class="guide-kicker">${l==='fa'?'راهنمای سه‌بعدی':'3D GUIDE'}</div>
      <h3 id="industryGuideTitle"></h3>
      <p id="industryGuideText"></p>
    </div>
    <nav class="lesson-nav glass">
      <button id="industryPrev" ${slug==='ai-entertainment'?'disabled':''}>← <span>${l==='fa'?'قبلی':'Previous'}</span></button>
      <button class="complete-btn done" id="industryMode">${l==='fa'?'۶ بخش قابل تعامل':'6 interactive modules'}</button>
      <button id="industryNext" ${slug==='ai-software'?'disabled':''}><span>${l==='fa'?'بعدی':'Next'}</span> →</button>
    </nav>`;
  shell.appendChild(section);
  guideTitle = section.querySelector('#industryGuideTitle');
  guideText = section.querySelector('#industryGuideText');
  section.querySelector('#industryPrev').onclick = ()=> slug==='ai-software' && openIndustry('ai-entertainment');
  section.querySelector('#industryNext').onclick = ()=> slug==='ai-entertainment' && openIndustry('ai-software');
  updateGuide(selectedIndex);
}

function openIndustry(slug) {
  if (!sections[slug]) return;
  activeSlug = slug;
  selectedIndex = 0;
  if (location.hash !== `#/${slug}`) history.pushState(null,'',`#/${slug}`);
  restoreIndustryUI();
  mountScene(slug);
}

function closeIndustry() {
  if (!activeSlug && !renderer) return;
  activeSlug = null;
  cancelAnimationFrame(raf);
  controls?.dispose();
  renderer?.dispose();
  renderer = scene = camera = controls = raycaster = pointer = null;
  host?.remove(); host = null;
  labelLayer?.remove(); labelLayer = null;
  document.querySelector('.industry-scene-note')?.remove();
  document.querySelector('.industry-ui')?.remove();
  annotationLayer()?.removeAttribute('hidden');
  const baseCanvas = stage()?.querySelector(':scope > canvas');
  if (baseCanvas) baseCanvas.style.display = '';
}

function mountScene(slug) {
  cancelAnimationFrame(raf);
  controls?.dispose();
  renderer?.dispose();
  host?.remove();
  labelLayer?.remove();
  document.querySelector('.industry-scene-note')?.remove();
  clickable = []; labelEntries = []; flows = []; animated = [];

  const st = stage();
  if (!st) return;
  const baseCanvas = st.querySelector(':scope > canvas');
  if (baseCanvas) baseCanvas.style.display = 'none';

  host = document.createElement('div');
  host.className = 'industry-three-host';
  Object.assign(host.style,{position:'absolute',inset:'0',zIndex:'0'});
  st.appendChild(host);

  labelLayer = document.createElement('div');
  labelLayer.className = 'industry-label-layer';
  document.querySelector('.app-shell')?.appendChild(labelLayer);

  const note = document.createElement('div');
  note.className = 'industry-scene-note';
  note.textContent = lang()==='fa' ? 'برای چرخش Drag کنید • برای زوم Scroll/Pinch کنید • روی ماژول‌ها کلیک کنید' : 'Drag to orbit • Scroll/pinch to zoom • Click a module';
  document.body.appendChild(note);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050b18);
  scene.fog = new THREE.FogExp2(0x07121f,.035);
  camera = new THREE.PerspectiveCamera(46, innerWidth/innerHeight,.1,100);
  camera.position.set(0,.85, innerWidth<720 ? 10.7 : 8.8);
  renderer = new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth<720?1.35:1.7));
  renderer.setSize(innerWidth,innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  host.appendChild(renderer.domElement);

  controls = new OrbitControls(camera,renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 5.8;
  controls.maxDistance = 13;
  controls.target.set(0,0,0);

  scene.add(new THREE.HemisphereLight(0xc5f7ff,0x130826,2.0));
  const key = new THREE.DirectionalLight(0xffffff,3); key.position.set(4,7,5); scene.add(key);
  const cyan = new THREE.PointLight(0x35efff,20,18); cyan.position.set(-4,2,4); scene.add(cyan);
  const pink = new THREE.PointLight(0xff4fc8,14,16); pink.position.set(4,1,2); scene.add(pink);
  const grid = new THREE.GridHelper(36,36,0x2a7ea0,0x143249); grid.position.y=-2.15; grid.material.transparent=true; grid.material.opacity=.12; scene.add(grid);

  const stars = makeStars(); scene.add(stars); animated.push({kind:'stars',obj:stars});
  coreGroup = buildCore(slug); scene.add(coreGroup);

  const s = sections[slug];
  const positions = [
    [-3.25,1.45,.2],[0,2.05,-.4],[3.25,1.45,.15],
    [-3.25,-1.15,.1],[0,-1.75,-.35],[3.25,-1.15,.1]
  ];
  s.items.forEach((item,i)=>{
    const group = buildModule(item,i,positions[i]);
    scene.add(group);
    clickable.push(group);
    addFlow(coreGroup.position,group.position,item.color,i);
    addLabel(group,item,i);
  });

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  renderer.domElement.addEventListener('pointermove',onPointerMove);
  renderer.domElement.addEventListener('click',onClick);
  addEventListener('resize',resizeScene);
  animateScene();
  updateGuide(0);
}

function stdMat(color, emissive=.8) {
  return new THREE.MeshStandardMaterial({color,roughness:.25,metalness:.55,emissive:color,emissiveIntensity:emissive});
}

function makeStars() {
  const count = innerWidth<720?90:170, pos = new Float32Array(count*3);
  for(let i=0;i<count;i++){pos[i*3]=(Math.random()-.5)*22;pos[i*3+1]=(Math.random()-.5)*13;pos[i*3+2]=-Math.random()*16;}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  return new THREE.Points(geo,new THREE.PointsMaterial({size:.045,color:0x6defff,transparent:true,opacity:.45}));
}

function buildCore(slug) {
  const g = new THREE.Group();
  g.position.set(0,.1,0);
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(.58,.16,120,18),stdMat(slug==='ai-entertainment'?0xff4fc8:0x35efff,2.2));
  g.add(knot);
  const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(.34,2),stdMat(0x7657ff,2.6)); g.add(inner);
  for(let i=0;i<3;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(.92+i*.22,.018,8,80),new THREE.MeshBasicMaterial({color:[0x35efff,0x7657ff,0xff4fc8][i],transparent:true,opacity:.38}));r.rotation.set(Math.PI/2+i*.38,i*.42,0);g.add(r);animated.push({kind:'ring',obj:r,speed:.18+i*.06});}
  animated.push({kind:'core',obj:knot});
  return g;
}

function buildModule(item,index,pos) {
  const g = new THREE.Group();
  g.position.set(...pos);
  g.userData.index=index;
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(.72,.86,.18,32),new THREE.MeshStandardMaterial({color:0x10253d,roughness:.34,metalness:.7,emissive:item.color,emissiveIntensity:.18}));
  pedestal.position.y=-.55; g.add(pedestal);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(.66,.025,8,56),new THREE.MeshBasicMaterial({color:item.color,transparent:true,opacity:.5}));
  halo.rotation.x=Math.PI/2;halo.position.y=-.44;g.add(halo);
  const icon = createIcon(item.icon,item.color); icon.userData.index=index; g.add(icon);
  g.traverse(o=>{if(o.isMesh)o.userData.index=index;});
  animated.push({kind:'module',obj:g,index,baseY:pos[1],phase:index*.8,halo});
  return g;
}

function createIcon(type,color) {
  const g=new THREE.Group(), m=stdMat(color,1.6), dark=new THREE.MeshStandardMaterial({color:0x071426,roughness:.18,metalness:.6});
  if(type==='idea'){const bulb=new THREE.Mesh(new THREE.SphereGeometry(.34,28,20),m);bulb.position.y=.12;g.add(bulb);const stem=new THREE.Mesh(new THREE.CylinderGeometry(.13,.16,.32,18),dark);stem.position.y=-.25;g.add(stem);for(let i=0;i<5;i++){const ray=new THREE.Mesh(new THREE.BoxGeometry(.035,.24,.035),m);ray.position.set(Math.cos(i*1.256)*.56,.2+Math.sin(i*1.256)*.4,0);ray.rotation.z=-i*1.256;g.add(ray);}}
  else if(type==='asset'){const cube=new THREE.Mesh(new THREE.BoxGeometry(.65,.65,.65),m);cube.rotation.set(.45,.55,.1);g.add(cube);const wire=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(.82,.82,.82)),new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.55}));wire.rotation.copy(cube.rotation);g.add(wire);}
  else if(type==='rig'){const head=new THREE.Mesh(new THREE.SphereGeometry(.17,18,14),m);head.position.y=.55;g.add(head);const pts=[[0,.37,0],[0,-.15,0],[-.35,.12,0],[.35,.12,0],[-.25,-.62,0],[.25,-.62,0]];pts.forEach(p=>{const j=new THREE.Mesh(new THREE.SphereGeometry(.07,12,10),m);j.position.set(...p);g.add(j)});[[0,1],[1,2],[1,3],[1,4],[1,5]].forEach(([a,b])=>{const A=new THREE.Vector3(...pts[a]),B=new THREE.Vector3(...pts[b]),d=B.clone().sub(A),bone=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,d.length(),10),m);bone.position.copy(A.clone().add(B).multiplyScalar(.5));bone.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());g.add(bone)});}
  else if(type==='game'){const body=new THREE.Mesh(new THREE.BoxGeometry(.92,.48,.22),m);body.geometry.translate(0,0,0);g.add(body);const gripL=new THREE.Mesh(new THREE.SphereGeometry(.27,18,14),m),gripR=gripL.clone();gripL.position.set(-.37,-.18,0);gripR.position.set(.37,-.18,0);g.add(gripL,gripR);const btn=new THREE.Mesh(new THREE.SphereGeometry(.07,14,10),dark);btn.position.set(.25,.08,.14);g.add(btn);const btn2=btn.clone();btn2.position.set(.42,.0,.14);g.add(btn2);}
  else if(type==='audio'){for(let i=0;i<7;i++){const h=.25+Math.abs(Math.sin(i*1.2))*.75,b=new THREE.Mesh(new THREE.BoxGeometry(.09,h,.16),m);b.position.set((i-3)*.15,0,0);g.add(b);}}
  else if(type==='screen'){const screen=new THREE.Mesh(new THREE.BoxGeometry(1,.62,.12),dark);g.add(screen);const frame=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.04,.66,.15)),new THREE.LineBasicMaterial({color}));g.add(frame);const play=new THREE.Mesh(new THREE.ConeGeometry(.16,.16,3),m);play.rotation.z=-Math.PI/2;play.position.z=.1;g.add(play);}
  else if(type==='plan'){const board=new THREE.Mesh(new THREE.BoxGeometry(.85,.65,.12),dark);g.add(board);for(let i=0;i<3;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(.55-i*.08,.045,.03),m);l.position.set(-.06,.2-i*.18,.08);g.add(l);}}
  else if(type==='code'){const screen=new THREE.Mesh(new THREE.BoxGeometry(.9,.62,.12),dark);g.add(screen);const left=new THREE.Mesh(new THREE.BoxGeometry(.06,.42,.05),m),right=left.clone();left.rotation.z=.55;right.rotation.z=-.55;left.position.x=-.26;right.position.x=.26;g.add(left,right);}
  else if(type==='bug'){const body=new THREE.Mesh(new THREE.SphereGeometry(.28,20,16),m);body.scale.y=1.2;g.add(body);for(let s of [-1,1])for(let y of [-.2,0,.2]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.38,8),m);leg.rotation.z=s*.9;leg.position.set(s*.34,y,0);g.add(leg);}}
  else if(type==='test'){const ring=new THREE.Mesh(new THREE.TorusGeometry(.38,.07,12,40),m);g.add(ring);const a=new THREE.Mesh(new THREE.BoxGeometry(.08,.32,.08),m),b=new THREE.Mesh(new THREE.BoxGeometry(.08,.58,.08),m);a.rotation.z=-.7;a.position.set(-.13,-.05,0);b.rotation.z=.65;b.position.set(.12,.04,0);g.add(a,b);}
  else if(type==='docs'){const page=new THREE.Mesh(new THREE.BoxGeometry(.65,.82,.08),m);g.add(page);for(let i=0;i<3;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(.42-i*.05,.035,.03),dark);l.position.set(-.02,.2-i*.18,.06);g.add(l);}}
  else if(type==='deploy'){const cloud=new THREE.Group();[-.28,0,.28].forEach((x,i)=>{const s=new THREE.Mesh(new THREE.SphereGeometry(.28-i*.03,18,14),m);s.position.set(x,i===1?.1:0,0);cloud.add(s)});g.add(cloud);const arrow=new THREE.Mesh(new THREE.ConeGeometry(.14,.3,16),m);arrow.position.set(0,-.55,0);arrow.rotation.z=Math.PI;g.add(arrow);}
  return g;
}

function addFlow(from,to,color,index) {
  const a=from.clone(),b=to.clone();
  const mid=a.clone().lerp(b,.5);mid.z-=.35+index*.03;
  const curve=new THREE.QuadraticBezierCurve3(a,mid,b);
  const pts=curve.getPoints(40);
  const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color,transparent:true,opacity:.22}));
  scene.add(line);
  const particle=new THREE.Mesh(new THREE.SphereGeometry(.055,12,10),new THREE.MeshBasicMaterial({color}));
  scene.add(particle);
  flows.push({curve,particle,phase:index/6,speed:.055+index*.004});
}

function addLabel(group,item,index) {
  const b=document.createElement('button');
  b.className='industry-node-label';
  b.type='button';
  b.dataset.index=index;
  b.textContent=item[lang()][0];
  b.onclick=e=>{e.stopPropagation();selectNode(index);};
  labelLayer.appendChild(b);
  labelEntries.push({group,el:b,item,index});
}

function selectNode(index) {
  selectedIndex=index;
  updateGuide(index);
  labelEntries.forEach(x=>x.el.classList.toggle('active',x.index===index));
  clickable.forEach((g,i)=>g.scale.setScalar(i===index?1.16:1));
}

function updateGuide(index) {
  const s=sections[activeSlug]; if(!s) return;
  const item=s.items[Math.max(0,Math.min(index,s.items.length-1))], l=lang();
  if(guideTitle) guideTitle.textContent=item[l][0];
  if(guideText) guideText.textContent=item[l][1];
  labelEntries.forEach(x=>{x.el.textContent=x.item[l][0];x.el.classList.toggle('active',x.index===index);});
}

function onPointerMove(e) {
  if(!renderer||!camera)return;
  const r=renderer.domElement.getBoundingClientRect();
  pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1));
  raycaster.setFromCamera(pointer,camera);
  renderer.domElement.style.cursor=raycaster.intersectObjects(clickable,true).length?'pointer':'grab';
}

function onClick(e) {
  if(!renderer||!camera)return;
  const r=renderer.domElement.getBoundingClientRect();
  pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1));
  raycaster.setFromCamera(pointer,camera);
  const hit=raycaster.intersectObjects(clickable,true)[0];
  if(hit){let o=hit.object;while(o&&o.userData.index==null)o=o.parent;if(o?.userData.index!=null)selectNode(o.userData.index);}
}

const worldV=new THREE.Vector3();
function updateLabels() {
  if(!renderer||!camera)return;
  const rect=renderer.domElement.getBoundingClientRect();
  labelEntries.forEach(entry=>{
    entry.group.getWorldPosition(worldV);
    worldV.y+=.72;
    const v=worldV.clone().project(camera);
    const x=(v.x*.5+.5)*rect.width+rect.left;
    const y=(-v.y*.5+.5)*rect.height+rect.top;
    entry.el.style.display=v.z>-1&&v.z<1?'block':'none';
    entry.el.style.left=`${Math.max(54,Math.min(innerWidth-54,x))}px`;
    entry.el.style.top=`${Math.max(94,Math.min(innerHeight-84,y))}px`;
  });
}

const clock=new THREE.Clock();
function animateScene() {
  raf=requestAnimationFrame(animateScene);
  const t=clock.getElapsedTime();
  controls?.update();
  animated.forEach(a=>{
    if(a.kind==='stars')a.obj.rotation.y=t*.008;
    else if(a.kind==='ring')a.obj.rotation.z=t*a.speed;
    else if(a.kind==='core'){a.obj.rotation.x=t*.18;a.obj.rotation.y=t*.28;}
    else if(a.kind==='module'){a.obj.position.y=a.baseY+Math.sin(t*1.25+a.phase)*.07;a.halo.rotation.z=t*(.18+a.index*.01);}
  });
  flows.forEach(f=>{const p=(t*f.speed+f.phase)%1;f.particle.position.copy(f.curve.getPoint(p));f.particle.scale.setScalar(.85+Math.sin(t*5+f.phase*9)*.22);});
  updateLabels();
  renderer?.render(scene,camera);
}

function resizeScene() {
  if(!renderer||!camera)return;
  camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<720?1.35:1.7));
  camera.position.z=innerWidth<720?10.7:8.8;
}

function handleHash() {
  const slug=location.hash.replace(/^#\/?/,'');
  if(sections[slug]) {
    if(activeSlug!==slug) openIndustry(slug);
  } else if(activeSlug) {
    closeIndustry();
  }
}

function boot() {
  injectStyles();
  patchBaseUI();
  observer=new MutationObserver(()=>patchBaseUI());
  const ui=document.querySelector('#ui');
  if(ui) observer.observe(ui,{childList:true,subtree:true});
  addEventListener('hashchange',handleHash);
  handleHash();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
