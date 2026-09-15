import { test, expect } from '@playwright/test';

test.describe('Final EN/FR audit', () => {
  test('all FR pages have correct lang and hreflang', async ({ request }) => {
    const pages = [
      '/fr/',
      '/fr/contact/',
      '/fr/about/',
      '/fr/best/books/',
      '/fr/tools/cold-shower-tracker/',
      '/fr/journal/sommeil-avantage-indefendable/',
      '/fr/journal/2-minute-rule-system/',
      '/fr/journal/beginner-again/',
      '/fr/journal/deep-work-focus/',
    ];
    for (const p of pages) {
      const res = await request.get(`http://localhost:4321${p}`);
      expect(res.ok()).toBeTruthy();
      const html = await res.text();
      expect(html).toContain('lang="fr"');
      expect(html).toContain('hreflang="fr"');
      expect(html).toContain('hreflang="en"');
      expect(html).toContain('hreflang="x-default"');
    }
  });

  test('no duplicate /fr/fr/ links', async ({ request }) => {
    const pages = ['/fr/', '/fr/contact/', '/fr/best/books/'];
    for (const p of pages) {
      const res = await request.get(`http://localhost:4321${p}`);
      const html = await res.text();
      expect(html).not.toContain('/fr/fr/');
    }
  });

  test('all EN pages still work', async ({ request }) => {
    const pages = ['/', '/contact/', '/about/', '/best/books/'];
    for (const p of pages) {
      const res = await request.get(`http://localhost:4321${p}`);
      expect(res.ok()).toBeTruthy();
    }
  });
});
