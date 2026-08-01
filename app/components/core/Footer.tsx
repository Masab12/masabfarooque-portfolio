import Link from 'next/link';
import { cv, nav, site, socials } from '@/app/data/site';
import {
  Monogram,
  ArrowDiagonal,
  ArrowLong,
  MarkDocument,
  GlyphGithub,
  GlyphLinkedin,
  GlyphFiverr,
  GlyphUpwork,
} from '@/app/components/marks';

const glyphs = {
  github: GlyphGithub,
  linkedin: GlyphLinkedin,
  fiverr: GlyphFiverr,
  upwork: GlyphUpwork,
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black pb-4 sm:pb-6">
      <div className="shell">
      <div className="overflow-hidden rounded-2xl bg-[#101010] md:rounded-[2rem]">
        {/* The address is the loudest thing down here, on purpose */}
        <div className="border-b px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16" style={{ borderColor: 'var(--line)' }}>
          <p className="label">Start here</p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 break-all text-[clamp(1.25rem,5.2vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-cream transition-opacity duration-300 hover:opacity-70"
          >
            {site.email}
            <ArrowLong
              size={22}
              className="shrink-0 text-primary transition-transform duration-500 group-hover:translate-x-2 sm:size-7"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-9 px-5 py-10 sm:grid-cols-2 sm:px-8 sm:py-12 lg:grid-cols-12 lg:gap-8 md:px-10 md:py-14">
          <div className="sm:col-span-2 lg:col-span-4">
            <Monogram size={30} className="text-cream" />
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-gray-400 sm:text-sm">
              {site.tagline} Working from {site.location} with product teams and agencies
              across Europe, North America and Asia.
            </p>
            <p className="label mt-5">
              {site.timezone}
              <span className="mx-2 opacity-40">/</span>
              {site.availability}
            </p>
          </div>

          <nav className="lg:col-span-2 lg:col-start-6">
            <p className="label">Pages</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 transition-colors duration-300 hover:text-cream"
                >
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors duration-300 hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="label">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              {socials.map((s) => {
                const Glyph = glyphs[s.glyph as keyof typeof glyphs];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-sm text-gray-400 transition-colors duration-300 hover:text-cream"
                    >
                      <Glyph size={14} className="opacity-50 group-hover:opacity-100" />
                      {s.label}
                      <ArrowDiagonal
                        size={11}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-60"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="label">Document</p>
            <a
              href={cv.href}
              target="_blank"
              rel="noopener noreferrer"
              download={cv.fileName}
              data-cursor="Download PDF"
              className="group mt-5 flex max-w-xs items-center justify-between gap-3 rounded-xl bg-[#212121] px-4 py-3.5 transition-colors duration-300 hover:bg-[#2a2a2a]"
            >
              <span>
                <span className="block text-sm text-cream">CV</span>
                <span className="label mt-1 block">PDF, {cv.size}</span>
              </span>
              <MarkDocument
                size={17}
                className="text-primary transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 border-t px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between md:px-10"
          style={{ borderColor: 'var(--line)' }}
        >
          <p className="label">
            {year} {site.name}
          </p>
          <p className="label order-last lg:order-none">
            Next.js, Framer Motion, Almarai and Instrument Serif
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="label transition-opacity hover:opacity-100">
              Privacy
            </Link>
            <Link href="/terms" className="label transition-opacity hover:opacity-100">
              Terms
            </Link>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
