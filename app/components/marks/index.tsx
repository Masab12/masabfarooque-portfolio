/**
 * Marks
 *
 * Every glyph on this site is drawn here by hand on a 24 unit grid with a
 * 1.2 stroke, round caps and a shared vocabulary of circles, chords and
 * right angles. No icon library is used anywhere in the project, so the
 * shapes stay specific to this brand instead of looking like every other
 * dashboard on the internet.
 */

type MarkProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

type LogoProps = { className?: string; style?: React.CSSProperties };

const base = (
  size: number,
  strokeWidth: number,
  className?: string,
  style?: React.CSSProperties,
) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className,
  style,
  'aria-hidden': true,
  focusable: false as const,
});

/* ── Identity ──────────────────────────────────────────────────── */

/**
 * The monogram. An M and an F sharing a single spine, cut from one
 * continuous path so it reads as a maker's stamp rather than two letters.
 */
export function Monogram({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        d="M7 38V10l10.5 15L28 10v28"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path d="M34 38V10h9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
      <path d="M34 24h7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
    </svg>
  );
}

/** A four point star used as a separator between items. */
export function Spark({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M12 0c.9 7.4 3.7 10.6 12 12-8.3 1.4-11.1 4.6-12 12-.9-7.4-3.7-10.6-12-12C8.3 10.6 11.1 7.4 12 0Z" />
    </svg>
  );
}

/** Rating mark. A cut diamond, not the usual five point star. */
export function RatingMark({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M12 1.5 22.5 12 12 22.5 1.5 12 12 1.5Zm0 5.2L6.7 12l5.3 5.3 5.3-5.3L12 6.7Z" />
    </svg>
  );
}

export function Quote({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden focusable="false">
      <path
        d="M10 6c-3.6 1.4-5.5 4-5.5 7.6 0 2.7 1.5 4.4 3.7 4.4 1.9 0 3.3-1.3 3.3-3.2 0-1.8-1.2-3-2.9-3-.3 0-.6 0-.8.1.4-1.9 1.6-3.3 3.4-4.3L10 6Zm9 0c-3.6 1.4-5.5 4-5.5 7.6 0 2.7 1.5 4.4 3.7 4.4 1.9 0 3.3-1.3 3.3-3.2 0-1.8-1.2-3-2.9-3-.3 0-.6 0-.8.1.4-1.9 1.6-3.3 3.4-4.3L19 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Navigation and direction ──────────────────────────────────── */

/** Long tail arrow. The tail is deliberately longer than the head. */
export function ArrowLong({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M2 12h20" />
      <path d="M16 6.5 21.5 12 16 17.5" />
    </svg>
  );
}

export function ArrowDiagonal({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M5.5 18.5 18.5 5.5" />
      <path d="M8.5 5.5h10v10" />
    </svg>
  );
}

export function ArrowDown({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M12 2v20" />
      <path d="M5.5 15.5 12 22l6.5-6.5" />
    </svg>
  );
}

export function Chevron({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M7 10l5 5 5-5" />
    </svg>
  );
}

/** Menu. Two rules of unequal length so it is not the standard hamburger. */
export function MenuMark({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M3 9h18" />
      <path d="M3 15h11" />
    </svg>
  );
}

export function CloseMark({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

export function PlusMark({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M12 4v16" />
      <path d="M4 12h16" />
    </svg>
  );
}

/* ── Capability marks ──────────────────────────────────────────── */

/** Full stack. Three plates stacked with a shared spine. */
export function MarkStack({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
      <path d="M3 12.5 12 17l9-4.5" />
      <path d="M3 17 12 21.5 21 17" />
    </svg>
  );
}

/** AI systems. A ring of nodes feeding one centre. */
export function MarkCore({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="12" cy="3.2" r="1.4" />
      <circle cx="20.8" cy="12" r="1.4" />
      <circle cx="12" cy="20.8" r="1.4" />
      <circle cx="3.2" cy="12" r="1.4" />
      <path d="M12 4.6v4.2M15.2 12h4.2M12 15.2v4.2M4.6 12h4.2" />
    </svg>
  );
}

/** Data pipelines. A funnel of streams narrowing into one channel. */
export function MarkFlow({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M3 4.5h18" />
      <path d="M6.5 9.5h11" />
      <path d="M10 14.5h4" />
      <path d="M12 14.5v5" />
      <circle cx="12" cy="21" r="1.4" />
    </svg>
  );
}

/** SaaS platforms. A vault door built from a square and an arc. */
export function MarkVault({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  );
}

/** Interfaces. A frame with a live cursor tracing it. */
export function MarkFrame({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <rect x="3" y="4" width="18" height="14" rx="1.5" />
      <path d="M3 8.5h18" />
      <path d="M6 6.2h1.6" />
      <path d="M9.5 12.5 15 21l1.4-3.6L20 16l-10.5-3.5Z" />
    </svg>
  );
}

/** Search and growth. A compass rose cut down to two bearings. */
export function MarkBearing({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 10.7 10.7 8.5 15.5l4.8-2.2L15.5 8.5Z" />
      <path d="M12 1.8v2.4M12 19.8v2.4M1.8 12h2.4M19.8 12h2.4" />
    </svg>
  );
}

/** Audio and media. A waveform read as three chords across a circle. */
export function MarkChord({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M4.4 7.5h15.2" />
      <path d="M3.2 12h17.6" />
      <path d="M4.4 16.5h15.2" />
    </svg>
  );
}

/* ── Small utility marks ───────────────────────────────────────── */

export function MarkPin({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M12 21.5s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </svg>
  );
}

export function MarkClock({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.6 2.2" />
    </svg>
  );
}

export function MarkMail({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="M2.5 7.5 12 13.5l9.5-6" />
    </svg>
  );
}

/** Download. A sheet with a rule beneath it and an arrow leaving the page. */
export function MarkDocument({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M6 3h7.5L18 7.5V15" />
      <path d="M13.5 3v4.5H18" />
      <path d="M6 3v12" />
      <path d="M12 15v6" />
      <path d="M9 18.2 12 21.2l3-3" />
    </svg>
  );
}

export function MarkCheck({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M4 12.8 9.2 18 20 6.6" />
    </svg>
  );
}

/** A flagged issue: a straight stroke over a dot, on the same grid as MarkCheck. */
export function WarnMark({ size = 24, className, strokeWidth = 1.2, style }: MarkProps) {
  return (
    <svg {...base(size, strokeWidth, className, style)}>
      <path d="M12 5v9" />
      <circle cx="12" cy="18.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── Social wordmark glyphs, drawn rather than imported ────────── */

export function GlyphGithub({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M12 1.6a10.4 10.4 0 0 0-3.3 20.3c.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.3-3.5-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.8-1.2-4.8-5.2 0-1.2.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 2.9 1.1a9.9 9.9 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.6.1 2.9.7.7 1.1 1.6 1.1 2.8 0 4-2.5 4.9-4.8 5.2.4.3.7 1 .7 2v3c0 .3.2.6.7.5A10.4 10.4 0 0 0 12 1.6Z" />
    </svg>
  );
}

export function GlyphLinkedin({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M4.6 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM3 8.4h3.2V21H3V8.4Zm5.6 0h3v1.7h.1c.4-.8 1.5-1.9 3.4-1.9 3.2 0 3.9 2.1 3.9 4.9V21h-3.2v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H8.6V8.4Z" />
    </svg>
  );
}

/** Fiverr, redrawn as a plain f in a rounded square so it sits in the set. */
export function GlyphFiverr({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
      <path
        d="M14.6 8.2h-2.3v-.4c0-.6.4-.9 1-.9h1.3V4.6h-1.6c-2 0-3.3 1.2-3.3 3.1v.5H8.2v2.4h1.5V17h2.6v-6.4h2.3V17h2.6v-8.8h-2.6Z"
        fill="var(--bg)"
      />
    </svg>
  );
}

export function GlyphUpwork({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M17.6 7.6c-2 0-3.5 1.3-4.1 3.4-1-1.5-1.7-3.3-2.1-4.8H8.9v5.7c0 1.1-.9 2-2 2s-2-.9-2-2V6.2H2.4v5.7a4.5 4.5 0 0 0 9 .3c.5 1 1.1 2 1.8 2.9l-1.5 7.1h2.6l1.1-5.2c.9.6 2 .9 3.1.9 2.7 0 4.9-2.2 4.9-5s-2.2-5.3-5.8-5.3Zm.2 7.8c-.9 0-1.7-.4-2.4-1l.2-.9c.2-1.2.9-3.3 2.4-3.3 1.4 0 2.5 1.1 2.5 2.6s-1.2 2.6-2.7 2.6Z" />
    </svg>
  );
}

/** Facebook, drawn as the f alone so it sits flat next to the others. */
export function GlyphFacebook({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M13.6 21.9v-8.2h2.8l.42-3.25h-3.22V8.37c0-.94.26-1.58 1.61-1.58h1.72V3.88a23.2 23.2 0 0 0-2.5-.13c-2.48 0-4.18 1.51-4.18 4.29v2.39H7.42v3.25h2.85v8.22h3.33Z" />
    </svg>
  );
}

/** X. Two tapered strokes crossing, with the counter cut out. */
export function GlyphX({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.62 10.63 20.92 2.2h-1.73l-6.34 7.32L7.79 2.2H2.06l7.66 11.15L2.06 21.8h1.73l6.7-7.79 5.35 7.79h5.73l-7.95-11.17Zm-1.02 1.18-.78-1.13L4.4 3.5h2.66l5.1 7.3.78 1.12 6.02 8.61h-2.66l-5.7-8.72Z"
      />
    </svg>
  );
}

/** Instagram, drawn as a rounded aperture with the lens and the light. */
export function GlyphInstagram({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.16c-2.67 0-3 .01-4.05.06-1.04.05-1.76.22-2.38.46a4.8 4.8 0 0 0-1.74 1.13 4.8 4.8 0 0 0-1.13 1.74c-.24.62-.41 1.34-.46 2.38C2.19 9 2.16 9.33 2.16 12s.01 3 .06 4.05c.05 1.04.22 1.76.46 2.38a4.8 4.8 0 0 0 1.13 1.74 4.8 4.8 0 0 0 1.74 1.13c.62.24 1.34.41 2.38.46 1.05.05 1.38.06 4.05.06s3-.01 4.05-.06c1.04-.05 1.76-.22 2.38-.46a4.8 4.8 0 0 0 1.74-1.13 4.8 4.8 0 0 0 1.13-1.74c.24-.62.41-1.34.46-2.38.05-1.05.06-1.38.06-4.05s-.01-3-.06-4.05c-.05-1.04-.22-1.76-.46-2.38a4.8 4.8 0 0 0-1.13-1.74 4.8 4.8 0 0 0-1.74-1.13c-.62-.24-1.34-.41-2.38-.46C15 2.19 14.67 2.16 12 2.16Zm0 1.77c2.62 0 2.94.01 3.97.06.96.04 1.48.2 1.83.33.46.18.79.39 1.13.74.35.34.56.67.74 1.13.13.35.29.87.33 1.83.05 1.03.06 1.35.06 3.97s-.01 2.94-.06 3.97c-.4.96-.2 1.48-.33 1.83a3.03 3.03 0 0 1-.74 1.13c-.34.35-.67.56-1.13.74-.35.13-.87.29-1.83.33-1.03.05-1.35.06-3.97.06s-2.94-.01-3.97-.06c-.96-.04-1.48-.2-1.83-.33a3.03 3.03 0 0 1-1.13-.74 3.03 3.03 0 0 1-.74-1.13c-.13-.35-.29-.87-.33-1.83-.05-1.03-.06-1.35-.06-3.97s.01-2.94.06-3.97c.04-.96.2-1.48.33-1.83.18-.46.39-.79.74-1.13.34-.35.67-.56 1.13-.74.35-.13.87-.29 1.83-.33 1.03-.05 1.35-.06 3.97-.06Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 15.28a3.28 3.28 0 1 1 0-6.56 3.28 3.28 0 0 1 0 6.56Zm0-8.33a5.05 5.05 0 1 0 0 10.1 5.05 5.05 0 0 0 0-10.1Z"
      />
      <circle cx="17.25" cy="6.75" r="1.18" />
    </svg>
  );
}

/**
 * One map so a new profile only has to be added to the socials list. Every
 * surface that renders a social icon reads from here, which is what stops a
 * new entry rendering as a missing component on one page and not another.
 */
export const socialGlyphs = {
  github: GlyphGithub,
  linkedin: GlyphLinkedin,
  fiverr: GlyphFiverr,
  upwork: GlyphUpwork,
  facebook: GlyphFacebook,
  x: GlyphX,
  instagram: GlyphInstagram,
} as const;

export type SocialGlyph = keyof typeof socialGlyphs;

/* ── Client logotypes drawn in house ───────────────────────────── */

/**
 * Chord.fm has no downloadable brand asset, so this is a house drawn
 * logotype for it: three chords crossing a circle, next to the name.
 */
export function LogoChord({ className, style }: LogoProps) {
  return (
    <svg viewBox="0 0 132 28" fill="none" className={className} style={style} aria-label="Chord.fm" role="img">
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
      <path d="M4.6 9.2h18.8M3.2 14h21.6M4.6 18.8h18.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <text
        x="34"
        y="19.5"
        fill="currentColor"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="-0.4"
      >
        chord
      </text>
      <text
        x="86"
        y="19.5"
        fill="currentColor"
        opacity="0.55"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="13"
        letterSpacing="0"
      >
        .fm
      </text>
    </svg>
  );
}

/** PentaByteX, drawn as a pentagon glyph plus the name. */
export function LogoPenta({ className, style }: LogoProps) {
  return (
    <svg viewBox="0 0 150 28" fill="none" className={className} style={style} aria-label="PentaByteX" role="img">
      <path d="M14 3.5 24 10.8l-3.8 11.7H7.8L4 10.8 14 3.5Z" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
      <path d="M14 9.5 18.4 12.7 16.7 17.9h-5.4L9.6 12.7 14 9.5Z" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
      <text
        x="34"
        y="19.5"
        fill="currentColor"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="14.5"
        fontWeight="600"
        letterSpacing="-0.3"
      >
        PentaByteX
      </text>
    </svg>
  );
}

/** Mindstorm Studios. */
export function LogoMindstorm({ className, style }: LogoProps) {
  return (
    <svg viewBox="0 0 168 28" fill="none" className={className} style={style} aria-label="Mindstorm Studios" role="img">
      <path d="M4 21V7l5 7.5L14 7v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <circle cx="20.5" cy="9" r="1.6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M20.5 12.5V21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <text
        x="32"
        y="19.5"
        fill="currentColor"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="14.5"
        fontWeight="600"
        letterSpacing="-0.3"
      >
        Mindstorm
      </text>
      <text
        x="118"
        y="19.5"
        fill="currentColor"
        opacity="0.5"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="11"
      >
        STUDIOS
      </text>
    </svg>
  );
}
