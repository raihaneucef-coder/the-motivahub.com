const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const pages = [
    { name: 'About', url: '/about/' },
    { name: 'Author', url: '/author/youssef-raihane/' },
    { name: 'Contact', url: '/contact/' },
  ];
  
  for (const p of pages) {
    console.log(`\n=== ${p.name} ===`);
    
    await page.goto('http://localhost:4321' + p.url);
    await page.waitForTimeout(500);
    
    // Get EN text
    const enText = await page.$eval('body', el => el.textContent);
    
    // Switch to FR
    await page.click('[data-lang="fr"]');
    await page.waitForTimeout(500);
    
    const frText = await page.$eval('body', el => el.textContent);
    
    // Check for common English words that should be translated
    const englishWords = ['The', 'Read', 'Article', 'Menu', 'Home', 'About', 'Contact', 'Journal', 'Books', 'Quotes', 'Get in Touch', 'We would love to hear from you', 'For collaborations', 'What to Expect', 'Follow', 'Stay connected'];
    const foundEnglish = englishWords.filter(w => frText.includes(w));
    
    console.log(`English words in FR: ${foundEnglish.length > 0 ? foundEnglish.join(', ') : 'none'}`);
    
    // Check text length difference
    console.log(`EN length: ${enText.length}, FR length: ${frText.length}`);
  }
  
  await browser.close();
})();
