'use client';

import { useEffect, useRef, useState } from 'react';
import { programmes, roles, type Role } from '@/content/site';
import { ROLE_EVENT, type RolePick } from './RoleLink';

type Form = { name: string; phone: string; village: string; district: string; programme: string; website: string; consent: boolean };
const EMPTY: Form = { name: '', phone: '', village: '', district: '', programme: '', website: '', consent: false };
type Field = keyof Form | 'role';

const MOBILE = '[6-9][0-9]{9}';
const isMobile = (p: string) => new RegExp(`^${MOBILE}$`).test(p);

const input =
  'min-h-[50px] w-full rounded-control border bg-[#faf8f9] px-3.5 text-base font-normal text-plum outline-none focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-accent';
const labelCls = 'flex flex-col gap-1.5 text-sm font-bold text-plum';
const errCls = 'text-[14px] font-normal text-critical';

/**
 * Sign-up form. Works without JavaScript too: it is a real POST form with named fields,
 * required attributes and a mobile-number pattern, and the API answers a plain form post
 * with a redirect to /registered. With JavaScript, it submits with fetch and shows
 * inline errors instead.
 */
export function RegisterForm() {
  const [role, setRole] = useState<Role>(roles[0]);
  const [form, setForm] = useState<Form>(EMPTY);
  const [tried, setTried] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [serverErrors, setServerErrors] = useState<Partial<Record<Field, string>>>({});
  const keyRef = useRef<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // Browser validation stays on until React takes over; then our own inline errors replace it.
  useEffect(() => setHydrated(true), []);

  // Links elsewhere on the page can preselect a role or programme.
  useEffect(() => {
    const onPick = (e: Event) => {
      const d = (e as CustomEvent<RolePick>).detail || {};
      if (d.role) setRole(d.role);
      if (d.programme) setForm(f => ({ ...f, programme: d.programme! }));
      setStatus(s => (s === 'done' ? 'idle' : s));
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 500);
    };
    window.addEventListener(ROLE_EVENT, onPick);
    return () => window.removeEventListener(ROLE_EVENT, onPick);
  }, []);

  useEffect(() => {
    if (status === 'done') doneRef.current?.focus();
  }, [status]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const t = e.target;
    const v = k === 'consent' ? (t as HTMLInputElement).checked : k === 'phone' ? t.value.replace(/\D/g, '').slice(0, 10) : t.value;
    setForm(f => ({ ...f, [k]: v }));
    setServerErrors(s => ({ ...s, [k]: undefined }));
  };

  const nameErr = (tried && !form.name.trim() ? 'Please enter your name.' : '') || serverErrors.name || '';
  const phoneErr = (tried && !isMobile(form.phone) ? 'Enter a 10-digit mobile number starting with 6, 7, 8 or 9.' : '') || serverErrors.phone || '';
  const consentErr = (tried && !form.consent ? 'Please agree so we can contact you.' : '') || serverErrors.consent || '';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTried(true);
    if (!form.name.trim() || !isMobile(form.phone) || !form.consent) return;
    keyRef.current ??= crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': keyRef.current },
        body: JSON.stringify({ ...form, role })
      });
      const j = await res.json().catch(() => ({}));
      if (res.status === 422 && j.errors) {
        setServerErrors(j.errors);
        setStatus('idle');
        return;
      }
      if (!res.ok) throw new Error(j.error || "Couldn't send. Please try again.");
      keyRef.current = null;
      setStatus('done');
    } catch (err) {
      setError(navigator.onLine ? (err as Error).message || "Couldn't send. Please try again." : "You're offline. Check your connection and try again.");
      setStatus('error');
    }
  }

  const reset = () => {
    setForm(EMPTY);
    setTried(false);
    setStatus('idle');
    setServerErrors({});
    setTimeout(() => nameRef.current?.focus(), 50);
  };

  if (status === 'done') {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="flex flex-col gap-3.5 outline-none">
        <span className="self-start rounded-full bg-green/10 px-3 py-1.5 text-xs font-semibold text-green">You&apos;re on the list</span>
        <h3 className="m-0 text-[clamp(28px,3.4vw,36px)] leading-[1.15] font-bold tracking-[-0.03em] text-plum">Thank you, {form.name.trim()}.</h3>
        <p className="m-0">
          We&apos;ll get in touch on <span className="whitespace-nowrap tabular-nums">+91 {form.phone.slice(0, 5)} {form.phone.slice(5)}</span> as soon as Samridhi opens near you.
        </p>
        <button type="button" onClick={reset} className="min-h-11 self-start font-semibold text-green underline underline-offset-[5px]">
          Add someone else
        </button>
      </div>
    );
  }

  return (
    <form action="/api/registrations" method="post" onSubmit={submit} noValidate={hydrated} className="relative flex flex-col gap-5">
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-2.5 p-0 text-sm font-bold text-plum">I&apos;d like to</legend>
        <div className="flex flex-wrap gap-2">
          {roles.map(r => (
            <label key={r} className="cursor-pointer">
              <input type="radio" name="role" value={r} checked={r === role} onChange={() => setRole(r)} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-line bg-white px-4 text-sm font-semibold text-plum transition-colors peer-checked:border-green peer-checked:bg-green peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-green/50">
                {r}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
        <label htmlFor="reg-name" className={labelCls}>
          Full name
          <input
            ref={nameRef}
            id="reg-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            value={form.name}
            onChange={set('name')}
            aria-invalid={!!nameErr}
            aria-describedby={nameErr ? 'reg-name-err' : undefined}
            className={`${input} ${nameErr ? 'border-critical' : 'border-line'}`}
          />
          {nameErr && (
            <span id="reg-name-err" className={errCls}>
              {nameErr}
            </span>
          )}
        </label>

        <label htmlFor="reg-phone" className={labelCls}>
          Mobile number
          <span className={`flex items-stretch overflow-hidden rounded-control border bg-[#faf8f9] ${phoneErr ? 'border-critical' : 'border-line'}`}>
            <span aria-hidden className="flex items-center border-r border-line px-3 font-mono text-base font-normal text-body">
              +91
            </span>
            <input
              id="reg-phone"
              name="phone"
              type="tel"
              required
              inputMode="numeric"
              pattern={MOBILE}
              maxLength={10}
              autoComplete="tel-national"
              title="10-digit mobile number starting with 6, 7, 8 or 9"
              placeholder="10 digits"
              value={form.phone}
              onChange={set('phone')}
              aria-invalid={!!phoneErr}
              aria-describedby={phoneErr ? 'reg-phone-err' : 'reg-phone-hint'}
              className="min-h-[50px] w-full min-w-0 bg-transparent px-3.5 font-mono text-base font-normal text-plum tabular-nums outline-none focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-accent"
            />
          </span>
          {phoneErr ? (
            <span id="reg-phone-err" className={errCls}>
              {phoneErr}
            </span>
          ) : (
            <span id="reg-phone-hint" className="sr-only">
              10 digits, without +91
            </span>
          )}
        </label>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
        <label htmlFor="reg-village" className={labelCls}>
          <span>
            Town or village <span className="font-normal text-muted">optional</span>
          </span>
          <input id="reg-village" name="village" type="text" maxLength={100} autoComplete="address-level3" value={form.village} onChange={set('village')} className={`${input} border-line`} />
        </label>
        <label htmlFor="reg-district" className={labelCls}>
          <span>
            District <span className="font-normal text-muted">optional</span>
          </span>
          <input id="reg-district" name="district" type="text" maxLength={100} autoComplete="address-level2" value={form.district} onChange={set('district')} className={`${input} border-line`} />
        </label>
      </div>

      <label htmlFor="reg-programme" className={labelCls}>
        <span>
          Programme <span className="font-normal text-muted">optional</span>
        </span>
        <select id="reg-programme" name="programme" value={form.programme} onChange={set('programme')} className={`${input} border-line px-3`}>
          <option value="">Not sure yet</option>
          {programmes.map(p => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-consent" className="flex min-h-11 cursor-pointer items-start gap-3 text-sm text-body">
          <input
            id="reg-consent"
            name="consent"
            type="checkbox"
            value="yes"
            required
            checked={form.consent}
            onChange={set('consent')}
            aria-invalid={!!consentErr}
            aria-describedby={consentErr ? 'reg-consent-err' : undefined}
            className="mt-0.5 size-5 shrink-0 accent-green"
          />
          <span>
            I agree that Samridhi (FAB5) may contact me about its programmes, as explained in the{' '}
            <a href="/privacy" className="font-semibold underline underline-offset-2">
              privacy notice
            </a>
            .
          </span>
        </label>
        {consentErr && (
          <span id="reg-consent-err" className={errCls}>
            {consentErr}
          </span>
        )}
      </div>

      {/* Honeypot: hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
        </label>
      </div>

      {status === 'error' && (
        <p role="alert" className="m-0 rounded-control border border-critical/30 bg-critical/5 px-4 py-3 text-[16px] text-critical">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="min-h-[54px] rounded-full bg-green px-[30px] text-base font-bold text-white transition-colors hover:bg-green-deep disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again' : 'Notify me'}
      </button>
      <p className="m-0 text-[13px] text-body">We use these details only to tell you about Samridhi. No spam, ever.</p>
    </form>
  );
}
