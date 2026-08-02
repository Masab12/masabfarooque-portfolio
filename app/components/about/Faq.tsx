'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqs } from '@/app/data/timeline';
import { PlusMark } from '@/app/components/marks';
import Reveal from '@/app/components/motion/Reveal';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={faq.question} delay={i * 0.04} y={16}>
            <div className="border-t" style={{ borderColor: isOpen ? 'var(--line-2)' : 'var(--line)' }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="flex gap-5">
                  <span className="mt-1 text-[0.65rem] text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[clamp(1.05rem,1.9vw,1.45rem)] transition-colors duration-400"
                    style={{ color: isOpen ? 'var(--cream)' : 'var(--cream)' }}
                  >
                    {faq.question}
                  </span>
                </span>
                <span
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-500"
                  style={{
                    borderColor: isOpen ? 'var(--line-2)' : 'var(--line-2)',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    color: isOpen ? 'var(--cream)' : 'var(--gray-400)',
                  }}
                >
                  <PlusMark size={13} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-7 pl-[3.1rem] text-sm leading-relaxed text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
      <div className="rule" />
    </div>
  );
}
