import { chromium } from 'playwright';

const pages = [
  { name: 'homepage', url: 'https://the-motivahub.com/' },
  { name: 'journal', url: 'https://the-motivahub.com/journal/' },
  { name: 'article', url: 'https://the-motivahub.com/journal/2-minute-rule-system/' },
  { name: 'books', url: 'https://the-motivahub.com/books/' },
  { name: 'about', url: 'https://the-motivahub.com/about/' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  for (const page of pages) {
    console.log(`\n=== ${page.name.toUpperCase()} ===`);
    const p = await context.newPage();
    await p.goto(page.url, { waitUntil: 'load' });
    await p.waitForTimeout(1000);
    
    // Check SEO
    const title = await p.title();
    const description = await p.getAttribute('meta[name="description"]', 'content');
    const h1 = await p.$eval('h1', el => el.textContent?.trim()).catch(() => 'NO H1');
    const h2s = await p.$$eval('h2', els => els.map(e => e.textContent?.trim()).filter(Boolean)).catch(() => []);
    const canonical = await p.getAttribute('link[rel="canonical"]', 'href').catch(() => 'NO CANONICAL');
    const hreflangs = await p.$$eval('link[rel="alternate"][hreflang]', els => els.map(e => e.getAttribute('hreflang'))).catch(() => []);
    
    // Check nav
    const headerNav = await p.$('.header-nav').then(el => el ? 'VISIBLE' : 'HIDDEN').catch(() => 'NOT FOUND');
    const menuBtn = await p.$('#menu-btn').then(el => el ? 'PRESENT' : 'MISSING').catch(() => 'NOT FOUND');
    
    // Check images
    const images = await p.$$eval('img', imgs => imgs.map(i => ({
      src: i.src,
      alt: i.alt || 'NO ALT',
      width: i.width,
      height: i.height
    })));
    
    // Check layout
    const bodyWidth = await p.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await p.evaluate(() => window.innerWidth);
    const horizontalScroll = bodyWidth > viewportWidth;
    
    console.log(`  Title: ${title}`);
    console.log(`  Description: ${description ? description.substring(0, 100) + '...' : 'MISSING'}`);
    console.log(`  H1: ${h1}`);
    console.log(`  H2s: ${h2s.length} found`);
    console.log(`  Canonical: ${canonical}`);
    console.log(`  Hreflangs: ${hreflangs.join(', ') || 'NONE'}`);
    console.log(`  Header nav: ${headerNav}`);
    console.log(`  Menu button: ${menuBtn}`);
    console.log(`  Images: ${images.length} found`);
    console.log(`  Body overflow: ${horizontalScroll ? 'YES - PROBLEM' : 'NO - OK'}`);
    console.log(`  Body width: ${bodyWidth}px, Viewport: ${viewportWidth}px`);
    
    await p.close();
  }
  
  await browser.close();
})();
