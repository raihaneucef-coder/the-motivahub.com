#!/usr/bin/env node
// Mobile + iPad audit for live site after gold/brand fixes
import { chromium } from 'playwright';

const VIEWPORTS = [
  { name: 'iPhone SE', width: 375, height: 667, dp: 2, mobile: true },
  { name: 'iPhone 14 Pro', width: 393, height: 852, dp: 3, mobile: true },
  { name: 'iPad mini', width: 768, height: 1024, dp: 2, mobile: true },
  { name: 'iPad Pro 11"', width: 834, height: 1194, dp: 2, mobile: true },
];

const PAGES = [
  { path: '/', slug: 'home' },
  { path: '/journal/', slug: 'journal' },
  { path: '/30-days-discipline/', slug: '30days' },
  { path: '/habit-books/', slug: 'books' },
  { path: '/tools/', slug: 'tools' },
  { path: '/contact/', slug: 'contact' },
];

const OUT = new URL('../tests/mobile-ipad/', import.meta.url);
import { mkdirSync } from 'node:fs';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dp,
    isMobile: vp.mobile,
    hasTouch: true,
  });
  for (const page of PAGES) {
    const url = 'https://the-motivahub.com' + page.path;
    const tab = await ctx.newPage();
    const errors = [];
    tab.on('pageerror', e => errors.push('pageerror: ' + e.message));
    tab.on('console', m => { if (m.type() === 'error' && !/adsbygoogle|analytics|gtag|fbevents|hotjar|clarity|index\.js/i.test(m.text())) errors.push('console: ' + m.text()); });
    const res = await tab.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(e => null);
    const status = res ? res.status() : 'ERR';
    const info = await tab.evaluate(() => {
      const cs = getComputedStyle(document.documentElement);
      const gold = cs.getPropertyValue('--gold').trim();
      const or = cs.getPropertyValue('--or').trim();
      const h1 = (document.querySelector('h1') || {}).textContent?.trim().slice(0, 60) || '';
      // horizontal overflow check
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const overflow = docW - winW;
      // orange detector: any element still using #ff4d00-ish color?
      let orangeEls = 0;
      document.querySelectorAll('*').forEach(el => {
        const s = getComputedStyle(el);
        const c = (s.color + s.backgroundColor + s.borderColor).toLowerCase();
        if (/ff4d00|ff6a2a|e04400/.test(c)) orangeEls++;
      });
      // tap-target check: buttons/links smaller than 40px on mobile
      let small = 0, total = 0;
      if (window.innerWidth < 768) {
        document.querySelectorAll('a, button').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          total++;
          if (r.height < 40 || r.width < 40) small++;
        });
      }
      return { gold, or, h1, overflow, docW, winW, orangeEls, small, total };
    });
    await tab.screenshot({ path: new URL(`${vp.name.replace(/[^\w]/g, '_')}_${page.slug}.png`, OUT).pathname, fullPage: false });
    results.push({ vp: vp.name, page: page.slug, status, ...info, errors: errors.slice(0, 3) });
    console.log(`[${vp.name}] /${page.slug} → ${status} | --gold=${info.gold} --or=${info.or} | overflow=${info.overflow}px | orange=${info.orangeEls} | smallTaps=${info.small}/${info.total} | errs=${errors.length}`);
    await tab.close();
  }
  await ctx.close();
}

await browser.close();

import { writeFileSync } from 'node:fs';
writeFileSync(new URL('results.json', OUT), JSON.stringify(results, null, 2));
console.log('\nSaved → tests/mobile-ipad/results.json + ' + results.length + ' screenshots');
