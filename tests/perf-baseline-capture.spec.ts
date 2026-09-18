import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'homepage', url: 'https://the-motivahub.com/' },
  { name: 'journal', url: 'https://the-motivahub.com/journal/' },
  { name: 'guide', url: 'https://the-motivahub.com/guides/atomic-habits-ultimate-guide/' },
];

async function measureVitals(page: any): Promise<any> {
  return page.evaluate(() => {
    return new Promise((resolve) => {
      const data: any = { url: location.href };
      try {
        const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        data.TTFB = Math.round(nav.responseStart - nav.requestStart);
        data.loadEventEnd = Math.round(nav.loadEventEnd);
        data.domContentLoaded = Math.round(nav.domContentLoadedEventEnd);
      } catch (e) {
        data.navError = String(e);
      }

      const seen = new Set<string>();
      const longTasks: number[] = [];
      const obs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint' && !seen.has('FCP')) {
            seen.add('FCP');
            data.FCP = Math.round(entry.startTime);
          }
          if (entry.entryType === 'largest-contentful-paint' && !seen.has('LCP')) {
            seen.add('LCP');
            data.LCP = Math.round(entry.startTime);
            try {
              const el = entry.element as Element | undefined;
              data.lcpTag = el?.tagName || null;
              data.lcpSelector = el ? (el.id ? `#${el.id}` : el.tagName.toLowerCase()) : null;
              if (el) {
                const rect = el.getBoundingClientRect();
                data.lcpRect = { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) };
              }
            } catch (e) {
              data.lcpSelectorError = String(e);
            }
          }
          if (entry.entryType === 'layout-shift' && !seen.has('CLS')) {
            seen.add('CLS');
            data.CLS = Math.round(entry.value * 10000) / 10000;
          }
          if (entry.entryType === 'longtask') {
            longTasks.push(Math.round(entry.duration));
            data.TBT = longTasks.reduce((a, b) => a + b, 0);
            data.longTaskCount = longTasks.length;
            data.longTaskMax = Math.max(...longTasks);
          }
        }
      });

      try {
        obs.observe({ type: 'paint', buffered: true });
        obs.observe({ type: 'layout-shift', buffered: true });
        obs.observe({ type: 'largest-contentful-paint', buffered: true });
        obs.observe({ type: 'longtask', buffered: true });
      } catch (e) {
        data.obsError = String(e);
      }

      setTimeout(() => {
        obs.disconnect();
        resolve(data);
      }, 4000);
    });
  });
}

test.describe('Performance baseline capture', () => {
  for (const page of PAGES) {
    test(`mobile baseline capture - ${page.name}`, async ({ page: p }) => {
      const client = await p.context().newCDPSession(p);
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: 750 * 1024 / 8,
        uploadThroughput: 250 * 1024 / 8,
        latency: 40,
      });

      await p.goto(page.url, { waitUntil: 'load' });
      await p.waitForTimeout(500);

      const vitals = await measureVitals(p);
      console.log(`[baseline] mobile ${page.name}`, JSON.stringify(vitals, null, 2));
    });

    test(`desktop baseline capture - ${page.name}`, async ({ page: p }) => {
      await p.goto(page.url, { waitUntil: 'load' });
      await p.waitForTimeout(500);

      const vitals = await measureVitals(p);
      console.log(`[baseline] desktop ${page.name}`, JSON.stringify(vitals, null, 2));
    });
  }
});
