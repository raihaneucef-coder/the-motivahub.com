const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

const jsonResponse = (status, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

async function sendWelcomeEmail(email, source) {
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
    <p style="font-size:16px;line-height:1.6;color:#444;">While you wait:</p>
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  if (!RESEND_API_KEY) {
    return res.status(500).json({ ok: false, error: 'RESEND_API_KEY not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
    }
  }

  const email = String(body?.email || '').trim().toLowerCase();
  const source = body?.source === 'pdf' ? 'pdf' : 'newsletter';

  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address' });
  }

  try {
    await sendWelcomeEmail(email, source);
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(502).json({ ok: false, error: 'Email send failed' });
  }

  return res.status(200).json({
    ok: true,
    message: source === 'pdf'
      ? "You're on the list. We'll email you the moment 30 Days of Discipline ships."
      : 'Welcome to Motiva Hub. Your first letter lands this Sunday.',
  });
}
