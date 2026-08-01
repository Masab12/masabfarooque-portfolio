'use client';

import { useEffect, useRef } from 'react';
import { timeline } from '@/app/data/timeline';
import { initGsap, prefersReducedMotion } from '@/app/lib/motion';
import Reveal from '@/app/components/core/Reveal';

const kindLabels = {
  education: 'Education',
  work: 'Role',
  award: 'Award',
  shift: 'Turning point',
  founder: 'Founded',
} as const;

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { gsap } = initGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-spine]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 80%', scrub: 0.6 },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        className="absolute bottom-0 left-[7px] top-2 w-px md:left-[calc(16.6667%-1px)]"
        style={{ background: 'var(--line)' }}
      />
      <div
        data-spine
        className="absolute bottom-0 left-[7px] top-2 w-px origin-top md:left-[calc(16.6667%-1px)]"
        style={{ background: 'var(--cream)', transform: 'scaleY(0)' }}
      />

      <ol>
        {timeline.map((entry, i) => (
          <Reveal as="li" key={`${entry.year}-${entry.title}`} delay={(i % 3) * 0.05} y={22}>
            <div className="grid grid-cols-1 gap-4 py-7 md:grid-cols-6 md:gap-8">
              <div className="flex items-center gap-4 md:col-span-1 md:justify-end md:pr-8">
                <span className="order-2 text-[0.72rem] text-primary md:order-1">
                  {entry.year}
                </span>
                <span
                  className="order-1 h-[15px] w-[15px] shrink-0 rotate-45 border md:order-2 md:-mr-[calc(2rem+7px)]"
                  style={{
                    borderColor: entry.kind === 'award' ? 'var(--cream)' : 'var(--line-3)',
                    background: entry.kind === 'award' ? 'var(--cream)' : 'var(--bg)',
                  }}
                />
              </div>

              <div className="pl-8 md:col-span-5 md:pl-0">
                <p className="label mb-2">{kindLabels[entry.kind]}</p>
                <h3 className="text-[clamp(1.15rem,2.1vw,1.6rem)] text-cream">
                  {entry.title}
                </h3>
                {entry.org ? <p className="mt-1 text-sm text-primary">{entry.org}</p> : null}
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">{entry.body}</p>
                {entry.tags ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border px-2 py-1 text-[0.58rem] text-gray-500"
                        style={{ borderColor: 'var(--line)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
