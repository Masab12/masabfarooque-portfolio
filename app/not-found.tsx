import Link from 'next/link';
import { ArrowLong, Monogram } from './components/marks';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden py-24 text-center">
      <div className="warp" />

      <div className="shell relative">
        <Monogram size={44} className="mx-auto text-brass" />

        <p className="display foil mt-10 text-[clamp(4rem,18vw,13rem)] leading-none">404</p>

        <h1 className="display-tight mt-4 text-[clamp(1.3rem,3vw,2.2rem)] text-bone">
          This page is not here
        </h1>

        <p className="lede mx-auto mt-5 max-w-md">
          The link is either old or slightly wrong. The work, the story and the contact form are
          all still where you left them.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-7 py-4 text-sm uppercase tracking-[0.16em]"
            style={{ background: 'var(--brass)', color: 'var(--ink)' }}
          >
            Back home
            <ArrowLong size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 border px-7 py-4 text-sm transition-colors hover:border-brass"
            style={{ borderColor: 'var(--line-2)' }}
          >
            See the work
            <ArrowLong size={15} className="text-brass transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
