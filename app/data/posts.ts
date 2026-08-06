/**
 * Blog index.
 *
 * Article bodies live in their own route files under app/blog, because each
 * one carries hand drawn diagrams and charts rather than a stream of
 * markdown. This file holds only what the index, the sitemap and the
 * structured data need, so nothing can drift between them.
 */

export type PostTopic = 'migration' | 'architecture' | 'performance';

export const topicLabels: Record<PostTopic, string> = {
  migration: 'Migration',
  architecture: 'Architecture',
  performance: 'Performance',
};

export interface Post {
  slug: string;
  title: string;
  /** Shown on the card and used as the meta description. */
  summary: string;
  /** One line, sits under the title on the article page. */
  standfirst: string;
  topic: PostTopic;
  /** ISO date. Drives ordering, sitemap lastmod and article schema. */
  published: string;
  updated?: string;
  readingMinutes: number;
  /** Slugs of the posts worth reading next. Keeps the cluster linked. */
  related: string[];
  /** Section headings, in order. Renders the contents rail. */
  sections: { id: string; label: string }[];
}

export const posts: Post[] = [
  {
    slug: 'wordpress-to-nextjs-migration',
    title: 'Moving a WordPress site to Next.js without losing your rankings',
    summary:
      'A working method for migrating WordPress to Next.js: how to freeze your URLs, build the redirect map, keep every meta tag, and prove the move did not cost you traffic.',
    standfirst:
      'Most migrations lose traffic for one reason, and it is never the framework.',
    topic: 'migration',
    published: '2026-07-14',
    readingMinutes: 11,
    related: ['wordpress-as-headless-cms', 'core-web-vitals-for-content-sites'],
    sections: [
      { id: 'why-people-move', label: 'Why people move off WordPress' },
      { id: 'what-actually-breaks', label: 'What actually breaks a migration' },
      { id: 'freeze-your-urls', label: 'Step one: freeze your URLs' },
      { id: 'redirect-map', label: 'Step two: build the redirect map' },
      { id: 'carry-the-metadata', label: 'Step three: carry the metadata across' },
      { id: 'prove-it-worked', label: 'Step four: prove it worked' },
      { id: 'what-you-gain', label: 'What you gain' },
      { id: 'resources', label: 'Resources' },
    ],
  },
  {
    slug: 'wordpress-as-headless-cms',
    title: 'Keep the WordPress editor, drop the WordPress front end',
    summary:
      'How to run WordPress as a headless CMS behind Next.js so your team keeps the editor it knows while the public site is served as static files.',
    standfirst:
      'Your writers do not need to lose their editor for you to lose the slow front end.',
    topic: 'architecture',
    published: '2026-07-22',
    readingMinutes: 12,
    related: [
      'wordpress-to-nextjs-migration',
      'headless-cms-vs-website-builders',
    ],
    sections: [
      { id: 'what-headless-means', label: 'What headless actually means here' },
      { id: 'rest-or-graphql', label: 'REST or GraphQL' },
      { id: 'fetching-content', label: 'Fetching content at build time' },
      { id: 'publish-instantly', label: 'Publishing without a rebuild wait' },
      { id: 'locking-it-down', label: 'Locking down the WordPress install' },
      { id: 'what-editors-see', label: 'What editors actually see' },
      { id: 'when-not-to', label: 'When not to do this' },
      { id: 'resources', label: 'Resources' },
    ],
  },
  {
    slug: 'headless-cms-vs-website-builders',
    title: 'Why a headless CMS beats building on WordPress or Wix',
    summary:
      'For content sites, portfolios and brand sites, a headless CMS with a static front end wins on speed, cost and ownership. Here is the reasoning, with the tradeoffs.',
    standfirst:
      'A page builder decides your performance ceiling before you write a word.',
    topic: 'architecture',
    published: '2026-07-29',
    readingMinutes: 10,
    related: ['wordpress-as-headless-cms', 'core-web-vitals-for-content-sites'],
    sections: [
      { id: 'the-coupling-problem', label: 'The coupling problem' },
      { id: 'where-builders-cost-you', label: 'Where builders cost you' },
      { id: 'the-decoupled-shape', label: 'The decoupled shape' },
      { id: 'content-marketing', label: 'Why content sites feel it most' },
      { id: 'ownership', label: 'Ownership and portability' },
      { id: 'honest-tradeoffs', label: 'The honest tradeoffs' },
      { id: 'resources', label: 'Resources' },
    ],
  },
  {
    slug: 'core-web-vitals-for-content-sites',
    title: 'Core Web Vitals for content sites: what actually moves the numbers',
    summary:
      'The three metrics Google scores, what each one really measures, and the specific Next.js changes that improve them on a content or marketing site.',
    standfirst:
      'Three numbers decide your score. Most advice ignores which one you are failing.',
    topic: 'performance',
    published: '2026-08-04',
    readingMinutes: 13,
    related: [
      'wordpress-to-nextjs-migration',
      'headless-cms-vs-website-builders',
    ],
    sections: [
      { id: 'the-three-numbers', label: 'The three numbers' },
      { id: 'field-not-lab', label: 'Field data, not lab data' },
      { id: 'fixing-lcp', label: 'Fixing LCP' },
      { id: 'fixing-inp', label: 'Fixing INP' },
      { id: 'fixing-cls', label: 'Fixing CLS' },
      { id: 'measure-it', label: 'Measuring it yourself' },
      { id: 'resources', label: 'Resources' },
    ],
  },
];

/** Newest first. */
export const postsByDate = [...posts].sort(
  (a, b) => Date.parse(b.published) - Date.parse(a.published),
);

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelated(slug: string) {
  const post = getPost(slug);
  if (!post) return [];
  return post.related
    .map((relatedSlug) => getPost(relatedSlug))
    .filter((value): value is Post => Boolean(value));
}

/** "14 July 2026", stable between server and client. */
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatPostDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}
