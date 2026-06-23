'use client';

import { motion } from 'framer-motion';
import { SiGithub, SiInstagram } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import FiverrIcon from './icons/FiverrIcon';
import FiverrStats from './FiverrStats';

interface SkillCategory {
  title: string;
  color: string;
  borderColor: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    color: 'text-electric-cyan',
    borderColor: 'border-electric-cyan/20',
    skills: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    color: 'text-deep-violet',
    borderColor: 'border-deep-violet/20',
    skills: ['FastAPI', 'NestJS', 'Node.js', 'Python'],
  },
  {
    title: 'AI & Automation',
    color: 'text-electric-cyan',
    borderColor: 'border-electric-cyan/20',
    skills: ['LangChain', 'OpenAI', 'Groq', 'RAG', 'Vector DBs'],
  },
  {
    title: 'Infrastructure',
    color: 'text-text-secondary',
    borderColor: 'border-white/10',
    skills: ['PostgreSQL', 'Supabase', 'Redis', 'Docker', 'AWS'],
  },
];

const socialLinks = [
  { 
    name: 'Fiverr', 
    url: 'https://www.fiverr.com/p_scribbles/portfolio/', 
    label: 'Level 2 Seller',
    icon: <FiverrIcon className="w-5 h-5" />
  },
  { 
    name: 'GitHub', 
    url: 'https://github.com/Masab12', 
    label: 'Open Source',
    icon: <SiGithub className="w-5 h-5" />
  },
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/masabfarooque', 
    label: 'Connect',
    icon: <FaLinkedin className="w-5 h-5" />
  },
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/masabfarooque', 
    label: '@masabfarooque',
    icon: <SiInstagram className="w-5 h-5" />
  },
];

export default function IdentityArsenalSection() {
  return (
    <section
      id="identity"
      className="relative w-full bg-transparent py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-matte-charcoal/10 to-void-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-primary mb-4">
            About Me
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-electric-cyan to-deep-violet rounded-full mb-4" />
          <div className="flex items-center gap-2 text-text-secondary">
            <HiLocationMarker className="w-5 h-5 text-electric-cyan" />
            <span className="text-lg">Based in Islamabad, Pakistan</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 mb-12 md:mb-16">
          <motion.div
            className="lg:col-span-3 glass-card rounded-lg p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-5">
              Level 2 Fiverr Seller • Full Stack Developer
            </h3>
            <div className="space-y-4 text-text-secondary text-base md:text-lg leading-relaxed">
              <p>
                Masab Farooque graduated from COMSATS University Islamabad in 2023 and immediately started freelancing on Fiverr. Now Masab Farooque is a Level 2 Seller with happy clients worldwide.
              </p>
              <p>
                Masab Farooque takes your ideas and turns them into real, working products. Whether it's a website, web app, or AI tool, Masab Farooque builds it from scratch using React, Next.js, FastAPI, and Node.js.
              </p>
              <p>
                Masab Farooque's focus is simple: fast, secure, and scalable solutions that actually solve problems.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 glass-card rounded-lg p-6 md:p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-5">
              Connect
            </h3>
            <div className="space-y-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl bg-transparent/50 border border-white/5 hover:border-electric-cyan/30 transition-all duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(191,84,44, 0.05)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-text-secondary group-hover:text-electric-cyan transition-colors">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary group-hover:text-electric-cyan transition-colors">
                        {link.name}
                      </p>
                      <p className="text-xs text-text-muted">{link.label}</p>
                    </div>
                  </div>
                  <motion.span 
                    className="text-text-muted group-hover:text-electric-cyan transition-colors"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <FiverrStats />

        <motion.div
          className="glass-card rounded-lg p-6 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-8">
            Tech Stack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + catIndex * 0.1 }}
              >
                <h4 className={`text-sm font-semibold uppercase tracking-wider ${category.color} mb-4`}>
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className={`px-3 py-2 rounded-lg border bg-transparent/50 text-sm text-text-secondary cursor-default ${category.borderColor} transition-all duration-300`}
                      whileHover={{
                        scale: 1.05,
                        color: '#ffffff',
                        borderColor: 'rgba(191,84,44,0.4)',
                        backgroundColor: 'rgba(191,84,44,0.1)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}