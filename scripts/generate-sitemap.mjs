// Custom sitemap generator with per-page lastmod from content pubDate.
// Replaces @astrojs/sitemap output with a richer XML.
// Usage: node scripts/generate-sitemap.mjs

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BLOG_DIR = join(ROOT, "src", "content", "blog");
const DIST = join(ROOT, "dist");

const SITE = "https://the-motivahub.com";

const PRIORITY = {
  homepage: 1.0,
  best_of: 0.9,
  bookstand: 0.9,
  journal_index: 0.9,
  topic: 0.8,
  author: 0.7,
  article: 0.7,
  static: 0.6,
  auth: 0.2,
};

const STATIC_PAGES = [
  { path: "/", priority: PRIORITY.homepage, changefreq: "daily" },
  { path: "/about/", priority: PRIORITY.static, changefreq: "monthly" },
  { path: "/books/", priority: PRIORITY.bookstand, changefreq: "weekly" },
  { path: "/quotes/", priority: PRIORITY.static, changefreq: "weekly" },
  { path: "/podcast/", priority: PRIORITY.static, changefreq: "weekly" },
  { path: "/topics/", priority: PRIORITY.static, changefreq: "weekly" },
  { path: "/journal/", priority: PRIORITY.journal_index, changefreq: "daily" },
  { path: "/contact/", priority: PRIORITY.static, changefreq: "monthly" },
  { path: "/privacy/", priority: PRIORITY.static, changefreq: "yearly" },
  { path: "/terms/", priority: PRIORITY.static, changefreq: "yearly" },
  { path: "/affiliate-disclosure/", priority: PRIORITY.static, changefreq: "yearly" },
  { path: "/credits/", priority: PRIORITY.static, changefreq: "yearly" },
  { path: "/author/youssef-raihane/", priority: PRIORITY.author, changefreq: "monthly" },
  { path: "/best/books/", priority: PRIORITY.best_of, changefreq: "weekly" },
  { path: "/best/focus-books/", priority: PRIORITY.best_of, changefreq: "weekly" },
  { path: "/best/habit-books/", priority: PRIORITY.best_of, changefreq: "weekly" },
  { path: "/best/stoicism-books/", priority: PRIORITY.best_of, changefreq: "weekly" },
  { path: "/tracker/", priority: PRIORITY.static, changefreq: "monthly" },
  { path: "/memento-mori/", priority: PRIORITY.static, changefreq: "monthly" },
  { path: "/psychology/", priority: PRIORITY.static, changefreq: "monthly" },
  { path: "/objectives/", priority: PRIORITY.static, changefreq: "monthly" },
  { path: "/30-days-discipline/", priority: PRIORITY.static, changefreq: "monthly" },
  { path: "/bio/", priority: PRIORITY.static, changefreq: "monthly" },
  { path: "/login/", priority: PRIORITY.auth, changefreq: "yearly" },
  { path: "/register/", priority: PRIORITY.auth, changefreq: "yearly" },
  { path: "/forgot-password/", priority: PRIORITY.auth, changefreq: "yearly" },
  { path: "/reset-password/", priority: PRIORITY.auth, changefreq: "yearly" },
];

async function getPostLastmod(slug) {
  try {
    const md = await readFile(join(BLOG_DIR, `${slug}.md`), "utf8");
    const m = md.match(/^pubDate:\s*(.+?)\s*$/m);
    if (m) return new Date(m[1]).toISOString().split("T")[0];
  } catch {}
  return new Date().toISOString().split("T")[0];
}

async function main() {
  const blogFiles = (await readdir(BLOG_DIR, { withFileTypes: true }))
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name.replace(/\.md$/, ""));

  const urls = [];

  for (const p of STATIC_PAGES) {
    urls.push({
      loc: `${SITE}${p.path}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: p.changefreq,
      priority: p.priority,
    });
  }

  for (const slug of blogFiles) {
    const lastmod = await getPostLastmod(slug);
    urls.push({
      loc: `${SITE}/journal/${slug}/`,
      lastmod,
      changefreq: "monthly",
      priority: PRIORITY.article,
    });
  }

  const topicDirs = (await readdir(join(DIST, "client", "topics"), { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  for (const topic of topicDirs) {
    urls.push({
      loc: `${SITE}/topics/${topic}/`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: PRIORITY.topic,
    });
  }

  const pageDirs = (await readdir(join(DIST, "client", "journal", "page"), { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  for (const p of pageDirs) {
    urls.push({
      loc: `${SITE}/journal/page/${p}/`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "daily",
      priority: 0.5,
    });
  }

  urls.sort((a, b) => {
    if (a.priority !== b.priority) return b.priority - a.priority;
    return a.loc.localeCompare(b.loc);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`).join("\n")}
</urlset>`;

  await writeFile(join(DIST, "client", "sitemap-0.xml"), xml);
  console.log(`✓ Wrote sitemap-0.xml with ${urls.length} URLs (lastmod, priority, changefreq)`);
}

main().catch((e) => { console.error(e); process.exit(1); });