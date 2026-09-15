import { test, expect } from '@playwright/test';

const articles = [
  { slug: 'discipline-choix-quotidien', frTitle: 'Discipline est un Choix Quotidien' },
  { slug: 'earn-keep-grow', frTitle: 'Gagner, Garder, Faire Croître' },
  { slug: 'price-of-freedom', frTitle: 'Prix de la Liberté' },
  { slug: 'process-vs-outcome', frTitle: 'Processus vs Résultat' },
];

test.describe('Group 4 FR articles', () => {
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
