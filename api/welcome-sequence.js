/**
 * GET /api/welcome-sequence  (Vercel Cron, daily)
 *
 * Sends the time-delayed welcome-sequence emails (Day 2/4/7/10) to PDF
 * subscribers based on their contact created_at (signup) time. Day 0 is sent
 * immediately by /api/pdf-subscribe.
 *
 * Idempotency: the cron runs once per day and sends a step only when the
 * subscriber's "days since signup" falls inside that step's single-day window
 * (e.g. Day 2 fires when 2 <= days < 3), so each step is delivered exactly once
 * without needing to persist per-contact state. RESEND also dedupes by
 * X-Entity-Ref-ID (step + contact id) as a second guard.
 *
 * Vercel invokes cron routes with `Authorization: Bearer ${CRON_SECRET}`.
 * We also accept ?key=${CRON_SECRET} for manual testing.
 */
import { Resend } from 'resend';
import { TEMPLATES, SEQUENCE_STEPS, fill } from '../src/data/welcomeEmails.js';

const DAY_MS = 24 * 60 * 60 * 1000;

function authorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = req.headers.authorization || '';
  const bearer = header.replace(/^Bearer\s+/i, '');
  const query = req.query?.key || new URL(req.url, 'http://x').searchParams.get('key');
  return bearer === secret || query === secret;
}

function parseCreated(str) {
  if (!str) return 0;
  // RESEND format: "2026-10-04 23:51:09.193307+00"
  const iso = str.replace(' ', 'T').replace(/\+00$/, '+00:00');
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? 0 : t;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!authorized(req)) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }

  const KEY = process.env.RESEND_API_KEY;
  const AUDIENCE = process.env.RESEND_AUDIENCE_ID_PDF;
  const FROM = process.env.RESEND_FROM_EMAIL || 'Motiva Hub <hello@the-motivahub.com>';
  if (!KEY || !AUDIENCE) {
    return res.status(500).json({ ok: false, message: 'Missing RESEND env' });
  }

  const resend = new Resend(KEY);
  const now = Date.now();
  const summary = { checked: 0, sent: [], skipped: 0, errors: [] };

  let page = 1;
  const perPage = 50;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const listRes = await resend.contacts.list({ audienceId: AUDIENCE, page, perPage });
    if (listRes.error) {
      return res.status(502).json({ ok: false, message: listRes.error.message });
    }
    const contacts = listRes.data?.data || [];
    if (!contacts.length) break;

    for (const c of contacts) {
      summary.checked++;
      if (c.unsubscribed) { summary.skipped++; continue; }

      const created = parseCreated(c.created_at);
      if (!created) { summary.skipped++; continue; }
      const daysSince = (now - created) / DAY_MS;

      // Only steps whose single-day window we are currently inside.
      const due = SEQUENCE_STEPS.filter((s) => daysSince >= s.afterDays && daysSince < s.afterDays + 1);
      if (!due.length) { summary.skipped++; continue; }

      const firstName = c.first_name || '';
      for (const step of due) {
        const tpl = TEMPLATES[step.key];
        try {
          const r = await resend.emails.send({
            from: FROM,
            to: c.email,
            subject: tpl.subject({}),
            html: fill(tpl.html(), { firstName }),
            headers: { 'X-Entity-Ref-ID': `${step.key}-${c.id}` },
          });
          if (r.error) throw new Error(r.error.message);
          summary.sent.push({ email: c.email, step: step.key });
        } catch (err) {
          summary.errors.push({ email: c.email, step: step.key, message: err.message });
        }
      }
    }

    if (contacts.length < perPage) break;
    page++;
  }

  return res.status(200).json({ ok: true, ...summary });
}
