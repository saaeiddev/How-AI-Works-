import './styles.css';
import { AIWorld } from './three/World.js';
import { AppUI } from './ui/AppUI.js';
import { lessons } from './data/lessons.js';

const root = document.querySelector('#app');
root.innerHTML = `
  <main class="app-shell">
    <div id="stage" class="stage" aria-label="Interactive 3D AI visualization"></div>
    <div id="ui"></div>
    <div id="loading" class="loading-screen" role="status">
      <div class="loader-robot" aria-hidden="true">
        <div class="loader-antenna"></div><div class="loader-face"><i></i><i></i></div>
      </div>
      <p class="eyebrow">HOW AI WORKS</p>
      <h1>Initializing Intelligence…</h1>
      <div class="loading-track"><span></span></div>
      <p id="loading-copy">Connecting neural pathways</p>
    </div>
    <div id="fallback" class="fallback" hidden>
      <h2>3D mode is unavailable</h2>
      <p>Your browser could not start WebGL. The lesson navigation and educational content are still available.</p>
    </div>
  </main>`;

const loadingCopy = document.querySelector('#loading-copy');
const loader = document.querySelector('#loading');

let world;
try {
  world = new AIWorld(document.querySelector('#stage'));
} catch (error) {
  console.error(error);
  document.querySelector('#fallback').hidden = false;
}

const ui = new AppUI(document.querySelector('#ui'), {
  lessons,
  onNavigate: (slug) => navigate(slug),
  onAction: (action, payload) => world?.handleAction(action, payload),
  onNeuronChange: (params) => world?.setNeuronParams(params),
  onTokenize: (text) => world?.setTokenText(text),
  onPrompt: (text) => world?.runPrompt(text),
  onSound: (enabled) => world?.setSound(enabled)
});

function currentSlug() {
  const raw = location.hash.replace(/^#\/?/, '');
  return raw || 'home';
}

function navigate(slug) {
  location.hash = slug === 'home' ? '#/' : `#/${slug}`;
}

function applyRoute() {
  const slug = currentSlug();
  if (slug === 'home') {
    ui.showHome();
    world?.showHome(() => navigate('introduction'));
    document.title = 'HOW AI WORKS — Interactive 3D AI Lab';
    return;
  }

  const lesson = lessons.find((item) => item.slug === slug) || lessons[0];
  if (lesson.slug !== slug) history.replaceState(null, '', `#/${lesson.slug}`);
  ui.showLesson(lesson);
  world?.showLesson(lesson.slug);
  document.title = `${lesson.title} — HOW AI WORKS`;
}

window.addEventListener('hashchange', applyRoute);

const loadingMessages = ['Connecting neural pathways', 'Calibrating robot guide', 'Loading AI Lab'];
let msg = 0;
const ticker = setInterval(() => {
  msg = (msg + 1) % loadingMessages.length;
  loadingCopy.textContent = loadingMessages[msg];
}, 650);

Promise.resolve(world?.ready).finally(() => {
  clearInterval(ticker);
  setTimeout(() => loader.classList.add('is-hidden'), 420);
  applyRoute();
});

window.addEventListener('beforeunload', () => world?.dispose());
