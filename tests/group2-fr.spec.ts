import { test, expect } from '@playwright/test';

const articles = [
  { slug: 'beginner-again', frTitle: 'Recommencer en Débutant' },
  { slug: 'body-votes-first', frTitle: 'Le Corps Vote d\'Abord' },
  { slug: 'calm-is-a-superpower', frTitle: 'Le Calme est un Super-Pouvoir' },
  { slug: 'cant-hurt-me-review', frTitle: 'Can\'t Hurt Me' },
];

test.describe('Group 2 FR articles', () => {
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
