'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { roles } from '@/app/data/experience';
import { ArrowDiagonal, PlusMark } from '@/app/components/marks';
import Section from '@/app/components/core/Section';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/motion/Reveal';

export default function ExperienceIndex() {
  const [open, setOpen] = useState<string | null>(roles[0].id);

  return (
    <Section id="experience">
      <div>
        <SectionHeader label="Experience" title="Companies I have worked with." />

        <div className="mt-10 md:mt-14">
          {roles.map((role, i) => {
            const isOpen = open === role.id;
            return (
              <Reveal key={role.id} delay={i * 0.05} y={18}>
                <div
                  className="border-t"
                  style={{ borderColor: isOpen ? 'var(--line-2)' : 'var(--line)' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : role.id)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-4 py-6 text-left md:grid md:grid-cols-12 md:items-center md:gap-6 md:py-8"
                  >
                    {/* Phone: name, role and dates stack. Desktop: one row. */}
                    <span className="min-w-0 flex-1 md:col-span-5">
                      <span className="block truncate text-[0.95rem] text-cream md:text-base">
                        {role.company}
                      </span>
                      <span className="mt-1 block text-[0.7rem] text-gray-500 md:hidden">
                        {role.period}
                      </span>
                    </span>

                    <span className="hidden min-w-0 md:col-span-4 md:block">
                      <span className="block truncate text-[0.95rem] text-gray-400">
                        {role.title}
                      </span>
                      <span className="mt-1 block text-[0.65rem] text-gray-500">{role.type}</span>
                    </span>

                    <span className="flex shrink-0 items-center gap-4 md:col-span-3 md:justify-end">
                      <span className="hidden text-[0.7rem] text-gray-500 md:inline">
                        {role.period}
                      </span>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500"
                        style={{
                          borderColor: 'var(--line-2)',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          color: isOpen ? 'var(--cream)' : 'var(--gray-400)',
                        }}
                      >
                        <PlusMark size={14} />
                      </span>
                    </span>
                  </button>

                  {/* The role title only fits beside the company from md up. */}
                  <p className="-mt-3 mb-5 text-[0.8rem] text-gray-400 md:hidden">
                    {role.title}
                    <span className="mx-2 opacity-40">/</span>
                    {role.type}
                  </p>

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
                        <div className="grid gap-7 pb-9 md:grid-cols-12 md:gap-8">
                          <p className="text-sm leading-relaxed text-gray-400 md:col-span-5 md:text-[0.95rem]">
                            {role.summary}
                          </p>

                          <ul className="space-y-3 md:col-span-4">
                            {role.highlights.map((line) => (
                              <li key={line} className="flex gap-3 text-sm leading-relaxed text-gray-400">
                                <span
                                  className="mt-[0.55rem] h-px w-4 shrink-0"
                                  style={{ background: 'var(--cream)' }}
                                />
                                {line}
                              </li>
                            ))}
                          </ul>

                          <div className="md:col-span-3">
                            <p className="label mb-3">Stack</p>
                            <div className="flex flex-wrap gap-1.5">
                              {role.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="border px-2 py-1 text-[0.6rem] text-gray-400"
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
                                className="mt-4 inline-flex items-center gap-2 text-xs text-primary hover:underline"
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
    </Section>
  );
}
