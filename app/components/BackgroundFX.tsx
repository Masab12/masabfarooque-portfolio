'use client';

/**
 * Site-wide fixed background: animated dot/line grid + a few slow-drifting
 * code glyphs. Subtle, non-distracting, sits behind all content (-z-10).
 * Pure CSS animation (no rAF) for performance.
 */

const GLYPHS = [
  { c: '</>', x: '8%', y: '18%', size: 34, dur: 17, delay: 0 },
  { c: '{ }', x: '82%', y: '12%', size: 30, dur: 21, delay: 2 },
  { c: '=>', x: '15%', y: '72%', size: 28, dur: 19, delay: 1 },
  { c: '01', x: '90%', y: '64%', size: 26, dur: 23, delay: 3 },
  { c: '( )', x: '46%', y: '40%', size: 24, dur: 25, delay: 1.5 },
  { c: '#!', x: '68%', y: '82%', size: 26, dur: 20, delay: 0.5 },
  { c: '&&', x: '32%', y: '28%', size: 22, dur: 24, delay: 2.5 },
  { c: '</>', x: '58%', y: '8%', size: 20, dur: 22, delay: 4 },
];

export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-fx-grid" />
      <div className="bg-fx-glow" />
      {GLYPHS.map((g, i) => (
        <span
          key={i}
          className="bg-fx-glyph"
          style={{
            left: g.x,
            top: g.y,
            fontSize: g.size,
            animationDuration: `${g.dur}s`,
            animationDelay: `${g.delay}s`,
          }}
        >
          {g.c}
        </span>
      ))}
    </div>
  );
}
