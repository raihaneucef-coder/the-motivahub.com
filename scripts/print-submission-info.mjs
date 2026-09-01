// Generate a single-use setup script that creates:
// 1. robots.txt confirmation
// 2. sitemap check
// 3. search-engine submission URLs

import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");

console.log("\n=== SUBMISSION URLS ===\n");
console.log("Google Search Console:");
console.log("  https://search.google.com/search-console");
console.log("  Sitemap URL: https://the-motivahub.com/sitemap-index.xml\n");

console.log("Bing Webmaster Tools:");
console.log("  https://www.bing.com/webmasters");
console.log("  Sitemap URL: https://the-motivahub.com/sitemap-index.xml\n");

console.log("Yandex Webmaster:");
console.log("  https://webmaster.yandex.com");
console.log("  Sitemap URL: https://the-motivahub.com/sitemap-index.xml\n");

console.log("IndexNow (instant):");
console.log("  https://www.bing.com/indexnow");
console.log("  Key file: https://the-motivahub.com/<your-key>.txt\n");

console.log("=== URLS TO MANUALLY REQUEST INDEXING ===\n");
const sitemap = await readFile(join(DIST, "sitemap-0.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`Top 20 priority URLs to submit manually:`);
const priorityUrls = [
  "https://the-motivahub.com/",
  "https://the-motivahub.com/best/books/",
  "https://the-motivahub.com/best/focus-books/",
  "https://the-motivahub.com/best/habit-books/",
  "https://the-motivahub.com/best/stoicism-books/",
  "https://the-motivahub.com/journal/",
  "https://the-motivahub.com/books/",
  "https://the-motivahub.com/author/youssef-raihane/",
];
priorityUrls.forEach((u) => console.log(`  ${u}`));
console.log(`\n... and ${urls.length - priorityUrls.length} more in sitemap-0.xml`);