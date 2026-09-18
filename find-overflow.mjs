import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ 
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });
  
  await page.goto('https://the-motivahub.com/', { waitUntil: 'load' });
  await page.waitForTimeout(1000);
  
  const overflowInfo = await page.evaluate(() => {
    const elements = [];
    const allElements = document.querySelectorAll('*');
    
    for (const el of allElements) {
      const rect = el.getBoundingClientRect();
      if (rect.width > window.innerWidth + 1) {
        elements.push({
          tag: el.tagName.toLowerCase(),
          class: el.className,
          id: el.id,
          width: Math.round(rect.width),
          left: Math.round(rect.left),
          right: Math.round(rect.right)
        });
      }
    }
    
    return elements.slice(0, 10);
  });
  
  console.log('Elements causing overflow:');
  overflowInfo.forEach(el => {
    console.log(`  ${el.tag}.${el.class} - width: ${el.width}px, left: ${el.left}px`);
  });
  
  await browser.close();
})();
