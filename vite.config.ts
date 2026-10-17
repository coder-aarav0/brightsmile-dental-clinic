import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@phosphor-icons/react', 'gsap', 'gsap/ScrollTrigger'],
  },
  server: {
    port: 5190,
    strictPort: true,
    host: true,
  },
});
