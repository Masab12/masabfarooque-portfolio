import localFont from 'next/font/local';

/**
 * Three voices, each with one job.
 *
 * Almarai carries headings and body. Instrument Serif appears only in italic,
 * for a single phrase inside a headline. Fragment Mono is the drafting hand:
 * sheet numbers, dates, specs and labels, the parts of a page a reader scans
 * rather than reads. All three are served from this domain, so no page ever
 * waits on a third party font host.
 */

export const sansFont = localFont({
  src: [
    { path: '../../public/fonts/Almarai-300.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Almarai-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Almarai-700.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Almarai-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const serifFont = localFont({
  src: [
    { path: '../../public/fonts/InstrumentSerif-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/InstrumentSerif.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const monoFont = localFont({
  src: [{ path: '../../public/fonts/FragmentMono-Regular.woff2', weight: '400', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});
