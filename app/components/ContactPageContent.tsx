'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { HiMail, HiLocationMarker, HiClock } from 'react-icons/hi';
import { SiGithub, SiUpwork } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import FiverrIcon from './icons/FiverrIcon';
import EnhancedContactForm from './EnhancedContactForm';
import TerminalTyper from './TerminalTyper';

const contactCards = [
  {
    icon: HiMail,
    label: 'Email',
    value: 'masabfarooque1122@gmail.com',
    href: 'mailto:masabfarooque1122@gmail.com',
    color: 'var(--accent-cyan)',
  },
  {
    icon: HiLocationMarker,
    label: 'Location',
    value: 'Islamabad, Pakistan',
    href: null,
    color: 'var(--accent-violet)',
  },
  {
    icon: HiClock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
    color: 'var(--accent-cyan)',
  },
];

const socialLinks = [
  { icon: FiverrIcon, label: 'Fiverr', href: 'https://www.fiverr.com/p_scribbles/portfolio/' },
  { icon: SiUpwork, label: 'Upwork', href: 'https://upwork.com/freelancers/~01e34b32d5b254495d' },
  { icon: SiGithub, label: 'GitHub', href: 'https://github.com/Masab12' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/masabfarooque' },
];

function FormWithParams() {
  const params = useSearchParams();
  const service = params.get('service') ?? undefined;
  const tier = params.get('tier') ?? undefined;
  return <EnhancedContactForm service={service} tier={tier} />;
}

export default function ContactPageContent() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-5 font-mono" style={{ color: 'var(--accent-cyan)' }}>Contact</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5" style={{ color: 'var(--text-1)' }}>
            Start a Conversation
          </h1>
          <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-6">
            Describe your project. I will get back to you within 24 hours with a clear plan and honest assessment.
          </p>
          <div className="flex justify-center">
            <TerminalTyper phrases={['open inbox  ✓', 'reply < 24h  ✓ guaranteed', 'scope project  ✓', 'kickoff call  ✓ booked']} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-4 mb-10">
              {contactCards.map(card => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="glass-card p-4 rounded-xl flex items-center gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${card.color}15`, border: `1px solid ${card.color}30` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">{card.label}</p>
                      {card.href ? (
                        <a href={card.href} className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--text-1)' }}>
                          {card.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{card.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mb-8 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-base)' }}>
              <p className="text-xs text-text-muted mb-2.5">Before reaching out, it may help to:</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent-cyan)' }} />
                  <Link href="/services" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>
                    Explore the full list of services Masab offers
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent-violet)' }} />
                  <Link href="/pricing" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-violet)' }}>
                    View transparent pricing plans and tiers
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent-cyan)' }} />
                  <Link href="/portfolio" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>
                    Browse past projects and completed work
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold tracking-wider uppercase mb-4 text-text-muted">Find me on</p>
              <div className="flex items-center gap-3 flex-wrap">
                {socialLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl text-sm text-text-secondary hover:text-text-primary transition-all duration-200"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(191,84,44,0.3)' }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-6 sm:p-8 rounded-lg"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-heading text-xl font-bold mb-6" style={{ color: 'var(--text-1)' }}>Send a Message</h2>
            <Suspense fallback={<div className="h-64 animate-pulse rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }} />}>
              <FormWithParams />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
