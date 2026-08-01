import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { sansFont, serifFont } from './lib/fonts';
import { site } from './data/site';
import Cursor from './components/core/Cursor';
import Nav from './components/core/Nav';
import Footer from './components/core/Footer';

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
    'Masab Farooque is a full stack engineer in Islamabad building SaaS platforms, AI systems and data pipelines. Next.js, FastAPI, Go on AWS. 148 reviews at a 4.85 average from clients in 23 countries.',
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
  sameAs: [
    'https://github.com/Masab12',
    'https://www.linkedin.com/in/masabfarooque',
    'https://www.fiverr.com/p_scribbles',
    'https://upwork.com/freelancers/~01e34b32d5b254495d',
  ],
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
        <link rel="canonical" href={site.url} />
        <meta name="geo.region" content="PK-IS" />
        <meta name="geo.placename" content="Islamabad" />
        <meta name="geo.position" content="33.6844;73.0479" />
        <link rel="me" href="https://github.com/Masab12" />
        <link rel="me" href="https://www.linkedin.com/in/masabfarooque" />
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YSMF0ZW4R1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YSMF0ZW4R1');
          `}
        </Script>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border focus:px-4 focus:py-2"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--line-2)' }}
        >
          Skip to content
        </a>

        <Cursor />

        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
