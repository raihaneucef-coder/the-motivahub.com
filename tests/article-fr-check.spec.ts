import { test, expect } from '@playwright/test';

const articlesToCheck = [
  { slug: 'sommeil-avantage-indefendable', expectedFr: 'Le Sommeil est votre Avantage Indéfendable' },
  { slug: '2-minute-rule-system', expectedFr: 'La Règle des 2 Minutes' },
  { slug: 'atomic-habits-review', expectedFr: 'Atomic Habits' },
];

test.describe('Article FR translations', () => {
  for (const article of articlesToCheck) {
    test(article.slug, async ({ request }) => {
      const res = await request.get(`http://localhost:4321/fr/journal/${article.slug}/`);
      expect(res.ok()).toBeTruthy();
      const html = await res.text();
      expect(html).toContain('lang="fr"');
      // Check for French text in h1
      const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
      if (h1Match) {
        expect(h1Match[1]).toContain(article.expectedFr);
      }
    });
  }
});
