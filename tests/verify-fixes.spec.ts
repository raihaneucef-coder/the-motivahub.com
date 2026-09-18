import { test, expect } from '@playwright/test';

test.describe('Verify recent fixes', () => {
  test('homepage menu is visible on desktop', async ({ page }) => {
    await page.goto('https://the-motivahub.com/', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    const nav = page.locator('.header-nav');
    await expect(nav).toBeVisible();
    await expect(nav).toHaveCSS('display', 'flex');
  });

  test('homepage menu is hidden on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('https://the-motivahub.com/', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    const nav = page.locator('.header-nav');
    await expect(nav).toHaveCSS('display', 'none');
  });

  test('contact page mailto link is clickable', async ({ page }) => {
    await page.goto('https://the-motivahub.com/fr/contact/', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    const mailtoLink = page.locator('a[href="mailto:contact@the-motivahub.com"]');
    await expect(mailtoLink).toBeVisible();
    await expect(mailtoLink).toHaveAttribute('href', 'mailto:contact@the-motivahub.com');
  });

  test('author page typography matches founder style', async ({ page }) => {
    await page.goto('https://the-motivahub.com/fr/author/youssef-raihane/', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    const bioParagraph = page.locator('.author-bio-content p').first();
    await expect(bioParagraph).toHaveCSS('font-family', /Fraunces|serif/);
    await expect(bioParagraph).toHaveCSS('line-height', '1.7');
  });

  test('contact page typography matches founder style', async ({ page }) => {
    await page.goto('https://the-motivahub.com/fr/contact/', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    // Target actual content paragraphs, not kicker/meta elements
    const contentParagraph = page.locator('.article-body .container > p:not(.card-meta):not(.card-date):not(.kicker)').first();
    await expect(contentParagraph).toHaveCSS('font-family', /Fraunces|serif/);
    await expect(contentParagraph).toHaveCSS('line-height', '1.7');
  });
});
