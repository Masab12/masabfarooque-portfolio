'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9997] pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, rgb(0,240,255), rgb(139,92,246))',
        boxShadow: '0 0 10px rgba(0,240,255,0.6), 0 0 20px rgba(0,240,255,0.3)',
      }}
    />
  );
}
