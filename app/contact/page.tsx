import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import ContactPageContent from '../components/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Masab Farooque | Start a Web or AI Development Project',
  description: 'Get in touch with Masab Farooque to discuss your project. Full stack development, AI integration, web scraping, and API engineering available. Based in Islamabad, Pakistan. Replies within 24 hours.',
  keywords: ['contact masab', 'hire masab', 'masab farooque contact', 'hire full stack developer islamabad', 'hire ai developer pakistan', 'masab farooque email'],
  alternates: { canonical: 'https://masabfarooque.com/contact' },
  openGraph: {
    url: 'https://masabfarooque.com/contact',
    title: 'Contact Masab Farooque | Start a Project',
    description: 'Reach out to Masab Farooque for full stack, AI, scraping, or API projects. Based in Islamabad. Replies within 24 hours.',
  },
};

const pageSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://masabfarooque.com' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://masabfarooque.com/contact' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Masab Farooque',
    url: 'https://masabfarooque.com/contact',
    description: 'Contact page for Masab Farooque, full stack developer and AI engineer from Islamabad, Pakistan.',
    mainEntity: {
      '@type': 'Person',
      name: 'Masab Farooque',
      email: 'masabfarooque1122@gmail.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
      contactType: 'customer service',
      availableLanguage: 'English',
    },
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      {pageSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Navigation />
      <main className="relative bg-transparent overflow-x-hidden pt-28">
        <ContactPageContent />
      </main>
      <Footer />
    </PageTransition>
  );
}
