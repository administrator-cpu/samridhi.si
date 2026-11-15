import { programmes, roles, type Role } from '@/content/site';

export type Registration = {
  role: Role;
  name: string;
  phone: string;
  village: string;
  district: string;
  programme: string;
};

const PROGRAMME_NAMES = programmes.map(p => p.name);

const clean = (v: unknown, max: number) =>
  String(v ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

export function normalisePhone(v: unknown) {
  let p = String(v ?? '').replace(/\D/g, '');
  if (p.length === 12 && p.startsWith('91')) p = p.slice(2);
  if (p.length === 11 && p.startsWith('0')) p = p.slice(1);
  return p;
}

export const isIndianMobile = (p: string) => /^[6-9]\d{9}$/.test(p);

export type ValidationResult =
  | { ok: true; isBot: boolean; value: Registration }
  | { ok: false; errors: Partial<Record<keyof Registration, string>> };

export function validateRegistration(body: unknown): ValidationResult {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const errors: Partial<Record<keyof Registration, string>> = {};

  const role = (clean(b.role, 40) || 'Join a class') as Role;
  if (!roles.includes(role)) errors.role = 'Unknown option.';

  const name = clean(b.name, 100);
  if (!name) errors.name = 'Please enter your name.';

  const phone = normalisePhone(b.phone);
  if (!isIndianMobile(phone)) errors.phone = 'Enter a 10-digit mobile number.';

  const village = clean(b.village, 100);
  const district = clean(b.district, 100);

  const programme = clean(b.programme, 60);
  if (programme && !PROGRAMME_NAMES.includes(programme)) errors.programme = 'Unknown programme.';

  // Honeypot: people never fill this hidden field.
  const isBot = clean(b.website, 200) !== '';

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, isBot, value: { role, name, phone, village, district, programme } };
}
