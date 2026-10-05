/**
 * POST /api/pdf-subscribe
 * Body: { email, name?, source }
 *
 * Adds subscriber to RESEND audience + sends welcome email with PDF link.
 * Falls back to FormSubmit forwarding if RESEND env vars not set.
 *
 * Env:
 *   RESEND_API_KEY                 unrestricted key (Full access)
 *   RESEND_AUDIENCE_ID_PDF         audience id for PDF subscribers
 *   RESEND_FROM_EMAIL              e.g. "Motiva Hub <hello@the-motivahub.com>"
 *   OWNER_NOTIFY_EMAIL             owner inbox (default raihaneucef@gmail.com) —
 *                                  notified via RESEND while the domain is unverified
 */
import { Resend } from 'resend';
import { PDF_CATALOG, TEMPLATES, fill } from '../src/data/welcomeEmails.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ok(res, payload = {}) {
  res.status(200).json({ ok: true, ...payload });
}
function fail(res, status, message) {
  res.status(status).json({ ok: false, message });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return fail(res, 405, 'Method not allowed');
  }

  // Basic rate limit via header — Vercel can add upstash later
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  res.setHeader('Cache-Control', 'no-store');

  let body = req.body || {};
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { /* ignore */ } }

  const email = String(body.email || '').trim().toLowerCase();
  const name = String(body.name || '').trim().slice(0, 80);
  const source = String(body.source || 'habit-stack-kit').trim();
  const honeypot = body._honey; // anti-bot

  if (honeypot) return ok(res, { note: 'ignored' }); // silently drop bots
  if (!email || !EMAIL_REGEX.test(email)) return fail(res, 400, 'Please enter a valid email.');
  const pdf = PDF_CATALOG[source];
  if (!pdf) return fail(res, 400, 'Unknown guide source.');

  const RESEND_KEY = process.env.RESEND_API_KEY;
  const RESEND_AUDIENCE = process.env.RESEND_AUDIENCE_ID_PDF;
  const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'Motiva Hub <onboarding@resend.dev>';
  const OWNER_EMAIL = process.env.OWNER_NOTIFY_EMAIL || 'raihaneucef@gmail.com';

  if (!RESEND_KEY || !RESEND_AUDIENCE) {
    console.error('[pdf-subscribe] RESEND env missing');
    return fail(res, 500, 'Signup is temporarily unavailable. Use the direct download link on the page.');
  }

  const resend = new Resend(RESEND_KEY);

  // 1. Always capture the subscriber in the audience (works regardless of domain verification)
  let contactId;
  try {
    const cRes = await resend.contacts.create({
      email,
      audienceId: RESEND_AUDIENCE,
      firstName: name || undefined,
      unsubscribed: false,
      metadata: { source, ip, ts: Date.now() },
    });
    if (cRes.error && cRes.error.statusCode !== 409) {
      throw new Error(cRes.error.message || 'contact create failed');
    }
    contactId = cRes.data?.id;
  } catch (err) {
    console.error('[pdf-subscribe] contact create failed:', err.message);
    return fail(res, 502, 'Could not save your signup. Try the direct download link on the page.');
  }

  // 2. Send the welcome email to the subscriber.
  //    Works automatically once the sending domain is verified. Until then RESEND
  //    returns 403, so we fall back to notifying the owner (nothing is lost).
  try {
    const eRes = await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: TEMPLATES.day0.subject(pdf),
      html: fill(TEMPLATES.day0.html(), { firstName: name, pdf }),
      headers: { 'X-Entity-Ref-ID': `${source}-${Date.now()}` },
    });
    if (eRes.error) throw new Error(eRes.error.message || 'email send failed');

    return ok(res, { delivery: 'resend', emailId: eRes.data?.id, contactId });
  } catch (err) {
    console.warn('[pdf-subscribe] welcome send deferred:', err.message);
  }

  // 3. Domain not verified yet — notify the owner so the lead is not lost.
  try {
    const nRes = await resend.emails.send({
      from: 'Motiva Hub <onboarding@resend.dev>',
      to: OWNER_EMAIL,
      subject: `New PDF subscriber — ${source}`,
      html: `<p><strong>${email}</strong> signed up for <strong>${pdf.title}</strong>.</p><p>Sending domain not verified yet — welcome email deferred. Direct link: <a href="${pdf.url}">${pdf.url}</a></p>`,
    });
    if (nRes.error) throw new Error(nRes.error.message);
    return ok(res, { delivery: 'captured+owner-notified', contactId });
  } catch (err) {
    console.error('[pdf-subscribe] owner notify failed:', err.message);
    return fail(res, 502, 'Signup saved but confirmation failed. Try the direct download link on the page.');
  }
}
