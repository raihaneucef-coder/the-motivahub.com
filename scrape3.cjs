const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('https://motivahub.base44.app', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  const data = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('button, a.btn, a[class*="btn"], header, nav, [class*="hero"] h1, [class*="hero"] p, .fixed a, [class*="menu"] button')) {
      const cs = getComputedStyle(el);
      out.push({
        tag: el.tagName, cls: String(el.className).slice(0, 80),
        text: el.innerText.trim().slice(0, 40),
        bg: cs.backgroundColor, color: cs.color,
        font: cs.fontFamily.split(',')[0], size: cs.fontSize, weight: cs.fontWeight,
        ls: cs.letterSpacing, tt: cs.textTransform,
        pad: cs.padding, radius: cs.borderRadius, border: cs.border,
        display: cs.display
      });
    }
    return out;
  });
  data.forEach(s => console.log(JSON.stringify(s)));
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
