import { test, expect } from '@playwright/test';

test.describe('Visual debugging', () => {
  test('journal page screenshot', async ({ page }) => {
    await page.goto('https://the-motivahub.com/journal/');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/screenshots/journal-page.png', fullPage: true });
  });

  test('homepage screenshot', async ({ page }) => {
    await page.goto('https://the-motivahub.com/');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/screenshots/homepage.png', fullPage: true });
  });

  test('FR homepage screenshot', async ({ page }) => {
    await page.goto('https://the-motivahub.com/');
    await page.waitForTimeout(1000);
    await page.locator('.lang-btn[data-lang="fr"]').click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/screenshots/fr-homepage.png', fullPage: true });
  });
});
