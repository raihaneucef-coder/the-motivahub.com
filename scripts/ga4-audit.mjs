#!/usr/bin/env node
// GA4 Data API pull: users/sessions/sources/bounce last 7/28 days.
// Requires credentials via GOOGLE_APPLICATION_CREDENTIALS (or ADC) and GA4_PROPERTY_ID.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { GoogleAuth } = require('google-auth-library');

const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const propertyId = process.env.GA4_PROPERTY_ID;
if (!propertyId) {
  console.error('Missing GA4_PROPERTY_ID (e.g. properties/123456789).');
  process.exit(1);
}
const PROPERTY = propertyId.startsWith('properties/') ? propertyId : `properties/${propertyId}`;

const auth = new GoogleAuth({
  ...(keyFile ? { keyFile } : {}),
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});
const c = await auth.getClient();

const today = process.env.GA4_END_DATE ? new Date(process.env.GA4_END_DATE) : new Date();
if (Number.isNaN(today.getTime())) {
  console.error('Invalid GA4_END_DATE. Use YYYY-MM-DD.');
  process.exit(1);
}
const d28 = new Date(today); d28.setDate(d28.getDate() - 28);
const d7  = new Date(today); d7.setDate(d7.getDate() - 7);
const iso = d => d.toISOString().slice(0, 10);

async function run(metrics, dimensions, startDate, endDate) {
  const url = `https://analyticsdata.googleapis.com/v1beta/${PROPERTY}:runReport`;
  try {
    const r = await c.request({
      url, method: 'POST',
      data: { dateRanges: [{ start_date: startDate, end_date: endDate }], metrics, dimensions },
    });
    return r.data;
  } catch (e) { console.log('ERR', dimensions, '→', e.response?.status, e.response?.data?.message || e.message); return null; }
}

console.log('=== GA4 · last 7 days ===');
const r7 = await run(
  [{ name: 'totalUsers' }, { name: 'sessions' }, { name: 'engagedSessions' }, { name: 'engagementRate' }, { name: 'screenPageViews' }, { name: 'averageSessionDuration' }],
  [], iso(d7), iso(today));
if (r7) {
  const m = r7.metricHeaders.map(x => x.name);
  const row = r7.rows?.[0]?.metricValues.map(v => v.value) || [];
  m.forEach((name, i) => console.log('  ' + name.padEnd(24) + ': ' + (row[i] ?? '-')));
}

console.log('\n=== GA4 · last 28 days ===');
const r28 = await run(
  [{ name: 'totalUsers' }, { name: 'sessions' }, { name: 'engagedSessions' }, { name: 'engagementRate' }, { name: 'screenPageViews' }],
  [], iso(d28), iso(today));
if (r28) {
  const m = r28.metricHeaders.map(x => x.name);
  const row = r28.rows?.[0]?.metricValues.map(v => v.value);
  m.forEach((name, i) => console.log('  ' + name.padEnd(24) + ': ' + row[i]));
  const users = Number(row[0]);
  console.log('  avg users/week:', Math.round(users * 7 / 28));
}

console.log('\n=== Traffic sources · last 28 days ===');
const src = await run(
  [{ name: 'totalUsers' }, { name: 'sessions' }],
  [{ name: 'sessionDefaultChannelGroup' }], iso(d28), iso(today));
if (src) src.rows.forEach(row => console.log('  ' + row.dimensionValues[0].value.padEnd(15) + ': ' + row.metricValues[0].value + ' users | ' + row.metricValues[1].value + ' sessions'));

console.log('\n=== Daily users last 14 days ===');
const d14 = new Date(today); d14.setDate(d14.getDate() - 14);
const daily = await run(
  [{ name: 'totalUsers' }, { name: 'sessions' }],
  [{ name: 'date' }], iso(d14), iso(today));
if (daily) daily.rows.slice(-14).forEach(row => console.log('  ' + row.dimensionValues[0].value + ': ' + row.metricValues[0].value + ' users | ' + row.metricValues[1].value + ' sessions'));

console.log('\n=== Top pages last 28 days ===');
const pages = await run(
  [{ name: 'totalUsers' }, { name: 'sessions' }],
  [{ name: 'pagePath' }], iso(d28), iso(today));
if (pages) pages.rows.slice(0, 10).forEach(row => console.log('  ' + String(row.metricValues[0].value).padStart(4) + ' users | ' + row.dimensionValues[0].value));

console.log('\n=== Country last 28 days ===');
const geo = await run(
  [{ name: 'totalUsers' }],
  [{ name: 'countryId' }], iso(d28), iso(today));
if (geo) geo.rows.slice(0, 8).forEach(row => console.log('  ' + String(row.metricValues[0].value).padStart(4) + ' users | ' + row.dimensionValues[0].value));

console.log('\n=== Device last 28 days ===');
const dev = await run(
  [{ name: 'totalUsers' }],
  [{ name: 'deviceCategory' }], iso(d28), iso(today));
if (dev) dev.rows.forEach(row => console.log('  ' + String(row.metricValues[0].value).padStart(4) + ' users | ' + row.dimensionValues[0].value));
