'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { reviews, reviewSummary, type Review } from '@/app/data/reviews';
import { RatingMark, Quote, ArrowDiagonal, GlyphFiverr } from '@/app/components/marks';
import { initGsap, prefersReducedMotion } from '@/app/lib/motion';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/core/Reveal';

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
      className="mono flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[0.7rem]"
      style={{
        border: '1px solid var(--brass-edge)',
        background: 'var(--brass-veil)',
        color: 'var(--brass)',
      }}
    >
      {initials(review.name)}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure
      className="group relative overflow-hidden border p-6 transition-colors duration-500 hover:border-brass"
      style={{
        borderColor: 'var(--line)',
        background: 'var(--ink-1)',
        borderRadius: 'clamp(10px, 1.2vw, 18px)',
      }}
    >
      <Quote size={26} className="mb-4 text-brass opacity-30" />

      <blockquote className="text-[0.9rem] leading-relaxed text-bone-2">
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
          <p className="truncate text-sm text-bone">{review.name}</p>
          <p className="mono mt-1 text-[0.6rem] text-bone-3">
            {review.country || 'Fiverr client'}
            <span className="mx-1.5 opacity-40">/</span>
            {formatDate(review.date)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="flex gap-0.5 text-brass" aria-label={`${review.rating} out of 5`}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <RatingMark key={i} size={8} />
            ))}
          </span>
          {review.orders > 1 ? (
            <span className="mono text-[0.55rem] text-brass">{review.orders} orders</span>
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

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (window.innerWidth < 1024) return;

    const { gsap } = initGsap();

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-column]').forEach((column, i) => {
        const drift = [44, -26, 62][i] ?? 0;
        gsap.fromTo(
          column,
          { y: drift },
          {
            y: -drift,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32" id="reviews">
      <div className="shell">
        <SectionHeader
          index="05"
          label="Client words"
          title="Twenty five clients, unedited"
          note="Pulled straight from the Fiverr profile, newest first. Nothing rewritten, nothing cherry picked beyond keeping the software era."
        />

        <Reveal
          className="mt-12 grid gap-px overflow-hidden border md:grid-cols-4"
          style={{ borderColor: 'var(--line)', background: 'var(--line)' }}
        >
          {[
            { value: reviewSummary.average.toFixed(2), label: 'Average rating' },
            { value: String(reviewSummary.total), label: 'Reviews on Fiverr' },
            { value: String(reviewSummary.countries), label: 'Client countries' },
            { value: `${reviewSummary.repeatShare}%`, label: 'Clients who came back' },
          ].map((item) => (
            <div key={item.label} className="p-6 md:p-8" style={{ background: 'var(--ink-1)' }}>
              <p className="display-tight text-[clamp(1.8rem,3.4vw,2.7rem)] text-brass">
                {item.value}
              </p>
              <p className="eyebrow mt-2.5">{item.label}</p>
            </div>
          ))}
        </Reveal>

        <div
          ref={ref}
          className="mt-10 grid gap-5"
          style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
        >
          {columns.map((column, i) => (
            <div key={i} data-column className="flex flex-col gap-5">
              {column.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ))}
        </div>

        <Reveal
          className="mt-12 flex flex-col items-start justify-between gap-5 border-t pt-7 sm:flex-row sm:items-center"
          style={{ borderColor: 'var(--line)' }}
        >
          <p className="max-w-xl text-xs leading-relaxed text-bone-3">
            Reviews and profile photos are imported from my Fiverr seller profile and shown as
            written by the client. Fiverr is a trademark of its owner and this site is not
            affiliated with or endorsed by Fiverr.
          </p>
          <a
            href={reviewSummary.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 border px-5 py-3 text-sm transition-colors duration-500 hover:border-brass"
            style={{ borderColor: 'var(--line-2)' }}
          >
            <GlyphFiverr size={16} className="text-brass" />
            Verify on Fiverr
            <ArrowDiagonal
              size={13}
              className="text-brass transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
