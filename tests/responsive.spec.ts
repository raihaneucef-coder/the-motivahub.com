import { test, expect } from '@playwright/test';

const pages = [
  { path: '/fr/', frText: 'Motiva Hub' },
  { path: '/fr/contact/', frText: 'Contact' },
  { path: '/fr/best/books/', frText: 'Meilleurs Livres' },
  { path: '/fr/tools/cold-shower-tracker/', frText: 'Suivi des Douches Froides' },
];

test.describe('Responsive FR pages', () => {
  for (const p of pages) {
    test.describe(p.path, () => {
      test('desktop contains FR text', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(`http://localhost:4321${p.path}`);
        await page.waitForTimeout(1000);
        const bodyText = await page.locator('body').textContent();
        expect(bodyText).toContain(p.frText);
      });

      test('mobile contains FR text', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto(`http://localhost:4321${p.path}`);
        await page.waitForTimeout(1000);
        const bodyText = await page.locator('body').textContent();
        expect(bodyText).toContain(p.frText);
      });
    });
  }
});
