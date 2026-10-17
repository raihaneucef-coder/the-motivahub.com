// Temporary check: compare computed style of touched elements, live site vs local build.
import { chromium } from 'playwright';
const checks = [
  ['/topics/', '.topics-grid a h2, .topics-grid a h3'],
  ['/fr/topics/', '.topics-grid a h2, .topics-grid a h3'],
  ['/30-days-discipline/', '.d30-benefit h2, .d30-benefit h3'],
  ['/fr/30-days-discipline/', '.d30-benefit h2, .d30-benefit h3'],
  ['/about/', '.ab-principle-word'],
  ['/fr/about/', '.ab-principle-word'],
  ['/bio/', '.featured-card h2, .featured-card h3'],
  ['/fr/bio/', '.featured-card h2, .featured-card h3'],
  ['/objectives/', '.goals-head h2, .goals-head h3'],
  ['/psychology/', '.psychology-card h2, .psychology-card h3'],
  ['/memento-mori/', '.mm-article-card h2, .mm-article-card h3'],
  ['/tools/reading-calculator/', '.rc-plan-h'],
  ['/journal/', '.journal-hero-img img'],
  ['/fr/journal/', '.journal-hero-img img'],
  ['/books/', '.bk-hero-img img'],
  ['/guides/', '.guides-hero-img img'],
  ['/tools/', '.tools-hero-img img'],
  ['/fr/30-days-discipline/', '.d30-hero-img img'],
  ['/journal/', '.card-title'],
];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const grab = async (base, path, sel) => {
  await page.goto(base + path, { waitUntil: 'load', timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(600);
  return page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const c = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, fs: c.fontSize, fw: c.fontWeight, color: c.color, w: Math.round(r.width), h: Math.round(r.height), src: el.currentSrc || el.src || '' };
  }, sel);
};
let diffs = 0;
for (const [p, sel] of checks) {
  const a = await grab('https://the-motivahub.com', p, sel);
  const b = await grab('http://localhost:8899', p, sel);
  const same = a && b && a.fs === b.fs && a.color === b.color && a.fw === b.fw && Math.abs(a.h - b.h) < 3 && Math.abs(a.w - b.w) < 3;
  if (!same) diffs++;
  const f = (x) => (x ? `${x.tag} ${x.fs} ${x.fw} ${x.color} ${x.w}x${x.h}` : 'null');
  console.log(`${same ? 'OK  ' : 'DIFF'} ${p}  live[${f(a)}]  local[${f(b)}]`);
  if (a && b && a.src !== b.src) console.log(`        img: live=${a.src.split('/').pop()} local=${b.src.split('/').pop()}`);
}
console.log('\ndiffs =', diffs);
await browser.close();
