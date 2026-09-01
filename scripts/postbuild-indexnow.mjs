// Post-build: notify IndexNow (Bing + Yandex) that pages are fresh.
// Requires INDEXNOW_KEY env var. Safe no-op if unset.

const KEY = process.env.INDEXNOW_KEY;
const HOST = "the-motivahub.com";

if (!KEY) {
  console.log("○ INDEXNOW_KEY not set, skipping auto-submit");
  process.exit(0);
}

const { readFile } = await import("node:fs/promises");
const sitemap = await readFile("dist/sitemap-0.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`Submitting ${urls.length} URLs to IndexNow...`);

const batchSize = 10000;
let submitted = 0;
for (let i = 0; i < urls.length; i += batchSize) {
  const batch = urls.slice(i, i + batchSize);
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: batch,
  });
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    console.log(`  Batch ${i / batchSize + 1}: ${res.status}`);
    submitted += batch.length;
  } catch (e) {
    console.error(`  Batch failed: ${e.message}`);
  }
}

console.log(`✓ Submitted ${submitted} URLs to IndexNow`);