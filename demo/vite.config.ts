import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tailwind from '@tailwindcss/vite';

export default defineConfig(({ isSsrBuild }) => ({
  root: fileURLToPath(new URL('.', import.meta.url)),
  build: { rollupOptions: { input: fileURLToPath(new URL('./web.html', import.meta.url)) } },
  publicDir: isSsrBuild ? false : 'public',
  plugins: [tailwind()]
}));
