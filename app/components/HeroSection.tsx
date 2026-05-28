'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiReact, SiNextdotjs, SiNodedotjs, SiFastapi, SiOpenai } from 'react-icons/si';
import { HiArrowRight } from 'react-icons/hi';
import HeroCanvas from './HeroCanvas';
import ScrambleText from './ScrambleText';

const techStack = [
  { Icon: SiReact, label: 'React', color: '#61DAFB' },
  { Icon: SiNextdotjs, label: 'Next.js', color: '#fff' },
  { Icon: SiNodedotjs, label: 'Node.js', color: '#339933' },
  { Icon: SiFastapi, label: 'FastAPI', color: '#009688' },
  { Icon: SiOpenai, label: 'OpenAI', color: '#10A37F' },
];

const WORDS = [
  'AI-Powered Solutions',
  'Modern Web Apps',
  'Scalable APIs',
  'Workflow Automation',
];

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [wordIdx, setWordIdx] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Word switcher
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx(prev => (prev + 1) % WORDS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center bg-void-black px-4 overflow-hidden"
    >
      {/* Interactive particle canvas */}
      <HeroCanvas />

      {/* Subtle grid behind canvas */}
      <div className="hidden md:block animated-grid opacity-50" />

      {/* Deep gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black/60 via-transparent to-void-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-void-black/40 via-transparent to-void-black/40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center py-20">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass-card rounded-full"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'rgb(0,240,255)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-medium" style={{ color: 'rgb(0,240,255)' }}>
            Level 2 Fiverr Seller
          </span>
        </motion.div>

        {/* Name to scramble decode on load */}
        <motion.div
          className="mb-5 px-2 reveal-parent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2 leading-none tracking-tight">
            <ScrambleText
              text="Masab Farooque"
              className="gradient-text inline-block"
              delay={400}
              speed={24}
            />
          </h1>
        </motion.div>

        {/* Title to masked reveal from below */}
        <div className="reveal-parent mb-8">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          >
            Full Stack Developer
          </motion.h2>
        </div>

        {/* Word-flip animation to replaces TypeAnimation */}
        <motion.div
          className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-12 h-10 flex items-center justify-center gap-2 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <span className="font-mono text-text-muted">Building</span>
          <div className="overflow-hidden h-10 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                className="font-mono font-semibold block"
                style={{ color: 'rgb(0,240,255)' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
              >
                {WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="flex items-center justify-center gap-4 sm:gap-6 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {techStack.map(({ Icon, label, color }, index) => (
            <motion.div
              key={label}
              className="group relative"
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + index * 0.08,
                type: 'spring',
                stiffness: 200,
              }}
            >
              <div
                className="glass-card p-3 sm:p-4 rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  boxShadow: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}30`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300" style={{ color }} />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="text-xs text-text-muted whitespace-nowrap">{label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
        >
          {/* Magnetic Primary Button */}
          <motion.button
            ref={buttonRef}
            onClick={scrollToProjects}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
            className="magnetic-button group relative px-8 py-4 rounded-xl font-semibold text-void-black w-full sm:w-auto overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgb(0,240,255), rgb(139,92,246))',
            }}
            animate={{ x: mousePosition.x, y: mousePosition.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
              View My Work
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/25"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.45 }}
            />
          </motion.button>

          {/* Secondary */}
          <motion.a
            href="#contact"
            className="group relative px-8 py-4 glass-card rounded-xl font-semibold text-text-primary w-full sm:w-auto text-center transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,240,255,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <span className="relative z-10">Get In Touch</span>
            <motion.div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(0,240,255,0.07)' }}
            />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.div
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
            style={{ borderColor: 'rgba(160,160,171,0.25)' }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ backgroundColor: 'rgb(0,240,255)' }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
