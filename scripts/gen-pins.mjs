#!/usr/bin/env node
// Pinterest PIN FACTORY — read-only.
// Reads article frontmatter + books data, derives bilingual pins (EN + FR twins),
// maps each to an expanded board, builds SEO/GEO/AEO copy (AEO hook from the FAQ
// question, GEO answer snippet, entities, CTA), and emits docs/pins-queue-all.json
// in the same schema scripts/render-pin.mjs --batch consumes.
//
// It changes NOTHING in src/. Output = docs/pins-queue-all.json + a printed report.
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import yaml from 'js-yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG = join(ROOT, 'src/content/blog');
const SITE = 'https://the-motivahub.com';

// ---- topic -> board taxonomy (expanded; existing 4 EN + 4 FR kept verbatim) ----
const EN_BOARD = {
  'Discipline': 'Discipline & Self Improvement',
  'Personal Growth': 'Discipline & Self Improvement',
  'Confidence': 'Discipline & Self Improvement',
  'Mindset': 'Discipline & Self Improvement',
  'Productivity': 'Productivity Systems',
  'Stories': 'Stoicism & Mental Strength',
  'Success': 'Stoicism & Mental Strength',
  'Wellness': 'Sleep & Recovery',
  'Habits': 'Habits & Goals',
  'Goals': 'Habits & Goals',
  'Sport': 'Health & Fitness',
  'Nutrition': 'Health & Fitness',
  'Finance': 'Money & Finance',
  'Travel': 'Life, Travel & Relationships',
  'Relationships': 'Life, Travel & Relationships',
  'Entertainment': 'Life, Travel & Relationships',
};
const FR_BOARD = {
  'Discipline': 'Discipline personnelle',
  'Personal Growth': 'Discipline personnelle',
  'Confidence': 'Discipline personnelle',
  'Mindset': 'Discipline personnelle',
  'Productivity': 'Productivité',
  'Stories': 'Philosophie stoïcienne',
  'Success': 'Philosophie stoïcienne',
  'Wellness': 'Sommeil & récupération',
  'Habits': 'Habitudes & routines',
  'Goals': 'Habitudes & routines',
  'Sport': 'Santé & sport',
  'Nutrition': 'Santé & sport',
  'Finance': 'Argent & finance',
  'Travel': 'Vie, voyage & relations',
  'Relationships': 'Vie, voyage & relations',
  'Entertainment': 'Vie, voyage & relations',
};
// short on-image kicker per board
const KICKER = {
  'Discipline & Self Improvement': 'Discipline & Self Improvement',
  'Productivity Systems': 'Productivity Systems',
  'Stoicism & Mental Strength': 'Stoic Mindset',
  'Sleep & Recovery': 'Sleep & Recovery',
  'Habits & Goals': 'Habits & Goals',
  'Health & Fitness': 'Health & Fitness',
  'Money & Finance': 'Money & Finance',
  'Book Reviews': 'Book Review · 2026',
  'Life, Travel & Relationships': 'Life & Relationships',
  'Discipline personnelle': 'Discipline',
  'Productivité': 'Productivité',
  'Philosophie stoïcienne': 'Esprit stoïque',
  'Sommeil & récupération': 'Sommeil',
  'Habitudes & routines': 'Habitudes',
  'Santé & sport': 'Santé & Sport',
  'Argent & finance': 'Finances',
  'Chroniques de livres': 'Chronique · 2026',
  'Vie, voyage & relations': 'Vie & Relations',
};
const BOOK_BG = ['books.jpg', 'hero-books.jpg', 'statue.jpg', 'journal.jpg', 'desk.jpg'];

// SEO-potential proxy for ordering the queue (deterministic, offline).
const TOPIC_WEIGHT = { Habits: 10, Productivity: 9, Discipline: 9, Finance: 9, Goals: 8, Mindset: 8, Confidence: 7, 'Personal Growth': 7, Stories: 6, Success: 6, Wellness: 5, Sport: 5, Nutrition: 5, Relationships: 4, Travel: 3, Entertainment: 3 };
const FLAGSHIP = new Set(['atomic-habits', 'meditations', 'cant-hurt-me', 'deep-work', 'daily-stoic', 'psychology-of-money', 'mans-search-for-meaning']);

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
const trimWords = (s, max) => {
  s = clean(s);
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ') > 30 ? cut.lastIndexOf(' ') : max).replace(/[.,;:—-]\s*$/, '') + '…';
};
const titleTag = (s) =>
  clean(s).replace(/[^a-zA-Z0-9 ]/g, ' ').split(/\s+/).filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1)).join('');
// "STOICISM" -> "Stoicism", "SELF HELP" -> "Self Help" (for readable titles/alt)
const titleCase = (s) => clean(s).toLowerCase().replace(/(^|[\s-])(\p{L})/gu, (_, sp, ch) => sp + ch.toUpperCase());

function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  try { return yaml.load(m[1]) || {}; } catch { return {}; }
}

// pick a gold word for the headline: (1) first keyword phrase literally in the
// headline, (2) the topic word if it appears, (3) first substantive word (>=4
// letters, not a stopword). Returns '' only when nothing sensible exists.
const STOP = new Set(['the', 'and', 'for', 'you', 'your', 'with', 'that', 'this', 'how', 'why', 'what', 'when', 'from', 'into', 'than', 'then', 'them', 'they', 'will', 'not', 'but', 'are', 'was', 'une', 'des', 'dans', 'pour', 'avec', 'sans', 'comment', 'pourquoi', 'quand', 'faire', 'etre', 'nos', 'les', 'par', 'sur', 'qui', 'que']);
function pickGold(headline, kws, topic) {
  const h = headline.toLowerCase();
  for (const k of kws || []) {
    const kk = clean(k).toLowerCase();
    if (kk.length >= 4 && h.includes(kk)) {
      const i = h.indexOf(kk);
      return headline.slice(i, i + kk.length);
    }
  }
  if (topic && h.includes(topic.toLowerCase())) {
    const i = h.indexOf(topic.toLowerCase());
    return headline.slice(i, i + topic.length);
  }
  const words = headline.split(/\s+/);
  let acc = '';
  for (const w of words) {
    if (w.length >= 4 && !STOP.has(w.toLowerCase().replace(/[^a-zà-ÿ]/gi, ''))) { acc = acc ? `${acc} ${w}` : w; if (acc.length >= 12) break; }
    else if (acc) break;
  }
  return acc && acc.length <= 24 ? acc : '';
}

function buildArticlePins(fm, id) {
  const topic = clean(fm.topic);
  const kws = Array.isArray(fm.keywords) ? fm.keywords : [];
  const hooksEn = (Array.isArray(fm.faq) && fm.faq[0] && fm.faq[0].q) || '';
  const hooksFr = (Array.isArray(fm.faqFr) && fm.faqFr[0] && fm.faqFr[0].q) || '';
  const base = (TOPIC_WEIGHT[topic] || 5) * 10 + (fm.featured ? 15 : 0) + Math.min(fm.wordCount || 0, 1500) / 100;
  const pins = [];

  // --- EN pin ---
  const enHead = clean(fm.seoTitle) || clean(fm.title);
  const enDesc = clean(fm.description);
  const enPdesc = clean([hooksEn, enDesc, 'Full guide + free tools on Motiva Hub.'].filter(Boolean).join(' '));
  const enBoard = EN_BOARD[topic] || 'Discipline & Self Improvement';
  pins.push({
    slug: id, lang: 'en', article: id, priority: base,
    board: enBoard, kicker: KICKER[enBoard] || 'Motiva Hub',
    url: `${SITE}/journal/${id}/?utm_source=pinterest&utm_medium=pin&utm_campaign=pin-${id}-en`,
    headline: trimWords(enHead, 48), gold: pickGold(enHead, kws, topic),
    sub: trimWords(hooksEn || enDesc, 120), bg: bgOf(fm),
    ptitle: trimWords(clean(fm.seoTitle) || enHead, 60),
    pdesc: enPdesc.length > 500 ? enPdesc.slice(0, 497) + '…' : enPdesc,
    alt: fm.imageAlt ? `${clean(fm.imageAlt)}. Gold serif headline: "${enHead}".` : `Pinterest pin, headline "${enHead}" over a ${topic.toLowerCase()} photo, Motiva Hub.`,
    tags: [titleTag(topic), ...kws.slice(0, 3).map(titleTag)].filter(Boolean).slice(0, 5),
  });

  // --- FR twin pin ---
  if (fm.titleFr) {
    const frSlug = FR_SLUGS[id] || id;
    const frHead = clean(fm.seoTitleFr) || clean(fm.titleFr);
    const frDesc = clean(fm.descriptionFr) || enDesc;
    const frPdesc = clean([hooksFr, frDesc, 'Guide complet + outils gratuits sur Motiva Hub.'].filter(Boolean).join(' '));
    const frBoard = FR_BOARD[topic] || 'Discipline personnelle';
    pins.push({
      slug: `${id}__fr`, lang: 'fr', article: id, priority: base - 0.5,
      board: frBoard, kicker: KICKER[frBoard] || 'Motiva Hub',
      url: `${SITE}/fr/journal/${frSlug}/?utm_source=pinterest&utm_medium=pin&utm_campaign=pin-${frSlug}-fr`,
      headline: trimWords(frHead, 48), gold: pickGold(frHead, kws, topic),
      sub: trimWords(hooksFr || frDesc, 120), bg: bgOf(fm),
      ptitle: trimWords(clean(fm.seoTitleFr) || frHead, 60),
      pdesc: frPdesc.length > 500 ? frPdesc.slice(0, 497) + '…' : frPdesc,
      alt: `Epingle Pinterest, titre serif doré « ${frHead} » sur une photo ${topic.toLowerCase()}, Motiva Hub.`,
      tags: [titleTag(topic), ...kws.slice(0, 2).map(titleTag), 'DeveloppementPersonnel'].filter(Boolean).slice(0, 5),
    });
  }
  return pins;
}

function bgOf(fm) {
  // article image lives under public/images/ ; keep the path relative to that dir
  const img = clean(fm.image) || '/images/hero.jpg';
  const rel = img.replace(/^\/images\//, '');
  return existsSync(join(ROOT, 'public/images', rel)) ? rel : 'hero-mountain.jpg';
}

// ---- build already-covered set (posted 21 + ready 20 + noindex aliases) ----
function loadDone() {
  const done = new Set();
  try {
    const b = JSON.parse(readFileSync(join(ROOT, 'docs/pinterest-batch-oct2026.json'), 'utf8'));
    for (const p of b) { const m = (p.url || '').match(/\/journal\/([^/?]+)\//); if (m) done.add(m[1]); }
  } catch {}
  try {
    const b = JSON.parse(readFileSync(join(ROOT, 'docs/pins-content-oct2026.json'), 'utf8'));
    for (const p of b.pins || []) if (p.article) done.add(p.article); else done.add(p.slug);
  } catch {}
  return done;
}

// ---- FR slugs ----
let FR_SLUGS = {};
try { FR_SLUGS = JSON.parse(readFileSync(join(ROOT, 'src/i18n/slugs-fr.json'), 'utf8')); } catch {}

// ---- books (light regex parse of books.ts) ----
function parseBooks() {
  const src = readFileSync(join(ROOT, 'src/data/books.ts'), 'utf8');
  const blocks = src.split(/\n  \{/).slice(1);
  const field = (b, k) => { const m = b.match(new RegExp(`${k}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`)); return m ? m[1] : ''; };
  return blocks.map((b) => ({
    id: field(b, 'id'), title: field(b, 'title'), description: field(b, 'description'),
    reason: field(b, 'reason'), author: field(b, 'author'), category: field(b, 'category'),
    descriptionFr: field(b, 'descriptionFr'), reasonFr: field(b, 'reasonFr'), categoryFr: field(b, 'categoryFr'),
  })).filter((b) => b.id && b.title);
}

const done = loadDone();
const pins = [];
const skipped = [];

for (const file of readdirSync(BLOG).filter((f) => f.endsWith('.md'))) {
  const id = basename(file, '.md');
  const fm = frontmatter(readFileSync(join(BLOG, file), 'utf8'));
  if (fm.draft || fm.noindex) { skipped.push(`${id} (${fm.noindex ? 'noindex' : 'draft'})`); continue; }
  if (done.has(id)) { skipped.push(`${id} (posted/ready)`); continue; }
  pins.push(...buildArticlePins(fm, id));
}

// ---- book pins ----
const books = parseBooks();
books.forEach((bk, i) => {
  const bg = existsSync(join(ROOT, 'public/images', BOOK_BG[i % BOOK_BG.length])) ? BOOK_BG[i % BOOK_BG.length] : 'books.jpg';
  const cat = titleCase(bk.category);
  const catFr = titleCase(bk.categoryFr);
  const head = `${bk.title} — ${clean(bk.reason)}`;
  pins.push({
    slug: `book-${bk.id}`, lang: 'en', book: bk.id,
    priority: (FLAGSHIP.has(bk.id) ? 12 : 6) * 10 + 2,
    board: 'Book Reviews', kicker: 'Book Review · 2026',
    url: `${SITE}/books/?utm_source=pinterest&utm_medium=pin&utm_campaign=pin-book-${bk.id}-en`,
    headline: trimWords(bk.title, 48), gold: bk.title, sub: trimWords(clean(bk.reason), 120), bg,
    ptitle: trimWords(`${bk.title} — Best ${cat} Book`, 60),
    pdesc: trimWords(`${clean(bk.description)} ${clean(bk.reason)} Why it earns a spot on the Motiva Hub reading list.`, 480),
    alt: `Book cover ${bk.title} (${cat}), gold serif headline, Motiva Hub.`,
    tags: [titleTag(cat), 'BookReview', 'ReadingList'].slice(0, 5),
  });
  if (bk.reasonFr) {
    const headFr = `${bk.title} — ${clean(bk.reasonFr)}`;
    pins.push({
      slug: `book-${bk.id}__fr`, lang: 'fr', book: bk.id,
      priority: (FLAGSHIP.has(bk.id) ? 12 : 6) * 10,
      board: 'Chroniques de livres', kicker: 'Chronique · 2026',
      url: `${SITE}/fr/books/?utm_source=pinterest&utm_medium=pin&utm_campaign=pin-book-${bk.id}-fr`,
      headline: trimWords(bk.title, 48), gold: bk.title, sub: trimWords(clean(bk.reasonFr), 120), bg,
      ptitle: trimWords(`${bk.title} — ${catFr} : chronique`, 60),
      pdesc: trimWords(`${clean(bk.descriptionFr)} ${clean(bk.reasonFr)} Pourquoi ce livre mérite sa place dans la liste Motiva Hub.`, 480),
      alt: `Couverture du livre ${bk.title} (${catFr}), titre serif doré, Motiva Hub.`,
      tags: [titleTag(catFr), 'ChroniqueLivre', 'Lecture'].slice(0, 5),
    });
  }
});

// ---- report + guardrails ----
pins.sort((a, b) => b.priority - a.priority);
const byBoard = {};
for (const p of pins) byBoard[p.board] = (byBoard[p.board] || 0) + 1;
const badLen = pins.filter((p) => p.ptitle.length > 60 || p.pdesc.length > 500);
const missingBg = pins.filter((p) => !existsSync(join(ROOT, 'public/images', p.bg)));
const noGold = pins.filter((p) => !p.gold).length;

const out = {
  meta: {
    batch: 'factory-all', generated: new Date().toISOString().slice(0, 10),
    count: pins.length, en: pins.filter((p) => p.lang === 'en' && !p.book).length,
    fr: pins.filter((p) => p.lang === 'fr' && !p.book).length,
    books: pins.filter((p) => p.book).length,
    note: 'Pin factory output. Reuses render-pin.mjs --batch schema. ptitle<=60, pdesc<=500, AEO hook from FAQ question.',
  },
  pins,
};
writeFileSync(join(ROOT, 'docs/pins-queue-all.json'), JSON.stringify(out, null, 2));

console.log('pins total      :', pins.length);
console.log('  articles EN   :', out.meta.en, '| FR:', out.meta.fr);
console.log('  books         :', out.meta.books);
console.log('skipped         :', skipped.length);
console.log('missing bg      :', missingBg.length, missingBg.map((p) => p.slug).join(','));
console.log('over-length     :', badLen.length, badLen.map((p) => p.slug).join(','));
console.log('pins w/o gold   :', noGold);
console.log('--- per board ---');
for (const [b, n] of Object.entries(byBoard).sort((a, z) => z[1] - a[1])) console.log(String(n).padStart(3), b);
console.log('\n✓ wrote docs/pins-queue-all.json');
