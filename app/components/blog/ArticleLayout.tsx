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
import CurrentSheet from '@/app/components/core/CurrentSheet';
import ReadingPipe from '@/app/components/blog/ReadingPipe';
import Tilt from '@/app/components/motion/Tilt';
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
      <ReadingPipe targetId="article" />
      <article id="article">
        {/* ── Masthead ─────────────────────────────────────────── */}
        <header>
          <CurrentSheet title={topicLabels[post.topic]} meta={`${post.readingMinutes} minute read`} />
          <div className="shell pt-10 sm:pt-14">
            <nav aria-label="Breadcrumb" className="load-rise flex flex-wrap items-center gap-x-3 gap-y-1" style={{ '--d': '0s' } as React.CSSProperties}>
              <Link href="/blog" className="label plain transition-colors hover:text-sage">Writing</Link>
              <span className="label opacity-40">/</span>
              <span className="label text-sage">{topicLabels[post.topic]}</span>
              <span className="label opacity-40">/</span>
              <time className="label" dateTime={post.published}>{formatPostDate(post.published)}</time>
            </nav>

            <h1 className="load-head mt-6 max-w-[22ch] text-[clamp(2rem,1.2rem+3.3vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink [text-wrap:balance]">
              {post.title}
            </h1>

            <p className="load-rise mt-6 max-w-2xl text-[1.08rem] leading-[1.55] text-ink-2 sm:text-lg" style={{ '--d': '0.15s' } as React.CSSProperties}>
              {post.standfirst}
            </p>

            <div className="load-rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-2 border-t pt-5" style={{ borderColor: 'var(--line)', '--d': '0.25s' } as React.CSSProperties}>
              <span className="label">{post.readingMinutes} minute read</span>
              <span className="label">By {site.name}, {site.location}</span>
              {post.updated ? <span className="label">Revised {formatPostDate(post.updated)}</span> : null}
            </div>
          </div>
        </header>

        {/* ── Cover ────────────────────────────────────────────── */}
        {Cover ? (
          <section className="shell mt-10 md:mt-12">
            <Reveal variant="scale" y={26}>
              <div className="border bg-sheet p-2 sm:p-3" style={{ borderColor: 'var(--line-2)' }}>
                <div className="overflow-hidden border" style={{ borderColor: 'var(--line)' }}>
                  <Cover className="block h-auto w-full" />
                </div>
                <p className="label px-1 pt-2.5">Fig. 0 · {post.standfirst}</p>
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
                      <span className="mono shrink-0 text-[0.6875rem] text-ink-3">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <a
                        href={`#${section.id}`}
                        className="plain text-[0.85rem] leading-snug text-ink-2 hover:text-ink"
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
                        <span className="mono mt-[0.15rem] shrink-0 text-[0.6875rem] text-ink-3">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <a
                          href={`#${section.id}`}
                          className="plain text-[0.82rem] leading-snug text-ink-2 transition-colors hover:text-ink"
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
                <p className="text-[0.98rem] leading-[1.75] text-ink-2">
                  I am {site.name}, a full stack engineer in {site.location}. I build SaaS
                  platforms, AI systems and data pipelines, and a good part of my work is{' '}
                  <Link href="/services/wordpress-to-nextjs">
                    moving slow WordPress sites onto Next.js
                  </Link>
                  . If your team wants to keep writing in WordPress, I wire it up as a headless CMS
                  so the editor stays exactly where it is while the public site gets served as
                  static files.
                </p>
                <p className="mt-4 text-[0.98rem] leading-[1.75] text-ink-2">
                  If you have a site that needs this, tell me what you are running now and I will
                  give you a straight answer on whether a migration is worth it.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="plain group inline-flex items-center gap-2 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-sm font-medium text-paper transition-all duration-300 hover:gap-3"
                >
                  Start a project
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper transition-transform duration-300 group-hover:scale-110">
                    <ArrowLong size={14} className="text-ink" />
                  </span>
                </Link>

                {fiverr ? (
                  <a
                    href={fiverr.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plain group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm text-ink-2 transition-colors duration-300 hover:text-ink"
                    style={{ borderColor: 'var(--line-2)' }}
                  >
                    <GlyphFiverr size={14} className="text-sage" />
                    Hire me on Fiverr
                    <ArrowDiagonal size={11} className="opacity-60" />
                  </a>
                ) : null}

                <Link
                  href="/portfolio"
                  className="plain inline-flex items-center gap-2 px-2 py-2.5 text-sm text-ink-2 transition-colors hover:text-ink"
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
              <Spark size={10} className="text-sage" />
              <span className="label">Read next</span>
            </Reveal>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((next, i) => {
                const NextCover = covers[next.slug as CoverSlug];
                return (
                  <Reveal key={next.slug} delay={i * 0.08} y={22}>
                    <Tilt max={3}>
                    <Link
                      href={`/blog/${next.slug}`}
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
                        <p className="mt-3 text-[1.02rem] leading-snug text-ink transition-colors duration-500 group-hover:text-sage">
                          {next.title}
                        </p>
                        <p className="mt-3 flex-1 text-[0.85rem] leading-relaxed text-ink-3">
                          {next.standfirst}
                        </p>
                        <span className="label mt-5">{next.readingMinutes} min</span>
                      </div>
                    </Link>
                    </Tilt>
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

/**
 * FAQPage structured data built from the same array the article renders, so a
 * question can never appear in the markup without appearing in the schema.
 */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
