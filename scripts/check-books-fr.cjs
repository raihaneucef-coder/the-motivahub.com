const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/best/books/');
  await page.waitForTimeout(500);
  await page.click('[data-lang="fr"]');
  await page.waitForTimeout(500);
  
  const html = await page.$eval('body', el => el.innerHTML);
  const matches = html.match(/&lt;\/?em&gt;|&lt;\/?strong&gt;|&lt;em&gt;|&lt;strong&gt;/g) || [];
  console.log('Books visible tags count:', matches.length);
  console.log('Books visible tags:', matches.slice(0, 10));
  
  const text = await page.$eval('body', el => el.textContent);
  const lines = text.split('\n').filter(l => l.trim().length > 30);
  console.log('Books sample text:', lines.slice(0, 3).join(' | '));
  
  await browser.close();
})();
