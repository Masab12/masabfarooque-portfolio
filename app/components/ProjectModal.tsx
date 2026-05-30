'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    technologies: string[];
    features: string[];
    challenges: string[];
    imageSrc: string;
    images?: string[];
    liveUrl?: string;
    githubUrl?: string;
  };
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const gallery = project?.images?.length ? project.images : [project?.imageSrc];
  const hasMultiple = gallery.length > 1;
  const [imgIdx, setImgIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = useCallback(() => {
    setDirection(-1);
    setImgIdx(i => (i - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const next = useCallback(() => {
    setDirection(1);
    setImgIdx(i => (i + 1) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    if (!isOpen) { setImgIdx(0); return; }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, next, prev]);

  if (!isOpen || !project) return null;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal container */}
          <div className="fixed inset-0 z-[201] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
              <motion.div
                className="relative w-full max-w-4xl rounded-2xl border overflow-hidden flex flex-col"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-base)',
                  maxHeight: '90vh',
                }}
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 24 }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                onClick={e => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                  style={{ backgroundColor: 'rgba(10,10,15,0.8)' }}
                  aria-label="Close"
                >
                  <IoClose className="w-5 h-5 text-text-secondary hover:text-white transition-colors" />
                </button>

                {/* Scrollable body */}
                <div className="overflow-y-auto">

                  {/* ---- Image Gallery ---- */}
                  <div className="relative bg-void-black" style={{ height: '260px' }}>
                    {/* Sliding image */}
                    <div className="absolute inset-0 overflow-hidden">
                      <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                          key={imgIdx}
                          className="absolute inset-0"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <Image
                            src={gallery[imgIdx]}
                            alt={`${project.title} screenshot ${imgIdx + 1}`}
                            fill
                            className="object-cover sm:object-contain"
                            sizes="(max-width: 768px) 100vw, 896px"
                            unoptimized
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(to bottom, transparent 60%, var(--bg-secondary))' }}
                    />

                    {/* Prev / Next buttons */}
                    {hasMultiple && (
                      <>
                        <button
                          onClick={prev}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full border transition-all"
                          style={{ backgroundColor: 'rgba(10,10,15,0.75)', borderColor: 'rgba(255,255,255,0.12)' }}
                          aria-label="Previous image"
                        >
                          <HiChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={next}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full border transition-all"
                          style={{ backgroundColor: 'rgba(10,10,15,0.75)', borderColor: 'rgba(255,255,255,0.12)' }}
                          aria-label="Next image"
                        >
                          <HiChevronRight className="w-5 h-5 text-white" />
                        </button>
                      </>
                    )}

                    {/* Dot indicators */}
                    {hasMultiple && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                        {gallery.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => { setDirection(i > imgIdx ? 1 : -1); setImgIdx(i); }}
                            className="rounded-full transition-all duration-200"
                            aria-label={`Go to image ${i + 1}`}
                            style={{
                              width: i === imgIdx ? '20px' : '6px',
                              height: '6px',
                              backgroundColor: i === imgIdx ? 'var(--accent-cyan)' : 'var(--border-base)',
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Image counter badge */}
                    {hasMultiple && (
                      <div
                        className="absolute top-3 left-3 z-10 px-2 py-1 rounded-md text-xs font-mono"
                        style={{
                          backgroundColor: 'rgba(10,10,15,0.7)',
                          color: 'rgba(160,160,171,0.9)',
                          border: '1px solid var(--border-base)',
                        }}
                      >
                        {imgIdx + 1} / {gallery.length}
                      </div>
                    )}
                  </div>

                  {/* ---- Thumbnail strip (for multi-image) ---- */}
                  {hasMultiple && (
                    <div className="flex gap-2 px-4 sm:px-6 pt-4 overflow-x-auto pb-1">
                      {gallery.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => { setDirection(i > imgIdx ? 1 : -1); setImgIdx(i); }}
                          className="relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200"
                          style={{
                            width: '72px',
                            height: '48px',
                            outline: i === imgIdx ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                            opacity: i === imgIdx ? 1 : 0.55,
                          }}
                          aria-label={`View image ${i + 1}`}
                        >
                          <Image
                            src={src}
                            alt={`Thumbnail ${i + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ---- Text Content ---- */}
                  <div className="p-5 sm:p-7 md:p-8">
                    <h2
                      className="text-2xl sm:text-3xl font-bold mb-3"
                      style={{ color: 'var(--text-1)' }}
                    >
                      {project.title}
                    </h2>

                    {/* Full description to handle \n\n paragraphs */}
                    <div className="mb-6 space-y-3">
                      {project.fullDescription.split('\n\n').map((para, i) => (
                        <p key={i} className="text-text-secondary text-sm sm:text-base leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="mb-5">
                      <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border"
                            style={{
                              backgroundColor: 'var(--accent-cyan-subtle)',
                              color: 'var(--accent-cyan)',
                              borderColor: 'var(--accent-cyan-border)',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-5">
                      <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>
                        Key Features
                      </h3>
                      <ul className="space-y-1.5">
                        {project.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-text-secondary text-sm sm:text-base">
                            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-cyan)' }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Challenges */}
                    {project.challenges.length > 0 && (
                      <div className="mb-5">
                        <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>
                          Technical Challenges
                        </h3>
                        <ul className="space-y-1.5">
                          {project.challenges.map((c, i) => (
                            <li key={i} className="flex items-start gap-3 text-text-secondary text-sm sm:text-base">
                              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-violet)' }} />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Links */}
                    {(project.githubUrl || project.liveUrl) && (
                      <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-base)' }}>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                            style={{
                              background: 'linear-gradient(135deg, rgb(0,240,255), rgb(139,92,246))',
                              color: '#0a0a0f',
                            }}
                          >
                            <FiExternalLink className="w-4 h-4" />
                            Live Site
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all hover:border-opacity-60"
                            style={{
                              borderColor: 'var(--border-base)',
                              color: 'var(--text-1)',
                            }}
                          >
                            <FiGithub className="w-4 h-4" />
                            View Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
