'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { HiTrendingUp } from 'react-icons/hi';
import ReviewSlider from './ReviewSlider';

const stats = [
  { value: 195, suffix: '+', label: 'Orders Completed', color: 'var(--accent-cyan)' },
  { value: 5, suffix: '.0★', label: 'Average Rating', color: 'var(--accent-mustard)' },
  { value: 100, suffix: '+', label: 'Happy Clients', color: 'var(--accent-violet)' },
  { value: 15, suffix: '+', label: 'Countries Served', color: 'var(--tertiary)' },
];

export default function HomepageSocialProof() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="section-amber relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-void-black/60 via-transparent to-void-black/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>
            Trusted by Clients Worldwide
          </h2>
          <div className="w-20 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }} />
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card p-4 sm:p-6 rounded-lg text-center"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <HiTrendingUp className="w-6 h-6 mx-auto mb-3" style={{ color: stat.color }} />
              <div
                className="font-heading text-2xl sm:text-3xl font-bold mb-1 tabular-nums"
                style={{ color: 'var(--text-1)', textShadow: `0 0 24px ${stat.color}60` }}
              >
                {inView ? (
                  <><CountUp end={stat.value} duration={2.2} separator="," />{stat.suffix}</>
                ) : '—'}
              </div>
              <p className="text-xs sm:text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Auto-advancing testimonial slider with real Fiverr reviewer photos */}
        <ReviewSlider />

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/portfolio#reviews"
            className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent-cyan)' }}
          >
            Read all client reviews
          </Link>
          <span className="text-text-muted hidden sm:inline">·</span>
          <Link
            href="/about-masab"
            className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent-violet)' }}
          >
            Read about Masab Farooque
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
