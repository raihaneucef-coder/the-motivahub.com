/**
 * Minimal, dependency-free inline-HTML handling for editorial strings.
 *
 * Article frontmatter carries a few FAQ answers written with inline markup
 * (`<em>`, `<strong>`). Rendered as plain text by Astro they showed up as
 * literal "<em>" in the page, and as raw HTML inside JSON-LD they produced
 * invalid schema. The answers are trusted editorial content but still go
 * through a strict allowlist here, so a stray or malicious tag can only ever
 * reach the page as escaped text — never as executable markup.
 */

const SAFE_TAGS = new Set(["em", "strong", "i", "b", "code", "br", "a"]);
const VOID_TAGS = new Set(["br"]);

// Only these protocols may survive on a sanitised link.
const SAFE_URL = /^(?:https?:|mailto:|tel:|\/|#|\.\/|\.\.\/)/i;

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#?[a-zA-Z0-9]+);/g, (whole, body: string) => {
    if (body[0] === "#") {
      const code = body[1] === "x" || body[1] === "X"
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff
        ? String.fromCodePoint(code)
        : whole;
    }
    return ENTITIES[body.toLowerCase()] ?? whole;
  });
}

function escapeText(text: string): string {
  // Bare ampersands are escaped, existing character references are left alone,
  // so a source that already writes "&amp;" is not double-escaped.
  return text
    .replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]{1,31}|#\d{1,7}|#[xX][0-9a-fA-F]{1,6});)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Keeps the href of an allowlisted <a> when the protocol is safe, and drops
 * every other attribute (no style, no event handler, no target overrides).
 */
function safeAnchor(attrs: string): string {
  const match = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'`=<>]+))/i.exec(attrs);
  if (!match) return ' rel="nofollow noopener"';
  const raw = (match[1] ?? match[2] ?? match[3] ?? "").trim();
  // Control characters and whitespace are stripped before the scheme check,
  // because "java\nscript:" and "jAvAsCrIpT:" both pass a naive test.
  const url = decodeEntities(raw).replace(/[\u0000-\u0020]+/g, "");
  if (!SAFE_URL.test(url) || /^(?:javascript|data|vbscript|file):/i.test(url)) return "";
  return ` href="${escapeText(url)}" rel="nofollow noopener"`;
}

/**
 * Returns a string that is safe to inject with `set:html`: allowlisted inline
 * tags are kept, everything else is escaped and shows as literal text.
 * Unbalanced tags are either closed in order or escaped, so the output can
 * never open an element the template did not intend to open.
 */
export function sanitizeInlineHtml(input: string): string {
  if (!input) return "";
  const token = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:"[^"]*"|'[^']*'|[^>])*)>/g;
  const open: string[] = [];
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = token.exec(input))) {
    out += escapeText(input.slice(last, m.index));
    last = token.lastIndex;
    const [, closing, rawName, attrs] = m;
    const name = rawName.toLowerCase();

    if (closing) {
      if (SAFE_TAGS.has(name) && !VOID_TAGS.has(name) && open.includes(name)) {
        // Crossed markup (`<em><strong>x</em>`): close the elements opened
        // inside first, so the fragment stays properly nested.
        while (open[open.length - 1] !== name) out += `</${open.pop()}>`;
        out += `</${name}>`;
        open.pop();
      } else {
        out += escapeText(m[0]);
      }
      continue;
    }

    if (!SAFE_TAGS.has(name)) {
      out += escapeText(m[0]);
      continue;
    }
    if (VOID_TAGS.has(name)) {
      out += "<br />";
      continue;
    }
    out += name === "a" ? `<a${safeAnchor(attrs ?? "")}>` : `<${name}>`;
    open.push(name);
  }

  out += escapeText(input.slice(last));
  // Close anything left open so the fragment stays balanced.
  while (open.length) out += `</${open.pop()}>`;
  return out;
}

/**
 * Plain-text version of an editorial string, for structured data (JSON-LD),
 * where markup is invalid and entities would be displayed literally.
 */
export function stripHtml(input: string): string {
  if (!input) return "";
  return decodeEntities(
    input
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(p|div|li|h[1-6])>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/[ \t]+/g, " ")
      .trim(),
  );
}
