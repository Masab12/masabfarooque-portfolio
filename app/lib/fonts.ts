import localFont from 'next/font/local';

/**
 * Type system.
 *
 * Display  Fraunces        variable serif, high contrast, WONK + SOFT axes on
 * Sans     Manrope         variable grotesk for body and interface
 * Mono     IBM Plex Mono   for meta labels, indices and data
 *
 * All three are self hosted so the site never waits on a third party font CDN.
 */

export const displayFont = localFont({
  src: [
    { path: '../../public/fonts/Fraunces-Variable.woff2', weight: '100 900', style: 'normal' },
    { path: '../../public/fonts/Fraunces-VariableItalic.woff2', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const sansFont = localFont({
  src: [{ path: '../../public/fonts/Manrope-Variable.woff2', weight: '200 800', style: 'normal' }],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});

export const monoFont = localFont({
  src: [
    { path: '../../public/fonts/IBMPlexMono-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/IBMPlexMono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});
