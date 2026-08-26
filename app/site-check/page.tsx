import type { Metadata } from 'next';
import { site } from '@/app/data/site';
import PageHead from '@/app/components/core/PageHead';
import Section from '@/app/components/core/Section';
import Reveal from '@/app/components/motion/Reveal';
import ContactCTA from '@/app/components/home/ContactCTA';
import { Spark } from '@/app/components/marks';
import SiteCheckTool from '@/app/components/site-check/SiteCheckTool';

export const metadata: Metadata = {
  title: 'Site Check',
  description:
    'A free tool that reads any web page and reports on its search visibility, technical setup, content and speed. Get a plain English report in about ten seconds, and download it as a PDF.',
  alternates: { canonical: `${site.url}/site-check` },
  keywords: [
    'free website checker',
    'SEO audit tool',
    'website health check',
    'site speed check',
    'website diagnostic report',
  ],
  openGraph: {
    type: 'website',
    title: 'Site Check | Masab Farooque',
    description:
      'Paste in a web address and get a plain English report on what is holding the page back, free, in about ten seconds.',
    url: `${site.url}/site-check`,
  },
};

const categories = [
  {
    name: 'Search visibility',
    detail:
      'The title, the description, the main heading, and the tags that decide how a link looks when it is shared. This is what search engines and social platforms actually read.',
  },
  {
    name: 'Technical setup',
    detail:
      'HTTPS, robots.txt, a sitemap, a favicon, and the tag that lets a page adapt to a phone screen. Small things, and each one is either there or it is not.',
  },
  {
    name: 'Content quality',
    detail:
      'Alt text on images, a declared page language, and resources that quietly break because they load over plain HTTP on a secure page.',
  },
  {
    name: 'Speed signals',
    detail:
      'How fast the server answers, how heavy the raw page is, and whether scripts in the head are holding up the first paint.',
  },
];

const faqs = [
  {
    q: 'Is this actually free?',
    a: 'Yes. Type an address, get the report, download it if you want it. No account and no email required.',
  },
  {
    q: 'Does it check my whole website?',
    a: 'It checks the one page you give it, the same way a browser would load it. It does not crawl every page on your domain. If you want every page looked at, that is a job for a person, not a ten second scan, and it is exactly the kind of work I do.',
  },
  {
    q: 'Where does the score come from?',
    a: 'Every check either passes, needs a look, or needs fixing. The score is just those three counts turned into a number out of a hundred, so you can compare two scans at a glance.',
  },
  {
    q: 'Do you store the sites people check?',
    a: 'No. The page is fetched, read, and the result is sent back to your browser. Nothing about the scan is written to a database.',
  },
  {
    q: 'What if a check comes back wrong?',
    a: 'Every result here is read straight from the page itself: the actual HTML, actual response time, actual file size. Nothing is guessed or simulated, so if a check looks wrong, the fastest way to be sure is to view the page source yourself and compare.',
  },
  {
    q: 'Can you fix what it finds?',
    a: 'That is the point of the tool. I am a full stack engineer, and most of what shows up here, a missing tag, a slow response, a page that is not secure, is a normal week of work for me. Send me the report and tell me what you want fixed.',
  },
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Site Check',
    url: `${site.url}/site-check`,
    applicationCategory: 'SEOApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description:
      'Reads a web page and reports on its search visibility, technical setup, content quality and speed signals in plain English.',
    author: { '@type': 'Person', name: site.name, url: site.url },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Site Check', item: `${site.url}/site-check` },
    ],
  },
];

export default function SiteCheckPage() {
  return (
    <>
      {schema.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}

      <PageHead
        label="Free tool"
        title="Site Check"
        intro="Paste in a web address and get a plain answer on what is holding the page back. Search visibility, technical setup, content and speed, checked in about ten seconds. Nothing to install, nothing to sign up for."
      />

      <Section snap={false} className="pt-10 md:pt-14">
        <Reveal>
          <div
            className="rounded-2xl border p-6 sm:p-9 md:p-12"
            style={{ borderColor: 'var(--line-2)', background: 'var(--surface-1)' }}
          >
            <SiteCheckTool />
          </div>
        </Reveal>
      </Section>

      <Section id="what-we-check">
        <div className="flex items-center gap-3">
          <Spark size={10} className="text-primary" />
          <span className="label">What gets checked</span>
        </div>

        <div className="mt-8 max-w-2xl">
          <p className="text-[1.05rem] leading-[1.65] text-gray-400">
            This reads the one page you give it, the same way a visitor's browser would. It does
            not crawl your whole site and it does not need a login. Eighteen checks run across
            four groups, and every one of them is read straight from the page itself, not
            guessed.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2" style={{ borderColor: 'var(--line)', background: 'var(--line)' }}>
          {categories.map((category, i) => (
            <Reveal key={category.name} delay={i * 0.06} className="p-6 sm:p-7" style={{ background: 'var(--bg)' }}>
              <p className="text-[0.6rem] text-gray-500">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-[1.05rem] text-cream">{category.name}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-gray-400">{category.detail}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="faq">
        <div className="flex items-center gap-3">
          <Spark size={10} className="text-primary" />
          <span className="label">Questions people ask</span>
        </div>

        <div className="mt-8 max-w-3xl">
          {faqs.map((faq, i) => (
            <Reveal
              key={faq.q}
              delay={i * 0.04}
              className="border-t py-6 first:border-t-0 first:pt-0"
              style={{ borderColor: 'var(--line)' }}
            >
              <h3 className="text-[1rem] text-cream">{faq.q}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-gray-400">{faq.a}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
