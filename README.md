# HOW AI WORKS

**HOW AI WORKS** is a colorful, interactive 3D educational experience that explains major artificial-intelligence concepts through real-time WebGL visualizations instead of a traditional card-based course.

## Highlights

- Friendly procedural 3D robot guide with pointer-following eyes, idle animation and click reactions
- 20 educational chapters covering AI basics, artificial neurons, neural networks, training, machine learning, deep learning, tokens, embeddings, LLMs, transformers, attention, prompting, generation, generative AI, computer vision, diffusion concepts, hallucinations and the complete AI pipeline
- Interactive artificial-neuron controls for inputs, weights and bias
- Animated neural-network forward pass and backpropagation concept demo
- Editable tokenization and prompt-processing demos
- 3D semantic embedding space
- Attention visualization with dynamic word-to-word relationships
- Simplified diffusion/denoising visualization
- Local learning progress stored with `localStorage`
- Responsive mobile UI and adaptive pixel ratio
- Keyboard-focus styles and reduced-motion support
- Hash routing for reliable GitHub Pages refresh behavior

> Educational visualizations intentionally simplify complex systems. The project distinguishes conceptual diagrams from literal implementations and does not claim that AI works like a biological brain.

## Tech

- Vite
- Three.js / WebGL
- OrbitControls
- HTML5 / CSS3 / JavaScript ES modules
- GitHub Actions + GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal.

## Production build

```bash
npm run build
npm run preview
```

The Vite base path is configured for this repository:

```js
base: '/How-AI-Works-/'
```

## GitHub Pages deployment

The workflow at `.github/workflows/pages.yml` builds `dist/` and deploys it using the official GitHub Pages actions whenever `main` is updated.

If Pages has never been enabled for the repository, open **Repository Settings → Pages → Build and deployment → Source → GitHub Actions** once. After that, pushes to `main` deploy automatically.

Expected public URL:

`https://saaeiddev.github.io/How-AI-Works-/`

## 3D assets and licenses

This initial production version uses **procedurally generated Three.js geometry** for the robot, learning objects, networks, particles, interfaces and scientific diagrams. It currently includes no third-party GLB/GLTF models, so there are no external 3D asset licenses to attribute.

If future versions add external assets, add the creator, source URL and license here, and optimize the asset before shipping.

## Performance notes

- Mobile devices use a lower maximum device-pixel ratio.
- Particle counts are reduced on smaller screens.
- Geometry is lightweight and reused conceptually across scenes.
- No large model or texture download is required for the initial experience.

## Project structure

```text
src/
  data/
    lessons.js
  three/
    World.js
  ui/
    AppUI.js
  main.js
  styles.css
```

## License

Project code belongs to the repository owner. Third-party package licenses are governed by their respective projects.
