'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, categoryLabels, type ProjectCategory } from '@/app/data/projects';
import { ArrowLong, ArrowDiagonal } from '@/app/components/marks';
import Reveal from '@/app/components/core/Reveal';

const filters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'saas', label: categoryLabels.saas },
  { id: 'ai', label: categoryLabels.ai },
  { id: 'data', label: categoryLabels.data },
  { id: 'product', label: categoryLabels.product },
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
        style={{ borderColor: 'var(--line)', background: 'rgba(10,9,8,0.82)' }}
        y={0}
      >
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto">
          <span className="eyebrow mr-4 hidden shrink-0 sm:inline">Filter</span>
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
                className="group relative shrink-0 px-4 py-2 text-sm transition-colors duration-400"
                style={{ color: isActive ? 'var(--ink)' : 'var(--bone-2)' }}
              >
                <span
                  className="absolute inset-0 origin-left transition-transform duration-500 ease-out"
                  style={{
                    background: 'var(--brass)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
                <span className="relative flex items-baseline gap-2">
                  {filter.label}
                  <span className="mono text-[0.55rem] opacity-60">
                    {String(count).padStart(2, '0')}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
        {visible.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.08} y={30}>
            <article className="group">
              <Link href={`/portfolio/${project.slug}`} data-cursor="Open case study">
                <div
                  className="relative overflow-hidden"
                  style={{ borderRadius: 'clamp(12px, 1.6vw, 22px)', aspectRatio: '16 / 11' }}
                >
                  <Image
                    src={project.cover}
                    alt={`${project.title} interface`}
                    fill
                    sizes="(max-width: 768px) 100vw, 46vw"
                    className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 transition-opacity duration-700 group-hover:opacity-60"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(10,9,8,0.05), rgba(10,9,8,0.72))',
                    }}
                  />
                  <span
                    className="absolute inset-0 border transition-colors duration-700 group-hover:border-brass"
                    style={{ borderColor: 'var(--line)', borderRadius: 'inherit' }}
                  />

                  <span className="absolute bottom-5 left-5 flex items-center gap-3">
                    <span
                      className="mono border px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.14em] backdrop-blur"
                      style={{
                        borderColor: 'var(--line-2)',
                        background: 'rgba(10,9,8,0.5)',
                        color: 'var(--brass)',
                      }}
                    >
                      {categoryLabels[project.category]}
                    </span>
                  </span>

                  <span className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" style={{ background: 'var(--brass)', color: 'var(--ink)' }}>
                    <ArrowDiagonal size={17} />
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="display-tight text-[clamp(1.35rem,2.4vw,1.9rem)] text-bone transition-colors duration-500 group-hover:text-brass">
                      {project.title}
                    </h2>
                    <p className="mono mt-2 text-[0.6rem] text-bone-3">
                      {project.client}
                      <span className="mx-2 opacity-40">/</span>
                      {project.year}
                    </p>
                  </div>
                  <ArrowLong
                    size={20}
                    className="mt-1 shrink-0 text-bone-3 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-brass"
                  />
                </div>

                <p className="mt-3 max-w-lg text-sm leading-relaxed text-bone-2">
                  {project.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="mono border px-2 py-1 text-[0.58rem] text-bone-3"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </>
  );
}
