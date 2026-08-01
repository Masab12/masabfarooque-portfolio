'use client';

import { useEffect, useRef } from 'react';
import { process } from '@/app/data/capabilities';
import { initGsap, prefersReducedMotion } from '@/app/lib/motion';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/core/Reveal';

/**
 * The four steps, joined by a brass thread that draws itself as the section is
 * scrolled through. The line is a real SVG path so it stays crisp at any size.
 */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { gsap } = initGsap();

    const ctx = gsap.context(() => {
      const path = el.querySelector<SVGPathElement>('[data-thread]');
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 72%', end: 'bottom 72%', scrub: 0.5 },
        });
      }

      gsap.fromTo(
        el.querySelectorAll('[data-node]'),
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.14,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: el, start: 'top 68%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-20 md:py-32">
      <div className="shell">
        <SectionHeader
          index="04"
          label="How it runs"
          title="Four steps, no surprises"
          note="The same sequence every time, whether it is a two week build or a four month platform."
        />

        <div ref={ref} className="relative mt-16 md:mt-24">
          <svg
            className="pointer-events-none absolute inset-x-0 top-[22px] hidden h-6 w-full md:block"
            viewBox="0 0 1200 24"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              data-thread
              d="M62 12 C 180 -6, 262 30, 380 12 S 600 -4, 680 14 S 842 20, 916 12"
              fill="none"
              stroke="var(--brass)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.75"
            />
          </svg>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {process.map((step, i) => (
              <Reveal as="li" key={step.index} delay={i * 0.08} y={22}>
                <div className="flex items-center gap-4 md:block">
                  <span
                    data-node
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      borderColor: 'var(--brass-edge)',
                      background: 'var(--ink)',
                      color: 'var(--brass)',
                    }}
                  >
                    <span className="mono text-[0.8rem]">{step.index}</span>
                  </span>
                  <h3 className="display-tight text-[1.15rem] text-bone md:mt-7">{step.title}</h3>
                </div>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-2">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
