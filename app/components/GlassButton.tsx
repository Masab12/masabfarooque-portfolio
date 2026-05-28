'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface GlassButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function GlassButton({ href, children, external = false, className = '', onClick }: GlassButtonProps) {
  const inner = (
    <motion.span
      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-text-primary glass-card relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.04, borderColor: 'rgba(0,240,255,0.4)' }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.span
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(0,240,255,0.06)' }}
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
