import { test, expect } from '@playwright/test';

test.describe('Bug Refinery Protected Landing Experience (Zero Regression)', () => {
  test('landing page hero headline and terminal must remain exactly preserved', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Beyond Theory \| Bug Refinery/i);

    // Hero headline check
    const heading = page.locator('h1');
    await expect(heading).toContainText('Bridge the Gap Between Your Degree');
    await expect(heading).toContainText('First Real Job');

    // Terminal simulation window check
    await expect(page.locator('text=sim-session: production-node-01')).toBeVisible();
    await expect(page.locator('text=The Gap No One Talks About')).toBeVisible();
    await expect(page.locator('text=The Hiring Manager’s Frustration')).toBeVisible();
    await expect(page.locator('text=The Graduate’s Reality')).toBeVisible();

    // 26 Labs catalog check
    await expect(page.locator('text=26 Industry-Simulation Labs')).toBeVisible();
  });

  test('landing page responsive navigation and links should function', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a:has-text("Services")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Work")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Labs")').first()).toBeVisible();
  });
});

test.describe('New IT Services & Solutions Routes', () => {
  test('should load main IT services overview page', async ({ page }) => {
    await page.goto('/services');
    await expect(page).toHaveTitle(/IT Services & Digital Solutions \| Bug Refinery/i);
    await expect(page.locator('text=Full-Lifecycle Software Services')).toBeVisible();
    await expect(page.locator('text=Custom Software Development')).toBeVisible();
    await expect(page.locator('text=Cloud & DevOps Engineering')).toBeVisible();
    await expect(page.locator('text=AI & Workflow Automation')).toBeVisible();
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
    await expect(page.locator('text=Discover')).toBeVisible();
    await expect(page.locator('text=Deploy')).toBeVisible();
    await expect(page.locator('text=Support')).toBeVisible();
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
