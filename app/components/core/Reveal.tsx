'use client';

import { useEffect, useRef, ElementType } from 'react';
import { initGsap, prefersReducedMotion } from '@/app/lib/motion';

type RevealProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds of delay before this element starts. */
  delay?: number;
  /** Vertical travel in pixels. */
  y?: number;
  /** Horizontal travel in pixels. */
  x?: number;
  /** Stagger direct children instead of animating the wrapper. */
  stagger?: number;
  /** Where in the viewport the reveal fires. */
  start?: string;
  style?: React.CSSProperties;
};

/**
 * The single entry animation used across the site. Everything rises a short
 * distance and fades, on the same curve, so the whole page feels like one
 * piece of choreography rather than a pile of separate effects.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  y = 26,
  x = 0,
  stagger,
  start = 'top 88%',
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = '1';
      return;
    }

    const { gsap } = initGsap();
    const targets = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1.05,
          delay,
          ease: 'power3.out',
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, x, stagger, start]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: stagger ? 1 : 0, ...style }}>
      {children}
    </Tag>
  );
}
