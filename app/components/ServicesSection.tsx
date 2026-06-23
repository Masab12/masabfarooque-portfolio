'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiNodedotjs,
  SiNestjs,
  SiOpenai,
  SiSelenium,
  SiPuppeteer,
} from 'react-icons/si';
import {
  TbSpider,
  TbStack2,
  TbRobot,
  TbBrain,
  TbBrowser,
} from 'react-icons/tb';

const NeuralMesh3D = dynamic(() => import('./NeuralMesh3D'), { ssr: false });

const services = [
  {
    num: '01',
    icon: TbSpider,
    title: 'Web Scraping',
    description: 'Extract structured data from any website. Handle JavaScript rendering, anti-bot detection, rate limits, and pagination at scale.',
    stacks: [
      { icon: SiSelenium, name: 'Selenium' },
      { icon: SiPuppeteer, name: 'Puppeteer' },
      { icon: TbBrowser, name: 'Playwright' },
      { icon: SiPython, name: 'Python' },
    ],
    accentColor: '#22c55e',
    pipeline: ['Target Site', 'Parse HTML', 'Extract Data', 'Clean & Store'],
  },
  {
    num: '02',
    icon: TbStack2,
    title: 'Full Stack Development',
    description: 'Production web applications built end-to-end. From database schema and API architecture to UI components and deployment.',
    stacks: [
      { icon: SiNextdotjs, name: 'Next.js' },
      { icon: SiFastapi, name: 'FastAPI' },
      { icon: SiNestjs, name: 'NestJS' },
      { icon: SiNodedotjs, name: 'Node.js' },
      { icon: SiReact, name: 'React' },
    ],
    accentColor: '#3b82f6',
    pipeline: ['Design', 'Develop', 'Test', 'Deploy'],
  },
  {
    num: '03',
    icon: TbRobot,
    title: 'Web Automation',
    description: 'Automate repetitive workflows. Browser automation for logins, form submissions, file downloads, and complex UI interactions.',
    stacks: [
      { icon: SiSelenium, name: 'Selenium' },
      { icon: SiPuppeteer, name: 'Puppeteer' },
      { icon: SiPython, name: 'Python' },
      { icon: SiJavascript, name: 'JavaScript' },
    ],
    accentColor: '#f97316',
    pipeline: ['Identify Task', 'Script', 'Automate', 'Monitor'],
  },
  {
    num: '04',
    icon: TbBrain,
    title: 'AI Automation',
    description: 'LangChain agents, RAG pipelines, and LLM integrations that actually work in production — with proper caching, fallbacks, and logging.',
    stacks: [
      { icon: SiOpenai, name: 'OpenAI' },
      { icon: SiPython, name: 'Python' },
      { icon: SiFastapi, name: 'FastAPI' },
    ],
    accentColor: '#8b5cf6',
    pipeline: ['Ingest Data', 'Build Pipeline', 'Integrate', 'Optimize'],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const Icon = service.icon;

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  useEffect(() => {
    if (inView && cardRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(cardRef.current, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          delay: index * 0.14,
          ease: 'power3.out',
        });
        gsap.from(iconRef.current, {
          scale: 0.6,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.14 + 0.25,
          ease: 'back.out(1.7)',
        });
      }, cardRef);
      return () => ctx.revert();
    }
  }, [inView, index]);

  return (
    <div
      ref={(node) => { cardRef.current = node; ref(node); }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={onMouseMove}
    >
      <div
        className="glass-card rounded-lg p-7 md:p-8 h-full relative overflow-hidden transition-all duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${spotPos.x}px ${spotPos.y}px, ${service.accentColor}08 0%, transparent 60%)`
            : undefined,
        }}
      >
        {/* Large faded card number — editorial detail */}
        <span
          className="absolute top-5 right-6 font-heading font-bold select-none pointer-events-none transition-opacity duration-300"
          style={{
            fontSize: 'clamp(3.5rem, 6vw, 5rem)',
            lineHeight: 1,
            color: service.accentColor,
            opacity: isHovered ? 0.14 : 0.07,
          }}
        >
          {service.num}
        </span>

        {/* Icon — no gradient box, just the icon with a soft glow halo */}
        <div ref={iconRef} className="relative mb-7 inline-flex">
          <div
            className="absolute inset-0 blur-2xl rounded-full transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${service.accentColor}, transparent 70%)`,
              opacity: isHovered ? 0.35 : 0.18,
              transform: 'scale(1.8)',
            }}
          />
          <Icon
            className="relative z-10 transition-transform duration-300 group-hover:scale-110"
            style={{ width: '3rem', height: '3rem', color: service.accentColor }}
          />
        </div>

        {/* Title */}
        <h3
          className="text-2xl md:text-3xl font-bold mb-3 transition-colors duration-300"
          style={{ color: isHovered ? service.accentColor : 'var(--text-1)' }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Workflow pipeline */}
        <div className="mb-6">
          <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: `${service.accentColor}90` }}>
            Workflow
          </p>
          <motion.div
            className="flex items-center gap-1.5 flex-wrap"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {service.pipeline.map((step, i) => (
              <div key={step} className="flex items-center gap-1.5">
                <motion.div
                  className="pipeline-step px-3 py-1.5 rounded-lg border text-xs text-text-secondary relative overflow-hidden"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: `${service.accentColor}28` }}
                  variants={{
                    hidden: { opacity: 0, x: -8, scale: 0.9 },
                    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  whileHover={{ borderColor: `${service.accentColor}70`, backgroundColor: `${service.accentColor}10`, scale: 1.04 }}
                >
                  <span className="text-[10px] font-bold mr-1.5 tabular-nums" style={{ color: `${service.accentColor}60` }}>{i + 1}</span>
                  {step}
                </motion.div>
                {i < service.pipeline.length - 1 && (
                  <motion.svg
                    width="16" height="10" viewBox="0 0 16 10" fill="none"
                    variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 0.25 } } }}
                    animate={inView ? { x: [0, 3, 0] } : {}}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  >
                    <path d="M0 5h11M7 1l4 4-4 4" stroke={`${service.accentColor}70`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2.5">
          {service.stacks.map((stack) => {
            const StackIcon = stack.icon;
            return (
              <div
                key={stack.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-250 hover:scale-105 cursor-default"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-base)',
                }}
              >
                <StackIcon className="text-lg flex-shrink-0" style={{ color: service.accentColor }} />
                <span className="text-xs text-text-secondary">{stack.name}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom edge glow on hover */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-px rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)` }}
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full bg-transparent py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-matte-charcoal/5 to-void-black pointer-events-none" />

      {/* 3D neural mesh — top-right background decoration */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] opacity-40 pointer-events-none select-none hidden lg:block">
        <NeuralMesh3D />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4"
            style={{ color: 'var(--text-1)' }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            Services I Provide
          </motion.h2>
          <motion.div
            className="w-20 h-1.5 rounded-full mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.2 }}
          />
          <motion.p
            className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            From web scraping to AI automation, I build solutions that solve real problems
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
