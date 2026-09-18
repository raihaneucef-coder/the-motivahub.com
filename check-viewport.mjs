import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ 
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  await page.goto('https://the-motivahub.com/', { waitUntil: 'load' });
  await page.waitForTimeout(1000);
  
  const viewportInfo = await page.evaluate(() => {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth
    };
  });
  
  console.log('Viewport info:', viewportInfo);
  
  // Check if media query matches
  const mediaQueryResult = await page.evaluate(() => {
    return window.matchMedia('(max-width: 768px)').matches;
  });
  
  console.log('Media query (max-width:768px) matches:', mediaQueryResult);
  
  // Check hero img styles
  const heroImgStyles = await page.evaluate(() => {
    const img = document.querySelector('img.hero-portrait-bg');
    if (!img) return 'not found';
    const styles = window.getComputedStyle(img);
    return {
      position: styles.position,
      left: styles.left,
      width: styles.width,
      maxWidth: styles.maxWidth,
      display: styles.display
    };
  });
  
  console.log('Hero img styles:', heroImgStyles);
  
  await browser.close();
})();
