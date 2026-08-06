import Link from 'next/link';
import { site, socials } from '@/app/data/site';
import {
  formatPostDate,
  getRelated,
  topicLabels,
  type Post,
} from '@/app/data/posts';
import { covers, type CoverSlug } from '@/app/components/blog/Covers';
import Reveal from '@/app/components/motion/Reveal';
import WordsPullUp from '@/app/components/motion/WordsPullUp';
import { ArrowLong, ArrowDiagonal, GlyphFiverr, Spark } from '@/app/components/marks';

const fiverr = socials.find((s) => s.glyph === 'fiverr');

/**
 * The chrome around every post: masthead, cover, contents rail, body,
 * who wrote it, and where to read next. Article bodies stay in their own
 * route files and get passed in as children.
 */
export default function ArticleLayout({
  post,
  children,
}: {
  post: Post;
  children: React.ReactNode;
}) {
  const Cover = covers[post.slug as CoverSlug];
  const related = getRelated(post.slug);

  return (
    <>
      <article>
        {/* ── Masthead ─────────────────────────────────────────── */}
        <header className="relative px-4 pt-24 sm:px-6 md:px-8 md:pt-32">
          <div className="shell">
            <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2" y={12}>
              <Link href="/blog" className="label plain transition-colors hover:text-primary">
                Writing
              </Link>
              <span className="label opacity-40">/</span>
              <span className="label text-primary">{topicLabels[post.topic]}</span>
              <span className="label opacity-40">/</span>
              <time className="label" dateTime={post.published}>
                {formatPostDate(post.published)}
              </time>
            </Reveal>

            <div className="mt-7 max-w-4xl">
              <WordsPullUp
                as="h1"
                text={post.title}
                className="text-[clamp(1.9rem,5.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.035em]"
              />
            </div>

            <Reveal delay={0.12} className="mt-6 max-w-2xl">
              <p className="text-[1.05rem] leading-[1.55] text-gray-400 sm:text-lg">
                {post.standfirst}
              </p>
            </Reveal>

            <Reveal
              delay={0.2}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-6"
              style={{ borderColor: 'var(--line)' }}
            >
              <span className="label">
                {post.readingMinutes} minute read
              </span>
              <span className="label">
                By {site.name}, {site.location}
              </span>
            </Reveal>
          </div>
        </header>

        {/* ── Cover ────────────────────────────────────────────── */}
        {Cover ? (
          <section className="shell mt-10 md:mt-14">
            <Reveal y={26}>
              <div
                className="overflow-hidden border"
                style={{
                  borderColor: 'var(--line)',
                  borderRadius: 'clamp(14px, 2vw, 26px)',
                }}
              >
                <Cover className="block h-auto w-full" />
              </div>
            </Reveal>
          </section>
        ) : null}

        {/* ── Body with contents rail ──────────────────────────── */}
        <section className="shell py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Contents: a sticky rail from lg up, a collapsed list below it.
                min-w-0 matters here: a grid child defaults to min-width auto,
                so without it the code blocks below would stretch the column to
                their widest line and push this rail off screen on a phone. */}
            <aside className="min-w-0 lg:col-span-3">
              <details
                className="rounded-xl border p-4 lg:hidden"
                style={{ borderColor: 'var(--line)' }}
              >
                <summary className="label cursor-pointer">Contents</summary>
                <ol className="mt-4 space-y-2.5">
                  {post.sections.map((section, i) => (
                    <li key={section.id} className="flex gap-3">
                      <span className="mono shrink-0 text-[0.62rem] text-gray-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <a
                        href={`#${section.id}`}
                        className="plain text-[0.85rem] leading-snug text-gray-400 hover:text-cream"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              <div className="hidden lg:block">
                <div className="sticky top-[calc(var(--nav-h)+2rem)]">
                  <p className="label">Contents</p>
                  <ol className="mt-5 space-y-3">
                    {post.sections.map((section, i) => (
                      <li key={section.id} className="flex gap-3">
                        <span className="mono mt-[0.15rem] shrink-0 text-[0.6rem] text-gray-500">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <a
                          href={`#${section.id}`}
                          className="plain text-[0.82rem] leading-snug text-gray-400 transition-colors hover:text-cream"
                        >
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </aside>

            <div className="article-body min-w-0 lg:col-span-8 lg:col-start-5">{children}</div>
          </div>
        </section>
      </article>

      {/* ── Who wrote this, and what he does ───────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-3" y={14}>
              <p className="label">About the author</p>
            </Reveal>

            <div className="md:col-span-8 md:col-start-5">
              <Reveal y={18}>
                <p className="text-[0.98rem] leading-[1.75] text-gray-400">
                  I am {site.name}, a full stack engineer in {site.location}. I build SaaS
                  platforms, AI systems and data pipelines, and a good part of my work is{' '}
                  <Link href="/services/wordpress-to-nextjs">
                    moving slow WordPress sites onto Next.js
                  </Link>
                  . If your team wants to keep writing in WordPress, I wire it up as a headless CMS
                  so the editor stays exactly where it is while the public site gets served as
                  static files.
                </p>
                <p className="mt-4 text-[0.98rem] leading-[1.75] text-gray-400">
                  If you have a site that needs this, tell me what you are running now and I will
                  give you a straight answer on whether a migration is worth it.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  data-cursor="Say hello"
                  className="plain group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3"
                >
                  Start a project
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
                    <ArrowLong size={14} className="text-cream" />
                  </span>
                </Link>

                {fiverr ? (
                  <a
                    href={fiverr.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plain group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm text-gray-400 transition-colors duration-300 hover:text-cream"
                    style={{ borderColor: 'var(--line-2)' }}
                  >
                    <GlyphFiverr size={14} className="text-primary" />
                    Hire me on Fiverr
                    <ArrowDiagonal size={11} className="opacity-60" />
                  </a>
                ) : null}

                <Link
                  href="/portfolio"
                  className="plain inline-flex items-center gap-2 px-2 py-2.5 text-sm text-gray-400 transition-colors hover:text-cream"
                >
                  See the work
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Read next ──────────────────────────────────────────── */}
      {related.length ? (
        <section className="border-t" style={{ borderColor: 'var(--line)' }}>
          <div className="shell py-14 md:py-20">
            <Reveal className="flex items-center gap-3" y={12}>
              <Spark size={10} className="text-primary" />
              <span className="label">Read next</span>
            </Reveal>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((next, i) => {
                const NextCover = covers[next.slug as CoverSlug];
                return (
                  <Reveal key={next.slug} delay={i * 0.08} y={22}>
                    <Link
                      href={`/blog/${next.slug}`}
                      data-cursor="Read"
                      className="plain group flex h-full flex-col overflow-hidden rounded-xl border transition-colors duration-500 hover:border-hair2"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      {NextCover ? (
                        <div className="overflow-hidden border-b" style={{ borderColor: 'var(--line)' }}>
                          <NextCover className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                        </div>
                      ) : null}
                      <div className="flex flex-1 flex-col p-5">
                        <p className="label">{topicLabels[next.topic]}</p>
                        <p className="mt-3 text-[1.02rem] leading-snug text-cream transition-colors duration-500 group-hover:text-primary">
                          {next.title}
                        </p>
                        <p className="mt-3 flex-1 text-[0.85rem] leading-relaxed text-gray-500">
                          {next.standfirst}
                        </p>
                        <span className="label mt-5">{next.readingMinutes} min</span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

/**
 * Structured data for a post. Rendered by each article route so search
 * engines get the author, the dates and the breadcrumb trail without any
 * of it being duplicated by hand.
 */
export function articleSchema(post: Post) {
  const url = `${site.url}/blog/${post.slug}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: post.published,
      dateModified: post.updated ?? post.published,
      inLanguage: 'en',
      wordCount: post.readingMinutes * 220,
      timeRequired: `PT${post.readingMinutes}M`,
      articleSection: topicLabels[post.topic],
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
      publisher: {
        '@type': 'Person',
        name: site.name,
        url: site.url,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Writing', item: `${site.url}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];
}
