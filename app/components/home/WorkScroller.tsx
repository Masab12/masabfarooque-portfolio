'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SystemScene from '@/app/components/scene/SystemScene';
import { projectSystems } from '@/app/data/systems';
import { MarkArrow45 } from '@/app/components/marks';

export type WorkItem = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  client: string;
  role: string;
  stack: string[];
  cover: string;
  liveUrl?: string;
};

/**
 * Selected work, scroll driven.
 *
 * On a wide screen a stage stays pinned beside the case studies. As each
 * one reaches the middle of the view, the stage takes the previous system
 * apart and builds this one: the real architecture of that project, drawn
 * from its write up. On a phone every case study carries its own smaller
 * scene instead, since a pinned stage would take half the screen.
 */
export default function WorkScroller({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.slug ?? '');
  const [hover, setHover] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = (entry.target as HTMLElement).dataset.slug;
          if (entry.isIntersecting && slug) setActive(slug);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    list.querySelectorAll('[data-slug]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = items.find((i) => i.slug === active) ?? items[0];
  const graph = projectSystems[current.slug];
  const node = hover ? graph?.nodes.find((n) => n.id === hover) : null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Pinned stage, wide screens */}
      <div className="hidden lg:col-span-7 lg:block">
        <div className="sticky top-[calc(var(--nav-h)+1.5rem)] flex h-[calc(100svh-var(--nav-h)-3rem)] max-h-[52rem] flex-col border bg-sheet/70" style={{ borderColor: 'var(--line-2)' }}>
          <div className="flex items-center justify-between gap-4 border-b px-5 py-3" style={{ borderColor: 'var(--line)' }}>
            <p className="label">
              <span className="text-ink">Fig. 3</span> · How {current.title} works
            </p>
            <ol className="flex items-center gap-2" aria-label="Case studies">
              {items.map((item, i) => (
                <li key={item.slug} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden className="h-px w-6 bg-ink/25" /> : null}
                  <a
                    href={`#work-${item.slug}`}
                    aria-current={item.slug === current.slug ? 'step' : undefined}
                    className={`mono flex h-7 min-w-7 items-center justify-center rounded-full border px-2 text-[0.6875rem] transition-colors duration-500 ${
                      item.slug === current.slug ? 'border-ink bg-ink text-paper' : 'border-hair2 text-ink-3 hover:text-ink'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          {graph ? (
            <SystemScene
              graph={graph}
              label={`Architecture of ${current.title}: ${graph.nodes.map((n) => n.label).join(', ')}.`}
              className="min-h-0 flex-1"
              fill={0.86}
              onHover={setHover}
            />
          ) : null}
          <div className="min-h-[4.75rem] border-t px-5 py-3.5" style={{ borderColor: 'var(--line)' }} aria-live="polite">
            {node ? (
              <p className="text-[0.9rem] leading-relaxed text-ink-2">
                <span className="mr-2 font-bold text-ink">{node.label}</span>
                {node.note}
              </p>
            ) : (
              <p className="text-[0.9rem] leading-relaxed text-ink-3">
                Point at any part to read what it does. Drag to turn the drawing.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* The case studies */}
      <div ref={listRef} className="lg:col-span-5">
        {items.map((item, i) => (
          <article
            key={item.slug}
            id={`work-${item.slug}`}
            data-slug={item.slug}
            className="flex scroll-mt-28 flex-col justify-center border-t py-12 first:border-t-0 first:pt-0 lg:min-h-[78svh] lg:py-16"
            style={{ borderColor: 'var(--line)' }}
          >
            <p className="label">
              {item.category} · {item.year}
            </p>
            <h3 className="mt-3 text-[clamp(1.7rem,1.2rem+1.6vw,2.6rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink">
              <Link href={`/portfolio/${item.slug}`} className="transition-colors hover:text-sage">
                {item.title}
              </Link>
            </h3>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-2">{item.summary}</p>

            <Link
              href={`/portfolio/${item.slug}`}
              className="group mt-6 block overflow-hidden border bg-sheet p-1.5"
              style={{ borderColor: 'var(--line-2)' }}
              tabIndex={-1}
              aria-hidden
            >
              <Image
                src={item.cover}
                alt=""
                width={1800}
                height={1125}
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.025]"
              />
            </Link>

            {projectSystems[item.slug] ? (
              <div className="mt-6 border bg-sheet/70 lg:hidden" style={{ borderColor: 'var(--line-2)' }}>
                <p className="label border-b px-4 py-2.5" style={{ borderColor: 'var(--line)' }}>
                  <span className="text-ink">Fig. 3.{i + 1}</span> · How it works
                </p>
                <SystemScene
                  graph={projectSystems[item.slug]}
                  label={`Architecture of ${item.title}.`}
                  className="h-[17rem] sm:h-[22rem]"
                  fill={0.98}
                  compact
                />
              </div>
            ) : null}

            <dl className="mt-6 grid grid-cols-1 gap-px border xs:grid-cols-2" style={{ borderColor: 'var(--line-2)', background: 'var(--line-2)' }}>
              <div className="bg-paper p-3.5">
                <dt className="label">Client</dt>
                <dd className="mt-1 text-[0.92rem] text-ink">{item.client}</dd>
              </div>
              <div className="bg-paper p-3.5">
                <dt className="label">Role</dt>
                <dd className="mt-1 text-[0.92rem] text-ink">{item.role}</dd>
              </div>
              <div className="bg-paper p-3.5 xs:col-span-2">
                <dt className="label">Stack</dt>
                <dd className="mt-1 text-[0.92rem] text-ink">{item.stack.join(', ')}</dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
              <Link href={`/portfolio/${item.slug}`} className="group inline-flex min-h-[2.75rem] items-center gap-2 text-[0.9375rem] font-bold text-ink">
                Read the case study
                <MarkArrow45 size={11} className="text-sage transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              {item.liveUrl ? (
                <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[2.75rem] items-center text-[0.9375rem] text-ink-2 underline decoration-[var(--line-3)] underline-offset-[0.3em] hover:text-ink">
                  {new URL(item.liveUrl).hostname.replace(/^www\./, '')}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
