'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX, HiChevronDown, HiArrowRight } from 'react-icons/hi';
import { services } from '@/app/data/services';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'About', href: '/about-masab' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const openServices = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setServicesOpen(true);
  };

  const scheduleClose = () => {
    leaveTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div
          style={{
            backgroundColor: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg-default)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${scrolled ? 'var(--nav-border-scrolled)' : 'var(--nav-border-default)'}`,
            transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            boxShadow: scrolled ? '0 6px 24px var(--shadow-color)' : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-heading text-lg sm:text-xl font-bold text-text-primary transition-colors duration-200 tracking-tight"
            >
              Masab Farooque<span style={{ color: 'var(--accent-cyan)' }}>.</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/about-masab"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150 ${
                  isActive('/about-masab') ? 'text-[var(--primary)] bg-[var(--accent-cyan-subtle)]' : 'text-text-secondary hover:text-text-primary hover:bg-[var(--accent-cyan-subtle)]'
                }`}
              >
                About
              </Link>

              <div
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150 ${
                    isActive('/services') ? 'text-[var(--primary)] bg-[var(--accent-cyan-subtle)]' : 'text-text-secondary hover:text-text-primary hover:bg-[var(--accent-cyan-subtle)]'
                  }`}
                >
                  Services
                  <motion.span
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <HiChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] rounded-lg p-5"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid var(--border-base)',
                        boxShadow: '0 24px 60px var(--shadow-color)',
                      }}
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      onMouseEnter={openServices}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {services.map(cat => (
                          <Link
                            key={cat.id}
                            href={`/services#${cat.id}`}
                            className="group flex flex-col gap-1 p-3.5 rounded-xl transition-all duration-150 hover:bg-[var(--accent-cyan-subtle)]"
                            style={{ border: '1px solid transparent' }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = `${cat.gradientFrom}35`;
                              (e.currentTarget as HTMLElement).style.backgroundColor = `${cat.gradientFrom}08`;
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                              (e.currentTarget as HTMLElement).style.backgroundColor = '';
                            }}
                          >
                            <span
                              className="text-sm font-semibold leading-tight"
                              style={{ color: 'var(--text-1)' }}
                            >
                              {cat.shortTitle}
                            </span>
                            <span className="text-xs text-text-muted leading-snug line-clamp-2">
                              {cat.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div
                        className="flex items-center justify-between pt-3"
                        style={{ borderTop: '1px solid var(--border-base)' }}
                      >
                        <span className="text-xs text-text-muted">Full breakdowns on the services page</span>
                        <Link
                          href="/services"
                          className="flex items-center gap-1 text-xs font-semibold transition-all duration-150 hover:gap-2"
                          style={{ color: 'var(--accent-cyan)' }}
                        >
                          All Services <HiArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(1).map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150 ${
                    isActive(link.href) ? 'text-[var(--primary)] bg-[var(--accent-cyan-subtle)]' : 'text-text-secondary hover:text-text-primary hover:bg-[var(--accent-cyan-subtle)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/forge"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive('/forge')
                    ? 'text-[var(--primary)] bg-[var(--accent-cyan-subtle)]'
                    : 'text-text-secondary hover:text-text-primary hover:bg-[var(--accent-cyan-subtle)]'
                }`}
              >
                Forge
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: 'var(--font-jetbrains), monospace',
                    letterSpacing: '0.06em',
                    padding: '1px 6px',
                    borderRadius: 9999,
                    background: 'var(--accent-cyan-subtle)',
                    border: '1px solid var(--accent-cyan-border)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  AI
                </span>
              </Link>
              <ThemeToggle />
              <Link
                href="/contact"
                data-cursor-hover
                className="btn-primary px-5 py-2.5 text-sm"
              >
                Hire Me
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--accent-cyan-subtle)] transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <HiX className="w-6 h-6 text-text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <HiMenu className="w-6 h-6 text-text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-x-3 sm:inset-x-6 top-20 sm:top-24 z-50 md:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="rounded-lg p-4"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-base)',
                  boxShadow: '0 20px 60px var(--shadow-color)',
                }}
              >
                <div className="flex justify-end mb-2">
                  <ThemeToggle />
                </div>
                <div className="flex flex-col gap-0.5">
                  <Link
                    href="/about-masab"
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive('/about-masab') ? 'text-[var(--primary)] bg-[var(--accent-cyan-subtle)]' : 'text-text-secondary hover:text-text-primary hover:bg-[var(--accent-cyan-subtle)]'}`}
                  >
                    About
                  </Link>

                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(o => !o)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-[var(--accent-cyan-subtle)] transition-colors"
                    >
                      Services
                      <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <HiChevronDown className="w-4 h-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="px-2 pb-2 grid grid-cols-2 gap-1.5">
                            {services.map(cat => (
                              <Link
                                key={cat.id}
                                href={`/services#${cat.id}`}
                                className="flex flex-col gap-0.5 p-3 rounded-xl hover:bg-[var(--accent-cyan-subtle)] transition-colors"
                              >
                                <span className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>{cat.shortTitle}</span>
                                <span className="text-xs text-text-muted leading-snug line-clamp-2">{cat.description.split('.')[0]}.</span>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/services"
                            className="flex items-center gap-1.5 mx-2 mb-2 px-3 py-2 rounded-xl text-xs font-semibold transition-colors hover:bg-[var(--accent-cyan-subtle)]"
                            style={{ color: 'var(--accent-cyan)' }}
                          >
                            View all services <HiArrowRight className="w-3 h-3" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {navLinks.slice(1).map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(link.href) ? 'text-[var(--primary)] bg-[var(--accent-cyan-subtle)]' : 'text-text-secondary hover:text-text-primary hover:bg-[var(--accent-cyan-subtle)]'}`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <Link
                    href="/forge"
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive('/forge') ? 'text-[var(--primary)] bg-[var(--accent-cyan-subtle)]' : 'text-text-secondary hover:text-text-primary hover:bg-[var(--accent-cyan-subtle)]'}`}
                  >
                    Forge
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        fontFamily: 'var(--font-jetbrains), monospace',
                        letterSpacing: '0.06em',
                        padding: '1px 6px',
                        borderRadius: 9999,
                        background: 'var(--accent-cyan-subtle)',
                        border: '1px solid var(--accent-cyan-border)',
                        color: 'var(--accent-cyan)',
                      }}
                    >
                      AI
                    </span>
                  </Link>

                  <Link
                    href="/contact"
                    className="btn-primary mt-1 px-4 py-3 text-sm text-center"
                  >
                    Hire Me
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
