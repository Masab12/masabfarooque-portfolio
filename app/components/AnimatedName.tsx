'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedName() {
  const nameRef = useRef<HTMLDivElement>(null);
  const name = "Masab Farooque";
  
  useEffect(() => {
    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll('.letter');
      
      // Only initial entrance animation - no continuous movement
      gsap.from(letters, {
        y: 100,
        opacity: 0,
        rotationX: -90,
        stagger: 0.03,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });
    }
  }, []);

  return (
    <div className="relative inline-block">
      <div ref={nameRef} className="relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
          {name.split('').map((char, index) => (
            <span
              key={index}
              className="letter inline-block bg-gradient-to-r from-electric-cyan via-deep-violet to-electric-cyan bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-electric-cyan/20 to-deep-violet/20 blur-3xl -z-10 animate-pulse" />

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
