const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/tools/discipline-quiz/');
  await page.waitForTimeout(500);
  await page.click('[data-lang="fr"]');
  await page.waitForTimeout(500);
  
  const html = await page.$eval('body', el => el.innerHTML);
  const matches = html.match(/&lt;\/?em&gt;|&lt;\/?strong&gt;|&lt;em&gt;|&lt;strong&gt;/g) || [];
  console.log('Discipline Quiz visible tags:', matches);
  
  // Find where these tags are in the HTML
  const idx = html.indexOf('&lt;strong&gt;');
  if (idx !== -1) {
    console.log('Context:', html.substring(idx - 50, idx + 100));
  }
  
  await browser.close();
})();
