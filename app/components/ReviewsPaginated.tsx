'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewCard from './ReviewCard';
import { reviews, totalReviews } from '../data/reviews';

const PER_PAGE = 9;

export default function ReviewsPaginated() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(reviews.length / PER_PAGE);
  const slice = reviews.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const go = (p: number) => {
    setPage(Math.max(0, Math.min(pageCount - 1, p)));
    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="reviews"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t scroll-mt-24"
      style={{ borderColor: 'var(--border-base)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3 font-mono" style={{ color: 'var(--primary)' }}>
            Verified Fiverr Reviews
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
            What clients say
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            {totalReviews} reviews from clients across {''}
            <span style={{ color: 'var(--primary)' }} className="font-semibold">15+ countries</span> · 5.0 average rating
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {slice.map((r) => (
              <motion.div
                key={r.id}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.97 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <ReviewCard review={r} className="h-full matte-hover" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pager */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => go(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-2)' }}
          >
            ← Prev
          </button>

          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-current={i === page}
              className="w-9 h-9 rounded-md text-sm font-semibold transition-all"
              style={
                i === page
                  ? { background: 'var(--primary)', color: '#fff', border: '1px solid var(--primary-deep)' }
                  : { background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-3)' }
              }
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => go(page + 1)}
            disabled={page === pageCount - 1}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-2)' }}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
