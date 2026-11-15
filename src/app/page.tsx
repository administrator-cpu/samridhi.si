import Image from 'next/image';
import { Header } from '@/components/Header';
import { MobileBar } from '@/components/MobileBar';
import { RegisterForm } from '@/components/RegisterForm';
import { RoleLink } from '@/components/RoleLink';
import { agency, contact, faqs, involve, org, pretty10, programmes, saathiPoints, stats, steps, stories, type Stage } from '@/content/site';

const stageClass: Record<Stage, string> = {
  'Start here': 'bg-mist',
  'Build skills': 'bg-amber-soft',
  'Support track': 'bg-amber'
};

const Arrow = () => (
  <span aria-hidden className="text-2xl text-accent">
    →
  </span>
);

function SectionHead({ title, children, id }: { title: string; children?: React.ReactNode; id?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5 border-b border-plum pb-6">
      <h2 id={id} className="h-display m-0 text-[clamp(36px,5.6vw,56px)]">
        {title}
      </h2>
      {children && <div className="max-w-[460px]">{children}</div>}
    </div>
  );
}

export default function Home() {
  const showStories = stories.some(s => s.quote);
  const realStats = stats.filter(s => s.value.trim());

  return (
    <>
      <a
        href="#main"
        className="absolute -top-16 left-4 z-[60] rounded-[10px] bg-plum px-4 py-2.5 text-canvas no-underline focus:top-3 focus:text-canvas"
      >
        Skip to main content
      </a>

      <Header showStories={showStories} />

      <main id="main">
        {/* Hero */}
        <section id="top" className="gutter pt-[clamp(40px,7vw,72px)]">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-14">
            <div className="flex min-w-0 flex-[1_1_540px] flex-col gap-10">
              <div className="flex flex-col gap-7">
                <h1 className="m-0 text-[clamp(44px,7.6vw,80px)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-plum">
                  Become the one your village calls when <span className="text-accent">tech</span> stops working.
                </h1>
                <p className="m-0 max-w-[560px] text-[clamp(18px,2vw,21px)] leading-[1.55] text-pretty">
                  Free, hands-on training for anyone, at any age. Start with phones and the internet. Go on to fixing broadband, repairing computers and helping customers,
                  and take on support work close to home. In Hindi or English, no degree needed.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-7">
                <a
                  href="#register"
                  className="brand-gradient inline-flex min-h-[54px] items-center rounded-full px-[30px] text-[19px] font-bold whitespace-nowrap text-plum no-underline transition-[filter] hover:text-plum hover:brightness-95"
                >
                  Start learning, free
                </a>
                <a href="#programmes" className="-my-3 py-3 text-lg font-semibold underline decoration-[1.5px] underline-offset-[6px]">
                  See the learning path
                </a>
              </div>
            </div>
            <figure className="m-0 flex min-w-0 flex-[1_1_420px] flex-col gap-2.5">
              <div className="relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-card bg-mist">
                <Image
                  src="/images/class-kalkeri.webp"
                  alt="Learners at computers in a brick-walled village classroom, following their trainer at the screen"
                  fill
                  priority
                  sizes="(max-width: 960px) 100vw, 560px"
                  className="object-cover"
                  style={{ objectPosition: '60% center' }}
                />
              </div>
              <figcaption className="text-sm text-muted">A Samridhi class in Kalkeri</figcaption>
            </figure>
          </div>
        </section>

        {/* Impact numbers (only with real data) */}
        {realStats.length > 0 && (
          <section aria-label="Our reach" className="gutter pt-[clamp(40px,6vw,64px)]">
            <dl className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] border-t border-plum">
              {realStats.map(s => (
                <div key={s.label} className="flex flex-col-reverse gap-1 pt-[22px] pr-6">
                  <dt className="text-base text-muted">{s.label}</dt>
                  <dd className="m-0 text-[clamp(36px,5vw,48px)] leading-[1.05] font-extrabold tracking-[-0.03em] text-plum tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Missed call strip (only with a number) */}
        {contact.missedCall && (
          <section aria-labelledby="missed-h" className="gutter pt-[clamp(32px,5vw,56px)]">
            <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-10 gap-y-4 rounded-card bg-plum px-[clamp(20px,3vw,32px)] py-[clamp(20px,3vw,28px)] text-canvas">
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-1">
                <h2 id="missed-h" className="m-0 text-[22px] leading-snug font-semibold text-canvas">
                  No smartphone or internet?
                </h2>
                <p className="m-0 text-line">Give a missed call. We call back in Hindi or English and register you over the phone.</p>
              </div>
              <a href={`tel:+91${contact.missedCall}`} className="py-2.5 font-mono text-2xl whitespace-nowrap text-amber tabular-nums no-underline hover:text-amber-soft">
                {pretty10(contact.missedCall)}
              </a>
            </div>
          </section>
        )}

        {/* About */}
        <section id="about" className="gutter py-[clamp(72px,10vw,120px)]">
          <div className="mx-auto flex max-w-[1280px] flex-wrap gap-x-[clamp(32px,6vw,80px)] gap-y-10">
            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-1.5">
              <span lang="hi" className="text-[clamp(84px,14vw,132px)] leading-[1.2] font-bold text-plum">
                समृद्धि
              </span>
              <span className="text-lg text-plum">
                <em className="font-semibold not-italic">samridhi</em> <span className="text-muted">· noun</span>
              </span>
              <span className="max-w-[400px] text-lg">Prosperity. The kind that reaches a village, a kitchen table and a grandmother&apos;s phone.</span>
            </div>
            <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5 pt-6">
              <span className="label-mono text-muted">About Samridhi</span>
              <h2 className="h-display m-0 text-[clamp(32px,4.4vw,44px)] leading-[1.15]">Every village now has the internet. Few have someone who can fix it.</h2>
              <p className="m-0 text-pretty">
                Phones, broadband and computers have reached most of India. The people who can set them up, repair them and help others use them have not. Samridhi
                trains local people, for free, to be those people.
              </p>
              <p className="m-0 text-pretty">
                We start where you are. Never used a smartphone? That&apos;s fine. No marksheet, no degree, no age limit. We work with local NGOs, colleges and panchayats
                who already know their communities.
              </p>
            </div>
          </div>
        </section>

        {/* Programmes */}
        <section id="programmes" className="gutter pb-[clamp(72px,10vw,120px)]">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
            <SectionHead title="One path, from your first phone to skilled work">
              <p className="m-0">
                Start wherever you are. Every step is free, in person and taught in Hindi or English. Finish a support track and you can become a Samridhi Saathi.
              </p>
            </SectionHead>
            <ul className="m-0 flex list-none flex-col p-0">
              {programmes.map((p, i) => (
                <li key={p.name} className="border-b border-line">
                  <RoleLink
                    pick={{ role: 'Join a class', programme: p.name }}
                    className="flex flex-wrap items-center gap-x-10 gap-y-4 rounded-[14px] px-2 py-7 text-plum no-underline transition-colors hover:bg-tint hover:text-plum"
                  >
                    <span className="flex flex-[0_0_96px] flex-col gap-1.5 font-mono text-sm text-muted tabular-nums">
                      0{i + 1}
                      <span className={`self-start rounded-md px-2 py-0.5 text-[11.5px] tracking-[0.05em] whitespace-nowrap text-plum uppercase ${stageClass[p.stage]}`}>
                        {p.stage}
                      </span>
                    </span>
                    <span className="flex min-w-0 flex-[1_1_220px] flex-col gap-0.5">
                      <span className="text-[clamp(28px,3.4vw,34px)] leading-[1.15] font-bold tracking-[-0.02em]">{p.name}</span>
                      <span lang="hi" className="text-base text-muted">
                        {p.hi}
                      </span>
                    </span>
                    <span className="flex min-w-0 flex-[2_1_360px] flex-col gap-1">
                      <span className="text-[19px] leading-[1.35] font-semibold text-balance">{p.headline}</span>
                      <span className="text-[17px] text-pretty text-body">{p.desc}</span>
                    </span>
                    <span className="relative h-28 flex-[0_0_168px] overflow-hidden rounded-control bg-mist">
                      <Image src={p.image} alt={p.alt} fill sizes="168px" className="object-cover" style={{ objectPosition: p.pos }} />
                    </span>
                    <span className="sr-only">Register for {p.name}</span>
                    <span className="flex-[0_0_32px]">
                      <Arrow />
                    </span>
                  </RoleLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="gutter bg-white py-[clamp(72px,9vw,112px)]">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-14">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <h2 className="h-display m-0 text-[clamp(36px,5.6vw,56px)]">How it works</h2>
              <p className="m-0 max-w-[440px]">From your first call to your first support visit, four steps.</p>
            </div>
            <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8 gap-y-10 p-0">
              {steps.map((s, i) => (
                <li key={s.title} className="flex flex-col gap-2.5 border-t border-plum pt-[18px]">
                  <span aria-hidden className="text-[40px] leading-none font-extrabold text-accent tabular-nums">
                    {i + 1}
                  </span>
                  <h3 className="m-0 text-[21px] leading-snug font-semibold text-balance text-plum">{s.title}</h3>
                  <p className="m-0 text-[17px] text-pretty">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Become a Saathi */}
        <section id="saathi" className="gutter py-[clamp(72px,10vw,120px)]">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
            <div className="flex flex-wrap items-end justify-between gap-5 border-b border-plum pb-6">
              <div className="flex max-w-[720px] flex-col gap-3">
                <span lang="hi" className="text-[22px] font-bold text-accent">
                  समृद्धि साथी
                </span>
                <h2 className="h-display m-0 text-[clamp(36px,5.6vw,56px)]">Become a Samridhi Saathi</h2>
              </div>
              <p className="m-0 max-w-[460px]">
                Saathis are trained local support people. Homes, shops and offices near you need help with their internet, computers and phones. Saathis are who they call.
              </p>
            </div>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8 gap-y-10 p-0">
              {saathiPoints.map((b, i) => (
                <li key={b.title} className="flex flex-col gap-2.5 rounded-card bg-white p-6">
                  <span aria-hidden className="flex flex-col gap-2.5">
                    <span className="brand-gradient h-[3px] w-7 rounded-sm" />
                    <span className="font-mono text-xs tracking-[0.1em] text-muted">0{i + 1}</span>
                  </span>
                  <h3 className="m-0 text-[21px] leading-snug font-semibold text-balance text-plum">{b.title}</h3>
                  <p className="m-0 text-[17px] text-pretty">{b.desc}</p>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <RoleLink
                pick={{ role: 'Join a class', programme: 'Network Saathi' }}
                className="inline-flex min-h-[54px] items-center rounded-control bg-plum px-7 text-lg font-semibold whitespace-nowrap text-white no-underline transition-colors hover:bg-plum-2 hover:text-white"
              >
                Start a support track
              </RoleLink>
              <span className="text-base text-muted">No minimum education. Training is free.</span>
            </div>
          </div>
        </section>

        {/* Why FAB5 */}
        <section className="gutter bg-plum py-[clamp(72px,10vw,120px)] text-canvas">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-[clamp(32px,6vw,80px)] gap-y-10">
            <div className="relative aspect-[5/4] min-w-0 flex-[1_1_440px] overflow-hidden rounded-card bg-[#3a2840]">
              <Image
                src="/images/village-family-laptop.webp"
                alt="A family gathered around a laptop outside a village home with solar panels"
                fill
                sizes="(max-width: 960px) 100vw, 600px"
                className="object-cover"
                style={{ objectPosition: '45% center' }}
              />
            </div>
            <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-5">
              <span className="label-mono text-amber">Why FAB5</span>
              <h2 className="m-0 text-[clamp(34px,5vw,48px)] leading-[1.12] font-extrabold tracking-[-0.035em] text-balance text-canvas">
                A network is only as good as the people who keep it running.
              </h2>
              <p className="m-0 text-pretty text-line">
                FAB5 ({org.name}) builds broadband and technology infrastructure from Noida. Every new connection needs someone nearby to install it, fix it and help the
                people using it. Samridhi trains those people, from the same villages and towns the network reaches.
              </p>
              <p className="m-0 text-[26px] font-bold tracking-[-0.02em] text-canvas">When communities grow, India grows.</p>
            </div>
          </div>
        </section>

        {/* Stories (only with real quotes) */}
        {showStories && (
          <section id="stories" className="gutter py-[clamp(72px,10vw,120px)]">
            <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
              <SectionHead title="Changemakers" />
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
                {stories
                  .filter(s => s.quote)
                  .map(s => (
                    <figure key={s.caption} className="m-0 flex flex-col gap-4">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-mist">
                        <Image src={s.image} alt={s.alt} fill sizes="(max-width: 960px) 100vw, 400px" className="object-cover" style={{ objectPosition: s.pos }} />
                      </div>
                      <blockquote className="m-0 text-[22px] leading-[1.35] font-bold tracking-[-0.02em] text-pretty text-plum">“{s.quote}”</blockquote>
                      <figcaption className="text-[15px] text-muted">{s.caption}</figcaption>
                    </figure>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Get involved */}
        <section id="get-involved" className={`gutter pb-[clamp(72px,10vw,120px)] ${showStories ? '' : 'pt-[clamp(72px,10vw,120px)]'}`}>
          <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
            <SectionHead title="Get involved">
              <p className="m-0">Learners, volunteers, NGOs, colleges and community leaders: there&apos;s a place for you.</p>
            </SectionHead>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-12 gap-y-10">
              {involve.map(g => (
                <div key={g.title} className="flex flex-col gap-2.5">
                  <span className="label-mono text-muted">{g.who}</span>
                  <h3 className="m-0 text-[30px] leading-[1.2] font-extrabold tracking-[-0.03em] text-balance text-plum">{g.title}</h3>
                  <p className="m-0 grow text-[17px] text-pretty">{g.desc}</p>
                  <RoleLink
                    pick={{ role: g.role }}
                    className="mt-2.5 inline-flex min-h-12 items-center self-start rounded-control border-[1.5px] border-plum px-5 font-semibold whitespace-nowrap text-plum no-underline transition-colors hover:bg-plum hover:text-canvas"
                  >
                    {g.cta}
                  </RoleLink>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Register */}
        <section id="register" className="gutter bg-white py-[clamp(72px,9vw,112px)]">
          <div className="mx-auto flex max-w-[1280px] flex-wrap gap-x-[clamp(32px,6vw,80px)] gap-y-10">
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
              <h2 className="h-display m-0 text-[clamp(36px,5.6vw,56px)]">Register in one minute</h2>
              <p className="m-0 text-pretty">We&apos;ll call you back within 2 working days. We only use your number to contact you about Samridhi.</p>
              <div className="mt-2 flex flex-col gap-3.5 border-t border-plum pt-5">
                {contact.missedCall && (
                  <div className="flex flex-col gap-0.5">
                    <strong className="font-semibold text-plum">No smartphone or internet?</strong>
                    <a href={`tel:+91${contact.missedCall}`} className="-my-2 self-start py-2 font-mono text-lg no-underline">
                      {pretty10(contact.missedCall)}
                    </a>
                  </div>
                )}
                {contact.whatsapp && (
                  <div className="flex flex-col gap-0.5">
                    <strong className="font-semibold text-plum">Prefer WhatsApp?</strong>
                    <span>
                      <a href={`https://wa.me/91${contact.whatsapp}`} className="py-2.5 font-semibold underline underline-offset-[5px]">
                        Message us on WhatsApp
                      </a>{' '}
                      · <span className="font-mono text-base">{pretty10(contact.whatsapp)}</span>
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-0.5">
                  <strong className="font-semibold text-plum">Questions?</strong>
                  <a href={`mailto:${contact.email}`} className="-my-2 self-start py-2 font-semibold underline underline-offset-[5px]">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-[1_1_520px] rounded-card bg-canvas p-[clamp(20px,4vw,36px)]">
              <RegisterForm />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="gutter py-[clamp(72px,10vw,120px)]">
          <div className="mx-auto flex max-w-[1280px] flex-wrap gap-x-[clamp(32px,6vw,80px)] gap-y-8">
            <h2 className="h-display m-0 flex-[1_1_320px] text-[clamp(36px,5.6vw,56px)]">Questions people ask</h2>
            <div className="min-w-0 flex-[2_1_560px] border-t border-plum">
              {faqs.map(f => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[22px] text-xl leading-[1.35] font-semibold text-balance text-plum">
                    {f.q}
                    <span aria-hidden className="text-[26px] leading-none font-normal text-accent transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="m-0 pr-[clamp(0px,4vw,48px)] pb-6 text-pretty">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="gutter bg-plum pt-[clamp(64px,8vw,96px)] pb-[calc(40px+72px)] text-line md:pb-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-[clamp(48px,6vw,72px)]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <h2 className="m-0 max-w-[760px] text-[clamp(40px,6.5vw,64px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance text-canvas">
              Bring Samridhi to your village.
            </h2>
            <RoleLink
              pick={{ role: 'Partner as an organisation' }}
              className="inline-flex min-h-14 items-center rounded-control bg-white px-[30px] text-lg font-semibold whitespace-nowrap text-plum no-underline hover:bg-canvas"
            >
              Start a centre
            </RoleLink>
          </div>

          <div className="flex flex-wrap justify-between gap-12 border-t border-plum-line pt-10">
            <div className="flex max-w-[400px] flex-[1_1_320px] flex-col gap-3">
              <span className="text-[28px] leading-none font-extrabold tracking-[-0.03em] text-canvas">
                Samridhi<span className="text-amber">.si</span>
              </span>
              <p className="m-0 text-base">
                A CSR initiative of {org.name}, {org.address}.
              </p>
              <p className="m-0 text-[15px] text-faint">
                This website is designed, hosted and maintained by{' '}
                <a href={agency.url} className="text-canvas underline underline-offset-4 hover:text-amber">
                  DIV
                </a>
                , a software company in Noida that builds and runs websites and apps for Indian businesses.
              </p>
              {contact.csrNumber && (
                <p className="m-0 text-[15px] text-faint">
                  CSR-1 registration: <span className="font-mono">{contact.csrNumber}</span>
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-x-[clamp(32px,5vw,64px)] gap-y-8 text-base">
              <nav aria-label="Explore" className="flex flex-col">
                <span className="label-mono mb-1.5 text-xs text-faint">Explore</span>
                {[
                  ['About', '#about'],
                  ['Programmes', '#programmes'],
                  ['Become a Saathi', '#saathi'],
                  ['Get involved', '#get-involved']
                ].map(([l, h]) => (
                  <a key={h} href={h} className="py-1.5 text-canvas no-underline hover:text-amber">
                    {l}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col">
                <span className="label-mono mb-1.5 text-xs text-faint">Contact</span>
                <a href={`mailto:${contact.email}`} className="py-1.5 text-canvas no-underline hover:text-amber">
                  {contact.email}
                </a>
                {contact.phone && (
                  <a href={`tel:+91${contact.phone}`} className="py-1.5 text-canvas no-underline hover:text-amber">
                    {pretty10(contact.phone)}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-3 text-sm text-faint">
            <span>© {new Date().getFullYear()} Samridhi.si. A FAB5 initiative.</span>
            <a
              href={agency.url}
              title="DIV builds, hosts and runs software for Indian businesses"
              className="-my-1.5 py-1.5 font-mono text-[13px] tracking-[0.02em] text-line no-underline hover:text-white hover:underline hover:underline-offset-4"
            >
              Powered by &lt;Div/&gt;
            </a>
          </div>
        </div>
      </footer>

      <MobileBar />
    </>
  );
}
