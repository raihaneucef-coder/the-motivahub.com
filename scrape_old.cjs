const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('https://motivahub.base44.app', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  const data = await page.evaluate(() => {
    const cs = getComputedStyle(document.body);
    const texts = [...document.querySelectorAll('h1,h2,h3,p,span,button,a,li')]
      .map(el => el.innerText.trim()).filter(t => t && t.length > 2);
    const styles = [...document.querySelectorAll('*')].slice(0, 120).map(el => {
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className).toString().slice(0, 100),
        bg: cs.backgroundColor, color: cs.color,
        font: cs.fontFamily.split(',')[0],
        size: cs.fontSize, weight: cs.fontWeight,
        padding: cs.padding, radius: cs.borderRadius, border: cs.border
      };
    });
    return { title: document.title, bodyBg: cs.backgroundColor, bodyFont: cs.fontFamily, texts: [...new Set(texts)].slice(0, 60), styles };
  });
  console.log('TITLE:', data.title);
  console.log('BODY:', data.bodyBg, data.bodyFont);
  console.log('--- TEXTS ---');
  data.texts.forEach(t => console.log('•', t.slice(0, 90)));
  console.log('--- KEY STYLES ---');
  data.styles.filter(s => /(header|nav|hero|btn|button|card|section|main)/i.test(s.cls) || ['BUTTON','NAV','HEADER','H1','H2'].includes(s.tag)).slice(0, 30).forEach(s => console.log(s.tag, s.cls.slice(0,50), '| bg:', s.bg, '| color:', s.color, '| font:', s.font, s.size, s.weight, '| pad:', s.padding, '| rad:', s.radius));
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
