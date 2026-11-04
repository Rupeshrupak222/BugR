import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './browser',
  use: { baseURL: 'http://127.0.0.1:3000', reducedMotion: 'reduce', channel: process.env.BUGR_TEST_BROWSER },
  webServer: { command: 'npm start', url: 'http://127.0.0.1:3000', reuseExistingServer: false }
});
