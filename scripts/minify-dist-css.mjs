// Post-build: minify the BUILT copy of global.css in dist/ (source stays readable).
// Safe because the ?v=<hash> cache-buster in Layout.astro is computed from the
// readable source, so minifying the dist output never breaks cache-busting.
import fs from 'fs';
import path from 'path';

const cssPath = path.join(process.cwd(), 'dist', 'styles', 'global.css');
if (!fs.existsSync(cssPath)) {
  console.log('[minify-dist-css] dist/styles/global.css not found, skipping.');
  process.exit(0);
}
const css = fs.readFileSync(cssPath, 'utf8');
const minified = css
  .replace(/\/\*[\s\S]*?\*\//g, '')          // strip comments
  .replace(/\s+/g, ' ')                        // collapse whitespace
  .replace(/\s*([{}:;,>~+])\s*/g, '$1')        // drop space around symbols
  .replace(/;}/g, '}')                          // drop trailing semicolons
  .replace(/:;/g, ':')                          // drop stray empty decls
  .trim();

fs.writeFileSync(cssPath, minified);
const kb = (n) => (n / 1024).toFixed(1) + 'KB';
console.log(`[minify-dist-css] ${kb(css.length)} -> ${kb(minified.length)} (saved ${((1 - minified.length / css.length) * 100).toFixed(1)}%)`);
