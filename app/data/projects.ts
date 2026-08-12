export type ProjectCategory = 'saas' | 'ai' | 'data' | 'product';

export const categoryLabels: Record<ProjectCategory, string> = {
  saas: 'SaaS platform',
  ai: 'AI system',
  data: 'Data engineering',
  product: 'Product build',
};

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: ProjectCategory;
  /** One line, used in cards and meta descriptions. */
  summary: string;
  /** Full narrative, one entry per paragraph. */
  overview: string[];
  role: string;
  stack: string[];
  features: string[];
  challenges: string[];
  metrics?: { value: string; label: string }[];
  cover: string;
  images: string[];
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'navia',
    title: 'Navia',
    client: 'Health data company',
    year: '2026',
    category: 'saas',
    summary:
      'A rare disease intelligence platform that pulls nine global medical sources into one searchable interface.',
    overview: [
      'Clinicians, researchers and pharma sponsors were losing whole days moving between ClinicalTrials.gov, Orphanet, PubMed, EuropePMC, Open Targets, EMA EPAR, WHO ICTRP, CTIS and the European Reference Networks. Every source names diseases differently, so nothing lined up. Navia was built to end that.',
      'I built the entire stack from an empty repository. FastAPI and PostgreSQL hold the data, Celery and Redis run ingestion, and a Next.js front end presents it. The ingestion framework is idempotent, so a rerun never duplicates a record, and every trial condition is mapped back to a canonical disease so counts can be trusted.',
      'On top of that sits a snapshot pipeline that computes more than twenty five derived metrics per disease, a comparison engine for up to five diseases at once with PDF export, and an AI summary layer with circuit breaker protection so a slow model never takes the page down with it.',
    ],
    role: 'Sole engineer. Architecture, backend, data pipeline, front end and deployment.',
    stack: [
      'Next.js 14',
      'FastAPI',
      'PostgreSQL',
      'Celery',
      'Redis',
      'OpenAI',
      'Stripe',
      'Docker',
      'JWT',
    ],
    features: [
      'Ingestion from nine public medical sources, normalised into one disease model',
      'Tiered search across more than ten thousand diseases',
      'Snapshot pipeline computing twenty five plus metrics per disease',
      'Side by side comparison of up to five diseases with PDF export',
      'AI summaries with circuit breaker protection and graceful fallback',
      'Stripe subscription tiers, JWT auth and magic link sign in',
      'GDPR consent handling with immutable audit trails and row level security',
      'Admin dashboard for ingestion health and user analytics',
    ],
    challenges: [
      'Matching disease names across sources that all use different vocabularies',
      'Keeping queries fast against four hundred and sixty thousand trials',
      'Making ingestion safe to rerun at any time without duplicating records',
      'Writing GDPR audit records that stay immutable under load',
    ],
    metrics: [
      { value: '460K+', label: 'Clinical trials indexed' },
      { value: '270K+', label: 'Publications' },
      { value: '10K+', label: 'Diseases covered' },
      { value: '9', label: 'Source integrations' },
    ],
    cover: '/projects/Navia-Homepage.webp',
    images: [
      '/projects/Navia-Homepage.webp',
      '/projects/Navia-Disease-EcoSystem.webp',
      '/projects/Navia-Disease-Compare.webp',
    ],
    liveUrl: 'https://navia.health',
  },
  {
    slug: 'the-proposal-maker',
    title: 'The Proposal Maker',
    client: 'Engineering studio',
    year: '2026',
    category: 'ai',
    summary:
      'Drop in an RFP or an email thread and watch a branded, ready to send proposal write itself section by section.',
    overview: [
      'Engineering firms lose hours rewriting the same proposal. The scope changes, the client changes, but the structure and the standard terms rarely do. The Proposal Maker takes the inquiry in whatever form it arrives and produces a finished document in the firm voice.',
      'Upload a PDF, a DOCX, a drawing set, or paste an email thread. Claude reads the documents and surfaces project type, location, contacts and scope details. Every extracted field is editable with one click, so a wrong address never reaches the client.',
      'The tool then pulls the closest matches from the firm past proposal library and writes with the tone, structure and standard terms the firm actually uses. The proposal builds section by section in real time while you watch, and you can edit inline before sending it as a share link, a PDF or a Word file.',
    ],
    role: 'External engineer on the product team. Document parsing, retrieval, streaming generation and interface.',
    stack: ['Next.js', 'TypeScript', 'Claude API', 'PostgreSQL', 'Vector search', 'Tailwind CSS'],
    features: [
      'Accepts PDF, DOCX, drawing sets and pasted email threads',
      'Claude reads the inquiry and extracts project type, location, contacts and scope',
      'Every extracted field is reviewable and correctable in one click',
      'Retrieval over the firm past proposals so the voice and terms stay consistent',
      'Sections stream in as they are written, with inline editing',
      'Export as a share link, PDF or Word file',
    ],
    challenges: [
      'Parsing wildly different input formats without a separate path for each one',
      'Keeping the generated voice close to the firm existing proposals rather than generic',
      'Streaming long documents without the interface stuttering or losing edits',
      'Making the review step fast enough that people actually use it',
    ],
    metrics: [
      { value: '4', label: 'Steps from inquiry to send' },
      { value: 'Any', label: 'Input format accepted' },
      { value: 'Live', label: 'Section by section writing' },
    ],
    cover: '/projects/TheProposalMaker.webp',
    images: ['/projects/TheProposalMaker.webp'],
    featured: true,
  },
  {
    slug: 'firstdeal',
    title: 'FirstDeal',
    client: 'Netherlands agency',
    year: '2026',
    category: 'data',
    summary:
      'A monitoring SaaS for the Dutch and German car market that alerts traders the second a matching listing appears.',
    overview: [
      'Car traders win on speed. FirstDeal watches Marktplaats, 2dehands.be and Kleinanzeigen in real time and pushes a Telegram or email alert the moment a listing matches a saved search, which is often minutes before the listing surfaces in normal browsing.',
      'Users build precise monitors filtered on price, mileage, fuel type, condition, NAP history, import status, doors and horsepower. Behind that sits a FastAPI and Celery backend on Redis running thousands of concurrent scraping jobs, with rate limit handling and recovery when a marketplace changes its markup.',
      'I built the whole product: scraper architecture, notification pipeline, three tier Stripe billing, user dashboard, admin panel, referral system, push notifications, PWA support and the front end design.',
    ],
    role: 'Sole engineer, brought in as an external resource. Scrapers, backend, billing, front end.',
    stack: ['Next.js', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Celery', 'Stripe', 'Telegram API'],
    features: [
      'Real time monitoring across three marketplaces at once',
      'Telegram and email alerts within seconds of a match',
      'Deep filters including NAP history, import status and horsepower',
      'Three subscription tiers with Stripe billing and invoices',
      'Dashboard for managing many active monitors',
      'Admin panel, referral system and push notifications',
      'Installable as a PWA on mobile',
    ],
    challenges: [
      'Staying inside rate limits on three marketplaces with different defences',
      'Scheduling thousands of concurrent Celery jobs without starving the queue',
      'Keeping alert latency low enough to be worth paying for',
      'Recovering automatically when a marketplace changes its page structure',
    ],
    metrics: [
      { value: '3', label: 'Marketplaces watched' },
      { value: '1000s', label: 'Concurrent scrape jobs' },
      { value: '3', label: 'Billing tiers shipped' },
    ],
    cover: '/projects/FirstDeal-Homepage.webp',
    images: [
      '/projects/FirstDeal-Homepage.webp',
      '/projects/FirstDeal-Dashboard.webp',
      '/projects/FirstDeal-Monitor-Modal.webp',
      '/projects/FirstDeal-Monitor-Created.webp',
    ],
    liveUrl: 'https://firstdeal.nl',
    featured: true,
  },
  {
    slug: 'hice-ai',
    title: 'Hice.AI',
    client: 'Business software company',
    year: '2025',
    category: 'ai',
    summary:
      'A multi tenant business management platform where AI agents run the operations work that used to be forms.',
    overview: [
      'The platform replaces a wall of admin screens with instructions in plain language. Ask it to onboard an employee, log a timesheet or produce a report and an agent performs the operation against the real data model.',
      'Multi tenancy was the hard requirement. Every company on the platform is fully isolated through row level security in Supabase, so an agent can never reach across a tenant boundary even if a prompt tries to make it.',
      'The intent layer decides what the user actually wants before anything is written, which is what keeps an AI driven admin tool from being dangerous.',
    ],
    role: 'Full stack engineer. Agent layer, backend and interface.',
    stack: ['Next.js', 'FastAPI', 'Supabase', 'LangChain', 'Docker'],
    features: [
      'Multi tenant architecture with complete data isolation',
      'Agents that carry out real create, update and delete operations',
      'Intent detection before any write happens',
      'Row level security enforced at the database, not the application',
      'Automated reporting and analysis',
      'Containerised deployment',
    ],
    challenges: [
      'Making agent actions safe when they touch production business records',
      'Reliable intent detection across loosely worded requests',
      'Modelling relationships that stay correct across tenants',
    ],
    cover: '/projects/hice-ai.webp',
    images: ['/projects/hice-ai.webp'],
    liveUrl: 'https://app.hice.ai/',
  },
  {
    slug: 'janua-financial',
    title: 'JANUA Financial',
    client: 'Financial analysis firm',
    year: '2025',
    category: 'product',
    summary:
      'Financial analysis for European accounting standards, from scanned statements to a report you can hand to a board.',
    overview: [
      'The tool takes financial documents in whatever state they arrive, reads them with OCR, and turns them into more than fifty ratios and metrics without anyone retyping a number.',
      'On top of the raw ratios it runs an Altman Z Score for bankruptcy risk, ROI and NPV for investment decisions, and multi currency handling for European markets.',
      'The output is a formatted PDF report with charts, generated programmatically, so an analysis that used to take an afternoon in a spreadsheet takes a few minutes.',
    ],
    role: 'Full stack engineer. OCR pipeline, calculation engine and reporting.',
    stack: ['Next.js', 'FastAPI', 'Python', 'PostgreSQL', 'OCR', 'PDF generation'],
    features: [
      'OCR extraction from mixed quality financial PDFs',
      'Over fifty ratios and metrics computed per statement',
      'Altman Z Score for bankruptcy risk',
      'ROI and NPV analysis for investment decisions',
      'Formatted PDF reports with charts',
      'Multi currency support for European markets',
      'Historical tracking and trend analysis',
    ],
    challenges: [
      'Reliable extraction across inconsistent document layouts',
      'Getting every formula right when the output informs real decisions',
      'Producing PDF reports that look designed rather than generated',
    ],
    cover: '/projects/JANUAFinancial.webp',
    images: ['/projects/JANUAFinancial.webp'],
    liveUrl: 'https://janua-financial-analysis-rho.vercel.app/',
  },
  {
    slug: 'rotishoti-ai',
    title: 'RotiShoti AI',
    client: 'Independent build',
    year: '2025',
    category: 'ai',
    summary:
      'Food discovery for Pakistani cuisine where you describe what you feel like eating and it answers properly.',
    overview: [
      'Most restaurant search is a filter list. RotiShoti lets people ask the way they actually talk, something like cheap karahi near me that is open late, and returns places that fit.',
      'Semantic search runs over the restaurant and dish data, with budget and location narrowing the result set. Conversation context carries between turns so a follow up question does not start from zero.',
      'It runs on Groq LLaMA models for fast responses with Supabase behind it, which keeps the experience quick without an expensive per query bill.',
    ],
    role: 'Sole builder. Data model, retrieval, AI layer and interface.',
    stack: ['Next.js 15', 'FastAPI', 'Supabase', 'Groq', 'Zustand', 'Tailwind CSS'],
    features: [
      'Natural language search across restaurants and dishes',
      'Budget aware filtering',
      'Location aware recommendations',
      'Conversation memory across turns',
      'Live data from Supabase',
    ],
    challenges: [
      'Semantic search that stays fast as the dataset grows',
      'Holding context without the token bill climbing',
      'Location queries combined with several other filters at once',
    ],
    cover: '/projects/RotiShotiAi.webp',
    images: ['/projects/RotiShotiAi.webp'],
  },
  {
    slug: 'javea-denia-rentals',
    title: 'Javea Denia Rentals',
    client: 'Netherlands agency',
    year: '2025',
    category: 'product',
    summary:
      'A scooter and e-bike rental platform for Costa Blanca tourists, with live availability and online payment.',
    overview: [
      'Holiday rental businesses lose bookings to the phone. This platform puts the whole fleet online with real availability, so a visitor can book a scooter from the airport before they land.',
      'Next.js handles a fast, search friendly front end in English and Spanish. An Express backend manages inventory, pricing rules and the booking calendar, with Stripe taking payment and automated email confirming it.',
      'The owner gets an admin dashboard for fleet and bookings, which is what turned it from a brochure site into the way the business runs.',
    ],
    role: 'Sole engineer, brought in as an external resource.',
    stack: ['Next.js', 'Express.js', 'Node.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Live availability and online booking',
      'Stripe payments with automated confirmations',
      'English and Spanish for visiting tourists',
      'Admin dashboard for fleet and bookings',
      'Pricing that adjusts with rental duration',
      'Built mobile first, since most bookings happen on a phone',
    ],
    challenges: [
      'Keeping inventory in sync across booking channels',
      'Pricing rules that change with season and duration',
      'A booking flow short enough to finish on a phone in a queue',
    ],
    cover: '/projects/javea-denia-rentals.webp',
    images: ['/projects/javea-denia-rentals.webp'],
    liveUrl: 'https://www.javea-denia-rentals.com/',
    featured: true,
  },
  {
    slug: 'apple-music-validator',
    title: 'Apple Music Metadata Validator',
    client: 'Music distributor',
    year: '2025',
    category: 'product',
    summary:
      'Catches the metadata errors that get music releases rejected, before they ever reach Apple Music.',
    overview: [
      'The client distributes music, and a single malformed field can hold up a release for days. This tool checks an export before it is submitted and flags everything that would fail.',
      'The parser handles the role format used by iMusician, for example primary:Artist Name;producer:Name, and normalises each contributor. It also finds where real data starts in an Excel file on its own, skipping header rows and blank lines without configuration.',
      'Validation follows the Apple Music style guide, including duplicate detection by title, artist and ISRC together. Fields that can be inferred from existing data are filled in automatically, which removes most of the manual correction work.',
    ],
    role: 'Sole builder.',
    stack: ['React', 'TypeScript', 'Excel parsing', 'CSV processing', 'Tailwind CSS'],
    features: [
      'Finds the real data start row in Excel files automatically',
      'Parses the iMusician semicolon role format',
      'Fills in missing fields that can be inferred',
      'Duplicate detection on title, artist and ISRC together',
      'Full Apple Music style guide checks',
      'Clear errors with the fix stated next to them',
    ],
    challenges: [
      'Role strings that vary in every export',
      'Detecting the data start row across very different file structures',
      'Deduplication across several identifier combinations',
    ],
    cover: '/projects/MusicValidator.webp',
    images: ['/projects/MusicValidator.webp'],
  },
  {
    slug: 'blue-lock-archive',
    title: 'Blue Lock Archive',
    client: 'Independent build',
    year: '2026',
    category: 'product',
    summary:
      'A reference database for the Blue Lock manga and anime, where nothing goes on a page unless it can be traced back to the chapter it was stated in.',
    overview: [
      'Wiki content usually means whatever the last editor felt like writing. Blue Lock Archive runs on a stricter rule. Rankings, ages and stats in a sports manga shift constantly, so every value cites the chapter it came from. A reference nobody can check is not a reference.',
      'Content comes from the Fandom wiki and AniList, ingested and reconciled into one data model at build time rather than served live. Player dossiers, chapter and episode indexes, national squads and a head to head comparison tool all render as static pages, with no database read behind any of them. The database exists for the one part that actually needs to be live: accounts, ratings and moderated comments. Each of those goes through Supabase row level security, so a write can never land outside the account that made it, whatever the application code assumes.',
      'It runs on a small self hosted box. That meant tuning the build itself, capping memory and worker count so hundreds of static pages finish generating without exhausting the host. It also meant wrapping every server action in a guard that logs the real failure and returns a clean message, rather than letting one bad write take a content page down with it.',
    ],
    role: 'Sole builder. Content ingestion pipeline, database schema, community layer and self hosted deployment.',
    stack: ['Next.js 16', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row level security', 'Tailwind CSS'],
    features: [
      'Player dossiers for every character, with every stat traced to the chapter it was stated in',
      'Interactive rankings that replay the programme shifting order across every recorded chapter',
      'Chapter and episode indexes with release dates and a head to head player comparison tool',
      'Reader ratings and moderated comments, gated behind Supabase auth',
      'Database level row level security, so a rating or comment can never write outside its own account',
      'Admin tools for reviewing comments and suspending members, kept out of the public site entirely',
      'Content ingested from the Fandom wiki and AniList, reconciled into one model rather than mirrored',
    ],
    challenges: [
      'Making every stated fact traceable to its source chapter without the page turning into a wall of citations',
      'Enforcing that a rating or comment can never write outside its owner, at the database level rather than trusting the application',
      'Fitting a production build for eight hundred plus static pages onto a small self hosted box without exhausting memory',
      'Keeping the community layer from ever taking a content page down with it when something in Supabase fails',
    ],
    metrics: [
      { value: '212', label: 'Player profiles' },
      { value: '356', label: 'Chapters indexed' },
      { value: '41', label: 'Episodes tracked' },
    ],
    cover: '/projects/BlueLockArchive-Homepage.webp',
    images: [
      '/projects/BlueLockArchive-Homepage.webp',
      '/projects/BlueLockArchive-PlayerDossier.webp',
      '/projects/BlueLockArchive-Rankings.webp',
    ],
    liveUrl: 'https://bluelockarchive.com',
  },
];

// Homepage lead order, independent of where each project sits in the list above.
const featuredOrder = ['firstdeal', 'javea-denia-rentals', 'the-proposal-maker'];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
