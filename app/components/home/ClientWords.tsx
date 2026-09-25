import { reviews, reviewSummary } from '@/app/data/reviews';
import { formatReviewDate } from '@/app/lib/reviewDate';
import Section from '@/app/components/core/Section';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/motion/Reveal';

/**
 * Three reviews, chosen because each one names what was actually built
 * rather than only praising. Quoted exactly as the client wrote them. The
 * full set is on /reviews, so the same text is not indexed twice in full:
 * each quote here stops at a sentence boundary and says so.
 */

const PICKS = [
  '6a2a5c6d484d8846bce651d1', // a scraper brief that became a FastAPI service
  '691d2ed750695d4c5d31e3e7', // a multilingual AI business system
  '69a074cb759dbd2e6bd5bf36', // a scraping SaaS, end to end
];

function excerpt(text: string, max = 300) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '));
  return `${cut.slice(0, end > 120 ? end + 1 : max).trim()} …`;
}

export default function ClientWords() {
  const picked = PICKS.map((id) => reviews.find((r) => r.id === id)).filter(
    (r): r is (typeof reviews)[number] => Boolean(r),
  );

  return (
    <Section id="reviews" labelledBy="reviews-title">
      <SectionHeader
        id="reviews-title"
        label="A-05 · Reviews"
        title="What clients wrote afterwards."
        intro={`${reviewSummary.total} reviews at a ${reviewSummary.average.toFixed(1)} average, from clients in ${reviewSummary.countries} countries. These three describe the work itself.`}
        action={{ href: '/reviews', label: 'Read all of them' }}
      />

      <Reveal
        stagger={0.12}
        y={30}
        className="mt-12 grid gap-px border sm:mt-14 lg:grid-cols-3"
        style={{ borderColor: 'var(--line-2)', background: 'var(--line-2)' }}
      >
        {picked.map((review) => (
          <figure key={review.id} className="flex flex-col bg-paper p-6 sm:p-8">
            <blockquote className="flex-1 text-[1.02rem] leading-relaxed text-ink">
              <p>{excerpt(review.comment)}</p>
            </blockquote>
            <figcaption className="mt-7 flex items-baseline justify-between gap-4 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
              <span className="text-[0.9375rem] font-bold text-ink">{review.name}</span>
              <span className="label text-right">
                {review.country} · {formatReviewDate(review.date)}
              </span>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </Section>
  );
}
