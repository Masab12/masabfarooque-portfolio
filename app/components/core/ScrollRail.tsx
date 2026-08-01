'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A thin brass rail down the right edge that fills as the page is read, with
 * the percentage set in mono beside it. Replaces the usual top progress bar,
 * which every site already has.
 */
export default function ScrollRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${ratio})`;
      setPercent(Math.round(ratio * 100));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      <span className="mono text-[0.6rem] text-bone-3">
        {String(percent).padStart(2, '0')}
      </span>
      <div className="relative h-32 w-px" style={{ background: 'var(--line-2)' }}>
        <div
          ref={fillRef}
          className="absolute inset-0 origin-top"
          style={{ background: 'var(--brass)', transform: 'scaleY(0)' }}
        />
      </div>
      <span className="mono text-[0.6rem] text-bone-3">100</span>
    </div>
  );
}
