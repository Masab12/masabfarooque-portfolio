'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

export default function SelectedArchitecturesSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section
        id="projects"
        className="relative bg-void-black py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-void-black via-matte-charcoal/5 to-void-black pointer-events-none" />

        {/* Decorative ambient glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(139,92,246,0.04)' }}
        />

        <div className="relative max-w-7xl mx-auto">

          {/* Section heading */}
          <div className="mb-12 md:mb-16">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              style={{ color: '#f8f9fa' }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              Masab Portfolio
            </motion.h2>
            <motion.div
              className="w-20 h-1.5 rounded-full mb-5"
              style={{ background: 'linear-gradient(90deg, rgb(0,240,255), rgb(139,92,246))' }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.p
              className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              Real projects I've built for real clients. Click any project to see the full details, architecture, and screenshots.
            </motion.p>
          </div>

          {/* Project grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                index={index}
                imageSrc={project.imageSrc}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject!}
      />
    </>
  );
}
