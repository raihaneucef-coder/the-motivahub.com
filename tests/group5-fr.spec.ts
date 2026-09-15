import { test, expect } from '@playwright/test';

const articles = [
  { slug: 'protein-is-not-just-for-athletes', frTitle: 'Protéines ne sont pas que pour les Athlètes' },
  { slug: 'psychology-of-money-business', frTitle: 'Psychologie de l\'Argent' },
  { slug: 'quiet-power-of-doing-less', frTitle: 'Pouvoir Silencieux' },
  { slug: 'regle-1-pourcent', frTitle: 'Règle du 1%' },
];

test.describe('Group 5 FR articles', () => {
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
