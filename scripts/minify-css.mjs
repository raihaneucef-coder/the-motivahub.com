import fs from 'fs';
import path from 'path';

const cssPath = path.join(process.cwd(), 'public/styles/global.css');
const css = fs.readFileSync(cssPath, 'utf8');

// Simple CSS minifier: remove comments, excess whitespace
const minified = css
  .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
  .replace(/\s+/g, ' ') // collapse whitespace
  .replace(/\s*([{}:;,])\s*/g, '$1') // remove space around symbols
  .replace(/;\}/g, '}') // remove trailing semicolons
  .replace(/\s*!\s*/g, '!') // remove space around !
  .trim();

const originalSize = css.length;
const minifiedSize = minified.length;
const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

console.log(`Original: ${(originalSize / 1024).toFixed(1)}KB`);
console.log(`Minified: ${(minifiedSize / 1024).toFixed(1)}KB`);
console.log(`Saved: ${savings}%`);

fs.writeFileSync(cssPath, minified);
console.log('CSS minified successfully.');
