// List pages ranking on Google page 1 (avg position <= 10).
// Usage: node scripts/page1-ranks.mjs [days]
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
const days = parseInt(process.argv[3] || process.argv[2] || '28', 10);
const fmt = (d) => d.toISOString().split('T')[0];
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - days);
const token = await accessToken();

async function run(dims) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ startDate: fmt(start), endDate: fmt(end), dimensions: dims, rowLimit: 25000 }),
  });
  const d = await res.json();
  return d.rows || [];
}

const rows = await run(['page']);
const mine = rows.filter((r) => r.keys[0].startsWith('https://the-motivahub.com'));
const short = (u) => u.replace('https://the-motivahub.com', '').replace(/\/$/, '') || '/';
const buckets = [
  ['PAGE 1 (pos 1-10)', 10.5],
  ['PAGE 2 (pos 11-20)', 20.5],
  ['PAGE 3 (pos 21-30)', 30.5],
];
let prev = 0;
for (const [label, max] of buckets) {
  const set = mine.filter((r) => r.position > prev && r.position <= max).sort((a, b) => a.position - b.position);
  prev = max;
  const solid = set.filter((r) => r.impressions >= 10);
  console.log(`\n=== ${label} — ${set.length} pages (${solid.length} with >=10 imp) ===`);
  for (const r of (label.startsWith('PAGE 1') ? set : solid)) {
    console.log(`${r.position.toFixed(1).padStart(5)}  imp=${String(r.impressions).padStart(5)}  clk=${String(r.clicks).padStart(3)}  ${short(r.keys[0])}`);
  }
}
