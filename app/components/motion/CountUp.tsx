'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A number that counts up once, the first time it scrolls into view. The
 * final value is in the server HTML, so a crawler and a visitor without
 * JavaScript read the real figure; the count only runs once the page is
 * interactive, and not at all with reduced motion requested.
 */
export default function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.4,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / (duration * 1000));
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(value * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      setShown(0);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        run();
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const n = shown ?? value;
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
