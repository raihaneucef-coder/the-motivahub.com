const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const pages = [
    { name: 'Books', url: '/best/books/' },
    { name: 'Best Focus', url: '/best/focus-books/' },
    { name: 'Atomic Habits Guide', url: '/guides/atomic-habits-ultimate-guide/' },
    { name: 'Meditation Timer', url: '/tools/meditation-timer/' },
    { name: 'Discipline Quiz', url: '/tools/discipline-quiz/' },
    { name: 'Journal', url: '/journal/' },
    { name: 'About', url: '/about/' },
    { name: 'Author', url: '/author/youssef-raihane/' },
    { name: 'Contact', url: '/contact/' },
  ];
  
  for (const p of pages) {
    console.log(`\n=== ${p.name} ===`);
    
    // Check EN
    await page.goto('http://localhost:4321' + p.url);
    await page.waitForTimeout(500);
    const enText = await page.$eval('body', el => el.textContent);
    const enHtml = await page.$eval('body', el => el.innerHTML);
    
    // Check for raw HTML tags in EN
    const enRawEm = (enHtml.match(/<em>/g) || []).length;
    const enRawStrong = (enHtml.match(/<strong>/g) || []).length;
    
    console.log(`EN: text=${enText.length} chars, raw <em>: ${enRawEm}, raw <strong>: ${enRawStrong}`);
    
    // Switch to FR
    const langBtn = await page.$('[data-lang="fr"]');
    if (langBtn) {
      await langBtn.click();
      await page.waitForTimeout(500);
    } else {
      console.log('  WARN: No FR language button found');
      continue;
    }
    
    const frText = await page.$eval('body', el => el.textContent);
    const frHtml = await page.$eval('body', el => el.innerHTML);
    
    // Check for raw HTML tags in FR
    const frRawEm = (frHtml.match(/<em>/g) || []).length;
    const frRawStrong = (frHtml.match(/<strong>/g) || []).length;
    
    // Check for Arabic text
    const arabicRegex = /[\u0600-\u06FF]/;
    const hasArabic = arabicRegex.test(frText);
    
    // Check for common English words that should be translated
    const englishWords = ['The', 'Read', 'Article', 'Menu', 'Home', 'About', 'Contact', 'Journal', 'Books', 'Quotes'];
    const foundEnglish = englishWords.filter(w => frText.includes(w));
    
    console.log(`FR: text=${frText.length} chars, raw <em>: ${frRawEm}, raw <strong>: ${frRawStrong}`);
    console.log(`  Arabic: ${hasArabic}`);
    console.log(`  English words remaining: ${foundEnglish.length > 0 ? foundEnglish.join(', ') : 'none'}`);
    
    // Check for visible raw tags (tags that are not properly rendered)
    const visibleTags = (frHtml.match(/&lt;em&gt;|&lt;strong&gt;|&lt;\/?em&gt;|&lt;\/?strong&gt;/g) || []).length;
    console.log(`  Visible raw tags: ${visibleTags}`);
  }
  
  await browser.close();
})();
