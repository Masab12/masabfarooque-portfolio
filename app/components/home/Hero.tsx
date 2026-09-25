import Link from 'next/link';
import { site } from '@/app/data/site';
import { reviewSummary } from '@/app/data/reviews';
import SheetHeader from '@/app/components/core/SheetHeader';
import LiveSystem from '@/app/components/home/LiveSystem';
import { MarkArrow45 } from '@/app/components/marks';

/**
 * The cover sheet: a running system across the whole stage, with the name
 * and the claim set over its lower left corner.
 *
 * The heading and copy are server markup and come first in the document, so
 * they are what a search engine reads first and what the browser measures as
 * the largest paint. On a phone the stage shows first and the words sit
 * under it; on a wide screen the words sit on the stage.
 */

const facts = [
  { term: 'Client reviews', value: `${reviewSummary.total}`, note: `${reviewSummary.average.toFixed(1)} average` },
  { term: 'Countries', value: `${reviewSummary.countries}`, note: 'clients have ordered from' },
  { term: 'Orders delivered', value: '195+', note: 'to date' },
  { term: 'Came back', value: `${reviewSummary.repeatShare}%`, note: 'of clients ordered again' },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <SheetHeader code="A-00" title="Cover sheet" meta={`Working hours ${site.timezone}`} />

      <div className="relative flex flex-col lg:block lg:h-[calc(100svh-var(--nav-h)-2.75rem)] lg:min-h-[44rem]">
        {/* Words, first in the document */}
        <div className="shell relative z-10 order-1 pb-6 pt-8 lg:pointer-events-none lg:absolute lg:bottom-0 lg:left-0 lg:max-w-[46rem] lg:pb-10 lg:pr-0 xl:max-w-[52rem]">
          <p className="label">Full stack engineer · Islamabad, Pakistan</p>
          <h1
            id="hero-title"
            className="mt-4 text-[clamp(2.4rem,1rem+4.3vw,5.4rem)] font-extrabold leading-[0.97] tracking-[-0.045em] text-ink [text-wrap:balance]"
          >
            Masab Farooque builds software that{' '}
            <span className="serif-italic text-[1.08em] leading-[0.9] text-sage">holds up after launch.</span>
          </h1>
          <p className="text-lede mt-5 max-w-[34rem]">
            SaaS platforms, AI systems and data pipelines, built end to end for product teams and
            agencies. The drawing is the shape most of that work takes, and it is running.
          </p>
          <div className="pointer-events-auto mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-ink pl-6 pr-5 text-[0.9375rem] font-bold text-paper transition-colors duration-300 hover:bg-sage"
            >
              Start a project
              <MarkArrow45 size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center rounded-full border bg-paper/80 px-6 text-[0.9375rem] font-bold text-ink backdrop-blur-sm transition-colors duration-300 hover:border-hair3 hover:bg-sheet"
              style={{ borderColor: 'var(--line-2)' }}
            >
              See the work
            </Link>
          </div>
        </div>

        {/* The stage */}
        <div className="order-2 pb-10 lg:absolute lg:inset-0 lg:pb-0">
          <div className="shell grid gap-3 pt-3 lg:block lg:h-full lg:max-w-none lg:p-0">
            <LiveSystem />
          </div>
        </div>
      </div>

      <div className="shell">
        <dl
          className="grid grid-cols-2 gap-px border lg:grid-cols-4"
          style={{ borderColor: 'var(--line-2)', background: 'var(--line-2)' }}
        >
          {facts.map((fact) => (
            <div key={fact.term} className="flex flex-col gap-1 bg-paper px-4 py-4 sm:px-6 sm:py-5">
              <dt className="label">{fact.term}</dt>
              <dd className="text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-extrabold leading-none tracking-[-0.03em] text-ink">
                {fact.value}
              </dd>
              <dd className="text-[0.8125rem] text-ink-3">{fact.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
