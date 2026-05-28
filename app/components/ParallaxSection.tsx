'use client';

import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ParallaxSection({ children, className = '', delay = 0 }: ParallaxSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(60px) scale(0.95)' },
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0px) scale(1)' : 'translateY(60px) scale(0.95)',
    },
    delay,
    config: { tension: 280, friction: 60 },
  });

  return (
    <animated.div ref={ref} style={props} className={className}>
      {children}
    </animated.div>
  );
}
