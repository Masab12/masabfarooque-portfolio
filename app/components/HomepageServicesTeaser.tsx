'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight, HiCode, HiCog, HiGlobeAlt, HiSparkles } from 'react-icons/hi';
import { services } from '@/app/data/services';
import SpotlightCard from './SpotlightCard';
import SectionHeading from './SectionHeading';

const icons = [HiGlobeAlt, HiCode, HiCog, HiSparkles];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HomepageServicesTeaser() {
  return (
    <section className="section-violet relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-void-black/60 via-transparent to-void-black/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          title="What I Build"
          subtitle="Full stack applications, AI systems, scrapers, and APIs, production-ready from day one."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {services.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={service.id} variants={cardVariants}>
                <SpotlightCard className="glass-card p-6 sm:p-8 rounded-2xl h-full hover:border-electric-cyan/25 transition-colors duration-300 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `linear-gradient(135deg, ${service.gradientFrom}30, ${service.gradientTo}20)`, border: `1px solid ${service.gradientFrom}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: service.gradientFrom }} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold mb-1" style={{ color: '#f8f9fa' }}>
                        {service.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.subItems.slice(0, 3).map(sub => (
                      <span
                        key={sub.title}
                        className="text-xs px-2.5 py-1 rounded-lg border text-text-muted"
                        style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        {sub.title}
                      </span>
                    ))}
                    <span
                      className="text-xs px-2.5 py-1 rounded-lg border text-text-muted"
                      style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                      +more
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-200"
            style={{ color: 'rgb(0,240,255)' }}
          >
            Explore All Services <HiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
