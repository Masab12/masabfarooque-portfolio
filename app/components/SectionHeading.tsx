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
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        {title}
      </motion.h2>
      <motion.div
        className={`h-1 rounded-full ${isCenter ? 'mx-auto' : ''}`}
        style={{
          width: '80px',
          background: 'linear-gradient(90deg, rgb(0,240,255), rgb(139,92,246))',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: 0.18 }}
      />
      {subtitle && (
        <motion.p
          className="mt-4 text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed"
          style={isCenter ? { marginLeft: 'auto', marginRight: 'auto' } : undefined}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
