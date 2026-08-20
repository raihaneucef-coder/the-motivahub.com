const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const routes = ['', 'about', 'topics', 'journal', 'books', 'quotes', 'contact'];
  for (const r of routes) {
    const url = 'https://motivahub.base44.app/' + r;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(2000);
      const texts = await page.evaluate(() => {
        const t = [...document.querySelectorAll('h1,h2,h3,p,span,button,a,li')]
          .map(el => el.innerText.trim()).filter(x => x && x.length > 2);
        return [...new Set(t)].slice(0, 70);
      });
      console.log('===== /' + r + ' =====');
      texts.forEach(x => console.log('•', x.slice(0, 110)));
    } catch (e) { console.log('===== /' + r + ' ===== FAILED:', e.message.slice(0, 60)); }
  }
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
