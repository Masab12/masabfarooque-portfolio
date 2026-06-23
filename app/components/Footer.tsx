'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SiGithub, SiInstagram, SiUpwork } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import FiverrIcon from './icons/FiverrIcon';

const socialLinks = [
  { name: 'Fiverr',     url: 'https://www.fiverr.com/p_scribbles/portfolio/', icon: <FiverrIcon className="w-4 h-4" />, label: 'Fiverr profile' },
  { name: 'Upwork',     url: 'https://upwork.com/freelancers/~01e34b32d5b254495d', icon: <SiUpwork className="w-4 h-4" />, label: 'Upwork profile' },
  { name: 'GitHub',     url: 'https://github.com/Masab12', icon: <SiGithub className="w-4 h-4" />, label: 'GitHub profile' },
  { name: 'LinkedIn',   url: 'https://www.linkedin.com/in/masabfarooque', icon: <FaLinkedin className="w-4 h-4" />, label: 'LinkedIn profile' },
  { name: 'Instagram',  url: 'https://www.instagram.com/masabfarooque', icon: <SiInstagram className="w-4 h-4" />, label: 'Instagram profile' },
];

const legalLinks = [
  { label: 'Privacy Policy',   href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const serviceLinks = [
  { label: 'Full Stack Dev',        href: '/services#full-stack' },
  { label: 'AI & ML',               href: '/services#ai-ml' },
  { label: 'Scraping & Automation', href: '/services#scraping-automation' },
  { label: 'API Development',       href: '/services#api-development' },
];

export default function Footer() {
  return (
    <footer
      className="relative bg-transparent border-t pt-14 pb-10 px-4 sm:px-6 md:px-8"
      style={{ borderColor: 'var(--border-base)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Main grid ──────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="font-heading text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
                MF<span style={{ color: 'var(--accent-cyan)' }}>.</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary mb-2 leading-relaxed max-w-xs">
              Level 2 Fiverr Seller. Full Stack Developer. AI Engineer.
            </p>
            <div className="flex items-center gap-1.5 text-text-muted text-sm mb-5">
              <HiLocationMarker className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent-cyan)' }} />
              <span>Islamabad, Pakistan</span>
            </div>
            {/* Social icons — wrap cleanly on mobile */}
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-text-secondary border transition-colors duration-200"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-base)' }}
                  whileHover={{ scale: 1.12, y: -2, borderColor: 'var(--accent-cyan-border)', color: 'var(--accent-cyan)' }}
                  whileTap={{ scale: 0.92 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17, delay: i * 0.06 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-bold tracking-wider uppercase mb-4" style={{ color: 'var(--accent-cyan)' }}>Legal</p>
            <ul className="space-y-2.5">
              {legalLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold tracking-wider uppercase mb-4" style={{ color: 'var(--accent-violet)' }}>Services</p>
            <ul className="space-y-2.5">
              {serviceLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold tracking-wider uppercase mb-4" style={{ color: 'var(--accent-cyan)' }}>Get in Touch</p>
            <p className="text-sm text-text-muted mb-3 leading-relaxed">Have a project in mind? I reply within 24 hours.</p>
            <a
              href="mailto:masabfarooque1122@gmail.com"
              className="text-sm font-medium hover:opacity-80 transition-opacity block mb-5 break-all"
              style={{ color: 'var(--accent-cyan)' }}
            >
              masabfarooque1122@gmail.com
            </a>
            <Link
              href="/contact"
              className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: 'var(--primary)', color: 'var(--color-on-accent)' }}
            >
              Start a Project
            </Link>
          </div>
        </motion.div>

        {/* ── Bottom bar — copyright only, no duplicate legal links ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-7"
          style={{ borderColor: 'var(--border-base)' }}
        >
          <p className="text-xs text-text-muted text-center sm:text-left">
            Built with Next.js · React · Tailwind CSS · Framer Motion
          </p>
          <p className="text-xs text-text-muted text-center sm:text-right">
            &copy; {new Date().getFullYear()} Masab Farooque. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
