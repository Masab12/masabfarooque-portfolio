import { reviewSummary } from '@/app/data/reviews';

/**
 * Service pages.
 *
 * One entry per commercial offer. Every page renders from the same layout, so
 * a new service is a data change rather than a new four hundred line route,
 * and the four pages cannot drift apart visually.
 */

export interface ServiceIncluded {
  title: string;
  body: string;
}

export interface ServiceShape {
  name: string;
  scale: string;
  timeline: string;
  detail: string;
}

export interface ServiceStep {
  index: string;
  title: string;
  body: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  /** Small label above the h1. */
  label: string;
  /** The h1. Kept short, since PageHead sets it very large. */
  title: string;
  /** Title tag, without the site name. */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Sentence under the h1. */
  intro: string;
  /** The four figures in the masthead. Reviews and location get appended. */
  meta: { label: string; value: string }[];
  /** schema.org Service fields. */
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
  /** The opening section. First paragraph is set larger. */
  problem: { heading: string; paragraphs: string[] };
  includedHeading: string;
  included: ServiceIncluded[];
  shapesHeading: string;
  shapesNote: string;
  shapes: ServiceShape[];
  stepsHeading: string;
  steps: ServiceStep[];
  faqs: ServiceFaq[];
  /** Post slugs worth reading, shown at the bottom. Optional. */
  guides: string[];
  guidesNote?: string;
  /** Case study slugs used as proof. */
  proof: string[];
}

/* ── Shared process, since it is the same on every project ──────── */

const commonSteps: ServiceStep[] = [
  {
    index: '01',
    title: 'A look at what you have',
    body: 'You tell me what you are building and what is in the way. I ask questions until I understand it, then tell you whether the project makes sense. This part is free and sometimes ends with me saying no.',
  },
  {
    index: '02',
    title: 'A written scope and a number',
    body: 'Deliverables, timeline and price in writing before anything starts. The number does not move unless the scope does, and scope changes get quoted separately.',
  },
  {
    index: '03',
    title: 'Build in the open',
    body: 'You get working builds you can click through, pushed regularly. No long silence followed by a surprise, so feedback lands while it is still cheap to act on.',
  },
  {
    index: '04',
    title: 'Hand it over properly',
    body: 'A repository you own, documentation that gets a new developer running locally, and a recorded walkthrough of the deploy. Then a support window, because launch is when the real problems show up.',
  },
];

export const services: Service[] = [
  /* ── WordPress to Next.js ─────────────────────────────────────── */
  {
    slug: 'wordpress-to-nextjs',
    label: 'Service',
    title: 'WordPress to Next.js',
    metaTitle: 'WordPress to Next.js migration',
    metaDescription:
      'I move WordPress sites to Next.js without losing rankings, and can keep WordPress as a headless CMS so your team keeps the editor. Fixed price, clean handover.',
    keywords: [
      'WordPress to Next.js migration service',
      'headless WordPress developer',
      'Next.js developer Islamabad',
      'migrate WordPress to Next.js',
      'hire Next.js developer Pakistan',
    ],
    intro:
      'I move WordPress sites onto Next.js without losing the rankings you already have. If your team wants to keep writing in WordPress, I wire it up as a headless CMS so the editor never changes.',
    meta: [
      { label: 'Typical timeline', value: '1 to 6 weeks' },
      { label: 'Pricing', value: 'Fixed per project' },
    ],
    serviceName: 'WordPress to Next.js migration',
    serviceType: 'Web development',
    serviceDescription:
      'Migrating WordPress sites to Next.js without losing search rankings, including headless WordPress setups where the editorial team keeps the WordPress admin.',
    problem: {
      heading: 'The problem',
      paragraphs: [
        'Your WordPress site works. It is also slow, it needs constant plugin updates, and every performance fix means another plugin on top of the last one.',
        'Rebuilding it in Next.js solves the speed problem outright, because visitors get static files from a CDN instead of PHP hitting a database. The risk is not the rebuild. It is the move. Migrations lose traffic when URLs change without redirects, when metadata gets dropped on the way across, or when nobody checks Search Console until a month has passed.',
        'That is the part I handle carefully, and it is most of what you are paying for.',
      ],
    },
    includedHeading: 'What the work covers',
    included: [
      {
        title: 'A full URL audit before anything moves',
        body: 'Every indexed URL pulled from your sitemap, Search Console and server logs, then frozen into a list we both agree on.',
      },
      {
        title: 'A tested redirect map',
        body: 'Old paths mapped to new ones and verified with an automated check, so nothing lands on a 404 the day you switch.',
      },
      {
        title: 'Metadata carried across intact',
        body: 'Titles, descriptions, canonicals, robots rules and social cards moved out of Yoast and rebuilt in the Metadata API.',
      },
      {
        title: 'Structured data rebuilt',
        body: 'The schema graph your plugin was emitting, written cleanly so breadcrumbs and article markup survive the move.',
      },
      {
        title: 'Core Web Vitals work',
        body: 'Images, fonts and layout stability handled during the build rather than bolted on after launch.',
      },
      {
        title: 'Headless WordPress, if you want it',
        body: 'Your editors keep the same login, the same block editor and the same media library. Only the public front end changes.',
      },
      {
        title: 'Documentation and a walkthrough',
        body: 'A repository you own, a readme that gets a developer running locally, and a recorded call covering the deploy.',
      },
      {
        title: 'A support window after launch',
        body: 'Launch is when real problems appear. I stay available afterwards instead of disappearing at handover.',
      },
    ],
    shapesHeading: 'Shapes of project',
    shapesNote:
      'Timelines below are what these usually take, not a promise made before I have seen your site. You get a real number in writing after I look at it.',
    shapes: [
      {
        name: 'Brochure site',
        scale: 'Up to about 30 pages',
        timeline: '1 to 2 weeks',
        detail:
          'Marketing pages, a contact form, no blog archive to speak of. Usually the cleanest migration there is.',
      },
      {
        name: 'Content site',
        scale: 'Roughly 50 to 500 posts',
        timeline: '2 to 5 weeks',
        detail:
          'A real blog with categories, tags, authors and years of accumulated SEO. This is where the redirect map earns its keep.',
      },
      {
        name: 'Content site, headless',
        scale: 'Any size, editors stay in WordPress',
        timeline: '3 to 6 weeks',
        detail:
          'Everything above, plus WordPress wired up as a headless CMS with instant publishing through a webhook.',
      },
      {
        name: 'Something more involved',
        scale: 'Membership, WooCommerce, custom post types',
        timeline: 'Scoped case by case',
        detail:
          'These need a proper look before anyone quotes a number. Sometimes the honest answer is that you should not migrate at all.',
      },
    ],
    stepsHeading: 'How it runs',
    steps: [
      {
        index: '01',
        title: 'A look at what you have',
        body: 'You send me the URL and tell me what is bothering you. I look at the site, the page count and what it depends on, then tell you whether a migration is worth doing. This part is free and sometimes ends with me saying no.',
      },
      {
        index: '02',
        title: 'A written scope and a number',
        body: 'Deliverables, timeline and price in writing before anything starts. The number does not move unless the scope does, and scope changes get quoted separately.',
      },
      {
        index: '03',
        title: 'Build on staging',
        body: 'The new site goes up somewhere private where you can click through it. Redirects, metadata and structured data get verified against the live site while the live site is still running.',
      },
      {
        index: '04',
        title: 'Switch, then watch',
        body: 'DNS moves once everything checks out. Then I watch Search Console for crawl errors and coverage changes through the weeks that actually matter.',
      },
    ],
    faqs: [
      {
        q: 'Will I lose my Google rankings?',
        a: 'Not if the routing work is done properly. Rankings drop when URLs change without redirects, when metadata gets dropped, or when the new site blocks crawlers by accident. All three are preventable, and all three are on my checklist before launch. I verify the redirect map with an automated pass and diff every meta tag between the old site and staging before DNS moves.',
      },
      {
        q: 'Can my team keep using the WordPress editor?',
        a: 'Yes. That is the headless setup, and it is what I recommend for teams that publish often. WordPress keeps running privately as your content database with the same admin, the same block editor and the same media library. Next.js reads from it over the API and serves static pages to visitors. Editors see one change: the view link points at the new site.',
      },
      {
        q: 'How much does it cost?',
        a: 'It depends on page count, how much custom functionality exists, and whether you want the headless setup. I quote a fixed price per project after looking at the site, not an hourly rate, so you know the number before anything starts. Send me the URL and you will get a real figure rather than a range.',
      },
      {
        q: 'How long does it take?',
        a: 'A brochure site is usually one to two weeks. A content site with a few hundred posts runs two to five weeks. Adding headless WordPress puts it at three to six. Anything with membership, WooCommerce or heavy custom post types gets scoped case by case, because guessing at those is how projects go wrong.',
      },
      {
        q: 'What happens to my images and media?',
        a: 'They come across. For most sites I move uploads to object storage behind a CDN, which takes the load off the origin server and makes images faster to serve. Existing URLs get redirected so anything already linked elsewhere keeps working.',
      },
      {
        q: 'What if I want to hire someone else later?',
        a: 'You should be able to. You own the repository from day one, the readme gets a new developer running locally in under fifteen minutes, environment variables are documented with a checked in example file, and the deploy is recorded on video. I build for handover because referrals are worth more to me than lock in.',
      },
      {
        q: 'Do you work with clients outside Pakistan?',
        a: `Most of my work is remote. I am based in Islamabad, Pakistan on PKT, UTC +5, and I keep overlap hours with Europe and North America. Clients in ${reviewSummary.countries} countries so far, and time zone has never been the reason a project slipped.`,
      },
      {
        q: 'What if my site should not be migrated?',
        a: 'I will tell you. Sites leaning hard on WooCommerce, page builders like Elementor or Divi, or a large plugin ecosystem are often better off staying where they are and getting faster instead. Talking you out of a migration costs me one job and saves you a bad quarter.',
      },
    ],
    guides: [
      'wordpress-to-nextjs-migration',
      'wordpress-to-nextjs-migration-cost',
      'wordpress-to-nextjs-migration-timeline',
      'wordpress-to-nextjs-migration-checklist',
    ],
    guidesNote:
      'I have written the method down in full. Read these before you hire anyone, including me, because they will tell you whether the person you are talking to knows what they are doing.',
    proof: ['firstdeal', 'navia'],
  },

  /* ── AI and agentic applications ──────────────────────────────── */
  {
    slug: 'ai-application-development',
    label: 'Service',
    title: 'AI applications',
    metaTitle: 'AI and LLM application development',
    metaDescription:
      'AI applications that survive real users: document parsing, retrieval over your own content, and agents that take real actions with guardrails and a cost budget.',
    keywords: [
      'AI application development',
      'LLM app developer',
      'RAG developer',
      'AI agent development service',
      'Claude API developer Islamabad',
    ],
    intro:
      'A demo and a product are not the same thing. I build the second one: retrieval over your own material, agents that take real actions, and the guardrails, fallbacks and cost controls that keep it working once strangers start using it.',
    meta: [
      { label: 'Typical timeline', value: '2 to 10 weeks' },
      { label: 'Pricing', value: 'Fixed per project' },
    ],
    serviceName: 'AI and LLM application development',
    serviceType: 'Software development',
    serviceDescription:
      'Building production AI applications: document parsing, retrieval augmented generation over private content, agents that perform real operations, with guardrails, evaluation and cost control.',
    problem: {
      heading: 'The problem',
      paragraphs: [
        'Getting an LLM to do something impressive once is easy. Getting it to do the same thing correctly for a thousand different users, at a cost you can predict, is the actual work.',
        'Most AI projects stall in the same place. The prototype answers well on the five examples someone tried in a notebook. Then it meets real inputs: a scanned PDF, a forwarded email thread with three replies quoted inside it, a question the documents do not answer. It invents something confident and wrong, the token bill climbs, and nobody can tell whether a prompt change made things better or worse.',
        'I build the layer around the model that turns it into software: retrieval so answers come from your material, structure so output is checkable, fallbacks so a slow model never takes the page down, and a way to measure whether a change helped.',
      ],
    },
    includedHeading: 'What the work covers',
    included: [
      {
        title: 'Document parsing that handles real inputs',
        body: 'PDFs, DOCX, spreadsheets, scanned pages and pasted email threads, normalised into one shape before the model sees any of it.',
      },
      {
        title: 'Retrieval over your own content',
        body: 'Answers grounded in your documents rather than the model guessing, with the source cited so a person can check it.',
      },
      {
        title: 'Structured output you can trust',
        body: 'Schema constrained responses, validated before anything is saved, so a malformed answer fails loudly instead of quietly writing bad data.',
      },
      {
        title: 'Agents with real guardrails',
        body: 'Where the model performs operations, it does so through defined tools with permission checks, and intent gets confirmed before anything writes.',
      },
      {
        title: 'Streaming interfaces',
        body: 'Output appears as it is generated rather than after a thirty second wait, with inline editing where that makes sense.',
      },
      {
        title: 'Cost and latency budgets',
        body: 'A per request ceiling, caching for repeated work, and smaller models used where a large one is not earning its price.',
      },
      {
        title: 'Fallbacks and circuit breakers',
        body: 'When a provider is slow or down, the feature degrades instead of taking the page with it.',
      },
      {
        title: 'An evaluation set',
        body: 'A fixed set of real cases with expected outcomes, so you can prove a prompt or model change improved things rather than hoping.',
      },
    ],
    shapesHeading: 'Shapes of project',
    shapesNote:
      'Timelines assume the content or data already exists in some usable form. If step one is cleaning up a decade of documents, that gets scoped separately and honestly.',
    shapes: [
      {
        name: 'Assistant over your own docs',
        scale: 'One content source, one interface',
        timeline: '2 to 4 weeks',
        detail:
          'Retrieval, citations and a chat or search interface. The most common starting point and the fastest to prove value.',
      },
      {
        name: 'Document to draft tool',
        scale: 'Mixed input formats, branded output',
        timeline: '3 to 6 weeks',
        detail:
          'Takes a document or thread in, extracts the fields that matter, and writes a finished output in your voice with a review step before anything is sent.',
      },
      {
        name: 'Agent that performs operations',
        scale: 'Touches live business data',
        timeline: '5 to 10 weeks',
        detail:
          'Creates, updates and deletes real records through defined tools. The guardrails and the permission model are most of the work here, not the prompting.',
      },
      {
        name: 'Multi tenant AI platform',
        scale: 'Several organisations, isolated data',
        timeline: 'Scoped case by case',
        detail:
          'Row level isolation so one tenant can never reach another, even if a prompt tries. This needs a proper look before anyone quotes it.',
      },
    ],
    stepsHeading: 'How it runs',
    steps: commonSteps,
    faqs: [
      {
        q: 'Which model do you use?',
        a: 'Whichever fits the job and the budget, and I keep the choice swappable. I have shipped on the Claude API, OpenAI models and Groq, and the right answer usually varies by task inside one product. Classification and extraction often run fine on a small fast model, while drafting in a specific voice needs a stronger one. Locking a product to a single provider is a risk, so the integration sits behind an interface you can change later.',
      },
      {
        q: 'How do you stop it making things up?',
        a: 'Three things, in order of how much they help. Retrieval, so answers come from your documents rather than the model recalling something plausible. Structured output validated against a schema, so a malformed or invented field fails instead of getting saved. Then a review step in the interface for anything a human should confirm before it leaves the building. No system is perfect, and a product that pretends otherwise is the one that gets you in trouble.',
      },
      {
        q: 'How do you control the cost?',
        a: 'A budget per request, set before the feature ships. Caching for anything repeated, smaller models where a big one is not earning its keep, and retrieval that sends the relevant passages instead of stuffing whole documents into context. I also log token spend per feature so you can see which part of the product is expensive, which is usually not the part people assume.',
      },
      {
        q: 'What happens to our data?',
        a: 'That gets decided before anything is built, because it drives the architecture. Which provider processes what, whether anything is retained, what stays inside your own infrastructure. If your data cannot leave a particular jurisdiction or environment, say so at the start and the design accounts for it. Retrofitting that later usually means rebuilding.',
      },
      {
        q: 'Do we need to fine tune a model?',
        a: 'Almost never, and I will usually argue against it. Retrieval plus good prompting gets you most of the way for a fraction of the cost and none of the maintenance. Fine tuning makes sense for narrow, high volume, stable tasks where you already have clean labelled examples and have measured that prompting is not enough. That is a much smaller set of projects than the amount of talk about it suggests.',
      },
      {
        q: 'What happens when the model changes underneath us?',
        a: 'Providers deprecate versions and behaviour shifts between releases. That is why the evaluation set matters: a fixed group of real cases with expected outcomes that you can rerun against a new model in an afternoon and see what moved. Without one, every upgrade is a gamble. With one, it is a decision.',
      },
      {
        q: 'Can you work on an AI feature inside our existing product?',
        a: 'Yes, and a good share of my work is exactly that. I read the codebase, work to its conventions, and add the feature rather than arriving with an opinion about rewriting everything. I will tell you honestly if something in the existing architecture makes the feature much harder than it needs to be.',
      },
    ],
    guides: ['solo-developer-vs-agency'],
    guidesNote:
      'Worth reading before you hire anyone for AI work, because the gap between a demo and a product is where most of the budget goes.',
    proof: ['the-proposal-maker', 'hice-ai', 'rotishoti-ai'],
  },

  /* ── Full stack web applications ──────────────────────────────── */
  {
    slug: 'full-stack-web-development',
    label: 'Service',
    title: 'Full stack builds',
    metaTitle: 'Full stack web application development',
    metaDescription:
      'One engineer owning the database, the API and the interface. SaaS platforms with billing, tenancy and admin tooling, taken from empty repository to production.',
    keywords: [
      'full stack web application development',
      'SaaS development service',
      'Next.js and FastAPI developer',
      'hire full stack developer Islamabad',
      'MVP development Pakistan',
    ],
    intro:
      'One person owning the schema, the API and the interface. That means fewer handoffs, fewer gaps between the backend and the screen, and a codebase that stays coherent because one head held the whole shape of it.',
    meta: [
      { label: 'Typical timeline', value: '3 to 12 weeks' },
      { label: 'Pricing', value: 'Fixed or monthly' },
    ],
    serviceName: 'Full stack web application development',
    serviceType: 'Software development',
    serviceDescription:
      'Building web applications end to end: database schema, backend services and APIs, authentication, billing, admin tooling and the interface, through to deployment and handover.',
    problem: {
      heading: 'The problem',
      paragraphs: [
        'Most products do not stall on the hard technical problem. They stall on the boring edges nobody demos.',
        'Auth and roles. Multi tenancy that actually isolates. Subscription tiers, failed payments, invoices, refunds. An admin panel somebody on your team can use without asking a developer. Audit trails. The thousand small decisions between a working prototype and something you can charge money for.',
        'I have shipped that part more than any other, which is why I quote it honestly instead of discovering it in week six.',
      ],
    },
    includedHeading: 'What the work covers',
    included: [
      {
        title: 'Schema and service boundaries first',
        body: 'The data model and the shape of the API drawn before any code exists, because getting this wrong is the expensive mistake.',
      },
      {
        title: 'Authentication and roles',
        body: 'Sign in, sessions, password reset, permissions per role, and enforcement at the database rather than only in the interface.',
      },
      {
        title: 'Multi tenancy that isolates',
        body: 'Row level security so one customer can never read another, enforced where it cannot be bypassed by an application bug.',
      },
      {
        title: 'Billing that handles the unhappy path',
        body: 'Subscription tiers, invoices, failed payments, upgrades and cancellations. Webhooks that stay correct when they arrive twice or out of order.',
      },
      {
        title: 'An admin panel people can use',
        body: 'So your team can find a customer, fix a record or check a subscription without opening a database client.',
      },
      {
        title: 'Queues, retries and jobs',
        body: 'Anything slow moved off the request path, with idempotent jobs that survive a bad night rather than losing work.',
      },
      {
        title: 'An interface that feels considered',
        body: 'Real typography and spacing, accessible, and quick on a mid range phone rather than only on a developer laptop.',
      },
      {
        title: 'Deploy, documentation and handover',
        body: 'A repository you own, environment variables documented, and a recorded walkthrough so nobody depends on my memory.',
      },
    ],
    shapesHeading: 'Shapes of project',
    shapesNote:
      'Ranges assume the product is defined well enough to scope. If the shape is still moving, we start with a shorter piece of work to settle it rather than pretending a number means something.',
    shapes: [
      {
        name: 'Internal tool',
        scale: 'One team, no public signup',
        timeline: '2 to 5 weeks',
        detail:
          'Usually replaces a spreadsheet that has outgrown itself. No billing, simpler permissions, fastest path to something useful.',
      },
      {
        name: 'Product MVP',
        scale: 'Public signup, one core workflow',
        timeline: '3 to 6 weeks',
        detail:
          'Auth, the main workflow done properly, and enough admin tooling to run it. Deliberately narrow so it ships.',
      },
      {
        name: 'SaaS platform with billing',
        scale: 'Tiers, tenants, invoices, admin',
        timeline: '6 to 12 weeks',
        detail:
          'The full shape: subscriptions, multi tenancy, roles, webhooks, dashboards and the unhappy paths that decide whether people trust it.',
      },
      {
        name: 'Rescue an existing build',
        scale: 'Half finished codebase',
        timeline: 'Scoped after a read',
        detail:
          'I read what exists first and tell you honestly whether it is worth continuing or worth restarting. That answer is free.',
      },
    ],
    stepsHeading: 'How it runs',
    steps: commonSteps,
    faqs: [
      {
        q: 'What stack do you build on?',
          a: 'Next.js and TypeScript on the front end. FastAPI, Node.js or Nest.js on the backend, depending on what the problem needs and what your team can maintain. PostgreSQL by default, with Redis and a queue when work has to move off the request path. I pick boring, well documented tools on purpose, because you might be hiring someone else to maintain this in two years.',
      },
      {
        q: 'Do I own the code?',
        a: 'Yes, from the first commit. The repository is yours, under your account, and I work in it rather than handing something over at the end. Environment variables come documented with a checked in example file, and the deploy gets recorded on video so nobody is dependent on me remembering how it works.',
      },
      {
        q: 'Can you take over a codebase someone else started?',
        a: 'Often, and it is a real part of my work. I read it first and give you an honest read on whether continuing is cheaper than restarting. Sometimes the existing code is fine and just unfinished. Sometimes the data model makes every future feature expensive and you are better off rebuilding the core while keeping the interface. You get that assessment before you commit to either.',
      },
      {
        q: 'Do you do the design too?',
        a: 'I build interfaces that work and hold a consistent visual system, and I care about typography, spacing and motion. I am not a brand designer. If you need identity work, illustration or a full design system, hire someone who does that all day and I will build faithfully to what they produce.',
      },
      {
        q: 'What will it cost to run?',
        a: 'I size the hosting to what the application actually does and tell you the monthly figure before we start, because a build that costs more to run than it earns is a failed project regardless of how well it works. For most products at launch that number is small. I will flag it early if your requirements push it somewhere expensive.',
      },
      {
        q: 'What about a mobile app?',
        a: 'I build web applications that work properly on a phone, which covers most requirements and costs a fraction of native work. If you genuinely need app store distribution, push notifications or offline use, that is a different project and I would rather say so than sell you a compromise.',
      },
      {
        q: 'How do you handle scope changes?',
        a: 'They happen on every project and the process is simple. I tell you what the change costs and what it moves in the timeline, in writing, before I build it. Small things I usually absorb. Anything meaningful gets quoted so neither of us is guessing when the invoice arrives.',
      },
    ],
    guides: ['solo-developer-vs-agency', 'core-web-vitals-for-content-sites'],
    guidesNote:
      'Two pieces on how I work and what I hold myself to on performance.',
    proof: ['navia', 'javea-denia-rentals', 'janua-financial'],
  },

  /* ── Scraping and data pipelines ──────────────────────────────── */
  {
    slug: 'web-scraping-data-pipelines',
    label: 'Service',
    title: 'Data pipelines',
    metaTitle: 'Web scraping and data pipeline development',
    metaDescription:
      'Collection systems that keep running when a site changes its markup or throttles you. Queued, retried, monitored, and stored in a shape you can query later.',
    keywords: [
      'web scraping developer',
      'data pipeline development service',
      'Python scraping FastAPI Celery',
      'price monitoring scraper',
      'hire scraping developer Islamabad',
    ],
    intro:
      'A script that works today is not a data pipeline. I build collection systems that keep running when a source changes its markup, blocks a request or throttles your range, and that store what they gather in a shape you can actually query.',
    meta: [
      { label: 'Typical timeline', value: '1 to 8 weeks' },
      { label: 'Pricing', value: 'Fixed or monthly' },
    ],
    serviceName: 'Web scraping and data pipeline development',
    serviceType: 'Data engineering',
    serviceDescription:
      'Building resilient data collection systems: scraper architecture, queueing and retries, rate limit handling, layout change recovery, storage schema, monitoring and an API over the results.',
    problem: {
      heading: 'The problem',
      paragraphs: [
        'Anyone can write a scraper that works once. The difficulty is the second month.',
        'A source changes its markup and your selectors return empty strings, silently, for three weeks before someone notices the numbers stopped moving. A rate limit kicks in and jobs start failing without retrying. Storage grows into something nobody can query because the shape was never designed, only accumulated.',
        'What you want is a system that keeps collecting, tells you when it breaks, recovers on its own where it can, and hands you data in a shape that answers questions later rather than only today.',
      ],
    },
    includedHeading: 'What the work covers',
    included: [
      {
        title: 'Source analysis first',
        body: 'What each source exposes, how it changes, whether an API exists that nobody noticed, and what its terms and robots rules allow.',
      },
      {
        title: 'Scraper architecture, not scripts',
        body: 'Extraction separated from scheduling and storage, so a change in one source does not mean rewriting the system.',
      },
      {
        title: 'Queues, retries and idempotency',
        body: 'Thousands of concurrent jobs handled through a queue, with retries and backoff, and jobs safe to run twice without duplicating records.',
      },
      {
        title: 'Rate limit and politeness handling',
        body: 'Requests paced per source, respecting the limits a site sets, so collection stays sustainable rather than getting you blocked.',
      },
      {
        title: 'Layout change detection',
        body: 'Validation on what comes back, so an empty or malformed extraction raises an alert instead of quietly writing nothing for a fortnight.',
      },
      {
        title: 'A storage schema built for querying',
        body: 'Normalised, indexed, and designed around the questions you will ask, including how history and changes over time get recorded.',
      },
      {
        title: 'Monitoring and alerting',
        body: 'Run history, success rates per source, and an alert when a source stops producing. You find out from the system, not from a client.',
      },
      {
        title: 'An API or export over the results',
        body: 'Endpoints for searching and filtering, scheduled exports, or notifications when something matches a rule.',
      },
    ],
    shapesHeading: 'Shapes of project',
    shapesNote:
      'Sources vary enormously in difficulty. A well structured public listing page and a heavily defended single page application are different projects, so I look before quoting.',
    shapes: [
      {
        name: 'One off extract',
        scale: 'A single source, a fixed dataset',
        timeline: '3 to 7 days',
        detail:
          'You need the data once, cleaned and delivered as a file or a table. No scheduling, no monitoring.',
      },
      {
        name: 'Monitored pipeline',
        scale: 'One to three sources, running continuously',
        timeline: '2 to 5 weeks',
        detail:
          'Scheduled collection, retries, alerting when a source breaks, and storage designed for querying. The most common shape.',
      },
      {
        name: 'Monitoring product',
        scale: 'Several sources, alerts to end users',
        timeline: '4 to 8 weeks',
        detail:
          'Everything above plus user facing saved searches and notifications, which turns a pipeline into something you can charge for.',
      },
      {
        name: 'Ingestion for an existing platform',
        scale: 'Many sources, one canonical model',
        timeline: 'Scoped case by case',
        detail:
          'Reconciling several sources that name the same thing differently, into one model where counts can be trusted.',
      },
    ],
    stepsHeading: 'How it runs',
    steps: commonSteps,
    faqs: [
      {
        q: 'Is this legal?',
        a: 'It depends on what you are collecting and from where, and it is worth settling before anyone writes code. I work with publicly accessible data, respect robots rules and rate limits, and keep collection paced so it does not burden the source. What I will not build is anything that needs someone else\'s login, bypasses authentication, or defeats bot protection to get at data that is not public. If your requirement depends on that, I am the wrong person, and I will say so on the first call rather than after you have paid.',
      },
      {
        q: 'What happens when a site changes its layout?',
        a: 'It will, and the system is designed on that assumption. Extraction is validated against what it produces, so a selector that suddenly returns empty raises an alert instead of writing nothing quietly. Extraction logic is also separated per source, so fixing one is a small change rather than a rewrite. On an ongoing arrangement I handle those fixes. On a fixed price build I document how to make them and record a walkthrough.',
      },
      {
        q: 'How do you handle getting blocked?',
        a: 'Mostly by not deserving it. Requests get paced per source, run through a queue rather than in parallel bursts, and back off when a source signals it wants less traffic. Politeness fixes most blocking, because most blocking is a response to volume. Where a source is behind serious bot protection, that is a case by case conversation and sometimes the honest answer is that the data is not reliably available.',
      },
      {
        q: 'How fresh will the data be?',
        a: 'You set that, and it drives the cost. Every fifteen minutes across three sources is a different system from once a day across one. On the monitoring products I have built, alerts reached users within seconds of a match appearing, which meant collection had to run continuously rather than on a schedule. Tell me how fresh it needs to be and I will tell you what that costs to run.',
      },
      {
        q: 'Where does the data live?',
        a: 'Usually PostgreSQL, because you will want to query it in ways you have not thought of yet and a relational schema handles that better than a pile of JSON files. Redis for the queue and for anything needing fast lookup. If you already have a warehouse you want it landing in, I write to that instead.',
      },
      {
        q: 'Can you add this to a product we already run?',
        a: 'Yes. I read your codebase and work to its conventions rather than bolting on something that only I understand. The ingestion side usually sits well as a separate service with a defined interface, which keeps it from tangling with the rest of your application and makes it easier to replace later.',
      },
      {
        q: 'What if an official API exists?',
        a: 'Then we use it, and I will check before quoting a scraper. An API is more stable, cheaper to run and less likely to break, so finding one is the best possible outcome for you even though it makes the project smaller. It happens more often than people expect, because the endpoint powering a site\'s own search is sometimes public and undocumented.',
      },
    ],
    guides: ['solo-developer-vs-agency'],
    guidesNote:
      'On how the work runs and what handover should include, whoever you hire.',
    proof: ['firstdeal', 'navia', 'apple-music-validator'],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
