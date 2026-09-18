const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen for console messages
  const logs = [];
  page.on('console', msg => {
    logs.push({type: msg.type(), text: msg.text()});
  });
  
  // Listen for JS errors
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:4321/journal/');
  await page.waitForTimeout(2000);
  
  // Check initial state
  const initLang = await page.evaluate(() => localStorage.getItem('lang'));
  console.log('Initial lang:', initLang);
  
  // Click FR button
  await page.click('[data-lang="fr"]');
  await page.waitForTimeout(3000);
  
  // Check lang after click
  const afterLang = await page.evaluate(() => localStorage.getItem('lang'));
  console.log('After click lang:', afterLang);
  
  // Check topic-wellness
  const frText = await page.$eval('[data-i18n="topic-wellness"]', el => el.textContent);
  console.log('FR topic-wellness text:', frText);
  
  // Check console logs
  console.log('Console logs:', logs.slice(0, 5).map(l => l.text).join('; '));
  console.log('JS errors:', errors.length > 0 ? errors.join('; ') : 'none');
  
  // Try to manually call setLang
  const result = await page.evaluate(() => {
    // Check if setLang exists
    return typeof setLang !== 'undefined' ? 'setLang exists' : 'setLang not found';
  });
  console.log('setLang:', result);
  
  await browser.close();
})();
