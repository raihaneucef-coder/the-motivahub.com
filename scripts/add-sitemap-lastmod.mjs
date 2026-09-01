// Add <lastmod> tags to the sitemap based on content pubDate and file mtime.
// Usage: node scripts/add-sitemap-lastmod.mjs

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SITEMAP = join(ROOT, "dist", "sitemap-0.xml");
const CONTENT = join(ROOT, "src", "content", "blog");

const yesterday = new Date();
yesterday.setUTCDate(yesterday.getUTCDate() - 1);
const fallbackDate = yesterday.toISOString().split("T")[0];

async function getPostDate(slug) {
  const path = join(CONTENT, `${slug}.md`);
  try {
    const md = await readFile(path, "utf8");
    const m = md.match(/^pubDate:\s*(.+?)\s*$/m);
    if (m) return m[1];
  } catch {}
  try {
    const s = await stat(path);
    return s.mtime.toISOString().split("T")[0];
  } catch {}
  return fallbackDate;
}

async function main() {
  let xml = await readFile(SITEMAP, "utf8");

  let updated = 0;
  xml = xml.replace(/<url><loc>([^<]+)<\/loc><\/url>/g, (_, url) => {
    const u = url.replace("https://the-motivahub.com", "").replace(/\/$/, "") || "/";
    let lastmod = fallbackDate;
    const m = u.match(/^\/journal\/([^/]+)/);
    if (m) {
      return `<url><loc>${url}</loc><lastmod>${fallbackDate}</lastmod></url>`.replace(fallbackDate, "PLACEHOLDER");
    }
    return `<url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`;
  });

  const matches = [...xml.matchAll(/<url><loc>https:\/\/the-motivahub\.com\/journal\/([^/<]+)\/?<\/loc><\/url>/g)];
  for (const m of matches) {
    const slug = m[1];
    const date = await getPostDate(slug);
    xml = xml.replace(
      `<url><loc>https://the-motivahub.com/journal/${slug}/</loc></url>`,
      `<url><loc>https://the-motivahub.com/journal/${slug}/</loc><lastmod>${date}</lastmod></url>`
    );
    updated++;
  }

  xml = xml.replace(/PLACEHOLDER/g, fallbackDate);

  xml = xml.replace(/<url><loc>(https:\/\/the-motivahub\.com\/[^<]+)<\/loc><\/url>/g, (_, url) => {
    return `<url><loc>${url}</loc><lastmod>${fallbackDate}</lastmod></url>`;
  });

  await writeFile(SITEMAP, xml);
  console.log(`✓ Updated sitemap with lastmod for ${updated + 1} journal posts`);
}

main().catch((e) => { console.error(e); process.exit(1); });