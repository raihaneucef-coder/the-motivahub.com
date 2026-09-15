import { test, expect } from '@playwright/test';

test.describe('Article translation', () => {
  test('sleep article shows French title', async ({ request }) => {
    const res = await request.get('http://localhost:4321/fr/journal/sleep-is-unfair-advantage/');
    expect(res.ok()).toBeTruthy();
    const html = await res.text();
    expect(html).toContain('lang="fr"');
    expect(html).toContain('Le Sommeil');
  });
});
