import * as THREE from 'three';

const LABELS = {
  home: {
    en: ['AI GUIDE','NEURAL CORE','INTERACTIVE 3D MASCOT'],
    fa: ['راهنمای هوش مصنوعی','هسته عصبی','ربات سه‌بعدی تعاملی']
  },
  introduction: {
    en: ['INPUT DATA','AI MODEL','OUTPUT'],
    fa: ['داده ورودی','مدل هوش مصنوعی','خروجی']
  },
  'artificial-neuron': {
    en: ['INPUTS','WEIGHTS + BIAS','ACTIVATION','OUTPUT'],
    fa: ['ورودی‌ها','وزن‌ها + بایاس','تابع فعال‌سازی','خروجی']
  },
  'neural-network': {
    en: ['INPUT LAYER','HIDDEN LAYER 1','HIDDEN LAYER 2','OUTPUT LAYER'],
    fa: ['لایه ورودی','لایه پنهان ۱','لایه پنهان ۲','لایه خروجی']
  },
  training: {
    en: ['PREDICTION','LOSS','BACKPROPAGATION','UPDATE'],
    fa: ['پیش‌بینی','تابع خطا','پس‌انتشار','به‌روزرسانی']
  },
  'training-data': {
    en: ['TEXT DATA','IMAGE DATA','AUDIO DATA','LABELS'],
    fa: ['داده متنی','داده تصویری','داده صوتی','برچسب‌ها']
  },
  'machine-learning': {
    en: ['SUPERVISED','UNSUPERVISED','REINFORCEMENT'],
    fa: ['یادگیری نظارت‌شده','یادگیری بدون‌نظارت','یادگیری تقویتی']
  },
  'deep-learning': {
    en: ['EARLY FEATURES','HIDDEN REPRESENTATIONS','DEEP FEATURES','PREDICTION'],
    fa: ['ویژگی‌های اولیه','نمایش‌های پنهان','ویژگی‌های عمیق','پیش‌بینی']
  },
  'model-training': {
    en: ['TRAINING BATCH','MODEL PARAMETERS','LOSS','OPTIMIZER'],
    fa: ['بچ آموزشی','پارامترهای مدل','خطا','بهینه‌ساز']
  },
  tokens: {
    en: ['TOKEN 01','TOKEN 02','TOKEN 03','TOKEN IDS'],
    fa: ['توکن ۰۱','توکن ۰۲','توکن ۰۳','شناسه توکن‌ها']
  },
  embeddings: {
    en: ['EMBEDDING VECTOR','SEMANTIC SPACE','SIMILAR CONCEPTS'],
    fa: ['بردار امبدینگ','فضای معنایی','مفاهیم مشابه']
  },
  llm: {
    en: ['CONTEXT','TRANSFORMER LAYERS','NEXT-TOKEN SCORES','NEXT TOKEN'],
    fa: ['زمینه','لایه‌های ترنسفورمر','امتیاز توکن بعدی','توکن بعدی']
  },
  transformer: {
    en: ['TOKEN EMBEDDINGS','MULTI-HEAD ATTENTION','FEED FORWARD','RESIDUAL PATH'],
    fa: ['امبدینگ توکن‌ها','توجه چندسری','شبکه پیش‌خور','مسیر باقیمانده']
  },
  attention: {
    en: ['QUERY','KEY','VALUE','ATTENTION WEIGHTS'],
    fa: ['Query','Key','Value','وزن‌های توجه']
  },
  prompt: {
    en: ['PROMPT','TOKENIZATION','EMBEDDINGS','MODEL CONTEXT'],
    fa: ['پرامپت','توکن‌سازی','امبدینگ‌ها','زمینه مدل']
  },
  generation: {
    en: ['CONTEXT','TOKEN PROBABILITIES','SAMPLING','GENERATED TOKEN'],
    fa: ['زمینه','احتمال توکن‌ها','نمونه‌گیری','توکن تولیدشده']
  },
  'generative-ai': {
    en: ['LEARNED PATTERNS','LATENT REPRESENTATION','GENERATION','NEW CONTENT'],
    fa: ['الگوهای آموخته‌شده','نمایش نهفته','تولید','محتوای جدید']
  },
  'computer-vision': {
    en: ['PIXELS','VISUAL FEATURES','OBJECT DETECTION','PREDICTION'],
    fa: ['پیکسل‌ها','ویژگی‌های بصری','تشخیص شیء','پیش‌بینی']
  },
  'image-generation': {
    en: ['RANDOM NOISE','DENOISING','LATENT IMAGE','FINAL IMAGE'],
    fa: ['نویز تصادفی','حذف نویز','تصویر نهفته','تصویر نهایی']
  },
  hallucinations: {
    en: ['MODEL PREDICTION','PLAUSIBLE TEXT','UNVERIFIED CLAIM','VERIFICATION'],
    fa: ['پیش‌بینی مدل','متن محتمل','ادعای تأییدنشده','راستی‌آزمایی']
  },
  'ai-pipeline': {
    en: ['DATA','TRAINING','MODEL','INFERENCE','OUTPUT'],
    fa: ['داده','آموزش','مدل','استنتاج','خروجی']
  }
};

const LESSON_ORDER = [
  'introduction','artificial-neuron','neural-network','training','training-data',
  'machine-learning','deep-learning','model-training','tokens','embeddings',
  'llm','transformer','attention','prompt','generation','generative-ai',
  'computer-vision','image-generation','hallucinations','ai-pipeline'
];

const style = document.createElement('style');
style.textContent = `
  #modelLabels{position:fixed;inset:0;z-index:8;pointer-events:none;overflow:hidden}
  #modelLabels svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
  .label-wire{stroke:url(#labelGradient);stroke-width:1.2;opacity:.82;filter:drop-shadow(0 0 5px rgba(72,239,255,.55))}
  .label-pin{position:absolute;width:10px;height:10px;border-radius:50%;transform:translate(-50%,-50%);background:#48efff;border:2px solid rgba(255,255,255,.92);box-shadow:0 0 0 5px rgba(72,239,255,.13),0 0 18px rgba(72,239,255,.95)}
  .label-pin:after{content:'';position:absolute;inset:-8px;border:1px solid rgba(72,239,255,.32);border-radius:50%;animation:pinPulse 1.8s ease-out infinite}
  .model-tag{position:absolute;transform:translate(-50%,-50%);padding:8px 11px;border:1px solid rgba(151,232,255,.24);border-radius:10px;background:linear-gradient(135deg,rgba(9,26,49,.9),rgba(29,20,56,.82));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#eafaff;font:700 10px/1.15 Inter,system-ui,sans-serif;letter-spacing:.09em;text-transform:uppercase;white-space:nowrap;box-shadow:0 10px 28px rgba(0,0,0,.36),inset 0 1px rgba(255,255,255,.09)}
  .model-tag:before{content:'';display:inline-block;width:5px;height:5px;margin-inline-end:7px;border-radius:50%;background:#48efff;box-shadow:0 0 9px #48efff;vertical-align:1px}
  html[lang=fa] .model-tag{font-family:Vazirmatn,Inter,sans-serif;letter-spacing:0;text-transform:none;font-size:11px}
  @keyframes pinPulse{0%{transform:scale(.65);opacity:.9}100%{transform:scale(1.55);opacity:0}}
  @media(max-width:700px){.model-tag{font-size:8px;padding:6px 8px}.model-label-extra{display:none}}
`;
document.head.appendChild(style);

const layer = document.createElement('div');
layer.id = 'modelLabels';
layer.innerHTML = `<svg aria-hidden="true"><defs><linearGradient id="labelGradient"><stop offset="0" stop-color="#48efff"/><stop offset="1" stop-color="#7657ff"/></linearGradient></defs><g id="labelLines"></g></svg><div id="labelPins"></div><div id="labelTags"></div>`;
document.body.appendChild(layer);

const linesGroup = layer.querySelector('#labelLines');
const pinsRoot = layer.querySelector('#labelPins');
const tagsRoot = layer.querySelector('#labelTags');

let activeScene = null;
let activeCamera = null;
let activeRenderer = null;
let labelEntries = [];

function currentSlug(){
  const raw = location.hash.replace(/^#\/?/,'');
  return raw || 'home';
}

function currentLang(){
  return document.documentElement.lang === 'fa' ? 'fa' : 'en';
}

function directGroups(scene){
  return scene ? scene.children.filter((o)=>o && o.isGroup) : [];
}

function worldCenter(object){
  if (!object) return null;
  if (object.isMesh || object.isLine || object.isPoints) {
    const box = new THREE.Box3().setFromObject(object);
    if (!box.isEmpty()) return box.getCenter(new THREE.Vector3());
  }
  return object.getWorldPosition(new THREE.Vector3());
}

function averageObjects(objects){
  const valid = objects.filter(Boolean);
  if (!valid.length) return null;
  const out = new THREE.Vector3();
  let count = 0;
  valid.forEach((obj)=>{
    const p = worldCenter(obj);
    if (p) { out.add(p); count += 1; }
  });
  return count ? out.multiplyScalar(1 / count) : null;
}

function homeAnchor(index){
  const groups = directGroups(activeScene);
  const robot = groups[1] || groups[0];
  if (!robot) return null;
  const children = robot.children || [];
  if (index === 0) return worldCenter(children[3] || robot); // head
  if (index === 1) return worldCenter(children[2] || children[1] || robot); // glowing core
  return worldCenter(children[0] || robot); // body shell
}

function lessonAnchor(slug, index, count){
  const groups = directGroups(activeScene);
  const viz = groups[0];
  if (!viz) return null;

  const lessonIndex = LESSON_ORDER.indexOf(slug);
  const mode = lessonIndex >= 0 ? lessonIndex % 5 : 0;
  const meshes = viz.children.filter((o)=>o && o.isMesh);

  if (!meshes.length) return worldCenter(viz);

  // Radial scenes: center node + real outer nodes. Each label is tied to an actual sphere.
  if (mode === 0) {
    if (count === 3) {
      const map = [1, 0, Math.min(meshes.length - 1, 5)];
      return worldCenter(meshes[map[index] ?? 0]);
    }
    const spread = [1, 0, 3, 6, 7];
    return worldCenter(meshes[spread[index] ?? Math.min(index, meshes.length - 1)]);
  }

  // Layered scenes: labels point to the physical nodes that form each actual layer.
  if (mode === 1) {
    const ranges = [[0,4],[4,10],[10,15],[15,18]];
    const range = ranges[Math.min(index, ranges.length - 1)];
    return averageObjects(meshes.slice(range[0], range[1]));
  }

  // Grid/block scenes: each educational stage is anchored to a visible block cluster.
  if (mode === 2) {
    const groupsByStage = count >= 4
      ? [[0,1,6,7],[2,3,8,9],[10,11,14,15],[4,5,16,17]]
      : [[0,1,6,7],[8,9,10,11],[16,17]];
    const ids = groupsByStage[Math.min(index, groupsByStage.length - 1)] || [0];
    return averageObjects(ids.map((id)=>meshes[id]));
  }

  // Ring scenes: project a real point on each torus surface, not the empty center.
  if (mode === 3) {
    const mesh = meshes[Math.min(index, meshes.length - 1)];
    if (!mesh) return worldCenter(viz);
    const radius = mesh.geometry?.parameters?.radius || 0.6;
    const angle = (index / Math.max(1, count)) * Math.PI * 2;
    const local = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    return mesh.localToWorld(local);
  }

  // Particle/cloud scenes: select distinct visible particles so every label has a concrete target.
  const ids = [2, 9, 16, 23, 27];
  return worldCenter(meshes[ids[index] ?? Math.min(index, meshes.length - 1)]);
}

function project(world){
  if (!world || !activeCamera || !activeRenderer) return null;
  const rect = activeRenderer.domElement.getBoundingClientRect();
  const v = world.clone().project(activeCamera);
  if (!Number.isFinite(v.x) || !Number.isFinite(v.y) || v.z < -1 || v.z > 1) return null;
  return {
    x: rect.left + (v.x + 1) * 0.5 * rect.width,
    y: rect.top + (1 - v.y) * 0.5 * rect.height,
    visible: v.z >= -1 && v.z <= 1
  };
}

function makeEntry(text, index, total){
  const line = document.createElementNS('http://www.w3.org/2000/svg','line');
  line.setAttribute('class','label-wire');
  linesGroup.appendChild(line);

  const pin = document.createElement('span');
  pin.className = `label-pin ${index > 2 ? 'model-label-extra' : ''}`;
  pinsRoot.appendChild(pin);

  const tag = document.createElement('span');
  tag.className = `model-tag ${index > 2 ? 'model-label-extra' : ''}`;
  tag.textContent = text;
  tagsRoot.appendChild(tag);

  return { line, pin, tag, index, total };
}

function rebuildLabels(){
  linesGroup.replaceChildren();
  pinsRoot.replaceChildren();
  tagsRoot.replaceChildren();
  labelEntries = [];

  const slug = currentSlug();
  const lang = currentLang();
  const labels = (LABELS[slug] || LABELS.home)[lang] || [];
  labels.forEach((text,index)=>labelEntries.push(makeEntry(text,index,labels.length)));
}

function placeLabels(){
  if (!activeScene || !activeCamera || !activeRenderer || !labelEntries.length) return;
  const slug = currentSlug();
  const mobile = window.innerWidth <= 700;

  labelEntries.forEach((entry)=>{
    const world = slug === 'home'
      ? homeAnchor(entry.index)
      : lessonAnchor(slug, entry.index, entry.total);
    const p = project(world);
    const display = !!p && p.visible && (!mobile || entry.index < 3);

    entry.pin.style.display = display ? '' : 'none';
    entry.tag.style.display = display ? '' : 'none';
    entry.line.style.display = display ? '' : 'none';
    if (!display) return;

    const rightSide = p.x < window.innerWidth * 0.68;
    const horizontal = mobile ? 72 : 118;
    const verticalPattern = [-34, 30, -22, 38, 0];
    let tx = p.x + (rightSide ? horizontal : -horizontal);
    let ty = p.y + verticalPattern[entry.index % verticalPattern.length];

    const halfTag = mobile ? 58 : 82;
    tx = Math.max(halfTag + 8, Math.min(window.innerWidth - halfTag - 8, tx));
    ty = Math.max(88, Math.min(window.innerHeight - 44, ty));

    entry.pin.style.left = `${p.x}px`;
    entry.pin.style.top = `${p.y}px`;
    entry.tag.style.left = `${tx}px`;
    entry.tag.style.top = `${ty}px`;

    const endX = tx + (rightSide ? -42 : 42);
    entry.line.setAttribute('x1', p.x.toFixed(1));
    entry.line.setAttribute('y1', p.y.toFixed(1));
    entry.line.setAttribute('x2', endX.toFixed(1));
    entry.line.setAttribute('y2', ty.toFixed(1));
  });
}

// Capture the actual scene and camera used by the app. The annotation system then
// projects real 3D object positions into screen space on every rendered frame.
if (!THREE.WebGLRenderer.prototype.__aiLabelsWrapped) {
  const originalRender = THREE.WebGLRenderer.prototype.render;
  THREE.WebGLRenderer.prototype.render = function(scene, camera){
    activeScene = scene;
    activeCamera = camera;
    activeRenderer = this;
    placeLabels();
    return originalRender.call(this, scene, camera);
  };
  THREE.WebGLRenderer.prototype.__aiLabelsWrapped = true;
}

window.addEventListener('hashchange',()=>{
  requestAnimationFrame(()=>{
    rebuildLabels();
    placeLabels();
  });
});

window.addEventListener('resize',()=>requestAnimationFrame(placeLabels));

new MutationObserver(()=>{
  requestAnimationFrame(()=>{
    rebuildLabels();
    placeLabels();
  });
}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});

rebuildLabels();
