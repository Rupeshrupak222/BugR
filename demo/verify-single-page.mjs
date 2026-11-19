import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const hash = value => createHash('sha256').update(value).digest('hex');

export async function verifySinglePage(browser, baseURL, labs, errors) {
  const context = await browser.newContext({ baseURL, reducedMotion: 'reduce', viewport: { width: 1440, height: 960 } });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => localStorage.setItem('br_cookie_consent', 'dismissed'));
  await page.route('**/api/public-config', route => route.fulfill({ json: { enabled: true, siteKey: 'test-site' } }));
  await page.route('https://challenges.cloudflare.com/**', route => route.fulfill({ contentType: 'application/javascript', body: `window.turnstile={render(target,options){target.dataset.action=options.action;const input=document.createElement('input');input.type='hidden';input.name='cf-turnstile-response';input.value='test-token';target.append(input);return 'test';},remove(){},reset(){}};` }));
  const submissions = [];
  await page.route('**/api/lead', async route => { submissions.push(route.request().postDataJSON()); await route.fulfill({ json: { saved: true } }); });
  try {
    await page.goto('/');
    const links = await page.locator('.glass-landing a[href]').evaluateAll(elements => elements.map(a => a.getAttribute('href')));
    assert.ok(links.every(href => href.startsWith('#') || href.startsWith('mailto:')), 'Every site link stays on the same page');
    for (const href of links.filter(href => href.startsWith('#'))) assert.equal(await page.locator(href).count(), 1, href);
    assert.equal(await page.locator('.inline-lab').count(), 26);
    for (const lab of labs) {
      const detail = page.locator('#lab-' + lab.path.split('/').pop().replace('.html', ''));
      const phases = await detail.locator('.inline-phase').evaluateAll(elements => elements.map(el => ({ heading: el.querySelector('h4').textContent, body: el.querySelector('h4 + p')?.textContent ?? '', items: [...el.querySelectorAll('li')].map(item => item.textContent) })));
      assert.deepEqual(phases.map(phase => hash(JSON.stringify(phase))), lab.phaseHashes, lab.name);
      assert.equal(hash(await detail.locator('.inline-proof p').first().textContent()), lab.proofHash);
    }
    await page.locator('.hero-capsule').click();
    await page.locator('.industry-entry > summary').first().click();
    await page.locator('.inline-lab > summary').first().click();
    assert.equal(await page.locator('.inline-lab[open] .inline-phase:visible').count(), 4);
    await page.locator('.inline-lab[open]').getByRole('link', { name: 'Register for this lab' }).click();
    assert.equal(await page.locator('#landing-enquiry').inputValue(), labs[0].name);
    assert.equal(new URL(page.url()).pathname, '/');
    async function submit(source) {
      await page.locator('#landing-enquiry').selectOption(source);
      const form = page.locator('form[data-source]').filter({ has: page.locator('input[name="email"]') });
      await page.waitForFunction(value => document.querySelector('form')?.dataset.source === value, source);
      await form.getByLabel('Name', { exact: true }).fill('Single Page Test');
      await form.getByLabel('Email', { exact: true }).fill('single-page@example.com');
      await form.getByLabel('Phone number', { exact: true }).fill('+91 1234567890');
      await form.getByRole('button', { name: /Register Interest|Join the Waitlist|Send Message/ }).click();
      await form.locator('.form-status[data-state="saved"]').waitFor();
      assert.equal(submissions.at(-1).source, source);
      assert.equal(submissions.at(-1).token, ['Students', 'Companies', 'Contact'].includes(source) ? 'test-token' : '');
    }
    for (const source of [...labs.map(lab => lab.name), 'Sign Up', 'Students', 'Companies', 'Contact']) await submit(source);
    assert.equal(submissions.length, 30);
    assert.equal(new URL(page.url()).pathname, '/');
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Expanded content at ' + width);
    }
    await page.locator('#signup').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'test-results/glass-landing/single-page-registration.png', animations: 'disabled' });
    console.log('Single-page navigation, 26 inline curriculum/proof checksums, expanded responsive layout and all 30 mocked in-page enquiry sources passed');
  } finally { await context.close(); }
}
