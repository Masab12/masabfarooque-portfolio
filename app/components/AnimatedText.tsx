'use client';

import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    // On mobile, show immediately without animation
    if (mobile) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(true), delay);
    }
  }, [delay]);

  // Mobile: No animation, just show text
  if (isMobile) {
    return <span className={className}>{text}</span>;
  }

  // Desktop: Simple fade-in
  return (
    <span 
      className={`${className} transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {text}
    </span>
  );
}
