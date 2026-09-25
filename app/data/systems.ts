import type { SceneGraph } from '@/app/components/scene/engine';

/**
 * Systems, as data.
 *
 * The homepage scene is the shape most of the work takes. Every case study
 * also has its own graph, and each one is drawn from what that project's
 * write up in projects.ts says it does, node for node. Nothing here is a
 * made up component added for the picture.
 */

/* ── The homepage: a typical build ────────────────────────────── */

export const heroSystem: SceneGraph = {
  id: 'typical',
  nodes: [
    { id: 'browser', label: 'Browser', shape: 'box', at: [-330, 40], size: [52, 40, 52], tone: 'sheet',
      sub: 'React, Next.js',
      note: 'Where the product gets judged. Interfaces in React and Next.js, tested on a mid range phone as well as a laptop.' },
    { id: 'edge', label: 'Edge', shape: 'slab', at: [-190, 40], size: [70, 16, 60], tone: 'plate',
      sub: 'CDN, static pages',
      note: 'Static pages and cached responses served close to the visitor. Most requests should end here.' },
    { id: 'next', label: 'Next.js', shape: 'box', at: [-40, 40], size: [78, 66, 78], tone: 'sheet',
      sub: 'App Router',
      note: 'Server rendering, routing and metadata. This is the layer that decides what a search engine sees.' },
    { id: 'api', label: 'API', shape: 'box', at: [120, 40], size: [70, 56, 70], tone: 'sheet',
      sub: 'FastAPI, Node, Go',
      note: 'Services with auth, validation and a clear contract with the front end, in FastAPI, Node or Go.' },
    { id: 'db', label: 'Postgres', shape: 'cylinder', at: [280, -60], size: [70, 56, 70], tone: 'plate',
      sub: 'Schema first',
      note: 'The schema comes first. PostgreSQL, with row level security when tenants must never see each other.' },
    { id: 'llm', label: 'LLM', shape: 'box', at: [120, -160], size: [60, 60, 60], tone: 'sage',
      sub: 'Claude, LLaMA',
      note: 'Claude or LLaMA behind retrieval, guardrails and a cost budget for every request.' },
    { id: 'queue', label: 'Queue', shape: 'stack', at: [120, 200], size: [80, 40, 56], tone: 'plate',
      sub: 'Redis, Celery',
      note: 'Redis and Celery, for work that should never happen while a visitor waits.' },
    { id: 'workers', label: 'Workers', shape: 'box', at: [280, 200], size: [66, 48, 66], tone: 'sheet',
      sub: 'Jobs, scrapers',
      note: 'Scrapers and background jobs with retries, rate limits and recovery when a source changes its markup.' },
    { id: 'web', label: 'Sources', shape: 'slab', at: [430, 200], size: [80, 16, 64], tone: 'cyan',
      sub: 'Sites, APIs',
      note: 'The marketplaces, APIs and sites a system reads from, collected inside their limits.' },
  ],
  edges: [
    { from: 'browser', to: 'edge' },
    { from: 'edge', to: 'next' },
    { from: 'next', to: 'api' },
    { from: 'api', to: 'db' },
    { from: 'api', to: 'llm' },
    { from: 'llm', to: 'db', dashed: true },
    { from: 'api', to: 'queue' },
    { from: 'queue', to: 'workers' },
    { from: 'workers', to: 'web' },
    { from: 'workers', to: 'db' },
  ],
  flows: [
    ['browser', 'edge', 'next', 'api', 'db'],
    ['api', 'queue', 'workers', 'web'],
    ['workers', 'db'],
    ['next', 'api', 'llm'],
    ['browser', 'edge'],
  ],
};

export type Scenario = { id: string; label: string; path: string[]; steps: string[] };

/** Requests a visitor can send through the homepage system. One step per stop. */
export const scenarios: Scenario[] = [
  {
    id: 'page',
    label: 'Load a page',
    path: ['browser', 'edge', 'next', 'api', 'db'],
    steps: [
      'GET /dashboard leaves the browser',
      'the edge has no fresh copy, so it passes the request on',
      'server components render and ask the API for data',
      'session checked, query built',
      'rows come back and the page streams to the browser',
    ],
  },
  {
    id: 'ai',
    label: 'Ask the AI',
    path: ['browser', 'edge', 'next', 'api', 'db', 'llm'],
    steps: [
      'a question is typed into the product',
      'passed straight through, answers are never cached',
      'a streaming response is opened',
      'tenant and rate limits are checked first',
      'the closest documents come out of the vector index',
      'the model answers from what was retrieved, token by token',
    ],
  },
  {
    id: 'scrape',
    label: 'Run a scrape',
    path: ['api', 'queue', 'workers', 'web', 'workers', 'db'],
    steps: [
      'a scheduled job fires',
      'the job waits in Redis until a worker is free',
      'a worker takes it and applies the rate limit for that source',
      'the page is fetched, and a markup change gets caught',
      'listings are parsed and matched against saved searches',
      'matches are stored and the alert goes out',
    ],
  },
];

/* ── Case studies ─────────────────────────────────────────────── */

export const projectSystems: Record<string, SceneGraph> = {
  'the-proposal-maker': {
    id: 'the-proposal-maker',
    nodes: [
      { id: 'inquiry', label: 'Inquiry', shape: 'slab', at: [-300, 20], tone: 'plate', sub: 'PDF, DOCX, email',
        note: 'Upload a PDF, a DOCX or a drawing set, or paste an email thread.' },
      { id: 'app', label: 'Next.js', shape: 'box', at: [-140, 20], tone: 'sheet', sub: 'TypeScript',
        note: 'Takes the inquiry in whatever form it arrives and hands it to the model.' },
      { id: 'claude', label: 'Claude', shape: 'box', at: [30, -110], tone: 'sage', sub: 'Claude API',
        note: 'Reads the documents, pulls out project type, location, contacts and scope, then writes each section.' },
      { id: 'library', label: 'Past proposals', shape: 'cylinder', at: [210, -110], tone: 'plate', sub: 'Postgres, vector search',
        note: "The firm's past proposals, searched for the closest matches so the tone and standard terms stay theirs." },
      { id: 'review', label: 'Review', shape: 'box', at: [30, 140], tone: 'sheet', sub: 'Inline editing',
        note: 'Every extracted field is editable with one click, and sections stream in while you watch.' },
      { id: 'export', label: 'Export', shape: 'slab', at: [210, 140], tone: 'cyan', sub: 'Link, PDF, Word',
        note: 'Sent as a share link, a PDF or a Word file.' },
    ],
    edges: [
      { from: 'inquiry', to: 'app' },
      { from: 'app', to: 'claude' },
      { from: 'claude', to: 'library' },
      { from: 'claude', to: 'review' },
      { from: 'app', to: 'review' },
      { from: 'review', to: 'export' },
    ],
    flows: [['inquiry', 'app', 'claude', 'review', 'export'], ['claude', 'library'], ['app', 'review']],
  },

  firstdeal: {
    id: 'firstdeal',
    nodes: [
      { id: 'markets', label: 'Marketplaces', shape: 'slab', at: [-310, 0], tone: 'cyan', sub: 'Marktplaats, 2dehands, Kleinanzeigen',
        note: 'Marktplaats, 2dehands.be and Kleinanzeigen, watched in real time.' },
      { id: 'scrapers', label: 'Scrapers', shape: 'box', at: [-140, 0], tone: 'sheet', sub: 'Celery workers',
        note: 'Thousands of concurrent scraping jobs, with rate limit handling and recovery when a marketplace changes its markup.' },
      { id: 'redis', label: 'Redis', shape: 'stack', at: [-140, 180], tone: 'plate', sub: 'Broker',
        note: 'Jobs queue here until a worker is free.' },
      { id: 'api', label: 'FastAPI', shape: 'box', at: [40, 0], tone: 'sheet', sub: 'Matching',
        note: 'Every new listing is matched against saved monitors: price, mileage, fuel type, NAP history, import status and more.' },
      { id: 'pg', label: 'Postgres', shape: 'cylinder', at: [40, -180], tone: 'plate', sub: 'Monitors, users',
        note: 'Monitors, accounts, subscriptions and the listings already seen.' },
      { id: 'alerts', label: 'Alerts', shape: 'slab', at: [220, 0], tone: 'sage', sub: 'Telegram, email',
        note: 'An alert the moment a listing matches, which is often minutes before it shows up in normal browsing.' },
      { id: 'dash', label: 'Dashboard', shape: 'box', at: [220, 180], tone: 'sheet', sub: 'Next.js, Stripe',
        note: 'Where traders manage their monitors, with three tier Stripe billing, referrals and PWA support.' },
    ],
    edges: [
      { from: 'markets', to: 'scrapers' },
      { from: 'redis', to: 'scrapers' },
      { from: 'scrapers', to: 'api' },
      { from: 'api', to: 'pg' },
      { from: 'api', to: 'alerts' },
      { from: 'dash', to: 'api' },
    ],
    flows: [['markets', 'scrapers', 'api', 'alerts'], ['redis', 'scrapers'], ['api', 'pg'], ['dash', 'api']],
  },

  'javea-denia-rentals': {
    id: 'javea-denia-rentals',
    nodes: [
      { id: 'visitor', label: 'Visitor', shape: 'box', at: [-290, 0], size: [52, 40, 52], tone: 'sheet', sub: 'Phone, airport',
        note: 'Books a scooter from the airport before they have landed.' },
      { id: 'next', label: 'Next.js', shape: 'box', at: [-120, 0], tone: 'sheet', sub: 'English, Spanish',
        note: 'A fast, search friendly front end in English and Spanish.' },
      { id: 'express', label: 'Express', shape: 'box', at: [50, 0], tone: 'sheet', sub: 'Inventory, calendar',
        note: 'Inventory, pricing rules and the booking calendar, so the availability a visitor sees is real.' },
      { id: 'mongo', label: 'MongoDB', shape: 'cylinder', at: [50, -180], tone: 'plate', sub: 'Fleet, bookings',
        note: 'The fleet, its pricing and every booking.' },
      { id: 'stripe', label: 'Stripe', shape: 'slab', at: [230, 0], tone: 'sage', sub: 'Payment',
        note: 'Takes payment at the moment of booking.' },
      { id: 'email', label: 'Email', shape: 'slab', at: [230, 180], tone: 'plate', sub: 'Confirmation',
        note: 'Confirms the booking automatically.' },
      { id: 'admin', label: 'Admin', shape: 'box', at: [50, 180], tone: 'plate', sub: 'Owner dashboard',
        note: 'The owner runs the fleet and the bookings from here.' },
    ],
    edges: [
      { from: 'visitor', to: 'next' },
      { from: 'next', to: 'express' },
      { from: 'express', to: 'mongo' },
      { from: 'express', to: 'stripe' },
      { from: 'express', to: 'email' },
      { from: 'admin', to: 'express' },
    ],
    flows: [['visitor', 'next', 'express', 'stripe'], ['express', 'mongo'], ['express', 'email'], ['admin', 'express']],
  },

  'hice-ai': {
    id: 'hice-ai',
    nodes: [
      { id: 'user', label: 'Instruction', shape: 'slab', at: [-270, 0], tone: 'plate', sub: 'Plain language',
        note: 'Onboard an employee, log a timesheet or produce a report, asked for in plain language.' },
      { id: 'app', label: 'Next.js', shape: 'box', at: [-110, 0], tone: 'sheet', sub: 'Interface',
        note: 'Replaces a wall of admin screens with one place to ask.' },
      { id: 'intent', label: 'Intent layer', shape: 'box', at: [60, 0], tone: 'sage', sub: 'FastAPI, LangChain',
        note: 'Decides what the user actually wants before anything is written. This is what keeps an AI admin tool safe.' },
      { id: 'agent', label: 'Agent', shape: 'box', at: [220, 0], tone: 'sheet', sub: 'Operations',
        note: 'Performs the operation against the real data model.' },
      { id: 'supabase', label: 'Supabase', shape: 'cylinder', at: [220, -180], tone: 'plate', sub: 'Row level security',
        note: 'Every company is isolated with row level security, so an agent cannot cross a tenant boundary even if a prompt tries.' },
    ],
    edges: [
      { from: 'user', to: 'app' },
      { from: 'app', to: 'intent' },
      { from: 'intent', to: 'agent' },
      { from: 'agent', to: 'supabase' },
    ],
    flows: [['user', 'app', 'intent', 'agent', 'supabase']],
  },

  'janua-financial': {
    id: 'janua-financial',
    nodes: [
      { id: 'docs', label: 'Statements', shape: 'slab', at: [-270, 0], tone: 'plate', sub: 'Scanned, any state',
        note: 'Financial documents in whatever state they arrive.' },
      { id: 'ocr', label: 'OCR', shape: 'box', at: [-110, 0], tone: 'sheet', sub: 'Python',
        note: 'Reads the documents so nobody retypes a number.' },
      { id: 'engine', label: 'Calculations', shape: 'box', at: [60, 0], tone: 'sage', sub: 'FastAPI',
        note: 'More than fifty ratios and metrics, an Altman Z Score, ROI and NPV, with multi currency handling.' },
      { id: 'pg', label: 'Postgres', shape: 'cylinder', at: [60, -180], tone: 'plate', sub: 'Figures',
        note: 'The extracted figures and the analysis built on them.' },
      { id: 'report', label: 'PDF report', shape: 'slab', at: [230, 0], tone: 'cyan', sub: 'With charts',
        note: 'A formatted report with charts, generated programmatically, in minutes rather than an afternoon.' },
      { id: 'app', label: 'Next.js', shape: 'box', at: [60, 180], tone: 'sheet', sub: 'Interface',
        note: 'Where an analyst uploads documents and reads the result.' },
    ],
    edges: [
      { from: 'docs', to: 'ocr' },
      { from: 'ocr', to: 'engine' },
      { from: 'engine', to: 'pg' },
      { from: 'engine', to: 'report' },
      { from: 'app', to: 'engine' },
    ],
    flows: [['docs', 'ocr', 'engine', 'report'], ['engine', 'pg'], ['app', 'engine']],
  },

  'rotishoti-ai': {
    id: 'rotishoti-ai',
    nodes: [
      { id: 'question', label: 'Question', shape: 'slab', at: [-270, 0], tone: 'plate', sub: 'Asked like you talk',
        note: 'Something like cheap karahi near me that is open late.' },
      { id: 'next', label: 'Next.js', shape: 'box', at: [-110, 0], tone: 'sheet', sub: 'Zustand',
        note: 'Keeps the conversation, so a follow up question does not start from zero.' },
      { id: 'api', label: 'FastAPI', shape: 'box', at: [60, 0], tone: 'sheet', sub: 'Budget, location',
        note: 'Narrows the result set by budget and location.' },
      { id: 'search', label: 'Supabase', shape: 'cylinder', at: [60, -180], tone: 'plate', sub: 'Semantic search',
        note: 'Semantic search over restaurant and dish data.' },
      { id: 'groq', label: 'Groq LLaMA', shape: 'box', at: [230, 0], tone: 'sage', sub: 'Fast answers',
        note: 'LLaMA on Groq, for quick responses without an expensive bill per query.' },
    ],
    edges: [
      { from: 'question', to: 'next' },
      { from: 'next', to: 'api' },
      { from: 'api', to: 'search' },
      { from: 'api', to: 'groq' },
    ],
    flows: [['question', 'next', 'api', 'search'], ['next', 'api', 'groq']],
  },

  'apple-music-validator': {
    id: 'apple-music-validator',
    nodes: [
      { id: 'file', label: 'Export', shape: 'slab', at: [-280, 0], tone: 'plate', sub: 'Excel, CSV',
        note: 'The release export, before it is submitted.' },
      { id: 'parser', label: 'Parser', shape: 'box', at: [-120, 0], tone: 'sheet', sub: 'Finds the data',
        note: 'Finds where real data starts on its own and reads the iMusician role format for every contributor.' },
      { id: 'validator', label: 'Validator', shape: 'box', at: [50, 0], tone: 'sage', sub: 'Style guide',
        note: 'Checks against the Apple Music style guide, including duplicates by title, artist and ISRC together.' },
      { id: 'fill', label: 'Autofill', shape: 'box', at: [210, -130], tone: 'sheet', sub: 'Inferred fields',
        note: 'Fills in fields that can be inferred from the data already there.' },
      { id: 'report', label: 'Report', shape: 'slab', at: [210, 110], tone: 'cyan', sub: 'What would fail',
        note: 'Everything that would hold up the release, flagged before submission.' },
    ],
    edges: [
      { from: 'file', to: 'parser' },
      { from: 'parser', to: 'validator' },
      { from: 'validator', to: 'fill' },
      { from: 'validator', to: 'report' },
      { from: 'fill', to: 'report' },
    ],
    flows: [['file', 'parser', 'validator', 'report'], ['validator', 'fill', 'report']],
  },

  'blue-lock-archive': {
    id: 'blue-lock-archive',
    nodes: [
      { id: 'sources', label: 'Fandom, AniList', shape: 'slab', at: [-290, -90], tone: 'cyan', sub: 'Sources',
        note: 'Wiki and AniList content, each value tied to the chapter it came from.' },
      { id: 'build', label: 'Build', shape: 'box', at: [-120, -90], tone: 'sheet', sub: 'Ingest, reconcile',
        note: 'Ingested and reconciled into one data model at build time, with memory and workers capped for a small host.' },
      { id: 'pages', label: 'Static pages', shape: 'stack', at: [50, -90], tone: 'sheet', sub: 'No database read',
        note: 'Dossiers, indexes, squads and a comparison tool, all static, with no database read behind any of them.' },
      { id: 'reader', label: 'Reader', shape: 'box', at: [220, -90], size: [52, 40, 52], tone: 'sheet', sub: 'Browser',
        note: 'Reads everything from static files, and only touches the database to sign in, rate or comment.' },
      { id: 'actions', label: 'Server actions', shape: 'box', at: [50, 110], tone: 'sage', sub: 'Guarded',
        note: 'Each one wrapped in a guard that logs the real failure and returns a clean message.' },
      { id: 'supabase', label: 'Supabase', shape: 'cylinder', at: [220, 110], tone: 'plate', sub: 'Row level security',
        note: 'Accounts, ratings and moderated comments, with row level security on every write.' },
    ],
    edges: [
      { from: 'sources', to: 'build' },
      { from: 'build', to: 'pages' },
      { from: 'pages', to: 'reader' },
      { from: 'reader', to: 'actions' },
      { from: 'actions', to: 'supabase' },
    ],
    flows: [['sources', 'build', 'pages', 'reader'], ['reader', 'actions', 'supabase']],
  },
};

/* ── WordPress, before and after ──────────────────────────────── */

/**
 * At blend 0 this is a WordPress install as a visitor meets it: one tower,
 * and every request climbs all five layers. At blend 1 the theme is gone,
 * Next.js answers the visitor from files, and the rest of the tower stands
 * back as a headless CMS that only editors and the build ever touch.
 */
export const wordpressSystem: SceneGraph = {
  id: 'wordpress',
  nodes: [
    { id: 'visitor', label: 'Visitor', shape: 'box', at: [-300, 30], size: [52, 40, 52], tone: 'sheet' },
    { id: 'mysql', label: 'MySQL', shape: 'cylinder', at: [70, 30], size: [118, 34, 118], tone: 'plate', lift: 0,
      labelSide: true, morph: { at: [250, -120] } },
    { id: 'php', label: 'PHP', shape: 'box', at: [70, 30], size: [120, 22, 120], tone: 'sand', lift: 40,
      labelSide: true, morph: { at: [250, -120] } },
    { id: 'core', label: 'WordPress core', shape: 'box', at: [70, 30], size: [120, 26, 120], tone: 'sheet', lift: 68,
      labelSide: true, morph: { at: [250, -120] },
      chain: ['mysql', 'php', 'core', 'plugins', 'theme'] },
    { id: 'plugins', label: 'Plugins', shape: 'stack', at: [70, 30], size: [120, 38, 120], tone: 'clay', lift: 100,
      labelSide: true, morph: { at: [250, -120] } },
    { id: 'theme', label: 'Theme', shape: 'box', at: [70, 30], size: [120, 22, 120], tone: 'sheet', lift: 144,
      labelSide: true, morph: { at: [250, -120], lift: 144, show: 0 } },
    { id: 'next', label: 'Next.js', shape: 'box', at: [-110, 30], size: [86, 64, 86], tone: 'sage', show: 0,
      morph: { show: 1 } },
  ],
  edges: [
    { from: 'visitor', to: 'core', range: [0, 0.5] },
    { from: 'visitor', to: 'next', range: [0.5, 1] },
    { from: 'core', to: 'next', dashed: true, range: [0.55, 1] },
  ],
  flows: [['visitor', 'core'], ['visitor', 'next'], ['core', 'next']],
  flowRanges: [
    [0, 0.5],
    [0.5, 1],
    [0.7, 1],
  ],
};
