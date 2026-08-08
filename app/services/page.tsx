import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import { reviewSummary } from '@/app/data/reviews';
import { services } from '@/app/data/services';
import PageHead from '@/app/components/core/PageHead';
import Reveal from '@/app/components/motion/Reveal';
import ContactCTA from '@/app/components/home/ContactCTA';
import { ArrowLong } from '@/app/components/marks';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Four kinds of work I take on: WordPress to Next.js migrations, AI and agentic apps, full stack web applications, and data pipelines. Fixed price per project.',
  alternates: { canonical: `${site.url}/services` },
  keywords: [
    'freelance developer services',
    'Next.js developer Islamabad',
    'AI application developer',
    'full stack development service',
    'web scraping developer',
  ],
  openGraph: {
    type: 'website',
    title: 'Services | Masab Farooque',
    description:
      'WordPress to Next.js migrations, AI and agentic applications, full stack web applications, and data pipelines.',
    url: `${site.url}/services`,
  },
};

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Services offered by ${site.name}`,
  url: `${site.url}/services`,
  itemListElement: services.map((service, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: service.serviceName,
      serviceType: service.serviceType,
      description: service.serviceDescription,
      url: `${site.url}/services/${service.slug}`,
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
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.url}/services` },
  ],
};

export default function ServicesIndexPage() {
  return (
    <>
      {[listSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageHead
        label="Services"
        title="What you can hire me for"
        intro="Four kinds of work, each with its own page covering scope, timelines and the questions people ask before they commit. If your project sits across several of them, that is normal and it is the reason hiring one engineer tends to go faster than splitting it across a team."
        meta={[
          { label: 'Engagements', value: String(services.length) },
          { label: 'Pricing', value: 'Fixed per project' },
          {
            label: 'Reviews',
            value: `${reviewSummary.average.toFixed(1)} from ${reviewSummary.total}`,
          },
          { label: 'Based in', value: site.location },
        ]}
      />

      <section className="shell py-16 md:py-24">
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 2) * 0.06} y={18}>
              <Link
                href={`/services/${service.slug}`}
                data-cursor="Read more"
                className="group flex h-full flex-col rounded-xl border p-6 transition-colors duration-500 hover:border-hair2 md:p-8"
                style={{ borderColor: 'var(--line)' }}
              >
                <p className="mono text-[0.7rem] text-gray-500">
                  {String(i + 1).padStart(2, '0')}
                </p>

                <h2 className="mt-4 text-[clamp(1.15rem,2.4vw,1.5rem)] leading-snug text-cream transition-colors duration-500 group-hover:text-primary">
                  {service.metaTitle}
                </h2>

                <p className="mt-4 flex-1 text-[0.92rem] leading-[1.7] text-gray-400">
                  {service.intro}
                </p>

                <div
                  className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-5"
                  style={{ borderColor: 'var(--line)' }}
                >
                  {service.meta.map((item) => (
                    <span key={item.label} className="label">
                      {item.label}
                      <span className="mx-2 opacity-40">/</span>
                      <span style={{ color: 'var(--cream)' }}>{item.value}</span>
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                  Read the detail
                  <ArrowLong
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
