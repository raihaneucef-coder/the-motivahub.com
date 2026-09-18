const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/journal/');
  await page.waitForTimeout(500);
  
  const beforeTitle = await page.$eval('h3 a', el => el.textContent);
  const beforeDesc = await page.$eval('.card-pad p', el => el.textContent);
  
  await page.click('[data-lang="fr"]');
  await page.waitForTimeout(500);
  
  const afterTitle = await page.$eval('h3 a', el => el.textContent);
  const afterDesc = await page.$eval('.card-pad p', el => el.textContent);
  
  console.log('Title EN:', beforeTitle.substring(0, 80));
  console.log('Title FR:', afterTitle.substring(0, 80));
  console.log('Desc EN:', beforeDesc.substring(0, 80));
  console.log('Desc FR:', afterDesc.substring(0, 80));
  
  await browser.close();
})();
