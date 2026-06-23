'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { SiNextdotjs, SiFastapi, SiPostgresql, SiTelegram } from 'react-icons/si';
import TerminalTyper from './TerminalTyper';
import Typewriter from './Typewriter';

// Mini architecture pipeline shown in the hero panel (references FirstDeal-style builds)
const pipeline = [
  { Icon: SiNextdotjs, label: 'Next.js', sub: 'Frontend + Dashboard', color: 'var(--text-1)' },
  { Icon: SiFastapi, label: 'FastAPI', sub: 'API + Scraper workers', color: 'var(--secondary)' },
  { Icon: SiPostgresql, label: 'PostgreSQL + Redis', sub: 'Storage + Queues', color: 'var(--primary)' },
  { Icon: SiTelegram, label: 'Telegram / Email', sub: 'Instant alerts', color: 'var(--tertiary)' },
];

function PipelinePanel() {
  return (
    <div className="matte-block w-full max-w-md p-5 sm:p-6 relative">
      {/* Window header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-3 h-3 rounded-full" style={{ background: 'var(--primary)' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: 'var(--accent-mustard)' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: 'var(--secondary)' }} />
        <span className="ml-2 font-mono text-xs text-text-muted">pipeline.architecture</span>
      </div>

      <div className="relative">
        {pipeline.map(({ Icon, label, sub, color }, i) => (
          <div key={label} className="relative">
            <motion.div
              className="matte-block flex items-center gap-3 p-3.5 mb-3"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-base)' }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-1)' }}>{label}</p>
                <p className="text-xs text-text-muted leading-tight">{sub}</p>
              </div>
            </motion.div>

            {/* Connector with a traveling data pulse */}
            {i < pipeline.length - 1 && (
              <div className="relative h-3 ml-[34px] mb-0">
                <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'var(--border-base)' }} />
                <motion.div
                  className="absolute left-[-2px] w-[5px] h-[5px] rounded-full"
                  style={{ background: 'var(--primary)' }}
                  animate={{ top: ['-2px', '14px'], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomepageHero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center bg-transparent px-4 sm:px-6 lg:px-8"
      style={{ overflow: 'clip' }}
    >
      {/* Warm wash (global grid lives behind via BackgroundFX) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 20%, rgba(191,84,44,0.06), transparent 60%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(63,88,168,0.05), transparent 60%)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto py-28 lg:py-32">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <motion.p
              className="font-mono text-sm sm:text-base mb-3 inline-flex items-center gap-2 lg:justify-start justify-center"
              style={{ color: 'var(--primary)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.span
                style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
                animate={{ rotate: [0, 18, -8, 18, 0] }}
                transition={{ duration: 1.4, delay: 0.6, repeat: Infinity, repeatDelay: 2.5 }}
              >
                👋
              </motion.span>
              Hi, I&apos;m
            </motion.p>

            <h1
              className="font-heading font-bold leading-[0.98] tracking-tight mb-3 min-h-[1.1em]"
              style={{ color: 'var(--text-1)', fontSize: 'clamp(2.25rem, 5.2vw, 3.9rem)' }}
            >
              <Typewriter text="Masab Farooque." speed={85} startDelay={500} />
            </h1>

            <motion.p
              className="font-heading font-semibold mb-5"
              style={{ fontSize: 'clamp(1.1rem, 2.1vw, 1.6rem)', color: 'var(--secondary)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              Full Stack Developer &amp; AI Engineer
            </motion.p>

            <motion.div
              className="mb-7 flex lg:justify-start justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <TerminalTyper className="max-w-full" />
            </motion.div>

            <motion.p
              className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mb-9 mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62 }}
            >
              I build SaaS platforms, AI pipelines, and automation systems that hold up in
              production, for clients across 15+ countries. 195+ projects delivered with a 5.0 rating.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3.5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <Link
                href="/portfolio"
                className="btn-primary group inline-flex items-center justify-center gap-2 px-7 py-3.5 w-full sm:w-auto"
              >
                View Projects
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="btn-secondary inline-flex items-center justify-center px-7 py-3.5 w-full sm:w-auto uppercase text-sm tracking-wider"
              >
                Explore Stack
              </Link>
            </motion.div>

            {/* Inline credibility row */}
            <motion.div
              className="flex items-center lg:justify-start justify-center gap-6 mt-10 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {[
                { n: '195+', l: 'Projects' },
                { n: '5.0', l: 'Rating' },
                { n: '100+', l: 'Clients' },
              ].map((s) => (
                <div key={s.l} className="text-center lg:text-left">
                  <div className="font-heading text-2xl font-bold" style={{ color: 'var(--text-1)' }}>{s.n}</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — architecture panel */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <PipelinePanel />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
