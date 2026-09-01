// IndexNow instant indexing for Bing + Yandex.
// POST: { urls: ["https://..."] } -> submits to IndexNow API.
// Set INDEXNOW_KEY in Vercel env to enable.

const ENDPOINT = "https://api.indexnow.org/indexnow";

function isValidUrl(u) {
  try {
    const url = new URL(u);
    return url.protocol === "https:" && url.hostname === "the-motivahub.com";
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return res.status(503).json({ error: "INDEXNOW_KEY not configured" });
  }

  let urls = [];
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    urls = Array.isArray(body?.urls) ? body.urls : [];
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  urls = urls.filter(isValidUrl).slice(0, 10000);
  if (urls.length === 0) {
    return res.status(400).json({ error: "No valid urls provided" });
  }

  try {
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "the-motivahub.com",
        key,
        keyLocation: `https://the-motivahub.com/${key}.txt`,
        urlList: urls,
      }),
    });

    const data = await r.text();
    return res.status(r.ok ? 200 : r.status).json({
      submitted: urls.length,
      status: r.status,
      response: data.slice(0, 200),
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}