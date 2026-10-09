#!/usr/bin/env node
// Internal-link audit: count CONTEXTUAL (in-body, excluding header/nav/footer) inbound links per page.
// Pages with 0 contextual inbound = crawl-priority orphans (only reachable via chrome/sitemap).
import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { execSync } from 'node:child_process';

// list all html under dist
const files = execSync('find dist -name "*.html"', { encoding: 'utf8' }).trim().split('\n');

const norm = (p) => {
  if (!p) return null;
  p = p.split('#')[0].split('?')[0];
  if (/^https?:\/\//.test(p)) { try { p = new URL(p).pathname; } catch { return null; } }
  if (!p.startsWith('/')) return null;          // skip mailto/tel/relative-we-don't-resolve
  p = p.replace(/index\.html$/, '');
  if (!p.endsWith('/')) p += '/';               // Astro trailing-slash
  return p;
};
const fileToPath = (f) => norm(f.replace(/^dist/, '')) || '/';

// strip site chrome only -> contextual.
// NOTE: keep <header> because the article header (category label) holds the
// article->topic-hub link; only the site nav/footer are true chrome.
const stripChrome = (html) => html
  .replace(/<nav[\s\S]*?<\/nav>/gi, '')
  .replace(/<footer[\s\S]*?<\/footer>/gi, '');

const inbound = {};        // target -> Set(source pages) with contextual link
const inboundTotal = {};   // target -> Set(source pages) incl chrome (for reference)
const selfHost = new Set();

for (const f of files) {
  const src = fileToPath(f);
  selfHost.add(src);
  const raw = readFileSync(f, 'utf8');
  const ctx = stripChrome(raw);
  const all = raw;
  const grab = (html, store) => {
    const re = /<a[^>]+href=["']([^"']+)["']/gi; let m;
    while ((m = re.exec(html))) {
      const t = norm(m[1]);
      if (t && selfHost.has(t) === false && t !== src) { /* may be not-yet-seen */ }
      if (t && t !== src) { (store[t] ||= new Set()).add(src); }
    }
  };
  grab(ctx, inbound);
  grab(all, inboundTotal);
}

// Build report over known pages (sitemap 438)
const sitemap = readFileSync('/tmp/sitemap_urls.txt', 'utf8').trim().split('\n').map(u => norm(u)).filter(Boolean);
const rows = sitemap.map(p => ({
  path: p,
  ctx: inbound[p]?.size || 0,
  total: inboundTotal[p]?.size || 0,
  fr: p.startsWith('/fr/'),
}));

const orphans = rows.filter(r => r.ctx === 0);
const weak = rows.filter(r => r.ctx >= 1 && r.ctx <= 2);

console.log(`Pages in sitemap: ${sitemap.length} | HTML files: ${files.length}`);
console.log(`0 contextual inbound (ORPHANS): ${orphans.length}  (EN ${orphans.filter(r=>!r.fr).length} / FR ${orphans.filter(r=>r.fr).length})`);
console.log(`1-2 contextual inbound (WEAK): ${weak.length}  (EN ${weak.filter(r=>!r.fr).length} / FR ${weak.filter(r=>r.fr).length})`);

console.log('\n=== THE 4 NEAR-TOP PAGES (pos 5-9) — inbound links ===');
for (const p of ['/fr/journal/regles-goggins-mental/','/fr/journal/process-vs-outcome/','/fr/guides/atomic-habits-ultimate-guide/','/']) {
  const r = rows.find(x => x.path === p);
  console.log(`  ${p}  -> contextual=${r?.ctx ?? '?'} total=${r?.total ?? '?'}`);
}
console.log('\n=== RECENTLY-FIRED FR BATCH (stuck/discovered) — inbound links ===');
for (const p of ['/fr/memento-mori/','/fr/quotes/','/fr/psychology/','/fr/credits/','/fr/terms/','/fr/contact/','/fr/affiliate-disclosure/']) {
  const r = rows.find(x => x.path === p);
  console.log(`  ${p}  -> contextual=${r?.ctx ?? '?'} total=${r?.total ?? '?'}`);
}

console.log('\n=== TOP 15 ORPHANS by crawl value (journal/guides/best first) ===');
const prio = orphans.filter(r => /\/(journal|guides|best|topics)\//.test(r.path));
prio.slice(0, 40).forEach(r => console.log(`  ctx=0 total=${String(r.total).padStart(2)}  ${r.path}`));
console.log(`  ... (${prio.length} orphan pages in journal/guides/best/topics)`);

// dump full CSV for planning
const csv = rows.sort((a,b)=>a.ctx-b.ctx).map(r => `${r.path}\t${r.ctx}\t${r.total}`).join('\n');
readFileSync; // noop
import('node:fs').then(fs => fs.writeFileSync('/tmp/inlink_audit.tsv', csv));
console.log('\nFull dump -> /tmp/inlink_audit.tsv (path<TAB>contextual<TAB>total)');
