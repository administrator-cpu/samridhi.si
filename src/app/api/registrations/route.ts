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

export async function POST(req: NextRequest) {
  if (!originAllowed(req)) return json({ ok: false, error: 'Forbidden' }, 403);

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
  const rl = rateLimit(`reg:${ip}`);
  if (!rl.ok) return json({ ok: false, error: 'Too many attempts. Please try again in a few minutes.' }, 429, { 'Retry-After': String(rl.retryAfter) });

  const raw = await req.text();
  if (raw.length > 10_000) return json({ ok: false, error: 'Too large' }, 413);
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const result = validateRegistration(body);
  if (!result.ok) return json({ ok: false, errors: result.errors }, 422);
  if (result.isBot) return json({ ok: true }, 201); // quietly drop spam

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
      email: { status: 'pending' }
    }));
  } catch (err: unknown) {
    if ((err as { code?: number })?.code === 11000 && key) return json({ ok: true, replayed: true });
    console.error('[registrations] save failed', err);
    return json({ ok: false, error: "Couldn't save. Please try again." }, 500);
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

  return json({ ok: true }, 201);
}
