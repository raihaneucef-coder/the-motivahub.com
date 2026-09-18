# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: verify-fixes.spec.ts >> Verify recent fixes >> homepage menu is hidden on mobile
- Location: tests/verify-fixes.spec.ts:13:3

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  locator('.header-nav')
Expected: "none"
Received: "flex"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" locator('.header-nav') with timeout 5000ms
  - waiting for locator('.header-nav')
    14 × locator resolved to <nav class="header-nav" aria-label="Main navigation">…</nav>
       - unexpected value "flex"

```

```yaml
- navigation "Main navigation":
  - link "The Journal":
    - /url: /journal/
  - link "Quotes":
    - /url: /quotes/
  - link "Topics":
    - /url: /topics/
  - link "Books":
    - /url: /books/
  - link "Atomic Habits":
    - /url: /guides/atomic-habits-ultimate-guide/
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Verify recent fixes', () => {
  4  |   test('homepage menu is visible on desktop', async ({ page }) => {
  5  |     await page.goto('https://the-motivahub.com/', { waitUntil: 'load' });
  6  |     await page.waitForTimeout(1000);
  7  | 
  8  |     const nav = page.locator('.header-nav');
  9  |     await expect(nav).toBeVisible();
  10 |     await expect(nav).toHaveCSS('display', 'flex');
  11 |   });
  12 | 
  13 |   test('homepage menu is hidden on mobile', async ({ page }) => {
  14 |     await page.setViewportSize({ width: 375, height: 812 });
  15 |     await page.goto('https://the-motivahub.com/', { waitUntil: 'load' });
  16 |     await page.waitForTimeout(1000);
  17 | 
  18 |     const nav = page.locator('.header-nav');
> 19 |     await expect(nav).toHaveCSS('display', 'none');
     |                       ^ Error: expect(locator).toHaveCSS(expected) failed
  20 |   });
  21 | 
  22 |   test('contact page mailto link is clickable', async ({ page }) => {
  23 |     await page.goto('https://the-motivahub.com/fr/contact/', { waitUntil: 'load' });
  24 |     await page.waitForTimeout(1000);
  25 | 
  26 |     const mailtoLink = page.locator('a[href="mailto:contact@the-motivahub.com"]');
  27 |     await expect(mailtoLink).toBeVisible();
  28 |     await expect(mailtoLink).toHaveAttribute('href', 'mailto:contact@the-motivahub.com');
  29 |   });
  30 | 
  31 |   test('author page typography matches founder style', async ({ page }) => {
  32 |     await page.goto('https://the-motivahub.com/fr/author/youssef-raihane/', { waitUntil: 'load' });
  33 |     await page.waitForTimeout(1000);
  34 | 
  35 |     const bioParagraph = page.locator('.author-bio-content p').first();
  36 |     await expect(bioParagraph).toHaveCSS('font-family', /Fraunces|serif/);
  37 |     await expect(bioParagraph).toHaveCSS('line-height', '1.7');
  38 |   });
  39 | 
  40 |   test('contact page typography matches founder style', async ({ page }) => {
  41 |     await page.goto('https://the-motivahub.com/fr/contact/', { waitUntil: 'load' });
  42 |     await page.waitForTimeout(1000);
  43 | 
  44 |     const firstParagraph = page.locator('.article-body .container > p').first();
  45 |     await expect(firstParagraph).toHaveCSS('font-family', /Fraunces|serif/);
  46 |     await expect(firstParagraph).toHaveCSS('line-height', '1.7');
  47 |   });
  48 | });
  49 | 
```