'use client';

import { useEffect, useRef, useState } from 'react';
import { programmes, roles, type Role } from '@/content/site';
import { ROLE_EVENT, type RolePick } from './RoleLink';

type Form = { name: string; phone: string; village: string; district: string; programme: string; website: string };
const EMPTY: Form = { name: '', phone: '', village: '', district: '', programme: '', website: '' };

const submitLabel = (r: Role) =>
  r === 'Join a class' ? 'Register for a free class' : r === 'Volunteer' ? 'Sign up to volunteer' : 'Send partner enquiry';

const input =
  'min-h-[50px] rounded-control border-[1.5px] bg-white px-3.5 font-normal text-plum outline-none focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-amber';

export function RegisterForm() {
  const [role, setRole] = useState<Role>('Join a class');
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
        <span className="label-mono text-body">Received</span>
        <h3 className="h-display text-[clamp(30px,4vw,36px)] leading-[1.15]">Thank you, {form.name.trim()}.</h3>
        <p>
          We&apos;ll call <span className="whitespace-nowrap tabular-nums">{phonePretty}</span> within 2 working days to find a batch and time that suit you.
        </p>
        <button type="button" onClick={reset} className="-my-3 self-start py-3 font-semibold text-plum underline underline-offset-[5px]">
          Register someone else
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative flex flex-col gap-[22px]">
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 font-semibold text-plum">I want to</legend>
        <div className="flex flex-wrap gap-2">
          {roles.map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              aria-pressed={r === role}
              className={`min-h-11 rounded-control border-[1.5px] border-plum px-[18px] text-base font-semibold transition-colors ${
                r === role ? 'bg-plum text-canvas' : 'bg-transparent text-plum hover:bg-tint'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5 font-semibold text-plum">
        Your name
        <input
          ref={nameRef}
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={set('name')}
          aria-invalid={!!nameErr}
          aria-describedby={nameErr ? 'name-err' : undefined}
          className={`${input} ${nameErr ? 'border-critical' : 'border-faint'}`}
        />
        {nameErr && (
          <span id="name-err" className="text-[15px] font-normal text-critical">
            {nameErr}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-1.5 font-semibold text-plum">
        <span>
          Mobile number <span className="text-[15px] font-normal text-muted">10 digits, no +91</span>
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
          className={`${input} font-mono tabular-nums ${phoneErr ? 'border-critical' : 'border-faint'}`}
        />
        {phoneErr && (
          <span id="phone-err" className="text-[15px] font-normal text-critical">
            {phoneErr}
          </span>
        )}
      </label>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[22px]">
        <label className="flex flex-col gap-1.5 font-semibold text-plum">
          Village or town
          <input type="text" autoComplete="address-level3" value={form.village} onChange={set('village')} className={`${input} border-faint`} />
        </label>
        <label className="flex flex-col gap-1.5 font-semibold text-plum">
          District
          <input type="text" autoComplete="address-level2" value={form.district} onChange={set('district')} className={`${input} border-faint`} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 font-semibold text-plum">
        <span>
          Programme <span className="text-[15px] font-normal text-muted">optional</span>
        </span>
        <select value={form.programme} onChange={set('programme')} className={`${input} border-faint px-3`}>
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
        className="min-h-[54px] self-start rounded-control bg-plum px-[30px] text-lg font-semibold whitespace-nowrap text-white transition-colors hover:bg-plum-2 disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again' : submitLabel(role)}
      </button>
      <p className="m-0 text-[15px] text-muted">We only use your number to contact you about Samridhi.</p>
    </form>
  );
}
