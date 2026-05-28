export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  description: string;
  startingAt: number;
  suffix: string;
  isFeatured: boolean;
  accentColor: string;
  features: string[];
  bestFor: string[];
  ctaLabel: string;
  ctaHref: string;
  hasRetainer: boolean;
  retainerNote?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter Launch',
    tagline: 'Perfect for startups, portfolios, landing pages, and single-page products',
    description: 'A fast and modern single-page website built for businesses that need an online presence quickly without unnecessary complexity.',
    startingAt: 299,
    suffix: '+',
    isFeatured: false,
    accentColor: 'rgb(0,240,255)',
    features: [
      'Modern responsive SPA website',
      'React / Next.js frontend',
      'Clean UI/UX design',
      'Mobile optimized layout',
      'Contact form integration',
      'SEO-ready structure',
      'Fast loading performance',
      'Deployment setup',
      'Basic analytics integration',
      '7 days support after delivery',
    ],
    bestFor: [
      'Personal brands',
      'Startups',
      'Local businesses',
      'MVP launches',
      'Product showcases',
    ],
    ctaLabel: 'Start a Project',
    ctaHref: '/contact?tier=starter',
    hasRetainer: false,
  },
  {
    id: 'scale-stack',
    name: 'Scale Stack',
    tagline: 'Full backend + frontend solution with authentication, database, dashboards, and long-term scalability',
    description: 'A complete production-ready web application designed for real businesses that need user accounts, backend systems, APIs, admin dashboards, and scalable architecture.',
    startingAt: 1200,
    suffix: '+',
    isFeatured: true,
    accentColor: 'rgb(139,92,246)',
    features: [
      'Full frontend + backend development',
      'Authentication system',
      'Database architecture',
      'Admin dashboard',
      'API integrations',
      'Role-based access system',
      'Payment gateway integration',
      'CMS or custom management panels',
      'Optimized performance and security',
      'Deployment and server setup',
      'Bug monitoring and maintenance',
      'Technical documentation',
      '30 days priority support',
    ],
    bestFor: [
      'SaaS platforms',
      'Client portals',
      'Startup products',
      'Dashboards',
      'Subscription systems',
      'Internal business tools',
    ],
    ctaLabel: 'Get a Quote',
    ctaHref: '/contact?tier=scale-stack',
    hasRetainer: true,
    retainerNote: 'Monthly maintenance and scaling support available.',
  },
  {
    id: 'ai-suite',
    name: 'AI Automation Suite',
    tagline: 'Advanced AI-powered platform with agents, automation, workflows, and intelligent integrations',
    description: 'A fully automated AI-integrated platform designed to reduce manual work, automate operations, and create intelligent user experiences.',
    startingAt: 3500,
    suffix: '+',
    isFeatured: false,
    accentColor: 'rgb(249,115,22)',
    features: [
      'Everything in Scale Stack',
      'AI agent integration',
      'OpenAI / Claude / Gemini integrations',
      'RAG pipelines and vector databases',
      'AI chat systems',
      'Automated workflows',
      'AI-powered dashboards',
      'Custom automation systems',
      'LangChain / agent architecture',
      'AI memory and tool calling',
      'CRM or business process automation',
      'Multi-step workflow orchestration',
      'Cloud deployment and scaling',
      'Advanced analytics',
      'Long-term technical support',
    ],
    bestFor: [
      'AI startups',
      'Automation businesses',
      'Customer support systems',
      'Internal AI tools',
      'AI SaaS products',
      'Enterprise workflow automation',
    ],
    ctaLabel: 'Discuss Your AI Project',
    ctaHref: '/contact?tier=ai-suite',
    hasRetainer: true,
    retainerNote: 'Dedicated monthly AI optimization, monitoring, and feature expansion.',
  },
  {
    id: 'custom',
    name: 'Custom Projects',
    tagline: 'Need something different?',
    description: 'Every business has unique requirements. If your project needs custom features, advanced integrations, scaling architecture, or a long-term development partner, pricing can be tailored specifically for your goals.',
    startingAt: 0,
    suffix: 'custom',
    isFeatured: false,
    accentColor: 'rgb(0,240,255)',
    features: [
      'Large-scale SaaS applications',
      'AI agent ecosystems',
      'Game backends',
      'Web scraping systems',
      'Automation infrastructure',
      'API platforms',
      'Startup MVP consulting',
      'Technical architecture planning',
      'Dedicated retainers',
    ],
    bestFor: [
      'Unique or complex requirements',
      'Long-term partnerships',
      'Enterprise projects',
      'Technical consulting',
    ],
    ctaLabel: 'Contact for Pricing',
    ctaHref: '/contact?tier=custom',
    hasRetainer: true,
    retainerNote: 'Scope, timeline, and retainer terms defined together.',
  },
];
