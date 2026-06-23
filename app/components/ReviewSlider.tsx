'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserAstronaut, FaUserNinja, FaUserTie, FaUserGraduate, FaUserSecret,
  FaUserMd, FaUserCog, FaUserAlt, FaUserCheck, FaUserEdit, FaQuoteLeft,
} from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { reviews as allReviews } from '../data/reviews';

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

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// Prefer reviews that have a real Fiverr photo (stable sort keeps newest-first within each group)
const featured = [...allReviews].sort((a, b) => Number(!!b.avatar) - Number(!!a.avatar));

export default function ReviewSlider({ count = 16, interval = 5500 }: { count?: number; interval?: number }) {
  const items = featured.slice(0, count);
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  const go = (next: number, d: number) => {
    const len = items.length;
    setState([(next + len) % len, d]);
    setImgOk(true);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setState(([i]) => [(i + 1) % items.length, 1]), interval);
    return () => clearInterval(t);
  }, [paused, items.length, interval]);

  const r = items[index];
  const h = hash(r.id || r.name);
  const Icon = ICONS[h % ICONS.length];
  const color = COLORS[(h >> 4) % COLORS.length];
  const showImg = r.avatar && imgOk;

  return (
    <div
      className="relative max-w-2xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <FaQuoteLeft
          className="absolute -top-3 left-5 w-8 h-8 opacity-15 z-0"
          style={{ color: 'var(--primary)' }}
        />

        <div className="matte-block p-6 sm:p-9 min-h-[300px] sm:min-h-[280px] flex items-center overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={r.id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-mustard)">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="text-base sm:text-lg leading-relaxed mb-6 line-clamp-6" style={{ color: 'var(--text-2)' }}>
                {r.comment}
              </p>

              <div className="flex items-center gap-3">
                {showImg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.avatar}
                    alt={r.name}
                    width={48}
                    height={48}
                    loading="lazy"
                    onError={() => setImgOk(false)}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    style={{ border: '1px solid var(--border-base)' }}
                  />
                ) : (
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: color, border: '1px solid var(--border-base)' }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-semibold truncate" style={{ color: 'var(--text-1)' }}>{r.name}</p>
                  <p className="text-sm text-text-muted truncate">
                    {flagEmoji(r.countryCode)} {r.country || 'Worldwide'}
                    {r.repeat && <span style={{ color: 'var(--primary)' }}> · repeat client</span>}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(index - 1, -1)}
          aria-label="Previous review"
          className="absolute top-1/2 -left-3 sm:-left-5 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-1)' }}
        >
          <HiChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(index + 1, 1)}
          aria-label="Next review"
          className="absolute top-1/2 -right-3 sm:-right-5 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-1)' }}
        >
          <HiChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > index ? 1 : -1)}
            aria-label={`Go to review ${i + 1}`}
            className="rounded-full transition-all"
            style={{
              width: i === index ? 22 : 8,
              height: 8,
              background: i === index ? 'var(--primary)' : 'var(--border-base)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
