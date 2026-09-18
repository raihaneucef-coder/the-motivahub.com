import { test, expect } from '@playwright/test';

test.describe('User reported issues - detailed', () => {
  test('menu works after navigating to journal and back', async ({ page }) => {
    await page.goto('https://the-motivahub.com/');
    await page.waitForTimeout(500);
    await page.locator('#menu-btn').click();
    await expect(page.locator('#overlay-menu')).toHaveClass(/open/);
    await page.goto('https://the-motivahub.com/journal/');
    await page.goto('https://the-motivahub.com/');
    await page.locator('#menu-btn').click();
    await expect(page.locator('#overlay-menu')).toHaveClass(/open/);
  });

  test('FR button does not create black page after navigation', async ({ page }) => {
    await page.goto('https://the-motivahub.com/journal/');
    await page.waitForTimeout(500);
    await page.locator('.lang-btn[data-lang="fr"]').click();
    await page.waitForURL('**/journal/**');
    await page.waitForTimeout(1000);
    const htmlBg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    console.log('HTML background:', htmlBg);
    console.log('Body background:', bodyBg);
    expect(htmlBg).not.toBe('rgb(0, 0, 0)');
    expect(bodyBg).not.toBe('rgb(0, 0, 0)');
  });

  test('check for unexpected images on journal page', async ({ page }) => {
    await page.goto('https://the-motivahub.com/journal/');
    const images = await page.locator('img').all();
    console.log('Number of images on journal page:', images.length);
    for (let i = 0; i < images.length; i++) {
      const src = await images[i].getAttribute('src');
      const alt = await images[i].getAttribute('alt');
      const visible = await images[i].isVisible();
      console.log(`Image ${i}: src=${src}, alt=${alt}, visible=${visible}`);
    }
  });

  test('check header positioning on homepage', async ({ page }) => {
    await page.goto('https://the-motivahub.com/');
    const header = page.locator('.site-header');
    const headerBox = await header.boundingBox();
    console.log('Header position:', headerBox);
    
    const langSwitcher = page.locator('.lang-switcher');
    const langBox = await langSwitcher.boundingBox();
    console.log('Lang switcher position:', langBox);
    
    const menuBtn = page.locator('#menu-btn');
    const menuBox = await menuBtn.boundingBox();
    console.log('Menu button position:', menuBox);
    
    // Check if header is at the top
    expect(headerBox?.y).toBe(0);
  });

  test('check header positioning on journal page', async ({ page }) => {
    await page.goto('https://the-motivahub.com/journal/');
    const header = page.locator('.site-header');
    const headerBox = await header.boundingBox();
    console.log('Journal header position:', headerBox);
    
    const langSwitcher = page.locator('.lang-switcher');
    const langBox = await langSwitcher.boundingBox();
    console.log('Journal lang switcher position:', langBox);
    
    const menuBtn = page.locator('#menu-btn');
    const menuBox = await menuBtn.boundingBox();
    console.log('Journal menu button position:', menuBox);
    
    expect(headerBox?.y).toBe(0);
  });
});
