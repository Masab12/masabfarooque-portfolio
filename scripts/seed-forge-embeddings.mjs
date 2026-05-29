/**
 * Generates embeddings for Masab's knowledge base and seeds them into Supabase.
 * Run after setup-forge-db.mjs:  node scripts/seed-forge-embeddings.mjs
 *
 * Uses Xenova/all-MiniLM-L6-v2 (384-dim, runs locally, no API key needed).
 * Downloads ~22MB model on first run — cached in node_modules/.cache afterwards.
 */
import pg from 'pg';
import { pipeline } from '@xenova/transformers';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

// ─── Knowledge chunks ──────────────────────────────────────────────────────
const chunks = [
  {
    topic: 'identity',
    content: `Masab Farooque is a solo full-stack developer and AI engineer from Islamabad, Pakistan (UTC+5). He graduated with a BS in Computer Science from COMSATS University Islamabad in January 2023. He has 5+ years of professional experience, freelancing since 2019. He is a Level 2 Fiverr Seller with 195+ completed orders, a 5.0 rating, and clients across 15+ countries. He works solo — every project is designed, built, and delivered personally by Masab with no subcontracting. He replies within 24 hours regardless of timezone.`,
  },
  {
    topic: 'global_reach',
    content: `Masab has delivered projects for clients in 15+ countries including USA (77 orders), India (10), Canada (8), Netherlands (4), UK, Germany, Italy, Hong Kong, and Portugal. He communicates in English and works across all timezones. He uses milestone-based delivery for all projects.`,
  },
  {
    topic: 'awards_background',
    content: `Masab won the Best Mechanics Award at the Rookie Game Jam 2022 (Mindstorm Studios) for Titanic Rescue, which was selected for incubation. He placed Runner-Up at Developers Game Jam 2.0 with Food Planet, and won The Hustler Award at Epiphany Games 2020. He completed internships at Mindstorm Studios in 2021, 2022, and 2023. He worked as a Unity game developer at 10Static Studios in 2020. He competed in 7 national game jams across Pakistan.`,
  },
  {
    topic: 'tech_stack_frontend_backend',
    content: `Masab's frontend stack: React 18+, Next.js 14/15/16 with App Router, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui. Backend stack: Node.js, NestJS, FastAPI (Python), Express.js, Django. He builds production-ready applications with server components, streaming, and edge-ready architecture.`,
  },
  {
    topic: 'tech_stack_ai_ml',
    content: `Masab's AI/ML stack: LangChain, LangGraph, OpenAI (GPT-4o, o1), Anthropic Claude, Google Gemini, Groq, pgvector, ChromaDB, Pinecone, CrewAI. He builds RAG pipelines, multi-step reasoning agents with tool use, streaming LLM integrations with circuit breaker protection, AI chatbots with conversation memory, function calling, and production AI systems handling thousands of queries per day.`,
  },
  {
    topic: 'tech_stack_databases_infra',
    content: `Masab's database and infrastructure stack: PostgreSQL, Supabase (pgvector + auth + storage + edge functions), MongoDB, Redis, SQLite. Infrastructure: Docker, Docker Compose, Nginx, PM2, Celery, Celery Beat. He handles full deployment pipelines, container orchestration, and server setup.`,
  },
  {
    topic: 'tech_stack_scraping_integrations',
    content: `Masab's scraping stack: Playwright, Selenium, BeautifulSoup, Scrapy, Puppeteer, rotating proxies, anti-bot bypass. Integration experience: Stripe (payments + webhooks), Telegram Bot API, Twilio, SendGrid, Resend, EmailJS, Google OAuth, GitHub OAuth. He builds scrapers that handle rate limits, CAPTCHA bypass, and run reliably on schedule with Celery task queues.`,
  },
  {
    topic: 'service_full_stack',
    content: `Full Stack Development service ($299+): Masab builds complete web applications from database to UI. Sub-services: React/Next.js Applications (App Router, server components, animations), Node.js/NestJS Backend (REST/GraphQL, auth, RBAC), SaaS Platforms (multi-tenant, subscriptions, dashboards), E-commerce (custom storefronts, Stripe, inventory). Pipeline: Requirements → Architecture → Build → Test → Deploy.`,
  },
  {
    topic: 'service_ai_ml',
    content: `AI & Machine Learning service ($3,500+): Masab builds production AI systems. Sub-services: LangChain/LangGraph Agents (multi-step reasoning, tool use, workflows), RAG Pipelines (document retrieval over proprietary data), OpenAI/Claude Integration (streaming, caching, rate limits, fallbacks), AI Chatbots (context-aware, memory, platform integration). Pipeline: Data Ingestion → Embeddings → Retrieval → LLM → Response.`,
  },
  {
    topic: 'service_scraping_automation',
    content: `Scraping & Automation service ($299+): Masab builds reliable data extraction systems. Sub-services: Web Scraping (structured data extraction, anti-bot bypass), Browser Automation (login flows, form fills, UI interactions), Data Pipelines (Celery workers, transformation, database output), Workflow Automation (triggers, conditions, notifications, logging). Pipeline: Target Site → Parse HTML → Extract Data → Transform → Store.`,
  },
  {
    topic: 'service_api_development',
    content: `API Development service ($299+): Masab builds clean, documented, production-ready APIs. Sub-services: FastAPI Services (OpenAPI docs, Pydantic validation, async), NestJS APIs (guards, interceptors, TypeORM), REST API Design (architecture consulting, versioning, docs), Third-party Integrations (Stripe, Telegram, Twilio, Google APIs with retry logic). Pipeline: Design → Auth → Endpoints → Docs → Deploy.`,
  },
  {
    topic: 'pricing_starter',
    content: `Starter Launch pricing tier: Starting at $299+. Best for personal brands, startups, local businesses, MVP launches, product showcases. Includes: Modern responsive SPA website, React/Next.js frontend, clean UI/UX design, mobile optimized layout, contact form integration, SEO-ready structure, fast loading performance, deployment setup, basic analytics integration, 7 days support after delivery.`,
  },
  {
    topic: 'pricing_scale_stack',
    content: `Scale Stack pricing tier (most popular): Starting at $1,200+. Best for SaaS platforms, client portals, startup products, dashboards, subscription systems, internal business tools. Includes: Full frontend + backend development, authentication system, database architecture, admin dashboard, API integrations, role-based access system, payment gateway integration, CMS or custom management panels, optimized performance and security, deployment and server setup, bug monitoring and maintenance, technical documentation, 30 days priority support. Monthly maintenance retainer available.`,
  },
  {
    topic: 'pricing_ai_suite',
    content: `AI Automation Suite pricing tier: Starting at $3,500+. Best for AI startups, automation businesses, customer support systems, internal AI tools, AI SaaS products, enterprise workflow automation. Includes everything in Scale Stack plus: AI agent integration, OpenAI/Claude/Gemini integrations, RAG pipelines and vector databases, AI chat systems, automated workflows, AI-powered dashboards, LangChain/LangGraph architecture, AI memory and tool calling, CRM automation, multi-step workflow orchestration, cloud deployment, advanced analytics, long-term technical support. Monthly AI optimization retainer available.`,
  },
  {
    topic: 'pricing_custom',
    content: `Custom Projects: Price on request. For unique or complex requirements, long-term partnerships, enterprise projects, technical consulting. Covers: large-scale SaaS applications, AI agent ecosystems, game backends, web scraping systems, automation infrastructure, API platforms, startup MVP consulting, technical architecture planning, dedicated retainers. Scope, timeline, and retainer terms defined together.`,
  },
  {
    topic: 'portfolio_navia',
    content: `Navia is a rare disease intelligence platform built by Masab. Stack: Next.js 14, FastAPI, PostgreSQL, Celery, Redis, OpenAI, Stripe, Docker. It aggregates 460K+ clinical trials, 270K+ publications, 16K+ gene associations, and 6.5K+ drug records across 10K+ diseases from 9 global medical sources (ClinicalTrials.gov, Orphanet, PubMed, EuropePMC, WHO ICTRP, EMA EPAR, CTIS, Open Targets, European Reference Networks). Features: tiered disease search, snapshot pipeline with 25+ metrics, AI summaries with circuit breaker protection, comparison engine for up to 5 diseases, PDF export, multi-tenant SaaS with Stripe billing.`,
  },
  {
    topic: 'portfolio_firstdeal',
    content: `FirstDeal is a real estate listing monitoring SaaS built by Masab. Stack: Playwright, PostgreSQL, Celery, Redis, Next.js. It monitors thousands of real estate listings in real time across multiple regions, alerting users when listings matching their criteria appear. Features: automated scraping, real-time monitoring dashboard, notification system, user management.`,
  },
  {
    topic: 'portfolio_other',
    content: `Other projects by Masab: HICE AI — multilingual AI business management system (LangChain agents, OpenAI, FastAPI, PostgreSQL) for complete business automation with multilingual support. Janua Financial — financial analysis platform with OCR pipeline (FastAPI, PostgreSQL, Next.js). Javea Denia Rentals — vehicle rental platform (Next.js, Node.js, PostgreSQL, Stripe). RotishoTi AI — AI-powered food discovery platform (LangChain, OpenAI, Next.js, FastAPI). Music Validator — music metadata and audio validation tool (Python, FastAPI).`,
  },
  {
    topic: 'what_masab_does_not_do',
    content: `Masab does NOT do: design-only work (no Figma/branding without a development project), WordPress/Wix/Webflow/Squarespace or any no-code/low-code platform, pure copywriting or content creation, unrealistic rush jobs that compromise quality, mobile app development (no React Native, Flutter, Swift, Kotlin), desktop app development (no Electron or native), hardware/IoT/embedded systems, blockchain/Web3/NFT projects, pure DevOps or infrastructure management without a development component.`,
  },
  {
    topic: 'work_style_timelines',
    content: `Masab's work style: solo developer (no subcontracting), milestone-based delivery, 24-hour response time, English-only communication. Typical timelines: Landing page/SPA 3–7 days, Full web app (medium scope) 2–4 weeks, SaaS platform 4–8 weeks, AI integration project 3–6 weeks, Large scraping platform 2–4 weeks, Complex AI agent ecosystem 6–12 weeks.`,
  },
  {
    topic: 'website_contact',
    content: `Masab's website: masabfarooque.com. Pages: Home (hero, services, projects, tech stack, social proof), About (/about-masab — background, timeline, awards, skills), Services (/services — full service breakdown), Portfolio (/portfolio — all projects with case studies), Pricing (/pricing — tier comparison), Contact (/contact — direct contact form), Forge (/forge — this AI project scoping tool). Email: masabfarooque1122@gmail.com. Fiverr: fiverr.com/p_scribbles. Upwork: upwork.com/freelancers/~01e34b32d5b254495d. GitHub: github.com/Masab12. LinkedIn: linkedin.com/in/masabfarooque.`,
  },
  {
    topic: 'forge_tool',
    content: `Forge is an AI project scoping bot embedded in Masab's portfolio at masabfarooque.com/forge. It guides clients through a 10-message structured conversation across 4 phases: Identity (name + email + project idea), Discovery (technical follow-ups), Constraints (timeline, budget, requirements), and Brief generation. At the end it produces a structured JSON brief with features, milestones, tech stack recommendation, and timeline estimate — and sends it directly to Masab's inbox via email.`,
  },
];

// ─── Embed and seed ─────────────────────────────────────────────────────────
console.log('Loading embedding model (Xenova/all-MiniLM-L6-v2)...');
const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
console.log('Model loaded. Generating embeddings for', chunks.length, 'chunks...');

// Clear existing rows
await pool.query('delete from forge_knowledge');

let seeded = 0;
for (const chunk of chunks) {
  const output = await embedder(chunk.content, { pooling: 'mean', normalize: true });
  const embedding = Array.from(output.data);

  await pool.query(
    'insert into forge_knowledge (topic, content, embedding) values ($1, $2, $3)',
    [chunk.topic, chunk.content, JSON.stringify(embedding)]
  );
  seeded++;
  process.stdout.write(`\r  ${seeded}/${chunks.length} embedded`);
}

console.log(`\n✓ Seeded ${seeded} knowledge chunks into forge_knowledge.`);
await pool.end();
