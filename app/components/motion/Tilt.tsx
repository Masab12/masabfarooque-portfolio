'use client';

import { useEffect, useRef } from 'react';

/**
 * Leans a card toward the pointer, a few degrees at most, with a soft light
 * following the cursor across its face. Writes two CSS variables per frame
 * and nothing else, so React never re-renders while it moves. Mouse and
 * trackpad only; on touch, and with reduced motion, the card stays flat.
 */
export default function Tilt({
  children,
  className = '',
  max = 5,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let raf = 0;
    let px = 0.5;
    let py = 0.5;
    const apply = () => {
      raf = 0;
      el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`);
      el.style.setProperty('--gx', `${px * 100}%`);
      el.style.setProperty('--gy', `${py * 100}%`);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width;
      py = (e.clientY - r.top) / r.height;
      el.dataset.tilting = 'true';
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      px = 0.5;
      py = 0.5;
      delete el.dataset.tilting;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
    </div>
  );
}
