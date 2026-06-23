'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  index: number;
  imageSrc: string;
  onClick: () => void;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  index,
  imageSrc,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Tilt
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        glareEnable={true}
        glareMaxOpacity={0.08}
        glareColor="rgba(191,84,44,0.6)"
        glarePosition="all"
        glareBorderRadius="16px"
        scale={1.015}
        transitionSpeed={600}
        className="h-full"
      >
        <motion.div
          className="group glass-card rounded-lg overflow-hidden cursor-pointer h-full flex flex-col"
          onClick={onClick}
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(191,84,44,0.06)' }}
          transition={{ duration: 0.3 }}
        >
          {/* Image */}
          <div className="relative h-52 sm:h-60 md:h-64 bg-transparent overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(191,84,44,0.08)] via-transparent to-[rgba(63,88,168,0.06)]" />

            <div className="absolute inset-0">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 2}
                unoptimized
              />
            </div>

            {/* Gradient bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent opacity-80" />

            {/* Hover CTA overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(191,84,44,0.04)' }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <span
                className="px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm"
                style={{
                  color: 'var(--accent-cyan)',
                  borderColor: 'var(--accent-cyan-border)',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                }}
              >
                View Details →
              </span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col">
            <motion.h3
              className="text-lg sm:text-xl md:text-2xl font-bold mb-2 transition-colors duration-300"
              style={{ color: 'var(--text-1)' }}
              whileHover={{ color: 'var(--accent-cyan)' }}
            >
              {title}
            </motion.h3>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4 flex-1">
              {description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 4).map(tech => (
                <motion.span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg border"
                  style={{
                    backgroundColor: 'var(--accent-cyan-subtle)',
                    color: 'var(--accent-cyan)',
                    borderColor: 'var(--accent-cyan-border)',
                  }}
                  whileHover={{
                    scale: 1.04,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {tech}
                </motion.span>
              ))}
              {technologies.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-medium text-text-muted">
                  +{technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Bottom accent */}
          <motion.div
            className="h-0.5 rounded-b-2xl"
            style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
          />
        </motion.div>
      </Tilt>
    </motion.div>
  );
}
