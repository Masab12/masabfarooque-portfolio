import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLong, Monogram } from './components/marks';

/**
 * Its own title and a noindex rule, so the 404 stops sharing the homepage
 * title in search results and never gets indexed in the first place.
 */
export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page is not here. Links to the work, the writing and the contact form.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden py-24 text-center">

      <div className="shell relative">
        <Monogram size={44} className="mx-auto text-primary" />

        <p className="mt-10 text-[clamp(4rem,18vw,13rem)] leading-none">404</p>

        <h1 className="mt-4 text-[clamp(1.3rem,3vw,2.2rem)] text-cream">
          This page is not here
        </h1>

        <p className="text-lede mx-auto mt-5 max-w-md">
          The link is either old or slightly wrong. The work, the story and the contact form are
          all still where you left them.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-7 py-4 text-sm uppercase tracking-[0.16em]"
            style={{ background: 'var(--cream)', color: 'var(--bg)' }}
          >
            Back home
            <ArrowLong size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 border px-7 py-4 text-sm transition-colors hover:border-hair2"
            style={{ borderColor: 'var(--line-2)' }}
          >
            See the work
            <ArrowLong size={15} className="text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
