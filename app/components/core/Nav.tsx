'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { cv, nav, site, socials } from '@/app/data/site';
import { Monogram, MenuMark, CloseMark, MarkDocument } from '@/app/components/marks';

/**
 * The hero carries its own navigation pill, so this only mounts on inner
 * pages. It is the same black pill hanging off the top edge, kept fixed so
 * the shape stays recognisable wherever you are.
 */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (pathname === '/') return null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 md:px-6">
        <div className="relative mx-auto flex max-w-[88rem] items-start justify-between">
          <Link
            href="/"
            aria-label="Home"
            className="pointer-events-auto flex items-center gap-2 rounded-b-2xl bg-black px-4 py-2.5 md:rounded-b-3xl md:px-5"
          >
            <Monogram size={22} className="text-cream" />
            <span className="hidden text-sm sm:inline">{site.name}</span>
          </Link>

          <nav className="pointer-events-auto absolute left-1/2 top-0 hidden -translate-x-1/2 md:block">
            <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-10 md:rounded-b-3xl md:px-8 lg:gap-14">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap text-[10px] transition-colors duration-300 sm:text-xs md:text-sm"
                  style={{ color: isActive(item.href) ? '#E1E0CC' : 'rgba(225, 224, 204, 0.8)' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="pointer-events-auto flex items-center gap-2 rounded-b-2xl bg-black px-3 py-2.5 md:rounded-b-3xl md:px-5">
            <a
              href={cv.href}
              target="_blank"
              rel="noopener noreferrer"
              download={cv.fileName}
              data-cursor="Download PDF"
              title={`${cv.label}, PDF, ${cv.size}`}
              className="group hidden items-center gap-2 text-sm transition-colors duration-300 sm:flex"
              style={{ color: 'rgba(225, 224, 204, 0.8)' }}
            >
              <MarkDocument
                size={14}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
              CV
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-6 w-6 items-center justify-center md:hidden"
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
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#101010] md:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-1 px-5 pt-20">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block py-2 text-[13vw] font-medium leading-[0.95] tracking-[-0.05em]"
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
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 + nav.length * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex items-center justify-between rounded-xl bg-[#212121] px-5 py-4"
              >
                <span>
                  <span className="block text-sm text-cream">{cv.label}</span>
                  <span className="label mt-1.5 block">
                    PDF, {cv.size}, updated {cv.updated}
                  </span>
                </span>
                <MarkDocument size={20} className="text-primary" />
              </motion.a>
            </div>

            <div className="px-5 pb-10">
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
        ) : null}
      </AnimatePresence>
    </>
  );
}
