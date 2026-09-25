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

/**
 * Every entry points at a real, indexable route, so the navigation is also a
 * crawl path. Contact is not listed here because it has its own button in the
 * masthead and never needs to compete with the other five.
 */
export const nav = [
  { label: 'Work', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'Writing', href: '/blog' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about-masab' },
] as const;

/**
 * The site as a drawing set. Each top level page is a sheet with a number,
 * the way a set of architectural drawings is indexed. The numbers label each
 * page's strip; sub pages borrow their parent's number.
 */
export const sheets = [
  { code: 'A-00', label: 'Home', href: '/' },
  { code: 'A-01', label: 'Work', href: '/portfolio' },
  { code: 'A-02', label: 'Services', href: '/services' },
  { code: 'A-03', label: 'Capabilities', href: '/capabilities' },
  { code: 'A-04', label: 'Writing', href: '/blog' },
  { code: 'A-05', label: 'Reviews', href: '/reviews' },
  { code: 'A-06', label: 'About', href: '/about-masab' },
  { code: 'A-07', label: 'Contact', href: '/contact' },
  { code: 'A-08', label: 'Site Check', href: '/site-check' },
] as const;

/**
 * Sheets a given menu does not already link to. Home is always reachable
 * from the name in the masthead and Contact from its own button, so neither
 * is ever repeated. Used so the footer and the phone menu only list pages a
 * visitor could not otherwise get to.
 */
export function sheetsNotIn(hrefs: readonly string[]) {
  return sheets.filter((s) => s.href !== '/' && s.href !== '/contact' && !hrefs.includes(s.href));
}

/** Sheets that exist but stay out of every list. */
const appendix = [
  { code: 'X-01', label: 'Privacy', href: '/privacy' },
  { code: 'X-02', label: 'Terms', href: '/terms' },
] as const;

type Sheet = { code: string; label: string; href: string };

/** The sheet a path belongs to: its own entry, or the section above it. */
export function sheetFor(pathname: string): Sheet {
  const all: readonly Sheet[] = [...sheets, ...appendix];
  const exact = all.find((s) => s.href === pathname);
  if (exact) return exact;
  const parent = all
    .filter((s) => s.href !== '/' && pathname.startsWith(`${s.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return parent ?? { code: 'X-00', label: 'Not in the set', href: pathname };
}

/** Where the work is drawn from, as it appears in the masthead. */
export const coordinates = '33.6844 N, 73.0479 E';


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
  { label: 'X', handle: 'MasabDF', href: 'https://x.com/MasabDF', glyph: 'x' },
  {
    label: 'Instagram',
    handle: 'masabfarooque',
    href: 'https://www.instagram.com/masabfarooque',
    glyph: 'instagram',
  },
  {
    label: 'Facebook',
    handle: 'MasabDF',
    href: 'https://www.facebook.com/MasabDF',
    glyph: 'facebook',
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

/** Tools in use, grouped the way they sit in a system. Read by the terminal and the about page. */
export const stack = [
  { group: 'languages', items: ['TypeScript', 'Python', 'Go', 'SQL', 'C#'] },
  { group: 'front end', items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Canvas'] },
  { group: 'back end', items: ['FastAPI', 'Node.js', 'NestJS', 'Express', 'Celery', 'Redis'] },
  { group: 'data', items: ['PostgreSQL', 'Supabase', 'DynamoDB', 'MongoDB', 'Vector search'] },
  { group: 'cloud', items: ['AWS Lambda', 'API Gateway', 'S3', 'Docker', 'Vercel', 'Serverless Framework'] },
  { group: 'ai', items: ['Claude API', 'OpenAI', 'Groq', 'LangChain', 'RAG pipelines'] },
  { group: 'payments', items: ['Stripe'] },
] as const;
