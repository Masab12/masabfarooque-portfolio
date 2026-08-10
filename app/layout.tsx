import type { Metadata } from 'next';
import './globals.css';
import { sansFont, serifFont } from './lib/fonts';
import { site, socials } from './data/site';
import Nav from './components/core/Nav';
import Footer from './components/core/Footer';
import AnalyticsNotice, { Analytics } from './components/core/Consent';
import ProjectIntake from './components/core/ProjectIntake';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Masab Farooque | Full Stack Engineer, SaaS and AI Systems',
    template: '%s | Masab Farooque',
  },
  description:
    'Masab Farooque is a full stack engineer in Islamabad building SaaS platforms, AI systems and data pipelines. Next.js, FastAPI, Node.js and PostgreSQL. 148 reviews at a 5.0 average from clients in 23 countries.',
  keywords: [
    'Masab Farooque',
    'masab',
    'full stack engineer',
    'full stack developer Islamabad',
    'Next.js developer',
    'FastAPI developer',
    'Go developer',
    'AI engineer',
    'SaaS developer',
    'web scraping developer',
    'RAG systems',
    'LangChain developer',
    'Claude API developer',
    'freelance developer Pakistan',
    'Fiverr Level 2 seller',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: `${site.name}, Full Stack Engineer`,
    title: 'Masab Farooque | Full Stack Engineer, SaaS and AI Systems',
    description:
      'SaaS platforms, AI systems and data pipelines, built end to end. Islamabad, working with teams across Europe, North America and Asia.',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Masab Farooque, Full Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MasabDF',
    creator: '@MasabDF',
    title: 'Masab Farooque | Full Stack Engineer',
    description: 'SaaS platforms, AI systems and data pipelines, built end to end.',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: site.url },
  verification: { google: 'LOtZbkopd2oM3L6gSNc1MvlKumkMwPRF37ct409NYX8' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  image: `${site.url}/og-image.webp`,
  jobTitle: 'Full Stack Engineer',
  description:
    'Full stack engineer building SaaS platforms, AI systems and data pipelines for teams worldwide.',
  email: site.email,
  telephone: '+923045624189',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'Pakistan',
  },
  alumniOf: { '@type': 'Organization', name: 'COMSATS University Islamabad' },
  // Read from the socials list rather than repeated here, so adding a profile
  // in one place also tells search engines the accounts are the same person.
  sameAs: socials.map((s) => s.href),
  knowsAbout: [
    'Full Stack Development',
    'Next.js',
    'React',
    'TypeScript',
    'Go',
    'FastAPI',
    'Python',
    'AWS Lambda',
    'PostgreSQL',
    'AI Engineering',
    'Retrieval Augmented Generation',
    'Web Scraping',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${site.name} Portfolio`,
  url: site.url,
  description: 'Portfolio of Masab Farooque, full stack engineer.',
  author: { '@type': 'Person', name: site.name },
  inLanguage: 'en-US',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${sansFont.variable} ${serifFont.variable}`}
    >
      <head>
        <meta name="geo.region" content="PK-IS" />
        <meta name="geo.placename" content="Islamabad" />
        <meta name="geo.position" content="33.6844;73.0479" />
        <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" />
        {/* Verified identity links, generated from the same list as sameAs */}
        {socials.map((s) => (
          <link key={s.href} rel="me" href={s.href} />
        ))}
        {/* Plain script tags, not next/script. next/script defers these to the
            client, so the markup only existed in the flight payload and any
            crawler that does not run JavaScript saw no Person schema at all.
            The article routes already emit theirs this way. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Analytics />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border focus:px-4 focus:py-2"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--line-2)' }}
        >
          Skip to content
        </a>

        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <AnalyticsNotice />
        <ProjectIntake />
      </body>
    </html>
  );
}
