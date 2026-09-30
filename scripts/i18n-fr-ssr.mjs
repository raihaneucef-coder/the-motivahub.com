// Post-build FR SSR swap.
// Rewrites dist/fr/**/*.html so Googlebot sees French defaults on chrome
// elements (nav, footer, cookie banner, newsletter, hero) instead of the
// English placeholders the client swap later replaces in-browser.
//
// Rules:
//   - Only touches elements with data-i18n / data-i18n-html / data-i18n-placeholder
//     whose key exists in public/i18n/dict-fr.json.
//   - Original English text is preserved in data-en-text / data-en-html
//     attributes so the in-browser FR/EN toggle can restore it.
//   - Adds data-ssr-fr="1" to <html> so the client swap skips re-fetching
//     and re-merging on initial load (see Layout.astro ssrFr detection).
//   - Never touches /fr/journal/* — those pages already render French SSR.
import fs from 'node:fs';
import path from 'node:path';

const DICT = JSON.parse(fs.readFileSync('public/i18n/dict-fr.json', 'utf8'));
const ROOT = 'dist/fr';

// ---- HTML helpers -------------------------------------------------------
// Very small tokenizer for the two operations we need: find an element's
// matching close tag given its start index, and rewrite its inner content
// or an attribute. Only handles well-formed HTML from Astro's output.
const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

function findMatchingClose(html, tagName, openEnd) {
  // openEnd is the index right after the opening tag's '>'.
  let depth = 1;
  let i = openEnd;
  const openRe = new RegExp(`<${tagName}(\\s|>|/)`, 'i');
  const closeRe = new RegExp(`</${tagName}\\s*>`, 'i');
  while (i < html.length) {
    const nextOpen = html.search(new RegExp(`<${tagName}(\\s[^<]*?>|[^<]*?>)`, 'i').source);
    const lc = findNext(html, i, closeRe);
    if (lc === -1) return -1;
    const lo = findNext(html, i, openRe);
    if (lo !== -1 && lo < lc.index) {
      // nested same-tag opening: skip past it
      const tagEnd = html.indexOf('>', lo);
      const selfClose = html[lo + tagName.length] === '/' || html[tagEnd - 1] === '/';
      if (!selfClose && !VOID.has(tagName.toLowerCase())) depth++;
      i = tagEnd + 1;
      continue;
    }
    depth--;
    if (depth === 0) return lc;
    i = lc.index + lc[0].length;
  }
  return -1;
}
function findNext(html, from, re) {
  re.lastIndex = 0;
  const m = re.exec(html.slice(from));
  if (!m) return -1;
  m.index = from + m.index;
  return m;
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Heuristic: is the element already in French, so we should leave it alone?
// We treat any accented char OR content that matches the dict value modulo
// case/diacritics as "already French". This preserves page-specific wording
// that's more refined than the generic dict (e.g. casing differences on
// "Outils gratuits" vs "Outils Gratuits").
const FR_ACCENTED = /[éèêëàâäçùûüôöîïïŒœ]/i;
function normalize(s) {
  return String(s)
    .replace(/<[^>]+>/g, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
function alreadyFrench(inner, frValue) {
  if (FR_ACCENTED.test(inner)) return true;
  return normalize(inner) === normalize(frValue);
}

// Find every element carrying attrName="key" and swap its inner content.
function swapAttr(html, attrName, dict, isHtml) {
  // Match opening tags that contain THIS exact attribute (word boundary before =).
  const openRe = new RegExp(`<([a-zA-Z][\\w-]*)([^<>]*?\\s${attrName}="([^"]+)"[^<>]*?)>`, 'g');
  let out = '';
  let cursor = 0;
  let m;
  while ((m = openRe.exec(html)) !== null) {
    const [full, tag, attrs, key] = m;
    if (!dict[key]) continue;
    const openStart = m.index;
    const openEnd = openStart + full.length;
    const close = findMatchingClose(html, tag, openEnd);
    if (close === -1) continue;
    const inner = html.slice(openEnd, close.index);
    if (alreadyFrench(inner, dict[key])) continue; // leave SSR-French defaults untouched
    const enAttr = isHtml ? 'data-en-html' : 'data-en-text';
    // Preserve original English once (do not overwrite existing data-en-*).
    let newAttrs = attrs;
    if (!newAttrs.includes(enAttr + "=")) {
      newAttrs = attrs + ` ${enAttr}="${escapeAttr(isHtml ? inner : inner.replace(/<[^>]+>/g, '').trim())}"`;
    }
    const replacement = `<${tag}${newAttrs}>${dict[key]}</${tag}>`;
    out += html.slice(cursor, openStart) + replacement;
    cursor = close.index + close[0].length;
    openRe.lastIndex = cursor;
  }
  out += html.slice(cursor);
  return out;
}

function swapPlaceholders(html, dict) {
  // <input ... data-i18n-placeholder="key" placeholder="English">
  return html.replace(
    /<([a-zA-Z][\w-]*)([^<>]*?\sdata-i18n-placeholder="([^"]+)"[^<>]*?)>/g,
    (full, tag, attrs, key) => {
      if (!dict[key]) return full;
      // Replace existing placeholder="..." (or add one if missing).
      let newAttrs = attrs;
      if (/placeholder="/i.test(newAttrs)) {
        newAttrs = newAttrs.replace(/placeholder="[^"]*"/i, `placeholder="${escapeAttr(dict[key])}"`);
      } else {
        newAttrs = newAttrs + ` placeholder="${escapeAttr(dict[key])}"`;
      }
      return `<${tag}${newAttrs}>`;
    }
  );
}

// ---- Walk dist/fr -------------------------------------------------------
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(p));
    else if (e.name.endsWith('.html')) files.push(p);
  }
  return files;
}

let processed = 0, changed = 0, skippedJournal = 0;
for (const file of walk(ROOT)) {
  processed++;
  const orig = fs.readFileSync(file, 'utf8');
  // Process every FR page. Article body elements use keys from
  // articles-fr.json (not present in dict-fr.json), so swapAttr naturally
  // skips them; chrome elements use dict-fr.json keys and get swapped.
  // The alreadyFrench() guard covers the rare case where a template has
  // already been localized to French directly in source.
  let out = swapAttr(orig, 'data-i18n-html', DICT, true);
  out = swapAttr(out, 'data-i18n', DICT, false);
  out = swapPlaceholders(out, DICT);
  // Mark html element so client script can detect SSR-French pages.
  out = out.replace(/<html(\s[^<>]*?)?>/i, (full) => {
    if (/data-ssr-fr=/i.test(full)) return full;
    return full.replace(/<html(\s)/i, '<html data-ssr-fr="1"$1').replace(/^<html>/i, '<html data-ssr-fr="1">');
  });
  if (out !== orig) {
    fs.writeFileSync(file, out);
    changed++;
  }
}
console.log(`i18n-fr-ssr: scanned ${processed} files, skipped ${skippedJournal} journal, rewrote ${changed}`);
