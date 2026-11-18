/**
 * Full-site audit crawler. Fetches every URL in sitemap-0.xml and records:
 * HTTP status, final URL, meta robots, canonical, title, description, H1 count,
 * word count (visible text), JSON-LD presence, og:image.
 * Read-only: no writes to the site. Output: /tmp/audit_crawl.tsv
 */
import { writeFileSync } from 'node:fs';

const BASE = 'https://the-motivahub.com/';
const Sitemap = BASE + 'sitemap-0.xml';
const CONC = 8;

const urls = (await (await fetch(Sitemap)).text()
  .then(t => t.match(/<loc>([^<]+)<\/loc>/g) || []))
  .map(x => x.replace(/<\/?loc>/g, ''))
  .filter((v, i, a) => a.indexOf(v) === i);

console.log('URLs to crawl:', urls.length);

const strip = (h) => h
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z#0-9]+;/gi, ' ')
  .replace(/\s+/g, ' ').trim();

const grab = (html, re) => { const m = html.match(re); return m ? m[1].trim() : ''; };

let i = 0;
const rows = [];
async function worker() {
  while (i < urls.length) {
    const idx = i++; const u = urls[idx];
    let rec = { url: u, status: 'ERR', final: '', robots: '', canonical: '', title: '', desc: '', h1: 0, words: 0, jsonld: 0, ogimg: '', len: 0 };
    try {
      const res = await fetch(u, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (audit)' } });
      rec.status = res.status; rec.final = res.url;
      const html = await res.text();
      rec.len = html.length;
      rec.robots = grab(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i) || grab(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i);
      rec.canonical = grab(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
      rec.title = grab(html, /<title[^>]*>([\s\S]*?)<\/title>/i).slice(0, 120);
      rec.desc = grab(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
      rec.h1 = (html.match(/<h1[\s>]/gi) || []).length;
      rec.jsonld = (html.match(/application\/ld\+json/gi) || []).length;
      rec.ogimg = grab(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
      rec.words = strip(html).split(' ').filter(Boolean).length;
    } catch (e) { rec.status = 'FETCH_ERR:' + e.name; }
    rows[idx] = rec;
    if ((idx + 1) % 50 === 0) console.log('  ...', idx + 1, 'done');
  }
}
await Promise.all(Array.from({ length: CONC }, worker));

const header = 'status\twords\th1\trobots\tjsonld\turl\tcanonical\ttitle\tdesc\togimg\tfinal\tlen';
const body = rows.map(r => [r.status, r.words, r.h1, r.robots || '-', r.jsonld, r.url, r.canonical, r.title, r.desc, r.ogimg, r.final, r.len].join('\t')).join('\n');
writeFileSync('/tmp/audit_crawl.tsv', header + '\n' + body + '\n');
console.log('\nWrote /tmp/audit_crawl.tsv (' + rows.length + ' rows)');
