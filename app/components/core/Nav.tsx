'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cv, nav, site, socials } from '@/app/data/site';
import { Monogram, MenuMark, CloseMark, MarkDocument } from '@/app/components/marks';

/**
 * One nav, every page, home included. Three black pills hang off the true
 * top of the viewport: identity on the left, the link set centred on
 * desktop, and a CV button plus menu toggle on the right. The CV button is
 * never hidden behind the menu, on any width, because that was the whole
 * complaint the last version earned.
 */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Closing on a pathname change alone is not enough. A link to a hash on the
  // page you are already on never changes the pathname, so the menu stayed
  // open and the body scroll lock below stayed on, which froze the page.
  // Every menu link closes it directly instead.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    !href.startsWith('/#') && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="relative mx-auto flex w-full max-w-[1800px] items-start justify-between px-3 sm:px-4 md:px-6">
          <Link
            href="/"
            aria-label="Home"
            className="pointer-events-auto flex items-center gap-2 rounded-b-xl bg-black px-3 py-2.5 transition-colors duration-300 hover:bg-[#101010] sm:rounded-b-2xl sm:px-4 md:rounded-b-3xl md:px-5"
          >
            <Monogram size={22} className="shrink-0 text-cream" />
            <span className="hidden text-sm sm:inline">{site.name}</span>
            <span className="text-sm sm:hidden">{site.shortName}</span>
          </Link>

          <nav
            aria-label="Primary"
            className="pointer-events-auto absolute left-1/2 top-0 hidden -translate-x-1/2 lg:block"
          >
            <div className="flex items-center gap-8 rounded-b-2xl bg-black px-7 py-2 md:rounded-b-3xl xl:gap-11 xl:px-9">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap text-xs transition-colors duration-300 xl:text-sm"
                  style={{ color: isActive(item.href) ? '#E1E0CC' : 'rgba(225, 224, 204, 0.72)' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="pointer-events-auto flex items-center gap-1 rounded-b-xl bg-black py-2 pl-2.5 pr-1.5 sm:gap-1.5 sm:rounded-b-2xl sm:py-2.5 sm:pl-3 md:rounded-b-3xl md:pl-4">
            <a
              href={cv.href}
              target="_blank"
              rel="noopener noreferrer"
              download={cv.fileName}
              data-cursor="Download PDF"
              title={`${cv.label}, PDF, ${cv.size}`}
              aria-label="Download CV, PDF"
              className="group flex h-8 items-center gap-1.5 rounded-full px-2 text-[13px] text-[rgba(225,224,204,0.78)] transition-colors duration-300 hover:text-cream sm:h-9 sm:px-2.5 sm:text-sm"
            >
              <MarkDocument
                size={15}
                className="shrink-0 transition-transform duration-300 group-hover:translate-y-0.5"
              />
              <span className="hidden sm:inline">CV</span>
            </a>

            <span aria-hidden className="h-4 w-px shrink-0" style={{ background: 'var(--line-2)' }} />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 hover:bg-white/5 sm:h-9 sm:w-9"
            >
              {open ? <CloseMark size={17} /> : <MenuMark size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* The panel stays mounted and is driven by `open` rather than being
          added and removed by AnimatePresence. An exiting child was being
          left behind in the DOM: invisible, because the clip path had closed
          it, but still holding fourteen focusable links that a keyboard user
          could tab into on the page they had just navigated to. `inert`
          takes the whole subtree out of the tab order and the a11y tree the
          moment it closes, so that cannot happen. */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={{ clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#101010] ${
          open ? '' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-1 flex-col justify-center gap-1 px-5 pb-10 pt-24 sm:px-8 sm:pt-28">
          {nav.map((item, i) => (
            <motion.div
              key={item.href}
              initial={false}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                delay: open ? 0.16 + i * 0.06 : 0,
                duration: open ? 0.6 : 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-[15vw] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[10vw] xl:text-[clamp(8rem,5vw,12rem)]"
                style={{ color: isActive(item.href) ? '#E1E0CC' : 'rgba(225,224,204,0.65)' }}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          <motion.a
            href={cv.href}
            target="_blank"
            rel="noopener noreferrer"
            download={cv.fileName}
            initial={false}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{
              delay: open ? 0.16 + nav.length * 0.06 : 0,
              duration: open ? 0.6 : 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 flex items-center justify-between gap-4 rounded-xl bg-[#212121] px-5 py-4 transition-colors duration-300 hover:bg-[#2a2a2a] sm:max-w-sm"
          >
            <span className="min-w-0">
              <span className="block text-sm text-cream">{cv.label}</span>
              <span className="label mt-1.5 block truncate">
                PDF, {cv.size}, updated {cv.updated}
              </span>
            </span>
            <MarkDocument size={20} className="shrink-0 text-primary" />
          </motion.a>
        </div>

        <div className="px-5 pb-8 sm:px-8">
          <div className="rule mb-5" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-cream"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
