'use client';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { HiStar } from 'react-icons/hi';

const awards = [
  {
    rank: 'Best Mechanics Award',
    title: 'Rookie Game Jam 2022',
    event: 'Mindstorm Studios',
    organizer: 'Mindstorm Studios',
    year: '2022',
    description: 'Won for Titanic Rescue, a hyper-casual survival game built during the jam. The game was also selected for incubation by Mindstorm Studios.',
    color: 'rgb(251,191,36)',
    bg: 'rgba(251,191,36,0.06)',
    border: 'rgba(251,191,36,0.35)',
    shadow: 'rgba(251,191,36,0.12)',
    emoji: '🏆',
  },
  {
    rank: 'Runner-Up',
    title: "Developers Game Jam 2.0",
    event: "Developers Game Jam 2.0",
    organizer: 'National Game Jam',
    year: '2022',
    description: "Placed second with Food Planet, competing against developers from universities and studios across Pakistan.",
    color: 'rgb(200,200,220)',
    bg: 'rgba(200,200,220,0.05)',
    border: 'rgba(200,200,220,0.25)',
    shadow: 'rgba(200,200,220,0.08)',
    emoji: '🥈',
  },
  {
    rank: 'Special Award',
    title: 'The Hustler Award',
    event: 'Epiphany Games',
    organizer: 'Epiphany Games',
    year: '2020',
    description: 'Recognized for exceptional drive, work ethic, and execution at one of the national game jam competitions.',
    color: 'var(--accent-cyan)',
    bg: 'var(--accent-cyan-subtle)',
    border: 'var(--accent-cyan-border)',
    shadow: 'var(--accent-cyan-subtle)',
    emoji: '⚡',
  },
];

export default function AwardsSection() {
  return (
    <section className="section-amber relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>
            Recognition
          </h2>
          <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, rgb(251,191,36), rgb(0,240,255))' }} />
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-lg mx-auto">
            Three awards across national game jams in Pakistan between 2020 and 2022.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable={false} scale={1.02}>
                <div
                  className="p-6 rounded-2xl border h-full"
                  style={{ backgroundColor: award.bg, borderColor: award.border, boxShadow: `0 0 30px ${award.shadow}` }}
                >
                  <div className="text-3xl mb-4">{award.emoji}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <HiStar className="w-3.5 h-3.5" style={{ color: award.color }} />
                    <span className="text-xs font-bold tracking-wider uppercase" style={{ color: award.color }}>
                      {award.rank}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold mb-1" style={{ color: 'var(--text-1)' }}>{award.title}</h3>
                  <p className="text-xs font-medium mb-1" style={{ color: award.color }}>{award.event}</p>
                  <p className="text-xs text-text-muted mb-3">{award.year}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{award.description}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
