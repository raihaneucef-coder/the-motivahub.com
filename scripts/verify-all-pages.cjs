const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const pages = [
    { name: 'Journal', url: '/journal/' },
    { name: 'Journal Article', url: '/journal/deep-work-focus/' },
    { name: 'Books', url: '/best/books/' },
    { name: 'Best Focus', url: '/best/focus-books/' },
    { name: 'Atomic Habits Guide', url: '/guides/atomic-habits-ultimate-guide/' },
    { name: 'Meditation Timer', url: '/tools/meditation-timer/' },
    { name: 'Discipline Quiz', url: '/tools/discipline-quiz/' },
    { name: 'About', url: '/about/' },
    { name: 'Author', url: '/author/youssef-raihane/' },
    { name: 'Contact', url: '/contact/' },
  ];
  
  const results = {};
  
  for (const p of pages) {
    console.log(`\n=== ${p.name} ===`);
    
    await page.goto('http://localhost:4321' + p.url);
    await page.waitForTimeout(500);
    
    // Get EN text
    const enText = await page.$eval('body', el => el.textContent);
    
    // Switch to FR
    await page.click('[data-lang="fr"]');
    await page.waitForTimeout(1000);
    
    const frText = await page.$eval('body', el => el.textContent);
    const frHtml = await page.$eval('body', el => el.innerHTML);
    
    // Check for raw HTML tags
    const visibleTags = (frHtml.match(/&lt;\/?em&gt;|&lt;\/?strong&gt;|&lt;em&gt;|&lt;strong&gt;/g) || []).length;
    
    // Check for Arabic text
    const arabicRegex = /[\u0600-\u06FF]/;
    const hasArabic = arabicRegex.test(frText);
    
    // Check for specific English phrases that should be translated
    const englishPhrases = ['Get in Touch', 'We would love to hear from you', 'For collaborations', 'What to Expect', 'Follow', 'Stay connected', 'Featured'];
    const foundEnglish = englishPhrases.filter(w => frText.includes(w));
    
    // Check for Journal category labels
    const journalLabels = ['WELLNESS', 'SPORT', 'HABITS', 'DISCIPLINE', 'MINDSET', 'PRODUCTIVITY', 'SUCCESS', 'PERSONAL GROWTH', 'CONFIDENCE', 'NUTRITION', 'TRAVEL', 'ENTERTAINMENT', 'STORIES', 'FINANCE', 'RELATIONSHIPS'];
    const foundEnglishLabels = journalLabels.filter(l => frText.includes(l));
    
    console.log(`Visible raw tags: ${visibleTags}`);
    console.log(`Arabic text: ${hasArabic}`);
    console.log(`English phrases: ${foundEnglish.length > 0 ? foundEnglish.join(', ') : 'none'}`);
    console.log(`English category labels: ${foundEnglishLabels.length > 0 ? foundEnglishLabels.join(', ') : 'none'}`);
    console.log(`EN length: ${enText.length}, FR length: ${frText.length}`);
    
    results[p.name] = {
      visibleTags,
      hasArabic,
      englishPhrases: foundEnglish,
      englishLabels: foundEnglishLabels,
      enLength: enText.length,
      frLength: frText.length
    };
  }
  
  console.log('\n=== SUMMARY ===');
  let allPassed = true;
  for (const [name, data] of Object.entries(results)) {
    const passed = data.visibleTags === 0 && !data.hasArabic && data.englishPhrases.length === 0;
    console.log(`${name}: ${passed ? 'PASS' : 'FAIL'} (tags: ${data.visibleTags}, arabic: ${data.hasArabic}, english: ${data.englishPhrases.length})`);
    if (!passed) allPassed = false;
  }
  console.log(`\nOverall: ${allPassed ? 'ALL PASSED' : 'SOME FAILED'}`);
  
  await browser.close();
})();
