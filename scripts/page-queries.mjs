// Dev-only: top QUERIES for a specific page (searchAnalytics, dimension=query, pageFilter).
// Usage: node scripts/page-queries.mjs <full-page-url> [days]
import { readFileSync, readdirSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { homedir } from 'node:os';

const SITE = 'https://the-motivahub.com/';
const DOWNLOADS = `${homedir()}/Downloads`;
function loadKey() {
  const files = readdirSync(DOWNLOADS).filter((f) => /^themotivahub1717-.*\.json$/.test(f));
  return JSON.parse(readFileSync(`${DOWNLOADS}/${files[0]}`, 'utf8'));
}
const b64u = (buf) => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
async function accessToken() {
  const key = loadKey();
  const now = Math.floor(Date.now() / 1000);
  const header = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64u(JSON.stringify({ iss: key.client_email, scope: 'https://www.googleapis.com/auth/webmasters.readonly', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
  const si = `${header}.${claim}`;
  const sig = createSign('RSA-SHA256').update(si).sign(key.private_key);
  const res = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${si}.${b64u(sig)}` }) });
  const d = await res.json();
  return d.access_token;
}
const page = process.argv[2];
const days = parseInt(process.argv[3] || '90', 10);
const fmt = (d) => d.toISOString().split('T')[0];
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - days);
const token = await accessToken();
const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
  method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    startDate: fmt(start), endDate: fmt(end), dimensions: ['page', 'query'], rowLimit: 25000,
  }),
});
const data = await res.json();
const all = data.rows || [];
// filter client-side: keys = [page, query]
const rows = all.filter((r) => r.keys[0].includes(page)).sort((a, b) => b.impressions - a.impressions).slice(0, 40);
console.log(`Top queries for ${page} (last ${days}d): ${rows.length} (of ${all.length} page×query rows)`);
for (const r of rows) console.log(`  ${String(r.impressions).padStart(5)}i ${String(r.clicks).padStart(3)}c ${String(Math.round(r.position)).padStart(3)}p  ${r.keys[1]}`);
