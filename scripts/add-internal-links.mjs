// Adds contextual internal links to EN .md body + FR articles-fr.json (one paragraph at a time).
// Data-driven and strict: throws if the anchor text is not found in the exact paragraph.
import { readFileSync, writeFileSync } from 'node:fs';
const dir = 'src/content/blog';
const FRJSON = 'public/i18n/articles-fr.json';
const frObj = JSON.parse(readFileSync(FRJSON, 'utf8'));

const SPEC = JSON.parse(readFileSync(process.argv[2], 'utf8'));

function patchMd(slug, p, anchor, href) {
  const file = `${dir}/${slug}.md`;
  let raw = readFileSync(file, 'utf8');
  const re = new RegExp(`(<div data-i18n-html="article_${slug}_${p}">)([\\s\\S]*?)(</div>)`);
  const m = raw.match(re);
  if (!m) throw new Error(`EN div not found: ${slug} ${p}`);
  if (m[2].includes(`<a href="${href}">${anchor}</a>`)) return href; // idempotent: already linked
  if (!m[2].includes(anchor)) throw new Error(`EN anchor missing in ${slug} ${p} :: "${anchor}"`);
  const seg = m[2].replace(anchor, `<a href="${href}">${anchor}</a>`);
  raw = raw.replace(re, m[1] + seg + m[3]);
  writeFileSync(file, raw);
  return href;
}
function patchFr(slug, p, anchor, href) {
  const key = `article_${slug}_${p}`;
  if (!(key in frObj)) throw new Error(`FR key missing: ${key}`);
  if (frObj[key].includes(`<a href="${href}">${anchor}</a>`)) return href; // idempotent: already linked
  if (!frObj[key].includes(anchor)) throw new Error(`FR anchor missing in ${key} :: "${anchor}"`);
  frObj[key] = frObj[key].replace(anchor, `<a href="${href}">${anchor}</a>`);
  return href;
}

const hrefs = [];
for (const art of SPEC) {
  for (const L of art.links) {
    hrefs.push(patchMd(art.slug, L.p, L.en, `/journal/${L.t}/`));
    hrefs.push(patchFr(art.slug, L.p, L.fr, `/fr/journal/${L.t}/`));
  }
}
writeFileSync(FRJSON, JSON.stringify(frObj, null, 2) + '\n');
console.log(`OK: patched ${SPEC.length} articles, ${hrefs.length} hrefs (EN+FR).`);
console.log([...new Set(hrefs)].sort().join('\n'));
