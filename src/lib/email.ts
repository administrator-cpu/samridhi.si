import type { Registration } from './validate';

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const prettyPhone = (p: string) => `+91 ${p.slice(0, 5)} ${p.slice(5)}`;

export function buildRegistrationEmail(reg: Registration, submittedAt = new Date()) {
  const when = submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  const rows: [string, string][] = [
    ['Wants to', reg.role],
    ['Name', reg.name],
    ['Mobile', prettyPhone(reg.phone)],
    ['Village or town', reg.village || '—'],
    ['District', reg.district || '—'],
    ['Programme', reg.programme || 'Not sure yet'],
    ['Submitted', `${when} IST`]
  ];

  const subject = `New Samridhi registration: ${reg.name} (${reg.role})`;

  const text = `New registration from samridhi.si\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nPlease get in touch when a programme opens near them.\n`;

  const html = `<!doctype html>
<html><body style="margin:0;background:#F6F3F5;font-family:Arial,Helvetica,sans-serif;color:#2B1B30">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F3F5;padding:24px 0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FFFFFF;border:1px solid #E5E0E6;border-radius:16px;overflow:hidden">
<tr><td style="height:3px;background:#FF0091;background:linear-gradient(90deg,#FF0091,#FFAC00)"></td></tr>
<tr><td style="padding:24px 28px 8px">
<div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#766C7C">Samridhi.si · new registration</div>
<h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#2B1B30">${esc(reg.name)} wants to ${esc(reg.role.toLowerCase())}</h1>
</td></tr>
<tr><td style="padding:12px 28px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:10px 0;border-bottom:1px solid #E5E0E6;color:#766C7C;width:40%">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #E5E0E6;color:#2B1B30;font-weight:600">${
        k === 'Mobile' ? `<a href="tel:+91${esc(reg.phone)}" style="color:#2B1B30">${esc(v)}</a>` : esc(v)
      }</td></tr>`
  )
  .join('\n')}
</table></td></tr>
<tr><td style="padding:16px 28px 28px;font-size:14px;color:#52465A">Please get in touch when a programme opens near them.</td></tr>
</table>
<div style="padding:16px;font-size:12px;color:#766C7C">Sent automatically from the registration form on samridhi.si</div>
</td></tr></table>
</body></html>`;

  return { subject, html, text };
}
