import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject, categoryLabels } from '@/app/data/projects';
import { site } from '@/app/data/site';
import { ArrowLong, ArrowDiagonal, MarkCheck, Spark } from '@/app/components/marks';
import Reveal from '@/app/components/core/Reveal';
import TextReveal from '@/app/components/core/TextReveal';
import ContactCTA from '@/app/components/home/ContactCTA';

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
      images: [{ url: project.cover, alt: `${project.title} interface` }],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

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

      <header className="relative overflow-hidden pt-[calc(var(--nav-h)+3.5rem)]">
        <div className="warp" />

        <div className="shell relative">
          <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2" y={12}>
            <Link href="/portfolio" className="eyebrow transition-colors hover:text-brass">
              Work
            </Link>
            <span className="eyebrow opacity-40">/</span>
            <span className="eyebrow text-brass">{categoryLabels[project.category]}</span>
            <span className="eyebrow opacity-40">/</span>
            <span className="eyebrow">{project.year}</span>
          </Reveal>

          <TextReveal
            as="h1"
            mode="words"
            text={project.title}
            className="display wash mt-7 text-[clamp(2.8rem,10vw,8.5rem)] uppercase"
          />

          <Reveal delay={0.12} className="mt-7 max-w-2xl">
            <p className="lede">{project.summary}</p>
          </Reveal>

          <Reveal
            delay={0.2}
            stagger={0.05}
            className="mt-12 grid grid-cols-2 gap-6 border-y py-7 md:grid-cols-4"
            style={{ borderColor: 'var(--line)' }}
          >
            <div>
              <p className="eyebrow mb-2">Client</p>
              <p className="text-sm text-bone">{project.client}</p>
            </div>
            <div>
              <p className="eyebrow mb-2">Year</p>
              <p className="text-sm text-bone">{project.year}</p>
            </div>
            <div className="col-span-2">
              <p className="eyebrow mb-2">Role</p>
              <p className="text-sm text-bone">{project.role}</p>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="shell mt-10 md:mt-14">
        <Reveal y={26}>
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: 'clamp(14px, 2vw, 30px)', aspectRatio: '16 / 9' }}
          >
            <Image
              src={project.cover}
              alt={`${project.title} interface`}
              fill
              sizes="100vw"
              priority
              className="object-cover object-top"
            />
            <span
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(200,155,82,0.06), rgba(10,9,8,0.4))',
              }}
            />
          </div>
        </Reveal>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3" y={16}>
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">
              <div className="flex items-center gap-3">
                <Spark size={10} className="text-brass" />
                <span className="eyebrow">Overview</span>
              </div>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 border px-4 py-2.5 text-xs transition-colors duration-500 hover:border-brass"
                  style={{ borderColor: 'var(--line-2)' }}
                >
                  Visit live site
                  <ArrowDiagonal size={12} className="text-brass" />
                </a>
              ) : null}
            </div>
          </Reveal>

          <div className="space-y-6 md:col-span-8 md:col-start-5">
            {project.overview.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-[1.02rem] leading-[1.75] text-bone-2">{paragraph}</p>
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
                <div key={metric.label} className="p-7 md:p-10" style={{ background: 'var(--ink)' }}>
                  <p className="display-tight text-[clamp(1.8rem,4vw,3.2rem)] text-brass">
                    {metric.value}
                  </p>
                  <p className="eyebrow mt-3">{metric.label}</p>
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
              <span className="mono text-[0.7rem] text-brass">A</span>
              <span className="eyebrow">What it does</span>
            </Reveal>
            <ul className="mt-7 space-y-4">
              {project.features.map((feature, i) => (
                <Reveal as="li" key={feature} delay={i * 0.04}>
                  <span className="flex gap-4 border-b pb-4 text-sm leading-relaxed text-bone-2" style={{ borderColor: 'var(--line)' }}>
                    <MarkCheck size={16} className="mt-0.5 shrink-0 text-brass" />
                    {feature}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <Reveal className="flex items-center gap-3" y={12}>
              <span className="mono text-[0.7rem] text-brass">B</span>
              <span className="eyebrow">The hard parts</span>
            </Reveal>
            <ul className="mt-7 space-y-4">
              {project.challenges.map((challenge, i) => (
                <Reveal as="li" key={challenge} delay={i * 0.04}>
                  <span className="flex gap-4 border-b pb-4 text-sm leading-relaxed text-bone-2" style={{ borderColor: 'var(--line)' }}>
                    <span className="mt-2 h-px w-4 shrink-0" style={{ background: 'var(--ember)' }} />
                    {challenge}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.15} className="mt-10">
              <p className="eyebrow mb-4">Built with</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="mono border px-3 py-1.5 text-[0.62rem] text-bone-2"
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
            <span className="eyebrow whitespace-nowrap">Screens</span>
            <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {project.images.slice(1).map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 0.08} y={26}>
                <div
                  className="relative overflow-hidden border"
                  style={{
                    borderColor: 'var(--line)',
                    borderRadius: 'clamp(12px, 1.6vw, 22px)',
                    aspectRatio: '16 / 10',
                  }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} screen ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="object-cover object-top"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <Link href={`/portfolio/${next.slug}`} className="group block" data-cursor="Next project">
          <div className="shell flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
            <div>
              <p className="eyebrow mb-4">Next project</p>
              <p className="display text-[clamp(2.2rem,6vw,4.6rem)] uppercase text-bone transition-colors duration-500 group-hover:text-brass">
                {next.title}
              </p>
            </div>
            <ArrowLong
              size={44}
              className="text-brass transition-transform duration-700 group-hover:translate-x-4"
            />
          </div>
        </Link>
      </section>

      <ContactCTA />
    </>
  );
}
