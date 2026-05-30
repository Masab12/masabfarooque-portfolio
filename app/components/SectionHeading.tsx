'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({ title, subtitle, align = 'center', className = '' }: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 sm:mb-16 ${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      <motion.h2
        className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight gradient-text"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>

      {/* Animated underline — grows from left */}
      <div className={`relative overflow-hidden h-1 rounded-full ${isCenter ? 'mx-auto' : ''}`} style={{ width: 80 }}>
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(90deg, rgb(0,240,255), rgb(139,92,246))' }}
          initial={{ x: '-100%' }}
          whileInView={{ x: '0%' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {subtitle && (
        <motion.p
          className="mt-4 text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed"
          style={isCenter ? { marginLeft: 'auto', marginRight: 'auto' } : undefined}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.28 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
