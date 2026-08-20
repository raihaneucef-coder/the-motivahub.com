const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('https://motivahub.base44.app', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  const data = await page.evaluate(() => {
    const texts = [...document.querySelectorAll('h1,h2,h3,p,span,button,a')]
      .map(el => el.innerText.trim()).filter(t => t && t.length > 2);
    return [...new Set(texts)];
  });
  data.slice(60).forEach(t => console.log('•', t.slice(0, 100)));
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
