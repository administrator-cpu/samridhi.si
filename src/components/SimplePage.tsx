import { agency, contact, org } from '@/content/site';
import { Wordmark } from './Header';

/** Plain layout for the privacy, image credits and thank-you pages. */
export function SimplePage({ title, intro, children }: { title: string; intro?: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-line">
        <div aria-hidden className="brand-gradient h-[3px]" />
        <div className="mx-auto flex max-w-[860px] items-center justify-between gap-4 px-6 py-3.5">
          <a href="/" aria-label="Samridhi.si home" className="inline-flex min-h-11 items-center text-plum no-underline">
            <Wordmark className="text-2xl" />
          </a>
          <a href="/#register" className="inline-flex min-h-11 items-center rounded-full bg-green px-5 text-[15px] font-bold text-white no-underline hover:text-white">
            Get notified
          </a>
        </div>
      </header>
      <main id="main" className="mx-auto flex max-w-[860px] flex-col gap-6 px-6 py-[clamp(48px,8vw,96px)]">
        <h1 className="m-0 text-[clamp(34px,5vw,52px)] leading-[1.1] font-bold tracking-[-0.03em] text-plum">{title}</h1>
        {intro && <p className="m-0 text-lg text-body">{intro}</p>}
        <div className="flex flex-col gap-5 text-body">{children}</div>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[860px] flex-wrap justify-between gap-3 px-6 py-6 text-[13px] text-body">
          <span>
            A CSR initiative of FAB5 ({org.name}). <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </span>
          <a href={agency.creditUrl} className="inline-flex min-h-11 items-center text-body">
            <span className="mr-1.5 font-mono text-xs">Powered by &lt;Div/&gt;</span>· {agency.creditText}
          </a>
        </div>
      </footer>
    </>
  );
}
