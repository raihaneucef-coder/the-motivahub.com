/**
 * Render the "On this page" table of contents into the static HTML.
 *
 * Journal bodies are raw HTML, so Astro's heading extraction returns an empty
 * list and TableOfContents.astro falls back to a `data-toc-dom` nav that a
 * client script fills after DOMContentLoaded. That late reveal pushed the whole
 * article body down: 0.285 CLS on every journal page (mobile Lighthouse, both
 * production and preview).
 *
 * This step fills the same nav at build time, after the FR rewrite so the
 * labels are already translated, and removes `hidden`. It also writes the ids
 * the client script would have generated, so the runtime signature matches and
 * the client returns early instead of rebuilding the list.
 *
 * Runs on dist/ only; a page without TOC markup is left untouched.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
  '&mdash;': '\u2014',
  '&ndash;': '\u2013',
  '&rsquo;': '\u2019',
  '&lsquo;': '\u2018',
  '&ldquo;': '\u201c',
  '&rdquo;': '\u201d',
  '&hellip;': '\u2026',
};

const decode = (s) => s.replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e] ?? e);
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (html) => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

/** Slug rule kept byte-identical to the client fallback in TableOfContents.astro. */
const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

/** Bounds of the first `<div class="prose">`, with nested divs balanced. */
function findProse(html) {
  const start = html.indexOf('<div class="prose');
  if (start === -1) return null;
  const openEnd = html.indexOf('>', start) + 1;
  if (openEnd <= 0) return null;
  const re = /<div\b|<\/div>/g;
  re.lastIndex = openEnd;
  let depth = 1;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0] === '</div>' ? -1 : 1;
    if (depth === 0) return { start: openEnd, end: m.index };
  }
  return null;
}

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
})(DIST);

let filled = 0;
let removed = 0;
let idsAdded = 0;

for (const file of files) {
  let html = readFileSync(file, 'utf8');
  if (!html.includes('data-toc-dom')) continue;

  const navStart = html.indexOf('<nav class="toc"');
  const navTagEnd = html.indexOf('>', navStart);
  if (navStart === -1 || navTagEnd === -1) continue;
  const navEnd = html.indexOf('</nav>', navTagEnd);
  if (navEnd === -1) continue;

  const navTag = html.slice(navStart, navTagEnd + 1);
  const navInner = html.slice(navTagEnd + 1, navEnd);
  const ulStart = navInner.indexOf('<ul class="toc-list"');
  if (ulStart === -1) continue;
  const ulEnd = navInner.indexOf('</ul>', ulStart);
  if (ulEnd === -1) continue;
  const ulTag = navInner.slice(ulStart, navInner.indexOf('>', ulStart) + 1);
  // Already rendered by an earlier run: leave it alone.
  if (navInner.slice(navInner.indexOf('>', ulStart) + 1, ulEnd).trim()) continue;

  const cidMatch = navTag.match(/data-astro-cid-[a-z0-9]+/);
  const cid = cidMatch ? `${cidMatch[0]}=""` : '';

  const prose = findProse(html);
  const headings = [];
  if (prose) {
    const slice = html.slice(prose.start, prose.end);
    const re = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g;
    const used = new Set();
    const edits = [];
    let m;
    while ((m = re.exec(slice))) {
      const text = plain(m[3]);
      if (!text) continue;
      const existing = (m[2].match(/\sid="([^"]+)"/) || [])[1];
      let id = existing;
      if (!id) {
        const base = slugify(text) || `section-${headings.length + 1}`;
        id = base;
        let n = 2;
        while (used.has(id)) { id = `${base}-${n}`; n += 1; }
        // Recorded as an offset edit: two identical headings must not both be
        // matched by the same String.replace call.
        edits.push({ at: m.index, len: m[0].length, html: `<h${m[1]}${m[2]} id="${id}">${m[3]}</h${m[1]}>` });
        idsAdded += 1;
      }
      used.add(id);
      headings.push({ depth: m[1], id, text });
    }
    if (edits.length) {
      let rebuilt = slice;
      for (const edit of edits.reverse()) rebuilt = rebuilt.slice(0, edit.at) + edit.html + rebuilt.slice(edit.at + edit.len);
      // The prose block sits after the TOC nav, so the offsets captured above
      // stay valid.
      html = html.slice(0, prose.start) + rebuilt + html.slice(prose.end);
    }
  }

  if (headings.length < 2) {
    html = html.slice(0, navStart) + html.slice(navEnd + '</nav>'.length);
    removed += 1;
    writeFileSync(file, html);
    continue;
  }

  const items = headings
    .map((h) => `<li class="toc-item toc-depth-${h.depth}" ${cid}><a href="#${h.id}" ${cid}>${escapeHtml(h.text)}</a></li>`)
    .join('');
  const newUl = `${ulTag}${items}</ul>`;
  const sig = escapeHtml(`${headings.length}|${headings.map((h) => h.text).join('|')}`);
  const newNavTag = navTag.replace(/\shidden(?=[\s>])/, '');

  const beforeNav = html.slice(0, navStart);
  const afterNav = html.slice(navEnd + '</nav>'.length);
  const newNav = `${newNavTag}${navInner.slice(0, ulStart)}${newUl}${navInner.slice(ulEnd + '</ul>'.length)}`;

  html = `${beforeNav}${newNav.replace(/<nav class="toc"/, `<nav class="toc" data-sig="${sig}"`)}${afterNav}`;
  writeFileSync(file, html);
  filled += 1;
}

console.log(`[build-toc] filled ${filled} TOC(s), removed ${removed} empty one(s), generated ${idsAdded} heading id(s)`);
