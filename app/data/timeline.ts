export type TimelineType = 'education' | 'work' | 'freelance' | 'achievement' | 'transition' | 'founder';
export type AccentColor = 'cyan' | 'violet' | 'gold' | 'silver' | 'green';

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  organization?: string;
  type: TimelineType;
  description: string;
  tags?: string[];
  accentColor: AccentColor;
  isAward?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    id: 'comsats',
    year: '2019',
    title: 'Joined COMSATS University Islamabad',
    organization: 'COMSATS University, Wah Campus',
    type: 'education',
    description: 'Started a Bachelor of Science in Computer Science. Began taking small freelance projects and writing work on the side from the first semester to build real skills beyond the classroom.',
    tags: ['Computer Science', 'Islamabad', 'B.Sc. CS'],
    accentColor: 'cyan',
  },
  {
    id: '10static',
    year: 'Feb 2020 to Sep 2020',
    title: 'Unity Developer',
    organization: '10Static Studios',
    type: 'work',
    description: 'Developed and published two Android games, Twirly Ball and Little Monster Jump, using Unity and C#. Implemented physics-based mechanics and fine-tuned gameplay loops, resulting in 10,000+ combined downloads on the Play Store.',
    tags: ['Unity', 'C#', 'Android', '10k+ Downloads'],
    accentColor: 'violet',
  },
  {
    id: 'hustler-award',
    year: '2020',
    title: 'The Hustler Award',
    organization: 'Epiphany Games',
    type: 'achievement',
    description: 'Won The Hustler Award at Epiphany Games, recognized for drive, work ethic, and output at one of the game jam competitions.',
    tags: ['Award', 'Epiphany', 'Recognition'],
    accentColor: 'gold',
    isAward: true,
  },
  {
    id: 'mindstorm-2021',
    year: 'Jun 2021 to Sep 2021',
    title: 'Unity Game Development Intern',
    organization: 'Mindstorm Studios',
    type: 'work',
    description: 'Developed Bizarre Adventures, a hyper-casual runner game focused on retention and engagement loops. Applied core loop optimization, player psychology concepts, and rapid prototyping methodologies to create an engaging gameplay experience.',
    tags: ['Unity', 'Mindstorm', 'Hyper-Casual', 'Game Design'],
    accentColor: 'cyan',
  },
  {
    id: 'mindstorm-2022',
    year: 'Jun 2022 to Sep 2022',
    title: 'Unity Game Development Intern',
    organization: 'Mindstorm Studios',
    type: 'work',
    description: 'Developed Titanic Rescue, a hyper-casual survival game. Focused on gameplay balancing, core loop design, level design, editor scripting, and Unity component architecture. The game won Best Mechanics Award and was selected for incubation.',
    tags: ['Unity', 'Titanic Rescue', 'Best Mechanics', 'Incubation'],
    accentColor: 'violet',
  },
  {
    id: 'best-mechanics',
    year: '2022',
    title: 'Best Mechanics Award',
    organization: 'Rookie Game Jam by Mindstorm Studios',
    type: 'achievement',
    description: 'Won the Best Mechanics Award at the Rookie Game Jam organized by Mindstorm Studios for Titanic Rescue. The game was also selected for incubation.',
    tags: ['Award', 'Best Mechanics', 'Mindstorm', 'Incubation'],
    accentColor: 'gold',
    isAward: true,
  },
  {
    id: 'food-planet',
    year: '2022',
    title: 'Runner-Up at Developers Game Jam 2.0',
    organization: 'Developers Game Jam 2.0',
    type: 'achievement',
    description: "Placed runner-up at Developers Game Jam 2.0 with the game Food Planet, competing against developers from across Pakistan.",
    tags: ['Runner-Up', 'Food Planet', 'Game Jam', 'Pakistan'],
    accentColor: 'silver',
    isAward: true,
  },
  {
    id: 'graduated',
    year: 'Jan 2023',
    title: 'Graduated, B.Sc. Computer Science',
    organization: 'COMSATS University Islamabad, Wah Campus',
    type: 'education',
    description: 'Completed a four-year Computer Science degree. By graduation, already had three years of professional game development experience across multiple studios and national competitions.',
    tags: ['Graduated', 'Computer Science', 'COMSATS', 'B.Sc.'],
    accentColor: 'cyan',
  },
  {
    id: 'mindstorm-2023',
    year: 'Jun 2023 to Aug 2023',
    title: 'Unity Game Development Intern',
    organization: 'Mindstorm Studios',
    type: 'work',
    description: "Developed Backyard Defense, a strategic tower defense game featuring multi-layered AI pathfinding algorithms, dynamic enemy spawning systems, and balanced progression mechanics. Participated in advanced workshops on game architecture patterns and performance optimization.",
    tags: ['Unity', 'Tower Defense', 'AI Pathfinding', 'Mindstorm'],
    accentColor: 'violet',
  },
  {
    id: 'web-transition',
    year: 'Late 2023',
    title: 'Transitioned to Web Development and AI',
    type: 'transition',
    description: 'Made a deliberate pivot from game development into full stack web and AI engineering. Learned Next.js, Node.js, FastAPI, NestJS, LangChain, and RAG architectures. Started taking web development clients on Fiverr and quickly began building SaaS products.',
    tags: ['Next.js', 'FastAPI', 'LangChain', 'AI', 'Career Pivot'],
    accentColor: 'green',
  },
  {
    id: 'replayjutsu',
    year: 'Mar 2024 to Nov 2024',
    title: 'Founder',
    organization: 'ReplayJutsu',
    type: 'founder',
    description: 'Founded and scaled an online gaming publication to over 100,000 monthly active users. Developed and executed a comprehensive content strategy based on entity SEO and technical optimization, establishing the site as an authority in its niche.',
    tags: ['Founder', '100k+ Users', 'Entity SEO', 'Publishing'],
    accentColor: 'violet',
  },
  {
    id: 'pentabytex',
    year: 'Jul 2024 to Feb 2025',
    title: 'SEO Web Developer',
    organization: 'PentaByteX',
    type: 'work',
    description: 'Developed and optimized client websites for enhanced SEO performance using React, Next.js, and various CMS platforms including WordPress and Shopify. Led technical implementations including successful migrations from CSR to SSR for improved search engine visibility.',
    tags: ['React', 'Next.js', 'SEO', 'WordPress', 'Shopify', 'SSR'],
    accentColor: 'cyan',
  },
  {
    id: 'fiverr-l2',
    year: '2023 to Present',
    title: 'Level 2 Fiverr Seller',
    organization: 'Fiverr',
    type: 'freelance',
    description: 'Reached Level 2 seller status with 195+ completed orders across Europe, North America, and Asia. Projects include SaaS platforms, AI pipelines, web scrapers, marketplace tools, and full stack apps for clients in 15+ countries.',
    tags: ['Fiverr Level 2', '195+ Orders', '15+ Countries', 'SaaS', 'AI'],
    accentColor: 'cyan',
  },
];
