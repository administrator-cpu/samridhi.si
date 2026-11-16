'use client';

import { useEffect, useRef, useState } from 'react';
import { nav } from '@/content/site';

export const Wordmark = ({ className = '', dot = 'text-magenta-deep' }: { className?: string; dot?: string }) => (
  <span className={`font-extrabold tracking-[-0.04em] ${className}`}>
    samridhi<span className={dot}>.si</span>
  </span>
);

export function Header() {
  const [drawer, setDrawer] = useState(false);
  const [active, setActive] = useState('');
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Highlight the section in view.
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    nav.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Esc closes the drawer; lock scroll under it; move focus in and back out.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = drawer ? 'hidden' : '';
    if (drawer) closeBtn.current?.focus();
    else if (wasOpen.current) menuBtn.current?.focus();
    wasOpen.current = drawer;
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer]);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md">
        <div aria-hidden className="brand-gradient h-[3px]" />
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-6 py-3.5">
          <a href="#top" aria-label="Samridhi.si home" className="text-plum no-underline">
            <Wordmark className="text-2xl" />
          </a>
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {nav.map(l => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? 'location' : undefined}
                className={`py-2.5 text-[15px] font-medium no-underline hover:text-green ${active === l.id ? 'text-green' : 'text-plum'}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <a
              href="#register"
              className="hidden min-h-11 items-center rounded-full bg-green px-[22px] text-[15px] font-bold text-white no-underline hover:bg-green-deep hover:text-white sm:inline-flex"
            >
              Get notified
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              aria-expanded={drawer}
              className="inline-flex h-11 items-center gap-2.5 rounded-full border-[1.5px] border-line px-4 font-semibold text-plum lg:hidden"
            >
              <span aria-hidden className="flex flex-col gap-1">
                <span className="h-0.5 w-4 rounded-sm bg-plum" />
                <span className="h-0.5 w-[11px] rounded-sm bg-plum" />
              </span>
              Menu
            </button>
          </div>
        </div>
      </header>

      <div aria-hidden={!drawer} className={`fixed inset-0 z-50 transition-[visibility] duration-[380ms] ${drawer ? 'visible' : 'pointer-events-none invisible'}`}>
        <div onClick={() => setDrawer(false)} className={`absolute inset-0 bg-plum/45 transition-opacity duration-300 ${drawer ? 'opacity-100' : 'opacity-0'}`} />
        <nav
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 right-0 flex w-[min(420px,100vw)] flex-col overflow-y-auto bg-white px-6 pt-[max(8px,env(safe-area-inset-top))] pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[-24px_0_60px_rgba(43,27,48,0.22)] transition-transform duration-[380ms] ease-[cubic-bezier(.32,.72,0,1)] ${
            drawer ? 'translate-x-0' : 'translate-x-[104%]'
          }`}
        >
          <div className="flex items-center justify-between pb-2">
            <Wordmark className="text-2xl text-plum" />
            <button ref={closeBtn} type="button" onClick={() => setDrawer(false)} aria-label="Close menu" tabIndex={drawer ? 0 : -1} className="size-11 text-[26px] leading-none text-plum">
              ×
            </button>
          </div>
          {[...nav, { label: 'FAQ', id: 'faq' }].map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              tabIndex={drawer ? 0 : -1}
              onClick={() => setDrawer(false)}
              className="flex min-h-14 items-center justify-between border-b border-line text-2xl font-bold tracking-[-0.02em] text-plum no-underline"
            >
              {l.label}
              <span aria-hidden className="text-xl text-green">
                →
              </span>
            </a>
          ))}
          <a
            href="#register"
            tabIndex={drawer ? 0 : -1}
            onClick={() => setDrawer(false)}
            className="mt-5 flex min-h-14 items-center justify-center rounded-full bg-green text-lg font-bold text-white no-underline hover:text-white"
          >
            Get notified
          </a>
        </nav>
      </div>
    </>
  );
}
