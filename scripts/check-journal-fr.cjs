const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/journal/');
  await page.waitForTimeout(500);
  await page.click('[data-lang="fr"]');
  await page.waitForTimeout(500);
  
  // Get category labels
  const labels = await page.$$eval('.card-meta', els => els.map(e => e.textContent));
  console.log('Category labels:', labels.slice(0, 10));
  
  // Check HTML structure of card-meta
  const html = await page.$eval('.card-meta', el => el.innerHTML);
  console.log('Card meta HTML sample:', html.substring(0, 200));
  
  await browser.close();
})();
