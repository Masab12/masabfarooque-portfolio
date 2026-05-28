'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiCode, HiCog, HiGlobeAlt, HiSparkles } from 'react-icons/hi';
import { services } from '@/app/data/services';
import SpotlightCard from './SpotlightCard';

const icons = [HiGlobeAlt, HiCode, HiCog, HiSparkles];

export default function ServicesPageContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      {services.map((service, si) => {
        const Icon = icons[si];
        return (
          <section
            key={service.id}
            id={service.id}
            className="relative py-16 sm:py-20 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${service.gradientFrom}30, ${service.gradientTo}20)`,
                    border: `1px solid ${service.gradientFrom}35`,
                  }}
                >
                  <Icon className="w-8 h-8" style={{ color: service.gradientFrom }} />
                </div>
                <div>
                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#f8f9fa' }}>
                    {service.title}
                  </h2>
                </div>
              </div>

              <p className="text-text-secondary text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
                {service.longDescription}
              </p>

              <div className="mb-8">
                <p className="text-xs font-bold tracking-wider uppercase mb-4" style={{ color: service.gradientFrom }}>Workflow</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {service.pipeline.map((step, pi) => (
                    <div key={step} className="flex items-center gap-2">
                      <motion.div
                        className="px-3 py-1.5 rounded-lg border text-xs text-text-secondary"
                        style={{ backgroundColor: 'rgba(10,10,15,0.7)', borderColor: `${service.gradientFrom}30` }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: pi * 0.1, duration: 0.35 }}
                        whileHover={{ borderColor: `${service.gradientFrom}80`, scale: 1.05 }}
                      >
                        <span className="text-[10px] font-bold mr-1.5 tabular-nums" style={{ color: `${service.gradientFrom}70` }}>{pi + 1}</span>
                        {step}
                      </motion.div>
                      {pi < service.pipeline.length - 1 && (
                        <motion.svg
                          width="18" height="10" viewBox="0 0 18 10" fill="none"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: pi * 0.2 }}
                        >
                          <path d="M0 5h14M10 1l4 4-4 4" stroke={`${service.gradientFrom}80`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.subItems.map((sub, subi) => (
                  <motion.div
                    key={sub.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: subi * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <SpotlightCard
                      className="glass-card p-5 rounded-xl h-full hover:border-electric-cyan/25 transition-colors duration-300"
                      glowColor={`${service.gradientFrom}08`}
                    >
                      <h3 className="font-heading text-base font-bold mb-2" style={{ color: '#f8f9fa' }}>{sub.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed mb-4">{sub.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {sub.techStack.map(tech => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-0.5 rounded-md text-text-muted border"
                            style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={sub.href}
                        className="text-xs font-semibold hover:gap-2 transition-all duration-200 flex items-center gap-1.5"
                        style={{ color: service.gradientFrom }}
                      >
                        Discuss this project →
                      </Link>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        );
      })}
    </div>
  );
}
