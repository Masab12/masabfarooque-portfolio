'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { cv, nav, site, socials } from '@/app/data/site';
import { Monogram, MenuMark, CloseMark, ArrowLong, MarkDocument } from '@/app/components/marks';
import Magnetic from './Magnetic';

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backgroundColor: scrolled ? 'rgba(10, 9, 8, 0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
          transition: 'background-color 420ms ease, border-color 420ms ease, backdrop-filter 420ms ease',
        }}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="Masab Farooque, home" className="group flex items-center gap-3">
            <Monogram
              size={30}
              className="text-bone transition-colors duration-500 group-hover:text-brass"
            />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-[0.95rem] font-semibold tracking-tight">Masab Farooque</span>
              <span className="eyebrow mt-1 text-[0.6rem]">{site.role}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-4 py-2 text-sm"
                style={{ color: isActive(item.href) ? 'var(--brass)' : 'var(--bone-2)' }}
              >
                <span className="mono mr-2 text-[0.6rem] opacity-45">{item.index}</span>
                {item.label}
                <span
                  className="absolute bottom-1 left-4 h-px origin-left bg-current transition-transform duration-500 ease-out"
                  style={{
                    width: 'calc(100% - 2rem)',
                    transform: isActive(item.href) ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
                <span className="pointer-events-none absolute bottom-1 left-4 h-px w-[calc(100%-2rem)] origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </Link>
            ))}

            <a
              href={cv.href}
              target="_blank"
              rel="noopener noreferrer"
              download={cv.fileName}
              data-cursor="Download PDF"
              title={`${cv.label}, PDF, ${cv.size}, updated ${cv.updated}`}
              className="group ml-2 inline-flex items-center gap-2 border px-3.5 py-2 text-sm transition-colors duration-500 hover:border-brass"
              style={{ borderColor: 'var(--line)', color: 'var(--bone-2)' }}
            >
              <MarkDocument
                size={14}
                className="text-brass transition-transform duration-500 group-hover:translate-y-0.5"
              />
              CV
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 lg:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                  style={{ background: 'var(--brass)' }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--brass)' }}
                />
              </span>
              <span className="eyebrow">{site.availability}</span>
            </span>

            <Magnetic radius={70} pull={0.22} className="hidden sm:block">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border px-5 py-2.5 text-sm transition-colors duration-500"
                style={{ borderColor: 'var(--line-2)' }}
              >
                <span>Start a project</span>
                <ArrowLong
                  size={15}
                  className="text-brass transition-transform duration-500 group-hover:translate-x-1"
                />
              </Link>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center border md:hidden"
              style={{ borderColor: 'var(--line-2)' }}
            >
              {open ? <CloseMark size={18} /> : <MenuMark size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between md:hidden"
            style={{ background: 'var(--ink-1)' }}
          >
            <div className="shell flex flex-1 flex-col justify-center gap-2 pt-[var(--nav-h)]">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="display flex items-baseline gap-4 py-3 text-[13vw]"
                    style={{ color: isActive(item.href) ? 'var(--brass)' : 'var(--bone)' }}
                  >
                    <span className="mono text-[0.7rem] opacity-40">{item.index}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href={cv.href}
                target="_blank"
                rel="noopener noreferrer"
                download={cv.fileName}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + nav.length * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 inline-flex items-center justify-between border px-5 py-4"
                style={{ borderColor: 'var(--line-2)' }}
              >
                <span>
                  <span className="block text-sm text-bone">{cv.label}</span>
                  <span className="eyebrow mt-1.5 block">
                    PDF, {cv.size}, updated {cv.updated}
                  </span>
                </span>
                <MarkDocument size={20} className="text-brass" />
              </motion.a>
            </div>

            <div className="shell pb-10">
              <div className="rule mb-5" />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow hover:text-brass"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-block text-sm text-bone-2 underline-offset-4 hover:text-brass"
              >
                {site.email}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
