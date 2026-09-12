import fs from 'fs';
import path from 'path';
import https from 'https';

const ENV_PATH = path.resolve('/Users/youssefraihane/Documents/the-motivahub.com/.env');
const env = {};
if (fs.existsSync(ENV_PATH)) {
  fs.readFileSync(ENV_PATH, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  });
}
const PEXELS_API_KEY = env.PEXELS_API_KEY || '';

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'Authorization': `Bearer ${PEXELS_API_KEY}` }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error('Failed to parse Pexels response'));
        }
      });
    }).on('error', reject);
  });
}

function pickDistinct(photos, count, seen) {
  const out = [];
  for (const p of photos) {
    if (seen.has(p.id)) continue;
    out.push(p);
    seen.add(p.id);
    if (out.length >= count) break;
  }
  return out;
}

export async function GET({ url }) {
  const query = url.searchParams.get('query') || '';
  const perPage = url.searchParams.get('per_page') || '6';

  if (!PEXELS_API_KEY) {
    return new Response(JSON.stringify({ error: 'PEXELS_API_KEY is not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const page = Math.floor(Math.random() * 10) + 1;
    let data = await httpsGet(`https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`);

    if (data && data.status && data.status >= 400) {
      return new Response(JSON.stringify({ error: data.message || 'Pexels API error' }), {
        status: data.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!data || !Array.isArray(data.photos)) {
      return new Response(JSON.stringify({ photos: [] }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    const seen = new Set();
    const distinct = pickDistinct(data.photos, perPage, seen);

    return new Response(JSON.stringify({ photos: distinct, total_results: data.total_results || distinct.length }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
