import { reviewSummary } from './reviews';

export const site = {
  name: 'Masab Farooque',
  shortName: 'Masab',
  role: 'Full Stack Engineer',
  tagline: 'I design and build software that holds up after launch.',
  location: 'Islamabad, Pakistan',
  timezone: 'PKT, UTC +5',
  email: 'contact@masabfarooque.com',
  phone: '+92 304 5624189',
  url: 'https://masabfarooque.com',
  availability: 'Open to new work',
  yearsActive: '2020',
} as const;

export const cv = {
  href: '/CV/Masab_Farooque_FullStack_Engineer_CV.pdf',
  fileName: 'Masab_Farooque_FullStack_Engineer_CV.pdf',
  label: 'Curriculum vitae',
  updated: 'August 2026',
  size: '120 KB',
} as const;

export const nav = [
  { label: 'Work', href: '/portfolio', index: '01' },
  { label: 'Capabilities', href: '/#capabilities', index: '02' },
  { label: 'Writing', href: '/blog', index: '03' },
  { label: 'Reviews', href: '/#reviews', index: '04' },
  { label: 'About', href: '/about-masab', index: '05' },
  { label: 'Contact', href: '/contact', index: '06' },
] as const;

/**
 * Motion backdrop for the hero. Swap this URL for your own footage and the
 * hero re-skins without touching a component.
 */
export const media = {
  heroVideo:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4',
  heroPoster: '/video/hero-poster.webp',
} as const;

export const socials = [
  { label: 'GitHub', handle: 'Masab12', href: 'https://github.com/Masab12', glyph: 'github' },
  {
    label: 'LinkedIn',
    handle: 'masabfarooque',
    href: 'https://www.linkedin.com/in/masabfarooque',
    glyph: 'linkedin',
  },
  {
    label: 'Fiverr',
    handle: 'p_scribbles',
    href: 'https://www.fiverr.com/p_scribbles',
    glyph: 'fiverr',
  },
  {
    label: 'Upwork',
    handle: 'Masab F.',
    href: 'https://upwork.com/freelancers/~01e34b32d5b254495d',
    glyph: 'upwork',
  },
] as const;

/**
 * Anything measurable comes out of the Fiverr export rather than being typed
 * by hand, so the hero can never disagree with the reviews section.
 */
export const stats = [
  { value: '195', suffix: '+', label: 'Orders delivered' },
  { value: String(reviewSummary.countries), suffix: '', label: 'Countries served' },
  { value: reviewSummary.average.toFixed(1), suffix: '', label: 'Average rating' },
  { value: '3', suffix: '+', label: 'Years shipping' },
] as const;

/** Short lines used by the velocity ticker and the hero rotator. */
export const marqueeTerms = [
  'Full stack engineering',
  'AI systems',
  'SaaS platforms',
  'Data pipelines',
  'Go on AWS Lambda',
  'Next.js and FastAPI',
  'Interfaces with motion',
] as const;
