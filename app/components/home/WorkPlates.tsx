'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredProjects, categoryLabels } from '@/app/data/projects';
import { ArrowLong, ArrowDiagonal } from '@/app/components/marks';
import { initGsap, prefersReducedMotion } from '@/app/lib/motion';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/core/Reveal';

/**
 * Featured work as a stack of plates. Each plate pins, then shrinks and dims a
 * little as the next one slides over it, so the section reads like a set of
 * printed boards being laid down one on top of the other.
 */
export default function WorkPlates() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;

    const { gsap } = initGsap();

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>('[data-plate-wrap]');
      const last = wrappers[wrappers.length - 1];

      wrappers.forEach((wrapper, i) => {
        const plate = wrapper.querySelector<HTMLElement>('[data-plate]');
        if (!plate || i === wrappers.length - 1) return;

        gsap.to(plate, {
          scale: 1 - (wrappers.length - 1 - i) * 0.035,
          filter: 'brightness(0.62)',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top+=120',
            endTrigger: last,
            end: 'top top+=200',
            scrub: 0.4,
          },
        });
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-20 md:py-32" id="work">
      <div className="shell">
        <SectionHeader
          label="Selected work"
          title="Three builds worth reading about."
          subtitle="Empty repository to daily use, three times over."
        />
      </div>

      <div ref={listRef} className="shell mt-14 md:mt-20">
        {featuredProjects.map((project, i) => (
          <div key={project.slug} data-plate-wrap className="h-[86vh] md:h-[94vh]">
            <article
              data-plate
              className="sticky overflow-hidden border"
              style={{
                top: `calc(var(--nav-h) + ${i * 16}px)`,
                borderColor: 'var(--line-2)',
                background: 'var(--surface-1)',
                borderRadius: 'clamp(18px, 2.4vw, 34px)',
                transformOrigin: 'center top',
                willChange: 'transform',
              }}
            >
              <div className="grid md:grid-cols-12">
                <div className="flex flex-col justify-between p-6 md:col-span-5 md:p-9 lg:p-11">
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[clamp(3rem,7vw,6.5rem)] leading-none"
                        style={{ color: 'transparent', WebkitTextStroke: '1px var(--line-2)' }}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-[0.65rem] text-gray-500">{project.year}</span>
                    </div>

                    <p className="label mt-6">
                      {categoryLabels[project.category]}
                      <span className="mx-2 opacity-40">/</span>
                      {project.client}
                    </p>

                    <h3 className="mt-3 text-[clamp(1.8rem,3.6vw,3rem)] text-cream">
                      {project.title}
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400">
                      {project.summary}
                    </p>

                    {project.metrics ? (
                      <dl className="mt-7 grid grid-cols-3 gap-4 border-t pt-5" style={{ borderColor: 'var(--line)' }}>
                        {project.metrics.slice(0, 3).map((m) => (
                          <div key={m.label}>
                            <dt className="text-[0.95rem] text-primary">{m.value}</dt>
                            <dd className="label mt-1.5 text-[0.55rem] leading-snug">{m.label}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      data-cursor="Read case study"
                      className="group inline-flex items-center gap-3 border px-5 py-3 text-sm transition-colors duration-500 hover:border-hair2"
                      style={{ borderColor: 'var(--line-2)' }}
                    >
                      Case study
                      <ArrowLong
                        size={15}
                        className="text-primary transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </Link>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-2 py-3 text-sm text-gray-400 transition-colors hover:text-primary"
                      >
                        Live site
                        <ArrowDiagonal size={13} />
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="relative md:col-span-7">
                  <div
                    className="relative m-4 overflow-hidden md:m-5 md:ml-0"
                    style={{ borderRadius: 'clamp(12px, 1.8vw, 26px)', aspectRatio: '16 / 11' }}
                  >
                    <Image
                      src={project.cover}
                      alt={`${project.title} interface`}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="object-cover object-top"
                      priority={i === 0}
                    />
                    <span
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(160deg, rgba(200,155,82,0.10), transparent 42%, rgba(10,9,8,0.55))',
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="shell">
        <Reveal className="mt-6 flex justify-center md:mt-10">
          <Link
            href="/portfolio"
            data-cursor="All projects"
            className="group inline-flex items-center gap-4 border px-8 py-4 transition-colors duration-500 hover:border-hair2"
            style={{ borderColor: 'var(--line-2)' }}
          >
            <span className="text-[0.7rem] text-primary">08</span>
            <span className="text-sm">See every project</span>
            <ArrowLong
              size={16}
              className="text-primary transition-transform duration-500 group-hover:translate-x-1.5"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
