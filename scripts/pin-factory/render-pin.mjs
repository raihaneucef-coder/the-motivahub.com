// scripts/pin-factory/render-pin.mjs
// Renders a pin HTML file to 1000x1500 PNG
// Usage: node scripts/pin-factory/render-pin.mjs pin-atomic-habits.html out/pin-01.png
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = process.argv[2];
const output = process.argv[3] || 'out/pin.png';

if (!input) {
  console.error('Usage: node render-pin.mjs <html-file> [output-png]');
  process.exit(1);
}

const htmlPath = path.isAbsolute(input) ? input : path.resolve(__dirname, input);
if (!fs.existsSync(htmlPath)) {
  console.error('HTML not found:', htmlPath);
  process.exit(1);
}

const outPath = path.isAbsolute(output) ? output : path.resolve(__dirname, output);
fs.mkdirSync(path.dirname(outPath), { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1000, height: 1500 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto('file://' + htmlPath);
await page.waitForLoadState('networkidle');
// Wait for fonts
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

await page.screenshot({ path: outPath, type: 'png', clip: { x: 0, y: 0, width: 1000, height: 1500 } });
await browser.close();
console.log('✓ wrote', outPath);
