import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';
const ARTICLES = [
  'discipline-vs-punishment',
  'identity-challenge-7-days',
  'missed-day-protocol',
  'morning-routines-12-tested',
  'morning-vs-night',
  'two-minute-rule-guide',
  'detox-numerique',
  'art-dire-non',
  'slow-productivity-30-day-test'
];

async function testDesktop() {
  console.log('\n=== DESKTOP TESTS ===\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  for (const slug of ARTICLES) {
    console.log(`\n--- Testing: ${slug} ---`);
    
    await page.goto(`${BASE_URL}/journal/${slug}/`);
    await page.waitForTimeout(1000);
    
    const img = page.locator('img.article-img').first();
    const isVisible = await img.isVisible();
    const bbox = await img.boundingBox();
    const src = await img.getAttribute('src');
    
    console.log(`  Image visible: ${isVisible}`);
    console.log(`  Image src: ${src}`);
    console.log(`  Image bbox: ${bbox ? JSON.stringify(bbox) : 'null'}`);
    
    if (!isVisible || !bbox || bbox.width === 0 || bbox.height === 0) {
      console.log(`  ❌ IMAGE NOT VISIBLE`);
    } else {
      console.log(`  ✅ IMAGE VISIBLE`);
    }
    
    await page.goBack();
    await page.waitForTimeout(500);
    
    const bodyBg = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      const overlay = document.getElementById('overlay-menu');
      return {
        bodyBg: window.getComputedStyle(body).backgroundColor,
        htmlBg: window.getComputedStyle(html).backgroundColor,
        overlayOpen: overlay ? overlay.classList.contains('open') : null,
        bodyOverflow: window.getComputedStyle(body).overflow,
        url: window.location.href
      };
    });
    
    console.log(`  Back URL: ${bodyBg.url}`);
    console.log(`  Body background: ${bodyBg.bodyBg}`);
    console.log(`  HTML background: ${bodyBg.htmlBg}`);
    console.log(`  Overlay open: ${bodyBg.overlayOpen}`);
    console.log(`  Body overflow: ${bodyBg.bodyOverflow}`);
    
    const isBlack = bodyBg.bodyBg === 'rgb(0, 0, 0)' || bodyBg.htmlBg === 'rgb(0, 0, 0)' || 
                    bodyBg.bodyBg === 'rgba(0, 0, 0, 0)' || bodyBg.htmlBg === 'rgba(0, 0, 0, 0)';
    const overlayOpen = bodyBg.overlayOpen === true;
    
    if (isBlack || overlayOpen) {
      console.log(`  ❌ BLACK PAGE OR OVERLAY STUCK`);
    } else {
      console.log(`  ✅ BACK NORMAL`);
    }
  }
  
  await browser.close();
}

async function testMobile() {
  console.log('\n=== MOBILE TESTS ===\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  
  for (const slug of ARTICLES.slice(0, 3)) {
    console.log(`\n--- Testing mobile: ${slug} ---`);
    
    await page.goto(`${BASE_URL}/journal/${slug}/`);
    await page.waitForTimeout(1000);
    
    const img = page.locator('img.article-img').first();
    const isVisible = await img.isVisible();
    const bbox = await img.boundingBox();
    const src = await img.getAttribute('src');
    
    console.log(`  Image visible: ${isVisible}`);
    console.log(`  Image src: ${src}`);
    console.log(`  Image bbox: ${bbox ? JSON.stringify(bbox) : 'null'}`);
    
    if (!isVisible || !bbox || bbox.width === 0 || bbox.height === 0) {
      console.log(`  ❌ IMAGE NOT VISIBLE ON MOBILE`);
    } else {
      console.log(`  ✅ IMAGE VISIBLE ON MOBILE`);
    }
    
    await page.goBack();
    await page.waitForTimeout(500);
    
    const bodyBg = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      const overlay = document.getElementById('overlay-menu');
      return {
        bodyBg: window.getComputedStyle(body).backgroundColor,
        htmlBg: window.getComputedStyle(html).backgroundColor,
        overlayOpen: overlay ? overlay.classList.contains('open') : null,
        bodyOverflow: window.getComputedStyle(body).overflow,
        url: window.location.href
      };
    });
    
    console.log(`  Back URL: ${bodyBg.url}`);
    console.log(`  Body background: ${bodyBg.bodyBg}`);
    console.log(`  HTML background: ${bodyBg.htmlBg}`);
    console.log(`  Overlay open: ${bodyBg.overlayOpen}`);
    console.log(`  Body overflow: ${bodyBg.bodyOverflow}`);
    
    const isBlack = bodyBg.bodyBg === 'rgb(0, 0, 0)' || bodyBg.htmlBg === 'rgb(0, 0, 0)' || 
                    bodyBg.bodyBg === 'rgba(0, 0, 0, 0)' || bodyBg.htmlBg === 'rgba(0, 0, 0, 0)';
    const overlayOpen = bodyBg.overlayOpen === true;
    
    if (isBlack || overlayOpen) {
      console.log(`  ❌ BLACK PAGE OR OVERLAY STUCK ON MOBILE`);
    } else {
      console.log(`  ✅ BACK NORMAL ON MOBILE`);
    }
  }
  
  await browser.close();
}

async function testMenuNavigation() {
  console.log('\n=== MOBILE MENU NAVIGATION TEST ===\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  
  await page.goto(`${BASE_URL}/journal/`);
  await page.waitForTimeout(1000);
  
  const menuBtn = page.locator('#menu-btn');
  await menuBtn.click();
  await page.waitForTimeout(500);
  
  const overlayOpenBefore = await page.evaluate(() => {
    const overlay = document.getElementById('overlay-menu');
    return overlay ? overlay.classList.contains('open') : false;
  });
  console.log(`  Overlay open after click: ${overlayOpenBefore}`);
  
  const journalLink = page.locator('#overlay-menu a[href="/journal/"]').first();
  await journalLink.click();
  await page.waitForTimeout(1000);
  
  const overlayOpenAfter = await page.evaluate(() => {
    const overlay = document.getElementById('overlay-menu');
    return overlay ? overlay.classList.contains('open') : false;
  });
  console.log(`  Overlay open after navigation: ${overlayOpenAfter}`);
  
  const bodyBg = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  console.log(`  Body background after nav: ${bodyBg}`);
  
  if (overlayOpenAfter || bodyBg === 'rgb(0, 0, 0)') {
    console.log(`  ❌ MENU OVERLAY STUCK AFTER NAVIGATION`);
  } else {
    console.log(`  ✅ MENU CLOSED AFTER NAVIGATION`);
  }
  
  await browser.close();
}

async function main() {
  console.log('Starting automated browser tests...');
  await testDesktop();
  await testMobile();
  await testMenuNavigation();
  console.log('\nTests complete.');
}

main().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
