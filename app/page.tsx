import type { Metadata } from 'next';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomepageHero from './components/HomepageHero';
import TechStackMarquee from './components/TechStackMarquee';
import HomepageServicesTeaser from './components/HomepageServicesTeaser';
import HomepageProjectsTeaser from './components/HomepageProjectsTeaser';
import HomepageSocialProof from './components/HomepageSocialProof';
import PageTransition from './components/PageTransition';
import ClientWorldMap from './components/ClientWorldMap';
import TrustedBy from './components/TrustedBy';

export const metadata: Metadata = {
  title: 'Masab Farooque | Full Stack Developer & AI Engineer from Islamabad',
  description: 'Masab Farooque builds SaaS platforms, AI pipelines, web scrapers, and full stack apps for clients in 15 countries. Level 2 Fiverr Seller. 195 plus completed orders. Next.js, FastAPI, LangChain.',
  alternates: { canonical: 'https://masabfarooque.com' },
  openGraph: {
    title: 'Masab Farooque | Full Stack Developer & AI Engineer',
    description: 'SaaS platforms, AI pipelines, web scrapers, and full stack apps built by Masab Farooque. 195 plus orders. Islamabad, Pakistan.',
    url: 'https://masabfarooque.com',
  },
};

const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Masab Farooque | Full Stack Developer & AI Engineer',
  url: 'https://masabfarooque.com',
  description: 'Masab Farooque builds SaaS platforms, AI pipelines, web scrapers, and full stack applications for clients worldwide.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://masabfarooque.com' },
    ],
  },
};

export default function HomePage() {
  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />
      <Navigation />
      <main className="relative bg-void-black overflow-x-hidden">
        <HomepageHero />
        <TrustedBy />
        <TechStackMarquee />
        <HomepageServicesTeaser />
        <HomepageProjectsTeaser />
        <HomepageSocialProof />
        <ClientWorldMap />
      </main>
      <Footer />
    </PageTransition>
  );
}
