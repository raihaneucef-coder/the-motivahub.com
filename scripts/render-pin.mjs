#!/usr/bin/env node
// Pinterest pin renderer — local, free, on-brand.
// Renders an HTML/CSS pin (1000x1500) and screenshots it with Playwright/Chromium.
// Uses brand Fraunces serif + warm gold accent over a site image with a legibility scrim.
//
// Usage:
//   node scripts/render-pin.mjs <slug> "<kicker>" "<headline>" "<goldWord>" "<sub>" "<bgImage>"
// or:  node scripts/render-pin.mjs --samples   (renders the 2 style samples)
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'pins');
mkdirSync(OUT, { recursive: true });

const esc = (s) => (s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Fraunces subset lacks lining figures -> render digits in Inter (lining, clean).
const dig = (s) => esc(s).replace(/([0-9])/g, '<span class="num">$1</span>');

// highlight the gold word inside the headline
function withGold(headline, goldWord) {
  if (!goldWord) return dig(headline);
  const i = headline.toLowerCase().indexOf(goldWord.toLowerCase());
  if (i < 0) return dig(headline);
  return (
    dig(headline.slice(0, i)) +
    '<em class="gold">' + dig(headline.slice(i, i + goldWord.length)) + '</em>' +
    dig(headline.slice(i + goldWord.length))
  );
}

const html = ({ slug, kicker, headline, goldWord, sub, bg }) => {
  const hl = headline || '';
  const hsize = hl.length > 46 ? 66 : hl.length > 38 ? 74 : hl.length > 28 ? 82 : 88;
  const subsize = (sub || '').length > 96 ? 28 : 34;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="file://">
<style>
  @font-face{font-family:'Fraunces';src:url('file://${ROOT}/public/fonts/fraunces-normal-latin-63f165.woff2');font-weight:400 900;font-style:normal;}
  @font-face{font-family:'Fraunces';src:url('file://${ROOT}/public/fonts/fraunces-italic-latin-de4b58.woff2');font-weight:400 900;font-style:italic;}
  @font-face{font-family:'Inter';src:url('file://${ROOT}/public/fonts/inter-normal-latin-1ab1ad.woff2');font-weight:400;}
  *{margin:0;padding:0;box-sizing:border-box;}
  :root{--gold:#d8b45f;--gold-deep:#c79a45;}
  html,body{width:1000px;height:1500px;}
  .pin{position:relative;width:1000px;height:1500px;overflow:hidden;
    font-family:'Fraunces',Georgia,serif;font-variant-numeric:lining-nums proportional-nums;font-feature-settings:"lnum" 1,"onum" 0,"tnum" 0;background:#0d0b09;color:#f5efe4;}
  .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(0.9) contrast(1.03);}
  .scrim{position:absolute;inset:0;background:
    linear-gradient(180deg,rgba(13,11,9,.35) 0%,rgba(13,11,9,.72) 46%,rgba(13,11,9,.94) 100%);}
  .content{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;
    padding:88px 78px 92px;}
  .kicker{font-family:'Inter',sans-serif;font-weight:400;letter-spacing:.34em;text-transform:uppercase;
    font-size:22px;color:var(--gold);margin-bottom:30px;}
  .headline{font-weight:600;font-size:${hsize}px;line-height:1.05;letter-spacing:-0.01em;}
  .headline .gold{font-style:italic;color:var(--gold);font-weight:600;}
  .headline .num,.headline .gold .num{font-family:'Inter',sans-serif;font-style:normal;font-weight:600;}
  .rule{width:120px;height:2px;background:var(--gold);margin:38px 0 30px;opacity:.85;}
  .sub{font-family:'Inter',sans-serif;font-weight:400;font-size:${subsize}px;line-height:1.35;color:#e7ddc9;opacity:.94;max-width:820px;}
  .brand{position:absolute;top:52px;left:60px;display:flex;align-items:center;gap:16px;
    filter:drop-shadow(0 2px 6px rgba(0,0,0,.55));}
  .brand img{width:52px;height:52px;display:block;}
  .brand span{font-family:'Inter',sans-serif;font-weight:400;letter-spacing:.30em;text-transform:uppercase;
    font-size:24px;color:#f5efe4;}
  .domain{position:absolute;left:0;right:0;bottom:34px;text-align:center;
    font-family:'Inter',sans-serif;letter-spacing:.22em;text-transform:uppercase;font-size:20px;color:var(--gold);opacity:.92;}
</style></head><body>
<div class="pin">
  <img class="bg" src="file://${ROOT}/public/images/${esc(bg)}">
  <div class="scrim"></div>
  <div class="brand"><img src="file://${ROOT}/public/img/brand-mark.svg" alt=""><span>Motiva&nbsp;Hub</span></div>
  <div class="content">
    <div class="kicker">${esc(kicker)}</div>
    <div class="headline">${withGold(headline, goldWord)}</div>
    <div class="rule"></div>
    <div class="sub">${esc(sub)}</div>
  </div>
  <div class="domain">the-motivahub.com</div>
</div></body></html>`;
};

import { existsSync } from 'node:fs';
async function render(pin) {
  const bg = existsSync(join(ROOT, 'public/images', pin.bg)) ? pin.bg : 'hero-mountain.jpg';
  const f = join(OUT, `${pin.slug}.html`);
  writeFileSync(f, html({ ...pin, bg }));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1500 }, deviceScaleFactor: 1 });
  await page.goto('file://' + f);
  await page.waitForTimeout(350); // font settle
  const png = join(OUT, `${pin.slug}.png`);
  await page.locator('.pin').screenshot({ path: png });
  await browser.close();
  return png;
}

const SAMPLES = [
  {
    slug: 'sample-books-atomic-habits',
    kicker: 'Honest Book Review · 2026',
    headline: 'Atomic Habits Changed My Mornings',
    goldWord: 'Atomic Habits',
    sub: 'But not the way you think. What 4 re-reads in 18 months actually taught me.',
    bg: 'books.jpg',
  },
  {
    slug: 'sample-morning-5-minute',
    kicker: '5-Minute Habits',
    headline: 'The 5-Minute Morning Habit That Saves Me 4 Hours a Week',
    goldWord: '5-Minute',
    sub: 'Not meditation. Not journaling. Not cold water. Just one small thing.',
    bg: 'desk.jpg',
  },
];

const args = process.argv.slice(2);
if (args[0] === '--samples') {
  for (const p of SAMPLES) console.log('✓ ' + (await render(p)));
} else if (args[0] === '--batch') {
  // render every pin from a content spec JSON (default: the oct2026 sample set)
  const { readFileSync } = await import('node:fs');
  const specPath = args[1] ? join(ROOT, args[1]) : join(ROOT, 'docs/pins-content-oct2026.json');
  const spec = JSON.parse(readFileSync(specPath, 'utf8'));
  const kickerByBoard = {
    'Best Self-Improvement Books': 'Book Review · 2026',
    'Money Mindset & Finance': 'Money & Finance',
    'Habitudes & routines (FR)': 'Habitudes & Routines',
    'Discipline personnelle (FR)': 'Discipline',
    'Productivité (FR)': 'Productivité',
    'Morning Routines & Daily Habits': 'Morning Routines',
    'Productivity Systems That Stick': 'Productivity Systems',
  };
  const list = spec.pins || spec;
  for (const p of list) {
    const png = await render({
      slug: p.slug,
      kicker: p.kicker || kickerByBoard[p.board] || 'Motiva Hub',
      headline: p.headline,
      goldWord: p.gold,
      sub: p.sub,
      bg: p.bg,
    });
    console.log('✓ ' + png);
  }
} else if (args.length >= 5) {
  const [slug, kicker, headline, goldWord, sub, bg] = args;
  console.log('✓ ' + (await render({ slug, kicker, headline, goldWord, sub, bg: bg || 'hero-mountain.jpg' })));
} else {
  console.log('Usage: render-pin.mjs --samples  |  render-pin.mjs <slug> <kicker> <headline> <goldWord> <sub> <bgImage>');
}
