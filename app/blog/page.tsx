import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import { postsByDate, formatPostDate, topicLabels } from '@/app/data/posts';
import { covers, type CoverSlug } from '@/app/components/blog/Covers';
import PageHead from '@/app/components/core/PageHead';
import Reveal from '@/app/components/motion/Reveal';
import ContactCTA from '@/app/components/home/ContactCTA';
import { ArrowLong } from '@/app/components/marks';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on WordPress to Next.js migrations, headless CMS architecture and Core Web Vitals, by Masab Farooque, full stack engineer in Islamabad.',
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    type: 'website',
    title: 'Writing | Masab Farooque',
    description:
      'Notes on WordPress to Next.js migrations, headless CMS architecture and Core Web Vitals.',
    url: `${site.url}/blog`,
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `Writing by ${site.name}`,
  url: `${site.url}/blog`,
  description:
    'Technical writing on WordPress to Next.js migrations, headless CMS architecture and web performance.',
  inLanguage: 'en',
  author: {
    '@type': 'Person',
    name: site.name,
    url: site.url,
    jobTitle: 'Full Stack Engineer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'Pakistan',
    },
  },
  blogPost: postsByDate.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    url: `${site.url}/blog/${post.slug}`,
    datePublished: post.published,
    author: { '@type': 'Person', name: site.name },
  })),
};

export default function BlogIndexPage() {
  const [lead, ...rest] = postsByDate;
  const LeadCover = covers[lead.slug as CoverSlug];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <PageHead
        label="Writing"
        title="Notes from the build"
        intro="Long form pieces on the work I actually do: migrating WordPress sites to Next.js, wiring WordPress up as a headless CMS so editors keep their workflow, and the performance work that follows. Written for the person who has to implement it, not for a newsletter."
        meta={[
          { label: 'Articles', value: String(postsByDate.length) },
          { label: 'Focus', value: 'Next.js, CMS, speed' },
          { label: 'Based in', value: site.location },
          { label: 'Updated', value: formatPostDate(lead.published) },
        ]}
      />

      {/* ── Lead article ─────────────────────────────────────────── */}
      <section className="shell pt-14 md:pt-20">
        <Reveal y={26}>
          <Link
            href={`/blog/${lead.slug}`}
            data-cursor="Read"
            className="group grid gap-7 overflow-hidden rounded-2xl border transition-colors duration-500 hover:border-hair2 md:grid-cols-12 md:gap-0 md:rounded-[1.75rem]"
            style={{ borderColor: 'var(--line)', background: 'var(--surface-1)' }}
          >
            {LeadCover ? (
              <div className="overflow-hidden md:col-span-7">
                <LeadCover className="block h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]" />
              </div>
            ) : null}

            <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-5 md:p-9">
              <div className="flex items-center gap-3">
                <span className="label text-primary">Latest</span>
                <span className="label opacity-40">/</span>
                <span className="label">{topicLabels[lead.topic]}</span>
              </div>

              <h2 className="mt-5 text-[clamp(1.3rem,2.6vw,1.9rem)] font-medium leading-[1.15] tracking-[-0.02em] text-cream transition-colors duration-500 group-hover:text-primary">
                {lead.title}
              </h2>

              <p className="mt-4 text-[0.92rem] leading-relaxed text-gray-400">{lead.summary}</p>

              <div className="mt-7 flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary transition-transform duration-300 group-hover:scale-110">
                  <ArrowLong size={15} className="text-black" />
                </span>
                <span className="label">
                  {lead.readingMinutes} min
                  <span className="mx-2 opacity-40">/</span>
                  {formatPostDate(lead.published)}
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ── The rest ─────────────────────────────────────────────── */}
      <section className="shell py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {rest.map((post, i) => {
            const Cover = covers[post.slug as CoverSlug];
            return (
              <Reveal key={post.slug} delay={i * 0.07} y={24}>
                <Link
                  href={`/blog/${post.slug}`}
                  data-cursor="Read"
                  className="group flex h-full flex-col overflow-hidden rounded-xl border transition-colors duration-500 hover:border-hair2"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface-1)' }}
                >
                  {Cover ? (
                    <div
                      className="overflow-hidden border-b"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <Cover className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="label">{topicLabels[post.topic]}</p>

                    <h2 className="mt-3 text-[1.02rem] leading-snug text-cream transition-colors duration-500 group-hover:text-primary sm:text-[1.08rem]">
                      {post.title}
                    </h2>

                    <p className="mt-3 flex-1 text-[0.85rem] leading-relaxed text-gray-500">
                      {post.standfirst}
                    </p>

                    <span className="label mt-6">
                      {post.readingMinutes} min
                      <span className="mx-2 opacity-40">/</span>
                      {formatPostDate(post.published)}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
