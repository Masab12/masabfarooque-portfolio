import type { Metadata } from 'next';
import { site } from '@/app/data/site';
import { reviews, reviewSummary } from '@/app/data/reviews';
import PageHead from '@/app/components/core/PageHead';
import Reveal from '@/app/components/motion/Reveal';
import ReviewCard from '@/app/components/reviews/ReviewCard';
import { formatReviewDate } from '@/app/lib/reviewDate';
import ContactCTA from '@/app/components/home/ContactCTA';
import { ArrowDiagonal, GlyphFiverr, Spark } from '@/app/components/marks';

export const metadata: Metadata = {
  title: 'Client reviews',
  description: `${reviewSummary.total} reviews at a ${reviewSummary.average.toFixed(1)} average from clients in ${reviewSummary.countries} countries, imported from Fiverr and shown exactly as written.`,
  alternates: { canonical: `${site.url}/reviews` },
  keywords: [
    'Masab Farooque reviews',
    'freelance developer reviews',
    'Fiverr developer reviews',
    'Next.js developer testimonials',
    'hire developer Islamabad reviews',
  ],
  openGraph: {
    type: 'website',
    title: 'Client reviews | Masab Farooque',
    description: `${reviewSummary.total} reviews at a ${reviewSummary.average.toFixed(1)} average from clients in ${reviewSummary.countries} countries.`,
    url: `${site.url}/reviews`,
  },
};

/** Countries represented in the sample shown on this page. */
const countries = [...new Set(reviews.map((r) => r.country).filter(Boolean))].sort();

const reviewsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: `${site.url}/reviews`,
  image: `${site.url}/og-image.webp`,
  email: site.email,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressRegion: 'Islamabad Capital Territory',
    addressCountry: 'PK',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: reviewSummary.average,
    reviewCount: reviewSummary.total,
    bestRating: 5,
    worstRating: 1,
  },
  review: reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    datePublished: r.date.split('T')[0],
    reviewBody: r.comment,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'Client reviews', item: `${site.url}/reviews` },
  ],
};

export default function ReviewsPage() {
  const newest = formatReviewDate(reviewSummary.newest);

  return (
    <>
      {[reviewsSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageHead
        label="Reviews"
        title="What clients said"
        intro={`Every review below was written by the client and is shown exactly as they left it. Nothing is edited, nothing is cherry picked out of a worse set. The ${reviews.length} most recent are here in full, out of ${reviewSummary.total} total.`}
        meta={[
          { label: 'Average rating', value: reviewSummary.average.toFixed(1) },
          { label: 'Total reviews', value: String(reviewSummary.total) },
          { label: 'Countries', value: String(reviewSummary.countries) },
          { label: 'Came back', value: `${reviewSummary.repeatShare}%` },
        ]}
      />

      {/* ── The reviews ─────────────────────────────────────────── */}
      <section className="shell py-14 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={(i % 3) * 0.05} y={20} className="h-full">
              <ReviewCard review={review} clamp={false} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Where they came from ────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3" y={14}>
              <div className="flex items-center gap-3">
                <Spark size={10} className="text-primary" />
                <span className="label">Where they came from</span>
              </div>
            </Reveal>

            <div className="md:col-span-8 md:col-start-5">
              <Reveal y={18}>
                <p className="text-[0.98rem] leading-[1.75] text-gray-400">
                  Clients on this page are based in {countries.length} countries. Across all{' '}
                  {reviewSummary.total} reviews the number is {reviewSummary.countries}. Most work
                  is remote, and {reviewSummary.repeatShare}% of clients came back for a second
                  project, which is the number I pay the most attention to.
                </p>
              </Reveal>

              <Reveal delay={0.08} className="mt-7 flex flex-wrap gap-1.5">
                {countries.map((country) => (
                  <span
                    key={country}
                    className="border px-2.5 py-1 text-[0.62rem] text-gray-400"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    {country}
                  </span>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Provenance ──────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-14 md:py-20">
          <Reveal
            className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center"
            y={16}
          >
            <p className="max-w-2xl text-xs leading-relaxed text-gray-500">
              Reviews and profile photos are imported from my Fiverr seller profile, newest first,
              with the most recent left on {newest}. Fiverr is a trademark of its owner and this
              site is not affiliated with or endorsed by Fiverr. You can check every one of them
              against the source.
            </p>

            <a
              href={reviewSummary.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full border px-5 py-3 text-sm transition-colors duration-500 hover:border-hair2"
              style={{ borderColor: 'var(--line-2)' }}
            >
              <GlyphFiverr size={15} className="text-primary" />
              Verify on Fiverr
              <ArrowDiagonal
                size={12}
                className="text-primary transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
