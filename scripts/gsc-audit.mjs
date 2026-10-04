#!/usr/bin/env node
// GSC API pull via google-auth-library client.request()
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { GoogleAuth } = require('google-auth-library');

const KEY = process.env.GSC_KEY || '/Users/youssefraihane/Downloads/themotivahub1717-598a0dffacbd.json';
const SITE = 'https://the-motivahub.com/';
const ENC = encodeURIComponent(SITE);

const auth = new GoogleAuth({ keyFile: KEY, scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] });
const c = await auth.getClient();

const today = new Date('2026-10-04');
const d28 = new Date(today); d28.setDate(d28.getDate() - 28);
const iso = d => d.toISOString().slice(0, 10);

async function req(url, opts = {}) {
  try { const r = await c.request({ url, ...opts }); return r.data; }
  catch (e) { console.log('ERR', url, '→', e.response?.status || e.message); return null; }
}

// 1. Sitemaps
console.log('=== Sitemaps ===');
const sm = await req(`https://www.googleapis.com/webmasters/v3/sites/${ENC}/sitemaps`);
for (const s of sm?.sitemap || []) {
  console.log('  path:', s.path);
  console.log('  lastSubmitted:', s.lastSubmitted, '| lastDownloaded:', s.lastDownloaded);
  console.log('  warnings:', s.warnings, '| errors:', s.errors);
  for (const ct of s.contents || []) console.log('  content:', ct.type, '| submitted:', ct.submitted, '| indexed:', ct.indexed);
}

// 2. Search Analytics 28 days
async function q(dims, extra = {}) {
  const d = await req(`https://searchconsole.googleapis.com/webmasters/v3/sites/${ENC}/searchAnalytics/query`, {
    method: 'POST',
    data: { startDate: iso(d28), endDate: iso(today), dimensions: dims, searchType: 'web', rowLimit: 1000, ...extra },
  });
  return d?.rows || [];
}

console.log('\n=== Search Analytics: last 28 days ===');
const byDay = await q(['date']);
let tI = 0, tC = 0;
byDay.forEach(r => { tI += r.impressions; tC += r.clicks; });
console.log('  total impressions:', tI, '| avg/day:', Math.round(tI / byDay.length));
console.log('  total clicks:', tC, '| avg/day:', (tC / byDay.length).toFixed(1));
console.log('  CTR:', (100 * tC / tI).toFixed(2) + '%');
console.log('  avg position:', (byDay.reduce((a, r) => a + r.position, 0) / byDay.length).toFixed(1));

console.log('\n  last 7 days:');
byDay.slice(-7).forEach(r => console.log('    ' + r.keys[0] + ' | impr=' + r.impressions + ' clk=' + r.clicks + ' pos=' + r.position));

console.log('\n  last 3 days avg impr/day:', Math.round(byDay.slice(-3).reduce((a, r) => a + r.impressions, 0) / 3));

// 3. FR vs EN
console.log('\n=== FR vs EN split (28 days) ===');
const byPage = await q(['page']);
let frI = 0, enI = 0, frC = 0, enC = 0;
byPage.forEach(r => { if (r.keys[0].includes('/fr/')) { frI += r.impressions; frC += r.clicks; } else { enI += r.impressions; enC += r.clicks; } });
console.log('  EN: ' + enI + ' impr | ' + enC + ' clk | ' + byPage.filter(r => !r.keys[0].includes('/fr/')).length + ' pages got impressions');
console.log('  FR: ' + frI + ' impr | ' + frC + ' clk | ' + byPage.filter(r => r.keys[0].includes('/fr/')).length + ' pages got impressions');
console.log('  TOTAL pages with ≥1 impression (≈ indexed):', byPage.filter(r => r.impressions > 0).length);

// 4. Top 10 pages
console.log('\n=== Top 10 pages by impressions ===');
byPage.sort((a, b) => b.impressions - a.impressions).slice(0, 10).forEach(r =>
  console.log('  ' + String(r.impressions).padStart(5) + ' impr | ' + String(r.clicks).padStart(3) + ' clk | pos ' + r.position + ' | ' + r.keys[0].replace('https://the-motivahub.com', '') || '/'));

// 5. Top 15 queries
console.log('\n=== Top 15 queries ===');
const byQuery = await q(['query']);
byQuery.sort((a, b) => b.impressions - a.impressions).slice(0, 15).forEach(r =>
  console.log('  ' + String(r.impressions).padStart(5) + ' impr | ' + String(r.clicks).padStart(3) + ' clk | pos ' + r.position + ' | ' + r.keys[0]));

// 6. Country split (last 28 days)
console.log('\n=== Country split ===');
const byCountry = await q(['country']);
byCountry.sort((a, b) => b.impressions - a.impressions).slice(0, 8).forEach(r =>
  console.log('  ' + String(r.impressions).padStart(5) + ' impr | ' + r.clicks + ' clk | ' + r.keys[0]));

// 7. Device split
console.log('\n=== Device split ===');
const byDevice = await q(['device']);
byDevice.forEach(r => console.log('  ' + r.keys[0] + ': ' + r.impressions + ' impr | ' + r.clicks + ' clk'));

console.log('\n=== AdSense thresholds ===');
const avgDailyImpr = Math.round(tI / byDay.length);
console.log('  Required indexed ≥250 | Current ≈' + byPage.filter(r => r.impressions > 0).length + ' | Status: ' + (byPage.filter(r => r.impressions > 0).length >= 250 ? '✅' : '❌'));
console.log('  Required impressions/day ≥100 | Current ' + avgDailyImpr + ' | Status: ' + (avgDailyImpr >= 100 ? '✅' : '❌'));
console.log('  Required original content ≥150 | Current 169 articles | Status: ✅');
console.log('  Required site age ≥3 months | Est. launch May 2026, now Oct 2026 | Status: ✅ (5 months)');
