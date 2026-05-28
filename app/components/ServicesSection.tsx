'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  SiPuppeteer
} from 'react-icons/si';
import { HiCode, HiCog, HiSparkles, HiGlobeAlt, HiPlay } from 'react-icons/hi';

const services = [
  {
    icon: HiGlobeAlt,
    title: 'Web Scraping',
    description: 'Extract data from any website with custom scrapers. Handle dynamic content, pagination, and anti-bot measures with advanced techniques.',
    stacks: [
      { icon: SiSelenium, name: 'Selenium' },
      { icon: SiPuppeteer, name: 'Puppeteer' },
      { icon: HiPlay, name: 'Playwright' },
      { icon: SiPython, name: 'Python' },
    ],
    color: 'from-blue-500 via-cyan-500 to-teal-500',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #14b8a6 100%)',
    pipeline: ['Target Site', 'Parse HTML', 'Extract Data', 'Clean & Store']
  },
  {
    icon: HiCode,
    title: 'Full Stack Development',
    description: 'Build scalable web applications with modern tech stacks. From MVP to production-ready solutions with clean architecture.',
    stacks: [
      { icon: SiNextdotjs, name: 'Next.js' },
      { icon: SiFastapi, name: 'FastAPI' },
      { icon: SiNestjs, name: 'NestJS' },
      { icon: SiNodedotjs, name: 'Node.js' },
      { icon: SiReact, name: 'React' },
    ],
    color: 'from-purple-500 via-pink-500 to-rose-500',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f43f5e 100%)',
    pipeline: ['Design', 'Develop', 'Test', 'Deploy']
  },
  {
    icon: HiCog,
    title: 'Web Automation',
    description: 'Automate repetitive tasks and workflows. Save time with custom automation solutions using browser automation tools.',
    stacks: [
      { icon: SiSelenium, name: 'Selenium' },
      { icon: SiPuppeteer, name: 'Puppeteer' },
      { icon: SiPython, name: 'Python' },
      { icon: SiJavascript, name: 'JavaScript' },
    ],
    color: 'from-green-500 via-emerald-500 to-teal-500',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 50%, #14b8a6 100%)',
    pipeline: ['Identify Task', 'Script', 'Automate', 'Monitor']
  },
  {
    icon: HiSparkles,
    title: 'AI Automation',
    description: 'Integrate LLMs, build RAG pipelines, and create intelligent automation systems powered by cutting-edge AI.',
    stacks: [
      { icon: SiOpenai, name: 'OpenAI' },
      { icon: SiPython, name: 'Python' },
      { icon: SiFastapi, name: 'FastAPI' },
    ],
    color: 'from-orange-500 via-red-500 to-pink-500',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)',
    pipeline: ['Train Model', 'Build Pipeline', 'Integrate', 'Optimize']
  },
];

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const Icon = service.icon;

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setSpotPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  // Initial entrance animation
  useEffect(() => {
    if (inView && cardRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(cardRef.current, {
          y: 100,
          opacity: 0,
          rotationX: -15,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out',
        });

        gsap.from(iconRef.current, {
          scale: 0,
          rotation: -180,
          duration: 0.8,
          delay: index * 0.15 + 0.3,
          ease: 'back.out(1.7)',
        });
      }, cardRef);

      return () => ctx.revert();
    }
  }, [inView, index]);

  // Pipeline building animation on hover
  useEffect(() => {
    if (isHovered && pipelineRef.current) {
      const steps = pipelineRef.current.querySelectorAll('.pipeline-step');
      
      gsap.from(steps, {
        scale: 0.95,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Glow effect
      gsap.to(cardRef.current, {
        boxShadow: `0 0 40px ${service.gradient.match(/#[0-9a-f]{6}/i)?.[0]}40`,
        duration: 0.3,
      });
    } else if (!isHovered && cardRef.current) {
      gsap.to(cardRef.current, {
        boxShadow: '0 0 0px rgba(0,0,0,0)',
        duration: 0.3,
      });
    }
  }, [isHovered, service.gradient]);

  return (
    <div
      ref={(node) => {
        cardRef.current = node;
        ref(node);
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={onMouseMove}
    >
      <div className="glass-card rounded-2xl p-6 md:p-8 h-full relative overflow-hidden transition-all duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${spotPos.x}px ${spotPos.y}px, rgba(0,240,255,0.05) 0%, transparent 55%)`
            : undefined,
        }}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{ background: service.gradient }}
        />

        {/* Icon with GSAP animation */}
        <div ref={iconRef} className="relative z-10 mb-6">
          <div
            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white relative group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-10 h-10 md:w-12 md:h-12" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 group-hover:text-electric-cyan transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-text-secondary text-base leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Pipeline - Animated stagger flow */}
        <div className="mb-6">
          <div className="text-xs text-text-muted mb-3 font-semibold tracking-wider">WORKFLOW:</div>
          <motion.div
            className="flex items-center gap-1.5 flex-wrap"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
            }}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {service.pipeline.map((step, i) => (
              <div key={step} className="flex items-center gap-1.5">
                <motion.div
                  className="pipeline-step px-3 py-1.5 rounded-lg border text-xs text-text-secondary cursor-default relative overflow-hidden"
                  style={{ backgroundColor: 'rgba(10,10,15,0.7)', borderColor: 'rgba(0,240,255,0.2)' }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, x: -10 },
                    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  whileHover={{ borderColor: 'rgba(0,240,255,0.55)', backgroundColor: 'rgba(0,240,255,0.08)', scale: 1.05 }}
                >
                  {/* step number */}
                  <span className="text-[10px] font-bold mr-1.5 tabular-nums" style={{ color: 'rgba(0,240,255,0.5)' }}>{i + 1}</span>
                  {step}
                  {/* shimmer sweep on hover */}
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.12) 50%, transparent 100%)', x: '-100%' }}
                    whileHover={{ x: '100%', transition: { duration: 0.55 } }}
                  />
                </motion.div>
                {i < service.pipeline.length - 1 && (
                  <motion.span
                    className="flex items-center"
                    style={{ display: 'inline-block', transformOrigin: 'left center' }}
                    variants={{
                      hidden: { opacity: 0, scaleX: 0 },
                      visible: { opacity: 1, scaleX: 1, transition: { duration: 0.28, ease: 'easeOut' } },
                    }}
                  >
                    <motion.svg
                      width="18" height="10" viewBox="0 0 18 10" fill="none"
                      animate={inView ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                    >
                      <path d="M0 5h14M10 1l4 4-4 4" stroke="rgba(0,240,255,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </motion.span>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-3">
          {service.stacks.map((stack) => {
            const StackIcon = stack.icon;
            return (
              <div
                key={stack.name}
                className="tech-stack-item flex items-center gap-2 px-3 py-2 rounded-lg bg-void-black/50 border border-white/10 group-hover:border-electric-cyan/30 transition-all duration-300 hover:scale-110 hover:bg-electric-cyan/10 hover:border-electric-cyan/50 cursor-default"
              >
                <StackIcon className="text-electric-cyan text-lg" />
                <span className="text-xs text-text-secondary">{stack.name}</span>
              </div>
            );
          })}
        </div>

        {/* Hover glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan/20 to-deep-violet/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [ref] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      id="services"
      className="relative w-full bg-void-black py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-matte-charcoal/5 to-void-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4"
            style={{ color: '#f8f9fa' }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            Services I Provide
          </motion.h2>
          <motion.div
            className="w-20 h-1.5 rounded-full mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg, rgb(0,240,255), rgb(139,92,246))' }}
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
