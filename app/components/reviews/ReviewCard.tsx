'use client';

import { useState } from 'react';
import { RatingMark, Quote } from '@/app/components/marks';
import { formatReviewDate } from '@/app/lib/reviewDate';
import type { Review } from '@/app/data/reviews';

/**
 * One client review. Shared by the homepage strip and the reviews page so
 * the two can never drift apart, and so the full text lives in exactly one
 * component regardless of how many are shown.
 */

function initials(name: string) {
  const cleaned = name.replace(/[^a-zA-Z]/g, '');
  return (cleaned.slice(0, 2) || 'MF').toUpperCase();
}

function Avatar({ review }: { review: Review }) {
  const [failed, setFailed] = useState(false);

  if (review.avatar && !failed) {
    return (
      // Served by Fiverr's own CDN, so it loads directly rather than through
      // the image optimiser.
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

export default function ReviewCard({
  review,
  clamp = true,
}: {
  review: Review;
  /** The homepage clamps long quotes. The reviews page shows them in full. */
  clamp?: boolean;
}) {
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

      <blockquote className="text-[0.95rem] leading-relaxed text-gray-400">
        <span
          style={
            clamp
              ? {
                  display: '-webkit-box',
                  WebkitLineClamp: 7,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }
              : undefined
          }
        >
          {review.comment}
        </span>
      </blockquote>

      <figcaption
        className="mt-6 flex items-center gap-3 border-t pt-5"
        style={{ borderColor: 'var(--line)' }}
      >
        <Avatar review={review} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.95rem] text-cream">{review.name}</p>
          <p className="mt-1 text-[0.72rem] text-gray-500">
            {review.country || 'Fiverr client'}
            <span className="mx-1.5 opacity-40">/</span>
            <time dateTime={review.date.split('T')[0]}>{formatReviewDate(review.date)}</time>
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span
            role="img"
            aria-label={`Rated ${review.rating} out of 5`}
            className="flex gap-0.5 text-primary"
          >
            {Array.from({ length: review.rating }).map((_, i) => (
              <RatingMark key={i} size={9} />
            ))}
          </span>
          {review.orders > 1 ? (
            <span className="text-[0.68rem] text-primary">{review.orders} orders</span>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}
