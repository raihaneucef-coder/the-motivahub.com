import { chromium } from 'playwright';

const pages = [
  { name: 'homepage', url: 'https://the-motivahub.com/' },
  { name: 'article', url: 'https://the-motivahub.com/journal/2-minute-rule-system/' },
  { name: 'books', url: 'https://the-motivahub.com/books/' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ 
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });
  
  for (const page of pages) {
    console.log(`\n=== ${page.name.toUpperCase()} MOBILE ===`);
    const p = await context.newPage();
    await p.goto(page.url, { waitUntil: 'load' });
    await p.waitForTimeout(1000);
    
    const title = await p.title();
    const h1 = await p.$eval('h1', el => el.textContent?.trim()).catch(() => 'NO H1');
    const headerNav = await p.$('.header-nav').then(el => el ? 'VISIBLE' : 'HIDDEN').catch(() => 'NOT FOUND');
    const bodyWidth = await p.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await p.evaluate(() => window.innerWidth);
    const horizontalScroll = bodyWidth > viewportWidth;
    
    console.log(`  Title: ${title}`);
    console.log(`  H1: ${h1}`);
    console.log(`  Header nav: ${headerNav}`);
    console.log(`  Body overflow: ${horizontalScroll ? 'YES - PROBLEM' : 'NO - OK'}`);
    console.log(`  Body width: ${bodyWidth}px, Viewport: ${viewportWidth}px`);
    
    await p.close();
  }
  
  await browser.close();
})();
