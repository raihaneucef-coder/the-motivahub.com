#!/usr/bin/env node
// Batch selector + paste-ready posting CSV for the Pinterest pin factory.
// Reads docs/pins-queue-all.json (already priority-sorted), takes a diverse slice
// (per-board cap, EN/FR mix), assigns posting days, and writes:
//   docs/pins-batch<N>.json  -> consumed by: node scripts/render-pin.mjs --batch docs/pins-batch<N>.json
//   docs/pin-posting-batch<N>.csv -> paste-ready manual posting sheet
// Usage: node scripts/make-batch.mjs [--n 1] [--size 42] [--per-day 6] [--board-cap 5] [--skip <count>]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > -1 ? Number(process.argv[i + 1]) : d; };
const N = arg('--n', 1);
const SIZE = arg('--size', 42);
const PER_DAY = arg('--per-day', 6);
const BOARD_CAP = arg('--board-cap', 5);
const SKIP = arg('--skip', 0); // count of already-consumed pins at the head of the queue

const q = JSON.parse(readFileSync(join(ROOT, 'docs/pins-queue-all.json'), 'utf8')).pins;

// greedy select with a per-board cap so one batch spans many boards (authority breadth)
const perBoard = {};
const selected = [];
let skippedSoFar = 0;
for (const p of q) {
  if (selected.length >= SIZE) break;
  const c = perBoard[p.board] || 0;
  if (c >= BOARD_CAP) continue;
  if (skippedSoFar < SKIP) { skippedSoFar++; continue; }
  perBoard[p.board] = c + 1;
  selected.push(p);
}
// fallback: if board caps starved the batch, top up by priority
if (selected.length < SIZE) {
  const have = new Set(selected.map((p) => p.slug));
  for (const p of q) { if (selected.length >= SIZE) break; if (!have.has(p.slug)) { have.add(p.slug); selected.push(p); } }
}

const dayOf = (i) => Math.floor(i / PER_DAY) + 1;
const pins = selected.map((p, i) => ({ ...p, day: dayOf(i), image_file: `pins/${p.slug}.png` }));

writeFileSync(join(ROOT, `docs/pins-batch${N}.json`), JSON.stringify({ meta: { batch: N, count: pins.length, perDay: PER_DAY, days: dayOf(pins.length - 1) }, pins }, null, 2));

const csvCell = (v) => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
const header = ['day', 'board', 'image_file', 'title', 'description', 'link', 'alt', 'tags'];
const rows = pins.map((p) => [p.day, p.board, p.image_file, p.ptitle, p.pdesc, p.url, p.alt, '#' + (p.tags || []).join(' #')]);
const csv = [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\n');
writeFileSync(join(ROOT, `docs/pin-posting-batch${N}.csv`), csv);

const boards = {};
for (const p of pins) boards[p.board] = (boards[p.board] || 0) + 1;
console.log(`batch ${N}: ${pins.length} pins across ${dayOf(pins.length - 1)} days @ ${PER_DAY}/day`);
console.log('per board:', Object.entries(boards).sort((a, z) => z[1] - a[1]).map(([b, n]) => `${n} ${b}`).join(' | '));
console.log('✓ docs/pins-batch' + N + '.json  (render: node scripts/render-pin.mjs --batch docs/pins-batch' + N + '.json)');
console.log('✓ docs/pin-posting-batch' + N + '.csv');
