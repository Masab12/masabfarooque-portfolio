'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { featuredProjects, categoryLabels } from '@/app/data/projects';
import { ArrowLong, ArrowDiagonal } from '@/app/components/marks';
import Section from '@/app/components/core/Section';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/motion/Reveal';

/**
 * Featured work as a stack of plates. Each plate pins, then shrinks and dims
 * as the next slides over it, so the section reads like printed boards being
 * laid down one on top of the other. Driven entirely by Framer Motion scroll
 * progress, which reads the same native scroll position as everything else.
 */

function Plate({
  project,
  index,
  total,
  progress,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isLast = index === total - 1;
  const target = 1 - (total - 1 - index) * 0.04;
  const start = index / total;

  const scale = useTransform(progress, [start, 1], [1, target]);
  const dim = useTransform(progress, [start, 1], [1, 0.55]);
  const filter = useTransform(dim, (v) => `brightness(${v})`);

  // Sticky stacking needs room to breathe. Below md the plates simply follow
  // one another, which is the only thing that reads well on a phone.
  return (
    <div className="mb-5 md:mb-0 md:h-[92vh]">
      <motion.article
        className="overflow-hidden rounded-2xl border md:sticky md:rounded-[2rem]"
        style={{
          top: `calc(4.5rem + ${index * 14}px)`,
          borderColor: 'var(--line)',
          background: 'var(--surface-1)',
          transformOrigin: 'center top',
          scale: isLast ? 1 : scale,
          filter: isLast ? 'none' : filter,
        }}
      >
        <div className="grid md:grid-cols-12">
          <div className="flex flex-col justify-between p-5 sm:p-7 md:col-span-5 md:p-9 lg:p-11">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-[clamp(2.4rem,5vw,4rem)] font-medium leading-none tracking-[-0.06em] text-gray-500">
                  0{index + 1}
                </span>
                <span className="text-[10px] text-gray-500">{project.year}</span>
              </div>

              <p className="label mt-6">
                {categoryLabels[project.category]}
                <span className="mx-2 opacity-40">/</span>
                {project.client}
              </p>

              <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-cream">
                {project.title}
              </h3>

              <p className="mt-4 max-w-md text-xs leading-relaxed text-gray-400 sm:text-sm">
                {project.summary}
              </p>

              {project.metrics ? (
                <dl
                  className="mt-6 grid grid-cols-3 gap-3 border-t pt-5 sm:gap-4"
                  style={{ borderColor: 'var(--line)' }}
                >
                  {project.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <dt className="text-[0.95rem] text-primary">{m.value}</dt>
                      <dd className="label mt-1.5 leading-snug">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/portfolio/${project.slug}`}
                data-cursor="Read case study"
                className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3"
              >
                Case study
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
                  <ArrowLong size={14} className="text-cream" />
                </span>
              </Link>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm text-gray-400 transition-colors hover:text-cream"
                >
                  Live site
                  <ArrowDiagonal size={13} />
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative md:col-span-7">
            <div
              className="relative m-4 overflow-hidden rounded-xl md:m-5 md:ml-0 md:rounded-2xl"
              style={{ aspectRatio: '16 / 11' }}
            >
              <Image
                src={project.cover}
                alt={`${project.title} interface`}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover object-top"
                priority={index === 0}
              />
              <span
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(225,224,204,0.06), transparent 42%, rgba(0,0,0,0.5))',
                }}
              />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function WorkPlates() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start start', 'end end'],
  });

  return (
    <Section id="work">
      <SectionHeader
        label="Selected work"
        title="Three builds worth reading about."
        subtitle="Empty repository to daily use, three times over."
      />

      <div ref={listRef} className="mt-12 md:mt-16">
        {featuredProjects.map((project, i) => (
          <Plate
            key={project.slug}
            project={project}
            index={i}
            total={featuredProjects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <Reveal className="mt-4 flex justify-center md:mt-8">
        <Link
          href="/portfolio"
          data-cursor="All projects"
          className="group inline-flex items-center gap-2 rounded-full border py-1.5 pl-6 pr-1.5 text-sm transition-all duration-300 hover:gap-3"
          style={{ borderColor: 'var(--line-2)' }}
        >
          See every project
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary transition-transform duration-300 group-hover:scale-110">
            <ArrowLong size={15} className="text-black" />
          </span>
        </Link>
      </Reveal>
    </Section>
  );
}
