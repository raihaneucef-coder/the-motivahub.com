/**
 * Dev-only: send the welcome-sequence templates to a test inbox so we can
 * eyeball how each email actually renders in Gmail.
 *
 * Usage:
 *   RESEND_API_KEY=re_xxx TEST_EMAIL=you@gmail.com node scripts/send-welcome-tests.mjs
 *
 * Sends:
 *   - Full 5-step sequence (Day 0/2/4/7/10) for the Habit Stack Kit
 *   - Day 0 welcome for the other 3 PDFs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const KEY = process.env.RESEND_API_KEY;
const TO = process.env.TEST_EMAIL;
const FROM = process.env.RESEND_FROM || 'Motiva Hub <hello@the-motivahub.com>';
const FIRST_NAME = process.env.TEST_NAME || 'Youssef';

if (!KEY || !TO) {
  console.error('Missing RESEND_API_KEY or TEST_EMAIL env var.');
  process.exit(1);
}

const PDFS = {
  'habit-stack-kit': { title: 'The Habit Stack Kit', pages: 14, url: 'https://the-motivahub.com/habit-stack-kit.pdf' },
  'discipline-kitchen': { title: 'The Discipline Kitchen', pages: 12, url: 'https://the-motivahub.com/discipline-kitchen.pdf' },
  'home-athlete': { title: 'The Home Athlete Blueprint', pages: 10, url: 'https://the-motivahub.com/home-athlete.pdf' },
  '30-days-discipline': { title: '30 Days of Discipline', pages: 7, url: 'https://the-motivahub.com/30-days-discipline.pdf' },
};

const STEPS = [
  { file: 'day0-welcome.html', subject: (p) => `Your ${p.title} is here` },
  { file: 'day2-action.html', subject: () => 'Did you fill page 4?' },
  { file: 'day4-environment.html', subject: () => 'The 20-second rule that changed everything' },
  { file: 'day7-book.html', subject: () => 'The one book I actually re-read every year' },
  { file: 'day10-next.html', subject: () => 'Two free tools + one more guide' },
];

function fill(html, pdf) {
  return html
    .replaceAll('{{first_name}}', FIRST_NAME)
    .replaceAll('{{pdf_title}}', pdf.title)
    .replaceAll('{{pdf_pages}}', String(pdf.pages))
    .replaceAll('{{pdf_url}}', pdf.url)
    .replaceAll('{{unsubscribe_url}}', 'https://the-motivahub.com/unsubscribe');
}

async function send(subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: TO, subject, html }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(data)}`);
  return data.id;
}

const plan = [
  // full sequence for the flagship PDF
  ...STEPS.map((s) => ({ step: s, pdf: PDFS['habit-stack-kit'] })),
  // day0 for the other three
  ...['discipline-kitchen', 'home-athlete', '30-days-discipline'].map((k) => ({ step: STEPS[0], pdf: PDFS[k] })),
];

console.log(`\nSending ${plan.length} test emails to ${TO} from ${FROM}\n`);
for (const { step, pdf } of plan) {
  const html = fill(readFileSync(join(root, 'emails', step.file), 'utf8'), pdf);
  const subject = `[TEST · ${step.file.replace('.html', '')}] ${step.subject(pdf)}`;
  try {
    const id = await send(subject, html);
    console.log(`  ✓ ${subject}  →  ${id}`);
  } catch (err) {
    console.error(`  ✗ ${subject}  →  ${err.message}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}
console.log('\nDone.\n');
