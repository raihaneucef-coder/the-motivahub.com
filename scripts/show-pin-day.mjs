// Dev-only: print posting rows for a given day from docs/pin-posting-batch1.csv
// Usage: node scripts/show-pin-day.mjs [day]
import fs from 'node:fs';
const day = process.argv[2] || '4';
const lines = fs.readFileSync('docs/pin-posting-batch1.csv', 'utf8').trim().split('\n');
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
const rows = lines.slice(1).map(parse).filter((c) => c[0] === day);
console.log(`=== DAY ${day} — ${rows.length} pins ===`);
rows.forEach((c, n) => {
  console.log(`\n--- pin ${n + 1} ---`);
  console.log('board :', c[1]);
  console.log('image :', c[2]);
  console.log('title :', c[3]);
  console.log('link  :', c[5]);
  console.log('alt   :', c[6]);
  console.log('tags  :', c[7]);
  console.log('desc  :', c[4]);
});
