'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { timeline } from '@/app/data/timeline';
import Reveal from '@/app/components/motion/Reveal';

const kindLabels = {
  education: 'education',
  work: 'role',
  award: 'tag: award',
  shift: 'turning point',
  founder: 'founded',
} as const;

/**
 * The career, read like `git log` from the first commit forward. The branch
 * line fills in as the list is read, each entry lands as a commit that fills
 * when it arrives, and awards hang off the line as tags. Years and kinds are
 * the real ones from timeline.ts; nothing here is a made up hash.
 */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.75'] });
  const spine = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-0 left-[9px] top-3 w-[3px] rounded-full bg-ink/10 md:left-[calc(16.6667%-1px)]" />
      <motion.div
        className="absolute bottom-0 left-[9px] top-3 w-[3px] origin-top rounded-full bg-sage md:left-[calc(16.6667%-1px)]"
        style={{ scaleY: spine }}
      />

      <ol>
        {timeline.map((entry, i) => {
          const award = entry.kind === 'award';
          return (
            <Reveal as="li" key={`${entry.year}-${entry.title}`} delay={(i % 3) * 0.05} y={22} className="commit">
              <div className="grid grid-cols-1 gap-3 py-7 md:grid-cols-6 md:gap-8">
                <div className="flex items-center gap-4 md:col-span-1 md:justify-end md:pr-8">
                  <span className="mono order-2 text-[0.75rem] text-ink-2 md:order-1">{entry.year}</span>
                  <span
                    aria-hidden
                    className={`commit-dot order-1 shrink-0 border-2 md:order-2 md:-mr-[calc(2rem+10px)] ${
                      award ? 'h-[17px] w-[17px] rotate-45 rounded-[3px]' : 'h-[21px] w-[21px] rounded-full'
                    }`}
                    data-kind={entry.kind}
                  />
                </div>

                <div className="pl-10 md:col-span-5 md:pl-0">
                  <p className={`mono mb-2 inline-block text-[0.7rem] ${award ? 'rounded-full border px-2 py-0.5 text-clay-ink' : 'text-ink-3'}`} style={award ? { borderColor: 'rgb(var(--clay-rgb) / 0.4)' } : undefined}>
                    {kindLabels[entry.kind]}
                  </p>
                  <h3 className="text-[clamp(1.15rem,1rem+0.7vw,1.6rem)] font-bold tracking-[-0.015em] text-ink">{entry.title}</h3>
                  {entry.org ? <p className="mt-1 text-[0.92rem] text-sage">{entry.org}</p> : null}
                  <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-2">{entry.body}</p>
                  {entry.tags ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="mono rounded-full border px-2.5 py-1 text-[0.68rem] text-ink-3" style={{ borderColor: 'var(--line-2)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
