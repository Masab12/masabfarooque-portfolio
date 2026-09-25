'use client';

import { useEffect, useRef, useState } from 'react';
import SystemScene from '@/app/components/scene/SystemScene';
import { wordpressSystem } from '@/app/data/systems';

/**
 * WordPress taken apart by scrolling.
 *
 * The track is taller than the screen and the stage stays pinned inside it.
 * How far the reader has scrolled through the track sets the blend: at the
 * top every request climbs the whole tower, by the bottom the theme has gone,
 * Next.js answers from files, and WordPress stands back for editors only.
 * Before and After set either end directly for anyone who would rather
 * click; the choice holds until the reader scrolls on.
 */

const TOWER = 5;

export default function DecoupleTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const pinAt = useRef(0);
  const progress = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      progress.current = p;
      // Hold each end for a stretch so both states can be looked at properly
      setScrolled(Math.min(1, Math.max(0, (p - 0.16) / 0.58)));
      setPinned((current) => (current !== null && Math.abs(p - pinAt.current) > 0.1 ? null : current));
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
  }, []);

  const pin = (value: number) => {
    pinAt.current = progress.current;
    setPinned(value);
  };

  const t = pinned ?? scrolled;
  const decoupled = t >= 0.5;

  return (
    <div ref={trackRef} className="relative h-[210svh]">
      <div
        className="sticky top-[calc(var(--nav-h)+0.75rem)] flex h-[calc(100svh-var(--nav-h)-6.75rem)] max-h-[54rem] flex-col border bg-sheet/70 lg:h-[calc(100svh-var(--nav-h)-1.5rem)]"
        style={{ borderColor: 'var(--line-2)' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5" style={{ borderColor: 'var(--line)' }}>
          <p className="label">
            <span className="text-ink">Fig. 4</span> · {decoupled ? 'After the move' : 'WordPress as it runs today'}
          </p>
          <div className="flex gap-2" role="group" aria-label="Show a state">
            {[
              { v: 0, label: 'Before', on: !decoupled },
              { v: 1, label: 'After', on: decoupled },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => pin(b.v)}
                aria-pressed={b.on}
                className={`mono h-11 rounded-full border px-4 text-[0.7rem] uppercase transition-colors ${
                  b.on ? 'border-ink bg-ink text-paper' : 'border-hair2 text-ink-2 hover:text-ink'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <SystemScene
          graph={wordpressSystem}
          blend={t}
          label="A WordPress install drawn as a tower of five layers, database, PHP, core, plugins and theme, which separates into a Next.js front end and a headless WordPress as you scroll."
          className="min-h-0 flex-1"
          fill={0.92}
        />

        <div className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 border-t px-4 py-3.5 sm:px-5" style={{ borderColor: 'var(--line)' }} aria-live="polite">
          <p className="w-[1.6ch] text-[clamp(2rem,1.6rem+1.4vw,2.8rem)] font-extrabold leading-none tracking-[-0.04em] text-ink tabular-nums">
            {decoupled ? 1 : TOWER}
          </p>
          <p className="text-[0.9rem] leading-snug text-ink-2">
            {decoupled
              ? 'layer answers each visitor. WordPress now hears from editors, and from the build when something is published.'
              : 'layers climbed by every visitor request: the database, PHP, WordPress core, each active plugin, then the theme.'}
          </p>
          <div className="col-span-2 h-1 w-full overflow-hidden rounded-full bg-ink/10" aria-hidden>
            <div className="h-full origin-left rounded-full bg-sage transition-transform duration-300" style={{ transform: `scaleX(${Math.max(0.02, t)})` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
