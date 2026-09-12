import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function testBackNavigation() {
  console.log('\n=== BACK NAVIGATION TEST WITH PROPER HISTORY ===\n');
  const browser = await chromium.launch({ headless: true });
  
  // Desktop test
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const desktopPage = await desktopContext.newPage();
  
  console.log('--- Desktop: Journal → Article → Back ---');
  await desktopPage.goto(`${BASE_URL}/journal/`);
  await desktopPage.waitForTimeout(1000);
  
  const journalTitle = await desktopPage.title();
  console.log(`  Journal page loaded: ${journalTitle}`);
  
  await desktopPage.click('a[href="/journal/discipline-vs-punishment/"]');
  await desktopPage.waitForTimeout(1000);
  
  const articleVisible = await desktopPage.locator('img.article-img').isVisible();
  console.log(`  Article image visible: ${articleVisible}`);
  
  await desktopPage.goBack();
  await desktopPage.waitForTimeout(1000);
  
  const backUrl = desktopPage.url();
  const backTitle = await desktopPage.title();
  const bodyBg = await desktopPage.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    const overlay = document.getElementById('overlay-menu');
    return {
      url: window.location.href,
      title: document.title,
      bodyBg: window.getComputedStyle(body).backgroundColor,
      htmlBg: window.getComputedStyle(html).backgroundColor,
      overlayOpen: overlay ? overlay.classList.contains('open') : null,
      bodyOverflow: window.getComputedStyle(body).overflow
    };
  });
  
  console.log(`  Back URL: ${backUrl}`);
  console.log(`  Back title: ${backTitle}`);
  console.log(`  Body background: ${bodyBg.bodyBg}`);
  console.log(`  HTML background: ${bodyBg.htmlBg}`);
  console.log(`  Overlay open: ${bodyBg.overlayOpen}`);
  
  const isBlack = bodyBg.bodyBg === 'rgb(0, 0, 0)' || bodyBg.htmlBg === 'rgb(0, 0, 0)';
  const overlayOpen = bodyBg.overlayOpen === true;
  
  if (isBlack || overlayOpen) {
    console.log(`  ❌ BLACK PAGE OR OVERLAY STUCK ON DESKTOP`);
  } else {
    console.log(`  ✅ BACK NORMAL ON DESKTOP`);
  }
  
  // Mobile test
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileContext.newPage();
  
  console.log('\n--- Mobile: Journal → Article → Back ---');
  await mobilePage.goto(`${BASE_URL}/journal/`);
  await mobilePage.waitForTimeout(1000);
  
  await mobilePage.click('a[href="/journal/discipline-vs-punishment/"]');
  await mobilePage.waitForTimeout(1000);
  
  const mobileImgVisible = await mobilePage.locator('img.article-img').isVisible();
  console.log(`  Article image visible: ${mobileImgVisible}`);
  
  await mobilePage.goBack();
  await mobilePage.waitForTimeout(1000);
  
  const mobileBack = await mobilePage.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    const overlay = document.getElementById('overlay-menu');
    return {
      url: window.location.href,
      bodyBg: window.getComputedStyle(body).backgroundColor,
      htmlBg: window.getComputedStyle(html).backgroundColor,
      overlayOpen: overlay ? overlay.classList.contains('open') : null
    };
  });
  
  console.log(`  Back URL: ${mobileBack.url}`);
  console.log(`  Body background: ${mobileBack.bodyBg}`);
  console.log(`  Overlay open: ${mobileBack.overlayOpen}`);
  
  const mobileIsBlack = mobileBack.bodyBg === 'rgb(0, 0, 0)' || mobileBack.htmlBg === 'rgb(0, 0, 0)';
  const mobileOverlayOpen = mobileBack.overlayOpen === true;
  
  if (mobileIsBlack || mobileOverlayOpen) {
    console.log(`  ❌ BLACK PAGE OR OVERLAY STUCK ON MOBILE`);
  } else {
    console.log(`  ✅ BACK NORMAL ON MOBILE`);
  }
  
  await browser.close();
}

async function main() {
  console.log('Starting back navigation tests...');
  await testBackNavigation();
  console.log('\nTests complete.');
}

main().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
