import Link from 'next/link';
import { coordinates, cv, nav, sheetsNotIn, site, socials } from '@/app/data/site';
import { services } from '@/app/data/services';
import { MarkArrow45, MarkRegister } from '@/app/components/marks';

/**
 * The footer is the title block of the drawing set: who drew it, where,
 * how to reach them, the pages the masthead does not link to, and the
 * revision date. The
 * cells are separated by one pixel gaps over a ruled ground, which is how a
 * title block is actually printed.
 *
 * The revision is the date this build was made, since that is the last time
 * anything on the site can have changed.
 */

const revised = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Karachi',
});

function Cell({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-paper p-5 sm:p-6 ${className}`}>
      <p className="label mb-4">{label}</p>
      {children}
    </div>
  );
}

/** Pages the masthead does not already link to. */
const morePages = sheetsNotIn(nav.map((n) => n.href));

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:mt-32 lg:pb-10">
      <div className="shell">
        <div className="relative">
          {/* Registration marks at the corners of the block */}
          <MarkRegister size={14} className="absolute -left-[7px] -top-[7px] text-ink-4" />
          <MarkRegister size={14} className="absolute -right-[7px] -top-[7px] text-ink-4" />

          <div
            className="grid gap-px border md:grid-cols-2 xl:grid-cols-12"
            style={{ borderColor: 'var(--line-2)', background: 'var(--line-2)' }}
          >
            <Cell label="Drawn by" className="md:col-span-2 xl:col-span-5">
              <p className="text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink">
                {site.name}
              </p>
              <p className="mt-2 text-[1.05rem] text-ink-2">
                {site.role}, <span className="serif-italic text-[1.15em] text-sage">{site.location}</span>
              </p>
              <a
                href={`mailto:${site.email}`}
                className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[1.05rem] text-ink underline decoration-[rgb(var(--sage-rgb)/0.45)] decoration-1 underline-offset-[0.3em] transition-colors hover:decoration-sage"
              >
                {site.email}
                <MarkArrow45 size={11} className="text-sage transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="mono mt-3 text-[0.75rem] text-ink-3">
                {site.phone} · {site.timezone}
              </p>
            </Cell>

            <Cell label="More pages" className="xl:col-span-3">
              <ol className="grid grid-cols-1 gap-y-1">
                {morePages.map((sheet) => (
                  <li key={sheet.href}>
                    <Link href={sheet.href} className="group flex min-h-11 items-center gap-3">
                      <span className="mono w-10 shrink-0 text-[0.6875rem] text-ink-3">{sheet.code}</span>
                      <span className="text-[0.9375rem] text-ink-2 transition-colors group-hover:text-ink">{sheet.label}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </Cell>

            <Cell label="Services" className="xl:col-span-2">
              <ul className="space-y-1">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="flex min-h-11 items-center text-[0.9375rem] text-ink-2 transition-colors hover:text-ink">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Cell>

            <Cell label="Elsewhere" className="md:col-span-2 xl:col-span-2">
              <ul className="grid grid-cols-2 gap-y-1 xl:grid-cols-1">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="flex min-h-11 items-center text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={cv.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={cv.fileName}
                    className="flex min-h-11 items-center text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                  >
                    CV, PDF
                  </a>
                </li>
              </ul>
            </Cell>

            {/* The strip along the bottom edge of a title block */}
            <div className="grid gap-px md:col-span-2 sm:grid-cols-2 xl:col-span-12 xl:grid-cols-4" style={{ background: 'var(--line-2)' }}>
              <p className="mono bg-paper px-5 py-3.5 text-[0.6875rem] uppercase text-ink-3 sm:px-6">
                {coordinates}
              </p>
              <p className="mono bg-paper px-5 py-3.5 text-[0.6875rem] uppercase text-ink-3 sm:px-6">
                Rev. {revised}
              </p>
              <p className="mono flex items-center gap-2 bg-paper px-5 py-3.5 text-[0.6875rem] uppercase text-ink-3 sm:px-6">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sage" />
                {site.availability}
              </p>
              <p className="mono flex flex-wrap items-center gap-x-4 bg-paper px-5 py-3.5 text-[0.6875rem] uppercase text-ink-3 sm:px-6">
                <span>© {year}</span>
                <Link href="/privacy" className="hover:text-ink">Privacy</Link>
                <Link href="/terms" className="hover:text-ink">Terms</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
