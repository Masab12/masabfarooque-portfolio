export interface ServiceSubItem {
  title: string;
  description: string;
  techStack: string[];
  href: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  pipeline: string[];
  subItems: ServiceSubItem[];
}

export const services: ServiceCategory[] = [
  {
    id: 'full-stack',
    title: 'Full Stack Development',
    shortTitle: 'Full Stack Dev',
    description: 'Complete web applications from database to UI. React, Next.js, Node.js, NestJS, production-ready and scalable.',
    longDescription: 'Full stack development means owning the entire product. From database schema design and API architecture to UI components and deployment pipelines, every layer gets the same attention. I build with Next.js and React on the frontend, Node.js or NestJS on the backend, PostgreSQL and Supabase for data, and Docker for consistent deployments. Projects range from SaaS platforms with multi-tenancy and billing to e-commerce systems with inventory management. Every codebase is structured to be handed off, extended, and maintained without friction.',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    gradientFrom: '#3b82f6',
    gradientTo: '#06b6d4',
    pipeline: ['Requirements', 'Architecture', 'Build', 'Test', 'Deploy'],
    subItems: [
      {
        title: 'React / Next.js Applications',
        description: 'Fast, SEO-ready web apps with App Router, server components, and fluid animations.',
        techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
        href: '/contact?service=nextjs-app',
      },
      {
        title: 'Node.js / NestJS Backend',
        description: 'Structured, modular backends with REST or GraphQL APIs, auth, and role-based access.',
        techStack: ['Node.js', 'NestJS', 'PostgreSQL', 'JWT'],
        href: '/contact?service=node-backend',
      },
      {
        title: 'SaaS Platforms',
        description: 'Multi-tenant SaaS from scratch: auth, subscriptions, dashboards, and admin panels.',
        techStack: ['Next.js', 'FastAPI', 'Stripe', 'Supabase'],
        href: '/contact?service=saas-platform',
      },
      {
        title: 'E-commerce Solutions',
        description: 'Custom storefronts with payment processing, inventory management, and order tracking.',
        techStack: ['Next.js', 'Stripe', 'PostgreSQL', 'Docker'],
        href: '/contact?service=ecommerce',
      },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    shortTitle: 'AI & ML',
    description: 'LangChain agents, RAG pipelines, OpenAI integrations, and production AI systems that actually work at scale.',
    longDescription: 'AI integration goes beyond wrapping an API call. I build RAG pipelines that retrieve accurately from your proprietary data, LangChain and LangGraph agents that plan and execute multi-step tasks, and chatbots that maintain conversation context without ballooning API costs. The stack typically includes OpenAI or Anthropic models, vector databases for semantic search, FastAPI for the inference layer, and Redis for caching. Systems I have shipped handle thousands of queries per day with circuit breaker protection, tiered caching, and structured logging so you can actually debug when something breaks.',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    gradientFrom: '#f97316',
    gradientTo: '#ec4899',
    pipeline: ['Data Ingestion', 'Embeddings', 'Retrieval', 'LLM', 'Response'],
    subItems: [
      {
        title: 'LangChain / LangGraph Agents',
        description: 'Multi-step reasoning agents that plan, use tools, and execute complex workflows autonomously.',
        techStack: ['LangChain', 'LangGraph', 'OpenAI', 'FastAPI'],
        href: '/contact?service=langchain-agents',
      },
      {
        title: 'RAG Pipelines',
        description: 'Retrieval-augmented generation over your documents, databases, or proprietary knowledge bases.',
        techStack: ['pgvector', 'OpenAI', 'FastAPI', 'PostgreSQL'],
        href: '/contact?service=rag-pipeline',
      },
      {
        title: 'OpenAI / Claude Integration',
        description: 'Production-grade LLM integration with streaming, caching, rate limiting, and fallbacks.',
        techStack: ['OpenAI', 'Anthropic', 'Redis', 'Python'],
        href: '/contact?service=llm-integration',
      },
      {
        title: 'AI Chatbots',
        description: 'Context-aware chatbots with memory, personality, and integration into your existing platform.',
        techStack: ['LangChain', 'OpenAI', 'Supabase', 'Next.js'],
        href: '/contact?service=ai-chatbot',
      },
    ],
  },
  {
    id: 'scraping-automation',
    title: 'Scraping & Automation',
    shortTitle: 'Scraping & Automation',
    description: 'Extract data from any site, automate repetitive workflows, and build data pipelines that run reliably on schedule.',
    longDescription: 'Web scraping is not just about getting data once. It is about building systems that run daily, handle site changes, bypass rate limits, and store results cleanly. I use Playwright, Selenium, and Puppeteer depending on the target site complexity, and architect scraping jobs with Celery and Redis so they scale horizontally. Browser automation handles anything that requires logging in, filling forms, or triggering UI events. Data pipelines connect scrapers to databases, transformation layers, and downstream consumers with proper error handling and alerting.',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    gradientFrom: '#22c55e',
    gradientTo: '#14b8a6',
    pipeline: ['Target Site', 'Parse HTML', 'Extract Data', 'Transform', 'Store'],
    subItems: [
      {
        title: 'Web Scraping',
        description: 'Extract structured data from any website with anti-bot bypass and rate limit handling.',
        techStack: ['Playwright', 'Selenium', 'Python', 'PostgreSQL'],
        href: '/contact?service=web-scraping',
      },
      {
        title: 'Browser Automation',
        description: 'Automate login flows, form submissions, file downloads, and complex UI interactions.',
        techStack: ['Playwright', 'Puppeteer', 'Python', 'Redis'],
        href: '/contact?service=browser-automation',
      },
      {
        title: 'Data Pipelines',
        description: 'Scheduled scrapers with Celery workers, transformation layers, and clean database output.',
        techStack: ['Celery', 'Redis', 'FastAPI', 'PostgreSQL'],
        href: '/contact?service=data-pipeline',
      },
      {
        title: 'Workflow Systems',
        description: 'End-to-end automation for business processes: triggers, conditions, notifications, logging.',
        techStack: ['Python', 'Celery', 'Redis', 'FastAPI'],
        href: '/contact?service=workflow-automation',
      },
    ],
  },
  {
    id: 'api-development',
    title: 'API Development',
    shortTitle: 'API Development',
    description: 'Clean, documented, production-ready APIs with FastAPI or NestJS, built for reliability and easy integration.',
    longDescription: 'Good APIs are predictable, fast, and a pleasure to integrate against. I build REST APIs with FastAPI and NestJS that have consistent error shapes, proper HTTP semantics, automatic OpenAPI documentation, and auth baked in from day one. Performance matters: database query optimization, connection pooling, Redis caching for hot paths, and pagination patterns that do not fall apart at scale. Third-party integrations like Stripe, Telegram, Twilio, Google APIs, or anything with a REST endpoint, get wrappers with retry logic, timeout handling, and structured logging so failures are easy to debug.',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
    gradientFrom: '#a855f7',
    gradientTo: '#3b82f6',
    pipeline: ['Design', 'Auth', 'Endpoints', 'Docs', 'Deploy'],
    subItems: [
      {
        title: 'FastAPI Services',
        description: 'High-performance Python APIs with automatic OpenAPI docs, Pydantic validation, and async support.',
        techStack: ['FastAPI', 'Python', 'PostgreSQL', 'Docker'],
        href: '/contact?service=fastapi',
      },
      {
        title: 'NestJS APIs',
        description: 'Enterprise-structured Node.js APIs with decorators, guards, interceptors, and TypeORM.',
        techStack: ['NestJS', 'TypeScript', 'PostgreSQL', 'JWT'],
        href: '/contact?service=nestjs-api',
      },
      {
        title: 'REST API Design',
        description: 'Architecture consulting, versioning strategy, and documentation for existing or new APIs.',
        techStack: ['OpenAPI', 'Postman', 'FastAPI', 'Node.js'],
        href: '/contact?service=api-design',
      },
      {
        title: 'Third-party Integrations',
        description: 'Stripe, Telegram, Twilio, and Google APIs, with clean wrapper layers with retry and error handling.',
        techStack: ['Stripe', 'Telegram', 'Python', 'Node.js'],
        href: '/contact?service=api-integrations',
      },
    ],
  },
];
