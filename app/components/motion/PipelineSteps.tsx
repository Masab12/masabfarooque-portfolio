'use client';

import { useEffect, useRef, useState } from 'react';

export type PipelineStep = { index: string; title: string; body: string };

/**
 * A process drawn as a pipeline. Stations sit along a pipe, horizontal on a
 * wide screen and vertical on a phone, and a packet moves down the pipe as
 * the reader scrolls through the block, lighting each station it reaches.
 * The order of the steps is the point, so the numbers stay.
 */
export default function PipelineSteps({ steps }: { steps: PipelineStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts as the block enters the lower third, done by the time it
      // reaches the upper third, so the whole run happens in view.
      setP(Math.min(1, Math.max(0, (vh * 0.8 - rect.top) / (rect.height + vh * 0.35))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const lit = Math.floor(p * steps.length + 0.25);

  return (
    <ol ref={ref} className="relative grid gap-10 pl-10 md:grid-cols-4 md:gap-8 md:pl-0 md:pt-12">
      {/* Vertical pipe, phones */}
      <span aria-hidden className="absolute bottom-2 left-[0.7rem] top-2 w-[3px] rounded-full bg-ink/10 md:hidden" />
      <span aria-hidden className="absolute bottom-2 left-[0.7rem] top-2 w-[3px] origin-top rounded-full bg-sage md:hidden" style={{ transform: `scaleY(${p})` }} />
      <span
        aria-hidden
        className="absolute h-3.5 w-3.5 -translate-x-[5px] border bg-paper md:hidden"
        style={{ left: '0.7rem', top: `calc(0.5rem + ${p} * (100% - 1rem) - 7px)`, borderColor: 'var(--clay)' }}
      />

      {/* Horizontal pipe, from md */}
      <span aria-hidden className="absolute left-0 right-0 top-[0.95rem] hidden h-[3px] rounded-full bg-ink/10 md:block" />
      <span aria-hidden className="absolute left-0 right-0 top-[0.95rem] hidden h-[3px] origin-left rounded-full bg-sage md:block" style={{ transform: `scaleX(${p})` }} />
      <span
        aria-hidden
        className="absolute hidden h-3.5 w-3.5 border bg-paper md:block"
        style={{ left: `calc(${p * 100}% - 7px)`, top: 'calc(0.95rem - 5.5px)', borderColor: 'var(--clay)', boxShadow: '0 0 0 3px rgb(var(--clay-rgb) / 0.15)' }}
      />

      {steps.map((step, i) => {
        const on = i < lit;
        return (
          <li key={step.index} className="relative">
            <span
              aria-hidden
              className={`absolute -left-10 top-0.5 flex h-6 w-6 translate-x-[0.3rem] items-center justify-center rounded-full border-2 transition-colors duration-500 md:-top-12 md:left-0 md:translate-x-0 ${
                on ? 'border-sage bg-sage' : 'border-ink/25 bg-paper'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${on ? 'bg-paper' : 'bg-ink/25'}`} />
            </span>
            <p className={`mono text-[0.72rem] transition-colors duration-500 ${on ? 'text-sage' : 'text-ink-3'}`}>{step.index}</p>
            <p className={`mt-2 text-[1.1rem] font-bold leading-snug tracking-[-0.01em] transition-colors duration-500 ${on ? 'text-ink' : 'text-ink/50'}`}>
              {step.title}
            </p>
            <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-2">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
