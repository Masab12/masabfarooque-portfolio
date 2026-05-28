import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import PricingPageContent from '../components/PricingPageContent';

export const metadata: Metadata = {
  title: 'Pricing | Web & AI Development Rates | Masab Farooque',
  description: 'Clear pricing for web development and AI projects by Masab Farooque. Starter from $299 for a landing page, Scale Stack from $1,200 for a full app, and AI Automation Suite from $3,500. Custom also available.',
  keywords: ['masab pricing', 'masab developer rates', 'hire masab cost', 'freelance developer pricing', 'web development cost pakistan', 'ai development pricing'],
  alternates: { canonical: 'https://masabfarooque.com/pricing' },
  openGraph: {
    url: 'https://masabfarooque.com/pricing',
    title: 'Pricing | Masab Farooque | Web & AI Development',
    description: 'Starter from $299, Scale Stack from $1,200, AI Suite from $3,500. Transparent pricing by Masab Farooque for web and AI projects.',
  },
};

const pageSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://masabfarooque.com' },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://masabfarooque.com/pricing' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Development Pricing by Masab Farooque',
    itemListElement: [
      {
        '@type': 'ListItem', position: 1,
        item: {
          '@type': 'Offer',
          name: 'Starter Launch',
          description: 'Single-page React or Next.js website with contact form, SEO, mobile optimization, and deployment.',
          price: '299', priceCurrency: 'USD',
          priceSpecification: { '@type': 'PriceSpecification', minPrice: '299', priceCurrency: 'USD' },
          seller: { '@type': 'Person', name: 'Masab Farooque' },
          url: 'https://masabfarooque.com/pricing',
        },
      },
      {
        '@type': 'ListItem', position: 2,
        item: {
          '@type': 'Offer',
          name: 'Scale Stack',
          description: 'Full stack application with auth, PostgreSQL database, admin dashboard, Stripe billing, and Docker deployment.',
          price: '1200', priceCurrency: 'USD',
          priceSpecification: { '@type': 'PriceSpecification', minPrice: '1200', priceCurrency: 'USD' },
          seller: { '@type': 'Person', name: 'Masab Farooque' },
          url: 'https://masabfarooque.com/pricing',
        },
      },
      {
        '@type': 'ListItem', position: 3,
        item: {
          '@type': 'Offer',
          name: 'AI Automation Suite',
          description: 'Full stack app plus LangChain agents, RAG pipelines, OpenAI integration, and automated workflows.',
          price: '3500', priceCurrency: 'USD',
          priceSpecification: { '@type': 'PriceSpecification', minPrice: '3500', priceCurrency: 'USD' },
          seller: { '@type': 'Person', name: 'Masab Farooque' },
          url: 'https://masabfarooque.com/pricing',
        },
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <PageTransition>
      {pageSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Navigation />
      <main className="relative bg-void-black overflow-x-hidden pt-28">
        <section className="relative w-full px-4 sm:px-6 lg:px-8 pb-12">
          <div className="relative max-w-4xl mx-auto text-center">
            <p className="text-xs font-bold tracking-widest uppercase mb-5 font-mono" style={{ color: 'rgb(0,240,255)' }}>Pricing</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5" style={{ color: '#f8f9fa' }}>
              Transparent Pricing.<br className="hidden sm:block" /> No Surprises.
            </h1>
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Every project is different. These are starting points. Complexity, integrations, and timeline all affect the final scope. All pricing is agreed before work begins.
            </p>
          </div>
        </section>
        <PricingPageContent />
      </main>
      <Footer />
    </PageTransition>
  );
}
