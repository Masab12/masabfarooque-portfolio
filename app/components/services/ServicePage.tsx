import Link from 'next/link';
import { site, socials } from '@/app/data/site';
import { reviewSummary } from '@/app/data/reviews';
import { getPost } from '@/app/data/posts';
import { projects } from '@/app/data/projects';
import type { Service } from '@/app/data/services';
import PageHead from '@/app/components/core/PageHead';
import Reveal from '@/app/components/motion/Reveal';
import ContactCTA from '@/app/components/home/ContactCTA';
import {
  ArrowLong,
  ArrowDiagonal,
  MarkCheck,
  GlyphFiverr,
  Spark,
} from '@/app/components/marks';

const fiverr = socials.find((s) => s.glyph === 'fiverr');

/** Small heading used above every band, so the rhythm stays identical. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="flex items-center gap-3" y={12}>
      <Spark size={10} className="text-primary" />
      <span className="label">{children}</span>
    </Reveal>
  );
}

/**
 * The chrome shared by every service page: masthead, the problem, what the
 * work covers, project shapes, process, proof, questions and the guides. Only
 * the copy changes between them, which is what keeps four commercial pages
 * looking like one site.
 */
export default function ServicePage({ service }: { service: Service }) {
  const proof = service.proof
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p));

  return (
    <>
      <PageHead
        label={service.label}
        title={service.title}
        intro={service.intro}
        meta={[
          ...service.meta,
          {
            label: 'Reviews',
            value: `${reviewSummary.average.toFixed(1)} from ${reviewSummary.total}`,
          },
          { label: 'Based in', value: site.location },
        ]}
      />

      {/* ── The problem ─────────────────────────────────────────── */}
      <section className="shell py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow>{service.problem.heading}</Eyebrow>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <Reveal y={18}>
              {service.problem.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-[1.05rem] leading-[1.7] text-cream/90 sm:text-lg'
                      : 'mt-5 text-[0.98rem] leading-[1.75] text-gray-400'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What the work covers ────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Eyebrow>{service.includedHeading}</Eyebrow>

          <div
            className="mt-10 grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2"
            style={{ borderColor: 'var(--line)', background: 'var(--line)' }}
          >
            {service.included.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 2) * 0.06}
                y={16}
                className="h-full p-6 md:p-7"
                style={{ background: 'var(--bg)' }}
              >
                <span className="flex items-start gap-3">
                  <MarkCheck size={15} className="mt-1 shrink-0 text-primary" />
                  <span>
                    <span className="block text-[0.98rem] leading-snug text-cream">
                      {item.title}
                    </span>
                    <span className="mt-2.5 block text-[0.88rem] leading-relaxed text-gray-400">
                      {item.body}
                    </span>
                  </span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project shapes ──────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Eyebrow>{service.shapesHeading}</Eyebrow>

          <Reveal y={16} className="mt-6 max-w-2xl">
            <p className="text-[0.98rem] leading-[1.75] text-gray-400">{service.shapesNote}</p>
          </Reveal>

          <div
            className="mt-10 overflow-x-auto rounded-xl border"
            style={{ borderColor: 'var(--line)' }}
          >
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr>
                  {['Project', 'Scale', 'Typical timeline', 'Notes'].map((head) => (
                    <th
                      key={head}
                      className="label border-b px-5 py-3.5 font-normal"
                      style={{ borderColor: 'var(--line-2)', background: 'var(--surface-1)' }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {service.shapes.map((shape) => (
                  <tr key={shape.name}>
                    <td
                      className="border-b px-5 py-4 align-top text-[0.92rem] text-cream"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {shape.name}
                    </td>
                    <td
                      className="border-b px-5 py-4 align-top text-[0.88rem] text-gray-400"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {shape.scale}
                    </td>
                    <td
                      className="border-b px-5 py-4 align-top text-[0.88rem] text-primary"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {shape.timeline}
                    </td>
                    <td
                      className="border-b px-5 py-4 align-top text-[0.88rem] leading-relaxed text-gray-400"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {shape.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Eyebrow>{service.stepsHeading}</Eyebrow>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-x-14">
            {service.steps.map((step, i) => (
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

      {/* ── Proof ───────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Eyebrow>Built this before</Eyebrow>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {proof.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 0.06} y={18}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  data-cursor="Read case study"
                  className="group flex h-full flex-col rounded-xl border p-5 transition-colors duration-500 hover:border-hair2"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <p className="label">{project.client}</p>
                  <p className="mt-3 text-[1.02rem] leading-snug text-cream transition-colors duration-500 group-hover:text-primary">
                    {project.title}
                  </p>
                  <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-gray-500">
                    {project.summary}
                  </p>
                  <span className="mt-5 flex items-center gap-2">
                    <span className="label">Case study</span>
                    <ArrowLong
                      size={14}
                      className="text-primary transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-5">
              <Reveal
                stagger={0.06}
                className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4"
                style={{ borderColor: 'var(--line)', background: 'var(--line)' }}
              >
                {[
                  { value: reviewSummary.average.toFixed(1), label: 'Average rating' },
                  { value: String(reviewSummary.total), label: 'Client reviews' },
                  { value: String(reviewSummary.countries), label: 'Countries' },
                  { value: `${reviewSummary.repeatShare}%`, label: 'Came back' },
                ].map((stat) => (
                  <div key={stat.label} className="p-5 md:p-6" style={{ background: 'var(--bg)' }}>
                    <p className="text-[clamp(1.3rem,3vw,2.1rem)] text-primary">{stat.value}</p>
                    <p className="label mt-2">{stat.label}</p>
                  </div>
                ))}
              </Reveal>

              <Reveal delay={0.1} y={16}>
                <p className="mt-7 text-[0.95rem] leading-[1.75] text-gray-400">
                  Every review is written by the client and shown unedited. You can{' '}
                  <Link
                    href="/reviews"
                    className="text-cream underline decoration-[var(--line-3)] underline-offset-4 hover:decoration-current"
                  >
                    read them all here
                  </Link>{' '}
                  or check them against the source.
                </p>
              </Reveal>

              {fiverr ? (
                <Reveal delay={0.16} className="mt-6">
                  <a
                    href={fiverr.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm text-gray-400 transition-colors duration-300 hover:text-cream"
                    style={{ borderColor: 'var(--line-2)' }}
                  >
                    <GlyphFiverr size={14} className="text-primary" />
                    Verify on Fiverr
                    <ArrowDiagonal size={11} className="opacity-60" />
                  </a>
                </Reveal>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Eyebrow>Questions I get asked</Eyebrow>

          <div className="mt-10 grid gap-x-14 gap-y-9 md:grid-cols-2">
            {service.faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={(i % 2) * 0.05} y={16}>
                <div className="border-t pt-6" style={{ borderColor: 'var(--line)' }}>
                  <h2 className="text-[0.98rem] leading-snug text-cream">{faq.q}</h2>
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-gray-400">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guides ──────────────────────────────────────────────── */}
      {service.guides.length ? (
        <section className="border-t" style={{ borderColor: 'var(--line)' }}>
          <div className="shell py-16 md:py-24">
            <Eyebrow>How I do this work</Eyebrow>

            {service.guidesNote ? (
              <Reveal y={16} className="mt-6 max-w-2xl">
                <p className="text-[0.98rem] leading-[1.75] text-gray-400">{service.guidesNote}</p>
              </Reveal>
            ) : null}

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {service.guides.map((slug, i) => {
                const guide = getPost(slug);
                if (!guide) return null;
                return (
                  <Reveal key={slug} delay={(i % 2) * 0.06} y={18}>
                    <Link
                      href={`/blog/${slug}`}
                      data-cursor="Read"
                      className="group flex h-full flex-col rounded-xl border p-5 transition-colors duration-500 hover:border-hair2"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <p className="text-[0.98rem] leading-snug text-cream transition-colors duration-500 group-hover:text-primary">
                        {guide.title}
                      </p>
                      <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-gray-500">
                        {guide.standfirst}
                      </p>
                      <span className="mt-5 flex items-center gap-2">
                        <span className="label">{guide.readingMinutes} min read</span>
                        <ArrowLong
                          size={14}
                          className="text-primary transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCTA />
    </>
  );
}

/**
 * Structured data for a service page. Service plus Offer for the commercial
 * intent, FAQPage for the questions, and a ProfessionalService provider
 * carrying the address and the review aggregate.
 */
export function serviceSchema(service: Service) {
  const url = `${site.url}/services/${service.slug}`;

  const provider = {
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: '+923045624189',
    image: `${site.url}/og-image.webp`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressRegion: 'Islamabad Capital Territory',
      addressCountry: 'PK',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 33.6844, longitude: 73.0479 },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewSummary.average,
      reviewCount: reviewSummary.total,
      bestRating: 5,
    },
  };

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.serviceName,
      serviceType: service.serviceType,
      description: service.serviceDescription,
      url,
      provider,
      areaServed: [
        { '@type': 'Country', name: 'Pakistan' },
        { '@type': 'Place', name: 'Worldwide, remote' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${service.serviceName} options`,
        itemListElement: service.shapes.map((shape) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `${shape.name}`,
            description: `${shape.detail} Typical timeline: ${shape.timeline}.`,
          },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.url}/services` },
        { '@type': 'ListItem', position: 3, name: service.metaTitle, item: url },
      ],
    },
  ];
}
