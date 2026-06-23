'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight, HiLocationMarker, HiStar } from 'react-icons/hi';
import TerminalTyper from '../TerminalTyper';

export default function AboutHero() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 pt-2 sm:pt-4">
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-deep-space/20 to-void-black pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">

          {/* Left to text */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <motion.p
              className="text-xs font-bold tracking-widest uppercase mb-5 font-mono"
              style={{ color: 'var(--accent-cyan)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The Developer Behind the Code
            </motion.p>

            <div className="overflow-hidden mb-5">
              <motion.h1
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight"
                style={{ color: 'var(--text-1)' }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.18 }}
              >
                About{' '}
                <span className="gradient-text">Masab</span>
              </motion.h1>
            </div>

            <motion.p
              className="text-text-secondary text-base sm:text-lg max-w-xl leading-relaxed mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36 }}
            >
              Full stack developer from Islamabad, Pakistan. Started freelancing during university, won awards in national game jams, and transitioned to AI and web development in 2023.
            </motion.p>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.46 }}
            >
              <TerminalTyper phrases={['unity → web  ✓ pivoted 2023', '195+ orders  ✓ shipped', 'level 2 seller  ✓', '15+ countries  ✓ served']} />
            </motion.div>

            <motion.p
              className="text-text-muted text-sm sm:text-base max-w-xl leading-relaxed mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44 }}
            >
              Now a Level 2 Fiverr Seller with 195+ completed orders across 15+ countries, building SaaS platforms, AI pipelines, and automation systems from scratch.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.54 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold group"
                style={{ background: 'var(--primary)', color: 'var(--color-on-accent)' }}
              >
                Work Together
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 glass-card rounded-xl font-semibold text-text-primary hover:border-electric-cyan/40 transition-all"
              >
                View Portfolio
              </Link>
            </motion.div>
          </div>

          {/* Right to photo */}
          <div className="flex-shrink-0 order-1 lg:order-2">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-110"
                style={{ background: 'radial-gradient(circle, var(--accent-cyan), var(--accent-violet))' }}
              />

              {/* Gradient ring */}
              <motion.div
                className="relative w-52 h-52 xs:w-60 xs:h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-[3px]"
                style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet), var(--accent-cyan))' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                {/* Inner circle to stops rotating with the ring */}
                <motion.div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--bg-primary)' }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                >
                  {/* Floating animation on the image */}
                  <motion.div
                    className="w-full h-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Image
                      src="/Masab.jpeg"
                      alt="Masab Farooque to Full Stack Developer & AI Engineer from Islamabad"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Floating badge to location */}
              <motion.div
                className="absolute -bottom-3 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl glass-card text-xs font-medium"
                style={{ color: 'var(--text-1)', border: '1px solid rgba(191,84,44,0.2)' }}
                initial={{ opacity: 0, x: -16, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <HiLocationMarker className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--accent-cyan)' }} />
                Islamabad, PK
              </motion.div>

              {/* Floating badge to rating */}
              <motion.div
                className="absolute -top-2 -right-4 flex items-center gap-1.5 px-3 py-2 rounded-xl glass-card text-xs font-medium"
                style={{ color: 'var(--text-1)', border: '1px solid rgba(63,88,168,0.2)' }}
                initial={{ opacity: 0, x: 16, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <HiStar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgb(251,191,36)' }} />
                5.0 · 139 Reviews
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
