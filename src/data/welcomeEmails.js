/**
 * Welcome-sequence email templates (single source of truth).
 * Used by:
 *   - api/pdf-subscribe.js  → sends Day 0 immediately on signup
 *   - api/welcome-sequence.js (cron) → sends Day 2/4/7/10 over time
 *
 * Placeholders: {{first_name}} {{pdf_title}} {{pdf_pages}} {{pdf_url}} {{unsubscribe_url}}
 */

const UNSUB = 'https://the-motivahub.com/unsubscribe';

function shell(title, headerTag, headerTitle, bodyRows) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title></head>
<body style="margin:0; padding:0; background:#f5f3ef; font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ef; padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.06);">
<tr><td style="background:#0a0a0a; padding:28px 36px;">
  <p style="color:#d4b377; font-size:11px; letter-spacing:3px; text-transform:uppercase; margin:0; font-family:Arial,sans-serif;">${headerTag}</p>
  <h1 style="color:#f5f5f5; font-size:22px; margin:8px 0 0; font-weight:normal;">${headerTitle}</h1>
</td></tr>
<tr><td style="padding:36px;">
${bodyRows}
</td></tr>
<tr><td style="padding:20px 36px; border-top:1px solid #eee;">
  <p style="font-size:12px; color:#999; margin:0; font-family:Arial,sans-serif;">
    <a href="${UNSUB}" style="color:#999;">Unsubscribe</a> · the-motivahub.com
  </p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

const P = 'font-size:15px; line-height:1.7; color:#333; margin:0 0 16px;';
const SIG = '<p style="font-size:15px; color:#333; margin:0;">— Youssef</p>';

export const TEMPLATES = {
  day0: {
    subject: (pdf) => `Your ${pdf.title} is here`,
    html: () => shell('Welcome — Your PDF is Here', 'Motiva Hub · Field Guide', 'Your PDF is ready',
      `<p style="${P}">Hi {{first_name}},</p>
  <p style="${P}">Here's your copy of <strong>{{pdf_title}}</strong>. It's a {{pdf_pages}}-page PDF — printable, no fluff, just the protocols that work.</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td align="center" style="background:#faf8f0; border:1px solid #e8e0d0; border-radius:8px; padding:24px;">
    <p style="font-size:13px; color:#6b5320; margin:0 0 12px; font-family:Arial,sans-serif; text-transform:uppercase; letter-spacing:2px;">Download</p>
    <a href="{{pdf_url}}" style="display:inline-block; background:#0a0a0a; color:#d4b377; text-decoration:none; padding:14px 32px; border-radius:6px; font-size:15px; font-weight:bold;">Open the PDF →</a>
  </td></tr></table>
  <p style="${P}"><strong>One thing before you go:</strong> this works best when you actually print it (or open it on a tablet) and fill in the worksheets. Reading it once and forgetting it is what happened with the last 4 self-improvement books you bought.</p>
  <p style="${P}">Block 20 minutes today. Fill the first worksheet. That's the whole ask.</p>
  ${SIG}`),
  },
  day2: {
    subject: () => 'Did you fill page 4?',
    html: () => shell('Day 2 · The One Thing', 'Day 2 · The One Thing', 'Did you fill page 4?',
      `<p style="${P}">Hi {{first_name}},</p>
  <p style="${P}">I ask because most people download a PDF, skim it, feel productive for about 90 seconds, and never open it again. I've done it myself. It's the most common failure pattern in self-improvement.</p>
  <p style="${P}"><strong>The fix is stupidly simple:</strong> the worksheet takes 8 minutes. You write down one existing habit (your "anchor") and one new tiny behavior you'll stack on top of it. That's it. That's the whole system.</p>
  <div style="background:#faf8f0; border-left:4px solid #d4b377; padding:16px 20px; margin:20px 0;">
    <p style="font-size:14px; color:#6b5320; margin:0; font-style:italic;">"After I [ANCHOR], I will [NEW HABIT] for [2 minutes or less]."</p>
  </div>
  <p style="${P}">If you've already done it — great. In two days I'll send you the one thing that separates people who maintain habits from people who white-knuckle for two weeks and quit.</p>
  ${SIG}`),
  },
  day4: {
    subject: () => 'The 20-second rule that changed everything',
    html: () => shell('Day 4 · Environment', 'Day 4 · Environment', 'The 20-second rule that changed everything',
      `<p style="${P}">Hi {{first_name}},</p>
  <p style="${P}">Here's what separates people who keep habits from people who lose them: <strong>friction</strong>.</p>
  <p style="${P}">Not motivation. Not discipline. The number of seconds between "I should do this" and actually doing it. If your guitar is in the closet → you don't play. If your running shoes are under the bed → you don't run. If your phone is face-up on your desk → you lose 40 minutes.</p>
  <div style="background:#faf8f0; border-left:4px solid #d4b377; padding:16px 20px; margin:20px 0;">
    <p style="font-size:14px; color:#6b5320; margin:0;"><strong>Try today:</strong> pick one good habit and reduce its activation to under 20 seconds. Pick one bad habit and add 20 seconds of friction. That's the entire intervention.</p>
  </div>
  <p style="${P}">Soon: the book that made this click for me (and why I recommend a specific edition).</p>
  ${SIG}`),
  },
  day7: {
    subject: () => 'The one book I actually re-read every year',
    html: () => shell('Day 7 · The Book', 'Day 7 · The Book', 'The one book I actually re-read every year',
      `<p style="${P}">Hi {{first_name}},</p>
  <p style="${P}">I've read about 40 self-improvement books. Most are one good idea padded to 250 pages. But one I go back to every January:</p>
  <div style="background:#faf8f0; border:1px solid #e8e0d0; border-radius:8px; padding:24px; margin:20px 0; text-align:center;">
    <p style="font-size:12px; color:#b8965a; margin:0 0 8px; font-family:Arial,sans-serif; text-transform:uppercase; letter-spacing:2px;">Recommendation</p>
    <h3 style="font-size:20px; color:#1a1a1a; margin:0 0 8px;">Atomic Habits — James Clear</h3>
    <p style="font-size:14px; color:#666; margin:0 0 16px;">The book that turned "habit stacking" from a psychology paper into a system you can use today.</p>
    <a href="https://www.amazon.fr/dp/1847941834?tag=motivahub-21&utm_source=email&utm_medium=welcome-sequence&utm_campaign=day7-book" style="display:inline-block; background:#0a0a0a; color:#d4b377; text-decoration:none; padding:12px 28px; border-radius:6px; font-size:14px;">View on Amazon →</a>
  </div>
  <p style="${P}"><em>Full transparency: this is an affiliate link. If you buy through it, we earn a small commission at no cost to you. We only recommend what we actually use. More on our <a href="https://the-motivahub.com/affiliate-disclosure/" style="color:#6b5320;">disclosure page</a>.</em></p>
  <p style="${P}">Next (last email in this sequence): two free tools to track the habit you built, and one more guide you might want.</p>
  ${SIG}`),
  },
  day10: {
    subject: () => 'Two free tools + one more guide',
    html: () => shell('Day 10 · What\'s Next', 'Day 10 · What\'s Next', 'Two free tools + one more guide',
      `<p style="${P}">Hi {{first_name}},</p>
  <p style="${P}">Last email in this short series. You've got the PDF, you've (hopefully) filled the worksheet, and you've rearranged at least one corner of your environment. That's more than most people do with a free download.</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;"><tr>
    <td width="48%" style="background:#faf8f0; border:1px solid #e8e0d0; border-radius:8px; padding:16px;">
      <p style="font-size:13px; color:#6b5320; margin:0 0 6px; font-weight:bold;">Habit Tracker</p>
      <p style="font-size:12px; color:#666; margin:0 0 10px;">Track your streak, week by week. No app, no signup.</p>
      <a href="https://the-motivahub.com/tracker/" style="font-size:13px; color:#0a0a0a; text-decoration:underline;">Open →</a>
    </td><td width="4%"></td>
    <td width="48%" style="background:#faf8f0; border:1px solid #e8e0d0; border-radius:8px; padding:16px;">
      <p style="font-size:13px; color:#6b5320; margin:0 0 6px; font-weight:bold;">Habit Stacker Tool</p>
      <p style="font-size:12px; color:#666; margin:0 0 10px;">Build your stack formula interactively.</p>
      <a href="https://the-motivahub.com/tools/habit-stacker/" style="font-size:13px; color:#0a0a0a; text-decoration:underline;">Open →</a>
    </td>
  </tr></table>
  <div style="background:#0a0a0a; border-radius:8px; padding:20px 24px; margin:16px 0 24px; text-align:center;">
    <p style="font-size:12px; color:#d4b377; margin:0 0 6px; font-family:Arial,sans-serif; text-transform:uppercase; letter-spacing:2px;">Free · 10 pages</p>
    <p style="font-size:18px; color:#f5f5f5; margin:0 0 12px;">The Home Athlete Blueprint</p>
    <a href="https://the-motivahub.com/guides/home-athlete/" style="display:inline-block; background:#d4b377; color:#0a0a0a; text-decoration:none; padding:10px 24px; border-radius:6px; font-size:14px; font-weight:bold;">Get the PDF →</a>
  </div>
  <p style="${P}">After this, you'll hear from me once a week (the newsletter). One essay, one book, one practice. No courses, no sales funnels. If it's not useful, the unsubscribe link is in every email.</p>
  ${SIG}`),
  },
};

// Steps the cron is responsible for (Day 0 is sent immediately by pdf-subscribe).
export const SEQUENCE_STEPS = [
  { key: 'day2', afterDays: 2 },
  { key: 'day4', afterDays: 4 },
  { key: 'day7', afterDays: 7 },
  { key: 'day10', afterDays: 10 },
];

export function fill(html, { firstName = '', pdf = {} } = {}) {
  return html
    .replaceAll('{{first_name}}', firstName || 'there')
    .replaceAll('{{pdf_title}}', pdf.title || 'your guide')
    .replaceAll('{{pdf_pages}}', String(pdf.pages || ''))
    .replaceAll('{{pdf_url}}', pdf.url || 'https://the-motivahub.com/guides/');
}

// PDF catalog shared by both endpoints.
export const PDF_CATALOG = {
  '30-days-discipline': { title: '30 Days of Discipline', pages: 7, url: 'https://the-motivahub.com/30-days-discipline.pdf' },
  'habit-stack-kit': { title: 'The Habit Stack Kit', pages: 14, url: 'https://the-motivahub.com/habit-stack-kit.pdf' },
  'discipline-kitchen': { title: 'The Discipline Kitchen', pages: 12, url: 'https://the-motivahub.com/discipline-kitchen.pdf' },
  'home-athlete': { title: 'The Home Athlete Blueprint', pages: 10, url: 'https://the-motivahub.com/home-athlete.pdf' },
};
