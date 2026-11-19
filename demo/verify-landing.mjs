import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

export async function verifyLanding(browser, baseURL, errors) {
  await mkdir('test-results/glass-landing', { recursive: true });
  const context = await browser.newContext({ baseURL, viewport: { width: 1440, height: 960 } });
  await context.addInitScript(() => localStorage.setItem('br_cookie_consent', 'dismissed'));
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => errors.push(error.message));
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  const screenshot = name => page.screenshot({ path: 'test-results/glass-landing/' + name + '.png', animations: 'disabled' });
  try {
    await page.goto('/');
    await page.getByRole('button', { name: 'Pause hero background' }).waitFor();
    assert.equal(await page.locator('canvas').count(), 0, 'No WebGL canvas');
    assert.equal(await page.locator('video[src]').count(), 1, 'Only hero video loads initially');
    assert.ok(requests.filter(url => /\.mp4/.test(url)).every(url => url.endsWith('/hero.mp4')));
    assert.ok(requests.every(url => !/engine-|models-|renderer-|three/i.test(url)), 'No legacy 3D engine download');
    await page.getByRole('button', { name: 'Pause hero background' }).click();
    const time = await page.locator('video').evaluate(video => video.currentTime);
    await page.waitForTimeout(400);
    assert.equal(await page.locator('video').evaluate(video => video.currentTime), time);
    await page.evaluate(() => document.fonts.ready);
    await screenshot('desktop');
    await page.getByRole('button', { name: 'Play hero background' }).click();
    await page.waitForFunction(() => !document.querySelector('video').paused);
    // Force the end-of-loop boundary so fade/restart is exercised without waiting for the whole film.
    await page.locator('video').evaluate(video => { video.currentTime = video.duration - .6; });
    await page.waitForFunction(() => document.querySelector('video').currentTime < 1.5);
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('.hero-film video').paused);
    const approach = page.getByRole('button', { name: 'Play our approach film' });
    await approach.click();
    await page.getByRole('button', { name: 'Pause our approach film' }).waitFor();
    assert.equal(await page.locator('video[src]').count(), 2);
    await page.getByRole('button', { name: 'Pause our approach film' }).click();
    await page.locator('.industry-entry summary').first().scrollIntoViewIfNeeded();
    await page.locator('.industry-entry summary').first().focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.industry-entry[open] .reading-labs a').count(), 11);
    await page.locator('.industry-entry summary').first().press('Enter');
    for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 650) {
      await page.evaluate(value => scrollTo({ top: value, behavior: 'instant' }), y); await page.waitForTimeout(120);
    }
    await page.waitForTimeout(700);
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.getByRole('button', { name: 'Pause hero background' }).click();
    await page.screenshot({ path: 'test-results/glass-landing/full-page.png', fullPage: true, animations: 'disabled' });
    await page.setViewportSize({ width: 390, height: 844 });
    const mobileRequests = [];
    page.on('request', request => mobileRequests.push(request.url()));
    await page.goto('/');
    await page.getByRole('button', { name: 'Play hero background' }).waitFor();
    assert.equal(await page.locator('video').count(), 0, 'Mobile defaults to still images');
    assert.ok(mobileRequests.every(url => !/\.mp4/.test(url)), 'No mobile video download without a click');
    await screenshot('mobile');
    await page.getByRole('button', { name: 'Menu' }).click();
    assert.equal(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible(), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible(), false);
    await page.setViewportSize({ width: 1440, height: 960 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('button', { name: 'Play hero background' }).waitFor();
    assert.equal(await page.locator('video').count(), 0, 'Reduced motion loads no videos');
    await page.route('**/assets/landing/hero.mp4', route => route.abort());
    await page.getByRole('button', { name: 'Play hero background' }).click();
    await page.getByRole('status').filter({ hasText: 'Video could not load' }).waitFor();
    assert.equal(await page.locator('.hero-film img').isVisible(), true, 'Failed video keeps visible poster');
    assert.equal(await page.locator('.hero-capsule').getAttribute('href'), '#labs');
    assert.equal(await page.getByRole('link', { name: 'Register your interest' }).getAttribute('href'), '#signup');
    await page.goto('/labs.html');
    assert.equal(await page.locator('canvas, video').count(), 0, 'Lab catalogue is static');
    console.log('Glass landing: hero pause/restart, on-demand films, no WebGL, mobile stills, reduced motion, failed-video fallback, keyboard lab access and static catalogue passed');
  } finally { await context.close(); }

  const saver = await browser.newContext({ baseURL, viewport: { width: 1440, height: 960 } });
  await saver.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true, effectiveType: '3g' }, configurable: true }));
  const slowPage = await saver.newPage();
  await slowPage.goto('/');
  await slowPage.getByRole('button', { name: 'Play hero background' }).waitFor();
  assert.equal(await slowPage.locator('video').count(), 0, 'Data Saver / slow connection skips autoplay');
  await saver.close();
}
