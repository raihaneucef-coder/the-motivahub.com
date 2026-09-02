import type { APIRoute } from 'astro';

export const prerender = false;

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const FROM_EMAIL = import.meta.env.RESEND_FROM_EMAIL || 'hello@the-motivahub.com';
const AUDIENCE_NEWSLETTER = import.meta.env.RESEND_AUDIENCE_ID_NEWSLETTER;
const AUDIENCE_PDF = import.meta.env.RESEND_AUDIENCE_ID_PDF;

const jsonResponse = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

async function addToAudience(audienceId: string, email: string, source: string) {
  const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      first_name: '',
      last_name: '',
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend audience add failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function sendWelcomeEmail(email: string, source: string) {
  const subject = source === 'pdf'
    ? "You're on the list — 30 Days of Discipline ships soon"
    : 'Welcome to Motiva Hub — One letter each Sunday';

  const html = source === 'pdf'
    ? `<!DOCTYPE html>
<html><body style="font-family:Georgia,serif;background:#faf7f2;color:#1a1a1a;padding:40px 20px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:40px;border-radius:8px;">
    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#c8a04a;margin:0 0 16px;text-transform:uppercase;">Motiva Hub</p>
    <h1 style="font-size:28px;margin:0 0 16px;">You're on the list 🎯</h1>
    <p style="font-size:16px;line-height:1.6;color:#444;">Thanks for signing up. <strong>30 Days of Discipline</strong> is being designed in Canva — we'll email you the moment it ships, usually within 2 weeks.</p>
    <p style="font-size:16px;line-height:1.6;color:#444;">While you wait, two things you can do today:</p>
    <p style="font-size:16px;line-height:1.6;color:#444;">→ <a href="https://the-motivahub.com/tools/discipline-quiz/" style="color:#c8a04a;">Find your discipline archetype (2 min)</a><br>
    → <a href="https://the-motivahub.com/guides/atomic-habits-ultimate-guide/" style="color:#c8a04a;">Read the 3,800-word Atomic Habits guide</a></p>
    <p style="font-size:14px;color:#888;margin-top:32px;">— Youssef Raihane, Motiva Hub</p>
  </div>
</body></html>`
    : `<!DOCTYPE html>
<html><body style="font-family:Georgia,serif;background:#faf7f2;color:#1a1a1a;padding:40px 20px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:40px;border-radius:8px;">
    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;color:#c8a04a;margin:0 0 16px;text-transform:uppercase;">Motiva Hub</p>
    <h1 style="font-size:28px;margin:0 0 16px;">Welcome.</h1>
    <p style="font-size:16px;line-height:1.6;color:#444;">You're on the Motiva Letter list. <strong>One letter each Sunday</strong> — 500 words, one idea, one book, one small practice.</p>
    <p style="font-size:16px;line-height:1.6;color:#444;">No noise. No algorithms. The first letter lands in your inbox this Sunday.</p>
    <p style="font-size:16px;line-height:1.6;color:#444;">In the meantime:</p>
    <p style="font-size:16px;line-height:1.6;color:#444;">→ <a href="https://the-motivahub.com/guides/atomic-habits-ultimate-guide/" style="color:#c8a04a;">The 3,800-word Atomic Habits guide</a><br>
    → <a href="https://the-motivahub.com/tools/" style="color:#c8a04a;">5 free tools to put it into practice</a></p>
    <p style="font-size:14px;color:#888;margin-top:32px;">— Youssef Raihane, Motiva Hub</p>
  </div>
</body></html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: email,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend email failed (${res.status}): ${text}`);
  }
  return res.json();
}

export const POST: APIRoute = async ({ request }) => {
  if (!RESEND_API_KEY) {
    return jsonResponse(500, { ok: false, error: 'RESEND_API_KEY not configured' });
  }

  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON body' });
  }

  const email = String(body.email || '').trim().toLowerCase();
  const source = body.source === 'pdf' ? 'pdf' : 'newsletter';

  if (!isValidEmail(email)) {
    return jsonResponse(400, { ok: false, error: 'Invalid email address' });
  }

  const audienceId = source === 'pdf' ? AUDIENCE_PDF : AUDIENCE_NEWSLETTER;
  const tasks: Promise<unknown>[] = [];

  if (audienceId) {
    tasks.push(addToAudience(audienceId, email, source).catch((e) => {
      console.error('audience add error:', e);
    }));
  }

  tasks.push(sendWelcomeEmail(email, source).catch((e) => {
    console.error('welcome email error:', e);
  }));

  await Promise.all(tasks);

  return jsonResponse(200, {
    ok: true,
    message: source === 'pdf'
      ? "You're on the list. We'll email you the moment 30 Days of Discipline ships."
      : 'Welcome to Motiva Hub. Your first letter lands this Sunday.',
  });
};
