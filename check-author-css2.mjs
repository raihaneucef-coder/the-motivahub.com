import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://the-motivahub.com/fr/author/youssef-raihane/', { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  const cssInfo = await page.evaluate(() => {
    const p = document.querySelector('.author-bio-content p');
    if (!p) return 'NOT FOUND';
    
    const styles = window.getComputedStyle(p);
    
    // Find all matching rules
    const sheets = Array.from(document.styleSheets);
    const rules = [];
    for (const sheet of sheets) {
      try {
        const cssRules = Array.from(sheet.cssRules || []);
        for (const rule of cssRules) {
          if (rule.selectorText && p.matches(rule.selectorText)) {
            rules.push({
              selector: rule.selectorText,
              cssText: rule.cssText
            });
          }
        }
      } catch (e) {
        // CORS error
      }
    }
    
    return {
      fontFamily: styles.fontFamily,
      matchingRules: rules
    };
  });

  console.log('Author page CSS info:', JSON.stringify(cssInfo, null, 2));
  await browser.close();
})();
