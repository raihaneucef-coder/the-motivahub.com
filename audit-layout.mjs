import { chromium } from 'playwright';

const pages = [
  { name: 'homepage', url: 'http://localhost:4321/' },
  { name: 'article', url: 'http://localhost:4321/journal/2-minute-rule-system/' },
  { name: 'books', url: 'http://localhost:4321/books/' },
];

async function audit() {
  const browser = await chromium.launch();
  const results = {};

  for (const pageInfo of pages) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const consoleErrors = [];
    const consoleWarnings = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
      if (msg.type() === 'warning') consoleWarnings.push(msg.text());
    });

    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 });

    const cssErrors = await page.evaluate(() => {
      const errors = [];
      const sheets = Array.from(document.styleSheets);
      for (const sheet of sheets) {
        try {
          Array.from(sheet.cssRules).forEach(() => {});
        } catch (e) {
          errors.push(`CSS error in ${sheet.href || 'inline'}: ${e.message}`);
        }
      }
      return errors;
    });

    const metrics = await page.evaluate(() => {
      const get = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return {
          width: rect.width,
          height: rect.height,
          maxWidth: style.maxWidth,
          display: style.display,
          gridTemplateColumns: style.gridTemplateColumns,
          objectFit: style.objectFit,
        };
      };

      const heroImg = document.querySelector('img.hero-portrait-bg');
      const heroImgMetrics = heroImg ? {
        width: heroImg.getBoundingClientRect().width,
        height: heroImg.getBoundingClientRect().height,
        naturalWidth: heroImg.naturalWidth,
        naturalHeight: heroImg.naturalHeight,
        complete: heroImg.complete,
        src: heroImg.src,
      } : null;

      return {
        heroImg: heroImgMetrics,
        container: get('.container'),
        articleBody: get('.article-body'),
        bookCard: get('.book-card'),
        bookCover: get('.book-cover'),
        headerNav: get('.header-nav'),
        logoLink: document.querySelector('.logo-text')?.tagName,
      };
    });

    const brokenImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).filter(img => !img.complete || img.naturalWidth === 0).map(img => ({
        src: img.src,
        alt: img.alt,
        className: img.className,
      }));
    });

    results[pageInfo.name] = {
      url: pageInfo.url,
      consoleErrors,
      consoleWarnings,
      cssErrors,
      metrics,
      brokenImages,
    };

    await page.screenshot({ path: `/tmp/${pageInfo.name}-full.png`, fullPage: true });
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

audit().catch(console.error);
