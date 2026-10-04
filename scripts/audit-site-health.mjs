#!/usr/bin/env node
// Comprehensive site health audit: sitemap URLs + technical integrity
// Sitemap: single file at /sitemap-0.xml
const sitemap = await fetch('https://the-motivahub.com/sitemap-0.xml').then(r => r.text());
const allUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log('TOTAL sitemap URLs:', allUrls.length);

// Sample 30 URLs across languages
const en = allUrls.filter(u => !u.includes('/fr/'));
const fr = allUrls.filter(u => u.includes('/fr/'));
console.log('EN:', en.length, '| FR:', fr.length);
const sample = [...en.filter((_, i) => i % Math.ceil(en.length / 20) === 0).slice(0, 20),
                ...fr.filter((_, i) => i % Math.ceil(fr.length / 20) === 0).slice(0, 20)];
console.log('sample size:', sample.length);

// HTTP check every sampled URL
let ok = 0, bad = [];
for (const u of sample) {
  const res = await fetch(u, { method: 'HEAD', redirect: 'follow' });
  if (res.status === 200) ok++;
  else bad.push({ u, status: res.status });
}
console.log('HTTP:', ok, 'OK |', bad.length, 'BAD');
if (bad.length) console.log('bad:', bad);

// Check canonical, hreflang, robots meta on 5 pages
const CHECK = ['https://the-motivahub.com/', 'https://the-motivahub.com/journal/', '/fr/', '/contact/', '/fr/contact/'].map(p => p.startsWith('http') ? p : 'https://the-motivahub.com' + p);
for (const u of CHECK) {
  const html = await fetch(u).then(r => r.text());
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m => m[1] + '→' + m[2]);
  const robots = (html.match(/<meta name="robots" content="([^"]+)"/) || [])[1] || 'none';
  const title = (html.match(/<title>([^<]+)<\/title>/) || [])[1]?.slice(0, 60);
  const desc = (html.match(/<meta name="description" content="([^"]+)"/) || [])[1]?.slice(0, 80);
  const schemaCount = (html.match(/application\/ld\+json/g) || []).length;
  console.log('\n[' + u.replace('https://the-motivahub.com', '') + ']');
  console.log('  canonical:', canonical);
  console.log('  hreflangs:', hreflangs.join(' | ') || '(none)');
  console.log('  robots:', robots);
  console.log('  title:', title);
  console.log('  description:', desc);
  console.log('  JSON-LD blocks:', schemaCount);
}

// Security headers on homepage
const home = await fetch('https://the-motivahub.com/');
const hdrs = Object.fromEntries(home.headers);
console.log('\n=== Security headers ===');
for (const k of ['strict-transport-security','x-content-type-options','x-frame-options','referrer-policy','content-security-policy','permissions-policy','x-xss-protection']) {
  console.log(' ', k + ':', hdrs[k] || 'MISSING');
}

// Robots.txt + llms.txt + ads.txt
for (const path of ['/robots.txt', '/llms.txt', '/ads.txt', '/sitemap-index.xml']) {
  const r = await fetch('https://the-motivahub.com' + path);
  console.log(path, '→', r.status);
}
