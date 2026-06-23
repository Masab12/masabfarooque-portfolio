import type { Metadata } from 'next';
import Script from 'next/script';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BentoAboutSection from '../components/BentoAboutSection';
import TimelineSection from '../components/about/TimelineSection';
import AwardsSection from '../components/about/AwardsSection';
import SkillsRadar from '../components/about/SkillsRadar';
import PageTransition from '../components/PageTransition';
import ClientWorldMap from '../components/ClientWorldMap';
import ReviewSlider from '../components/ReviewSlider';
import AboutHero from '../components/about/AboutHero';
import FAQSection from '../components/about/FAQSection';
import { faqs } from '../components/about/faqData';
import { HiArrowRight } from 'react-icons/hi';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Masab Farooque | CS Graduate, Game Dev, Full Stack & AI Developer',
  description: 'Masab Farooque graduated from COMSATS University in 2023, won awards at national game jams, and now builds AI and web systems for clients worldwide as a Level 2 Fiverr Seller with 195 plus orders.',
  keywords: ['about masab', 'masab farooque', 'masab developer', 'masab islamabad', 'COMSATS graduate developer', 'masab fiverr', 'masab game jam'],
  alternates: { canonical: 'https://masabfarooque.com/about-masab' },
  openGraph: {
    url: 'https://masabfarooque.com/about-masab',
    title: 'About Masab Farooque | Full Stack Developer & AI Engineer',
    description: 'CS graduate, game jam award winner, and solo developer from Islamabad building AI and web systems for clients in 15 countries.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const pageSchemas = [
  faqSchema,
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://masabfarooque.com' },
      { '@type': 'ListItem', position: 2, name: 'About Masab', item: 'https://masabfarooque.com/about-masab' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Masab Farooque',
    url: 'https://masabfarooque.com/about-masab',
    jobTitle: 'Full Stack Developer & AI Engineer',
    description: 'Computer science graduate from COMSATS University Islamabad. Level 2 Fiverr Seller with 195 plus orders. Game jam award winner. Solo developer specializing in SaaS, AI pipelines, and web scraping.',
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'COMSATS University Islamabad', sameAs: 'https://www.comsats.edu.pk/' },
    award: ['Best Mechanics Award, Rookie Game Jam 2022, Mindstorm Studios', 'Runner-Up, Developers Game Jam 2.0', 'The Hustler Award, Epiphany Games 2020'],
    knowsAbout: ['Next.js', 'React', 'FastAPI', 'LangChain', 'RAG pipelines', 'PostgreSQL', 'Docker', 'Celery', 'Redis', 'Supabase', 'Web Scraping', 'Playwright', 'OpenAI', 'NestJS', 'Node.js'],
    address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
    sameAs: [
      'https://www.fiverr.com/p_scribbles/portfolio/',
      'https://upwork.com/freelancers/~01e34b32d5b254495d',
      'https://github.com/Masab12',
      'https://www.linkedin.com/in/masabfarooque',
    ],
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      {pageSchemas.map((schema, i) => (
        <Script
          key={i}
          id={`about-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navigation />
      <main className="relative bg-transparent overflow-x-hidden pt-28">
        <AboutHero />

        <BentoAboutSection />
        <TimelineSection />
        <AwardsSection />
        <SkillsRadar />
        <ClientWorldMap />
        <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-base)' }}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold tracking-widest uppercase mb-3 font-mono" style={{ color: 'var(--primary)' }}>
                Client Testimonials
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-1)' }}>
                What people say about working with Masab
              </h2>
            </div>
            <ReviewSlider />
          </div>
        </section>
        <FAQSection />

        <section className="relative w-full bg-transparent py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>
              Want to build something together?
            </h2>
            <p className="text-text-secondary text-base mb-3 max-w-xl mx-auto">
              I take on a limited number of projects at a time to keep quality high. If you have something worth building, let's talk.
            </p>
            <p className="text-text-muted text-sm mb-8">
              <Link href="/services" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>View all services</Link>
              {' '}or{' '}
              <Link href="/pricing" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-violet)' }}>see pricing plans</Link>
              {' '}before reaching out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold"
                style={{ background: 'var(--primary)', color: 'var(--color-on-accent)' }}
              >
                Start a Project <HiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 glass-card rounded-xl font-semibold text-text-primary hover:border-electric-cyan/40 transition-all"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
