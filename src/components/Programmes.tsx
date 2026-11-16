'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { programmes } from '@/content/site';
import { RoleLink, SLIDE_EVENT, pickSlide } from './RoleLink';

function useSlide() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const on = (e: Event) => setIndex((e as CustomEvent<number>).detail);
    window.addEventListener(SLIDE_EVENT, on);
    return () => window.removeEventListener(SLIDE_EVENT, on);
  }, []);
  return index;
}

const n = programmes.length;
const wrap = (i: number) => (i + n) % n;

/** The five cards under the hero. Clicking one opens it in the carousel below. */
export function ProgrammeCards() {
  const active = useSlide();
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
      {programmes.map((p, i) => {
        const on = i === active;
        return (
          <button
            key={p.name}
            type="button"
            aria-pressed={on}
            onClick={() => {
              pickSlide(i);
              document.getElementById('programmes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`flex flex-col rounded-[20px] border-[1.5px] bg-white p-2 text-left text-plum transition-shadow ${
              on ? 'border-green shadow-[0_14px_30px_rgba(21,128,61,0.18)]' : 'border-cream-line shadow-[0_1px_2px_rgba(43,27,48,0.05)] hover:border-green/50'
            }`}
          >
            <span className="relative block h-[150px] overflow-hidden rounded-[14px]">
              <Image src={p.card.image} alt="" fill sizes="(max-width: 640px) 100vw, 260px" className="object-cover" />
              <span className="absolute bottom-2.5 left-2.5 max-w-[calc(100%-20px)] truncate rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold">{p.line}</span>
            </span>
            <span className="flex grow flex-col gap-1.5 px-2.5 pt-3.5 pb-2.5">
              <span className="text-lg leading-tight font-bold tracking-[-0.02em]">{p.name}</span>
              <span className="grow text-sm leading-normal text-body">{p.text}</span>
              <span className="mt-2 text-sm font-bold text-green">See programme →</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

const ArrowIcon = ({ back = false }: { back?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
    <path d={back ? 'M16 10H4M9 5l-5 5 5 5' : 'M4 10h12M11 5l5 5-5 5'} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** "Different dreams" carousel: the current programme in colour, its neighbours in grey. */
export function ProgrammeCarousel() {
  const i = useSlide();
  const cur = programmes[i];
  const prev = programmes[wrap(i - 1)];
  const next = programmes[wrap(i + 1)];
  const round = 'inline-flex size-12 items-center justify-center rounded-full border-[1.5px] border-line bg-white text-plum';

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center justify-center gap-5 px-6" aria-live="polite">
        <div className="relative hidden h-[300px] w-[240px] overflow-hidden rounded-3xl grayscale lg:block">
          <Image src={prev.slide.image} alt="" fill sizes="240px" className="object-cover" />
        </div>
        <article className="relative w-[320px] max-w-full shrink-0 overflow-hidden rounded-[28px] bg-plum shadow-[0_24px_48px_rgba(43,27,48,0.18)]">
          <div className="relative h-[420px]">
            <Image src={cur.slide.image} alt={cur.slide.alt} fill sizes="320px" className="object-cover" />
          </div>
          <div className="absolute inset-x-0 top-0 flex flex-col gap-2.5 bg-gradient-to-b from-plum/85 to-plum/0 p-5">
            <span className="self-start rounded-full bg-magenta-deep px-2.5 py-1 text-[11px] font-bold text-white">{cur.name}</span>
            <h3 className="m-0 text-2xl leading-tight font-bold text-white">{cur.title}</h3>
          </div>
          <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1 rounded-2xl bg-white px-4 py-3.5">
            <span className="text-sm font-bold text-plum">Launching soon · register your interest</span>
            <span className="text-[13px] text-body">Locations to be announced</span>
          </div>
        </article>
        <div className="relative hidden h-[300px] w-[240px] overflow-hidden rounded-3xl grayscale lg:block">
          <Image src={next.slide.image} alt="" fill sizes="240px" className="object-cover" />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5 px-6">
        <button type="button" aria-label="Previous programme" onClick={() => pickSlide(wrap(i - 1))} className={round}>
          <ArrowIcon back />
        </button>
        <RoleLink
          pick={{ role: 'Join a programme', programme: cur.name }}
          className="inline-flex min-h-12 min-w-[240px] items-center justify-center rounded-full bg-green px-6 font-bold text-white no-underline hover:bg-green-deep hover:text-white"
        >
          Get updates on {cur.name}
        </RoleLink>
        <button type="button" aria-label="Next programme" onClick={() => pickSlide(wrap(i + 1))} className={round}>
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
