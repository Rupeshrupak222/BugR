import { defineConfig } from 'vite';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  root: '.',
  build: { rollupOptions: { input: 'web.html' } },
  server: {
    middlewareMode: false,
    proxy: { '/api': 'http://127.0.0.1:3000' }
  },
  plugins: [tailwind(), {
    name: 'public-preview-routes',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (url === '/' || /^\/(?:labs\/)?[a-z-]+\.html$/.test(url)) req.url = '/web.html';
        next();
      });
    }
  }]
});
