#!/usr/bin/env node
/**
 * Regression check for src/utils/inlineHtml.ts (ArticleFaq rendering).
 *
 * Run with:  node scripts/check-inline-html.mjs
 * Node 22.6+ strips the TypeScript types of the imported module itself, so no
 * build step is needed. This is not part of the site build.
 */
import { strict as assert } from "node:assert";
import { sanitizeInlineHtml, stripHtml } from "../src/utils/inlineHtml.ts";

const cases = [
  // The real corpus bug: allowed inline markup must become real markup.
  ["Deep <em>deliberate practice</em> beats length.", "Deep <em>deliberate practice</em> beats length."],
  ["<strong>Two</strong> and <b>bold</b> and <i>italic</i> and <code>x</code>",
    "<strong>Two</strong> and <b>bold</b> and <i>italic</i> and <code>x</code>"],
  // Anything outside the allowlist stays literal text, never markup.
  ["<script>alert(1)</script>", "&lt;script&gt;alert(1)&lt;/script&gt;"],
  ["<img src=x onerror=alert(1)>", "&lt;img src=x onerror=alert(1)&gt;"],
  ["<div onclick='evil()'>hi</div>", "&lt;div onclick='evil()'&gt;hi&lt;/div&gt;"],
  // Attributes are dropped; only a validated href survives.
  ['<a href="https://the-motivahub.com/about/" onclick="steal()" target="_top">about</a>',
    '<a href="https://the-motivahub.com/about/" rel="nofollow noopener">about</a>'],
  ['<a href="javascript:alert(1)">x</a>', "<a>x</a>"],
  ['<a href="JAVASCRIPT&#58;alert(1)">x</a>', "<a>x</a>"],
  ["<a href=\"java\tscript:alert(1)\">x</a>", "<a>x</a>"],
  ['<a href="data:text/html;base64,PHNjcmlwdD4=">x</a>', "<a>x</a>"],
  ['<a href="/journal/">internal</a>', '<a href="/journal/" rel="nofollow noopener">internal</a>'],
  ["<a>x</a>", '<a rel="nofollow noopener">x</a>'],
  // Void element normalised.
  ["line1<br>line2", "line1<br />line2"],
  // Unbalanced markup cannot leak an open element.
  ["<em>open only", "<em>open only</em>"],
  ["stray </em> close", "stray &lt;/em&gt; close"],
  ["<em><strong>nested</em></strong>", "<em><strong>nested</strong></em>&lt;/strong&gt;"],
  // Text entities survive, bare ampersands are escaped.
  ["habits &amp; discipline", "habits &amp; discipline"],
  ["habits & discipline", "habits &amp; discipline"],
];

let checks = 0;
for (const [input, expected] of cases) {
  const got = sanitizeInlineHtml(input);
  assert.equal(got, expected, `sanitize(${JSON.stringify(input)}) → ${got}, expected ${expected}`);
  checks++;
  // No sanitised output may keep a disallowed tag, a handler or a risky URL.
  // Only *raw* markup counts here: escaped text such as
  // "&lt;img onerror=…&gt;" is inert by definition.
  assert.ok(!/<(?!\/*(?:em|strong|i|b|code|br|a)\b)[a-zA-Z]/.test(got), `disallowed tag in ${got}`);
  for (const rawTag of got.match(/<[a-zA-Z][^>]*>/g) || []) {
    assert.ok(!/on[a-z]+\s*=/i.test(rawTag), `event handler in ${rawTag}`);
    assert.ok(!/javascript:|data:|vbscript:/i.test(rawTag), `dangerous URL in ${rawTag}`);
  }
}
assert.equal(sanitizeInlineHtml(""), "");
checks++;

// JSON-LD answers must be plain text with decoded entities.
for (const [input, expected] of [
  ["Deep <em>deliberate practice</em> beats length.", "Deep deliberate practice beats length."],
  ["A <a href='https://x/'>link</a> &amp; an entity &#8212; done", "A link & an entity — done"],
  ["<script>alert(1)</script>", "alert(1)"],
  ["line1<br>line2", "line1 line2"],
  ["", ""],
]) {
  assert.equal(stripHtml(input), expected, `stripHtml(${JSON.stringify(input)})`);
  checks++;
}

console.log(`✓ check-inline-html: ${checks} assertions passed`);
