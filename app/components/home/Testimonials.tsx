'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { reviews, reviewSummary } from '@/app/data/reviews';
import { ArrowLong } from '@/app/components/marks';
import Section from '@/app/components/core/Section';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/motion/Reveal';
import ReviewCard from '@/app/components/reviews/ReviewCard';

/**
 * The homepage strip is a sample, not the archive. The full set lives on
 * /reviews, which keeps this page lighter and stops the same quotes being
 * indexed twice.
 */
const FEATURED = 9;

/** One, two or three columns depending on the viewport. */
function useColumnCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCount(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const columnCount = useColumnCount();

  /**
   * Reviews vary from one line to a full paragraph, so a round robin split
   * leaves one column hanging far below the others. Each card is measured by
   * its clamped comment length and dropped into whichever column is currently
   * shortest, which balances the grid without a masonry library.
   */
  const columns = useMemo(() => {
    const cols: (typeof reviews)[number][][] = Array.from({ length: columnCount }, () => []);
    const heights = new Array(columnCount).fill(0);

    reviews.slice(0, FEATURED).forEach((review) => {
      const lines = Math.min(7, Math.ceil(review.comment.length / 46));
      const weight = 150 + lines * 24;
      const shortest = heights.indexOf(Math.min(...heights));
      cols[shortest].push(review);
      heights[shortest] += weight;
    });

    return cols;
  }, [columnCount]);

  // Columns drift at slightly different rates as the block passes, which keeps
  // a wall of quotes from reading as one static slab.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const driftA = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const driftB = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const driftC = useTransform(scrollYProgress, [0, 1], [52, -52]);
  const drifts = [driftA, driftB, driftC];

  return (
    <Section id="reviews">
      <div>
        <SectionHeader
          label="Client words"
          title="Read the reviews, not the pitch."
          subtitle="Pulled from Fiverr, newest first, nothing rewritten."
        />

        <Reveal
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4"
          style={{ borderColor: 'var(--line)', background: 'var(--line)' }}
        >
          {[
            { value: reviewSummary.average.toFixed(1), label: 'Average rating' },
            { value: String(reviewSummary.total), label: 'Reviews on Fiverr' },
            { value: String(reviewSummary.countries), label: 'Client countries' },
            { value: `${reviewSummary.repeatShare}%`, label: 'Clients who came back' },
          ].map((item) => (
            <div key={item.label} className="p-5 sm:p-6 md:p-8" style={{ background: 'var(--surface-1)' }}>
              <p className="text-[clamp(1.4rem,3.4vw,2.7rem)] text-primary">{item.value}</p>
              <p className="label mt-2.5">{item.label}</p>
            </div>
          ))}
        </Reveal>

        <div
          ref={ref}
          className="mt-8 grid gap-4 sm:gap-5"
          style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
        >
          {columns.map((column, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-5"
              style={columnCount === 3 ? { y: drifts[i] } : undefined}
            >
              {column.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link
            href="/reviews"
            data-cursor="Read all reviews"
            className="group inline-flex items-center gap-2 rounded-full border py-1.5 pl-6 pr-1.5 text-sm transition-all duration-300 hover:gap-3"
            style={{ borderColor: 'var(--line-2)' }}
          >
            Read all {reviewSummary.total} reviews
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary transition-transform duration-300 group-hover:scale-110">
              <ArrowLong size={15} className="text-black" />
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
