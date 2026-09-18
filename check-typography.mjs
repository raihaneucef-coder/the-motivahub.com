import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  // Check mobile menu
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('https://the-motivahub.com/', { waitUntil: 'load' });
  await mobilePage.waitForTimeout(1000);
  
  const mobileNav = await mobilePage.evaluate(() => {
    const nav = document.querySelector('.header-nav');
    if (!nav) return 'NOT FOUND';
    const styles = window.getComputedStyle(nav);
    return {
      display: styles.display,
      visibility: styles.visibility
    };
  });
  console.log('Mobile nav:', mobileNav);
  
  // Check author page typography
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const authorPage = await desktopContext.newPage();
  await authorPage.goto('https://the-motivahub.com/fr/author/youssef-raihane/', { waitUntil: 'load' });
  await authorPage.waitForTimeout(1000);
  
  const authorTypography = await authorPage.evaluate(() => {
    const p = document.querySelector('.author-bio-content p');
    if (!p) return 'NOT FOUND';
    const styles = window.getComputedStyle(p);
    return {
      fontFamily: styles.fontFamily,
      fontSize: styles.fontSize,
      lineHeight: styles.lineHeight,
      color: styles.color
    };
  });
  console.log('Author page typography:', authorTypography);
  
  // Check contact page typography
  const contactPage = await desktopContext.newPage();
  await contactPage.goto('https://the-motivahub.com/fr/contact/', { waitUntil: 'load' });
  await contactPage.waitForTimeout(1000);
  
  const contactTypography = await contactPage.evaluate(() => {
    // Get all paragraphs in article-body
    const paragraphs = Array.from(document.querySelectorAll('.article-body .container > p'));
    const first = paragraphs[0];
    const second = paragraphs[1];
    
    return {
      first: first ? {
        class: first.className,
        fontFamily: window.getComputedStyle(first).fontFamily,
        lineHeight: window.getComputedStyle(first).lineHeight
      } : 'NOT FOUND',
      second: second ? {
        class: second.className,
        fontFamily: window.getComputedStyle(second).fontFamily,
        lineHeight: window.getComputedStyle(second).lineHeight
      } : 'NOT FOUND'
    };
  });
  console.log('Contact page typography:', contactTypography);
  
  await browser.close();
})();
