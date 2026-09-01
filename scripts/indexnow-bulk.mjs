// Bulk submit all URLs from sitemap to IndexNow.
// Usage: node scripts/indexnow-bulk.mjs

import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP = join(__dirname, "..", "dist", "sitemap-0.xml");

const KEY = process.env.INDEXNOW_KEY;
const HOST = "the-motivahub.com";

if (!KEY) {
  console.error("✗ Set INDEXNOW_KEY env var first");
  process.exit(1);
}

const xml = await readFile(SITEMAP, "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`Found ${urls.length} URLs in sitemap`);

const batches = [];
for (let i = 0; i < urls.length; i += 10000) {
  batches.push(urls.slice(i, i + 10000));
}

let submitted = 0;
for (const batch of batches) {
  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: batch });
  try {
    const r = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json" }, body });
    console.log(`✓ Batch (${batch.length}): ${r.status}`);
    submitted += batch.length;
  } catch (e) {
    console.error(`✗ Batch failed: ${e.message}`);
  }
}

console.log(`✓ Submitted ${submitted} URLs to IndexNow`);