/**
 * Dev-only Google Search Console helper (service-account JWT via node crypto).
 * No external deps. Reads the first ~/Downloads/themotivahub1717-*.json key.
 *
 * Usage:
 *   node scripts/gsc-check.mjs sitemaps            # list sitemaps + coverage
 *   node scripts/gsc-check.mjs inspect <url>       # URL inspection (coverageState)
 *   node scripts/gsc-check.mjs queries [days]      # top pages by impressions
 */
import { readFileSync, readdirSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { homedir } from 'node:os';

const SITE = process.env.GSC_SITE || 'https://the-motivahub.com/';
const DOWNLOADS = `${homedir()}/Downloads`;

function loadKey() {
  const files = readdirSync(DOWNLOADS).filter((f) => /^themotivahub1717-.*\.json$/.test(f));
  if (!files.length) throw new Error('No service-account key found in ~/Downloads');
  return JSON.parse(readFileSync(`${DOWNLOADS}/${files[0]}`, 'utf8'));
}

const b64u = (buf) => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function accessToken() {
  const key = loadKey();
  const now = Math.floor(Date.now() / 1000);
  const header = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64u(JSON.stringify({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const signingInput = `${header}.${claim}`;
  const signature = createSign('RSA-SHA256').update(signingInput).sign(key.private_key);
  const jwt = `${signingInput}.${b64u(signature)}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('token error: ' + JSON.stringify(data));
  return data.access_token;
}

async function api(path, token, opts = {}) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}${path}`, {
    ...opts, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(opts.headers || {}) },
  });
  return res.json();
}

const [cmd, arg] = process.argv.slice(2);
const token = await accessToken();

if (cmd === 'sitemaps') {
  const list = await api('/sitemaps', token);
  console.log('Sitemaps for', SITE);
  for (const s of list.sitemap || []) {
    console.log(`  ${s.path}`);
    console.log(`    type=${s.type} submitted=${s.lastSubmitted} downloaded=${s.lastDownloaded} indexed=${s.indexed} notIndexed=${s.notIndexed} warnings=${s.numWarningsWithPage} errors=${s.numErrorsWithSite}`);
  }
} else if (cmd === 'coverage') {
  // Inspect a batch of URLs (newline list in argv) with a concurrency pool; tally + dump per-URL.
  const urls = (arg || '').trim().split('\n').filter(Boolean);
  const CONC = Number(process.env.CONC || 6);
  const tally = {}; const lines = [];
  let i = 0;
  async function inspect(u) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
          method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ inspectionUrl: u, siteUrl: SITE, languageCode: 'en-US' }),
        });
        const data = await res.json();
        const r = data?.inspectionResult?.indexStatusResult;
        if (r) return { st: r.coverageState || 'NO_DATA', verdict: r.verdict, lastCrawl: r.lastCrawlTime || '', canonical: r.googleCanonical || r.userCanonical || '' };
        if (String(data?.error?.message || '').includes('rate')) { await new Promise((s) => setTimeout(s, 1500 * (attempt + 1))); continue; }
      } catch { await new Promise((s) => setTimeout(s, 800)); }
    }
    return { st: 'ERROR', verdict: '', lastCrawl: '', canonical: '' };
  }
  async function worker() {
    while (i < urls.length) {
      const idx = i++; const u = urls[idx];
      const { st, verdict, lastCrawl, canonical } = await inspect(u);
      tally[st] = (tally[st] || 0) + 1;
      lines.push(`${st}\t${verdict}\t${lastCrawl}\t${canonical}\t${u}`);
      process.stderr.write('.');
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  const { writeFileSync } = await import('node:fs');
  writeFileSync('/tmp/coverage_all.tsv', lines.join('\n') + '\n');
  console.log(`\n=== coverage tally (${urls.length} URLs) ===`);
  for (const [k, v] of Object.entries(tally).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(4)}  ${k}`);
} else if (cmd === 'inspect') {
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inspectionUrl: arg, siteUrl: SITE, languageCode: 'en-US' }),
  });
  const data = await res.json();
  const r = data?.inspectionResult?.indexStatusResult;
  if (!r) { console.log('raw:', JSON.stringify(data).slice(0, 400)); }
  else console.log(JSON.stringify({ url: arg, coverageState: r.coverageState, verdict: r.verdict, indexability: r.indexability, lastCrawlTime: r.lastCrawlTime, pageFetchState: r.pageFetchState, googleCanonical: r.googleCanonical, userCanonical: r.userCanonical }, null, 2));
} else if (cmd === 'queries') {
  const days = Number(arg || 28);
  const end = new Date(); const start = new Date(Date.now() - days * 86400e3);
  const fmt = (d) => d.toISOString().slice(0, 10);
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ startDate: fmt(start), endDate: fmt(end), dimensions: ['page'], rowLimit: 250 }),
  });
  const data = await res.json();
  const rows = data.rows || [];
  console.log(`Pages with impressions (last ${days}d): ${rows.length}`);
  for (const r of rows.slice(0, 40)) console.log(`  ${String(r.clicks).padStart(4)}c ${String(r.impressions).padStart(6)}i ${String(Math.round(r.position)).padStart(3)}p  ${r.keys[0]}`);
} else {
  console.log('commands: sitemaps | inspect <url> | queries [days]');
}
