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

async function testAllArticles() {
  console.log('\n=== COMPREHENSIVE ARTICLE TESTS ===\n');
  const browser = await chromium.launch({ headless: true });
  
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  
  let allPassed = true;
  
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
    console.log(`  Image bbox: ${bbox ? `${bbox.width}x${bbox.height}` : 'null'}`);
    
    if (!isVisible || !bbox || bbox.width === 0 || bbox.height === 0) {
      console.log(`  ❌ IMAGE NOT VISIBLE`);
      allPassed = false;
    } else {
      console.log(`  ✅ IMAGE VISIBLE`);
    }
    
    await page.goBack();
    await page.waitForTimeout(500);
    
    const backUrl = page.url();
    const bodyBg = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      const overlay = document.getElementById('overlay-menu');
      return {
        url: window.location.href,
        bodyBg: window.getComputedStyle(body).backgroundColor,
        overlayOpen: overlay ? overlay.classList.contains('open') : false
      };
    });
    
    console.log(`  Back URL: ${backUrl}`);
    console.log(`  Body background: ${bodyBg.bodyBg}`);
    console.log(`  Overlay open: ${bodyBg.overlayOpen}`);
    
    const isBlack = bodyBg.bodyBg === 'rgb(0, 0, 0)';
    const overlayOpen = bodyBg.overlayOpen === true;
    
    if (isBlack || overlayOpen) {
      console.log(`  ❌ BLACK PAGE OR OVERLAY STUCK`);
      allPassed = false;
    } else {
      console.log(`  ✅ BACK NORMAL`);
    }
  }
  
  await browser.close();
  
  console.log('\n=== OVERALL RESULT ===');
  if (allPassed) {
    console.log('✅ ALL TESTS PASSED');
  } else {
    console.log('❌ SOME TESTS FAILED');
  }
}

async function main() {
  console.log('Starting comprehensive article tests...');
  await testAllArticles();
}

main().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
