import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/fr/',
  '/contact/',
  '/fr/contact/',
  '/about/',
  '/fr/about/',
  '/best/books/',
  '/fr/best/books/',
  '/tools/cold-shower-tracker/',
  '/fr/tools/cold-shower-tracker/',
];

test.describe('EN/FR full audit', () => {
  for (const p of pages) {
    test(p, async ({ request }) => {
      const res = await request.get(`http://localhost:4321${p}`);
      expect(res.ok()).toBeTruthy();
      const html = await res.text();
      const isFr = p.startsWith('/fr/');
      if (isFr) {
        expect(html).toContain('lang="fr"');
        expect(html).toContain('hreflang="fr"');
        expect(html).toContain('hreflang="en"');
      } else {
        expect(html).toContain('lang="en"');
        expect(html).toContain('hreflang="en"');
        expect(html).toContain('hreflang="fr"');
      }
    });
  }
});
