export interface TimelineEntry {
  year: string;
  title: string;
  org?: string;
  body: string;
  kind: 'education' | 'work' | 'award' | 'shift' | 'founder';
  tags?: string[];
}

export const timeline: TimelineEntry[] = [
  {
    year: '2019',
    title: 'Started Computer Science',
    org: 'COMSATS University Islamabad, Wah Campus',
    kind: 'education',
    body: 'Began a four year Computer Science degree and started taking small paid projects in the first semester, because reading about software is not the same as shipping it.',
    tags: ['B.Sc. Computer Science'],
  },
  {
    year: '2020',
    title: 'Unity Developer',
    org: '10Static Studios',
    kind: 'work',
    body: 'Shipped two Android games, Twirly Ball and Little Monster Jump, built in Unity and C#. Together they passed ten thousand downloads on the Play Store.',
    tags: ['Unity', 'C#', '10k downloads'],
  },
  {
    year: '2020',
    title: 'The Hustler Award',
    org: 'Epiphany Games',
    kind: 'award',
    body: 'Recognised for output and work rate across the competition.',
  },
  {
    year: '2021',
    title: 'Game Development Fellow',
    org: 'Mindstorm Studios',
    kind: 'work',
    body: 'Built Bizarre Adventures, a hyper casual runner. First real lesson in retention loops and in tuning something until it feels right rather than until it compiles.',
    tags: ['Unity', 'Game design'],
  },
  {
    year: '2022',
    title: 'Best Mechanics Award',
    org: 'Rookie Game Jam, Mindstorm Studios',
    kind: 'award',
    body: 'Won Best Mechanics for Titanic Rescue, which was then selected for incubation.',
  },
  {
    year: '2022',
    title: 'Runner up, Developers Game Jam 2.0',
    org: 'Developers Game Jam',
    kind: 'award',
    body: 'Placed second nationally with Food Planet, against teams from across Pakistan.',
  },
  {
    year: '2023',
    title: 'Graduated',
    org: 'COMSATS University Islamabad',
    kind: 'education',
    body: 'Finished the degree after three internships and a six month full time job, plus a set of competition results.',
  },
  {
    year: '2023',
    title: 'Moved into web and AI',
    kind: 'shift',
    body: 'A deliberate pivot out of games. Learned Next.js, Node.js, FastAPI, NestJS, LangChain and retrieval architectures, then started taking web clients and building products with them.',
    tags: ['Next.js', 'FastAPI', 'LangChain'],
  },
  {
    year: '2024',
    title: 'Web Developer and SEO',
    org: 'PentaByteX',
    kind: 'work',
    body: 'Built client sites on React, Next.js, WordPress and Shopify, and led the migration from client side to server side rendering across the portfolio.',
    tags: ['React', 'Next.js', 'SSR'],
  },
  {
    year: '2025',
    title: 'Web Developer',
    org: 'Fixels.nl',
    kind: 'work',
    body: 'Shipped Javea Denia Rentals and FirstDeal.nl, one booking platform and one monitoring SaaS, both from empty repository to paying users.',
    tags: ['FastAPI', 'Celery', 'Stripe'],
  },
  {
    year: '2026',
    title: 'Full Stack Engineer',
    org: 'Skylight Studio and Chord.fm',
    kind: 'work',
    body: 'Two product teams at once. Internal tooling and AI proposal generation at Skylight Studio, and the browser based audio editor at Chord.fm.',
    tags: ['Next.js', 'AWS Lambda', 'Claude API'],
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'What kind of work are you the right fit for?',
    answer:
      'Products with a real backend. SaaS platforms, AI systems that touch live data, scraping and pipeline work, and full applications that need one person to own the whole stack. If the hard part is a marketing page, you can hire cheaper than me.',
  },
  {
    question: 'How do you usually charge?',
    answer:
      'Fixed price per milestone once the scope is written down, or a monthly rate for ongoing product work. I put the number in writing before anything starts, and it does not move unless the scope does.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'A focused build is usually two to six weeks. A full platform with billing, admin and integrations is typically two to four months. You get a schedule with the scope, not after it.',
  },
  {
    question: 'Do you work with existing codebases?',
    answer:
      'Yes. A large share of my work is picking up something half finished, understanding it, and getting it to production. I will tell you honestly whether it is worth continuing or worth rebuilding.',
  },
  {
    question: 'What happens after handover?',
    answer:
      'You get the repository, the deployment and the documentation. I stay available for a support window after launch, and most clients keep me on for the next phase, which is where the repeat orders come from.',
  },
  {
    question: 'Where are you based and does it matter?',
    answer:
      'Islamabad, Pakistan, on UTC plus five. I have delivered to clients in more than fifteen countries and keep overlap hours with Europe and North America. Time zone has never been the reason a project slipped.',
  },
];
