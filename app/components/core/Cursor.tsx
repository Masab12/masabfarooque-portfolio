'use client';

import { useEffect, useRef, useState } from 'react';
import { lerp, prefersReducedMotion } from '@/app/lib/motion';

/**
 * A two part cursor. A hard cream dot that tracks the pointer exactly and a
 * thin ring that trails behind it. Any element carrying data-cursor swaps the
 * ring for a filled disc with that label written inside it.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.documentElement.classList.add('hide-native-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!visible) setVisible(true);

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor], a, button, input, textarea, select',
      );
      if (target) {
        setActive(true);
        setLabel(target.dataset.cursor ?? null);
      } else {
        setActive(false);
        setLabel(null);
      }
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.14);
      ringY = lerp(ringY, mouseY, 0.14);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('hide-native-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [visible]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-[5px] w-[5px] rounded-full bg-[var(--cream)]"
        style={{ opacity: visible && !label ? 1 : 0, transition: 'opacity 200ms ease' }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full"
        style={{
          width: label ? 84 : active ? 44 : 30,
          height: label ? 84 : active ? 44 : 30,
          border: `1px solid ${label ? 'transparent' : 'var(--line-2)'}`,
          background: label ? 'var(--cream)' : 'transparent',
          color: 'var(--bg)',
          opacity: visible ? 1 : 0,
          transition:
            'width 340ms cubic-bezier(0.16,1,0.3,1), height 340ms cubic-bezier(0.16,1,0.3,1), background 240ms ease, border-color 240ms ease, opacity 220ms ease',
        }}
      >
        {label ? (
          <span className="text-center text-[9px] uppercase leading-tight tracking-[0.16em]">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
