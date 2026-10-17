// Dev-only: build a 7-day schedule (3 pins/day) from docs/pin-posting-batch1.csv,
// skipping pins already published on Pinterest (matched by title). Writes docs/pin-schedule-oct13.json
import fs from 'node:fs';

const csv = fs.readFileSync('docs/pin-posting-batch1.csv', 'utf8').trim().split('\n');
const parse = (l) => {
  const out = []; let cur = ''; let inq = false;
  for (let i = 0; i < l.length; i++) {
    const ch = l[i];
    if (ch === '"') { if (inq && l[i + 1] === '"') { cur += '"'; i++; } else inq = !inq; }
    else if (ch === ',' && !inq) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur); return out;
};
const rows = csv.slice(1).map(parse).map((c) => ({ day: c[0], board: c[1], image: c[2], title: c[3], desc: c[4], link: c[5], alt: c[6], tags: c[7] }));

// titles already published on Pinterest (from read-only profile audit, Oct 9 batch = batch1 day 1)
const published = new Set([
  'Meditations — Best Stoicism Book',
  'Atomic Habits — Best Habits Book',
  'Deep Work — Best Focus Book',
  'The Daily Stoic — Best Philosophy Book',
  "Can't Hurt Me — Best Discipline Book",
  'Meditations — Stoïcisme : chronique',
]);

const fresh = rows.filter((r) => !published.has(r.title));
console.log('total rows:', rows.length, '| published(excluded):', rows.length - fresh.length, '| fresh available:', fresh.length);

const take = fresh.slice(0, 21);
const TIMES = ['12:00', '16:00', '20:00'];
const startDay = 13; // Oct 2026
const schedule = take.map((r, i) => {
  const dayOffset = Math.floor(i / 3);
  const slot = i % 3;
  const date = new Date(Date.UTC(2026, 9, startDay + dayOffset));
  const iso = date.toISOString().slice(0, 10);
  return { ...r, scheduled_date: iso, scheduled_time: TIMES[slot], order: i + 1 };
});

fs.writeFileSync('docs/pin-schedule-oct13.json', JSON.stringify({ meta: { created: '2026-10-12', cadence: '3/day x 7 days', start: '2026-10-13', end: '2026-10-19', count: schedule.length }, pins: schedule }, null, 2) + '\n');

console.log('\n=== SCHEDULE (21 pins, 3/day) ===');
for (const p of schedule) {
  console.log(`${p.scheduled_date} ${p.scheduled_time}  [${p.board}]  ${p.title.slice(0, 46)}  <- ${p.image}`);
}
