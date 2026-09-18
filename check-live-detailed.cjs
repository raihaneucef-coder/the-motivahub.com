const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const results = {};

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    
    // Clear cache and go to French journal
    await page.goto('https://the-motivahub.com/fr/journal/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Check for broken sleep link
    const brokenSleepLink = await page.locator('a[href*="sleep-is-unfair-advantage"]').count();
    
    // Check for correct French sleep link
    const correctSleepLink = await page.locator('a[href*="sommeil-avantage-indefendable"]').count();
    
    // Check page 2 link
    const page2Link = await page.locator('a[href="/fr/journal/page/2/"]').count();
    
    // Get page content to verify
    const content = await page.content();
    const hasBrokenLink = content.includes('sleep-is-unfair-advantage');
    const hasCorrectLink = content.includes('sommeil-avantage-indefendable');

    results[vp.name] = {
      title: await page.title(),
      brokenSleepLinkCount: brokenSleepLink,
      correctSleepLinkCount: correctSleepLink,
      page2LinkCount: page2Link,
      hasBrokenLinkInHTML: hasBrokenLink,
      hasCorrectLinkInHTML: hasCorrectLink,
      url: page.url()
    };

    await page.close();
    await context.close();
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
