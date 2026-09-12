import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

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

const SCREENSHOT_DIR = '/Users/youssefraihane/Documents/the-motivahub.com/.pilot-staging/screenshots';
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

function printSeparator() {
  console.log('\n' + '='.repeat(70));
}

async function captureEvidence(page, label) {
  const evidence = await page.evaluate(() => {
    const img = document.querySelector('img.article-img');
    const overlay = document.getElementById('overlay-menu');
    const body = document.body;
    const html = document.documentElement;
    
    const imgStyles = img ? window.getComputedStyle(img) : null;
    const imgRect = img ? img.getBoundingClientRect() : null;
    
    return {
      url: window.location.href,
      title: document.title,
      imageSrc: img ? img.getAttribute('src') : null,
      imageAlt: img ? img.getAttribute('alt') : null,
      imageVisible: img ? img.offsetWidth > 0 && img.offsetHeight > 0 : false,
      imageBoundingBox: imgRect ? {
        x: imgRect.x,
        y: imgRect.y,
        width: imgRect.width,
        height: imgRect.height
      } : null,
      imageComputed: imgStyles ? {
        display: imgStyles.display,
        visibility: imgStyles.visibility,
        opacity: imgStyles.opacity,
        position: imgStyles.position,
        zIndex: imgStyles.zIndex,
        width: imgStyles.width,
        height: imgStyles.height
      } : null,
      overlayExists: !!overlay,
      overlayOpen: overlay ? overlay.classList.contains('open') : null,
      overlayStyles: overlay ? window.getComputedStyle(overlay) : null,
      bodyBackground: window.getComputedStyle(body).backgroundColor,
      bodyOverflow: window.getComputedStyle(body).overflow,
      htmlBackground: window.getComputedStyle(html).backgroundColor
    };
  });
  
  console.log(`\n[EVIDENCE] ${label}`);
  console.log(`  URL: ${evidence.url}`);
  console.log(`  Title: ${evidence.title}`);
  console.log(`  Image src: ${evidence.imageSrc}`);
  console.log(`  Image alt: ${evidence.imageAlt}`);
  console.log(`  Image visible: ${evidence.imageVisible}`);
  console.log(`  Image bbox: ${evidence.imageBoundingBox ? `${evidence.imageBoundingBox.width}x${evidence.imageBoundingBox.height} at (${evidence.imageBoundingBox.x}, ${evidence.imageBoundingBox.y})` : 'null'}`);
  if (evidence.imageComputed) {
    console.log(`  Image computed:`);
    console.log(`    display: ${evidence.imageComputed.display}`);
    console.log(`    visibility: ${evidence.imageComputed.visibility}`);
    console.log(`    opacity: ${evidence.imageComputed.opacity}`);
    console.log(`    position: ${evidence.imageComputed.position}`);
    console.log(`    z-index: ${evidence.imageComputed.zIndex}`);
    console.log(`    width: ${evidence.imageComputed.width}`);
    console.log(`    height: ${evidence.imageComputed.height}`);
  }
  console.log(`  Overlay exists: ${evidence.overlayExists}`);
  console.log(`  Overlay open: ${evidence.overlayOpen}`);
  if (evidence.overlayStyles) {
    console.log(`  Overlay computed:`);
    console.log(`    display: ${evidence.overlayStyles.display}`);
    console.log(`    visibility: ${evidence.overlayStyles.visibility}`);
    console.log(`    opacity: ${evidence.overlayStyles.opacity}`);
    console.log(`    transform: ${evidence.overlayStyles.transform}`);
    console.log(`    background: ${evidence.overlayStyles.background}`);
    console.log(`    z-index: ${evidence.overlayStyles.zIndex}`);
  }
  console.log(`  Body background: ${evidence.bodyBackground}`);
  console.log(`  Body overflow: ${evidence.bodyOverflow}`);
  console.log(`  HTML background: ${evidence.htmlBackground}`);
  
  return evidence;
}

async function runDesktopTests() {
  printSeparator();
  console.log('DESKTOP TESTS');
  printSeparator();
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  
  for (const slug of ARTICLES) {
    console.log(`\n>>> ARTICLE: ${slug}`);
    
    const journalUrl = `${BASE_URL}/journal/`;
    await page.goto(journalUrl);
    await page.waitForTimeout(1000);
    
    console.log(`  [1] Journal URL: ${page.url()}`);
    console.log(`  [2] Journal title: ${await page.title()}`);
    
    const articleLink = `a[href="/journal/${slug}/"]`;
    await page.click(articleLink);
    await page.waitForTimeout(1500);
    
    console.log(`  [3] Clicked article link`);
    console.log(`  [4] Article URL: ${page.url()}`);
    console.log(`  [5] Article title: ${await page.title()}`);
    
    const evidenceBefore = await captureEvidence(page, `BEFORE BACK - ${slug}`);
    
    const screenshotPath = path.join(SCREENSHOT_DIR, `desktop-${slug}-before-back.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  Screenshot: ${screenshotPath}`);
    
    await page.goBack();
    await page.waitForTimeout(1500);
    
    console.log(`  [6] After Back URL: ${page.url()}`);
    console.log(`  [7] After Back title: ${await page.title()}`);
    
    const evidenceAfter = await captureEvidence(page, `AFTER BACK - ${slug}`);
    
    const backScreenshotPath = path.join(SCREENSHOT_DIR, `desktop-${slug}-after-back.png`);
    await page.screenshot({ path: backScreenshotPath, fullPage: true });
    console.log(`  Screenshot: ${backScreenshotPath}`);
    
    const isBlack = evidenceAfter.bodyBackground === 'rgb(0, 0, 0)' || 
                    evidenceAfter.htmlBackground === 'rgb(0, 0, 0)' ||
                    evidenceAfter.overlayOpen === true;
    
    if (isBlack) {
      console.log(`  ❌ RESULT: BLACK PAGE OR OVERLAY STUCK`);
    } else {
      console.log(`  ✅ RESULT: BACK NORMAL`);
    }
  }
  
  await browser.close();
}

async function runMobileTests() {
  printSeparator();
  console.log('MOBILE TESTS');
  printSeparator();
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  
  for (const slug of ARTICLES.slice(0, 3)) {
    console.log(`\n>>> MOBILE ARTICLE: ${slug}`);
    
    const journalUrl = `${BASE_URL}/journal/`;
    await page.goto(journalUrl);
    await page.waitForTimeout(1000);
    
    console.log(`  [1] Journal URL: ${page.url()}`);
    
    const articleLink = `a[href="/journal/${slug}/"]`;
    await page.click(articleLink);
    await page.waitForTimeout(1500);
    
    console.log(`  [2] Article URL: ${page.url()}`);
    
    const evidenceBefore = await captureEvidence(page, `MOBILE BEFORE BACK - ${slug}`);
    
    const screenshotPath = path.join(SCREENSHOT_DIR, `mobile-${slug}-before-back.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  Screenshot: ${screenshotPath}`);
    
    await page.goBack();
    await page.waitForTimeout(1500);
    
    console.log(`  [3] After Back URL: ${page.url()}`);
    
    const evidenceAfter = await captureEvidence(page, `MOBILE AFTER BACK - ${slug}`);
    
    const backScreenshotPath = path.join(SCREENSHOT_DIR, `mobile-${slug}-after-back.png`);
    await page.screenshot({ path: backScreenshotPath, fullPage: true });
    console.log(`  Screenshot: ${backScreenshotPath}`);
    
    const isBlack = evidenceAfter.bodyBackground === 'rgb(0, 0, 0)' || 
                    evidenceAfter.htmlBackground === 'rgb(0, 0, 0)' ||
                    evidenceAfter.overlayOpen === true;
    
    if (isBlack) {
      console.log(`  ❌ RESULT: BLACK PAGE OR OVERLAY STUCK ON MOBILE`);
    } else {
      console.log(`  ✅ RESULT: BACK NORMAL ON MOBILE`);
    }
  }
  
  await browser.close();
}

async function runMobileMenuTest() {
  printSeparator();
  console.log('MOBILE MENU NAVIGATION TEST');
  printSeparator();
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  
  await page.goto(`${BASE_URL}/journal/`);
  await page.waitForTimeout(1000);
  
  console.log(`  [1] Initial URL: ${page.url()}`);
  
  const menuBtn = page.locator('#menu-btn');
  await menuBtn.click();
  await page.waitForTimeout(1000);
  
  const overlayBefore = await page.evaluate(() => {
    const overlay = document.getElementById('overlay-menu');
    return {
      open: overlay ? overlay.classList.contains('open') : false,
      bodyOverflow: window.getComputedStyle(document.body).overflow
    };
  });
  console.log(`  [2] Overlay open after menu click: ${overlayBefore.open}`);
  console.log(`  [3] Body overflow after menu click: ${overlayBefore.bodyOverflow}`);
  
  const menuScreenshotPath = path.join(SCREENSHOT_DIR, 'mobile-menu-open.png');
  await page.screenshot({ path: menuScreenshotPath, fullPage: true });
  console.log(`  Screenshot: ${menuScreenshotPath}`);
  
  await page.click('#overlay-menu a[href="/journal/"] span');
  await page.waitForTimeout(1500);
  
  console.log(`  [4] After clicking nested span in menu link`);
  console.log(`  [5] Destination URL: ${page.url()}`);
  
  const overlayAfter = await page.evaluate(() => {
    const overlay = document.getElementById('overlay-menu');
    const body = document.body;
    return {
      open: overlay ? overlay.classList.contains('open') : false,
      bodyBackground: window.getComputedStyle(body).backgroundColor,
      bodyOverflow: window.getComputedStyle(body).overflow
    };
  });
  console.log(`  [6] Overlay open after navigation: ${overlayAfter.open}`);
  console.log(`  [7] Body background after navigation: ${overlayAfter.bodyBackground}`);
  console.log(`  [8] Body overflow after navigation: ${overlayAfter.bodyOverflow}`);
  
  const navScreenshotPath = path.join(SCREENSHOT_DIR, 'mobile-menu-after-nav.png');
  await page.screenshot({ path: navScreenshotPath, fullPage: true });
  console.log(`  Screenshot: ${navScreenshotPath}`);
  
  if (overlayAfter.open || overlayAfter.bodyBackground === 'rgb(0, 0, 0)') {
    console.log(`  ❌ RESULT: MENU OVERLAY STUCK AFTER NAVIGATION`);
  } else {
    console.log(`  ✅ RESULT: MENU CLOSED AFTER NAVIGATION`);
  }
  
  await browser.close();
}

async function main() {
  console.log('Starting comprehensive Playwright browser tests...');
  console.log('Dev server should be running at http://localhost:4321');
  
  try {
    await runDesktopTests();
    await runMobileTests();
    await runMobileMenuTest();
    
    printSeparator();
    console.log('ALL TESTS COMPLETE');
    console.log(`Screenshots saved to: ${SCREENSHOT_DIR}`);
    printSeparator();
  } catch (e) {
    console.error('Test error:', e);
    process.exit(1);
  }
}

main();
