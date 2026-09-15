import { test, expect } from '@playwright/test';

const articles = [
  { slug: '2-minute-rule-system', frTitle: 'La Règle des 2 Minutes' },
  { slug: '5-minute-morning-habit', frTitle: 'Habitude Matinale' },
  { slug: 'arreter-auto-sabotage', frTitle: 'Auto-Sabotage' },
  { slug: 'attention-as-asset', frTitle: 'Attention comme Actif' },
];

test.describe('Group 1 FR articles', () => {
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
