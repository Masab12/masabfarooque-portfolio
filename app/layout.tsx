import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GlobalUI from "./components/GlobalUI";
import LayoutClient from "./components/LayoutClient";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://masabfarooque.com'),
  title: {
    default: 'Masab | Masab Farooque - Full Stack Developer & AI Engineer | Level 2 Fiverr Seller',
    template: '%s | Masab Farooque'
  },
  description: 'Masab Farooque (masab) is a Level 2 Fiverr Seller and Full Stack Developer from Islamabad, Pakistan. Expert in Next.js, React, FastAPI, AI Engineering, LangChain, and RAG systems. 195+ completed orders across 15+ countries.',
  keywords: [
    'masab',
    'Masab Farooque',
    'masab farooque',
    'masab developer',
    'masab full stack developer',
    'masab fiverr',
    'masab islamabad',
    'masab pakistan',
    'masab AI developer',
    'Level 2 Fiverr Seller',
    'Full Stack Developer',
    'AI Engineer',
    'Next.js Developer',
    'React Developer',
    'FastAPI Developer',
    'Web Developer Islamabad',
    'Pakistan Developer',
    'Fiverr Developer',
    'Upwork Developer',
    'AI Solutions',
    'Web Development',
    'LangChain Developer',
    'OpenAI Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Python Developer',
    'COMSATS Graduate',
    'Freelance Developer',
    'Remote Developer',
    'RAG systems',
    'SaaS developer',
    'web scraping developer'
  ],
  authors: [{ name: 'Masab Farooque', url: 'https://masabfarooque.com' }],
  creator: 'Masab Farooque',
  publisher: 'Masab Farooque',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://masabfarooque.com',
    siteName: 'Masab Farooque Portfolio',
    title: 'Masab Farooque | Level 2 Fiverr Seller - Full Stack Developer & AI Engineer',
    description: 'Level 2 Fiverr Seller from Islamabad, Pakistan. Expert in Full Stack Development, AI Engineering, Next.js, React, and FastAPI. Building modern web applications and AI solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Masab Farooque - Full Stack Developer & AI Engineer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masab Farooque | Level 2 Fiverr Seller - Full Stack Developer',
    description: 'Level 2 Fiverr Seller specializing in Full Stack Development and AI Engineering. Based in Islamabad, Pakistan.',
    images: ['/og-image.jpg'],
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
  alternates: {
    canonical: 'https://masabfarooque.com',
  },
  verification: {
    google: 'LOtZbkopd2oM3L6gSNc1MvlKumkMwPRF37ct409NYX8',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Masab Farooque',
  url: 'https://masabfarooque.com',
  image: 'https://masabfarooque.com/og-image.jpg',
  jobTitle: 'Full Stack Developer & AI Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Fiverr',
  },
  description: 'Level 2 Fiverr Seller specializing in Full Stack Development and AI Engineering',
  email: 'masabfarooque1122@gmail.com',
  telephone: '+923045624189',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'Pakistan',
  },
  alumniOf: {
    '@type': 'Organization',
    name: 'COMSATS University Islamabad',
  },
  sameAs: [
    'https://www.fiverr.com/p_scribbles/portfolio/',
    'https://upwork.com/freelancers/~01e34b32d5b254495d',
    'https://github.com/Masab12',
    'https://www.linkedin.com/in/masabfarooque',
    'https://www.instagram.com/masabfarooque',
  ],
  knowsAbout: [
    'Full Stack Development',
    'AI Engineering',
    'Next.js',
    'React',
    'FastAPI',
    'Node.js',
    'Python',
    'TypeScript',
    'LangChain',
    'OpenAI',
    'Web Development',
  ],
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Masab Farooque - Full Stack Development Services',
  image: 'https://masabfarooque.com/og-image.jpg',
  '@id': 'https://masabfarooque.com',
  url: 'https://masabfarooque.com',
  telephone: '+923045624189',
  email: 'masabfarooque1122@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'Pakistan',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.6844,
    longitude: 73.0479,
  },
  priceRange: '$$$',
  description: 'Professional Full Stack Development and AI Engineering services. Specializing in Next.js, React, FastAPI, and AI solutions.',
  areaServed: 'Worldwide',
  serviceType: [
    'Full Stack Development',
    'AI Engineering',
    'Web Application Development',
    'API Development',
    'AI Integration',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '139',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Lucas Swarts' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Absolutely amazing work. I have never had this experience with anyone before. Masab truly went above and beyond with unbelievable dedication and effort. He has a very strong understanding of complex scraping and everything that comes with it. The end product is a fully working SaaS platform.',
      datePublished: '2025-02',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'ksharma222' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: "Doesn't get better than this. He is the best in the business. His expertise are outstanding and response is even better. There is nothing Masab can't figure out.",
      datePublished: '2025-01',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Roger L.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'I highly recommend Masab to anyone looking for advanced AI systems, business automation, or full-stack development. I approached him with a complete business management system powered by multilingual AI. The execution was outstanding.',
      datePublished: '2024-12',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'adouatt' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Masab is someone who is easy to work with. He went over and beyond on each phase of this project. I am excited for the rest!',
      datePublished: '2025-03',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'amanjoshi752004' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Always a pleasure working with Masab Farooque! This is my 5th time hiring him, and as always, he delivers excellent work with professionalism and consistency. Highly reliable and skilled.',
      datePublished: '2024-11',
    },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Masab Farooque Portfolio',
  url: 'https://masabfarooque.com',
  description: 'Portfolio of Masab Farooque - Level 2 Fiverr Seller, Full Stack Developer & AI Engineer',
  author: {
    '@type': 'Person',
    name: 'Masab Farooque',
  },
  inLanguage: 'en-US',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://masabfarooque.com" />
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="me" href="https://github.com/Masab12" />
        <link rel="me" href="https://www.linkedin.com/in/masabfarooque" />
        <meta name="geo.region" content="PK-IS" />
        <meta name="geo.placename" content="Islamabad" />
        <meta name="geo.position" content="33.6844;73.0479" />
        <meta name="ICBM" content="33.6844, 73.0479" />
        <meta name="author" content="Masab Farooque" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans antialiased overflow-x-hidden`}
      >
        {/* Google Analytics */}
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
        <GlobalUI />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
