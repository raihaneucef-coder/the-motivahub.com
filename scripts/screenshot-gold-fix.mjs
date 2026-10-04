// Screenshot 5 key pages after --gold fix (site is currently 100% dark theme via :root override)
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('tests/gold-fix', { recursive: true });

const PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/best/habit-books', name: 'habit-books' },
  { path: '/tools', name: 'tools' },
  { path: '/30-days-discipline', name: '30-days' },
  { path: '/blog/deep-work-ritual', name: 'article-deep-work' },
];

const BASE = 'http://localhost:4399';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
for (const p of PAGES) {
  const page = await ctx.newPage();
  await page.goto(BASE + p.path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `tests/gold-fix/${p.name}.png`, fullPage: false });
  // Sample computed --gold value on body
  const gold = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--gold').trim());
  console.log('✓', p.name.padEnd(20), '  --gold =', gold);
  await page.close();
}
await browser.close();
