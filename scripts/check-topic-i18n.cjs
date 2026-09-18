const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/journal/');
  await page.waitForTimeout(1000);
  
  // Get initial state
  const enHtml = await page.$eval('body', el => el.innerHTML);
  const enTopicWellness = enHtml.includes('data-i18n="topic-wellness"') ? 'present' : 'missing';
  console.log('EN topic-wellness attribute:', enTopicWellness);
  
  // Find the topic-wellness element text
  const enText = await page.$eval('[data-i18n="topic-wellness"]', el => el.textContent);
  console.log('EN topic-wellness text:', enText);
  
  // Click FR
  await page.click('[data-lang="fr"]');
  await page.waitForTimeout(2000);
  
  // Check if i18n ran
  const frText = await page.$eval('[data-i18n="topic-wellness"]', el => el.textContent);
  console.log('FR topic-wellness text:', frText);
  
  // Check for JS errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  
  console.log('Console errors:', errors.length > 0 ? errors.join('; ') : 'none');
  
  await browser.close();
})();
