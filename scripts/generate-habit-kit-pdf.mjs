/**
 * Generate the Habit Stack Kit PDF from the printable HTML.
 *
 * Usage:
 *   node scripts/generate-habit-kit-pdf.mjs
 *
 * Reads:  pdf/habit-stack-kit.html
 * Writes: public/habit-stack-kit.pdf
 */
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcHtml = path.join(root, 'pdf', 'habit-stack-kit.html');
const outPdf = path.join(root, 'public', 'habit-stack-kit.pdf');

async function main() {
  const html = await fs.readFile(srcHtml, 'utf8');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--allow-file-access-from-files'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 583, height: 826, deviceScaleFactor: 2 }); // A5 @ ~96dpi
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Register @font-face for our local fonts so Puppeteer can use them
    await page.addStyleTag({
      content: `
        @font-face { font-family: 'Fraunces'; font-style: normal; font-weight: 400 900; src: url('file://${path.join(root, 'public/fonts/fraunces-normal-latin-63f165.woff2')}') format('woff2'); }
        @font-face { font-family: 'Fraunces'; font-style: italic; font-weight: 400 900; src: url('file://${path.join(root, 'public/fonts/fraunces-italic-latin-de4b58.woff2')}') format('woff2'); }
        @font-face { font-family: 'Inter'; font-style: normal; font-weight: 100 900; src: url('file://${path.join(root, 'public/fonts/inter-normal-latin-1ab1ad.woff2')}') format('woff2'); }
        @font-face { font-family: 'JetBrains Mono'; font-style: normal; font-weight: 100 800; src: url('file://${path.join(root, 'public/fonts/jetbrains-mono-normal-latin-1cd702.woff2')}') format('woff2'); }
      `,
    });

    await page.evaluateHandle('document.fonts.ready');

    await page.pdf({
      path: outPdf,
      format: 'A5',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '12mm', right: '12mm', bottom: '14mm', left: '12mm' },
      displayHeaderFooter: false,
    });

    const stat = await fs.stat(outPdf);
    console.log(`✅ Wrote ${outPdf}  (${Math.round(stat.size / 1024)} KB)`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => { console.error('❌', err); process.exit(1); });
