'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { projects } from '@/app/data/projects';
import type { Project, ProjectCategory } from '@/app/data/projects';
import FilterBar from './portfolio/FilterBar';
import ReviewsPaginated from './ReviewsPaginated';

const ProjectCard = dynamic(() => import('./ProjectCard'), { ssr: false });
const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });

type Filter = ProjectCategory | 'all';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function PortfolioPageContent() {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-5 font-mono" style={{ color: 'var(--accent-cyan)' }}>
            Selected Work
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4" style={{ color: 'var(--text-1)' }}>
            Masab's Portfolio
          </h1>
          <p className="text-text-secondary text-base sm:text-lg max-w-3xl leading-relaxed mb-3">
            A selection of production systems built across full stack web development, AI and machine learning, SaaS platforms, web scraping, and API engineering. Every project here was designed, built, and deployed by Masab Farooque as a solo developer.
          </p>
          <p className="text-text-muted text-sm sm:text-base max-w-3xl leading-relaxed mb-8">
            Tech stack across these projects includes <span className="text-text-primary font-medium">Next.js</span>, <span className="text-text-primary font-medium">React</span>, <span className="text-text-primary font-medium">FastAPI</span>, <span className="text-text-primary font-medium">Node.js</span>, <span className="text-text-primary font-medium">PostgreSQL</span>, <span className="text-text-primary font-medium">Supabase</span>, <span className="text-text-primary font-medium">Redis</span>, <span className="text-text-primary font-medium">Celery</span>, <span className="text-text-primary font-medium">Docker</span>, <span className="text-text-primary font-medium">LangChain</span>, <span className="text-text-primary font-medium">OpenAI</span>, <span className="text-text-primary font-medium">Stripe</span>, and <span className="text-text-primary font-medium">Playwright</span>. Clients based in Europe, North America, and Asia across 15+ countries.
          </p>
          <FilterBar active={filter} onChange={setFilter} />
        </div>
      </section>

      <section className="relative w-full px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((project, i) => (
                <motion.div key={project.id} variants={cardVariants}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    imageSrc={project.imageSrc}
                    index={i}
                    onClick={() => setSelected(project)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-text-muted py-20">No projects in this category yet.</p>
          )}
        </div>
      </section>

      <ReviewsPaginated />

      <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 border-t" style={{ borderColor: 'var(--border-base)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-heading text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
            Want to build something like this?
          </p>
          <p className="text-text-secondary text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Every project above was built end to end by Masab — from architecture to deployment.{' '}
            <Link href="/services" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>
              Explore the services
            </Link>{' '}
            or{' '}
            <Link href="/pricing" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-violet)' }}>
              view pricing plans
            </Link>{' '}
            before reaching out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold"
              style={{ background: 'var(--primary)', color: 'var(--color-on-accent)' }}
            >
              Start a Project with Masab
            </Link>
            <Link
              href="/about-masab"
              className="inline-flex items-center gap-2 px-7 py-3.5 glass-card rounded-xl font-semibold text-text-primary hover:border-electric-cyan/40 transition-all"
            >
              About the Developer
            </Link>
          </div>
        </div>
      </section>

      {selected && (
        <ProjectModal isOpen={!!selected} project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
