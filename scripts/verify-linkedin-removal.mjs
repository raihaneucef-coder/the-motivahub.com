#!/usr/bin/env node
// Final verification: footer + contact pages after LinkedIn removal
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const tab = await ctx.newPage();

const targets = [
  { url: 'https://the-motivahub.com/', slug: 'home-footer' },
  { url: 'https://the-motivahub.com/contact/', slug: 'contact-en' },
  { url: 'https://the-motivahub.com/fr/contact/', slug: 'contact-fr' },
];

for (const t of targets) {
  const errors = [];
  tab.on('pageerror', e => errors.push(e.message));
  await tab.goto(t.url, { waitUntil: 'networkidle' });
  // scroll to footer
  await tab.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await tab.waitForTimeout(500);
  const info = await tab.evaluate(() => {
    const footer = document.querySelector('footer');
    const social = [...document.querySelectorAll('.footer-social a')].map(a => a.textContent.trim() + ' → ' + a.href);
    const linkedin = document.body.innerHTML.match(/linkedin/gi) || [];
    return { social, linkedinCount: linkedin.length };
  });
  await tab.screenshot({ path: `tests/final-check/${t.slug}.png`, fullPage: false });
  console.log(`\n[${t.slug}]`);
  console.log('  footer socials:', info.social.join(' | '));
  console.log('  linkedin refs on page:', info.linkedinCount);
  console.log('  JS errors:', errors.length);
}
await browser.close();
