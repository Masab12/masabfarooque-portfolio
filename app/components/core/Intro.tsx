'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Monogram } from '@/app/components/marks';
import { site } from '@/app/data/site';
import { prefersReducedMotion } from '@/app/lib/motion';

const SEEN_KEY = 'mf-intro-seen';

/**
 * A short curtain on the first visit of a session. It lifts on a brass rule,
 * gives the fonts a moment to land, and never appears again while the tab is
 * open, because nobody wants to watch the same intro twice.
 */
export default function Intro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Storage can be blocked. The intro simply plays every time then.
    }

    setShow(true);
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, 1500);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center"
          style={{ background: 'var(--ink)' }}
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Monogram size={56} className="text-brass" />
          </motion.div>

          <motion.div
            className="mt-8 h-px w-40 origin-left"
            style={{ background: 'var(--brass)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          />

          <motion.p
            className="eyebrow mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {site.name}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
