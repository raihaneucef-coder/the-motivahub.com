import { test, expect, type Locator } from '@playwright/test';

// The site's header is a hamburger + full-screen overlay at every width; the old
// assertions looked for a `.header-nav` bar that no longer exists, and compared a
// computed `line-height` (always returned in px) against the unitless value written
// in the stylesheet, which can never match. These tests check the current contract.

const lineHeightRatio = (locator: Locator) =>
  locator.evaluate((el) => {
    const cs = getComputedStyle(el);
    return parseFloat(cs.lineHeight) / parseFloat(cs.fontSize);
  });

// The overlay is a full-screen panel parked off-screen with
// `transform: translateY(-100%)`; it keeps a non-empty box while closed, so
// Playwright's visibility check is not the right predicate. Geometry is.
const overlayTop = (locator: Locator) =>
  locator.evaluate((el) => el.getBoundingClientRect().top);

test.describe('Verify recent fixes', () => {
  test('menu control is visible and the overlay starts closed', async ({ page }) => {
    await page.goto('https://the-motivahub.com/', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    await expect(page.locator('#menu-btn')).toBeVisible();
    await expect(async () => {
      expect(await overlayTop(page.locator('#overlay-menu'))).toBeLessThan(0);
    }).toPass();
  });

  test('the overlay opens with the full navigation and closes again', async ({ page }) => {
    await page.goto('https://the-motivahub.com/', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    await page.locator('#menu-btn').click();
    await expect(async () => {
      expect(await overlayTop(page.locator('#overlay-menu'))).toBeGreaterThanOrEqual(0);
    }).toPass();
    await expect(page.locator('#overlay-menu')).toHaveClass(/\bopen\b/);

    const links = page.locator('#overlay-menu .overlay-nav a');
    await expect(async () => {
      expect(await links.count()).toBeGreaterThanOrEqual(15);
    }).toPass();

    await page.locator('#menu-close').click();
    await expect(async () => {
      expect(await overlayTop(page.locator('#overlay-menu'))).toBeLessThan(0);
    }).toPass();
    await expect(page.locator('#overlay-menu')).not.toHaveClass(/\bopen\b/);
  });

  test('no horizontal scroll at phone width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('https://the-motivahub.com/', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    const widths = await page.evaluate(() => {
      const de = document.documentElement;
      return { scroll: de.scrollWidth, client: de.clientWidth };
    });
    expect(widths.scroll).toBeLessThanOrEqual(widths.client);
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
    expect(await lineHeightRatio(bioParagraph)).toBeCloseTo(1.7, 1);
  });

  test('contact page typography matches founder style', async ({ page }) => {
    await page.goto('https://the-motivahub.com/fr/contact/', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    // First paragraph with real body copy, not a kicker or a meta line
    const contentParagraph = page.locator('.article-body p').filter({ hasText: /.{60,}/ }).first();
    await expect(contentParagraph).toHaveCSS('font-family', /Fraunces|serif/);
    expect(await lineHeightRatio(contentParagraph)).toBeCloseTo(1.7, 1);
  });
});
