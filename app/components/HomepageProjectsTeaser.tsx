'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import dynamic from 'next/dynamic';
import { projects } from '@/app/data/projects';
import SectionHeading from './SectionHeading';

const ProjectCard = dynamic(() => import('./ProjectCard'), { ssr: false });
const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });

import type { Project } from '@/app/data/projects';

const featured = projects.filter(p => p.featured).slice(0, 3);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HomepageProjectsTeaser() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-cyan relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-matte-charcoal/5 to-void-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection from 195+ completed orders. Real clients, real production systems."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {featured.map((project, i) => (
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

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-200"
            style={{ color: 'var(--accent-cyan)' }}
          >
            See Full Portfolio <HiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {selected && <ProjectModal isOpen={!!selected} project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
