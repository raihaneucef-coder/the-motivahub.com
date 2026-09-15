import { test, expect } from '@playwright/test';

test.describe('Full i18n audit', () => {
  test('homepage and static pages have correct lang and hreflang', async ({ request }) => {
    const pages = [
      '/fr/',
      '/fr/contact/',
      '/fr/about/',
      '/fr/best/books/',
      '/fr/tools/cold-shower-tracker/',
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

  test('article page has French title', async ({ request }) => {
    const res = await request.get('http://localhost:4321/fr/journal/sommeil-avantage-indefendable/');
    expect(res.ok()).toBeTruthy();
    const html = await res.text();
    expect(html).toContain('lang="fr"');
    expect(html).toContain('Le Sommeil');
  });
});
