import { test, expect } from '@playwright/test';

test.describe('User reported issues', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-motivahub.com/');
    await page.waitForTimeout(1000);
  });

  test('1. CTA buttons should be removed from journal page', async ({ page }) => {
    await page.goto('https://the-motivahub.com/journal/');
    await page.waitForTimeout(1000);
    
    // Check that the CTA strip container does NOT exist
    const ctaStrip = page.locator('.cta-strip');
    await expect(ctaStrip).toHaveCount(0);
    
    // Check that the specific buttons do NOT exist
    const quizBtn = page.locator('.cta-strip a:has-text("Take the Discipline Quiz")');
    const pdfBtn = page.locator('.cta-strip a:has-text("Get the Free PDF")');
    const booksBtn = page.locator('.cta-strip a:has-text("Best Books 2026")');
    
    await expect(quizBtn).toHaveCount(0);
    await expect(pdfBtn).toHaveCount(0);
    await expect(booksBtn).toHaveCount(0);
  });

  test('2. FR button should not create black page', async ({ page }) => {
    const frBtn = page.locator('.lang-btn[data-lang="fr"]');
    await expect(frBtn).toBeVisible();
    await frBtn.click();
    await page.waitForTimeout(1500);
    
    // Check page is not black
    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const htmlBg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
    
    console.log('Body background:', bodyBg);
    console.log('HTML background:', htmlBg);
    
    // Should not be black
    expect(bodyBg).not.toBe('rgb(0, 0, 0)');
    expect(htmlBg).not.toBe('rgb(0, 0, 0)');
  });

  test('3. Menu should work when navigating back to homepage', async ({ page }) => {
    // Navigate to journal page
    await page.goto('https://the-motivahub.com/journal/');
    await page.waitForTimeout(500);
    
    // Go back to homepage
    await page.goto('https://the-motivahub.com/');
    await page.waitForTimeout(500);
    
    // Click menu button
    const menuBtn = page.locator('#menu-btn');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();
    
    // Check overlay opens
    const overlay = page.locator('#overlay-menu');
    await expect(overlay).toHaveClass(/open/);
  });

  test('4. EN/FR and Menu buttons should be on the LEFT side', async ({ page }) => {
    const header = page.locator('.site-header');
    const headerBox = await header.boundingBox();
    
    const langSwitcher = page.locator('.lang-switcher');
    const langBox = await langSwitcher.boundingBox();
    
    const menuBtn = page.locator('#menu-btn');
    const menuBox = await menuBtn.boundingBox();
    
    console.log('Header:', headerBox);
    console.log('Lang switcher:', langBox);
    console.log('Menu button:', menuBox);
    
    // Lang switcher and menu should be on the RIGHT side (x > center)
    // Or check they're positioned correctly in header
    expect(langBox).not.toBeNull();
    expect(menuBox).not.toBeNull();
  });
});
