// scripts/pin-factory/build-pins.mjs
// Reads the batch plan JSON + a style-map, generates HTML per pin, renders PNGs.
// SAFE: writes only to scripts/pin-factory/out/ and scripts/pin-factory/html/.
// Does NOT touch Pinterest, does NOT modify the source JSON.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

// ---------- Style map (auto-selection by pin slug) ----------
// Big-stat style: for articles with a strong numeric hook
const BIG_STAT = {
  'how-to-read-30-books-a-year':   { number: '30',  label: 'BOOKS / YEAR' },
  'i-tested-12-morning-routines':  { number: '12',  label: 'ROUTINES TESTED' },
  'regle-50-30-20':                { number: '50/30/20', label: 'BUDGET RULE' },
  'the-morning-athlete':           { number: '5AM', label: 'STILL WINS' },
  'deep-work-ritual':              { number: '3h',  label: 'DEEP WORK' },
  'slow-productivity-30-day-test': { number: '30',  label: 'DAY TEST' },
  '5-minute-morning-habit':        { number: '5\u2032', label: 'MINUTE FIX' },
  'nervous-system-reset-focus':    { number: '5\u2032', label: 'RESET' },
};

// Headline-first style for narrative articles (default).
// Headline is split into pre / italic-accent / post segments for editorial flair.
// Manual curation for maximum readability on thumbnails.
const HEADLINE_SPLIT = {
  'atomic-habits-review': { pre: 'Atomic Habits ', accent: 'changed my mornings', post: ' — but not the way you think' },
  'cant-hurt-me-review': { pre: "Can't Hurt Me: ", accent: '5 honest lessons', post: ' from 3 reads (not what you expect)' },
  'lire-divertissement': { pre: 'Lire pour plaisir : ', accent: 'les romans', post: " rendront votre esprit plus fort" },
  'fond-urgence': { pre: 'Emergency fund: ', accent: 'your real foundation', post: ' (before any investing)' },
  'regle-50-30-20': { pre: 'The 50/30/20 rule: ', accent: 'the simplest budget', post: ' that actually works' },
  'debt-is-a-story': { pre: 'Debt is a story ', accent: 'you can rewrite', post: " — here's how" },
  'earn-keep-grow': { pre: 'Earn, Keep, Grow: ', accent: 'the 3 jobs', post: ' of money nobody taught you' },
  'investir-debutant': { pre: 'Investir pour débutants : ', accent: 'construire votre patrimoine', post: " aujourd'hui" },
  'morning-vs-night': { pre: 'Morning vs Night: ', accent: 'which discipline', post: ' actually sticks?' },
  'habit-stacking-routine': { pre: 'Habit Stacking: ', accent: 'the easiest way', post: ' to build new routines' },
  'batching-productivite': { pre: 'Batching : ', accent: "l'arme secrète", post: ' des personnes ultra productives' },
  'focus-monde-distractions': { pre: 'How to maintain focus ', accent: 'in a world', post: ' designed to distract you' },
};

// Sub-hook (one punchy sentence under headline). Manual per pin for precision.
const SUB_HOOK = {
  'atomic-habits-review': "4 reads in 18 months. Here's what actually stuck after the hype wore off.",
  'cant-hurt-me-review': 'The 40% rule works. The accountability mirror is genius. The rest is more complicated.',
  'lire-divertissement': "Pas une perte de temps — une simulation sociale pour votre cerveau.",
  'how-to-read-30-books-a-year': '60 min split across morning, lunch and night = 1 book per week.',
  'fond-urgence': '3-6 months of expenses. Nothing else. And it changes everything.',
  'regle-50-30-20': 'Forget $1.27 lattes. Set it up in 15 minutes and never think about it again.',
  'debt-is-a-story': 'The reason most debt plans fail is not math. It is shame.',
  'earn-keep-grow': 'Most people only know one of the three. That is why their money leaks.',
  'investir-debutant': 'Vous navez pas besoin dêtre riche pour investir.ETF, PEA, intérêt composé : le guide.',
  'morning-vs-night': 'Chronotype matters more than time of day. Here is the deciding framework.',
  'i-tested-12-morning-routines': '11 broke within 3 weeks. One survived. It is not the winner you expect.',
  'the-morning-athlete': 'Not willpower. A system: the night job, the first 20 minutes, the identity.',
  'habit-stacking-routine': 'Formula: After [current habit], I will [new habit]. That is the whole trick.',
  'deep-work-ritual': 'Twelve tries. Eleven failed. The 12th ritual is the one I still use two years later.',
  'batching-productivite': 'Changer de tâche toutes les 10 minutes détruit votre QI efficace.',
  'slow-productivity-30-day-test': 'Output went up. Phone time dropped 62%. But two things broke.',
  'focus-monde-distractions': 'Your phone is not the problem. Your environment is. Fix the room, fix the mind.',
  'nervous-system-reset-focus': 'The reason you cannot focus is nervous system overload. Not laziness.',
};

// Tag/eyebrow chip (short category label at top of pin)
const TAG = {
  'atomic-habits-review': 'Book Review · 2026',
  'cant-hurt-me-review': 'Book Review · 2026',
  'lire-divertissement': 'Lecture · French',
  'how-to-read-30-books-a-year': 'Reading System · Test',
  'fond-urgence': 'Money Basics · Personal Finance',
  'regle-50-30-20': 'Money Basics · Simple Budget',
  'debt-is-a-story': 'Money Mindset · Psychology',
  'earn-keep-grow': 'Money Framework · Beginner',
  'investir-debutant': 'Investissement · Français',
  'morning-vs-night': 'Morning Routine · Chronotype',
  'i-tested-12-morning-routines': 'Morning Routine · Real Test',
  'the-morning-athlete': '5 AM · Athletic Discipline',
  'habit-stacking-routine': 'Habit System · Simple',
  'deep-work-ritual': 'Deep Work · Ritual',
  'batching-productivite': 'Productivité · Français',
  'slow-productivity-30-day-test': 'Productivity · 30 Day Test',
  'focus-monde-distractions': 'Focus · Environment Design',
  'nervous-system-reset-focus': 'Focus · Nervous System',
  '5-minute-morning-habit': 'Morning Routine · Real Test',
};

// Image path per slug (must exist in public/images/blog/)
const IMAGE_PATH = {
  'atomic-habits-review': 'atomic-habits-review-2-md.jpg',
  'cant-hurt-me-review': 'cant-hurt-me-review-md.jpg',
  'lire-divertissement': 'lire-divertissement-2.jpg',
  'how-to-read-30-books-a-year': 'how-to-read-30-books-a-year-2.jpg',
  'fond-urgence': 'fond-urgence-md.jpg',
  'regle-50-30-20': 'regle-50-30-20-2-md.jpg',
  'debt-is-a-story': 'debt-is-a-story-md.jpg',
  'earn-keep-grow': 'earn-keep-grow-md.jpg',
  'investir-debutant': 'investir-debutant-md.jpg',
  'morning-vs-night': 'morning-vs-night-1-md.jpg',
  'i-tested-12-morning-routines': 'i-tested-12-morning-routines-2.jpg',
  'the-morning-athlete': 'the-morning-athlete-2.jpg',
  '5-minute-morning-habit': '5-minute-morning-habit-2.jpg',
  'habit-stacking-routine': 'habit-stacking-routine-2-md.jpg',
  'deep-work-ritual': 'deep-work-ritual-1-md.jpg',
  'batching-productivite': 'batching-productivite-md.jpg',
  'focus-monde-distractions': 'focus-monde-distractions-2-md.jpg',
  'slow-productivity-30-day-test': 'slow-productivity-30-day-test-1-md.jpg',
  'nervous-system-reset-focus': 'nervous-system-reset-focus-2.jpg',
};

// ---------- Base CSS (identical palette to samples 1 & 2) ----------
// HTML lives at scripts/pin-factory/html/*.png → 3 levels up to reach project root.
const FONT_REL = '../../../public/fonts';
const BASE_CSS = `
  @font-face{font-family:'Fraunces';src:url('${FONT_REL}/fraunces-normal-latin-63f165.woff2')format('woff2');font-weight:400 900;}
  @font-face{font-family:'Fraunces';src:url('${FONT_REL}/fraunces-italic-latin-de4b58.woff2')format('woff2');font-style:italic;}
  @font-face{font-family:'Inter';src:url('${FONT_REL}/inter-normal-latin-1ab1ad.woff2')format('woff2');font-weight:400 700;}
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{width:1000px;height:1500px;overflow:hidden;background:#0b0b0d;}
  .pin{position:relative;width:1000px;height:1500px;background:#0b0b0d;overflow:hidden;}
  .photo{position:absolute;top:0;left:0;width:1000px;height:850px;background-size:cover;background-position:center;filter:brightness(.72) contrast(1.05);}
  .photo-fade{position:absolute;top:400px;left:0;width:1000px;height:450px;background:linear-gradient(to bottom,transparent 0%,#0b0b0d 100%);}
  .tag{position:absolute;top:40px;left:40px;color:#d4b377;font-family:'Inter',sans-serif;font-size:16px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;background:rgba(11,11,13,.65);padding:12px 22px;border:1px solid rgba(212,179,119,.4);}
  .headline{position:absolute;top:880px;left:60px;right:60px;color:#f5f1e8;font-family:'Fraunces',serif;font-weight:500;font-size:72px;line-height:1.1;letter-spacing:-.02em;}
  .headline .it{font-style:italic;font-weight:400;color:#e5c890;}
  .bignum{position:absolute;top:760px;left:60px;color:#d4b377;font-family:'Fraunces',serif;font-style:italic;font-weight:400;font-size:200px;line-height:1;letter-spacing:-.03em;}
  .bignum-label{position:absolute;top:970px;left:60px;color:#d4b377;font-family:'Inter',sans-serif;font-weight:700;font-size:16px;letter-spacing:.3em;text-transform:uppercase;}
  .headline.with-bignum{left:280px;font-size:56px;top:900px;}
  .sub{position:absolute;top:1250px;left:60px;right:60px;color:rgba(245,241,232,.75);font-family:'Inter',sans-serif;font-weight:400;font-size:28px;line-height:1.4;}
  .divider{position:absolute;top:1350px;left:60px;width:100px;height:2px;background:#d4b377;}
  .brand{position:absolute;top:1375px;left:60px;color:#d4b377;font-family:'Fraunces',serif;font-weight:600;font-size:24px;letter-spacing:.15em;text-transform:uppercase;}
  .url{position:absolute;top:1375px;right:60px;color:rgba(245,241,232,.5);font-family:'Inter',sans-serif;font-weight:500;font-size:22px;letter-spacing:.05em;}
  .accent{position:absolute;bottom:0;left:0;width:1000px;height:10px;background:linear-gradient(to right,#d4b377 0%,rgba(212,179,119,.3) 100%);}
`;

// ---------- Build HTML for a pin ----------
function buildHtml(pin) {
  const slug = pin.slug;
  const img = IMAGE_PATH[slug];
  if (!img) throw new Error(`No image mapping for ${slug}`);
  const imgPath = path.join(root, 'public/images/blog', img);
  if (!fs.existsSync(imgPath)) throw new Error(`Image missing: ${imgPath}`);

  const tag = TAG[slug] || 'Motiva Hub';
  const sub = SUB_HOOK[slug] || '';
  const split = HEADLINE_SPLIT[slug];
  const bigStat = BIG_STAT[slug];

  if (!split && !bigStat) throw new Error(`No style data for ${slug}`);

  const imgDataUri = 'file://' + imgPath;

  let headlineHtml;
  if (bigStat && !split) {
    // Only bigstat, no pre-defined split — build from title
    headlineHtml = escapeHtml(pin.title);
  } else if (split) {
    headlineHtml = `${escapeHtml(split.pre)}<span class="it">${escapeHtml(split.accent)}</span>${escapeHtml(split.post)}`;
  } else {
    headlineHtml = escapeHtml(pin.title);
  }

  const bigNumberBlock = bigStat
    ? `<div class="bignum">${escapeHtml(bigStat.number)}</div><div class="bignum-label">${escapeHtml(bigStat.label)}</div>`
    : '';
  const headlineClass = bigStat ? 'headline with-bignum' : 'headline';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(pin.title)}</title><style>${BASE_CSS}</style></head><body><div class="pin"><div class="photo" style="background-image:url('${imgDataUri}')"></div><div class="photo-fade"></div><div class="tag">${escapeHtml(tag)}</div>${bigNumberBlock}<div class="${headlineClass}">${headlineHtml}</div><div class="sub">${escapeHtml(sub)}</div><div class="divider"></div><div class="brand">Motiva Hub</div><div class="url">the-motivahub.com</div><div class="accent"></div></div></body></html>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ---------- Main ----------
const planPath = path.join(root, 'docs/pinterest-batch-empty-boards-oct2026.json');
const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));

const htmlDir = path.join(__dirname, 'html');
const outDir = path.join(__dirname, 'out');
fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

const allPins = [];
for (const boardKey of Object.keys(plan.boards)) {
  const board = plan.boards[boardKey];
  for (const pin of board.pins) {
    // Skip meditations (article doesn't exist)
    if (pin.slug === 'meditations-marcus-aurelius') {
      console.log(`⊘ SKIPPED (missing article): ${pin.slug}`);
      continue;
    }
    if (!IMAGE_PATH[pin.slug]) {
      console.log(`⚠ NO IMAGE MAPPING: ${pin.slug}`);
      continue;
    }
    allPins.push({ ...pin, board: boardKey });
  }
}

console.log(`Building ${allPins.length} pins...`);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1000, height: 1500 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

const results = [];
for (const pin of allPins) {
  const html = buildHtml(pin);
  const htmlFile = path.join(htmlDir, `${pin.slug}.html`);
  const pngFile = path.join(outDir, `pin-${pin.slug}.png`);
  fs.writeFileSync(htmlFile, html);
  await page.goto('file://' + htmlFile);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: pngFile, type: 'png', clip: { x: 0, y: 0, width: 1000, height: 1500 } });
  const size = fs.statSync(pngFile).size;
  results.push({ slug: pin.slug, png: path.relative(root, pngFile), kb: Math.round(size/1024) });
  console.log(`  ✓ ${pin.slug} → ${Math.round(size/1024)}KB`);
}
await browser.close();

// Write build report
fs.writeFileSync(path.join(outDir, 'build-report.json'), JSON.stringify({
  built: results.length,
  timestamp: new Date().toISOString(),
  pins: results,
}, null, 2));
console.log(`\n✓ Built ${results.length} pin PNGs at 1000x1500 in ${path.relative(root, outDir)}/`);
