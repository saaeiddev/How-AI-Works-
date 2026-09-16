import './styles.css';
import { AIWorld } from './three/World.js';
import './three/RobotUpgrade.js';
import { AppUI } from './ui/AppUI.js';
import { lessons } from './data/lessons.js';

const root = document.querySelector('#app');

root.innerHTML = `
  <main class="app-shell">
    <div id="stage" class="stage" aria-label="Interactive 3D AI visualization"></div>
    <div id="ui"></div>

    <div id="loading" class="loading-screen" role="status">
      <div class="loader-robot" aria-hidden="true">
        <div class="loader-antenna"></div>
        <div class="loader-face"><i></i><i></i></div>
      </div>
      <p class="eyebrow">HOW AI WORKS</p>
      <h1>Initializing Intelligence…</h1>
      <div class="loading-track"><span></span></div>
      <p id="loading-copy">Connecting neural pathways</p>
    </div>

    <div id="fallback" class="fallback" hidden>
      <h2>3D mode is unavailable</h2>
      <p>The educational interface is still available.</p>
    </div>
  </main>`;

const loader = document.querySelector('#loading');
const loadingCopy = document.querySelector('#loading-copy');
const fallback = document.querySelector('#fallback');

let loaderHidden = false;
function hideLoader() {
  if (loaderHidden) return;
  loaderHidden = true;
  loader?.classList.add('is-hidden');
}

// Hard failsafe: the loading overlay must never trap the user forever.
const loadingFailsafe = window.setTimeout(hideLoader, 2400);

const loadingMessages = [
  'Connecting neural pathways',
  'Calibrating NOVA AI guide',
  'Loading immersive AI Lab'
];
let messageIndex = 0;
const ticker = window.setInterval(() => {
  messageIndex = (messageIndex + 1) % loadingMessages.length;
  if (loadingCopy) loadingCopy.textContent = loadingMessages[messageIndex];
}, 650);

let world = null;
let ui = null;

try {
  world = new AIWorld(document.querySelector('#stage'));
} catch (error) {
  console.error('AIWorld failed to initialize:', error);
  if (fallback) fallback.hidden = false;
}

function currentSlug() {
  const raw = location.hash.replace(/^#\/?/, '');
  return raw || 'home';
}

function navigate(slug) {
  location.hash = slug === 'home' ? '#/' : `#/${slug}`;
}

function applyRoute() {
  if (!ui) return;

  const slug = currentSlug();

  if (slug === 'home') {
    ui.showHome();
    if (world) {
      try {
        world.showHome(() => navigate('introduction'));
      } catch (error) {
        console.error('Home 3D scene failed:', error);
        if (fallback) fallback.hidden = false;
      }
    }
    document.title = 'HOW AI WORKS — Interactive 3D AI Lab';
    return;
  }

  const lesson = lessons.find((item) => item.slug === slug) || lessons[0];
  if (lesson.slug !== slug) history.replaceState(null, '', `#/${lesson.slug}`);

  ui.showLesson(lesson);

  if (world) {
    try {
      world.showLesson(lesson.slug);
    } catch (error) {
      console.error('Lesson 3D scene failed:', error);
      if (fallback) fallback.hidden = false;
    }
  }

  document.title = `${lesson.title} — HOW AI WORKS`;
}

try {
  ui = new AppUI(document.querySelector('#ui'), {
    lessons,
    onNavigate: (slug) => navigate(slug),
    onAction: (action, payload) => world?.handleAction(action, payload),
    onNeuronChange: (params) => world?.setNeuronParams(params),
    onTokenize: (text) => world?.setTokenText(text),
    onPrompt: (text) => world?.runPrompt(text),
    onSound: (enabled) => world?.setSound(enabled),
    onLanguage: () => applyRoute()
  });
} catch (error) {
  console.error('UI failed to initialize:', error);
  if (fallback) {
    fallback.hidden = false;
    fallback.querySelector('h2').textContent = 'Interface recovery mode';
    fallback.querySelector('p').textContent = 'A display error occurred. Refreshing the page should restore the interface.';
  }
}

window.addEventListener('hashchange', applyRoute);

Promise.resolve(world?.ready)
  .catch((error) => {
    console.error('3D readiness error:', error);
    if (fallback) fallback.hidden = false;
  })
  .finally(() => {
    window.clearInterval(ticker);
    window.clearTimeout(loadingFailsafe);

    try {
      applyRoute();
    } catch (error) {
      console.error('Initial route failed:', error);
      if (fallback) fallback.hidden = false;
    }

    window.setTimeout(hideLoader, 260);
  });

// If something unexpected happens after boot, do not leave the loading overlay visible.
window.addEventListener('error', () => window.setTimeout(hideLoader, 100));
window.addEventListener('unhandledrejection', () => window.setTimeout(hideLoader, 100));
window.addEventListener('beforeunload', () => world?.dispose());
