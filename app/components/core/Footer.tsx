import Link from 'next/link';
import { cv, nav, site, socials } from '@/app/data/site';
import {
  Monogram,
  ArrowDiagonal,
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
    <footer className="relative border-t" style={{ borderColor: 'var(--line)', background: 'var(--surface-1)' }}>
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Monogram size={40} className="text-primary" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-gray-400">
              {site.tagline} Based in {site.location}, working with teams across Europe, North
              America and Asia.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-7 inline-block text-[clamp(1.35rem,3vw,2rem)] text-cream transition-colors duration-500 hover:text-primary"
            >
              {site.email}
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="label">Pages</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-gray-400 transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={cv.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={cv.fileName}
                  className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-primary"
                >
                  <MarkDocument size={14} className="opacity-60 group-hover:opacity-100" />
                  Download CV
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label">Elsewhere</p>
            <ul className="mt-5 space-y-2.5">
              {socials.map((s) => {
                const Glyph = glyphs[s.glyph as keyof typeof glyphs];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-sm text-gray-400 transition-colors hover:text-primary"
                    >
                      <Glyph size={15} className="opacity-60 group-hover:opacity-100" />
                      {s.label}
                      <ArrowDiagonal
                        size={12}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-70"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="rule mt-14" />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            {year} {site.name}
          </p>
          <p className="label max-w-md sm:text-right">
            Built with Next.js, GSAP and Lenis. Set in Fraunces, Manrope and IBM Plex Mono.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="label hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="label hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
