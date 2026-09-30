import { test, expect } from '@playwright/test';

// GA4 Key Events live verification on production
// Tests that the 3 conversion events actually fire in the dataLayer

test.describe('GA4 Key Events — live verification', () => {

  test('newsletter_signup fires on form submit', async ({ page }) => {
    // Use a page with the AJAX NewsletterSection (not the footer native-POST form)
    await page.goto('https://the-motivahub.com/fr/guides/atomic-habits-ultimate-guide/');
    const btn = page.locator('.cookie-accept');
    if (await btn.isVisible({ timeout: 5000 }).catch(() => false)) await btn.click();
    await page.waitForTimeout(1000);

    // Intercept dataLayer pushes BEFORE triggering the event
    const events: any[] = await page.evaluate(() => {
      return new Promise((resolve) => {
        const collected: any[] = [];
        const dl = (window as any).dataLayer;
        if (dl) {
          const origPush = dl.push.bind(dl);
          dl.push = function (...args: any[]) {
            collected.push(args);
            return origPush(...args);
          };
        }
        // Fill and submit newsletter AJAX form (NewsletterSection)
        const emailInput = document.querySelector('.newsletter-form input[type="email"]') as HTMLInputElement;
        const form = emailInput?.closest('form') as HTMLFormElement;
        if (emailInput && form) {
          emailInput.value = 'test.verify+ga4@example.com';
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
        // Wait for AJAX response
        setTimeout(() => resolve(collected), 6000);
      });
    });

    // gtag calls dataLayer.push(arguments) — args = [argumentsObj]
    // Search JSON stringified for the event name
    const allJson = JSON.stringify(events);
    expect(allJson.includes('newsletter_signup'), 'newsletter_signup in dataLayer').toBeTruthy();
    console.log('✅ newsletter_signup confirmed in dataLayer');
  });

  test('book_affiliate_click fires when clicking book link', async ({ page }) => {
    await page.goto('https://the-motivahub.com/fr/best/books/');
    const btn = page.locator('.cookie-accept');
    if (await btn.isVisible({ timeout: 5000 }).catch(() => false)) await btn.click();
    await page.waitForTimeout(1000);

    // Intercept dataLayer
    const events: any[] = await page.evaluate(() => {
      return new Promise((resolve) => {
        const collected: any[] = [];
        const dl = (window as any).dataLayer;
        if (dl) {
          const origPush = dl.push.bind(dl);
          dl.push = function (...args: any[]) {
            collected.push(args);
            return origPush(...args);
          };
        }
        // Find affiliate book link and click
        const link = document.querySelector('a[data-book-id]') as HTMLElement;
        if (link) link.click();
        setTimeout(() => resolve(collected), 2000);
      });
    });

    // gtag calls dataLayer.push(arguments) — search JSON for event name
    const allJson = JSON.stringify(events);
    expect(allJson.includes('book_affiliate_click'), 'book_affiliate_click in dataLayer').toBeTruthy();
    console.log('✅ book_affiliate_click confirmed in dataLayer');
  });

  test('quiz_completed fires on quiz end', async ({ page }) => {
    await page.goto('https://the-motivahub.com/fr/tools/discipline-quiz/');
    const btn = page.locator('.cookie-accept');
    if (await btn.isVisible({ timeout: 5000 }).catch(() => false)) await btn.click();
    await page.waitForTimeout(1000);

    // Set up collector in browser context
    await page.evaluate(() => {
      (window as any).__ga4collected = [];
      const dl = (window as any).dataLayer;
      if (dl) {
        const origPush = dl.push.bind(dl);
        dl.push = function (...args: any[]) {
          (window as any).__ga4collected.push(JSON.stringify(args));
          return origPush(...args);
        };
      }
    });

    // Click through quiz: select first option each time, then click Next
    for (let i = 0; i < 15; i++) {
      const option = page.locator('.quiz-option').first();
      if (await option.isVisible({ timeout: 2000 }).catch(() => false)) {
        await option.click();
        await page.waitForTimeout(200);
        const nextBtn = page.locator('#quiz-next');
        if (await nextBtn.isEnabled({ timeout: 1000 }).catch(() => false)) {
          await nextBtn.click();
          await page.waitForTimeout(400);
        }
      } else {
        break;
      }
    }
    // Check for results/submit button
    const resultsBtn = page.locator('.quiz-btn-primary');
    if (await resultsBtn.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await resultsBtn.first().click();
      await page.waitForTimeout(1000);
    }

    const collected: string[] = await page.evaluate(() => (window as any).__ga4collected || []);
    const quizHit = collected.find((c: string) => c.includes('quiz_completed'));
    if (quizHit) {
      console.log('✅ quiz_completed fired:', quizHit);
    } else {
      console.log('⚠️ quiz_completed not found. Last 5 captures:', collected.slice(-5));
    }
    expect(quizHit, 'quiz_completed in dataLayer after quiz flow').toBeTruthy();
  });
});
