'use client';

import { useEffect, useRef } from 'react';
import { lerp, prefersReducedMotion } from '@/app/lib/motion';

type MagneticProps = {
  children: React.ReactNode;
  /** How far outside the element the pull starts, in pixels. */
  radius?: number;
  /** 0 is no movement, 1 sticks to the cursor. */
  pull?: number;
  className?: string;
};

/**
 * Pulls an element toward the cursor while the cursor is inside its field.
 * Runs on its own rAF loop with easing so releases decay instead of snapping.
 */
export default function Magnetic({ children, radius = 110, pull = 0.32, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const inside =
        Math.abs(dx) < rect.width / 2 + radius && Math.abs(dy) < rect.height / 2 + radius;

      targetX = inside ? dx * pull : 0;
      targetY = inside ? dy * pull : 0;
    };

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.16);
      currentY = lerp(currentY, targetY, 0.16);
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [radius, pull]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
