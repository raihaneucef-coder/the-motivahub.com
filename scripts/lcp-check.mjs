// Measure mobile LCP (web-vitals) on live pages, throttled like PageSpeed.
import { chromium } from 'playwright';
const targets = process.argv.slice(2).length ? process.argv.slice(2) : [
  'https://the-motivahub.com/',
  'https://the-motivahub.com/books/',
  'https://the-motivahub.com/journal/',
];
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 412, height: 915 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
const client = await ctx.newCDPSession(page);
await client.send('Network.enable');
await client.send('Network.emulateNetworkConditions', {
  offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8,
});
await page.addInitScript(() => {
  window.__lcp = 0; window.__lcpEl = '';
  new PerformanceObserver((l) => {
    const e = l.getEntries().pop();
    if (e && e.startTime > window.__lcp) {
      window.__lcp = e.startTime;
      window.__lcpEl = (e.element?.tagName || '') + '.' + (e.element?.className || '') + ' ' + (e.element?.currentSrc || e.element?.src || '').split('/').pop();
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });
});
for (const url of targets) {
  await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch((e) => console.log('  load error', e.message));
  await page.waitForTimeout(3500);
  const { lcp, el } = await page.evaluate(() => ({ lcp: Math.round(window.__lcp), el: window.__lcpEl }));
  console.log(`${url}\n   LCP=${lcp}ms  element=${el}`);
}
await browser.close();
