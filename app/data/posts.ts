/**
 * Blog index.
 *
 * Article bodies live in their own route files under app/blog, because each
 * one carries hand drawn diagrams and charts rather than a stream of
 * markdown. This file holds only what the index, the sitemap and the
 * structured data need, so nothing can drift between them.
 */

export type PostTopic = 'migration' | 'architecture' | 'performance' | 'practice';

export const topicLabels: Record<PostTopic, string> = {
  migration: 'Migration',
  architecture: 'Architecture',
  performance: 'Performance',
  practice: 'Practice',
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
    related: ['wordpress-to-nextjs-migration-cost', 'wordpress-to-nextjs-migration-checklist'],
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
    related: ['wordpress-vs-sanity-headless-cms', 'hosting-headless-wordpress'],
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
    related: ['wordpress-vs-sanity-headless-cms', 'wordpress-as-headless-cms'],
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
  {
    slug: 'yoast-metadata-to-nextjs',
    title: 'Keeping your Yoast SEO metadata after moving to Next.js',
    summary:
      'Yoast holds years of titles, descriptions, canonicals and social cards. How to pull all of it out of WordPress and rebuild it in the Next.js Metadata API.',
    standfirst:
      'Yoast data does not travel on its own. You have to carry it.',
    topic: 'migration',
    published: '2026-08-05',
    readingMinutes: 11,
    related: ['wordpress-to-nextjs-migration', 'wordpress-to-nextjs-migration-checklist'],
    sections: [
      { id: 'what-yoast-stores', label: 'What Yoast actually stores' },
      { id: 'getting-it-out', label: 'Getting the data out' },
      { id: 'titles-and-descriptions', label: 'Titles and descriptions' },
      { id: 'canonicals-and-robots', label: 'Canonicals and robots rules' },
      { id: 'social-cards', label: 'Open Graph and social cards' },
      { id: 'schema', label: 'The schema Yoast was emitting' },
      { id: 'verify', label: 'Checking nothing dropped' },
      { id: 'resources', label: 'Resources' },
    ],
  },
  {
    slug: 'hosting-headless-wordpress',
    title: 'Where to host a headless WordPress backend, and what it costs',
    summary:
      'Once WordPress stops serving visitors, its hosting needs change completely. The realistic options, what each costs per month, and how to size the box.',
    standfirst:
      'Your CMS stops being a website. Stop paying for it like one.',
    topic: 'architecture',
    published: '2026-08-06',
    readingMinutes: 10,
    related: ['wordpress-as-headless-cms', 'headless-cms-vs-website-builders'],
    sections: [
      { id: 'what-changes', label: 'What changes when you go headless' },
      { id: 'the-options', label: 'The options, and what they cost' },
      { id: 'sizing-the-box', label: 'Sizing the box' },
      { id: 'hidden-costs', label: 'The costs people forget' },
      { id: 'worked-example', label: 'A worked example' },
      { id: 'keeping-it-cheap', label: 'Keeping the bill predictable' },
      { id: 'what-i-pick', label: 'What I usually pick' },
      { id: 'resources', label: 'Resources' },
    ],
  },
  {
    slug: 'solo-developer-vs-agency',
    title: 'What a solo developer can build that an agency usually will not',
    summary:
      'The honest differences between hiring one engineer and hiring a studio: who writes your code, what handover looks like, and when an agency fits better.',
    standfirst:
      'The question is not which is better. It is which one fits the job.',
    topic: 'practice',
    published: '2026-08-07',
    readingMinutes: 9,
    related: ['wordpress-to-nextjs-migration', 'headless-cms-vs-website-builders'],
    sections: [
      { id: 'who-writes-it', label: 'Who actually writes your code' },
      { id: 'the-context-problem', label: 'The context problem' },
      { id: 'handover', label: 'What handover really looks like' },
      { id: 'speed', label: 'Why decisions move faster' },
      { id: 'where-agencies-win', label: 'Where an agency genuinely wins' },
      { id: 'how-to-check', label: 'How to check before you hire' },
      { id: 'how-i-work', label: 'How I work' },
      { id: 'resources', label: 'Resources' },
    ],
  },
  {
    slug: 'wordpress-to-nextjs-migration-cost',
    title: 'What a WordPress to Next.js migration costs, line by line',
    summary:
      'Where the money goes in a WordPress to Next.js migration, broken into the nine line items behind the quote, with worked examples for three site sizes.',
    standfirst:
      'Most quotes give you one number. Here is what sits inside it.',
    topic: 'migration',
    published: '2026-08-08',
    readingMinutes: 12,
    related: ['wordpress-to-nextjs-migration-timeline', 'wordpress-to-nextjs-migration'],
    sections: [
      { id: 'what-drives-the-number', label: 'What drives the number' },
      { id: 'the-line-items', label: 'The nine line items' },
      { id: 'where-the-effort-goes', label: 'Where the effort goes' },
      { id: 'worked-examples', label: 'Three worked examples' },
      { id: 'what-inflates-it', label: 'What inflates a quote' },
      { id: 'what-you-can-cut', label: 'What you can safely cut' },
      { id: 'red-flags', label: 'Quotes that should worry you' },
      { id: 'resources', label: 'Resources' },
    ],
  },
  {
    slug: 'wordpress-to-nextjs-migration-timeline',
    title: 'How long a WordPress to Next.js migration actually takes',
    summary:
      'A realistic schedule for moving WordPress to Next.js: what happens each week, what runs late, and which parts of the delay you actually control.',
    standfirst:
      'The build is rarely what makes a migration slow.',
    topic: 'migration',
    published: '2026-08-08',
    readingMinutes: 10,
    related: [
      'wordpress-to-nextjs-migration-cost',
      'wordpress-to-nextjs-migration-checklist',
    ],
    sections: [
      { id: 'what-sets-the-clock', label: 'What sets the clock' },
      { id: 'the-phases', label: 'The phases, week by week' },
      { id: 'by-site-size', label: 'Timelines by site size' },
      { id: 'what-runs-late', label: 'What actually runs late' },
      { id: 'what-you-control', label: 'The delay you control' },
      { id: 'running-in-parallel', label: 'What can run in parallel' },
      { id: 'resources', label: 'Resources' },
    ],
  },
  {
    slug: 'wordpress-to-nextjs-migration-checklist',
    title: 'A WordPress to Next.js migration checklist you can hand to a developer',
    summary:
      'Every check worth running before, during and after a WordPress to Next.js migration, written so you can hand it to whoever does the work.',
    standfirst:
      'Print it, send it, tick it off. Nothing here is optional.',
    topic: 'migration',
    published: '2026-08-08',
    readingMinutes: 9,
    related: [
      'wordpress-to-nextjs-migration',
      'wordpress-to-nextjs-migration-timeline',
    ],
    sections: [
      { id: 'before-you-start', label: 'Before anyone writes code' },
      { id: 'freeze-the-urls', label: 'Freeze the URLs' },
      { id: 'while-building', label: 'While the build runs' },
      { id: 'pre-launch', label: 'The pre launch pass' },
      { id: 'launch-day', label: 'Launch day' },
      { id: 'first-month', label: 'The first month after' },
      { id: 'handing-it-over', label: 'Handing this to a developer' },
      { id: 'resources', label: 'Resources' },
    ],
  },
  {
    slug: 'wordpress-vs-sanity-headless-cms',
    title: 'WordPress or Sanity as a headless CMS: how to pick',
    summary:
      'A working comparison of WordPress and Sanity behind a Next.js site: schema written in code against field groups built by hand, seeding content over the API, what each costs, and when WordPress still wins.',
    standfirst:
      'One you click together in an admin screen. The other you write down and commit.',
    topic: 'architecture',
    published: '2026-08-10',
    readingMinutes: 14,
    related: ['wordpress-as-headless-cms', 'headless-cms-vs-website-builders'],
    sections: [
      { id: 'where-the-model-lives', label: 'Where the content model lives' },
      { id: 'content-model', label: 'Defining a content model' },
      { id: 'seeding', label: 'Seeding content over the API' },
      { id: 'editors', label: 'What editors actually get' },
      { id: 'cost', label: 'What each one costs' },
      { id: 'maintenance', label: 'What breaks later' },
      { id: 'when-wordpress-wins', label: 'When WordPress is the right pick' },
      { id: 'faq', label: 'Questions people ask me' },
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
