import type { Metadata } from 'next';
import { projects } from '@/app/data/projects';
import { site } from '@/app/data/site';
import PageHead from '@/app/components/core/PageHead';
import WorkIndex from '@/app/components/work/WorkIndex';
import ContactCTA from '@/app/components/home/ContactCTA';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies from Masab Farooque: SaaS platforms, AI systems, data pipelines and product builds, each taken from an empty repository to production.',
  alternates: { canonical: `${site.url}/portfolio` },
};

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Work by Masab Farooque',
  url: `${site.url}/portfolio`,
  hasPart: projects.map((p) => ({
    '@type': 'CreativeWork',
    name: p.title,
    description: p.summary,
    url: `${site.url}/portfolio/${p.slug}`,
  })),
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />

      <PageHead
        index="01"
        label="Work"
        title="Things I built and shipped"
        intro="Eight projects that reached real users. Each one lists what it does, how it is put together and what was hard about it, because that is the part worth reading."
        meta={[
          { label: 'Projects', value: String(projects.length) },
          { label: 'Built solo', value: '5 of 8' },
          { label: 'In production', value: '5 live' },
          { label: 'Span', value: '2025 to 2026' },
        ]}
      />

      <section className="shell py-14 md:py-20">
        <WorkIndex />
      </section>

      <ContactCTA />
    </>
  );
}
