// Manually submit all sitemap URLs to IndexNow (Bing + Yandex).
// Run once after deployment: node scripts/indexnow-bulk.mjs
// Or set INDEXNOW_KEY env var to skip the embedded fallback.

import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP = join(__dirname, "..", "dist", "sitemap-0.xml");
const HOST = "the-motivahub.com";

const KEY = process.env.INDEXNOW_KEY || "eb6a9565c4614708a8f55f09aefa0e67";

const xml = await readFile(SITEMAP, "utf8").catch(() => null);
if (!xml) {
  console.error("✗ dist/sitemap-0.xml not found. Run npm run build first.");
  process.exit(1);
}

const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`Found ${urls.length} URLs in sitemap`);

const batches = [];
for (let i = 0; i < urls.length; i += 10000) {
  batches.push(urls.slice(i, i + 10000));
}

let total = 0;
for (const batch of batches) {
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
    console.log(`✓ Batch (${batch.length}): HTTP ${res.status}`);
    total += batch.length;
  } catch (e) {
    console.error(`✗ Batch failed: ${e.message}`);
  }
}

console.log(`✓ Submitted ${total} URLs to IndexNow`);
console.log(`Key file: https://${HOST}/${KEY}.txt`);