'use client';

import { motion } from 'framer-motion';

/**
 * app/template.tsx remounts on every navigation, which makes it the right
 * place for the page entrance. A short clip and lift, nothing showy, so
 * moving between pages feels like turning a page rather than reloading.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
