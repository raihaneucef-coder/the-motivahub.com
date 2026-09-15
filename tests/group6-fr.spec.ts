import { test, expect } from '@playwright/test';

const articles = [
  { slug: 'regle-40-pourcent', frTitle: 'Règle des 40%' },
  { slug: 'regle-50-30-20', frTitle: 'Règle 50/30/20' },
  { slug: 'regle-deux-minutes', frTitle: 'Règle des 2 Minutes' },
  { slug: 'resilience-mentale', frTitle: 'Résilience Mentale' },
];

test.describe('Group 6 FR articles', () => {
  for (const article of articles) {
    test(article.slug, async ({ request }) => {
      const res = await request.get(`http://localhost:4321/fr/journal/${article.slug}/`);
      expect(res.ok()).toBeTruthy();
      const html = await res.text();
      expect(html).toContain('lang="fr"');
      expect(html).toContain(article.frTitle);
    });
  }
});
