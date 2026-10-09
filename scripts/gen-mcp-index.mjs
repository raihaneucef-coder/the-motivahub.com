#!/usr/bin/env node
// Build-time generator for the WebMCP content index.
// Emits public/mcp-index.json (copied to dist/ by `astro build`) so the client
// WebMcp.astro tools (search / get_article / list_topics) can answer AI agents
// with real, current site data. Read-only over src/.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import yaml from 'js-yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG = join(ROOT, 'src/content/blog');
const SITE = 'https://the-motivahub.com';

const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  try { return yaml.load(m[1]) || {}; } catch { return {}; }
}

// EN slug -> FR slug (1 of 169 differs, e.g. sleep-is-unfair-advantage <-> ...)
const slugFrMap = JSON.parse(readFileSync(join(ROOT, 'public/i18n/slugs-fr.json'), 'utf8'));

const articles = [];
for (const file of readdirSync(BLOG).filter((f) => f.endsWith('.md'))) {
  const slug = basename(file, '.md');
  const fm = frontmatter(readFileSync(join(BLOG, file), 'utf8'));
  if (fm.draft || fm.noindex) continue;
  const frSlug = slugFrMap[slug] || slug;
  articles.push({
    slug,
    title: clean(fm.title),
    titleFr: clean(fm.titleFr),
    description: clean(fm.description),
    descriptionFr: clean(fm.descriptionFr),
    topic: clean(fm.topic),
    url: `${SITE}/journal/${slug}/`,
    urlFr: fm.titleFr ? `${SITE}/fr/journal/${frSlug}/` : null,
  });
}

// Books (light regex parse of books.ts).
function parseBooks() {
  const src = readFileSync(join(ROOT, 'src/data/books.ts'), 'utf8');
  const blocks = src.split(/\n  \{/).slice(1);
  const field = (b, k) => { const m = b.match(new RegExp(`${k}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`)); return m ? m[1] : ''; };
  return blocks.map((b) => ({
    id: field(b, 'id'), title: clean(field(b, 'title')), author: clean(field(b, 'author')),
    category: clean(field(b, 'category')), categoryFr: clean(field(b, 'categoryFr')),
    description: clean(field(b, 'description')), reason: clean(field(b, 'reason')),
    url: `${SITE}/books/`,
  })).filter((b) => b.id && b.title);
}
const books = parseBooks();

const topics = [...new Set(articles.map((a) => a.topic).filter(Boolean))].sort();

const out = {
  generated: new Date().toISOString(),
  site: SITE,
  name: 'Motiva Hub',
  articles,
  books,
  topics,
};

writeFileSync(join(ROOT, 'public/mcp-index.json'), JSON.stringify(out));
console.log(`mcp-index.json: ${articles.length} articles, ${books.length} books, ${topics.length} topics`);
