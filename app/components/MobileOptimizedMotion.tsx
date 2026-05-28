'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MobileOptimizedMotionProps {
  children: ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  [key: string]: any;
}

export function MobileOptimizedMotion({
  children,
  className = '',
  ...props
}: MobileOptimizedMotionProps) {
  // Pass-through to framer-motion to ensure animations run on mobile
  return (
    <motion.div
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
