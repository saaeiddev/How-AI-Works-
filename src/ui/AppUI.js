import { categoryOrder } from '../data/lessons.js';

export class AppUI {
  constructor(container, callbacks) {
    this.container = container;
    this.cb = callbacks;
    this.progress = new Set(JSON.parse(localStorage.getItem('how-ai-works-progress') || '[]'));
    this.sound = false;
    this.level = 'basic';
    this.activeLesson = null;
    this.renderShell();
  }

  renderShell() {
    this.container.innerHTML = `
      <header class="topbar glass">
        <button class="brand" data-nav="home" aria-label="Home"><span class="brand-orb"></span><b>HOW AI WORKS</b></button>
        <div class="journey"><span>YOUR AI JOURNEY</span><strong id="progressText">0/20</strong><i><em id="progressBar"></em></i></div>
        <div class="top-actions"><button class="icon-btn" id="soundBtn" aria-label="Toggle sound" title="Sound">◔</button><button class="icon-btn" id="menuBtn" aria-label="Open lessons" title="Lessons">☰</button></div>
      </header>
      <aside class="lesson-drawer glass" id="drawer" aria-label="Lessons"><div class="drawer-head"><div><p class="eyebrow">EXPLORE</p><h2>AI Lab Map</h2></div><button class="icon-btn" id="closeDrawer" aria-label="Close lessons">×</button></div><div id="lessonList" class="lesson-list"></div></aside>
      <section id="homeUI" class="home-ui"><div class="hero-copy"><p class="eyebrow pill">INTERACTIVE 3D AI MUSEUM</p><h1>See how <span>AI</span><br/>actually works.</h1><p>Explore neurons, training, tokens, transformers, attention, generation and more—inside a colorful interactive AI laboratory.</p><button class="primary" id="enterBtn">Meet your AI guide <span>→</span></button><div class="hero-meta"><span>20 interactive lessons</span><span>Real-time WebGL</span><span>No account needed</span></div></div><div class="robot-hint glass"><span class="pulse-dot"></span><b>Click the robot</b><small>Your guide is ready</small></div></section>
      <section id="lessonUI" class="lesson-ui" hidden><div class="lesson-heading"><p class="eyebrow" id="lessonCategory"></p><h1 id="lessonTitle"></h1><p id="lessonBasic"></p><div class="level-tabs" role="tablist" aria-label="Explanation depth"><button data-level="basic" class="active">Basic</button><button data-level="details">More details</button><button data-level="advanced">Advanced</button></div></div><div id="controlPanel" class="control-panel glass"></div><div id="lessonTip" class="lesson-tip glass"></div><div class="lesson-nav glass"><button id="prevBtn">← <span>Previous</span></button><button id="completeBtn" class="complete-btn">Mark complete ✓</button><button id="nextBtn"><span>Next</span> →</button></div></section>`;
    this.home = this.container.querySelector('#homeUI'); this.lesson = this.container.querySelector('#lessonUI'); this.drawer = this.container.querySelector('#drawer'); this.controlPanel = this.container.querySelector('#controlPanel'); this.tip = this.container.querySelector('#lessonTip');
    this.container.querySelector('#menuBtn').onclick = () => this.drawer.classList.add('open');
    this.container.querySelector('#closeDrawer').onclick = () => this.drawer.classList.remove('open');
    this.container.querySelector('[data-nav="home"]').onclick = () => this.cb.onNavigate('home');
    this.container.querySelector('#enterBtn').onclick = () => this.cb.onNavigate('introduction');
    this.container.querySelector('#soundBtn').onclick = (e) => { this.sound = !this.sound; e.currentTarget.classList.toggle('active', this.sound); e.currentTarget.textContent = this.sound ? '♪' : '◔'; this.cb.onSound(this.sound); };
    this.container.querySelectorAll('[data-level]').forEach((button) => { button.onclick = () => { this.level = button.dataset.level; this.container.querySelectorAll('[data-level]').forEach((b) => b.classList.toggle('active', b === button)); this.updateExplanation(); }; });
    this.renderLessonList(); this.updateProgress();
  }

  renderLessonList() {
    const list = this.container.querySelector('#lessonList');
    list.innerHTML = categoryOrder.map((category) => `<div class="lesson-group"><p>${category}</p>${this.cb.lessons.filter((l) => l.category === category).map((l) => `<button class="lesson-link" data-slug="${l.slug}"><span>${String(l.number).padStart(2, '0')}</span><b>${l.title}</b><i>${this.progress.has(l.slug) ? '✓' : '→'}</i></button>`).join('')}</div>`).join('');
    list.querySelectorAll('[data-slug]').forEach((button) => button.onclick = () => { this.drawer.classList.remove('open'); this.cb.onNavigate(button.dataset.slug); });
  }

  showHome() { this.activeLesson = null; this.home.hidden = false; this.lesson.hidden = true; }
  showLesson(lesson) {
    this.activeLesson = lesson; this.home.hidden = true; this.lesson.hidden = false;
    this.container.querySelector('#lessonCategory').textContent = `${String(lesson.number).padStart(2, '0')}  /  ${lesson.category}`; this.container.querySelector('#lessonTitle').textContent = lesson.title; this.updateExplanation(); this.renderControls(lesson.slug);
    const index = this.cb.lessons.findIndex((l) => l.slug === lesson.slug), prev = this.cb.lessons[index - 1], next = this.cb.lessons[index + 1];
    const prevBtn = this.container.querySelector('#prevBtn'), nextBtn = this.container.querySelector('#nextBtn'); prevBtn.disabled = !prev; nextBtn.disabled = !next; prevBtn.onclick = () => prev && this.cb.onNavigate(prev.slug); nextBtn.onclick = () => next && this.cb.onNavigate(next.slug);
    const complete = this.container.querySelector('#completeBtn'); complete.classList.toggle('done', this.progress.has(lesson.slug)); complete.textContent = this.progress.has(lesson.slug) ? 'Completed ✓' : 'Mark complete ✓'; complete.onclick = () => this.toggleComplete(lesson.slug);
  }
  updateExplanation() { if (this.activeLesson) this.container.querySelector('#lessonBasic').textContent = this.activeLesson[this.level]; }
  toggleComplete(slug) { this.progress.has(slug) ? this.progress.delete(slug) : this.progress.add(slug); localStorage.setItem('how-ai-works-progress', JSON.stringify([...this.progress])); this.updateProgress(); this.renderLessonList(); this.showLesson(this.activeLesson); }
  updateProgress() { const n = this.progress.size; this.container.querySelector('#progressText').textContent = `${n}/20`; this.container.querySelector('#progressBar').style.width = `${n / 20 * 100}%`; }

  renderControls(slug) {
    const action = (label, id) => `<button class="primary compact" data-action="${id}">${label}</button>`;
    const tips = { introduction:'Click the glowing AI components in the 3D scene to inspect the flow from data to output.', 'artificial-neuron':'Move the sliders and watch the weighted sum and output react in real time.', 'neural-network':'Run the network, then rotate the scene to follow signals moving layer by layer.', training:'Run a learning step to see error travel backward through the network.', tokens:'Try your own sentence. Each floating block is a simplified token visualization.', embeddings:'Drag to rotate the semantic space. Related examples are intentionally placed near one another.', attention:'Select different words to see the attention pattern reconfigure.', prompt:'Enter a prompt, then watch it move through a simplified LLM processing pipeline.', generation:'Change generation speed and watch candidate tokens compete at every step.', 'image-generation':'Scrub the denoising slider from random noise toward structured visual features.', 'ai-pipeline':'Zoom out to see training and inference as one connected system.' };
    this.tip.innerHTML = `<span>TIP</span><p>${tips[slug] || 'Drag to rotate, scroll or pinch to zoom, and click glowing objects to explore.'}</p>`;
    let html = `<div class="control-title"><span>Interactive Controls</span><small>LIVE</small></div>`;
    if (slug === 'artificial-neuron') html += this.slider('Input A','inputA',0,1,.7,.01)+this.slider('Input B','inputB',0,1,.35,.01)+this.slider('Weight A','weightA',-2,2,1.2,.05)+this.slider('Weight B','weightB',-2,2,-.6,.05)+this.slider('Bias','bias',-2,2,.15,.05);
    else if (slug === 'tokens') html += `<label class="text-control"><span>Sentence</span><input id="tokenInput" value="Artificial intelligence is amazing." maxlength="90"/></label>${action('Tokenize sentence','tokenize')}`;
    else if (slug === 'prompt') html += `<label class="text-control"><span>Your prompt</span><textarea id="promptInput" maxlength="120">Explain gravity simply.</textarea></label>${action('Run prompt through AI','prompt')}`;
    else if (slug === 'generation') html += this.slider('Generation speed','speed',.4,2.4,1.1,.1)+action('Generate answer','generate');
    else if (slug === 'image-generation') html += this.slider('Denoising stage','denoise',0,1,0,.02);
    else { const labels = { 'neural-network':'Run Neural Network', training:'Run Learning Step', 'training-data':'Cycle Data Types', 'machine-learning':'Run Learning Demo', 'deep-learning':'Travel Through Layers', 'model-training':'Start Training', embeddings:'Rearrange Semantic Space', llm:'Predict Next Token', transformer:'Step Through Transformer', attention:'Change Focus Word', 'generative-ai':'Cycle Generative Portals', 'computer-vision':'Scan Scene', hallucinations:'Compare Answers', 'ai-pipeline':'Run Complete Pipeline', introduction:'Run AI Flow' }; html += action(labels[slug] || 'Run Visualization','run'); }
    this.controlPanel.innerHTML = html; this.bindControls(slug);
  }

  slider(label,id,min,max,value,step) { return `<label class="range-control"><span>${label}<b id="${id}Value">${value}</b></span><input data-range="${id}" type="range" min="${min}" max="${max}" value="${value}" step="${step}" /></label>`; }
  bindControls(slug) {
    const ranges = this.controlPanel.querySelectorAll('[data-range]');
    ranges.forEach((range) => range.addEventListener('input', () => { const id=range.dataset.range, value=Number(range.value), out=this.controlPanel.querySelector(`#${id}Value`); if(out) out.textContent=value.toFixed(value%1===0?0:2); if(slug==='artificial-neuron'){ const values={}; ranges.forEach((r)=>values[r.dataset.range]=Number(r.value)); this.cb.onNeuronChange(values); } else if(slug==='generation') this.cb.onAction('speed',value); else if(slug==='image-generation') this.cb.onAction('denoise',value); }));
    const action=this.controlPanel.querySelector('[data-action]'); if(!action) return; action.onclick=()=>{ const id=action.dataset.action; if(id==='tokenize') this.cb.onTokenize(this.controlPanel.querySelector('#tokenInput').value); else if(id==='prompt') this.cb.onPrompt(this.controlPanel.querySelector('#promptInput').value); else this.cb.onAction(id,slug); };
  }
}
