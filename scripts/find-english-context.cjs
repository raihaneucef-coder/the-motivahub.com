const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/journal/');
  await page.waitForTimeout(500);
  await page.click('[data-lang="fr"]');
  await page.waitForTimeout(2000);
  
  const frText = await page.$eval('body', el => el.textContent);
  
  // Find context around each English phrase
  const phrases = ['Get in Touch', 'We would love to hear from you', 'For collaborations', 'What to Expect', 'Follow', 'Stay connected', 'Featured'];
  for (const phrase of phrases) {
    const idx = frText.indexOf(phrase);
    if (idx !== -1) {
      const context = frText.substring(Math.max(0, idx - 50), idx + phrase.length + 50);
      console.log(`"${phrase}" found at index ${idx}:`);
      console.log(`  Context: ...${context}...`);
    }
  }
  
  await browser.close();
})();
