'use client';

import { useState } from 'react';
import { capabilities, type MarkName } from '@/app/data/capabilities';
import {
  MarkStack,
  MarkCore,
  MarkFlow,
  MarkVault,
  MarkFrame,
  MarkBearing,
} from '@/app/components/marks';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/core/Reveal';

const marks: Record<
  MarkName,
  (props: { size?: number; className?: string; style?: React.CSSProperties }) => React.ReactElement
> = {
  stack: MarkStack,
  core: MarkCore,
  flow: MarkFlow,
  vault: MarkVault,
  frame: MarkFrame,
  bearing: MarkBearing,
};

export default function Capabilities() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-20 md:py-32" id="capabilities">
      <div className="shell">
        <SectionHeader
          index="02"
          label="What I do"
          title="Six things I am genuinely good at"
          note="No price list. The scope decides the number, and I write it down before anything starts."
        />

        <div className="mt-14 md:mt-20">
          {capabilities.map((cap, i) => {
            const Mark = marks[cap.mark];
            const isActive = active === cap.index;

            return (
              <Reveal key={cap.index} delay={i * 0.04} y={18}>
                <div
                  onMouseEnter={() => setActive(cap.index)}
                  onMouseLeave={() => setActive(null)}
                  className="group relative border-t transition-colors duration-500"
                  style={{ borderColor: isActive ? 'var(--brass-edge)' : 'var(--line)' }}
                >
                  {/* Brass wash that sweeps in from the left on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 origin-left transition-transform duration-[700ms] ease-out"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--brass-veil), rgba(200,155,82,0.02) 55%, transparent)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />

                  <div className="relative grid gap-5 py-8 md:grid-cols-12 md:gap-8 md:py-12">
                    <div className="flex items-start gap-5 md:col-span-4">
                      <span
                        className="display text-[clamp(2.4rem,6vw,4.6rem)] leading-none transition-colors duration-500"
                        style={{
                          color: 'transparent',
                          WebkitTextStroke: `1px ${isActive ? 'var(--brass)' : 'var(--line-3)'}`,
                        }}
                      >
                        {cap.index}
                      </span>
                      <Mark
                        size={26}
                        className="mt-2 shrink-0 transition-all duration-500"
                        style={{
                          color: isActive ? 'var(--brass-hi)' : 'var(--brass)',
                          opacity: isActive ? 1 : 0.55,
                        }}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <h3
                        className="display-tight text-[clamp(1.3rem,2.5vw,2rem)] transition-colors duration-500"
                        style={{ color: isActive ? 'var(--brass-hi)' : 'var(--bone)' }}
                      >
                        {cap.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-bone-2">
                        {cap.description}
                      </p>
                    </div>

                    <div className="md:col-span-3">
                      <div className="flex flex-wrap gap-1.5 md:justify-end">
                        {cap.tools.map((tool) => (
                          <span
                            key={tool}
                            className="mono border px-2 py-1 text-[0.6rem] transition-colors duration-500"
                            style={{
                              borderColor: isActive ? 'var(--brass-edge)' : 'var(--line)',
                              color: isActive ? 'var(--brass)' : 'var(--bone-3)',
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <div className="rule" />
        </div>
      </div>
    </section>
  );
}
