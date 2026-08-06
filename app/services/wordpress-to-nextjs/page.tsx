import type { Metadata } from 'next';
import Link from 'next/link';
import { site, socials } from '@/app/data/site';
import { reviewSummary } from '@/app/data/reviews';
import { getPost } from '@/app/data/posts';
import PageHead from '@/app/components/core/PageHead';
import Reveal from '@/app/components/motion/Reveal';
import ContactCTA from '@/app/components/home/ContactCTA';
import {
  ArrowLong,
  ArrowDiagonal,
  MarkCheck,
  GlyphFiverr,
  Spark,
} from '@/app/components/marks';

const fiverr = socials.find((s) => s.glyph === 'fiverr');

export const metadata: Metadata = {
  title: 'WordPress to Next.js migration',
  description:
    'I move WordPress sites to Next.js without losing rankings, and can keep WordPress as a headless CMS so your team keeps the editor. Fixed price, clean handover.',
  alternates: { canonical: `${site.url}/services/wordpress-to-nextjs` },
  keywords: [
    'WordPress to Next.js migration service',
    'headless WordPress developer',
    'Next.js developer Islamabad',
    'migrate WordPress to Next.js',
    'hire Next.js developer Pakistan',
  ],
  openGraph: {
    type: 'website',
    title: 'WordPress to Next.js migration | Masab Farooque',
    description:
      'Migrations that keep your rankings, and headless WordPress setups that keep your editor. Written scope, fixed price, documented handover.',
    url: `${site.url}/services/wordpress-to-nextjs`,
  },
};

/* ── What the work covers ─────────────────────────────────────── */

const included = [
  {
    title: 'A full URL audit before anything moves',
    body: 'Every indexed URL pulled from your sitemap, Search Console and server logs, then frozen into a list we both agree on.',
  },
  {
    title: 'A tested redirect map',
    body: 'Old paths mapped to new ones and verified with an automated check, so nothing lands on a 404 the day you switch.',
  },
  {
    title: 'Metadata carried across intact',
    body: 'Titles, descriptions, canonicals, robots rules and social cards moved out of Yoast and rebuilt in the Metadata API.',
  },
  {
    title: 'Structured data rebuilt',
    body: 'The schema graph your plugin was emitting, written cleanly so breadcrumbs and article markup survive the move.',
  },
  {
    title: 'Core Web Vitals work',
    body: 'Images, fonts and layout stability handled during the build rather than bolted on after launch.',
  },
  {
    title: 'Headless WordPress, if you want it',
    body: 'Your editors keep the same login, the same block editor and the same media library. Only the public front end changes.',
  },
  {
    title: 'Documentation and a walkthrough',
    body: 'A repository you own, a readme that gets a developer running locally, and a recorded call covering the deploy.',
  },
  {
    title: 'A support window after launch',
    body: 'Launch is when real problems appear. I stay available afterwards instead of disappearing at handover.',
  },
];

/* ── Shapes of project, with honest ranges ────────────────────── */

const shapes = [
  {
    name: 'Brochure site',
    scale: 'Up to about 30 pages',
    timeline: '1 to 2 weeks',
    detail:
      'Marketing pages, a contact form, no blog archive to speak of. Usually the cleanest migration there is.',
  },
  {
    name: 'Content site',
    scale: 'Roughly 50 to 500 posts',
    timeline: '2 to 5 weeks',
    detail:
      'A real blog with categories, tags, authors and years of accumulated SEO. This is where the redirect map earns its keep.',
  },
  {
    name: 'Content site, headless',
    scale: 'Any size, editors stay in WordPress',
    timeline: '3 to 6 weeks',
    detail:
      'Everything above, plus WordPress wired up as a headless CMS with instant publishing through a webhook.',
  },
  {
    name: 'Something more involved',
    scale: 'Membership, WooCommerce, custom post types',
    timeline: 'Scoped case by case',
    detail:
      'These need a proper look before anyone quotes a number. Sometimes the honest answer is that you should not migrate at all.',
  },
];

/* ── Process ──────────────────────────────────────────────────── */

const steps = [
  {
    index: '01',
    title: 'A look at what you have',
    body: 'You send me the URL and tell me what is bothering you. I look at the site, the page count and what it depends on, then tell you whether a migration is worth doing. This part is free and sometimes ends with me saying no.',
  },
  {
    index: '02',
    title: 'A written scope and a number',
    body: 'Deliverables, timeline and price in writing before anything starts. The number does not move unless the scope does, and scope changes get quoted separately.',
  },
  {
    index: '03',
    title: 'Build on staging',
    body: 'The new site goes up somewhere private where you can click through it. Redirects, metadata and structured data get verified against the live site while the live site is still running.',
  },
  {
    index: '04',
    title: 'Switch, then watch',
    body: 'DNS moves once everything checks out. Then I watch Search Console for crawl errors and coverage changes through the weeks that actually matter.',
  },
];

/* ── FAQ, which also feeds the FAQPage schema ─────────────────── */

const faqs = [
  {
    q: 'Will I lose my Google rankings?',
    a: 'Not if the routing work is done properly. Rankings drop when URLs change without redirects, when metadata gets dropped, or when the new site blocks crawlers by accident. All three are preventable, and all three are on my checklist before launch. I verify the redirect map with an automated pass and diff every meta tag between the old site and staging before DNS moves.',
  },
  {
    q: 'Can my team keep using the WordPress editor?',
    a: 'Yes. That is the headless setup, and it is what I recommend for teams that publish often. WordPress keeps running privately as your content database with the same admin, the same block editor and the same media library. Next.js reads from it over the API and serves static pages to visitors. Editors see one change: the view link points at the new site.',
  },
  {
    q: 'How much does it cost?',
    a: 'It depends on page count, how much custom functionality exists, and whether you want the headless setup. I quote a fixed price per project after looking at the site, not an hourly rate, so you know the number before anything starts. Send me the URL and you will get a real figure rather than a range.',
  },
  {
    q: 'How long does it take?',
    a: 'A brochure site is usually one to two weeks. A content site with a few hundred posts runs two to five weeks. Adding headless WordPress puts it at three to six. Anything with membership, WooCommerce or heavy custom post types gets scoped case by case, because guessing at those is how projects go wrong.',
  },
  {
    q: 'What happens to my images and media?',
    a: 'They come across. For most sites I move uploads to object storage behind a CDN, which takes the load off the origin server and makes images faster to serve. Existing URLs get redirected so anything already linked elsewhere keeps working.',
  },
  {
    q: 'What if I want to hire someone else later?',
    a: 'You should be able to. You own the repository from day one, the readme gets a new developer running locally in under fifteen minutes, environment variables are documented with a checked in example file, and the deploy is recorded on video. I build for handover because referrals are worth more to me than lock in.',
  },
  {
    q: 'Do you work with clients outside Pakistan?',
    a: `Most of my work is remote. I am based in ${site.location} on ${site.timezone} and I keep overlap hours with Europe and North America. Clients in ${reviewSummary.countries} countries so far, and time zone has never been the reason a project slipped.`,
  },
  {
    q: 'What if my site should not be migrated?',
    a: 'I will tell you. Sites leaning hard on WooCommerce, page builders like Elementor or Divi, or a large plugin ecosystem are often better off staying where they are and getting faster instead. Talking you out of a migration costs me one job and saves you a bad quarter.',
  },
];

/* ── Structured data ──────────────────────────────────────────── */

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'WordPress to Next.js migration',
  serviceType: 'Web development',
  description:
    'Migrating WordPress sites to Next.js without losing search rankings, including headless WordPress setups where the editorial team keeps the WordPress admin.',
  url: `${site.url}/services/wordpress-to-nextjs`,
  provider: {
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: '+923045624189',
    image: `${site.url}/og-image.webp`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressRegion: 'Islamabad Capital Territory',
      addressCountry: 'PK',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 33.6844, longitude: 73.0479 },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewSummary.average,
      reviewCount: reviewSummary.total,
      bestRating: 5,
    },
  },
  areaServed: [
    { '@type': 'Country', name: 'Pakistan' },
    { '@type': 'Place', name: 'Worldwide, remote' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Migration options',
    itemListElement: shapes.map((shape) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `${shape.name} migration`,
        description: `${shape.detail} Typical timeline: ${shape.timeline}.`,
      },
    })),
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'WordPress to Next.js migration',
      item: `${site.url}/services/wordpress-to-nextjs`,
    },
  ],
};

/* ── Page ─────────────────────────────────────────────────────── */

const guides = [
  'wordpress-to-nextjs-migration',
  'yoast-metadata-to-nextjs',
  'wordpress-as-headless-cms',
  'hosting-headless-wordpress',
] as const;

export default function ServicePage() {
  return (
    <>
      {[serviceSchema, faqSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageHead
        label="Service"
        title="WordPress to Next.js"
        intro="I move WordPress sites onto Next.js without losing the rankings you already have. If your team wants to keep writing in WordPress, I wire it up as a headless CMS so the editor never changes."
        meta={[
          { label: 'Typical timeline', value: '1 to 6 weeks' },
          { label: 'Pricing', value: 'Fixed per project' },
          { label: 'Reviews', value: `${reviewSummary.average.toFixed(1)} from ${reviewSummary.total}` },
          { label: 'Based in', value: site.location },
        ]}
      />

      {/* ── The problem ─────────────────────────────────────────── */}
      <section className="shell py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3" y={14}>
            <div className="flex items-center gap-3">
              <Spark size={10} className="text-primary" />
              <span className="label">The problem</span>
            </div>
          </Reveal>

          <div className="md:col-span-8 md:col-start-5">
            <Reveal y={18}>
              <p className="text-[1.05rem] leading-[1.7] text-cream/90 sm:text-lg">
                Your WordPress site works. It is also slow, it needs constant plugin updates, and
                every performance fix means another plugin on top of the last one.
              </p>
              <p className="mt-5 text-[0.98rem] leading-[1.75] text-gray-400">
                Rebuilding it in Next.js solves the speed problem outright, because visitors get
                static files from a CDN instead of PHP hitting a database. The risk is not the
                rebuild. It is the move. Migrations lose traffic when URLs change without
                redirects, when metadata gets dropped on the way across, or when nobody checks
                Search Console until a month has passed.
              </p>
              <p className="mt-5 text-[0.98rem] leading-[1.75] text-gray-400">
                That is the part I handle carefully, and it is most of what you are paying for.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What is included ────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Reveal className="flex items-center gap-3" y={12}>
            <Spark size={10} className="text-primary" />
            <span className="label">What the work covers</span>
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2"
            style={{ borderColor: 'var(--line)', background: 'var(--line)' }}
          >
            {included.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 2) * 0.06}
                y={16}
                className="h-full p-6 md:p-7"
                style={{ background: 'var(--bg)' }}
              >
                <span className="flex items-start gap-3">
                  <MarkCheck size={15} className="mt-1 shrink-0 text-primary" />
                  <span>
                    <span className="block text-[0.98rem] leading-snug text-cream">
                      {item.title}
                    </span>
                    <span className="mt-2.5 block text-[0.88rem] leading-relaxed text-gray-400">
                      {item.body}
                    </span>
                  </span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project shapes ──────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Reveal className="flex items-center gap-3" y={12}>
            <Spark size={10} className="text-primary" />
            <span className="label">Shapes of project</span>
          </Reveal>

          <Reveal y={16} className="mt-6 max-w-2xl">
            <p className="text-[0.98rem] leading-[1.75] text-gray-400">
              Timelines below are what these usually take, not a promise made before I have seen
              your site. You get a real number in writing after I look at it.
            </p>
          </Reveal>

          <div className="mt-10 overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--line)' }}>
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr>
                  {['Project', 'Scale', 'Typical timeline', 'Notes'].map((head) => (
                    <th
                      key={head}
                      className="label border-b px-5 py-3.5 font-normal"
                      style={{ borderColor: 'var(--line-2)', background: 'var(--surface-1)' }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shapes.map((shape) => (
                  <tr key={shape.name}>
                    <td
                      className="border-b px-5 py-4 align-top text-[0.92rem] text-cream"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {shape.name}
                    </td>
                    <td
                      className="border-b px-5 py-4 align-top text-[0.88rem] text-gray-400"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {shape.scale}
                    </td>
                    <td
                      className="border-b px-5 py-4 align-top text-[0.88rem] text-primary"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {shape.timeline}
                    </td>
                    <td
                      className="border-b px-5 py-4 align-top text-[0.88rem] leading-relaxed text-gray-400"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {shape.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Reveal className="flex items-center gap-3" y={12}>
            <Spark size={10} className="text-primary" />
            <span className="label">How it runs</span>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-x-14">
            {steps.map((step, i) => (
              <Reveal key={step.index} delay={(i % 2) * 0.06} y={18}>
                <div className="border-t pt-6" style={{ borderColor: 'var(--line-2)' }}>
                  <p className="mono text-[0.7rem] text-primary">{step.index}</p>
                  <p className="mt-3 text-[1.02rem] leading-snug text-cream">{step.title}</p>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-gray-400">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof ───────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3" y={14}>
              <div className="flex items-center gap-3">
                <Spark size={10} className="text-primary" />
                <span className="label">Track record</span>
              </div>
            </Reveal>

            <div className="md:col-span-8 md:col-start-5">
              <Reveal
                stagger={0.06}
                className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4"
                style={{ borderColor: 'var(--line)', background: 'var(--line)' }}
              >
                {[
                  { value: reviewSummary.average.toFixed(1), label: 'Average rating' },
                  { value: String(reviewSummary.total), label: 'Client reviews' },
                  { value: String(reviewSummary.countries), label: 'Countries' },
                  { value: `${reviewSummary.repeatShare}%`, label: 'Came back' },
                ].map((stat) => (
                  <div key={stat.label} className="p-5 md:p-6" style={{ background: 'var(--bg)' }}>
                    <p className="text-[clamp(1.3rem,3vw,2.1rem)] text-primary">{stat.value}</p>
                    <p className="label mt-2">{stat.label}</p>
                  </div>
                ))}
              </Reveal>

              <Reveal delay={0.1} y={16}>
                <p className="mt-7 text-[0.95rem] leading-[1.75] text-gray-400">
                  Every review is written by the client and shown unedited. You can read them all on
                  my public profile, and the{' '}
                  <Link href="/portfolio" className="text-cream underline decoration-[var(--line-3)] underline-offset-4 hover:decoration-current">
                    case studies
                  </Link>{' '}
                  cover what each project does and what was hard about it.
                </p>
              </Reveal>

              <Reveal delay={0.16} className="mt-7 flex flex-wrap gap-3">
                {fiverr ? (
                  <a
                    href={fiverr.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm text-gray-400 transition-colors duration-300 hover:text-cream"
                    style={{ borderColor: 'var(--line-2)' }}
                  >
                    <GlyphFiverr size={14} className="text-primary" />
                    Read the reviews
                    <ArrowDiagonal size={11} className="opacity-60" />
                  </a>
                ) : null}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Reveal className="flex items-center gap-3" y={12}>
            <Spark size={10} className="text-primary" />
            <span className="label">Questions I get asked</span>
          </Reveal>

          <div className="mt-10 grid gap-x-14 gap-y-9 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={(i % 2) * 0.05} y={16}>
                <div className="border-t pt-6" style={{ borderColor: 'var(--line)' }}>
                  <h2 className="text-[0.98rem] leading-snug text-cream">{faq.q}</h2>
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-gray-400">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guides ──────────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Reveal className="flex items-center gap-3" y={12}>
            <Spark size={10} className="text-primary" />
            <span className="label">How I do this work</span>
          </Reveal>

          <Reveal y={16} className="mt-6 max-w-2xl">
            <p className="text-[0.98rem] leading-[1.75] text-gray-400">
              I have written the method down in full. Read these before you hire anyone, including
              me, because they will tell you whether the person you are talking to knows what they
              are doing.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {guides.map((slug, i) => {
              const guide = getPost(slug);
              if (!guide) return null;
              return (
                <Reveal key={slug} delay={(i % 2) * 0.06} y={18}>
                  <Link
                    href={`/blog/${slug}`}
                    data-cursor="Read"
                    className="group flex h-full flex-col rounded-xl border p-5 transition-colors duration-500 hover:border-hair2"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <p className="text-[0.98rem] leading-snug text-cream transition-colors duration-500 group-hover:text-primary">
                      {guide.title}
                    </p>
                    <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-gray-500">
                      {guide.standfirst}
                    </p>
                    <span className="mt-5 flex items-center gap-2">
                      <span className="label">{guide.readingMinutes} min read</span>
                      <ArrowLong
                        size={14}
                        className="text-primary transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
