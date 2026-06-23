import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import ServicesPageContent from '../components/ServicesPageContent';
import TerminalTyper from '../components/TerminalTyper';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'Services by Masab Farooque | Full Stack, AI, Scraping & API Development',
  description: 'Masab builds full stack web apps with React and Next.js, AI systems with LangChain and OpenAI, web scrapers with Playwright, and REST APIs with FastAPI. Real production work for real businesses.',
  keywords: ['masab services', 'masab full stack development', 'masab AI development', 'masab web scraping', 'masab API development', 'hire masab', 'next.js developer pakistan', 'fastapi developer'],
  alternates: { canonical: 'https://masabfarooque.com/services' },
  openGraph: {
    url: 'https://masabfarooque.com/services',
    title: 'Services by Masab Farooque | Full Stack, AI, Scraping & APIs',
    description: 'Full stack development, AI integration, web scraping, and API engineering by Masab Farooque. React, Next.js, FastAPI, LangChain, and more.',
  },
};

const pageSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://masabfarooque.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://masabfarooque.com/services' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services by Masab Farooque',
    description: 'Four core service categories offered by Masab Farooque',
    itemListElement: [
      {
        '@type': 'ListItem', position: 1,
        item: {
          '@type': 'Service', name: 'Full Stack Development',
          description: 'Complete web applications with React, Next.js, Node.js, NestJS, PostgreSQL, and Docker.',
          provider: { '@type': 'Person', name: 'Masab Farooque' },
          url: 'https://masabfarooque.com/services#full-stack',
        },
      },
      {
        '@type': 'ListItem', position: 2,
        item: {
          '@type': 'Service', name: 'AI and Machine Learning Integration',
          description: 'LangChain agents, RAG pipelines, OpenAI integrations, and AI chatbots for production use.',
          provider: { '@type': 'Person', name: 'Masab Farooque' },
          url: 'https://masabfarooque.com/services#ai-ml',
        },
      },
      {
        '@type': 'ListItem', position: 3,
        item: {
          '@type': 'Service', name: 'Web Scraping and Automation',
          description: 'Custom scrapers with Playwright, Selenium, and Puppeteer. Celery and Redis for distributed jobs.',
          provider: { '@type': 'Person', name: 'Masab Farooque' },
          url: 'https://masabfarooque.com/services#scraping-automation',
        },
      },
      {
        '@type': 'ListItem', position: 4,
        item: {
          '@type': 'Service', name: 'API Development',
          description: 'FastAPI and NestJS REST APIs with OpenAPI docs, JWT auth, and third-party integrations.',
          provider: { '@type': 'Person', name: 'Masab Farooque' },
          url: 'https://masabfarooque.com/services#api-development',
        },
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <PageTransition>
      {pageSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Navigation />
      <main className="relative bg-transparent overflow-x-hidden pt-28">
        <section className="relative w-full px-4 sm:px-6 lg:px-8 pb-16">
          <div className="relative max-w-5xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase mb-5 font-mono" style={{ color: 'var(--accent-cyan)' }}>Services</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5" style={{ color: 'var(--text-1)' }}>
              What I Build
            </h1>
            <div className="mb-5">
              <TerminalTyper phrases={['next build  ✓ compiled', 'fastapi serve  ✓ 200 OK', 'celery worker  ✓ ready', 'playwright run  ✓ scraped']} />
            </div>
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed mb-3">
              Four core service areas. Every project is production code, clean architecture, tested, and documented.
            </p>
            <p className="text-text-muted text-sm mb-8">
              Want to see it in practice?{' '}
              <Link href="/portfolio" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>
                Browse Masab's completed projects
              </Link>{' '}
              or{' '}
              <Link href="/pricing" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-violet)' }}>
                view pricing plans
              </Link>.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Full Stack Dev', 'AI & ML', 'Scraping & Automation', 'API Development'].map((label, i) => {
                const ids = ['full-stack', 'ai-ml', 'scraping-automation', 'api-development'];
                return (
                  <a
                    key={label}
                    href={`#${ids[i]}`}
                    className="px-4 py-2 rounded-xl text-sm font-medium border text-text-secondary hover:text-text-primary hover:border-electric-cyan/40 transition-all duration-200"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-base)' }}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <ServicesPageContent />

        <section className="relative w-full bg-transparent py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>
              Not sure which service fits?
            </h2>
            <p className="text-text-secondary text-base mb-8">Tell me what you are building and I will point you in the right direction.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold" style={{ background: 'var(--primary)', color: 'var(--color-on-accent)' }}>
                Get in Touch <HiArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-3.5 glass-card rounded-xl font-semibold text-text-primary hover:border-electric-cyan/40 transition-all">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
