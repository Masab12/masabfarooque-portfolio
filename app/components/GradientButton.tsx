'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface GradientButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function GradientButton({ href, children, external = false, className = '', onClick }: GradientButtonProps) {
  const inner = (
    <motion.span
      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold relative overflow-hidden ${className}`}
      style={{ background: 'var(--primary)', color: 'var(--color-on-accent)' }}
      whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(191,84,44,0.35), 0 0 60px rgba(63,88,168,0.2)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Shimmer sweep */}
      <motion.span
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.28) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        initial={{ backgroundPosition: '200% center' }}
        whileHover={{ backgroundPosition: '-200% center' }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      />
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick}>
      {inner}
    </Link>
  );
}
