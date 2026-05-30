'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { HiStar, HiTrendingUp } from 'react-icons/hi';

const stats = [
  { value: 195, suffix: '+', label: 'Orders Completed', color: 'var(--accent-cyan)' },
  { value: 5, suffix: '.0★', label: 'Average Rating', color: 'rgb(249,200,50)' },
  { value: 100, suffix: '+', label: 'Happy Clients', color: 'var(--accent-violet)' },
  { value: 15, suffix: '+', label: 'Countries Served', color: 'var(--accent-cyan)' },
];

const reviews = [
  {
    name: 'Lucas Swarts',
    role: 'Founder, Fixels',
    country: 'Netherlands',
    text: 'Absolutely amazing work. I have never had this experience with anyone before. Masab truly went above and beyond with unbelievable dedication and effort. He has a very strong understanding of complex scraping and everything that comes with it. The end product is a fully working SaaS platform.',
    rating: 5,
  },
  {
    name: 'ksharma222',
    role: 'Repeat Client',
    country: 'United States',
    text: "Doesn't get better than this. He is the best in the business. His expertise are outstanding and response is even better. There is nothing Masab can't figure out. Having him by our side in 2026 is going great for us.",
    rating: 5,
  },
  {
    name: 'Roger L.',
    role: 'Client',
    country: 'Italy',
    text: 'I highly recommend Masab to anyone looking for advanced AI systems, business automation, or full-stack development. I approached him with a complete business management system powered by multilingual AI. The execution was outstanding.',
    rating: 5,
  },
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
          <div className="w-20 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, rgb(0,240,255), rgb(139,92,246))' }} />
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card p-4 sm:p-6 rounded-2xl text-center"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              className="glass-card p-6 rounded-2xl"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <HiStar key={j} className="w-4 h-4" style={{ color: 'rgb(249,200,50)' }} />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{review.text}</p>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgb(0,240,255), rgb(139,92,246))', color: 'var(--color-on-accent)' }}
                >
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{review.name}</p>
                  <p className="text-xs text-text-muted">{review.role} · {review.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/portfolio"
            className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent-cyan)' }}
          >
            See Masab's full project portfolio
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
