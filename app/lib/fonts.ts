import localFont from 'next/font/local';

/**
 * Two families, nothing else.
 *
 * Almarai carries everything: headings, body, labels, numbers. Instrument
 * Serif appears only in italic, as an accent inside a sentence. Both are self
 * hosted so the page never blocks on a third party font CDN.
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
