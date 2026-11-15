'use client';

import { useEffect, useState } from 'react';
import { contact, pretty10 } from '@/content/site';

/** Sticky bottom bar on phones. The call/WhatsApp button appears only when a number is set. */
export function MobileBar() {
  const [sheet, setSheet] = useState(false);
  const hasCall = !!(contact.missedCall || contact.whatsapp);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-20 grid gap-2 border-t border-line bg-canvas px-[max(12px,env(safe-area-inset-left))] pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] md:hidden ${
          hasCall ? 'grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {hasCall && (
          <button
            type="button"
            onClick={() => setSheet(true)}
            className="min-h-12 rounded-control border-[1.5px] border-plum font-semibold text-plum"
          >
            {contact.missedCall ? 'Give a missed call' : 'WhatsApp us'}
          </button>
        )}
        <a href="#register" className="flex min-h-12 items-center justify-center rounded-control bg-plum font-semibold text-white no-underline hover:text-white">
          Register free
        </a>
      </div>

      {hasCall && (
        <div aria-hidden={!sheet} className={`fixed inset-0 z-50 transition-[visibility] duration-[420ms] md:hidden ${sheet ? 'visible' : 'pointer-events-none invisible'}`}>
          <div onClick={() => setSheet(false)} className={`absolute inset-0 bg-plum/45 transition-opacity ${sheet ? 'opacity-100' : 'opacity-0'}`} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Register by phone"
            className={`absolute inset-x-0 bottom-0 flex flex-col gap-4 rounded-t-3xl bg-canvas px-6 pt-5 pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(43,27,48,0.2)] transition-transform duration-[420ms] ease-[cubic-bezier(.32,.72,0,1)] ${
              sheet ? 'translate-y-0' : 'translate-y-[105%]'
            }`}
          >
            <h2 className="h-display m-0 text-[32px] leading-[1.15]">Register by phone</h2>
            {contact.missedCall && (
              <>
                <p className="m-0">Give a missed call. It&apos;s free: the call cuts off and we call you back in Hindi or English.</p>
                <a
                  href={`tel:+91${contact.missedCall}`}
                  tabIndex={sheet ? 0 : -1}
                  className="flex min-h-14 items-center justify-center rounded-control bg-plum text-lg font-semibold text-white tabular-nums no-underline hover:text-white"
                >
                  Call {pretty10(contact.missedCall)}
                </a>
              </>
            )}
            {contact.whatsapp && (
              <a
                href={`https://wa.me/91${contact.whatsapp}`}
                tabIndex={sheet ? 0 : -1}
                className="flex min-h-[52px] items-center justify-center rounded-control border-[1.5px] border-plum font-semibold text-plum no-underline"
              >
                Message us on WhatsApp
              </a>
            )}
            <button type="button" onClick={() => setSheet(false)} tabIndex={sheet ? 0 : -1} className="py-2 text-[15px] text-muted">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
