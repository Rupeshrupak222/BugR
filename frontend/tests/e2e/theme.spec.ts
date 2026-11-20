import { test, expect } from '@playwright/test';

test.describe('Theme Switch Toggle & Light Mode Support', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      try {
        localStorage.clear();
      } catch (e) {}
    });
    await page.reload();
  });

  test('landing page header includes accessible theme switch toggle', async ({ page }) => {
    const toggle = page.locator('.landing-nav-actions button[role="switch"]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-label', /Switch to light mode/i);
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  test('toggling theme switches between dark and light modes on landing page', async ({ page }) => {
    const toggle = page.locator('.landing-nav-actions button[role="switch"]');

    // Initially in dark mode
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Click toggle -> switches to light mode
    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveClass(/light/);
    await expect(toggle).toHaveAttribute('aria-checked', 'false');

    // Verify localStorage and meta tag
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe('light');

    const metaColorScheme = await page.locator('meta[name="color-scheme"]').first().getAttribute('content');
    expect(metaColorScheme).toBe('light');

    // Click toggle again -> switches back to dark mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute('aria-checked', 'true');

    const restoredTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(restoredTheme).toBe('dark');
  });

  test('theme preference persists across page reloads without FOUC', async ({ page }) => {
    const toggle = page.locator('.landing-nav-actions button[role="switch"]');

    // Switch to light mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/light/);

    // Reload page
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/light/);
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    const reloadedToggle = page.locator('.landing-nav-actions button[role="switch"]');
    await expect(reloadedToggle).toHaveAttribute('aria-checked', 'false');
  });

  test('theme switch toggle is available and functional on IT Services pages', async ({ page }) => {
    await page.goto('/services');
    const toggle = page.locator('header button[role="switch"]').first();
    await expect(toggle).toBeVisible();

    // Toggle to light mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/light/);

    // Navigate to another IT Services page and check light theme persists
    await page.goto('/contact/project');
    await expect(page.locator('html')).toHaveClass(/light/);
  });
});
