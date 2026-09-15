import { test, expect } from '@playwright/test';

const frPages = [
  { path: '/fr/', title: 'Motiva Hub' },
  { path: '/fr/best/books/', title: 'Meilleurs Livres' },
  { path: '/fr/best/focus-books/', title: 'Concentration' },
  { path: '/fr/best/habit-books/', title: 'Habitudes' },
  { path: '/fr/best/stoicism-books/', title: 'Stoïcisme' },
  { path: '/fr/guides/atomic-habits-ultimate-guide/', title: 'Atomic Habits' },
  { path: '/fr/tools/discipline-quiz/', title: 'Discipline' },
  { path: '/fr/tools/habit-stacker/', title: 'Habit' },
  { path: '/fr/tools/meditation-timer/', title: 'Méditation' },
  { path: '/fr/tools/cold-shower-tracker/', title: 'Douches Froides' },
  { path: '/fr/tools/reading-calculator/', title: 'Lecture' },
  { path: '/fr/author/youssef-raihane/', title: 'Youssef Raihane' },
  { path: '/fr/pdf/30-days-discipline/', title: '30 Jours' },
  { path: '/fr/topics/', title: 'Topics' },
  { path: '/fr/contact/', title: 'Contact' },
  { path: '/fr/about/', title: 'About' },
];

test.describe('French pages i18n', () => {
  for (const page of frPages) {
    test(page.path, async ({ request }) => {
      const res = await request.get(`http://localhost:4321${page.path}`);
      expect(res.ok()).toBeTruthy();
      const html = await res.text();
      expect(html).toContain('lang="fr"');
      expect(html).toContain('hreflang="fr"');
    });
  }
});
