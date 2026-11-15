'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { nav, programmes } from '@/content/site';
import { RoleLink } from './RoleLink';

export function Header({ showStories }: { showStories: boolean }) {
  const links = useMemo(() => nav.filter(n => !n.needsStories || showStories), [showStories]);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('');
  const [menu, setMenu] = useState(false); // programmes dropdown (desktop)
  const [drawer, setDrawer] = useState(false); // mobile menu
  const [preview, setPreview] = useState(0);
  const closeT = useRef<ReturnType<typeof setTimeout>>(undefined);

  // hide on scroll down, show on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      setScrolled(y > 8);
      if (y < 480 || dy < -4) setHidden(false);
      else if (dy > 4) setHidden(true);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // highlight the section in view
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: '-45% 0px -50% 0px'
    });
    links.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [links]);

  // Esc closes menus; lock scroll under the drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        setDrawer(false);
      }
    };
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = drawer ? 'hidden' : '';
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer]);

  const p = programmes[preview];
  const showHeader = !hidden || menu || drawer;

  return (
    <>
      <header
        onMouseLeave={() => {
          clearTimeout(closeT.current);
          closeT.current = setTimeout(() => setMenu(false), 200);
        }}
        onMouseEnter={() => clearTimeout(closeT.current)}
        className={`sticky top-0 z-30 border-b backdrop-blur-md transition-[transform,background-color,border-color] duration-300 ${
          scrolled ? 'border-line bg-canvas/85' : 'border-transparent bg-canvas'
        } ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div aria-hidden className="brand-gradient h-[3px]" />
        <div className="gutter mx-auto grid max-w-[1280px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 py-3">
          <a href="#top" aria-label="Samridhi.si by FAB5, home" className="py-1 text-[27px] leading-none font-extrabold tracking-[-0.03em] text-plum no-underline">
            Samridhi<span className="text-amber">.si</span>
          </a>

          <nav aria-label="Main" className="hidden items-center justify-center gap-[clamp(18px,2.2vw,30px)] text-[17px] font-medium xl:flex">
            {links.map(l => {
              const on = active === l.id;
              const isProg = l.id === 'programmes';
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  aria-current={on ? 'location' : undefined}
                  {...(isProg
                    ? {
                        'aria-expanded': menu,
                        'aria-haspopup': true,
                        onMouseEnter: () => setMenu(true),
                        onClick: (e: React.MouseEvent) => {
                          e.preventDefault();
                          setMenu(m => !m);
                        }
                      }
                    : { onClick: () => setMenu(false) })}
                  className={`relative inline-flex items-center gap-1.5 px-0.5 py-3 whitespace-nowrap no-underline transition-colors hover:text-plum ${on ? 'text-plum' : 'text-body'}`}
                >
                  {l.label}
                  {isProg && (
                    <svg aria-hidden width="10" height="10" viewBox="0 0 10 10" className={`transition-transform ${menu ? 'rotate-180' : ''}`}>
                      <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0.5 bottom-1.5 h-0.5 origin-left rounded-sm bg-amber transition-transform duration-250 ${on ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </a>
              );
            })}
          </nav>
          <span className="xl:hidden" />

          <div className="flex items-center gap-2.5">
            <a
              href="#register"
              className="hidden min-h-[42px] items-center rounded-control bg-plum px-5 font-semibold whitespace-nowrap text-white no-underline transition-colors hover:bg-plum-2 hover:text-white xl:inline-flex"
            >
              Register free
            </a>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              aria-expanded={drawer}
              className="inline-flex h-[42px] items-center gap-2.5 rounded-control bg-plum px-3.5 font-semibold text-canvas xl:hidden"
            >
              <span aria-hidden className="flex flex-col gap-1">
                <span className="h-0.5 w-4 rounded-sm bg-canvas" />
                <span className="h-0.5 w-[11px] rounded-sm bg-canvas" />
              </span>
              Menu
            </button>
          </div>
        </div>

        {/* Programmes dropdown */}
        <div
          role="region"
          aria-label="Programmes menu"
          hidden={!menu}
          className="absolute inset-x-0 top-full hidden border-b border-line bg-canvas shadow-[0_24px_48px_rgba(43,27,48,0.10)] xl:block"
        >
          <div className="gutter mx-auto grid max-w-[1280px] grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-12 pt-7 pb-9">
            <ul className="flex flex-col">
              {programmes.map((x, i) => (
                <li key={x.name}>
                  <a
                    href="#programmes"
                    onMouseEnter={() => setPreview(i)}
                    onFocus={() => setPreview(i)}
                    onClick={() => setMenu(false)}
                    className={`flex items-baseline justify-between gap-4 rounded-control px-4 py-3 text-plum no-underline ${i === preview ? 'bg-tint' : ''}`}
                  >
                    <span className="text-2xl leading-tight font-bold tracking-[-0.02em]">{x.name}</span>
                    <span lang="hi" className="text-[15px] text-muted">
                      {x.hi}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start gap-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist">
                <Image key={p.image} src={p.image} alt={p.alt} fill sizes="420px" className="object-cover" style={{ objectPosition: p.pos }} />
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[13px] text-muted">
                  {p.stage} · 0{preview + 1}
                </span>
                <span className="text-[22px] leading-snug font-semibold text-balance text-plum">{p.headline}</span>
                <span className="text-[17px] text-pretty">{p.desc}</span>
                <span onClick={() => setMenu(false)} className="mt-1.5 self-start">
                  <RoleLink pick={{ role: 'Join a class', programme: p.name }} className="block py-2.5 font-semibold underline decoration-[1.5px] underline-offset-[6px]">
                    Register for {p.name}
                  </RoleLink>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div aria-hidden={!drawer} className={`fixed inset-0 z-50 transition-[visibility] duration-[380ms] ${drawer ? 'visible' : 'pointer-events-none invisible'}`}>
        <div onClick={() => setDrawer(false)} className={`absolute inset-0 bg-plum/45 transition-opacity duration-300 ${drawer ? 'opacity-100' : 'opacity-0'}`} />
        <nav
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 right-0 flex w-[min(420px,100vw)] flex-col overflow-y-auto bg-canvas px-6 pt-[max(8px,env(safe-area-inset-top))] pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[-24px_0_60px_rgba(43,27,48,0.22)] transition-transform duration-[380ms] ease-[cubic-bezier(.32,.72,0,1)] ${
            drawer ? 'translate-x-0' : 'translate-x-[104%]'
          }`}
        >
          <div className="flex items-center justify-between pb-2">
            <span className="text-2xl font-extrabold tracking-[-0.03em] text-plum">
              Samridhi<span className="text-amber">.si</span>
            </span>
            <button type="button" onClick={() => setDrawer(false)} aria-label="Close menu" tabIndex={drawer ? 0 : -1} className="size-11 text-[26px] leading-none text-plum">
              ×
            </button>
          </div>
          {[...links, { label: 'Contact', id: 'contact' }].map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              tabIndex={drawer ? 0 : -1}
              onClick={() => setDrawer(false)}
              className="flex min-h-14 items-center justify-between border-b border-line text-[24px] font-bold tracking-[-0.02em] text-plum no-underline"
            >
              {l.label}
              <span aria-hidden className="text-xl text-accent">
                →
              </span>
            </a>
          ))}
          <a
            href="#register"
            tabIndex={drawer ? 0 : -1}
            onClick={() => setDrawer(false)}
            className="mt-5 flex min-h-14 items-center justify-center rounded-control bg-plum text-lg font-semibold text-white no-underline hover:text-white"
          >
            Register free
          </a>
        </nav>
      </div>
    </>
  );
}
