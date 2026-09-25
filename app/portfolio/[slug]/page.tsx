import type { Metadata } from 'next';
import CurrentSheet from '@/app/components/core/CurrentSheet';
import CaseSystem from '@/app/components/work/CaseSystem';
import { projectSystems } from '@/app/data/systems';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject, categoryLabels } from '@/app/data/projects';
import { site } from '@/app/data/site';
import { ArrowLong, ArrowDiagonal, MarkCheck, Spark } from '@/app/components/marks';
import Reveal from '@/app/components/motion/Reveal';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };

  return {
    title: `${project.title}, ${categoryLabels[project.category]}`,
    description: project.summary,
    alternates: { canonical: `${site.url}/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      type: 'article',
      url: `${site.url}/portfolio/${project.slug}`,
      images: [{ url: project.cover, width: 1800, height: 1125, alt: `${project.title} interface` }],
    },
    twitter: { card: 'summary_large_image', images: [project.cover] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const system = projectSystems[project.slug];
  const position = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(position + 1) % projects.length];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `${site.url}/portfolio/${project.slug}`,
    image: `${site.url}${project.cover}`,
    dateCreated: project.year,
    creator: { '@type': 'Person', name: site.name, url: site.url },
    keywords: project.stack.join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header>
        <CurrentSheet title={project.title} meta={`${categoryLabels[project.category]} · ${project.year}`} />
        <div className="shell pb-10 pt-10 sm:pt-14 lg:pt-16">
          <nav aria-label="Breadcrumb" className="load-rise flex flex-wrap items-center gap-x-3 gap-y-1" style={{ '--d': '0s' } as React.CSSProperties}>
            <Link href="/portfolio" className="label transition-colors hover:text-sage">Work</Link>
            <span className="label opacity-40">/</span>
            <span className="label text-sage">{categoryLabels[project.category]}</span>
          </nav>

          <h1 className="load-head mt-5 max-w-[16ch] text-[clamp(2.6rem,1.2rem+5vw,6.25rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-ink [text-wrap:balance]">
            {project.title}
          </h1>

          <p className="text-lede load-rise mt-6 max-w-[42rem]" style={{ '--d': '0.15s' } as React.CSSProperties}>
            {project.summary}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px border lg:grid-cols-4" style={{ borderColor: 'var(--line-2)', background: 'var(--line-2)' }}>
            {[
              { k: 'Client', v: project.client },
              { k: 'Year', v: project.year },
              { k: 'Role', v: project.role, wide: true },
            ].map((cell, i) => (
              <div
                key={cell.k}
                className={`load-rise bg-paper px-4 py-4 sm:px-5 ${cell.wide ? 'col-span-2' : ''}`}
                style={{ '--d': `${0.25 + i * 0.07}s` } as React.CSSProperties}
              >
                <dt className="label">{cell.k}</dt>
                <dd className="mt-1.5 text-[0.95rem] text-ink">{cell.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="shell">
        <Reveal variant="scale" y={30}>
          <div className="border bg-sheet p-2 sm:p-3" style={{ borderColor: 'var(--line-2)' }}>
            <div className="relative overflow-hidden bg-plate" style={{ aspectRatio: '16 / 10' }}>
              <Image
                src={project.cover}
                alt={`${project.title}, ${project.summary.charAt(0).toLowerCase()}${project.summary.slice(1)}`}
                fill
                sizes="(min-width: 1760px) 1700px, 100vw"
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {system ? (
        <section className="shell pt-16 md:pt-24" aria-labelledby="how-it-works">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Reveal y={10}>
                <p className="label">Fig. 1 · Architecture</p>
              </Reveal>
              <Reveal as="h2" variant="wipe" delay={0.08} className="mt-3 text-[clamp(1.8rem,1.2rem+2.2vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink">
                <span id="how-it-works">How it works</span>
              </Reveal>
            </div>
            <Reveal delay={0.15} y={10}>
              <p className="max-w-md text-[0.95rem] leading-relaxed text-ink-2">
                Every part is drawn from what the project does. The traffic moving through it is
                illustrative.
              </p>
            </Reveal>
          </div>
          <Reveal variant="scale" y={30}>
            <CaseSystem graph={system} title={project.title} />
          </Reveal>
        </section>
      ) : null}

      <section className="shell py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3" y={16}>
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">
              <div className="flex items-center gap-3">
                <Spark size={10} className="text-sage" />
                <span className="label">Overview</span>
              </div>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 border px-4 py-2.5 text-xs transition-colors duration-500 hover:border-hair2"
                  style={{ borderColor: 'var(--line-2)' }}
                >
                  Visit live site
                  <ArrowDiagonal size={12} className="text-sage" />
                </a>
              ) : null}
            </div>
          </Reveal>

          <div className="space-y-6 md:col-span-8 md:col-start-5">
            {project.overview.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-[1.02rem] leading-[1.75] text-ink-2">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {project.metrics ? (
        <section className="border-y" style={{ borderColor: 'var(--line)' }}>
          <div className="shell">
            <Reveal
              stagger={0.07}
              className="grid grid-cols-2 gap-px md:grid-cols-4"
              style={{ background: 'var(--line)' }}
            >
              {project.metrics.map((metric) => (
                <div key={metric.label} className="p-7 md:p-10" style={{ background: 'var(--paper)' }}>
                  <p className="text-[clamp(1.9rem,1.4rem+2vw,3.2rem)] font-extrabold leading-none tracking-[-0.035em] text-ink">
                    {metric.value}
                  </p>
                  <p className="label mt-3">{metric.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal className="flex items-center gap-3" y={12}>
              <span className="label">What it does</span>
            </Reveal>
            <ul className="mt-7 space-y-4">
              {project.features.map((feature, i) => (
                <Reveal as="li" key={feature} delay={i * 0.04}>
                  <span className="flex gap-4 border-b pb-4 text-sm leading-relaxed text-ink-2" style={{ borderColor: 'var(--line)' }}>
                    <MarkCheck size={16} className="mt-0.5 shrink-0 text-sage" />
                    {feature}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <Reveal className="flex items-center gap-3" y={12}>
              <span className="label">The hard parts</span>
            </Reveal>
            <ul className="mt-7 space-y-4">
              {project.challenges.map((challenge, i) => (
                <Reveal as="li" key={challenge} delay={i * 0.04}>
                  <span className="flex gap-4 border-b pb-4 text-sm leading-relaxed text-ink-2" style={{ borderColor: 'var(--line)' }}>
                    <span className="mt-2 h-px w-4 shrink-0" style={{ background: 'var(--ink-3)' }} />
                    {challenge}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.15} className="mt-10">
              <p className="label mb-4">Built with</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="mono rounded-full border px-3 py-1.5 text-[0.72rem] text-ink-2"
                    style={{ borderColor: 'var(--line-2)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {project.images.length > 1 ? (
        <section className="shell pb-16 md:pb-24">
          <Reveal className="flex items-center gap-4" y={12}>
            <span className="label whitespace-nowrap">Screens</span>
            <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {project.images.slice(1).map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 0.08} y={26}>
                <div className="border bg-sheet p-2" style={{ borderColor: 'var(--line-2)' }}>
                <div className="relative overflow-hidden bg-plate" style={{ aspectRatio: '16 / 10' }}>
                  <Image
                    src={src}
                    alt={`${project.title} screen ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="object-cover object-top"
                  />
                </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <Link href={`/portfolio/${next.slug}`} className="group block">
          <div className="shell flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
            <div>
              <p className="label mb-4">Next project</p>
              <p className="text-[clamp(2.2rem,1.4rem+3.6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-ink transition-colors duration-500 group-hover:text-sage">
                {next.title}
              </p>
            </div>
            <ArrowLong
              size={44}
              className="text-sage transition-transform duration-700 group-hover:translate-x-4"
            />
          </div>
        </Link>
      </section>
    </>
  );
}
