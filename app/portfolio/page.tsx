import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import PortfolioPageContent from '../components/PortfolioPageContent';
import { projects } from '../data/projects';

export const metadata: Metadata = {
  title: "Masab Farooque's Portfolio | SaaS, AI, Web Scraping & Full Stack Projects",
  description: 'Real projects built by Masab Farooque. SaaS platforms, AI systems, marketplaces, and scrapers for clients in Europe, North America, and Asia. Every project is production code built solo from scratch.',
  keywords: ['masab portfolio', 'masab projects', 'masab farooque work', 'full stack portfolio pakistan', 'ai projects masab', 'saas developer portfolio'],
  alternates: { canonical: 'https://masabfarooque.com/portfolio' },
  openGraph: {
    url: 'https://masabfarooque.com/portfolio',
    title: "Masab Farooque's Portfolio | Real Production Projects",
    description: 'SaaS platforms, AI pipelines, web scrapers, and full stack apps built solo by Masab Farooque for clients in 15 countries.',
  },
};

const pageSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://masabfarooque.com' },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://masabfarooque.com/portfolio' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: "Masab Farooque's Project Portfolio",
    description: 'A selection of production systems built by Masab Farooque across full stack development, AI, SaaS, and web scraping.',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: p.title,
        description: p.description,
        applicationCategory: 'WebApplication',
        author: { '@type': 'Person', name: 'Masab Farooque' },
        ...(p.liveUrl ? { url: p.liveUrl } : {}),
        keywords: p.technologies.join(', '),
      },
    })),
  },
];

export default function PortfolioPage() {
  return (
    <PageTransition>
      {pageSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Navigation />
      <main className="relative bg-transparent overflow-x-hidden pt-28">
        <PortfolioPageContent />
      </main>
      <Footer />
    </PageTransition>
  );
}
