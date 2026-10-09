#!/usr/bin/env node
// GA4 Pinterest-focused pull: is Pinterest driving traffic? last 28d + 90d
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { GoogleAuth } = require('google-auth-library');
const KEY = '/Users/youssefraihane/Downloads/themotivahub1717-598a0dffacbd.json';
const PROPERTY = 'properties/551052915';
const auth = new GoogleAuth({ keyFile: KEY, scopes: ['https://www.googleapis.com/auth/analytics.readonly'] });
const c = await auth.getClient();
const today = new Date('2026-10-09');
const back = d => { const x = new Date(today); x.setDate(x.getDate() - d); return x.toISOString().slice(0, 10); };
async function run(metrics, dims, days) {
  const url = `https://analyticsdata.googleapis.com/v1beta/${PROPERTY}:runReport`;
  try {
    const r = await c.request({ url, method: 'POST', data: { dateRanges: [{ start_date: back(days), end_date: back(0) }], metrics, dimensions: dims.map(d => ({ name: d })), limit: 50 } });
    return r.data;
  } catch (e) { console.log('ERR', dims, '→', e.response?.status, e.response?.data?.message || e.message); return null; }
}
const M = [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'engagedSessions' }, { name: 'newUsers' }];

for (const days of [28, 90]) {
  console.log(`\n===== Traffic SOURCES (last ${days}d) — look for pinterest =====`);
  const d = await run(M, ['sessionSource'], days);
  (d?.rows || []).forEach(r => console.log('  ' + String(r.metricValues[0].value).padStart(5) + ' sess | ' + String(r.metricValues[1].value).padStart(4) + ' usr | ' + String(r.metricValues[3]?.value ?? '0').padStart(4) + ' out | ' + r.dimensionValues[0].value));
  console.log(`\n===== MEDIUMS (last ${days}d) =====`);
  const m = await run(M, ['sessionMedium'], days);
  (m?.rows || []).forEach(r => console.log('  ' + String(r.metricValues[0].value).padStart(5) + ' sess | ' + String(r.metricValues[1].value).padStart(4) + ' usr | ' + r.dimensionValues[0].value));
}
console.log('\n===== CAMPAIGNS (last 90d) — oct2026_* = Pinterest pins =====');
const camp = await run(M, ['sessionCampaignName'], 90);
if (!camp?.rows?.length) console.log('  (no campaign data — pins not driving tracked traffic yet)');
(camp?.rows || []).forEach(r => console.log('  ' + String(r.metricValues[0].value).padStart(5) + ' sess | ' + String(r.metricValues[1].value).padStart(4) + ' usr | ' + r.dimensionValues[0].value));
console.log('\n===== PINTEREST landing pages (last 90d, source~pinterest) =====');
const url = `https://analyticsdata.googleapis.com/v1beta/${PROPERTY}:runReport`;
try {
  const r = await c.request({ url, method: 'POST', data: { dateRanges: [{ start_date: back(90), end_date: back(0) }], metrics: M, dimensions: [{ name: 'landingPage' }, { name: 'sessionSource' }], dimensionFilter: { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'CONTAINS', value: 'pinterest' } } }, limit: 30 } });
  const rows = r.data.rows || [];
  if (!rows.length) console.log('  (ZERO pinterest sessions in 90d)');
  rows.forEach(x => console.log('  ' + String(x.metricValues[0].value).padStart(5) + ' sess | ' + x.dimensionValues[0].value + '  [' + x.dimensionValues[1].value + ']'));
} catch (e) { console.log('ERR landing →', e.response?.status, e.response?.data?.message || e.message); }
