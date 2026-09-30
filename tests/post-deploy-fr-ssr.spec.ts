// Post-deploy FR SSR + toggle sanity.
import { test, expect } from '@playwright/test';

const FR_PAGES = [
  '/fr/',
  '/fr/about/',
  '/fr/topics/',
  '/fr/tools/habit-stacker/',
  '/fr/tools/discipline-quiz/',
  '/fr/best/books/',
  '/fr/journal/atomic-habits-review/',
  '/fr/privacy/',
];

test.describe('FR SSR + toggle', () => {
  for (const path of FR_PAGES) {
    test(`FR page ${path} — SSR French + no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push('pageerror: ' + String(e)));
      page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('fr');

      // Nav link "Le Journal" is expected in SSR French after i18n-fr-ssr swap.
      const navJournal = page.locator('a[data-i18n="navJournal"]').first();
      await expect(navJournal).toBeVisible();
      const txt = (await navJournal.textContent() || '').trim();
      expect(['Le Journal', 'Journal']).toContain(txt);

      // Cookie banner should be present in raw HTML (French after swap).
      const cookie = page.locator('div#cookie-consent');
      const cookieTxt = (await cookie.textContent() || '').toLowerCase();
      expect(cookieTxt).toContain('cookies');
      // After SSR swap, cookie text should NOT start with the English default.
      expect(cookieTxt).not.toMatch(/^we use cookies to improve/);

      // No console/page errors.
      expect(errors, 'js errors on ' + path).toEqual([]);
    });

    test(`FR page ${path} — toggle EN restores English`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      // Wait for language toggle to be ready (client swap script).
      await page.waitForFunction(() => typeof (window as any).setLang === 'function');
      await (page as any).evaluate(() => (window as any).setLang('en', false));
      // After switching to English, "Le Journal" nav should become English again.
      const navJournal = page.locator('a[data-i18n="navJournal"]').first();
      await expect(navJournal).toBeVisible();
      await page.waitForTimeout(300);
      const txt = (await navJournal.textContent() || '').trim();
      expect(['Journal', 'The Journal']).toContain(txt);
    });
  }
});
