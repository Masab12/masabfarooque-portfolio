export type MarkName = 'stack' | 'core' | 'flow' | 'vault' | 'frame' | 'bearing';

export interface Capability {
  index: string;
  title: string;
  mark: MarkName;
  description: string;
  tools: string[];
}

/** The long form list, used on the about page. */
export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Full stack product build',
    mark: 'stack',
    description:
      'One person owning the database, the API, the interface and the deploy. Fewer handoffs, fewer gaps, and a codebase that stays coherent because one head held the whole shape of it.',
    tools: ['Next.js', 'React', 'TypeScript', 'Node.js', 'NestJS', 'Go', 'PostgreSQL'],
  },
  {
    index: '02',
    title: 'AI systems that do real work',
    mark: 'core',
    description:
      'Document parsing, retrieval, agents that take actions, and drafting tools that write in a client voice. Built with guardrails, fallbacks and cost control, because a demo and a product are not the same thing.',
    tools: ['Claude API', 'OpenAI', 'LangChain', 'RAG', 'Vector search', 'Groq'],
  },
  {
    index: '03',
    title: 'Data pipelines and scraping',
    mark: 'flow',
    description:
      'Collection systems that keep running when a site changes its markup, blocks a request or throttles a range. Queued, retried, monitored and stored in a shape you can actually query later.',
    tools: ['Python', 'FastAPI', 'Celery', 'Redis', 'Playwright', 'BeautifulSoup'],
  },
  {
    index: '04',
    title: 'SaaS platforms end to end',
    mark: 'vault',
    description:
      'Auth, roles, multi tenancy, subscription tiers, invoices, admin panels and the boring edges nobody demos. This is where most products stall and where I have shipped the most.',
    tools: ['Stripe', 'Supabase', 'JWT', 'Row level security', 'Docker', 'Webhooks'],
  },
  {
    index: '05',
    title: 'Interfaces with motion',
    mark: 'frame',
    description:
      'Front ends that feel considered. Real typography, real spacing, scroll and pointer motion that carries meaning instead of decorating the page. Accessible and quick on a mid range phone.',
    tools: ['Framer Motion', 'Tailwind CSS', 'Canvas', 'WebGL', 'Scroll driven UI'],
  },
  {
    index: '06',
    title: 'Performance and search',
    mark: 'bearing',
    description:
      'Rendering strategy, Core Web Vitals, structured data and the migration work that makes a site legible to crawlers. I have taken client sites from client side rendering to server rendering and watched the numbers move.',
    tools: ['SSR and ISR', 'Core Web Vitals', 'Schema.org', 'Lighthouse', 'Analytics'],
  },
];

/** The three cards beside the video on the homepage. */
export interface FeatureCard {
  number: string;
  title: string;
  mark: 'stack' | 'core' | 'vault';
  items: string[];
  href: string;
}

export const featureCards: FeatureCard[] = [
  {
    number: '01',
    title: 'Systems design.',
    mark: 'stack',
    items: [
      'Schema and service boundaries drawn before any code exists',
      'Queues, retries and idempotent jobs that survive a bad night',
      'Deployment topology you can hand to an ops team',
      'Written scope in plain language, agreed before work starts',
    ],
    href: '/portfolio/navia',
  },
  {
    number: '02',
    title: 'AI that ships.',
    mark: 'core',
    items: [
      'Document parsing across PDF, DOCX and pasted email threads',
      'Retrieval over your own material so the voice stays yours',
      'Guardrails, fallbacks and a cost budget per request',
    ],
    href: '/portfolio/the-proposal-maker',
  },
  {
    number: '03',
    title: 'Handover kit.',
    mark: 'vault',
    items: [
      'A repository your next developer can read without me',
      'Deployed, documented and walked through on a call',
      'A support window after launch, not a disappearing act',
    ],
    href: '/contact',
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
}

export const process: ProcessStep[] = [
  {
    index: '01',
    title: 'Understand the problem',
    body: 'A short call, then a written scope in plain language. I would rather find the hard part in week one than in week six.',
  },
  {
    index: '02',
    title: 'Design the system',
    body: 'Data model, service boundaries, third party pieces and the parts most likely to break. You see the architecture before any code exists.',
  },
  {
    index: '03',
    title: 'Build in the open',
    body: 'Working builds you can click through, pushed regularly. No long silence followed by a surprise. Feedback lands while it is still cheap to act on.',
  },
  {
    index: '04',
    title: 'Hand it over properly',
    body: 'Deployed, documented and explained. You get a repository your next developer can read, not a black box that only I understand.',
  },
];
