'use client';

import { useState } from 'react';
import {
  FaUserAstronaut, FaUserNinja, FaUserTie, FaUserGraduate, FaUserSecret,
  FaUserMd, FaUserCog, FaUserAlt, FaUserCheck, FaUserEdit,
} from 'react-icons/fa';
import type { Review } from '../data/reviews';

const ICONS = [
  FaUserAstronaut, FaUserNinja, FaUserTie, FaUserGraduate, FaUserSecret,
  FaUserMd, FaUserCog, FaUserAlt, FaUserCheck, FaUserEdit,
];
const COLORS = ['var(--primary)', 'var(--secondary)', 'var(--tertiary)', 'var(--accent-mustard)'];

function flagEmoji(code: string) {
  if (!code || code.length !== 2) return '';
  return code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export default function ReviewCard({ review, className = '' }: { review: Review; className?: string }) {
  const [imgOk, setImgOk] = useState(true);
  const h = hash(review.id || review.name);
  const Icon = ICONS[h % ICONS.length];
  const color = COLORS[(h >> 4) % COLORS.length];
  const showImg = review.avatar && imgOk;

  return (
    <div className={`matte-block p-5 flex flex-col gap-3 h-full min-h-[230px] ${className}`}>
      <div className="flex items-center gap-3">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.avatar}
            alt={review.name}
            width={44}
            height={44}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="w-11 h-11 rounded-full object-cover flex-shrink-0"
            style={{ border: '1px solid var(--border-base)' }}
          />
        ) : (
          <span
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: color, border: '1px solid var(--border-base)' }}
          >
            <Icon className="w-5 h-5 text-white" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-1)' }}>{review.name}</p>
          <p className="text-xs text-text-muted truncate">
            {flagEmoji(review.countryCode)} {review.country || 'Worldwide'}
          </p>
        </div>
        {review.repeat && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
            style={{ background: 'var(--accent-cyan-subtle)', color: 'var(--primary)', border: '1px solid var(--accent-cyan-border)' }}
          >
            Repeat
          </span>
        )}
      </div>

      <div className="flex items-center gap-0.5" aria-label="5 out of 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-mustard)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      <p className="text-sm text-text-secondary leading-relaxed line-clamp-5 break-words flex-1">
        {review.comment}
      </p>

      {review.date && (
        <p className="text-[11px] text-text-muted font-mono pt-1">{review.date}</p>
      )}
    </div>
  );
}
