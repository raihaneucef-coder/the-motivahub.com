import { test, expect } from '@playwright/test';

const articles = [
  { slug: 'comparison-trap', frTitle: 'Piège de la Comparaison' },
  { slug: 'confiance-inbranlable', frTitle: 'Confiance Inébranlable' },
  { slug: 'deep-work-focus', frTitle: 'Deep Work' },
  { slug: 'detox-numerique', frTitle: 'Détox Numérique' },
];

test.describe('Group 3 FR articles', () => {
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
