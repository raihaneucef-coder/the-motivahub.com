const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  const pages = [
    { name: 'About', url: '/about/' },
    { name: 'Author', url: '/author/youssef-raihane/' },
    { name: 'Contact', url: '/contact/' },
  ];
  
  for (const p of pages) {
    console.log(`\n=== ${p.name} ===`);
    errors.length = 0;
    
    await page.goto('http://localhost:4321' + p.url);
    await page.waitForTimeout(1000);
    
    // Get EN text
    const enText = await page.$eval('body', el => el.textContent);
    
    // Switch to FR
    await page.click('[data-lang="fr"]');
    await page.waitForTimeout(2000);
    
    const frText = await page.$eval('body', el => el.textContent);
    
    // Check for console errors
    console.log(`Console errors: ${errors.length > 0 ? errors.join('; ') : 'none'}`);
    
    // Check text length difference
    console.log(`EN length: ${enText.length}, FR length: ${frText.length}`);
    
    // Check for specific English phrases
    const phrases = ['Get in Touch', 'We would love to hear from you', 'For collaborations', 'What to Expect', 'Follow', 'Stay connected'];
    const found = phrases.filter(p => frText.includes(p));
    console.log(`English phrases in FR: ${found.length > 0 ? found.join(', ') : 'none'}`);
  }
  
  await browser.close();
})();
