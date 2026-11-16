'use client';

import { useEffect, useRef, useState } from 'react';
import { programmes, roles, type Role } from '@/content/site';
import { ROLE_EVENT, type RolePick } from './RoleLink';

type Form = { name: string; phone: string; village: string; district: string; programme: string; website: string };
const EMPTY: Form = { name: '', phone: '', village: '', district: '', programme: '', website: '' };


const input =
  'min-h-[50px] rounded-control border bg-[#faf8f9] px-3.5 text-base font-normal text-plum outline-none focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-accent';

export function RegisterForm() {
  const [role, setRole] = useState<Role>(roles[0]);
  const [form, setForm] = useState<Form>(EMPTY);
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [serverErrors, setServerErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const keyRef = useRef<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

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
    const v = k === 'phone' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value;
    setForm(f => ({ ...f, [k]: v }));
    setServerErrors(s => ({ ...s, [k]: undefined }));
  };

  const nameErr = (tried && !form.name.trim() ? 'Please enter your name.' : '') || serverErrors.name || '';
  const phoneErr = (tried && !/^[6-9]\d{9}$/.test(form.phone) ? 'Enter a 10-digit mobile number.' : '') || serverErrors.phone || '';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTried(true);
    if (!form.name.trim() || !/^[6-9]\d{9}$/.test(form.phone)) return;
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

  const phonePretty = form.phone ? `+91 ${form.phone.slice(0, 5)} ${form.phone.slice(5)}` : '';

  if (status === 'done') {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="flex flex-col gap-3.5 outline-none">
        <span className="self-start rounded-full bg-green/10 px-3 py-1.5 text-xs font-semibold text-green">You&apos;re on the list</span>
        <h3 className="m-0 text-[clamp(28px,3.4vw,36px)] leading-[1.15] font-bold tracking-[-0.03em] text-plum">Thank you, {form.name.trim()}.</h3>
        <p>
          We&apos;ll get in touch on <span className="whitespace-nowrap tabular-nums">{phonePretty}</span> as soon as Samridhi opens near you.
        </p>
        <button type="button" onClick={reset} className="-my-3 self-start py-3 font-semibold text-green underline underline-offset-[5px]">
          Add someone else
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative flex flex-col gap-5">
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-sm font-bold text-plum">I&apos;d like to</legend>
        <div className="flex flex-wrap gap-2">
          {roles.map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              aria-pressed={r === role}
              className={`min-h-11 rounded-full border-[1.5px] px-4 text-sm font-semibold transition-colors ${
                r === role ? 'border-green bg-green text-white' : 'border-line bg-white text-plum hover:border-green/50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
      <label className="flex flex-col gap-1.5 text-sm font-bold text-plum">
        Full name
        <input
          ref={nameRef}
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={set('name')}
          aria-invalid={!!nameErr}
          aria-describedby={nameErr ? 'name-err' : undefined}
          className={`${input} ${nameErr ? 'border-critical' : 'border-line'}`}
        />
        {nameErr && (
          <span id="name-err" className="text-[15px] font-normal text-critical">
            {nameErr}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-bold text-plum">
        <span>
          Mobile number <span className="font-normal text-muted">10 digits</span>
        </span>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          value={form.phone}
          onChange={set('phone')}
          aria-invalid={!!phoneErr}
          aria-describedby={phoneErr ? 'phone-err' : undefined}
          className={`${input} font-mono tabular-nums ${phoneErr ? 'border-critical' : 'border-line'}`}
        />
        {phoneErr && (
          <span id="phone-err" className="text-[15px] font-normal text-critical">
            {phoneErr}
          </span>
        )}
      </label>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
        <label className="flex flex-col gap-1.5 text-sm font-bold text-plum">
          Town or village
          <input type="text" autoComplete="address-level3" value={form.village} onChange={set('village')} className={`${input} border-line`} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-bold text-plum">
          District
          <input type="text" autoComplete="address-level2" value={form.district} onChange={set('district')} className={`${input} border-line`} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-bold text-plum">
        <span>
          Programme <span className="font-normal text-muted">optional</span>
        </span>
        <select value={form.programme} onChange={set('programme')} className={`${input} border-line px-3`}>
          <option value="">Not sure yet</option>
          {programmes.map(p => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      {/* Honeypot: hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
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
