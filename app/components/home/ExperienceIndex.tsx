'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { roles } from '@/app/data/experience';
import { ArrowDiagonal, LogoChord, LogoPenta, LogoMindstorm, PlusMark } from '@/app/components/marks';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/core/Reveal';

const drawn = {
  chord: LogoChord,
  penta: LogoPenta,
  mindstorm: LogoMindstorm,
} as const;

/**
 * Each brand asset carries a different amount of internal padding, so the
 * height is set per logo rather than stretching everything to one box.
 */
function RoleLogo({ role }: { role: (typeof roles)[number] }) {
  const height = role.logo.height ?? 24;

  if (role.logo.kind === 'drawn' && role.logo.mark) {
    const Drawn = drawn[role.logo.mark];
    return <Drawn className="w-auto text-bone" style={{ height, width: 'auto' }} />;
  }

  if (role.logo.src) {
    return (
      <Image
        src={role.logo.src}
        alt={`${role.company} logo`}
        width={160}
        height={height}
        className="w-auto object-contain"
        style={{ height, width: 'auto', filter: 'grayscale(1) brightness(2.3) contrast(0.75)' }}
      />
    );
  }

  return null;
}

export default function ExperienceIndex() {
  const [open, setOpen] = useState<string | null>(roles[0].id);

  return (
    <section className="relative py-20 md:py-32" id="experience">
      <div className="shell">
        <SectionHeader
          index="01"
          label="Where I have worked"
          title="Teams that shipped with me"
          note="Two current product teams, plus the studios and agencies that came before. Open a row to see what I actually built there."
        />

        <div className="mt-14 md:mt-20">
          {roles.map((role, i) => {
            const isOpen = open === role.id;
            return (
              <Reveal key={role.id} delay={i * 0.05} y={18}>
                <div
                  className="border-t"
                  style={{ borderColor: isOpen ? 'var(--brass-edge)' : 'var(--line)' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : role.id)}
                    aria-expanded={isOpen}
                    className="group grid w-full grid-cols-12 items-center gap-4 py-6 text-left transition-colors duration-500 md:py-8"
                  >
                    <span className="col-span-3 md:col-span-2">
                      <span className="mono text-[0.7rem] text-bone-3">
                        {role.from}
                        <span className="mx-1 opacity-40">to</span>
                        {role.to}
                      </span>
                    </span>

                    <span className="col-span-9 flex h-8 items-center md:col-span-3">
                      <span className="flex h-full items-center opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                        <RoleLogo role={role} />
                      </span>
                    </span>

                    <span
                      className="col-span-9 text-[0.95rem] md:col-span-4"
                      style={{ color: isOpen ? 'var(--brass)' : 'var(--bone)' }}
                    >
                      {role.title}
                      <span className="mono ml-3 hidden text-[0.65rem] text-bone-3 lg:inline">
                        {role.type}
                      </span>
                    </span>

                    <span className="col-span-3 flex items-center justify-end gap-4 md:col-span-3">
                      <span className="mono hidden text-[0.65rem] text-bone-3 sm:inline">
                        {role.period}
                      </span>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-500"
                        style={{
                          borderColor: isOpen ? 'var(--brass-edge)' : 'var(--line-2)',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          color: isOpen ? 'var(--brass)' : 'var(--bone-2)',
                        }}
                      >
                        <PlusMark size={14} />
                      </span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-10 md:grid-cols-12">
                          <p className="lede md:col-span-5">{role.summary}</p>

                          <ul className="space-y-3 md:col-span-5">
                            {role.highlights.map((line) => (
                              <li key={line} className="flex gap-3 text-sm leading-relaxed text-bone-2">
                                <span
                                  className="mt-[0.55rem] h-px w-4 shrink-0"
                                  style={{ background: 'var(--brass)' }}
                                />
                                {line}
                              </li>
                            ))}
                          </ul>

                          <div className="md:col-span-2">
                            <p className="eyebrow mb-3">Stack</p>
                            <div className="flex flex-wrap gap-1.5">
                              {role.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="mono border px-2 py-1 text-[0.6rem] text-bone-2"
                                  style={{ borderColor: 'var(--line)' }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            {role.href ? (
                              <a
                                href={role.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 text-xs text-brass hover:underline"
                              >
                                Visit {role.company}
                                <ArrowDiagonal size={12} />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
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
