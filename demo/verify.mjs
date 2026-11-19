import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { createApp } from '../server/app.js';
import { verifyLanding } from './verify-landing.mjs';
import { verifySinglePage } from './verify-single-page.mjs';

const labs = JSON.parse(await readFile(new URL('./data/official-labs.json', import.meta.url), 'utf8'));
const main = ['/', '/labs.html', '/students.html', '/companies.html', '/about.html', '/contact.html', '/signup.html'];
const routes = [...main, ...labs.map(lab => lab.path)];
const hash = value => createHash('sha256').update(value).digest('hex');
const browser = await chromium.launch({
  channel: process.env.BUGR_TEST_BROWSER,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});
const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const server = createApp({ dist, env: {} }).listen(0, '127.0.0.1');
await once(server, 'listening');
const baseURL = 'http://127.0.0.1:' + server.address().port;
const context = await browser.newContext({ baseURL, viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
page.setDefaultTimeout(7000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const screenshots = new URL('../test-results/glass-landing/', import.meta.url);
await mkdir(screenshots, { recursive: true });
const screenshot = name => page.screenshot({ path: fileURLToPath(new URL(name, screenshots)), animations: 'disabled' });

try {
  await verifyLanding(browser, baseURL, errors);
  await verifySinglePage(browser, baseURL, labs, errors);

  await page.goto('/');
  await page.locator('.cookie').waitFor();
  await page.getByRole('button', { name: 'Dismiss' }).click();
  await page.reload();
  assert.equal(await page.locator('.cookie').isVisible(), false);
  await page.locator('.hero-capsule').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  await screenshot('reduced-motion.png');
  const titles = new Set();
  const descriptions = new Set();
  for (const route of routes) {
    const response = await page.goto(route);
    assert.equal(response.status(), 200, route);
    const title = await page.title();
    const description = await page.locator('meta[name=description]').getAttribute('content');
    assert.ok(!titles.has(title) && !descriptions.has(description), route);
    titles.add(title);
    descriptions.add(description);
    assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), 'https://bugrefinery.com' + route);
    assert.equal(await page.locator('h1').count(), 1);
    for (const tag of ['meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:url"]', 'meta[name="twitter:card"]', 'meta[name="twitter:title"]', 'meta[name="twitter:description"]']) {
      assert.ok(await page.locator(tag).getAttribute('content'), route + ' ' + tag);
    }
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth ? null : ({
        scrollWidth: document.documentElement.scrollWidth,
        elements: [...document.querySelectorAll('body *')].filter(element => element.getBoundingClientRect().right > innerWidth ||
          (element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 4))
          .slice(0, 12).map(element => [element.className, element.tagName, element.scrollWidth, element.clientWidth])
      }));
      assert.equal(overflow, null, route + ' width ' + width + ' ' + JSON.stringify(overflow));
    }
    for (const href of await page.locator('a[href]').evaluateAll(links => links.map(a => a.getAttribute('href')))) {
      if (href.startsWith('/')) assert.ok(routes.includes(href.split('#')[0]), route + ' → ' + href);
      if (href.startsWith('#')) assert.ok(await page.locator(href).count(), route + ' → ' + href);
    }
  }
  const sitemap = await (await context.request.get('/sitemap.xml')).text();
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), routes.map(route => 'https://bugrefinery.com' + route));
  assert.match(await (await context.request.get('/robots.txt')).text(), /Allow: \//);
  assert.equal((await context.request.get('/missing-page.html')).status(), 404);
  console.log('33 routes, metadata, links, sitemap, robots and 132 responsive page checks passed');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  assert.equal(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible(), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible(), false);
  assert.deepEqual(await page.locator('.reading-labs').evaluateAll(items => items.map(item => item.children.length)), [11, 6, 6, 3]);
  assert.equal(await page.locator('canvas').count(), 0);
  await page.goto('/labs.html');
  assert.equal(await page.locator('.lab-card:visible').count(), 26);
  assert.deepEqual(await page.locator('.catalogue-group').evaluateAll(items => items.map(item => item.querySelectorAll('.lab-card').length)), [11, 6, 6, 3]);
  await page.getByLabel('Area', { exact: true }).selectOption('medical');
  assert.equal(await page.locator('.lab-card:visible').count(), 3);
  await page.getByRole('searchbox').fill('bio');
  assert.equal(await page.locator('.lab-card:visible').count(), 1);
  await page.getByRole('searchbox').fill('no-such-lab');
  assert.equal(await page.locator('.no-match').isVisible(), true);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  assert.equal(await page.locator('.lab-card:visible').count(), 26);
  console.log('Mobile navigation, reading fallback, reduced motion and catalogue filters passed');

  await page.goto('/signup.html');
  await page.getByText('Online submission is unavailable.', { exact: false }).waitFor();
  assert.equal(await page.getByRole('button', { name: 'Register Interest' }).isDisabled(), true);
  await page.route('**/api/public-config', route => route.fulfill({ json: { enabled: true, siteKey: 'test-site' } }));
  await page.route('https://challenges.cloudflare.com/**', route => route.fulfill({
    contentType: 'application/javascript',
    body: `window.turnstile = {
      render(target, options) {
        target.dataset.action = options.action;
        const field = document.createElement('input');
        field.type = 'hidden'; field.name = 'cf-turnstile-response'; field.value = 'test-token';
        target.append(field); return 'fake-id';
      },
      reset() {}, remove() {}
    };`
  }));
  const captured = [];
  let result = { status: 503, json: { saved: false } };
  await page.route('**/api/lead', async route => {
    captured.push(route.request().postDataJSON());
    await route.fulfill(result);
  });
  async function submit(source, token = '') {
    const form = page.locator('form[data-source]');
    const button = form.getByRole('button', { name: /Sign Up|Send Message|Join the Waitlist|Register Interest/ });
    await form.getByLabel('Name').fill(' Synthetic lead ');
    await form.getByLabel('Email').fill('test@example.com');
    await form.getByLabel('Phone number').fill('+91 (123) 456-7890');
    const before = captured.length;
    await button.click();
    await form.locator('.form-status').filter({ hasText: /received|retry|limit reached/ }).waitFor();
    assert.equal(captured.length, before + 1, source);
    const data = captured.at(-1);
    assert.equal(data.source, source);
    assert.equal(data.name, 'Synthetic lead');
    assert.equal(data.token, token);
    assert.equal(data.website, '');
    assert.match(data.requestId, /^[a-f0-9-]{36}$/);
    if (!result.json.saved) {
      assert.equal(await form.locator('.form-status').getAttribute('data-state'), 'notice');
      assert.equal(await form.getByLabel('Email').inputValue(), 'test@example.com');
    }
    return data;
  }

  for (const lab of labs) {
    await page.goto(lab.path);
    const phases = await page.locator('.curriculum-phase').evaluateAll(elements => elements.map(element => ({
      heading: element.querySelector('h2').textContent,
      body: element.querySelector('h2 + p')?.textContent ?? '',
      items: [...element.querySelectorAll('li')].map(item => item.textContent)
    })));
    assert.deepEqual(phases.map(phase => hash(JSON.stringify(phase))), lab.phaseHashes, lab.path);
    assert.equal(hash(await page.locator('.lab-proof p').nth(1).innerText()), lab.proofHash, lab.path);
    const pricing = page.getByRole('region', { name: 'Lab pricing and registration' });
    assert.match(await pricing.innerText(), /₹9,999[\s\S]*9 weeks · Cohort 30[\s\S]*STARTING SOON/);
    assert.equal(await page.locator('.curriculum-phase').last().evaluate(el => !!(el.compareDocumentPosition(document.querySelector('.lab-pricing')) & Node.DOCUMENT_POSITION_FOLLOWING)), true);
    const trigger = page.getByRole('link', { name: 'Sign up for ' + lab.name, exact: true });
    await trigger.click();
    await submit(lab.name);
    await page.keyboard.press('Escape');
    await page.locator('dialog').waitFor({ state: 'hidden' });
    await page.waitForFunction(() => document.activeElement?.matches('a[aria-label^="Sign up for "]'));
    await trigger.click();
    assert.equal(await page.locator('input[name=email]').inputValue(), '');
    await page.keyboard.press('Escape');
  }
  for (const [route, source] of [['/students.html', 'Students'], ['/companies.html', 'Companies'], ['/contact.html', 'Contact'], ['/signup.html', 'Sign Up']]) {
    await page.goto(route);
    const hasWidget = source !== 'Sign Up';
    if (hasWidget) await page.locator('.verification[data-action="' + source.toLowerCase() + '"]').waitFor({ state: 'attached' });
    await submit(source, hasWidget ? 'test-token' : '');
  }
  assert.equal(captured.length, 30);
  console.log('26 approved curriculum and proof checksums, pricing order and all 30 mocked form attributions passed');

  const form = page.locator('form');
  const submitButton = form.getByRole('button', { name: 'Register Interest' });
  await form.getByLabel('Email').fill('wrong');
  await submitButton.click();
  assert.equal(captured.length, 30);
  assert.equal(await form.getByText('Enter a valid email address.').innerText(), 'Enter a valid email address.');
  result = { status: 429, json: { saved: false } };
  const limited = await submit('Sign Up');
  assert.match(await form.locator('.form-status').innerText(), /Submission limit reached/);
  result = { status: 200, json: { saved: true } };
  const confirmed = await submit('Sign Up');
  assert.equal(limited.requestId, confirmed.requestId);
  assert.equal(await form.locator('.form-status').getAttribute('data-state'), 'saved');
  assert.equal(await form.getByLabel('Email').inputValue(), '');
  await form.getByLabel('Name').fill('Synthetic lead');
  await form.getByLabel('Email').fill('test@example.com');
  await form.getByLabel('Phone number').fill('+91 1234567890');
  const beforeDoubleSubmit = captured.length;
  await form.evaluate(element => {
    element.requestSubmit();
    element.requestSubmit();
  });
  await form.locator('.form-status[data-state="saved"]').filter({ hasText: 'Your enquiry was received.' }).waitFor();
  assert.equal(captured.length, beforeDoubleSubmit + 1);
  const stored = await page.evaluate(() => Object.keys(localStorage));
  assert.deepEqual(stored, ['br_cookie_consent']);

  const staticContext = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 320, height: 850 } });
  const staticPage = await staticContext.newPage();
  await staticPage.goto('/');
  assert.equal(await staticPage.getByRole('navigation', { name: 'Main navigation' }).isVisible(), true);
  assert.equal(await staticPage.locator('.reading-labs').count(), 4);
  await staticPage.goto('/labs.html');
  assert.equal(await staticPage.locator('.lab-card:visible').count(), 26);
  await staticPage.goto(labs[0].path);
  assert.equal(await staticPage.locator('.curriculum-phase:visible').count(), 4);
  await staticContext.close();
  assert.deepEqual(errors, []);
  console.log('Validation, duplicate-submit prevention, retry idempotency, rate-limit feedback, consent storage and no-JavaScript fallback passed');
} finally {
  await browser.close();
  server.close();
}

