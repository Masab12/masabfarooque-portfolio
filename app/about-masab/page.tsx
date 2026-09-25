import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cv, site, socials, stack } from '@/app/data/site';
import { capabilities } from '@/app/data/capabilities';
import { faqs, timeline } from '@/app/data/timeline';
import { roles } from '@/app/data/experience';
import { projects } from '@/app/data/projects';
import { reviewSummary } from '@/app/data/reviews';
import { slugify } from '@/app/lib/slugify';
import PageHead from '@/app/components/core/PageHead';
import Reveal from '@/app/components/motion/Reveal';
import ScrollLetters from '@/app/components/motion/ScrollLetters';
import CountUp from '@/app/components/motion/CountUp';
import Tilt from '@/app/components/motion/Tilt';
import Timeline from '@/app/components/about/Timeline';
import Faq from '@/app/components/about/Faq';
import LocalTime from '@/app/components/about/LocalTime';
import { ArrowDiagonal, MarkArrow45, MarkDocument, MarkRegister } from '@/app/components/marks';

const url = `${site.url}/about-masab`;
const description =
  'Masab Farooque, full stack engineer in Islamabad. Games first, then the web: SaaS platforms, AI systems and data pipelines for clients in 23 countries.';

export const metadata: Metadata = {
  title: { absolute: 'About Masab Farooque | Full Stack Engineer in Islamabad' },
  description,
  alternates: { canonical: url },
  openGraph: {
    type: 'profile',
    url,
    title: 'About Masab Farooque, full stack engineer',
    description,
    firstName: 'Masab',
    lastName: 'Farooque',
    username: 'masabfarooque',
    images: [{ url: '/og/about', width: 1200, height: 630, alt: 'Masab Farooque, full stack engineer' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og/about'] },
};

/* ── Structured data ────────────────────────────────────────────
   A ProfilePage whose main entity is the same Person the layout
   declares, tied together by @id, with the facts this page proves:
   education, awards, current teams and public profiles.            */

const current = roles.filter((r) => r.to === 'Now');
const awards = timeline.filter((t) => t.kind === 'award').map((t) => `${t.title}, ${t.org ?? ''} ${t.year}`.replace(' ,', ','));

const profileSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url,
  name: 'About Masab Farooque',
  inLanguage: 'en',
  dateModified: new Date().toISOString().slice(0, 10),
  mainEntity: {
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.name,
    givenName: 'Masab',
    familyName: 'Farooque',
    url: site.url,
    image: `${site.url}/Masab.webp`,
    jobTitle: site.role,
    description,
    email: site.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'COMSATS University Islamabad' },
    award: awards,
    worksFor: current.map((r) => ({ '@type': 'Organization', name: r.company, ...(r.href ? { url: r.href } : {}) })),
    knowsAbout: stack.flatMap((g) => g.items),
    sameAs: socials.map((s) => s.href),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'About', item: url },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const numbers = [
  { value: 195, suffix: '+', label: 'Orders delivered' },
  { value: reviewSummary.total, label: 'Client reviews' },
  { value: reviewSummary.average, decimals: 1, label: 'Average rating' },
  { value: reviewSummary.countries, label: 'Countries' },
  { value: reviewSummary.repeatShare, suffix: '%', label: 'Clients who came back' },
  { value: projects.length, label: 'Case studies' },
];

function SectionTitle({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <Reveal y={10}>
        <p className="label">{label}</p>
      </Reveal>
      <Reveal as="h2" variant="wipe" delay={0.08} className="mt-3 text-[clamp(1.8rem,1.2rem+2.3vw,3.2rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink [text-wrap:balance]">
        <span id={id}>{children}</span>
      </Reveal>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {[profileSchema, breadcrumbSchema, faqSchema].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <PageHead
        label="About"
        title="Masab Farooque"
        intro="I am a full stack engineer in Islamabad. I started with games, moved to the web, and now spend my days on the parts of a product that decide whether it survives contact with real users."
      >
        {/* Right now: a live strip instead of static facts */}
        <dl
          className="mt-10 grid grid-cols-2 gap-px border sm:mt-12 lg:grid-cols-4"
          style={{ borderColor: 'var(--line-2)', background: 'var(--line-2)' }}
        >
          <div className="load-rise bg-paper px-4 py-4 sm:px-5" style={{ '--d': '0.3s' } as React.CSSProperties}>
            <dt className="label">Time in Islamabad</dt>
            <dd className="mt-1.5 flex items-center gap-2 text-[0.98rem] font-bold text-ink">
              <LocalTime />
              <span className="mono text-[0.72rem] font-normal text-ink-3">{site.timezone}</span>
            </dd>
          </div>
          <div className="load-rise bg-paper px-4 py-4 sm:px-5" style={{ '--d': '0.37s' } as React.CSSProperties}>
            <dt className="label">Status</dt>
            <dd className="mt-1.5 flex items-center gap-2.5 text-[0.98rem] font-bold text-ink">
              <span aria-hidden className="pip-live h-2 w-2 rounded-full bg-sage" />
              {site.availability}
            </dd>
          </div>
          <div className="load-rise bg-paper px-4 py-4 sm:px-5" style={{ '--d': '0.44s' } as React.CSSProperties}>
            <dt className="label">Replies</dt>
            <dd className="mt-1.5 text-[0.98rem] font-bold text-ink">Within a working day</dd>
          </div>
          <div className="load-rise bg-paper px-4 py-4 sm:px-5" style={{ '--d': '0.51s' } as React.CSSProperties}>
            <dt className="label">Focus</dt>
            <dd className="mt-1.5 text-[0.98rem] font-bold text-ink">SaaS, AI, data</dd>
          </div>
        </dl>
      </PageHead>

      {/* ── The story ───────────────────────────────────────── */}
      <section className="border-t py-16 sm:py-20 lg:py-28" style={{ borderColor: 'var(--line)' }} aria-labelledby="story">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <div className="relative">
                <MarkRegister size={12} className="absolute -left-[6px] -top-[6px] z-10 text-ink-4" />
                <MarkRegister size={12} className="absolute -bottom-[6px] -right-[6px] z-10 text-ink-4" />
                <div className="border bg-sheet p-2 sm:p-3" style={{ borderColor: 'var(--line-2)' }}>
                  <Reveal variant="scan" className="relative overflow-hidden bg-plate" style={{ aspectRatio: '4 / 5' }}>
                    <Image
                      src="/Masab.webp"
                      alt="Portrait of Masab Farooque, full stack engineer"
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover"
                      style={{ filter: 'grayscale(0.3) contrast(1.03)' }}
                      priority
                    />
                  </Reveal>
                  <p className="label flex justify-between px-1 pt-2.5">
                    <span>Fig. 1 · The engineer</span>
                    <span>Islamabad</span>
                  </p>
                </div>
              </div>

              <Reveal delay={0.1} y={16}>
                <a
                  href={cv.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={cv.fileName}
                  className="group mt-6 flex min-h-14 items-center justify-between rounded-lg border bg-sheet px-5 py-4 transition-colors duration-300 hover:border-hair3"
                  style={{ borderColor: 'var(--line-2)' }}
                >
                  <span>
                    <span className="block text-[0.98rem] font-bold text-ink">{cv.label}</span>
                    <span className="label mt-1.5 block">PDF, {cv.size}, updated {cv.updated}</span>
                  </span>
                  <MarkDocument size={22} className="text-sage transition-transform duration-500 group-hover:translate-y-0.5" />
                </a>
              </Reveal>

              <Reveal delay={0.16} stagger={0.04} className="mt-5 flex flex-wrap gap-x-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="group inline-flex min-h-11 items-center gap-1.5 text-[0.92rem] text-ink-2 transition-colors hover:text-sage"
                  >
                    {s.label}
                    <ArrowDiagonal size={10} className="opacity-40 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionTitle id="story" label="The long version">
              From games to the <span className="serif-italic text-[1.08em] font-normal text-sage">web.</span>
            </SectionTitle>

            <ScrollLetters
              className="mt-8 text-[clamp(1.2rem,1rem+0.9vw,1.65rem)] font-bold leading-[1.4] tracking-[-0.015em] text-ink"
              text="I started building because I wanted to make games, and games taught me the thing I still care about most: a system is only good when it feels right to the person using it."
            />

            <Reveal stagger={0.08} y={18} className="mt-9 space-y-5 text-[1.02rem] leading-[1.75] text-ink-2">
              <p>
                Between 2020 and 2023 I shipped Unity games, won a few competitions, and learned to work
                to a deadline that does not move. Two of those games passed ten thousand downloads between
                them. One won Best Mechanics at the Rookie Game Jam and was picked for incubation.
              </p>
              <p>
                In late 2023 I moved to the web on purpose. Games were still interesting, but the problems
                I wanted to work on sat on the other side of the screen: data, scale, money moving through
                a system, and products people rely on at work. I learned Next.js, FastAPI, NestJS and
                retrieval architectures, then started taking clients and building products with them.
              </p>
              <p>
                Since then I have delivered more than 190 orders to clients in {reviewSummary.countries}{' '}
                countries. Today I work inside two product teams as an external engineer: AI assisted
                internal tooling for an engineering studio, where I built{' '}
                <Link href="/portfolio/the-proposal-maker" className="text-ink underline decoration-[rgb(var(--sage-rgb)/0.5)] underline-offset-4 hover:decoration-sage">
                  The Proposal Maker
                </Link>
                , and a browser based audio editor for a media team. Solo work runs alongside that,
                platforms like{' '}
                <Link href="/portfolio/firstdeal" className="text-ink underline decoration-[rgb(var(--sage-rgb)/0.5)] underline-offset-4 hover:decoration-sage">
                  FirstDeal
                </Link>{' '}
                and{' '}
                <Link href="/portfolio/javea-denia-rentals" className="text-ink underline decoration-[rgb(var(--sage-rgb)/0.5)] underline-offset-4 hover:decoration-sage">
                  Javea Denia Rentals
                </Link>{' '}
                that I took from an empty repository to paying users.
              </p>
              <p>
                I work best when I own the whole thing, from the schema to the interface and from the
                first commit to the deploy. The fewer hands a product passes through, the fewer seams it
                can split along.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── By the numbers ──────────────────────────────────── */}
      <section className="border-y" style={{ borderColor: 'var(--line)' }} aria-labelledby="numbers">
        <h2 id="numbers" className="sr-only">By the numbers</h2>
        <div className="shell">
          <Reveal stagger={0.07} y={20} className="grid grid-cols-2 gap-px md:grid-cols-3 xl:grid-cols-6" style={{ background: 'var(--line)' }}>
            {numbers.map((n) => (
              <div key={n.label} className="bg-paper px-4 py-8 sm:px-6 sm:py-10">
                <p className="text-[clamp(2rem,1.5rem+2vw,3.2rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">
                  <CountUp value={n.value} decimals={n.decimals ?? 0} suffix={n.suffix ?? ''} />
                </p>
                <p className="label mt-3">{n.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── The path ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28" aria-labelledby="path">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionTitle id="path" label="Career">
                The path so far, from the{' '}
                <span className="serif-italic text-[1.08em] font-normal text-sage">first commit.</span>
              </SectionTitle>
            </div>
            <Reveal delay={0.15} y={10} className="lg:col-span-4">
              <p className="text-[0.98rem] leading-relaxed text-ink-2">
                Read like a commit history: the line fills in as you go, and awards hang off it as tags.
              </p>
            </Reveal>
          </div>
          <div className="mt-12">
            <Timeline />
          </div>
        </div>
      </section>

      {/* ── Tools ───────────────────────────────────────────── */}
      <section className="border-t py-16 sm:py-20 lg:py-28" style={{ borderColor: 'var(--line)' }} aria-labelledby="tools">
        <div className="shell">
          <SectionTitle id="tools" label="Stack">
            Tools I reach for.
          </SectionTitle>

          <Reveal stagger={0.06} y={22} className="mt-10 grid gap-px border sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: 'var(--line-2)', background: 'var(--line-2)' }}>
            {stack.map((group) => (
              <div key={group.group} className="bg-paper p-5 sm:p-6">
                <p className="label">{group.group}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="mono rounded-full border px-2.5 py-1 text-[0.75rem] text-ink transition-colors hover:border-sage hover:text-sage" style={{ borderColor: 'var(--line-2)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          <Reveal y={10} className="mt-14">
            <p className="label">What they add up to</p>
          </Reveal>
          <Reveal stagger={0.05} y={20} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <Tilt key={cap.index} max={3}>
                <Link
                  href={`/capabilities#${slugify(cap.title)}`}
                  className="group flex h-full min-h-16 items-center justify-between gap-4 rounded-lg border bg-sheet px-5 py-4 transition-colors duration-300 hover:border-hair3"
                  style={{ borderColor: 'var(--line-2)' }}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="mono text-[0.72rem] text-ink-3">{cap.index}</span>
                    <span className="text-[0.98rem] font-bold text-ink transition-colors group-hover:text-sage">{cap.title}</span>
                  </span>
                  <MarkArrow45 size={11} className="shrink-0 text-sage transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Tilt>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Questions ───────────────────────────────────────── */}
      <section className="border-t py-16 sm:py-20 lg:py-28" style={{ borderColor: 'var(--line)' }} aria-labelledby="faq">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionTitle id="faq" label="FAQ">
              Questions I get asked.
            </SectionTitle>
            <Reveal delay={0.2} y={12}>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-2">
                Anything not covered here, ask in{' '}
                <Link href="/contact" className="text-ink underline decoration-[rgb(var(--sage-rgb)/0.5)] underline-offset-4 hover:decoration-sage">
                  a brief
                </Link>{' '}
                or read how each{' '}
                <Link href="/services" className="text-ink underline decoration-[rgb(var(--sage-rgb)/0.5)] underline-offset-4 hover:decoration-sage">
                  service runs
                </Link>
                .
              </p>
            </Reveal>
          </div>
          <Reveal y={20} className="lg:col-span-8">
            <Faq />
          </Reveal>
        </div>
      </section>
    </>
  );
}
