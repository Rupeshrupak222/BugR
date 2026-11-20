import { test, expect } from '@playwright/test';

test('all 33 sitemap routes return HTML with unique titles and canonicals', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  expect(new Set(urls).size).toBe(33);
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: https://bugrefinery.com/sitemap.xml');
  const titles = new Set();
  for (const url of urls) {
    const response = await request.get(new URL(url).pathname);
    expect(response.ok()).toBeTruthy();
    const html = await response.text();
    expect(html).toContain('rel="canonical" href="' + url + '"');
    expect(html).toContain('name="twitter:card"');
    expect(html).toContain('property="og:title"');
    titles.add(html.match(/<title>(.*?)<\/title>/)?.[1]);
  }
  expect(titles.size).toBe(33);
});

test('catalogue filters and modal cancel restores focus', async ({ page }) => {
  await page.goto('/labs.html');
  await page.getByRole('searchbox').fill('Finance');
  await expect(page.getByRole('status')).toHaveText('1 labs shown.');
  await page.getByRole('link', { name: /Finance/ }).click();
  const trigger = page.getByRole('button', { name: 'Sign up for Finance' });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('homepage fits the required viewport widths', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 375, 425, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  expect(errors).toEqual([]);
});

test('public content and navigation survive without JS', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 800 } });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.getByRole('navigation', { name: 'Main navigation' }).getByText('Sign Up').click();
    await expect(page.getByText(/Online submission requires the lead service/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send enquiry' })).toBeDisabled();
  } finally { await context.close(); }
});
