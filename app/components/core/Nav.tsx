'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { coordinates, cv, nav, sheetsNotIn, site, socials } from '@/app/data/site';
import { CloseMark, MarkArrow45, MarkDocument } from '@/app/components/marks';

/**
 * The masthead, and on smaller screens a bottom bar.
 *
 * From 1024px up everything lives in one fixed strip across the top: the
 * name with its coordinates, the five pages in a pill, and the one action
 * that matters. Below that, the page links move to a bar at the bottom of
 * the screen where a thumb can reach them, and the top strip keeps only the
 * name and the contact button. Every target is at least 44px tall.
 */

/** What the phone bar shows: the five pages minus Reviews, for room. */
const barItems = nav.filter((item) => item.href !== '/reviews');
/** And what its More sheet adds: only pages the bar does not already hold. */
const morePages = sheetsNotIn(barItems.map((item) => item.href));

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();
  const isActive = useIsActive();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      {/* ── Masthead ─────────────────────────────────────────── */}
      <header
        className="fixed inset-x-0 top-0 z-50 border-b bg-paper/85 backdrop-blur-md"
        style={{ borderColor: 'var(--line)', height: 'var(--nav-h)' }}
      >
        <div className="shell flex h-full items-center justify-between gap-4">
          <Link href="/" aria-label={`${site.name}, home`} className="group flex min-h-11 min-w-0 flex-col justify-center gap-0.5">
            <span className="truncate text-[0.8125rem] font-extrabold uppercase leading-none tracking-[0.08em] text-ink">
              {site.name}
            </span>
            <span className="mono hidden truncate text-[0.6875rem] leading-none text-ink-3 xs:block">
              {coordinates} · {site.location.split(',')[0]}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border bg-plate p-1" style={{ borderColor: 'var(--line)' }}>
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`mono flex h-9 items-center rounded-full px-4 text-[0.75rem] uppercase tracking-[0.04em] transition-[color,background-color,box-shadow] duration-300 ${
                        active
                          ? 'bg-sheet text-ink shadow-[0_1px_2px_rgb(22_24_23/0.08)]'
                          : 'text-ink-2 hover:text-ink'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-2 xl:flex">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sage" />
              <span className="label">{site.availability}</span>
            </span>

            <a
              href={cv.href}
              target="_blank"
              rel="noopener noreferrer"
              download={cv.fileName}
              title={`${cv.label}, PDF, ${cv.size}`}
              className="mono hidden h-11 items-center gap-1.5 rounded-full px-3 text-[0.75rem] uppercase text-ink-2 transition-colors hover:text-ink lg:flex"
            >
              <MarkDocument size={15} />
              CV
            </a>

            <Link
              href="/contact"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink pl-4 pr-3 text-[0.8125rem] font-bold text-paper transition-colors duration-300 hover:bg-sage sm:pl-5"
            >
              <span className="sm:hidden">Contact</span>
              <span className="hidden sm:inline">Start a project</span>
              <MarkArrow45 size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Bottom bar, under 1024px ─────────────────────────── */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 z-50 flex justify-center px-3 lg:hidden"
        style={{ bottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <ul
          className="flex w-full max-w-[26rem] items-stretch rounded-full border bg-sheet/95 p-1 shadow-[0_10px_30px_-12px_rgb(22_24_23/0.28)] backdrop-blur-md"
          style={{ borderColor: 'var(--line-2)' }}
        >
          {barItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="flex-1">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`mono flex h-11 items-center justify-center rounded-full text-[0.6875rem] uppercase tracking-normal transition-colors ${
                      active ? 'bg-ink text-paper' : 'text-ink-2'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
            );
          })}
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-index"
              className="mono flex h-11 w-full items-center justify-center rounded-full text-[0.6875rem] uppercase tracking-normal text-ink-2"
            >
              More
            </button>
          </li>
        </ul>
      </nav>

      {/* ── The full index, as a sheet that rises from the bar ──
          Always mounted and driven by `open`, with `inert` taking the
          closed panel out of the tab order and the accessibility tree. */}
      <motion.div
        id="site-index"
        role="dialog"
        aria-modal="true"
        aria-label="More pages"
        initial={false}
        animate={{ y: open ? '0%' : '100%' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        inert={!open}
        className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper lg:hidden"
      >
        <div className="shell flex items-center justify-between border-b py-3" style={{ borderColor: 'var(--line)' }}>
          <span className="label">More pages</span>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full border text-ink"
            style={{ borderColor: 'var(--line-2)' }}
          >
            <CloseMark size={18} />
          </button>
        </div>

        <ol className="shell flex-1 py-4">
          {morePages.map((sheet) => {
            const active = isActive(sheet.href);
            return (
              <li key={sheet.href} className="border-b" style={{ borderColor: 'var(--line)' }}>
                <Link
                  href={sheet.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className="flex min-h-[3.5rem] items-baseline gap-4 py-3"
                >
                  <span className="mono w-12 shrink-0 text-[0.75rem] text-ink-3">{sheet.code}</span>
                  <span className={`text-[1.65rem] font-extrabold leading-tight tracking-[-0.03em] ${active ? 'text-sage' : 'text-ink'}`}>
                    {sheet.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="shell space-y-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-2">
          <a
            href={cv.href}
            target="_blank"
            rel="noopener noreferrer"
            download={cv.fileName}
            className="flex items-center justify-between gap-4 rounded-lg border bg-sheet px-4 py-3.5"
            style={{ borderColor: 'var(--line-2)' }}
          >
            <span>
              <span className="block text-[0.95rem] font-bold text-ink">{cv.label}</span>
              <span className="label mt-1 block">PDF, {cv.size}, updated {cv.updated}</span>
            </span>
            <MarkDocument size={20} className="text-sage" />
          </a>
          <a href={`mailto:${site.email}`} className="flex min-h-11 items-center text-[1.05rem] text-ink underline decoration-[rgb(var(--sage-rgb)/0.5)] underline-offset-4">
            {site.email}
          </a>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer me" className="mono inline-flex min-h-[2.75rem] items-center text-[0.75rem] uppercase text-ink-2">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
}
