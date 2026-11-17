import { NextResponse, type NextRequest } from 'next/server';
import { Resend } from 'resend';
import { validateRegistration } from '@/lib/validate';
import { buildRegistrationEmail } from '@/lib/email';
import { registrations } from '@/lib/mongodb';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const json = (body: unknown, status = 200, headers?: Record<string, string>) => NextResponse.json(body, { status, headers });

function originAllowed(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (!origin) return true; // same-origin form posts and server-to-server calls
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  try {
    return new URL(origin).host === req.headers.get('host') || allowed.includes(origin);
  } catch {
    return false;
  }
}

// The client's IP as seen by our own proxy. Nginx sets X-Real-IP to $remote_addr, which the
// visitor cannot forge. The first X-Forwarded-For entry is whatever the visitor sent, so a bot
// could rotate it to dodge the rate limit; when only X-Forwarded-For exists, use the last hop,
// which is the one our proxy appended.
function clientIp(req: NextRequest) {
  const real = req.headers.get('x-real-ip')?.trim();
  if (real) return real;
  const hops = (req.headers.get('x-forwarded-for') || '').split(',').map(s => s.trim()).filter(Boolean);
  return hops[hops.length - 1] || 'unknown';
}

const MAX_BODY = 10_000;

export async function POST(req: NextRequest) {
  if (!originAllowed(req)) return json({ ok: false, error: 'Forbidden' }, 403);

  const rl = rateLimit(`reg:${clientIp(req)}`);
  if (!rl.ok) return json({ ok: false, error: 'Too many attempts. Please try again in a few minutes.' }, 429, { 'Retry-After': String(rl.retryAfter) });

  // Refuse oversized bodies before reading them into memory.
  if (Number(req.headers.get('content-length') || 0) > MAX_BODY) return json({ ok: false, error: 'Too large' }, 413);
  const raw = await req.text();
  if (raw.length > MAX_BODY) return json({ ok: false, error: 'Too large' }, 413);

  // A plain HTML form post (JavaScript off or failed) is answered with a redirect to a page,
  // not JSON, so the visitor never lands on raw data.
  const isFormPost = (req.headers.get('content-type') || '').includes('application/x-www-form-urlencoded');
  const done = (status: 'ok' | 'invalid' | 'error', jsonBody: unknown, code: number) =>
    // Relative Location, so it stays on the public domain even behind a proxy.
    isFormPost ? new Response(null, { status: 303, headers: { Location: `/registered?status=${status}` } }) : json(jsonBody, code);

  let body: unknown;
  try {
    body = isFormPost ? Object.fromEntries(new URLSearchParams(raw)) : JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const result = validateRegistration(body);
  if (!result.ok) return done('invalid', { ok: false, errors: result.errors }, 422);
  if (result.isBot) return done('ok', { ok: true }, 201); // quietly drop spam

  const key = (req.headers.get('idempotency-key') || '').slice(0, 100) || null;
  const now = new Date();

  // 1. Save first, so no registration is lost even if email fails.
  let col;
  let insertedId;
  try {
    col = await registrations();
    ({ insertedId } = await col.insertOne({
      ...result.value,
      idempotencyKey: key,
      source: 'samridhi.si',
      userAgent: (req.headers.get('user-agent') || '').slice(0, 300),
      createdAt: now,
      consentAt: now,
      email: { status: 'pending' }
    }));
  } catch (err: unknown) {
    if ((err as { code?: number })?.code === 11000 && key) return done('ok', { ok: true, replayed: true }, 200);
    console.error('[registrations] save failed', err);
    return done('error', { ok: false, error: "Couldn't save. Please try again." }, 500);
  }

  // 2. Email the team.
  const { subject, html, text } = buildRegistrationEmail(result.value, now);
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not set');
    const bcc = process.env.MAIL_BCC ?? 'administrator@fab5network.com';
    const { data, error } = await new Resend(apiKey).emails.send({
      from: process.env.MAIL_FROM || 'Samridhi <no-reply@fab5network.com>',
      to: [process.env.MAIL_TO || 'info@fab5network.com'],
      bcc: bcc ? [bcc] : undefined,
      subject,
      html,
      text,
      tags: [{ name: 'source', value: 'samridhi_registration' }]
    });
    if (error) throw new Error(error.message);
    await col.updateOne({ _id: insertedId }, { $set: { email: { status: 'sent', id: data?.id, at: new Date() } } });
  } catch (err) {
    console.error('[registrations] email failed', err);
    await col
      .updateOne({ _id: insertedId }, { $set: { email: { status: 'failed', error: String((err as Error)?.message || err), at: new Date() } } })
      .catch(() => {});
    // Saved, so the learner still sees success. Find these with { "email.status": "failed" }.
  }

  return done('ok', { ok: true }, 201);
}
