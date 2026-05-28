'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { faqs } from './faqData';

export { faqs };

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-medium leading-snug" style={{ color: '#f8f9fa' }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0 mt-0.5"
        >
          <HiChevronDown className="w-5 h-5 text-text-muted" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm sm:text-base text-text-secondary leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="relative w-full bg-void-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#f8f9fa' }}>
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, rgb(0,240,255), rgb(139,92,246))' }} />
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            Common questions about Masab, his background, how he works, and what he builds.
          </p>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
