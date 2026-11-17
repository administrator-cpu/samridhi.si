'use client';

import { useState } from 'react';
import Image from 'next/image';
import { aims } from '@/content/site';

/** "The stories we're here to write": what each programme is working towards. */
export function Aims() {
  const [i, setI] = useState(0);
  const a = aims[i];
  const go = (d: number) => setI(x => (x + d + aims.length) % aims.length);

  return (
    <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-[40px] bg-magenta-deep text-white">
      <div className="flex flex-col justify-center gap-6 p-[clamp(32px,5vw,72px)]">
        <span className="self-start rounded-full bg-plum/30 px-3 py-1.5 text-xs font-semibold">The change we&apos;re working towards</span>
        <h2 className="m-0 text-[clamp(30px,3.4vw,46px)] leading-[1.1] font-bold tracking-[-0.03em] text-white">The stories we&apos;re here to write.</h2>
        <div aria-live="polite" className="flex flex-col gap-3">
          <p className="m-0 text-[clamp(19px,1.6vw,22px)] leading-[1.45] font-semibold">{a.text}</p>
          <p className="m-0 text-sm font-semibold">{a.programme}</p>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="inline-flex size-12 items-center justify-center rounded-full border-[1.5px] border-white/80 text-white"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path d="M16 10H4M9 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" aria-label="Next" onClick={() => go(1)} className="inline-flex size-12 items-center justify-center rounded-full bg-white text-magenta-deep">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="ml-2 font-mono text-[13px]">
            {i + 1} / {aims.length}
          </span>
        </div>
      </div>
      <figure className="relative m-0 min-h-[460px]">
        <Image src={a.image} alt={a.alt} fill sizes="(max-width: 960px) 100vw, 960px" className="object-cover" />
        <figcaption className="absolute bottom-5 left-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-plum">{a.programme} · illustrative photo</figcaption>
      </figure>
    </div>
  );
}
