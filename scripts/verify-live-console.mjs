import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });

const PAGES = [
  'https://the-motivahub.com/',
  'https://the-motivahub.com/journal',
  'https://the-motivahub.com/best/habit-books',
  'https://the-motivahub.com/tools',
  'https://the-motivahub.com/30-days-discipline',
  'https://the-motivahub.com/fr',
];

let totalErrors = 0;
for (const url of PAGES) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));
  page.on('requestfailed', req => errors.push('REQFAIL: ' + req.url() + ' ' + (req.failure()?.errorText || '')));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);
  const filtered = errors.filter(e => !/favicon|adsbygoogle|googletagmanager|analytics|doubleclick|pagead|googleusercontent/i.test(e));
  console.log(`\n${url}`);
  console.log(`  errors (non-ad/tracking): ${filtered.length}`);
  filtered.slice(0, 5).forEach(e => console.log('   -', e.slice(0, 150)));
  totalErrors += filtered.length;
  await page.close();
}
console.log(`\n=== TOTAL non-tracking errors: ${totalErrors} ===`);
await b.close();
