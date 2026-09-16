import { defineConfig } from 'vite';

export default defineConfig({
  base: '/How-AI-Works-/',
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 1200
  }
});
