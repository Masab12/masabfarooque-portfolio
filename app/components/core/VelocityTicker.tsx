'use client';

import { useEffect, useRef } from 'react';
import { Spark } from '@/app/components/marks';
import { lerp, prefersReducedMotion } from '@/app/lib/motion';

type Props = {
  items: readonly string[];
  /** Baseline pixels per frame. Negative runs the other way. */
  speed?: number;
  className?: string;
};

/**
 * A marquee that listens to scroll. It always drifts at a base speed, but
 * scrolling adds to it and reverses it, so the strip reacts to how fast the
 * page is being read instead of looping at a constant rate.
 */
export default function VelocityTicker({ items, speed = 0.55, className = '' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (prefersReducedMotion()) {
      track.style.transform = 'translate3d(0,0,0)';
      return;
    }

    let offset = 0;
    let velocity = 0;
    let targetVelocity = 0;
    let lastScroll = window.scrollY;
    let frame = 0;
    let half = track.scrollWidth / 2;

    const onResize = () => {
      half = track.scrollWidth / 2;
    };

    const onScroll = () => {
      const current = window.scrollY;
      targetVelocity = (current - lastScroll) * 0.42;
      lastScroll = current;
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      velocity = lerp(velocity, targetVelocity, 0.1);
      targetVelocity *= 0.9;

      offset -= speed + velocity;
      if (half > 0) {
        if (offset <= -half) offset += half;
        if (offset > 0) offset -= half;
      }
      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [speed]);

  const sequence = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden border-y py-6 md:py-8 ${className}`}
      style={{ borderColor: 'var(--line)' }}
      aria-hidden
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {sequence.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
            <span
              className="display-tight px-6 text-[clamp(1.4rem,3.4vw,2.6rem)] md:px-9"
              style={{
                color: i % 2 === 0 ? 'var(--bone)' : 'transparent',
                WebkitTextStroke: i % 2 === 0 ? 'none' : '1px var(--brass-edge)',
                fontStyle: i % 3 === 1 ? 'italic' : 'normal',
              }}
            >
              {item}
            </span>
            <Spark size={11} className="shrink-0 text-brass opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
}
