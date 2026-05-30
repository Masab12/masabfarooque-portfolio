'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Tighter spring = more responsive scroll tracking
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left z-[9997] pointer-events-none"
      style={{
        height: 2,
        scaleX,
        background: 'linear-gradient(90deg, rgb(0,240,255) 0%, rgb(139,92,246) 50%, rgb(0,240,255) 100%)',
        backgroundSize: '200% 100%',
        boxShadow: '0 0 8px rgba(0,240,255,0.7), 0 0 20px rgba(0,240,255,0.25)',
        willChange: 'transform',
      }}
    />
  );
}
