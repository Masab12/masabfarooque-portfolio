import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import { reviewSummary } from '@/app/data/reviews';
import { capabilities, process as steps } from '@/app/data/capabilities';
import { projects } from '@/app/data/projects';
import PageHead from '@/app/components/core/PageHead';
import Reveal from '@/app/components/motion/Reveal';
import ContactCTA from '@/app/components/home/ContactCTA';
import {
  ArrowLong,
  MarkStack,
  MarkCore,
  MarkFlow,
  MarkVault,
  MarkFrame,
  MarkBearing,
  Spark,
} from '@/app/components/marks';

/** "Full stack product build" becomes "full-stack-product-build". */
const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const marks = {
  stack: MarkStack,
  core: MarkCore,
  flow: MarkFlow,
  vault: MarkVault,
  frame: MarkFrame,
  bearing: MarkBearing,
} as const;

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'What I build and the tools I use: full stack products, AI systems, data pipelines, SaaS platforms, interfaces with motion, and performance and search work.',
  alternates: { canonical: `${site.url}/capabilities` },
  keywords: [
    'full stack developer capabilities',
    'Next.js developer Islamabad',
    'AI systems developer',
    'SaaS development Pakistan',
    'data pipeline developer',
  ],
  openGraph: {
    type: 'website',
    title: 'Capabilities | Masab Farooque',
    description:
      'Full stack products, AI systems, data pipelines, SaaS platforms, interfaces with motion, performance and search.',
    url: `${site.url}/capabilities`,
  },
};

/** One Service entry per capability, so each is legible on its own. */
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Capabilities of ${site.name}`,
  url: `${site.url}/capabilities`,
  itemListElement: capabilities.map((cap, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: cap.title,
      description: cap.description,
      serviceType: cap.title,
      url: `${site.url}/capabilities#${slugify(cap.title)}`,
      provider: {
        '@type': 'ProfessionalService',
        name: site.name,
        url: site.url,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Islamabad',
          addressRegion: 'Islamabad Capital Territory',
          addressCountry: 'PK',
        },
      },
      areaServed: [
        { '@type': 'Country', name: 'Pakistan' },
        { '@type': 'Place', name: 'Worldwide, remote' },
      ],
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'Capabilities', item: `${site.url}/capabilities` },
  ],
};

/** A representative build for each capability, linked by slug. */
const proof: Record<string, string> = {
  '01': 'navia',
  '02': 'the-proposal-maker',
  '03': 'firstdeal',
  '04': 'navia',
  '05': 'javea-denia-rentals',
  '06': 'firstdeal',
};

export default function CapabilitiesPage() {
  return (
    <>
      {[servicesSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageHead
        label="Capabilities"
        title="What I build"
        intro="Six kinds of work, and the tools behind each one. If your project sits across several of these, that is normal, and it is the reason one engineer owning the whole thing tends to go faster than a team splitting it."
        meta={[
          { label: 'Areas', value: String(capabilities.length) },
          { label: 'Shipped', value: `${projects.length} case studies` },
          { label: 'Rating', value: `${reviewSummary.average.toFixed(1)} from ${reviewSummary.total}` },
          { label: 'Based in', value: site.location },
        ]}
      />

      {/* ── The six areas ───────────────────────────────────────── */}
      <section className="shell py-16 md:py-24">
        <div className="grid gap-px overflow-hidden rounded-xl border md:grid-cols-2"
          style={{ borderColor: 'var(--line)', background: 'var(--line)' }}
        >
          {capabilities.map((cap, i) => {
            const Mark = marks[cap.mark];
            const slug = proof[cap.index];
            const project = projects.find((p) => p.slug === slug);
            return (
              <Reveal
                key={cap.index}
                id={slugify(cap.title)}
                delay={(i % 2) * 0.06}
                y={18}
                className="flex h-full scroll-mt-28 flex-col p-6 md:p-8"
                style={{ background: 'var(--bg)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg" style={{ background: 'var(--surface-2)' }}>
                    <Mark size={20} className="text-primary" />
                  </span>
                  <span className="mono text-[0.7rem] text-gray-500">{cap.index}</span>
                </div>

                <h2 className="mt-5 text-[1.08rem] leading-snug text-cream">{cap.title}</h2>

                <p className="mt-3 flex-1 text-[0.92rem] leading-[1.7] text-gray-400">
                  {cap.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {cap.tools.map((tool) => (
                    <span
                      key={tool}
                      className="border px-2 py-1 text-[0.6rem] text-gray-500"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {project ? (
                  <Link
                    href={`/portfolio/${project.slug}`}
                    data-cursor="Read case study"
                    className="group mt-5 inline-flex items-center gap-2 text-[0.8rem] text-primary"
                  >
                    See it in {project.title}
                    <ArrowLong
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── How the work runs ───────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Reveal className="flex items-center gap-3" y={12}>
            <Spark size={10} className="text-primary" />
            <span className="label">How the work runs</span>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-x-14">
            {steps.map((step, i) => (
              <Reveal key={step.index} delay={(i % 2) * 0.06} y={18}>
                <div className="border-t pt-6" style={{ borderColor: 'var(--line-2)' }}>
                  <p className="mono text-[0.7rem] text-primary">{step.index}</p>
                  <p className="mt-3 text-[1.02rem] leading-snug text-cream">{step.title}</p>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-gray-400">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specific service ────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3" y={14}>
              <div className="flex items-center gap-3">
                <Spark size={10} className="text-primary" />
                <span className="label">A defined piece of work</span>
              </div>
            </Reveal>

            <div className="md:col-span-8 md:col-start-5">
              <Reveal y={18}>
                <p className="text-[1.02rem] leading-[1.7] text-cream/90">
                  A lot of what comes through the door is one specific job: an old WordPress site
                  that has become slow and expensive to maintain.
                </p>
                <p className="mt-5 text-[0.96rem] leading-[1.75] text-gray-400">
                  I move those onto Next.js without losing the rankings they already have, and when
                  the team wants to keep writing in WordPress I wire it up as a headless CMS so the
                  editor never changes. That one has its own page with timelines and a written
                  scope.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-7">
                <Link
                  href="/services/wordpress-to-nextjs"
                  data-cursor="Read more"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3"
                >
                  WordPress to Next.js migration
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
                    <ArrowLong size={14} className="text-cream" />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
