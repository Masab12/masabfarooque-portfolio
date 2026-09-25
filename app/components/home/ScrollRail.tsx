'use client';

import { useEffect, useState } from 'react';

type Stop = { id: string; label: string };

/**
 * A pipeline down the right edge of the homepage, one station per band. The
 * packet on it follows the reader: between two stations it sits in
 * proportion to how far the reader is between those two bands. Stations are
 * links, so the rail is also a table of contents. Wide screens only; on
 * anything narrower it would sit on top of the content.
 */
export default function ScrollRail({ stops }: { stops: Stop[] }) {
  const [pos, setPos] = useState(0);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const anchor = window.scrollY + window.innerHeight * 0.4;
      const tops = stops.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      let i = 0;
      while (i < tops.length - 1 && anchor >= tops[i + 1]) i += 1;
      const span = (tops[i + 1] ?? document.documentElement.scrollHeight) - tops[i];
      const within = Math.min(1, Math.max(0, (anchor - tops[i]) / Math.max(1, span)));
      setActive(i);
      setPos((i + within) / Math.max(1, stops.length - 1));
      setShown(window.scrollY > window.innerHeight * 0.5);
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
  }, [stops]);

  return (
    <nav
      aria-label="On this page"
      className={`no-print fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 xl:block 2xl:right-5 ${
        shown ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="group relative flex h-[min(22rem,52svh)] flex-col justify-between py-1">
        <span aria-hidden className="absolute bottom-0 right-[5px] top-0 w-[2px] rounded-full bg-ink/10" />
        <span
          aria-hidden
          className="absolute right-[5px] top-0 w-[2px] origin-top rounded-full bg-sage"
          style={{ height: '100%', transform: `scaleY(${Math.min(1, pos)})` }}
        />
        <span
          aria-hidden
          className="absolute right-[1px] h-[10px] w-[10px] border bg-paper transition-[top] duration-150"
          style={{ top: `calc(${Math.min(1, pos) * 100}% - 5px)`, borderColor: 'var(--clay)' }}
        />
        {stops.map((stop, i) => (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            aria-current={i === active ? 'location' : undefined}
            className="relative flex min-h-[1.75rem] items-center justify-end gap-3"
          >
            <span
              className={`mono whitespace-nowrap text-[0.6875rem] uppercase transition-all duration-300 ${
                i === active ? 'text-ink opacity-100' : 'text-ink-3 opacity-0 group-hover:opacity-100'
              }`}
            >
              {stop.label}
            </span>
            <span
              aria-hidden
              className={`relative z-10 h-3 w-3 rounded-full border-2 transition-colors duration-300 ${
                i <= active ? 'border-sage bg-sage' : 'border-ink/30 bg-paper'
              }`}
            />
          </a>
        ))}
      </div>
    </nav>
  );
}
