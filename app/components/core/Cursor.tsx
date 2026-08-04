'use client';

import { useEffect, useRef, useState } from 'react';
import { lerp, prefersReducedMotion } from '@/app/lib/motion';

/**
 * A single ring that trails the pointer, drawn in difference blend so it reads
 * as an inversion of whatever is behind it rather than as a coloured dot. It
 * grows over anything interactive and disappears the moment the pointer leaves
 * the window. No labels, no second element, no novelty.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'hidden' | 'idle' | 'active'>('hidden');

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.documentElement.classList.add('hide-native-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;
    let seen = false;

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      const interactive = (event.target as HTMLElement | null)?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor]',
      );

      if (!seen) {
        seen = true;
        ringX = mouseX;
        ringY = mouseY;
      }
      setState(interactive ? 'active' : 'idle');
    };

    const onLeave = () => setState('hidden');
    const onDown = () => setState('active');

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(
          2,
        )}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('hide-native-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  const size = state === 'active' ? 46 : 22;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full"
        style={{
          width: size,
          height: size,
          border: '1px solid #E1E0CC',
          backgroundColor: state === 'active' ? 'rgba(225, 224, 204, 0.12)' : 'transparent',
          mixBlendMode: 'difference',
          opacity: state === 'hidden' ? 0 : 1,
          transition:
            'width 260ms cubic-bezier(0.16,1,0.3,1), height 260ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease, background-color 200ms ease',
        }}
      />
    </div>
  );
}
