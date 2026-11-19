import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
const hash = value => createHash('sha256').update(value).digest('hex');

export async function verifyUniverse(browser, baseURL, errors) {
  const live = await browser.newContext({ baseURL, viewport: { width: 1440, height: 960 } });
  const page = await live.newPage();
  page.setDefaultTimeout(30000);
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => localStorage.setItem('br_cookie_consent', 'dismissed'));
  await mkdir('test-results/industry-universe', { recursive: true });
  const capture = name => page.screenshot({ path: 'test-results/industry-universe/' + name + '.png', animations: 'disabled' });
  const canvas = page.locator('.universe-surface canvas');
  const nav = page.getByRole('navigation', { name: 'Scene navigation' });
  const sceneNames = ['The Refinery', 'Technology', 'Management & Commerce', 'Engineering & Non-IT', 'Medical', 'Proof & Results', 'Your Next Step'];
  async function settle(index) {
    await page.waitForFunction(i => Math.abs(Number(document.querySelector('.universe-surface canvas')?.dataset.progress) - i / 6) < .0002, index);
    assert.equal(await page.locator('.industry-universe').getAttribute('data-chapter'), String(index));
    await page.waitForTimeout(120);
  }
  try {
    await page.goto('/');
    await page.locator('.is-live').waitFor();
    assert.equal(await canvas.count(), 1);
    assert.equal(await page.locator('.journey-chapter').count(), 7);
    assert.equal(await page.locator('[data-world]').count(), 0);
    await page.getByRole('button', { name: 'Pause 3D' }).click();
    await page.waitForTimeout(250);
    const frozen = await canvas.getAttribute('data-frames');
    await page.waitForTimeout(300);
    assert.equal(await canvas.getAttribute('data-frames'), frozen, 'Paused renderer has no idle animation loop');
    const before = await canvas.screenshot();
    await page.locator('.spatial-label').click();
    await page.waitForTimeout(160);
    assert.equal(await page.locator('.spatial-label').getAttribute('aria-pressed'), 'true');
    assert.notEqual(hash(await canvas.screenshot()), hash(before), 'Inspection changes real rendered geometry');
    await page.locator('.spatial-label').click();
    await capture('01-core');
    const start = await canvas.getAttribute('data-camera');
    await page.mouse.wheel(0, 500);
    await page.waitForFunction(() => Number(document.querySelector('canvas').dataset.progress) > .03);
    assert.notEqual(await canvas.getAttribute('data-camera'), start, 'Scrolling moves camera');
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await settle(0);
    assert.equal(await canvas.getAttribute('data-camera'), start, 'Reverse scroll retraces camera path');
    for (let i = 1; i < sceneNames.length; i++) {
      await nav.getByRole('link', { name: sceneNames[i], exact: true }).click();
      await settle(i);
      assert.equal(await nav.getByRole('link', { name: sceneNames[i], exact: true }).getAttribute('aria-current'), 'step');
      assert.equal(await page.locator('.journey-copy:visible').count(), 1);
      await capture('0' + (i + 1) + '-scene');
      if (i < 5) {
        await page.getByRole('button', { name: 'Field notes +' }).click();
        assert.equal(await page.locator('dialog[open] a').count(), [11, 6, 6, 3][i - 1]);
        await page.keyboard.press('Escape');
        assert.equal(await page.getByRole('button', { name: 'Field notes +' }).evaluate(el => el === document.activeElement), true);
      }
      if (i === 5) {
        await page.getByRole('button', { name: 'Explore the method +' }).click();
        assert.match(await page.locator('dialog').innerText(), /Reviewed fixes/);
        await page.keyboard.press('Escape');
      }
    }
    assert.equal(await canvas.getAttribute('data-camera'), start, 'Final scene returns to original physical core');
    await page.locator('.journey-nav .next-sector').click();
    await settle(0);
    await page.evaluate(() => document.activeElement?.blur());
    await page.keyboard.press('ArrowRight');
    await settle(1);
    await page.keyboard.press('Home');
    await settle(0);
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('button', { name: 'Use reading view' }).click();
    assert.equal(await canvas.count(), 0);
    assert.deepEqual(await page.locator('.reading-labs').evaluateAll(lists => lists.map(list => list.children.length)), [11, 6, 6, 3]);
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('button', { name: 'Try immersive view' }).click();
    await page.locator('.is-live').waitFor();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.locator('.is-live').waitFor();
    await page.getByRole('button', { name: 'Pause 3D' }).click();
    await capture('mobile');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 390);
    for (let i = 1; i < 7; i++) {
      await nav.getByRole('link', { name: sceneNames[i], exact: true }).click();
      await settle(i);
      const copy = await page.locator('.journey-copy:visible').boundingBox();
      assert.ok(copy.y > 110 && copy.y + copy.height < 760, 'Mobile content stays below controls and above scene navigation');
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await canvas.waitFor({ state: 'detached' });
    assert.equal(await page.locator('.reading-content:visible').count(), 7);
    await page.goto('/#medical');
    assert.equal(await canvas.count(), 0);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.locator('.is-live').waitFor();
    await settle(4);
    // Loss of WebGL restores complete HTML, instead of trapping the visitor in an empty scene.
    await canvas.evaluate(c => c.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext());
    await page.locator('.is-live').waitFor({ state: 'detached' });
    assert.equal(await page.locator('.reading-labs:visible').count(), 4);
    console.log('Seven connected WebGL scenes, camera scroll/reversal, navigation, keyboard, inspection, idle pause, mobile, reduced motion, reading view and WebGL-loss fallback passed');
  } finally { await live.close(); }
}
