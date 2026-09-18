const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const results = {
    deployment: '1a8d16c',
    message: 'feat(vercel): add cache-control headers and fix deployment storage issue',
    cacheHeaders: {
      html: 'public, max-age=0, s-maxage=60, stale-while-revalidate=30',
      images: 'public, max-age=31536000, immutable'
    },
    tests: {}
  };

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    
    await page.goto('https://the-motivahub.com/fr/journal/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    const title = await page.title();
    const html = await page.content();
    const currentUrl = page.url();
    
    const brokenSleepLinks = await page.locator('a[href*="sleep-is-unfair-advantage"]').count();
    const correctSleepLinks = await page.locator('a[href*="sommeil-avantage-indefendable"]').count();
    const page2Links = await page.locator('a[href="/fr/journal/page/2/"]').count();
    const articleLinks = await page.locator('a[href*="/fr/journal/"]').count();
    
    const hasBrokenInHTML = html.includes('sleep-is-unfair-advantage');
    const hasCorrectInHTML = html.includes('sommeil-avantage-indefendable');

    results.tests[vp.name] = {
      title,
      currentUrl,
      articleLinksCount: articleLinks,
      brokenSleepLinks,
      correctSleepLinks,
      page2Links,
      hasBrokenSlugInHTML: hasBrokenInHTML,
      hasCorrectSlugInHTML: hasCorrectInHTML
    };

    await page.close();
    await context.close();
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
