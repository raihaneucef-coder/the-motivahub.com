# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.ts >> Responsive FR pages >> /fr/ >> desktop contains FR text
- Location: tests/responsive.spec.ts:13:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4321/fr/
Call log:
  - navigating to "http://localhost:4321/fr/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const pages = [
  4  |   { path: '/fr/', frText: 'Motiva Hub' },
  5  |   { path: '/fr/contact/', frText: 'Contact' },
  6  |   { path: '/fr/best/books/', frText: 'Meilleurs Livres' },
  7  |   { path: '/fr/tools/cold-shower-tracker/', frText: 'Suivi des Douches Froides' },
  8  | ];
  9  | 
  10 | test.describe('Responsive FR pages', () => {
  11 |   for (const p of pages) {
  12 |     test.describe(p.path, () => {
  13 |       test('desktop contains FR text', async ({ page }) => {
  14 |         await page.setViewportSize({ width: 1280, height: 800 });
> 15 |         await page.goto(`http://localhost:4321${p.path}`);
     |                    ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4321/fr/
  16 |         await page.waitForTimeout(1000);
  17 |         const bodyText = await page.locator('body').textContent();
  18 |         expect(bodyText).toContain(p.frText);
  19 |       });
  20 | 
  21 |       test('mobile contains FR text', async ({ page }) => {
  22 |         await page.setViewportSize({ width: 375, height: 812 });
  23 |         await page.goto(`http://localhost:4321${p.path}`);
  24 |         await page.waitForTimeout(1000);
  25 |         const bodyText = await page.locator('body').textContent();
  26 |         expect(bodyText).toContain(p.frText);
  27 |       });
  28 |     });
  29 |   }
  30 | });
  31 | 
```