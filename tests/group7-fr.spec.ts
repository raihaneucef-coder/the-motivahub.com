import { test, expect } from '@playwright/test';

const articles = [
  { slug: 'routine-matin-change-tout', frTitle: 'Routine Matinale Change Tout' },
  { slug: 'run-your-own-race', frTitle: 'Courez Votre Propre Course' },
  { slug: 'she-started-at-60', frTitle: 'Elle a Commencé à 60 Ans' },
  { slug: 'strength-is-a-skill', frTitle: 'Force est une Compétence' },
];

test.describe('Group 7 FR articles', () => {
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
