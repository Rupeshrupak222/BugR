import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
page.on('pageerror', error => console.log('PAGE ERROR', error.message));
page.on('console', message => { if (message.type() === 'error') console.log('CONSOLE', message.text()); });
await mkdir('test-results/industry-universe', { recursive: true });
await page.addInitScript(() => localStorage.setItem('br_cookie_consent', 'dismissed'));
try {
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('.is-live').waitFor({ timeout: 30000 });
  await page.waitForTimeout(1800);
  console.log('LIVE', await page.locator('canvas').evaluate(c => ({ camera: c.dataset.camera, frames: c.dataset.frames, width: c.width, height: c.height })));
  await page.getByRole('button', { name: 'Pause 3D' }).click();
  await page.screenshot({ path: 'test-results/industry-universe/01-core.png' });
  for (const [index, name] of ['Technology', 'Management & Commerce', 'Engineering & Non-IT', 'Medical', 'Proof & Results', 'Your Next Step'].entries()) {
    await page.getByRole('navigation', { name: 'Scene navigation' }).getByRole('link', { name, exact: true }).click();
    await page.waitForFunction(i => Number(document.querySelector('.industry-universe').dataset.chapter) === i, index + 1);
    await page.waitForTimeout(2400);
    await page.screenshot({ path: `test-results/industry-universe/0${index + 2}-scene.png` });
    console.log('SCENE', index + 1, await page.locator('canvas').getAttribute('data-camera'));
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('.is-live').waitFor({ timeout: 30000 });
  await page.waitForTimeout(900);
  await page.getByRole('button', { name: 'Pause 3D' }).click();
  await page.screenshot({ path: 'test-results/industry-universe/mobile.png' });
  console.log('MOBILE', await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth })));
} finally { await browser.close(); }
