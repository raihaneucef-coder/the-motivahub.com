const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const results = [];
  
  const pages = [
    { name: 'Home', url: '/' },
    { name: 'À propos', url: '/about/' },
    { name: 'The Journal', url: '/journal/' },
    { name: 'Meilleurs Livres', url: '/best/books/' },
    { name: 'Affiches Numériques', url: '/quotes/' },
  ];
  
  for (const p of pages) {
    const page = await browser.newPage();
    await page.goto('http://localhost:4321' + p.url);
    await page.waitForTimeout(500);
    
    // Check EN
    const enText = await page.$eval('body', el => el.textContent);
    const enHasRawHtml = await page.$eval('body', el => el.innerHTML.includes('<strong>') || el.innerHTML.includes('<em>'));
    
    // Switch to FR
    await page.click('[data-lang="fr"]');
    await page.waitForTimeout(500);
    
    // Check FR
    const frText = await page.$eval('body', el => el.textContent);
    const frHasRawHtml = await page.$eval('body', el => el.innerHTML.includes('<strong>') || el.innerHTML.includes('<em>'));
    const hasOverflow = await page.$eval('body', el => el.scrollWidth > el.clientWidth);
    
    results.push({
      page: p.name,
      enTextLength: enText.length,
      frTextLength: frText.length,
      enHasRawHtml,
      frHasRawHtml,
      hasOverflow
    });
    
    await page.close();
  }
  
  console.log('Verification Results:');
  console.log('=====================');
  results.forEach(r => {
    console.log(`\n${r.page}:`);
    console.log(`  EN text length: ${r.enTextLength}`);
    console.log(`  FR text length: ${r.frTextLength}`);
    console.log(`  EN has raw HTML: ${r.enHasRawHtml}`);
    console.log(`  FR has raw HTML: ${r.frHasRawHtml}`);
    console.log(`  Has overflow: ${r.hasOverflow}`);
  });
  
  await browser.close();
})();
