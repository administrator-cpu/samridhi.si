import Image from 'next/image';
import { Aims } from '@/components/Aims';
import { Header, Wordmark } from '@/components/Header';
import { MobileBar } from '@/components/MobileBar';
import { ProgrammeCards, ProgrammeCarousel } from '@/components/Programmes';
import { RegisterForm } from '@/components/RegisterForm';
import { RoleLink } from '@/components/RoleLink';
import { about, agency, contact, faqs, hero, involve, org, promises, registerImage } from '@/content/site';

const Pill = ({ children, className = 'bg-canvas' }: { children: React.ReactNode; className?: string }) => (
  <span className={`self-start rounded-full px-3 py-1.5 text-xs font-semibold ${className}`}>{children}</span>
);

const big = 'text-[clamp(44px,6.4vw,88px)] leading-[0.98] font-extrabold tracking-[-0.045em]';

/** The Wi-Fi signal mask: three arcs and a dot, one photo showing through. FAB5 is a broadband company. */
function WifiPhoto() {
  return (
    <svg viewBox="-40 30 680 520" role="img" aria-label={hero.alt} className="w-full max-w-[580px] justify-self-end overflow-visible">
      <defs>
        <mask id="samridhiWifi" maskUnits="userSpaceOnUse" x="-40" y="30" width="680" height="520">
          <rect x="-40" y="30" width="680" height="520" fill="#000" />
          <path d="M 192.8 380 A 140 140 0 0 1 407.2 380" fill="none" stroke="#fff" strokeWidth="96" strokeLinecap="round" />
          <path d="M 108.5 309.3 A 250 250 0 0 1 491.5 309.3" fill="none" stroke="#fff" strokeWidth="96" strokeLinecap="round" />
          <path d="M 24.2 238.5 A 360 360 0 0 1 575.8 238.5" fill="none" stroke="#fff" strokeWidth="96" strokeLinecap="round" />
          <circle cx="300" cy="470" r="76" fill="#fff" />
        </mask>
      </defs>
      <image href={hero.image} x="-40" y="30" width="680" height="520" preserveAspectRatio="xMaxYMid slice" mask="url(#samridhiWifi)" />
      <circle cx="560" cy="430" r="22" fill="#E6007E" />
      <circle cx="40" cy="420" r="14" fill="#FFAC00" />
      <circle cx="610" cy="120" r="10" fill="#15803D" />
      <circle cx="-6" cy="110" r="8" fill="#E6007E" />
    </svg>
  );
}

function Circles({ items }: { items: { image: string; size: number }[] }) {
  return (
    <div aria-hidden className="flex flex-wrap items-center justify-center gap-5">
      {items.map(c => (
        <span key={c.image} className="relative shrink-0 overflow-hidden rounded-full" style={{ width: c.size, height: c.size }}>
          <Image src={c.image} alt="" fill sizes={`${c.size * 2}px`} className="object-cover" />
        </span>
      ))}
    </div>
  );
}

const Arrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  return (
    <>
      <a href="#main" className="absolute -top-16 left-4 z-[60] rounded-[10px] bg-plum px-4 py-2.5 text-white no-underline focus:top-3 focus:text-white">
        Skip to main content
      </a>

      <Header />

      <main id="main">
        {/* Hero */}
        <section id="top" aria-labelledby="hero-title" className="px-4">
          <div className="hero-ripples mx-auto flex max-w-[1320px] flex-col gap-10 rounded-[32px] border border-[#f5e6cf] p-[clamp(28px,4vw,56px)]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-6">
              <div className="flex flex-col gap-6">
                <h1 id="hero-title" className="m-0 text-[clamp(26px,3vw,42px)] leading-[1.15] font-bold tracking-[-0.03em] text-plum">
                  <span className={`block ${big}`}>Samridhi</span>
                  tabhi sachchi hai, jab woh <span className={big}>sabki</span> ho.
                </h1>
                <p className="m-0 max-w-[480px] text-xl font-semibold">Because progress means more when we grow together.</p>
                <p className="m-0 max-w-[480px] text-[17px] text-body">We bring knowledge, technology and opportunity to the people and places that have been left out.</p>
                <div className="flex items-center gap-2.5">
                  <a href="#programmes" className="inline-flex min-h-12 items-center rounded-full bg-green px-6 font-bold text-white no-underline hover:bg-green-deep hover:text-white">
                    Explore our initiatives
                  </a>
                  <a href="#programmes" aria-label="Explore our initiatives" className="inline-flex size-12 items-center justify-center rounded-full border border-line bg-white text-plum">
                    <Arrow />
                  </a>
                </div>
              </div>
              <WifiPhoto />
            </div>
            <ProgrammeCards />
          </div>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-title" className="px-6 py-[clamp(72px,10vw,120px)]">
          <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] items-center gap-10">
            <Circles items={about.left} />
            <div className="flex flex-col items-center gap-4.5 text-center">
              <Pill className="self-center bg-canvas">About us</Pill>
              <h2 id="about-title" className="m-0 text-[clamp(30px,3.2vw,42px)] leading-[1.15] font-bold tracking-[-0.03em] text-plum">
                A small opportunity can change an <span className="text-green">entire life.</span>
              </h2>
              <p className="m-0 max-w-[440px] text-body">
                Sometimes all it takes is the right guidance, a new skill or access to technology to change someone&apos;s tomorrow. That is what Samridhi sets out to give.
              </p>
              <a href="#programmes" className="font-bold">
                See our programmes →
              </a>
            </div>
            <Circles items={about.right} />
          </div>
        </section>

        {/* Programmes */}
        <section id="programmes" aria-labelledby="prog-title" className="pb-[clamp(72px,10vw,120px)]">
          <h2 id="prog-title" className="mx-auto mb-14 max-w-[640px] px-6 text-center text-[clamp(30px,3.2vw,42px)] leading-[1.15] font-bold tracking-[-0.03em] text-plum">
            Different dreams. Different journeys. One shared future.
          </h2>
          <ProgrammeCarousel />
        </section>

        {/* What we're working towards */}
        <section aria-label="The change we're working towards" className="px-6 pb-[clamp(72px,10vw,120px)]">
          <Aims />
        </section>

        {/* Our promise */}
        <section id="promise" aria-labelledby="promise-title" className="px-6 pb-[clamp(72px,10vw,120px)]">
          <div className="relative mx-auto flex min-h-[480px] max-w-[1240px] flex-col justify-between gap-12 overflow-hidden rounded-[40px] bg-green p-[clamp(32px,4.5vw,60px)] text-white">
            <span aria-hidden className="absolute -top-[260px] -right-[180px] h-[620px] w-[820px] rounded-full bg-green-mid" />
            <span aria-hidden className="absolute -right-[240px] -bottom-[320px] h-[640px] w-[560px] rounded-full bg-green-deep" />
            <div className="relative flex flex-wrap justify-between gap-4">
              <div className="flex max-w-[460px] flex-col gap-4.5">
                <Pill className="bg-white/15">Our promise</Pill>
                <h2 id="promise-title" className="m-0 text-[clamp(32px,3.6vw,46px)] leading-[1.1] font-bold tracking-[-0.03em] text-white">
                  We&apos;ll show our work from day one.
                </h2>
                <p className="m-0 max-w-[440px]">
                  Samridhi is just getting started. We don&apos;t believe in just giving; we believe in enabling, and in being open about how it goes.
                </p>
              </div>
              <Wordmark className="text-xl" dot="text-amber" />
            </div>
            <ol className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4 p-0">
              {promises.map((p, i) => (
                <li key={p.title} className="flex flex-col gap-2 rounded-[20px] bg-white/12 p-6">
                  <span className="font-mono text-[13px]">0{i + 1}</span>
                  <strong className="text-xl font-bold">{p.title}</strong>
                  <span className="text-[15px]">{p.desc}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Get involved */}
        <section id="involved" aria-labelledby="inv-title" className="px-6 pb-[clamp(72px,10vw,120px)]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex max-w-[620px] flex-col gap-3">
                <Pill>Be part of the change</Pill>
                <h2 id="inv-title" className="m-0 text-[clamp(30px,3.2vw,42px)] leading-[1.15] font-bold tracking-[-0.03em] text-plum">
                  A little time, a little knowledge, one partnership.
                </h2>
              </div>
              <p className="m-0 max-w-[380px] text-body">Whether you are an individual or an organisation, there is a place for you in the Samridhi journey.</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
              {involve.map(g => (
                <RoleLink key={g.title} pick={{ role: g.role }} className="flex flex-col overflow-hidden rounded-3xl bg-cream text-plum no-underline hover:text-plum">
                  <span className="relative block h-60">
                    <Image src={g.image} alt="" fill sizes="(max-width: 960px) 100vw, 400px" className="object-cover" />
                  </span>
                  <span className="flex flex-col gap-2 p-6">
                    <span className="text-[22px] font-bold tracking-[-0.02em]">{g.title}</span>
                    <span className="text-[15px] text-body">{g.desc}</span>
                    <span className="mt-1 font-bold text-green">{g.cta} →</span>
                  </span>
                </RoleLink>
              ))}
            </div>
          </div>
        </section>

        {/* Register */}
        <section id="register" aria-labelledby="form-title" className="px-6 pb-[clamp(72px,10vw,120px)]">
          <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-[40px] border border-cream-line bg-white">
            <div className="relative flex min-h-[520px] flex-col justify-end p-[clamp(28px,4vw,48px)] text-white">
              <Image src={registerImage.image} alt="" fill sizes="(max-width: 960px) 100vw, 620px" className="object-cover" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-plum/0 from-30% to-plum/90" />
              <div className="relative flex flex-col gap-3">
                <Pill className="bg-white/20">Be the first to know</Pill>
                <h2 id="form-title" className="m-0 text-[clamp(30px,3.2vw,42px)] leading-[1.1] font-bold tracking-[-0.03em] text-white">
                  There&apos;s a place for you in Samridhi.
                </h2>
                <p className="m-0 max-w-[440px]">Samridhi launches soon. Leave your details and we&apos;ll tell you first when programmes open near you.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center p-[clamp(28px,4vw,48px)]">
              <RegisterForm />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-title" className="px-6 pb-[clamp(72px,10vw,120px)]">
          <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-12">
            <div className="flex flex-col justify-between gap-8">
              <h2 id="faq-title" className="m-0 text-[clamp(32px,3.4vw,44px)] leading-[1.1] font-bold tracking-[-0.03em] text-plum">
                Frequently asked questions
              </h2>
              <div className="flex items-start gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                  <path d="M3 11l18-8-8 18-2-8-8-2z" stroke="#E6007E" strokeWidth="2" fill="none" strokeLinejoin="round" />
                </svg>
                <p className="m-0 text-[15px]">
                  <strong>Still have a question?</strong>
                  <br />
                  <span className="text-body">Write to us at </span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0} className="group overflow-hidden rounded-2xl bg-canvas open:bg-green">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 text-[15px] font-semibold text-plum group-open:text-white">
                    {f.q}
                    <span
                      aria-hidden
                      className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-plum text-base leading-none text-white transition-transform group-open:rotate-45 group-open:bg-white group-open:text-green"
                    >
                      +
                    </span>
                  </summary>
                  <p className="m-0 px-5 pb-4.5 text-sm text-white">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="px-4 pb-[calc(16px+72px)] sm:pb-4">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-6 rounded-t-[40px] bg-green px-[clamp(24px,4.5vw,56px)] pt-[clamp(32px,4.5vw,56px)] pb-24 text-white">
          <h2 lang="hi-Latn" className="m-0 max-w-[620px] text-[clamp(30px,3.4vw,44px)] leading-[1.1] font-bold tracking-[-0.03em] text-white">
            Jab ek aage badhta hai, toh kai raaste khulte hain.
            <span lang="en" className="mt-2 block text-base font-medium tracking-normal">
              When one person moves forward, new paths open for many others.
            </span>
          </h2>
          <a href="#register" className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white pr-2 pl-6 font-bold text-plum no-underline hover:text-plum">
            Take the first step
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-green text-white">
              <Arrow />
            </span>
          </a>
        </div>
        <div className="relative mx-auto -mt-14 max-w-[1320px] overflow-hidden rounded-[40px] bg-cream px-[clamp(24px,4.5vw,56px)] pt-[clamp(32px,4.5vw,56px)]">
          <div className="flex flex-wrap gap-x-20 gap-y-10">
            <nav aria-label="Explore" className="flex flex-col gap-2 text-[15px]">
              <span className="font-mono text-xs text-body">Explore</span>
              {[
                ['About Samridhi', '#about'],
                ['Programmes', '#programmes'],
                ['Our promise', '#promise'],
                ['Volunteer', '#involved'],
                ['Partner with us', '#involved']
              ].map(([l, h]) => (
                <a key={l} href={h} className="text-plum no-underline hover:text-green">
                  {l}
                </a>
              ))}
            </nav>
            <div className="flex max-w-[360px] flex-col gap-2 text-[15px]">
              <span className="font-mono text-xs text-body">Contact</span>
              <a href={`mailto:${contact.email}`} className="text-plum no-underline hover:text-green">
                {contact.email}
              </a>
              <span className="text-sm text-body">
                A CSR initiative of {org.name}, {org.address}.
              </span>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-between gap-2 text-[13px] text-body">
            <span>© {new Date().getFullYear()} FAB5. All rights reserved. Photographs © their respective owners.</span>
            <a
              href={agency.url}
              title="DIV builds, hosts and runs software for Indian businesses"
              className="font-mono text-xs text-body no-underline hover:text-plum hover:underline hover:underline-offset-4"
            >
              Powered by &lt;Div/&gt;
            </a>
          </div>
          <p aria-hidden className="m-0 mt-4 text-[clamp(72px,16vw,250px)] leading-[0.78] whitespace-nowrap">
            <Wordmark className="text-plum" />
          </p>
        </div>
      </footer>

      <MobileBar />
    </>
  );
}
