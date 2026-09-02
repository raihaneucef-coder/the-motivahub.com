// Manual IndexNow submission trigger.
// Visit: /admin/indexnow?urls=/best/books/,/best/focus-books/
// Submits to Bing + Yandex for instant indexing.

export default async function handler(req, res) {
  if (req.method === "HEAD" || req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "demo";
  const token = req.query.token || req.headers["x-admin-token"];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  let rawUrls = req.query.urls;
  if (!rawUrls) {
    return res.status(400).json({
      usage: "GET /admin/indexnow?token=YOUR_TOKEN&urls=/best/books/,/best/focus-books/",
    });
  }

  const list = String(rawUrls).split(",").map((u) => u.trim()).filter(Boolean);
  const fullUrls = list.map((u) => (u.startsWith("http") ? u : `https://the-motivahub.com${u.startsWith("/") ? "" : "/"}${u}`));

  try {
    const r = await fetch("https://the-motivahub.com/api/indexnow.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: fullUrls }),
    });
    const data = await r.json();
    return res.status(200).json({ submitted: fullUrls.length, result: data });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}