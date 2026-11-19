import { fileURLToPath } from 'node:url';
import { createApp } from '../server/app.js';

const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const port = Number(process.env.PORT ?? 4173);
const env = process.argv.includes('--isolated-leads') ? process.env : {};
createApp({ dist, env }).listen(port, '127.0.0.1', () => {
  console.log(`Bug Refinery Liquid Glass Landing at http://127.0.0.1:${port}`);
});

