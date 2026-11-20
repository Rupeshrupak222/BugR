import { test, expect } from '@playwright/test';

test.describe('Bug Refinery Protected Landing Experience (Zero Regression)', () => {
  test('landing page hero headline, kicker, and authentic copy must remain exactly preserved', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Beyond Theory \| Bug Refinery/i);

    // Hero kicker check
    await expect(page.locator('.hero-kicker')).toContainText('26 LABS');
    await expect(page.locator('.hero-kicker')).toContainText('4 INDUSTRIES');
    await expect(page.locator('.hero-kicker')).toContainText('9 WEEKS');

    // Hero headline check
    const heading = page.locator('h1');
    await expect(heading).toContainText('Beyond');
    await expect(heading).toContainText('theory.');

    // Tagline and Capsule
    await expect(page.locator('.hero-tagline')).toContainText('FROM THEORY TO PRODUCTION-READY.');
    await expect(page.locator('.hero-capsule')).toContainText('Find your industry. Build your proof.');

    // Sections check
    await expect(page.locator('text=Four industries.').first()).toBeVisible();
    await expect(page.locator('text=One way forward.').first()).toBeVisible();
    await expect(page.locator('text=Work you can show.').first()).toBeVisible();
    await expect(page.locator('#registration-heading')).toContainText('Take the');
    await expect(page.locator('#registration-heading')).toContainText('next step.');
  });

  test('landing page native navigation and links should function', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#landing-navigation a:has-text("The labs")')).toBeVisible();
    await expect(page.locator('#landing-navigation a:has-text("The method")')).toBeVisible();
    await expect(page.locator('#landing-navigation a:has-text("About")')).toBeVisible();
    await expect(page.locator('.nav-signup')).toBeVisible();
  });
});

test.describe('New IT Services & Solutions Routes', () => {
  test('should load main IT services overview page', async ({ page }) => {
    await page.goto('/services');
    await expect(page).toHaveTitle(/IT Services & Digital Solutions \| Bug Refinery/i);
    await expect(page.locator('text=Full-Lifecycle Software Services')).toBeVisible();
    await expect(page.locator('h3:has-text("Custom Software Development")').first()).toBeVisible();
    await expect(page.locator('h3:has-text("Cloud & DevOps Engineering")').first()).toBeVisible();
    await expect(page.locator('h3:has-text("AI & Workflow Automation")').first()).toBeVisible();
  });

  test('should load individual service detail page', async ({ page }) => {
    await page.goto('/services/custom-software-development');
    await expect(page.locator('h1:has-text("Custom Software Development")')).toBeVisible();
    await expect(page.locator('text=Why Existing Solutions Fail')).toBeVisible();
    await expect(page.locator('text=Tangible Project Outcomes')).toBeVisible();
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
  });

  test('should load portfolio work page', async ({ page }) => {
    await page.goto('/work');
    await expect(page.locator('h1:has-text("Our Work & Systems")')).toBeVisible();
    await expect(page.locator('text=High-Concurrency Payment Orchestration Engine')).toBeVisible();
  });

  test('should load 7-step engineering process page', async ({ page }) => {
    await page.goto('/process');
    await expect(page.locator('h1:has-text("How We Deliver")')).toBeVisible();
    await expect(page.locator('h2:has-text("Discover")').first()).toBeVisible();
    await expect(page.locator('h2:has-text("Deploy")').first()).toBeVisible();
    await expect(page.locator('h2:has-text("Support")').first()).toBeVisible();
  });

  test('should load enterprise project RFP inquiry portal', async ({ page }) => {
    await page.goto('/contact/project');
    await expect(page.locator('h1:has-text("Start Your Next Project")')).toBeVisible();
    await expect(page.locator('input#name')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input#company')).toBeVisible();
    await expect(page.locator('select#service')).toBeVisible();
  });
});
