import { test, expect } from '@playwright/test';

const articles = [
  { slug: 'solo-travel-stronger-self', frTitle: 'Voyager Seul pour Devenir Plus Fort' },
  { slug: 'sprint-90-jours', frTitle: 'Sprint de 90 Jours' },
  { slug: 'standard-non-negociable', frTitle: 'Standards Non-Négociables' },
  { slug: 'success-is-a-direction', frTitle: 'Réussite est une Direction' },
];

test.describe('Group 8 FR articles', () => {
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
