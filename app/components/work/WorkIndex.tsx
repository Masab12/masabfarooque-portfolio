'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, categoryLabels, type ProjectCategory } from '@/app/data/projects';
import { ArrowDiagonal } from '@/app/components/marks';
import Reveal from '@/app/components/motion/Reveal';
import Tilt from '@/app/components/motion/Tilt';

/**
 * Only the categories that actually have work in them. This list used to be
 * written out by hand, which meant retiring the last project in a category
 * left a filter behind that opened onto nothing.
 */
const filters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Everything' },
  ...(Object.keys(categoryLabels) as ProjectCategory[])
    .filter((id) => projects.some((project) => project.category === id))
    .map((id) => ({ id, label: categoryLabels[id] })),
];

export default function WorkIndex() {
  const [active, setActive] = useState<'all' | ProjectCategory>('all');

  const visible = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <>
      <Reveal
        className="sticky top-[var(--nav-h)] z-20 -mx-[var(--gutter)] mb-10 border-y px-[var(--gutter)] py-4 backdrop-blur"
        style={{ borderColor: 'var(--line)', background: 'rgb(var(--paper-rgb) / 0.88)' }}
        y={0}
      >
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto">
          <span className="label mr-4 hidden shrink-0 sm:inline">Filter</span>
          {filters.map((filter) => {
            const isActive = active === filter.id;
            const count =
              filter.id === 'all'
                ? projects.length
                : projects.filter((p) => p.category === filter.id).length;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                className="group relative min-h-11 shrink-0 px-4 py-2 text-sm transition-colors duration-400"
                style={{ color: isActive ? 'var(--paper)' : 'var(--ink-2)' }}
              >
                <span
                  className="absolute inset-0 origin-left transition-transform duration-500 ease-out"
                  style={{
                    background: 'var(--ink)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
                <span className="relative flex items-baseline gap-2">
                  {filter.label}
                  <span className="text-[0.6875rem] opacity-60">
                    {String(count).padStart(2, '0')}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        {visible.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.08} y={30}>
            <Tilt max={3.5}>
              <article className="group h-full">
                <Link href={`/portfolio/${project.slug}`} className="block">
                  <div className="border bg-sheet p-2 transition-colors duration-500 group-hover:border-hair3 sm:p-2.5" style={{ borderColor: 'var(--line-2)' }}>
                    <div className="relative overflow-hidden bg-plate" style={{ aspectRatio: '16 / 11' }}>
                      <Image
                        src={project.cover}
                        alt={`${project.title}, ${project.summary.charAt(0).toLowerCase()}${project.summary.slice(1)}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 46vw"
                        className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
                      />
                      <span className="mono absolute left-3 top-3 rounded-full border bg-paper/90 px-2.5 py-1 text-[0.66rem] uppercase text-ink backdrop-blur" style={{ borderColor: 'var(--line-2)' }}>
                        {categoryLabels[project.category]}
                      </span>
                      <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-ink text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowDiagonal size={16} />
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 px-1 pb-0.5 pt-2.5">
                      <span className="label">A-01.{projects.findIndex((p) => p.slug === project.slug) + 1}</span>
                      <span className="label">
                        {project.client} · {project.year}
                      </span>
                    </div>
                  </div>

                  <h2 className="mt-5 text-[clamp(1.4rem,1.1rem+1.1vw,2rem)] font-extrabold leading-tight tracking-[-0.025em] text-ink transition-colors duration-500 group-hover:text-sage">
                    {project.title}
                  </h2>
                  <p className="mt-2.5 max-w-lg text-[0.95rem] leading-relaxed text-ink-2">{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span key={tech} className="mono rounded-full border px-2.5 py-1 text-[0.68rem] text-ink-3" style={{ borderColor: 'var(--line-2)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </>
  );
}
