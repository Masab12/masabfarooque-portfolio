export type LogoKind = 'image' | 'drawn';

export interface Role {
  id: string;
  company: string;
  /** Drawn logotypes live in app/components/marks, images live in /public. */
  logo: { kind: LogoKind; src?: string; mark?: 'chord' | 'penta' | 'mindstorm'; height?: number };
  title: string;
  type: string;
  period: string;
  from: string;
  to: string;
  place: string;
  summary: string;
  highlights: string[];
  stack: string[];
  href?: string;
}

export const roles: Role[] = [
  {
    id: 'chord',
    company: 'Chord.fm',
    logo: { kind: 'drawn', mark: 'chord', height: 22 },
    title: 'Full Stack Engineer',
    type: 'Part time, remote',
    period: 'Jun 2026 to now',
    from: '2026',
    to: 'Now',
    place: 'Remote',
    summary:
      'Chord.fm is a browser based audio and video editor for podcasters and creators. I build product features across the whole stack, from the editor panels down to the services behind them.',
    highlights: [
      'Designed and built the Music Library panel from the ground up so users can browse, filter and preview royalty free tracks by genre, mood and collection.',
      'Wrote the waveform playback layer with live rendering and click to seek, tuned so scrubbing stays smooth on long tracks.',
      'Built the backend as Go services on AWS Lambda with the Serverless Framework, using DynamoDB, API Gateway and S3.',
    ],
    stack: ['Go', 'AWS Lambda', 'DynamoDB', 'API Gateway', 'S3', 'React', 'TypeScript'],
    href: 'https://chord.fm',
  },
  {
    id: 'skylight',
    company: 'Skylight Studio',
    logo: { kind: 'image', src: '/TrustedBy/skylight-studio-logo.svg', height: 30 },
    title: 'Full Stack Engineer',
    type: 'Part time, remote',
    period: 'Mar 2026 to now',
    from: '2026',
    to: 'Now',
    place: 'Remote',
    summary:
      'I help build and maintain the internal tooling platform used by the Engineering Solutions team, a Next.js application that ties proposal writing, project tracking and third party services into one place.',
    highlights: [
      'Built The Proposal Maker, an AI assisted tool that reads an incoming RFP or email thread and drafts a branded proposal section by section.',
      'Wired the platform into third party services so project data flows in without manual entry.',
      'Kept the tooling fast and predictable for a team that uses it every working day.',
    ],
    stack: ['Next.js', 'TypeScript', 'Claude API', 'PostgreSQL', 'Tailwind CSS'],
    href: 'https://www.skylightstudio.io',
  },
  {
    id: 'fixels',
    company: 'Fixels.nl',
    logo: { kind: 'image', src: '/TrustedBy/fixelslogo.webp', height: 17 },
    title: 'Web Developer',
    type: 'Part time, remote',
    period: 'Nov 2025 to Apr 2026',
    from: '2025',
    to: '2026',
    place: 'Remote',
    summary:
      'Shipped two production products for Dutch clients, one booking platform and one monitoring SaaS, both taken from an empty repository to paying users.',
    highlights: [
      'Built Javea Denia Rentals, a vehicle rental platform for Costa Blanca tourists with live availability, Stripe payments, English and Spanish, and an admin fleet manager.',
      'Built FirstDeal.nl from scratch, a SaaS that watches Marktplaats, 2dehands.be and Kleinanzeigen and alerts users on Telegram or email the moment a listing matches their criteria.',
      'Engineered the FastAPI and Celery scraping backend on Redis, handling thousands of concurrent jobs across three marketplaces with rate limit handling and layout change recovery.',
      'Shipped Stripe subscriptions across three tiers plus a user dashboard, admin panel, referral system, push notifications and PWA support.',
    ],
    stack: ['Next.js', 'FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'Stripe', 'PWA'],
    href: 'https://fixels.nl',
  },
  {
    id: 'pentabytex',
    company: 'PentaByteX',
    logo: { kind: 'drawn', mark: 'penta', height: 22 },
    title: 'Web Developer and SEO',
    type: 'Full time',
    period: 'Sep 2024 to Feb 2025',
    from: '2024',
    to: '2025',
    place: 'Islamabad',
    summary:
      'Built and tuned client websites where search visibility was the point, across React, Next.js, WordPress and Shopify.',
    highlights: [
      'Led migrations from client side rendering to server side rendering, which lifted crawlability and first load performance across the client portfolio.',
      'Handled technical SEO end to end, including structured data, internal linking and Core Web Vitals work.',
    ],
    stack: ['React', 'Next.js', 'WordPress', 'Shopify', 'Technical SEO', 'Google Analytics'],
  },
  {
    id: 'mindstorm',
    company: 'Mindstorm Studios',
    logo: { kind: 'drawn', mark: 'mindstorm', height: 22 },
    title: 'Student Fellow',
    type: 'Fellowship',
    period: '2022 and 2023',
    from: '2022',
    to: '2023',
    place: 'Islamabad',
    summary:
      'Two game development fellowships where I learned to build systems that have to feel right, not just work. That habit carried straight into product work.',
    highlights: [
      'Completed the fellowship programme and competed in the Rookie Game Jam 2022.',
      'Won the Best Mechanics Award at Rookie Game Jam 2022, and the game was selected for incubation.',
    ],
    stack: ['Unity', 'C#', 'Game Design', 'Rapid Prototyping'],
  },
];

/** Logos shown in the client strip. These are real assets shipped in /public. */
export const clientLogos = [
  { name: 'Skylight Studio', src: '/TrustedBy/skylight-studio-logo.svg' },
  { name: 'Fixels', src: '/TrustedBy/fixelslogo.webp' },
  { name: 'Hice.AI', src: '/TrustedBy/hice-logo-blue-02.svg' },
  { name: 'FirstDeal', src: '/TrustedBy/FirstDealLogo.webp' },
  { name: 'JANUA', src: '/TrustedBy/JanuaLogo.webp' },
  { name: 'Javea Denia Rentals', src: '/TrustedBy/JaveaDenia.webp' },
];
