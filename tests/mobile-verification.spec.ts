import { test, expect } from '@playwright/test';

test.describe('Mobile verification', () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone viewport

  test('CTA buttons removed on mobile journal page', async ({ page }) => {
    await page.goto('https://the-motivahub.com/journal/');
    await page.waitForTimeout(1000);
    
    const ctaStrip = page.locator('.cta-strip');
    await expect(ctaStrip).toHaveCount(0);
  });

  test('FR button works on mobile without black page', async ({ page }) => {
    await page.goto('https://the-motivahub.com/');
    await page.waitForTimeout(1000);
    
    const frBtn = page.locator('.lang-btn[data-lang="fr"]');
    await frBtn.click();
    await page.waitForTimeout(1000);
    
    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bodyBg).not.toBe('rgb(0, 0, 0)');
  });

  test('Menu works on mobile homepage', async ({ page }) => {
    await page.goto('https://the-motivahub.com/');
    await page.waitForTimeout(500);
    
    const menuBtn = page.locator('#menu-btn');
    await menuBtn.click();
    
    const overlay = page.locator('#overlay-menu');
    await expect(overlay).toHaveClass(/open/);
  });

  test('Header buttons visible on mobile', async ({ page }) => {
    await page.goto('https://the-motivahub.com/');
    await page.waitForTimeout(500);
    
    const langSwitcher = page.locator('.lang-switcher');
    const menuBtn = page.locator('#menu-btn');
    
    await expect(langSwitcher).toBeVisible();
    await expect(menuBtn).toBeVisible();
  });
});
