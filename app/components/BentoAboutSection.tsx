'use client';

import { useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { HiAcademicCap, HiLocationMarker, HiStar, HiTrendingUp } from 'react-icons/hi';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

// Spotlight hover effect to cursor creates a soft radial glow
function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        background: hovering
          ? `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(191,84,44,0.05) 0%, transparent 60%)`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}

function StatsContent() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const stats = [
    { label: 'Orders Completed', value: 195, suffix: '+', color: 'var(--accent-cyan)' },
    { label: 'Revenue Generated', value: 10000, prefix: '$', suffix: '+', color: 'var(--accent-violet)' },
    { label: 'Happy Clients', value: 100, suffix: '+', color: 'var(--accent-cyan)' },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="flex flex-col items-center justify-center text-center p-4 sm:p-5 rounded-xl"
          style={{ backgroundColor: 'var(--bg-card)' }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12 }}
          whileHover={{ scale: 1.03 }}
        >
          <HiTrendingUp className="w-7 h-7 mb-3" style={{ color: stat.color }} />
          <div
            className="text-3xl sm:text-4xl font-bold mb-1 tabular-nums"
            style={{
              color: 'var(--text-1)',
              textShadow: `0 0 24px ${stat.color}70`,
            }}
          >
            {inView ? (
              <>
                {stat.prefix}
                <CountUp end={stat.value} duration={2.5} separator="," />
                {stat.suffix}
              </>
            ) : (
              <span>—</span>
            )}
          </div>
          <div className="text-xs sm:text-sm text-text-muted">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function BentoAboutSection() {
  return (
    <section
      id="identity"
      className="section-cyan relative w-full py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-deep-space/30 to-void-black pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-[500px] sm:h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(191,84,44,0.03)' }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* Section heading to reliable fade-up (no overflow clip) */}
        <div className="mb-10 sm:mb-14 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: 'var(--text-1)' }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            About Masab
          </motion.h2>
          <motion.div
            className="w-16 sm:w-20 h-1 sm:h-1.5 rounded-full mx-auto"
            style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.2 }}
          />
        </div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Professional Background to 2 cols */}
          <motion.div variants={cardVariants} className="sm:col-span-2">
            <SpotlightCard className="glass-card p-5 sm:p-7 lg:p-8 rounded-lg sm:rounded-xl h-full group transition-colors duration-300 hover:border-[rgba(191,84,44,0.25)]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-1)' }}>
                  Professional Background
                </span>
                <motion.span
                  className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  style={{ backgroundColor: 'var(--accent-cyan)' }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </div>
              <div className="space-y-3">
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold" style={{ color: 'var(--text-1)' }}>Masab Farooque</span> is a full stack developer from Islamabad, Pakistan. He graduated from{' '}
                  <span className="font-semibold" style={{ color: 'var(--accent-cyan)' }}>COMSATS University</span>{' '}
                  in 2023 and has been building production software for clients ever since. Two years in, he is a{' '}
                  <span className="font-semibold" style={{ color: 'var(--accent-violet)' }}>Level 2 Fiverr Seller</span>{' '}
                  with 195 plus completed orders across Europe, North America and Asia.
                </p>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  On the frontend and backend he works with JavaScript based frameworks including{' '}
                  <Link href="/services#full-stack" className="text-text-primary font-semibold hover:text-electric-cyan transition-colors">React</Link>,{' '}
                  <Link href="/services#full-stack" className="text-text-primary font-semibold hover:text-electric-cyan transition-colors">Next.js</Link>{' '}
                  and <Link href="/services#full-stack" className="text-text-primary font-semibold hover:text-electric-cyan transition-colors">Node.js</Link>, and on the server side he uses{' '}
                  <Link href="/services#api-development" className="text-text-primary font-semibold hover:text-electric-cyan transition-colors">FastAPI</Link>{' '}
                  for Python based APIs and microservices. For AI he integrates{' '}
                  <Link href="/services#ai-ml" className="text-text-primary font-semibold hover:text-electric-cyan transition-colors">OpenAI</Link>,{' '}
                  <Link href="/services#ai-ml" className="text-text-primary font-semibold hover:text-electric-cyan transition-colors">LangChain</Link>{' '}
                  and <Link href="/services#ai-ml" className="text-text-primary font-semibold hover:text-electric-cyan transition-colors">LangGraph</Link>{' '}
                  to build agents, chatbots and RAG pipelines.
                </p>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  For data he uses{' '}
                  <span className="text-text-primary font-semibold">PostgreSQL</span>{' '}
                  via <span className="text-text-primary font-semibold">Supabase</span>{' '}
                  for structured relational storage with row level security, and{' '}
                  <span className="text-text-primary font-semibold">Redis</span>{' '}
                  for task queuing and caching with Celery workers. Everything ships inside{' '}
                  <span className="text-text-primary font-semibold">Docker</span>{' '}
                  containers for consistent, portable deployments. He has delivered{' '}
                  <Link href="/portfolio" className="font-semibold hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>SaaS platforms, marketplace tools, web scrapers and AI pipelines</Link>{' '}
                  for clients across 15 plus countries.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-2 text-text-muted text-xs sm:text-sm">
                <HiAcademicCap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--accent-cyan)' }} />
                <span>COMSATS University Islamabad, Computer Science, 2023</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Location */}
          <motion.div variants={cardVariants}>
            <SpotlightCard className="glass-card p-5 sm:p-7 rounded-lg sm:rounded-xl h-full min-h-[180px] flex flex-col items-center justify-center text-center transition-colors duration-300 hover:border-[rgba(191,84,44,0.25)]">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <HiLocationMarker className="w-10 h-10 sm:w-12 sm:h-12 mb-3" style={{ color: 'var(--accent-cyan)' }} />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-1)' }}>Islamabad</h3>
              <p className="text-sm sm:text-base text-text-muted">Pakistan</p>
            </SpotlightCard>
          </motion.div>

          {/* Achievements to 2 cols, NO overflow-hidden so stats aren't clipped */}
          <motion.div variants={cardVariants} className="sm:col-span-2">
            <SpotlightCard className="glass-card p-5 sm:p-7 lg:p-8 rounded-lg sm:rounded-xl h-full transition-colors duration-300 hover:border-[rgba(63,88,168,0.25)]">
              <div className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
                Achievements
              </div>
              <StatsContent />
            </SpotlightCard>
          </motion.div>

          {/* Fiverr Status */}
          <motion.div variants={cardVariants}>
            <SpotlightCard className="glass-card p-5 sm:p-7 rounded-lg sm:rounded-xl h-full min-h-[180px] flex flex-col items-center justify-center text-center transition-colors duration-300 hover:border-[rgba(63,88,168,0.25)]">
              <motion.div
                whileHover={{ scale: 1.15, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <HiStar className="w-10 h-10 sm:w-12 sm:h-12 mb-3" style={{ color: 'var(--accent-violet)' }} />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'var(--text-1)' }}>Level 2 Seller</h3>
              <p className="text-xs sm:text-sm text-text-muted">Top Rated on Fiverr</p>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
