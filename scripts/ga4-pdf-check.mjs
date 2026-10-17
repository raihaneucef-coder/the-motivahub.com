// One-off: did anyone hit the PDF / guide pages recently?
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { GoogleAuth } = require('google-auth-library');
const KEY = '/Users/youssefraihane/Downloads/themotivahub1717-598a0dffacbd.json';
const PROPERTY = 'properties/551052915';
const auth = new GoogleAuth({ keyFile: KEY, scopes: ['https://www.googleapis.com/auth/analytics.readonly'] });
const c = await auth.getClient();
const fmt = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 1);
const start = new Date(end); start.setDate(start.getDate() - 13);
const M = [{ name: 'screenPageViews' }, { name: 'totalUsers' }];
async function report(extra = {}) {
  const r = await c.request({ url: `https://analyticsdata.googleapis.com/v1beta/${PROPERTY}:runReport`, method: 'POST', data: { dateRanges: [{ start_date: fmt(start), end_date: fmt(end) }], metrics: M, dimensions: [{ name: 'pagePath' }], limit: 50, ...extra } });
  return r.data.rows || [];
}
console.log('=== pages containing "home-athlete" or ".pdf" (last 14d) ===');
const all0 = await report();
const rows = all0.filter(r => /home-athlete|\.pdf/.test(r.dimensionValues[0].value));
if (!rows.length) console.log('  (zero hits)');
rows.forEach(r => console.log(`  ${r.metricValues[0].value} views | ${r.metricValues[1].value} users | ${r.dimensionValues[0].value}`));
console.log('\n=== ALL top pages last 14d ===');
all0.forEach(r => console.log(`  ${r.metricValues[0].value} views | ${r.metricValues[1].value} users | ${r.dimensionValues[0].value}`));
