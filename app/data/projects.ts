export type ProjectCategory = 'full-stack' | 'ai-ml' | 'scraping' | 'saas';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  imageSrc: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: ProjectCategory;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'navia',
    title: 'Navia',
    description: 'Rare disease intelligence platform aggregating data from 9 global medical sources into a single structured interface.',
    fullDescription: 'Built a full-stack rare disease intelligence platform aggregating data from 9 public sources including ClinicalTrials.gov, Orphanet, PubMed, EuropePMC, Open Targets, EMA EPAR, WHO ICTRP, CTIS, and European Reference Networks into a single structured interface.\n\nThe client needed clinicians, researchers, and pharma sponsors to explore the full ecosystem around any rare disease without bouncing between databases. I built the entire stack from scratch using FastAPI, PostgreSQL, Celery, Redis, and Next.js 14.\n\nThe backend handles 460K+ clinical trials, 270K+ publications, 16K+ gene associations, and 6.5K+ drug records across 10K+ diseases. I built a tiered disease search engine, a snapshot pipeline computing 25+ derived metrics per disease, and an AI summary layer with OpenAI and circuit breaker protection.',
    technologies: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis', 'OpenAI', 'Stripe', 'Docker', 'JWT'],
    features: [
      'Aggregates 460K+ clinical trials and 270K+ publications from 9 global sources',
      'Tiered disease search engine with snapshot pipeline computing 25+ metrics per disease',
      'AI summary layer with OpenAI and circuit breaker protection',
      'Comparison engine supporting up to 5 diseases simultaneously with PDF export',
      'Stripe subscription tiers with JWT auth and magic-link support',
      'GDPR consent management with immutable audit trails and Row Level Security',
      'Admin BI dashboard for ingestion health monitoring and user analytics',
      'Idempotent multi-source ingestion framework with accurate disease matching',
    ],
    challenges: [
      'Designing an idempotent multi-source ingestion framework that maps trial conditions to canonical disease records',
      'Building an accurate disease matching system across 10K+ diseases from heterogeneous sources',
      'Handling 460K+ clinical trials with efficient query performance and tiered caching',
      'Implementing GDPR-compliant audit trails with immutable records at scale',
    ],
    imageSrc: '/projects/Navia-Homepage.png',
    images: [
      '/projects/Navia-Homepage.png',
      '/projects/Navia-Disease-EcoSystem.png',
      '/projects/Navia-Disease-Compare.png',
    ],
    liveUrl: 'https://navia.health',
    category: 'saas',
    featured: true,
  },
  {
    id: 'firstdeal',
    title: 'FirstDeal',
    description: 'Full-stack SaaS platform for the Dutch & German car market, monitors Marktplaats, 2dehands.be, and Kleinanzeigen with instant Telegram and email alerts.',
    fullDescription: 'I built FirstDeal.nl from the ground up as a full-stack SaaS platform for the Dutch and German second-hand car market. The platform monitors Marktplaats, 2dehands.be and Kleinanzeigen in real time and sends instant Telegram and email alerts the moment a new listing matches a user\'s search criteria.\n\nUsers can create highly specific search monitors with filters for price, mileage, fuel type, condition, NAP history, import status, number of doors, horsepower and more. The goal is simple: help car traders and buyers beat the competition to good deals before anyone else sees them.\n\nI built a Python backend with FastAPI and Celery for background scraping jobs, PostgreSQL for data storage, Redis for task queuing and a Next.js frontend. The platform includes a full subscription and billing system with three pricing tiers, a user dashboard for managing monitors, an admin panel, push notifications and a referral system. Also installable as a PWA on mobile. Everything built from scratch, scraper architecture, notification pipeline, and full frontend design.',
    technologies: ['Next.js', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Celery', 'Stripe', 'PWA', 'Telegram API'],
    features: [
      'Real-time monitoring of Marktplaats, 2dehands.be and Kleinanzeigen simultaneously',
      'Instant Telegram and email alerts the moment a matching listing appears',
      'Advanced search filters: price, mileage, fuel type, NAP, import status, doors, horsepower',
      'Full subscription system with three pricing tiers and Stripe billing',
      'User dashboard for managing multiple active monitors',
      'Admin panel for platform oversight and user management',
      'Referral system and push notifications',
      'PWA support, installable on mobile devices',
    ],
    challenges: [
      'Building a scraping system that bypasses rate limits across three separate marketplaces',
      'Managing thousands of concurrent Celery scraping tasks efficiently with Redis',
      'Delivering near-instant notifications with low latency across Telegram and email',
      'Handling dynamic website structures across multiple marketplaces that change frequently',
    ],
    imageSrc: '/projects/FirstDeal-Homepage.png',
    images: [
      '/projects/FirstDeal-Homepage.png',
      '/projects/FirstDeal-Dashboard.png',
      '/projects/FirstDeal-Monitor-Modal.png',
      '/projects/FirstDeal-Monitor-Created.png',
    ],
    liveUrl: 'https://firstdeal.nl',
    category: 'scraping',
    featured: true,
  },
  {
    id: 'hice-ai',
    title: 'Hice.AI',
    description: 'Multi-tenant AI business management platform with intelligent automation.',
    fullDescription: 'An intelligent business management system that uses AI to automate common tasks. Built with multi-tenancy in mind, allowing multiple companies to use the platform securely. Features LangChain agents that understand user intent and perform complex operations like managing employees, tracking time, and generating reports. Implements row-level security through Supabase to ensure data isolation.',
    technologies: ['Next.js', 'FastAPI', 'Supabase', 'LangChain', 'Docker', 'AI Agents'],
    features: [
      'Multi-tenant architecture with complete data isolation',
      'LangChain AI agents for natural language commands',
      'Intent detection system for understanding user requests',
      'Complex CRUD operations for companies, HR, and timesheets',
      'Row-level security via Supabase for data protection',
      'Automated report generation and data analysis',
      'Docker containerization for easy deployment',
    ],
    challenges: [
      'Implementing secure multi-tenancy with row-level security',
      'Building reliable intent detection for AI commands',
      'Managing complex relationships between entities',
      'Ensuring AI agents perform correct operations safely',
    ],
    imageSrc: '/projects/hice-ai.jpg',
    liveUrl: 'https://app.hice.ai/',
    category: 'ai-ml',
    featured: true,
  },
  {
    id: 'javea-denia-rentals',
    title: 'Javea Denia Rentals',
    description: 'Premium scooter & e-bike rental platform for Costa Blanca with online booking.',
    fullDescription: 'A complete vehicle rental platform for tourists exploring Jávea and Dénia on the Costa Blanca. Features real-time availability tracking, secure online payments, and a beautiful showcase of scooters, e-bikes, and fatbikes. Built with Next.js for a fast, SEO-friendly frontend and Express.js backend for handling bookings and inventory management.',
    technologies: ['Next.js', 'Express.js', 'Node.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Real-time vehicle availability and booking system',
      'Secure payment processing with Stripe integration',
      'Multi-language support (English/Spanish) for tourists',
      'Admin dashboard for fleet and booking management',
      'Responsive design optimized for mobile booking',
      'Automated email confirmations and reminders',
      'Dynamic pricing based on rental duration',
    ],
    challenges: [
      'Real-time inventory synchronization across multiple booking channels',
      'Implementing secure payment flow with Stripe',
      'Building intuitive mobile-first booking experience',
      'Managing complex pricing rules and availability calendars',
    ],
    imageSrc: '/projects/javea-denia-rentals.jpg',
    liveUrl: 'https://www.javea-denia-rentals.com/',
    category: 'full-stack',
  },
  {
    id: 'rotishoti-ai',
    title: 'RotiShoti AI',
    description: 'AI-powered food discovery for Pakistani cuisine with smart recommendations.',
    fullDescription: 'An AI-driven food discovery platform built specifically for Pakistani cuisine. Users can search for restaurants and dishes using natural language, get personalized recommendations based on their budget and location, and discover new places to eat. The system uses Groq LLaMA models for fast AI responses and maintains conversation context for better recommendations.',
    technologies: ['Next.js 15', 'FastAPI', 'Supabase', 'OpenAI GPT', 'Tailwind CSS', 'Zustand'],
    features: [
      'Semantic search using AI to understand natural language queries',
      'Budget-based filtering to match user spending preferences',
      'Location-aware recommendations for nearby restaurants',
      'Context memory that remembers user preferences across sessions',
      'Real-time data updates from Supabase',
      'Fast response times using Groq LLaMA models',
    ],
    challenges: [
      'Implementing efficient semantic search across large restaurant databases',
      'Maintaining conversation context while keeping API costs low',
      'Optimizing AI response times for smooth user experience',
      'Handling complex location-based queries with multiple filters',
    ],
    imageSrc: '/projects/rotishoti-ai.jpg',
    category: 'ai-ml',
  },
  {
    id: 'janua-financial',
    title: 'JANUA Financial',
    description: 'Enterprise financial analysis tool for European accounting standards.',
    fullDescription: 'A professional financial analysis platform designed for European businesses. Processes financial documents using OCR, calculates over 50 different financial ratios, and generates comprehensive PDF reports. Includes advanced features like Altman Z-Score for bankruptcy prediction, ROI calculations, and NPV analysis for investment decisions.',
    technologies: ['Next.js', 'FastAPI', 'Python', 'PostgreSQL', 'PDF Processing'],
    features: [
      'OCR processing to extract data from financial PDFs',
      'Calculation of 50+ financial ratios and metrics',
      'Altman Z-Score for bankruptcy risk assessment',
      'ROI and NPV calculations for investment analysis',
      'Professional PDF report generation with charts',
      'Multi-currency support for European markets',
      'Historical data tracking and trend analysis',
    ],
    challenges: [
      'Accurate OCR extraction from various PDF formats',
      'Implementing complex financial formulas correctly',
      'Generating professional-looking PDF reports programmatically',
      'Ensuring calculation accuracy for compliance purposes',
    ],
    imageSrc: '/projects/janua-financial.jpg',
    liveUrl: 'https://janua-financial-analysis-rho.vercel.app/',
    category: 'full-stack',
  },
  {
    id: 'music-validator',
    title: 'Apple Music Metadata Validator',
    description: 'React-based metadata validation tool for VerseOne that checks music files against Apple Music style guide rules before submission.',
    fullDescription: 'Built for VerseOne, a music distribution client. The tool checks music metadata files before they are sent to Apple Music, catching errors that would cause rejections or delays. Users upload CSV or Excel files exported from iMusician or any other distribution platform, and the validator instantly flags everything that needs fixing.\n\nThe parser handles the complex role format used by iMusician, for example "primary:Artist Name;producer:Name", extracting and normalizing each contributor correctly. It also auto-detects where real data starts in Excel files, skipping header rows and empty lines without any manual configuration.\n\nValidation covers Apple Music style guide rules including duplicate detection by comparing title, artist, and ISRC together, missing required fields, incorrect formatting, and data consistency checks. Missing fields that can be inferred from existing data are filled in automatically, reducing manual correction work significantly.',
    technologies: ['React', 'TypeScript', 'Excel Parsing', 'CSV Processing', 'Tailwind CSS'],
    features: [
      'Auto-detects data start row in Excel files, skipping headers and blank rows',
      'Parses complex iMusician role format like "primary:Name;producer:Name"',
      'Auto-fills missing fields when they can be inferred from existing data',
      'Duplicate detection by comparing title, artist, and ISRC together',
      'Full validation against Apple Music style guide requirements',
      'Supports both CSV and Excel file uploads',
      'Instant feedback with clear error descriptions and fix guidance',
    ],
    challenges: [
      'Parsing the iMusician semicolon-separated role format reliably across edge cases',
      'Auto-detecting the real data start row across varied Excel file structures',
      'Implementing Apple Music style guide rules accurately with correct field requirements',
      'Handling deduplication logic across multiple identifier combinations',
    ],
    imageSrc: '/projects/MusicValidator.png',
    category: 'full-stack',
  },
];
