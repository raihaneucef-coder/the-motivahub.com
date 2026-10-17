// Daily impressions/clicks/position (last N days) — for the AdSense 100-imp/day gate.
// Usage: node scripts/gsc-daily.mjs [days]
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
const days = parseInt(process.argv[2] || '14', 10);
const lag = parseInt(process.argv[3] || '2', 10); // GSC data lags ~2 days; pass 1 to try fresher
const fmt = (d) => d.toISOString().split('T')[0];
const end = new Date(); end.setDate(end.getDate() - lag);
const start = new Date(end); start.setDate(start.getDate() - days);
const token = await accessToken();
const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ startDate: fmt(start), endDate: fmt(end), dimensions: ['date'], rowLimit: 25000 }),
});
const d = await res.json();
for (const r of d.rows || []) {
  console.log(`${r.keys[0]}  imp=${String(r.impressions).padStart(4)}  clk=${String(r.clicks).padStart(2)}  pos=${r.position.toFixed(1)}`);
}
