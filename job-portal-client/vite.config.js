import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  css:{
postcss:'./postcss.config.js',
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
});
