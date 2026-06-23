'use client';

import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFastapi,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiOpenai,
  SiSupabase,
  SiVercel,
  SiGit,
} from 'react-icons/si';

const techStackRow1 = [
  { Icon: SiReact, name: 'React', color: '#61DAFB' },
  { Icon: SiNextdotjs, name: 'Next.js', color: 'var(--text-1)' },
  { Icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  { Icon: SiFastapi, name: 'FastAPI', color: '#009688' },
  { Icon: SiPython, name: 'Python', color: '#3776AB' },
  { Icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  { Icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
];

const techStackRow2 = [
  { Icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
  { Icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
  { Icon: SiRedis, name: 'Redis', color: '#DC382D' },
  { Icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { Icon: SiOpenai, name: 'OpenAI', color: '#10A37F' },
  { Icon: SiSupabase, name: 'Supabase', color: '#3ECF8E' },
  { Icon: SiVercel, name: 'Vercel', color: 'var(--text-1)' },
  { Icon: SiGit, name: 'Git', color: '#F05032' },
];

export default function TechStackMarquee() {
  return (
    <section className="relative w-full bg-transparent py-16 sm:py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-deep-space/50 to-void-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-1)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            Tech Stack
          </motion.h2>
          <motion.div
            className="w-16 sm:w-20 h-1 sm:h-1.5 rounded-full mx-auto mb-4"
            style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p
            className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Modern technologies I use to build scalable solutions
          </motion.p>
        </div>
      </div>

      {/* Edge fade masks — vw-based so they scale on ultrawide */}
      <div className="absolute inset-y-0 left-0 w-[8vw] min-w-[60px] max-w-[180px] bg-gradient-to-r from-void-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[8vw] min-w-[60px] max-w-[180px] bg-gradient-to-l from-void-black to-transparent z-10 pointer-events-none" />

      {/* Marquee Row 1 - Moving Right */}
      <div className="mb-6">
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="py-4"
        >
          {[...techStackRow1, ...techStackRow1].map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="mx-4 sm:mx-6"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="glass-card p-6 sm:p-8 rounded-lg flex flex-col items-center gap-3 min-w-[120px] sm:min-w-[140px] hover:border-electric-cyan/30 transition-all duration-300 group">
                <tech.Icon
                  className="w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 group-hover:scale-110"
                  style={{ color: tech.color }}
                />
                <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </Marquee>
      </div>

      {/* Marquee Row 2 - Moving Left */}
      <div>
        <Marquee
          gradient={false}
          speed={40}
          direction="right"
          pauseOnHover={true}
          className="py-4"
        >
          {[...techStackRow2, ...techStackRow2].map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="mx-4 sm:mx-6"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="glass-card p-6 sm:p-8 rounded-lg flex flex-col items-center gap-3 min-w-[120px] sm:min-w-[140px] hover:border-deep-violet/30 transition-all duration-300 group">
                <tech.Icon
                  className="w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 group-hover:scale-110"
                  style={{ color: tech.color }}
                />
                <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </Marquee>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void-black to-transparent pointer-events-none" />
    </section>
  );
}
