'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { SiReact, SiNextdotjs, SiNodedotjs, SiFastapi, SiOpenai } from 'react-icons/si';
import HeroCanvas from './HeroCanvas';
import ScrambleText from './ScrambleText';

const HolographicAvatar = dynamic(() => import('./HolographicAvatar'), { ssr: false });

const techStack = [
  { Icon: SiReact, label: 'React', color: '#61DAFB' },
  { Icon: SiNextdotjs, label: 'Next.js', color: '#fff' },
  { Icon: SiNodedotjs, label: 'Node.js', color: '#339933' },
  { Icon: SiFastapi, label: 'FastAPI', color: '#009688' },
  { Icon: SiOpenai, label: 'OpenAI', color: '#10A37F' },
];

const WORDS = ['AI-Powered Platforms', 'Scalable SaaS Apps', 'RAG Pipelines', 'Automation Systems'];

export default function HomepageHero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  const onBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.28 });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center bg-void-black px-4" style={{ overflow: 'clip' }}>
      <HeroCanvas />
      <div className="hidden md:block animated-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-void-black/60 via-transparent to-void-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-void-black/50 via-transparent to-void-black/30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto py-16 sm:py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              className="mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <h1 className="font-heading text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight">
                <ScrambleText text="Masab Farooque" className="gradient-text inline-block" delay={200} speed={22} />
              </h1>
            </motion.div>

            <div className="overflow-hidden mb-8">
              <motion.h2
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.28, ease: [0.76, 0, 0.24, 1] }}
              >
                Full Stack Developer
              </motion.h2>
            </div>

            <motion.div
              className="text-lg sm:text-xl text-text-secondary mb-12 h-10 flex items-center gap-2 lg:justify-start justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.52 }}
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
                    transition={{ duration: 0.36, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 sm:gap-6 mb-12 lg:justify-start justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68 }}
            >
              {techStack.map(({ Icon, label, color }, i) => (
                <motion.div
                  key={label}
                  className="group relative"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.78 + i * 0.07, type: 'spring', stiffness: 200 }}
                >
                  <div
                    className="glass-card p-3 sm:p-4 rounded-xl transition-all duration-300 group-hover:scale-110"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}40`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color }} />
                  </div>
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-xs text-text-muted whitespace-nowrap">{label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.a
                ref={btnRef}
                href="/portfolio"
                onMouseMove={onBtnMouseMove}
                onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
                className="group relative px-8 py-4 rounded-xl font-semibold text-void-black w-full sm:w-auto text-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgb(0,240,255), rgb(139,92,246))' }}
                animate={{ x: mousePos.x, y: mousePos.y }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
                  View My Work <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div className="absolute inset-0 bg-white/25" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.45 }} />
              </motion.a>

              <Link
                href="/contact"
                className="group relative px-8 py-4 glass-card rounded-xl font-semibold text-text-primary w-full sm:w-auto text-center transition-all duration-300 hover:border-electric-cyan/40"
              >
                Let's Talk
              </Link>
            </motion.div>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center">
            <motion.div
              className="w-[480px] h-[500px] relative"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute inset-0 blur-3xl opacity-15 rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgb(0,240,255), rgb(139,92,246))' }}
              />
              <HolographicAvatar />
            </motion.div>
          </div>
        </div>
      </div>

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
    </section>
  );
}
