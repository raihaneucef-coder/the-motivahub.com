// EN-only SERP title inserts for indexed English routes whose title-tag is >65.
// Their French twin is already short, so we set only seoTitle here.
import fs from 'node:fs';
import path from 'node:path';
const BASE = 'src/content/blog';

const MAP = {
  'deep-work-ritual': 'The 3-Hour Deep Work Ritual That Actually Works',
  'boundaries-are-love': 'Boundaries Are Love: Why Saying No Is Kind',
  'atomic-habits-review': 'Atomic Habits Book Review: 4 Reads, 18 Months',
  'comparison-trap': 'I Compared Myself to Strangers for 5 Years',
  'reseaux-sociaux-divertissement': 'Social Media as Entertainment, Without the Cost',
  'discipline-personnelle-guide': 'Personal Discipline: A Guide to Self-Control',
  'slow-productivity-30-day-test': 'I Tried Slow Productivity for 30 Days',
  'comment-creer-des-habitudes': 'How to Build Habits That Actually Last',
  'discipline-depass-motivation': 'Discipline Over Motivation: Why One Shows Up',
  'athlete-discipline': "The Athlete's Discipline: The Long Game",
  'discipline-vs-punishment': 'Discipline vs Punishment: The Key Difference',
  'rendez-compte-objectifs': 'Goal Accountability: Why You Need a Witness',
  'regle-2-min-productivite': 'The 2-Minute Rule for Productivity',
  'ne-brise-jamais-chaine': 'Never Break the Chain: A Simple Consistency Rule',
  'calm-is-a-superpower': 'Calm Is a Superpower: Composure Over Talent',
  'standard-non-negociable': 'The Non-Negotiable Standard: Rules That Hold',
  'secure-self': 'The Secure Self: Why Focus on You Is Safest',
  'missed-day-protocol': 'What to Do When You Miss a Day',
  'zone-confort-croissance': 'Comfort Zone vs Growth Zone: Why Discomfort Helps',
  'regle-50-30-20': 'The 50/30/20 Rule: The Simplest Budget',
  'definition-reussite': 'The Definition of Success Is Personal',
  'body-votes-first': 'Body Votes First: The Hidden Election You Miss',
  'process-vs-outcome': 'Process vs Outcome Goals: Why Process Wins',
  'art-dire-non': 'The Art of Saying No: Boundaries Without Guilt',
  'sprint-90-jours': 'The 90-Day Sprint: Why Quarterly Beats Annual',
  'retroengineering-objectifs': 'Reverse Engineering: Work Backward from Your Goal',
  'growth-feels-like-breaking': 'Growth Feels Like Breaking Before Becoming',
  'detox-numerique': 'Digital Detox: How Screen Time Hurts Your Health',
  'voyage-sante-mentale': 'Travel and Mental Health: How New Places Heal',
  'resolution-conflits': 'Conflict Resolution: How to Fight Fair',
};

function setField(content, anchorRe, field, value) {
  content = content.replace(new RegExp(`^${field}:.*\\n`, 'm'), '');
  const m = content.match(anchorRe);
  if (!m) throw new Error(`anchor for ${field} not found`);
  const idx = m.index + m[0].length;
  return content.slice(0, idx) + `${field}: "${value}"\n` + content.slice(idx);
}

let changed = 0;
for (const [slug, en] of Object.entries(MAP)) {
  const file = path.join(BASE, `${slug}.md`);
  if (!fs.existsSync(file)) { console.log('MISSING', slug); continue; }
  let c = fs.readFileSync(file, 'utf8');
  c = setField(c, /^title:.*\n/m, 'seoTitle', en);
  fs.writeFileSync(file, c);
  changed++;
  console.log('OK', slug, en.length);
}
console.log('--- changed:', changed);
