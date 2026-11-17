import type { Metadata } from 'next';
import Image from 'next/image';
import { SimplePage } from '@/components/SimplePage';
import { contact, credits } from '@/content/site';

export const metadata: Metadata = {
  title: 'Image credits | Samridhi.si',
  description: 'Sources of the photographs used on samridhi.si.',
  alternates: { canonical: '/image-credits' }
};

export default function ImageCredits() {
  return (
    <SimplePage
      title="Image credits"
      intro="Samridhi has not launched yet, so every photo on this site is illustrative. None of them shows a Samridhi participant, class or centre."
    >
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 p-0">
        {credits.map(c => (
          <li key={c.file} className="flex flex-col gap-2">
            <span className="relative block aspect-[4/3] overflow-hidden rounded-control bg-canvas">
              <Image src={c.file} alt={c.description} fill sizes="280px" className="object-cover" />
            </span>
            <span className="text-[15px] font-semibold text-plum">{c.description}</span>
            <span className="text-sm">{c.source || 'Illustrative image'}</span>
          </li>
        ))}
      </ul>
      <p className="m-0">
        If you own one of these images and would like it credited differently or removed, write to <a href={`mailto:${contact.email}`}>{contact.email}</a> and we
        will act on it promptly.
      </p>
    </SimplePage>
  );
}
