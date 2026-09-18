import { test, expect } from '@playwright/test';

test.describe('Visual bugs check', () => {
  test('about page screenshot', async ({ page }) => {
    await page.goto('https://the-motivahub.com/about/');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/screenshots/about-page.png', fullPage: true });
  });

  test('books page screenshot', async ({ page }) => {
    await page.goto('https://the-motivahub.com/books/');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/screenshots/books-page.png', fullPage: true });
  });

  test('journal page screenshot', async ({ page }) => {
    await page.goto('https://the-motivahub.com/journal/');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/screenshots/journal-page-debug.png', fullPage: true });
  });

  test('article page screenshot', async ({ page }) => {
    await page.goto('https://the-motivahub.com/journal/sleep-is-unfair-advantage/');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/screenshots/article-page.png', fullPage: true });
  });
});
