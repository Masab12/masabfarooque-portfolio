'use client';

import { useId, useState } from 'react';
import { faqs } from '@/app/data/timeline';
import { PlusMark } from '@/app/components/marks';

/**
 * Questions with answers that open in place.
 *
 * Every answer is always in the HTML, open or closed, so a crawler reads all
 * of them and the FAQPage schema never describes text the page does not
 * contain. Closed answers collapse to zero height with a grid transition and
 * are marked inert, so they are skipped by the keyboard and screen readers.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="border-b" style={{ borderColor: 'var(--line)' }}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        const panel = `${base}-a${i}`;
        return (
          <div key={faq.question} className="border-t" style={{ borderColor: isOpen ? 'var(--line-3)' : 'var(--line)' }}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panel}
                className="group flex min-h-14 w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="flex gap-4 sm:gap-5">
                  <span className={`mono mt-1.5 text-[0.72rem] transition-colors duration-300 ${isOpen ? 'text-sage' : 'text-ink-3'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[clamp(1.05rem,0.95rem+0.6vw,1.4rem)] font-bold leading-snug tracking-[-0.015em] text-ink transition-colors group-hover:text-sage">
                    {faq.question}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                    isOpen ? 'rotate-45 border-ink bg-ink text-paper' : 'border-hair2 text-ink-2'
                  }`}
                >
                  <PlusMark size={14} />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              inert={!isOpen}
              className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 pl-9 text-[0.98rem] leading-relaxed text-ink-2 sm:pl-[2.9rem]">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
