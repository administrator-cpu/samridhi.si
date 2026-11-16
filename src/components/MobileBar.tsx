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
        className={`fixed inset-x-0 bottom-0 z-20 grid gap-2 border-t border-line bg-white px-[max(12px,env(safe-area-inset-left))] pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] sm:hidden ${
          hasCall ? 'grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {hasCall && (
          <button type="button" onClick={() => setSheet(true)} className="min-h-12 rounded-full border-[1.5px] border-green font-semibold text-green">
            {contact.missedCall ? 'Give a missed call' : 'WhatsApp us'}
          </button>
        )}
        <a href="#register" className="flex min-h-12 items-center justify-center rounded-full bg-green font-bold text-white no-underline hover:text-white">
          Get notified
        </a>
      </div>

      {hasCall && (
        <div aria-hidden={!sheet} className={`fixed inset-0 z-50 transition-[visibility] duration-[420ms] sm:hidden ${sheet ? 'visible' : 'pointer-events-none invisible'}`}>
          <div onClick={() => setSheet(false)} className={`absolute inset-0 bg-plum/45 transition-opacity ${sheet ? 'opacity-100' : 'opacity-0'}`} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Reach us by phone"
            className={`absolute inset-x-0 bottom-0 flex flex-col gap-4 rounded-t-3xl bg-white px-6 pt-5 pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(43,27,48,0.2)] transition-transform duration-[420ms] ease-[cubic-bezier(.32,.72,0,1)] ${
              sheet ? 'translate-y-0' : 'translate-y-[105%]'
            }`}
          >
            <h2 className="m-0 text-[28px] leading-tight font-bold tracking-[-0.03em] text-plum">Reach us by phone</h2>
            {contact.missedCall && (
              <>
                <p className="m-0">Give a missed call. It&apos;s free: the call cuts off and we call you back in Hindi or English.</p>
                <a
                  href={`tel:+91${contact.missedCall}`}
                  tabIndex={sheet ? 0 : -1}
                  className="flex min-h-14 items-center justify-center rounded-full bg-green text-lg font-bold text-white tabular-nums no-underline hover:text-white"
                >
                  Call {pretty10(contact.missedCall)}
                </a>
              </>
            )}
            {contact.whatsapp && (
              <a
                href={`https://wa.me/91${contact.whatsapp}`}
                tabIndex={sheet ? 0 : -1}
                className="flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-green font-semibold text-green no-underline"
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
