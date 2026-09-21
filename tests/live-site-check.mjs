import { chromium } from 'playwright';

const browser = await chromium.launch();

const pages = [
  { name: 'homepage EN', url: 'https://the-motivahub.com/', lang: 'en' },
  { name: 'journal EN', url: 'https://the-motivahub.com/journal/', lang: 'en' },
  { name: 'article EN', url: 'https://the-motivahub.com/journal/2-minute-rule-system/', lang: 'en' },
  { name: 'homepage FR', url: 'https://the-motivahub.com/fr/', lang: 'fr' },
  { name: 'journal FR', url: 'https://the-motivahub.com/fr/journal/', lang: 'fr' },
  { name: 'article FR', url: 'https://the-motivahub.com/fr/journal/2-minute-rule-system/', lang: 'fr' },
];

const results = [];

for (const p of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  const issues = await page.evaluate(() => {
    const issues = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.right > window.innerWidth + 1 || rect.left < -1) {
        issues.push({
          tag: el.tagName.toLowerCase(),
          class: el.className,
          id: el.id,
          width: Math.round(rect.width),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
      }
    }
    return issues.slice(0, 10);
  });

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

  results.push({
    name: p.name,
    url: p.url,
    scrollWidth,
    clientWidth,
    overflow: scrollWidth > clientWidth,
    issues: issues.length,
    sample: issues.slice(0, 3),
  });

  await page.screenshot({ path: `tests/screenshots/${p.name.replace(/\s+/g, '-').toLowerCase()}.png`, fullPage: true });
  await page.close();
}

await browser.close();

console.log('\n=== Live Site Verification (EN/FR) ===');
results.forEach(r => {
  console.log(`\n${r.name}:`);
  console.log(`  scrollWidth: ${r.scrollWidth}, clientWidth: ${r.clientWidth}, overflow: ${r.overflow ? 'YES' : 'NO'}`);
  console.log(`  issues: ${r.issues}`);
  if (r.sample.length) {
    r.sample.forEach(i => console.log(`    ${i.tag}.${i.class}#${i.id} - width:${i.width}px`));
  }
});
