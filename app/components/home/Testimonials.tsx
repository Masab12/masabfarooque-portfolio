'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { reviews, reviewSummary, type Review } from '@/app/data/reviews';
import { RatingMark, Quote, ArrowDiagonal, GlyphFiverr } from '@/app/components/marks';
import Section from '@/app/components/core/Section';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/motion/Reveal';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatDate(value: string) {
  const [y, m] = value.split('T')[0].split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

function initials(name: string) {
  const cleaned = name.replace(/[^a-zA-Z]/g, '');
  return (cleaned.slice(0, 2) || 'MF').toUpperCase();
}

function Avatar({ review }: { review: Review }) {
  const [failed, setFailed] = useState(false);

  if (review.avatar && !failed) {
    return (
      // The photo is served by Fiverr's own CDN, so it is loaded directly
      // rather than proxied through the image optimiser.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={review.avatar}
        alt={`${review.name} on Fiverr`}
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-11 w-11 shrink-0 rounded-full object-cover"
        style={{ border: '1px solid var(--line-2)' }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[0.7rem]"
      style={{
        border: '1px solid var(--line-2)',
        background: 'rgba(225,224,204,0.08)',
        color: 'var(--cream)',
      }}
    >
      {initials(review.name)}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure
      className="group relative overflow-hidden border p-6 transition-colors duration-500 hover:border-hair2"
      style={{
        borderColor: 'var(--line)',
        background: 'var(--surface-1)',
        borderRadius: 'clamp(10px, 1.2vw, 18px)',
      }}
    >
      <Quote size={26} className="mb-4 text-primary opacity-30" />

      <blockquote className="text-[0.9rem] leading-relaxed text-gray-400">
        <span
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 7,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {review.comment}
        </span>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t pt-5" style={{ borderColor: 'var(--line)' }}>
        <Avatar review={review} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-cream">{review.name}</p>
          <p className="mt-1 text-[0.6rem] text-gray-500">
            {review.country || 'Fiverr client'}
            <span className="mx-1.5 opacity-40">/</span>
            {formatDate(review.date)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="flex gap-0.5 text-primary" aria-label={`${review.rating} out of 5`}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <RatingMark key={i} size={8} />
            ))}
          </span>
          {review.orders > 1 ? (
            <span className="text-[0.55rem] text-primary">{review.orders} orders</span>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}

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
    const cols: Review[][] = Array.from({ length: columnCount }, () => []);
    const heights = new Array(columnCount).fill(0);

    reviews.forEach((review) => {
      const lines = Math.min(7, Math.ceil(review.comment.length / 46));
      const weight = 150 + lines * 24;
      const shortest = heights.indexOf(Math.min(...heights));
      cols[shortest].push(review);
      heights[shortest] += weight;
    });

    return cols;
  }, [columnCount]);

  // Columns drift at slightly different rates as the block passes, which keeps
  // a long wall of quotes from reading as one static slab.
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
          title="Twenty five clients, unedited."
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
              <p className="text-[clamp(1.4rem,3.4vw,2.7rem)] text-primary">
                {item.value}
              </p>
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

        <Reveal
          className="mt-10 flex flex-col items-start justify-between gap-5 border-t pt-7 lg:flex-row lg:items-center"
          style={{ borderColor: 'var(--line)' }}
        >
          <p className="max-w-xl text-xs leading-relaxed text-gray-500">
            Reviews and profile photos are imported from my Fiverr seller profile and shown as
            written by the client. Fiverr is a trademark of its owner and this site is not
            affiliated with or endorsed by Fiverr.
          </p>
          <a
            href={reviewSummary.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 border px-5 py-3 text-sm transition-colors duration-500 hover:border-hair2"
            style={{ borderColor: 'var(--line-2)' }}
          >
            <GlyphFiverr size={16} className="text-primary" />
            Verify on Fiverr
            <ArrowDiagonal
              size={13}
              className="text-primary transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
