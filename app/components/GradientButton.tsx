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
      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-void-black relative overflow-hidden group ${className}`}
      style={{ background: 'linear-gradient(135deg, rgb(0,240,255), rgb(139,92,246))' }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.45 }}
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
