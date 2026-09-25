'use client';

import { useEffect, useState } from 'react';

/**
 * Reading progress drawn as a pipe under the masthead, with a packet at the
 * reader's position. It measures the article element itself, so the footer
 * and the related posts do not count as reading. It fades in once the reader
 * is past the heading, since at the very top there is nothing to show.
 */
export default function ReadingPipe({ targetId }: { targetId: string }) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, -rect.top / Math.max(1, total))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden
      className={`no-print pointer-events-none fixed inset-x-0 z-40 h-[3px] transition-opacity duration-500 ${p > 0.01 ? 'opacity-100' : 'opacity-0'}`}
      style={{ top: 'var(--nav-h)' }}
    >
      <div className="absolute inset-0 bg-ink/10" />
      <div className="absolute inset-0 origin-left bg-sage" style={{ transform: `scaleX(${p})` }} />
      <div
        className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 border bg-paper"
        style={{ left: `calc(${p * 100}% - 5px)`, borderColor: 'var(--clay)' }}
      />
    </div>
  );
}
