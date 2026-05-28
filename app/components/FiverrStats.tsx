'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color: string;
  delay: number;
}

function AnimatedStat({ value, label, suffix = '', prefix = '', color, delay }: StatProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const controls = animate(count, value, {
        duration: isMobile ? 1.5 : 2.5,
        delay: isMobile ? 0 : delay,
        ease: 'easeOut',
      });

      const unsubscribe = rounded.on('change', (latest) => {
        setDisplayValue(latest.toString());
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isVisible, count, rounded, value, delay, isMobile]);

  return (
    <motion.div
      ref={ref}
      className="relative text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay }}
    >
      <motion.div
        className="relative inline-block"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Glowing background */}
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl opacity-20"
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Content */}
        <div className="relative px-8 py-6 md:px-12 md:py-8">
          <motion.div
            className="text-5xl md:text-7xl font-bold mb-2"
            style={{ color }}
            animate={{
              textShadow: [
                `0 0 20px ${color}`,
                `0 0 40px ${color}`,
                `0 0 20px ${color}`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {prefix}{displayValue}{suffix}
          </motion.div>
          <div className="text-sm md:text-base text-text-secondary font-medium">
            {label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FiverrStats() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl p-8 md:p-12 mb-12 md:mb-16"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-electric-cyan rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-3">
          Proven Track Record
        </h3>
        <p className="text-text-secondary text-sm md:text-base">
          Real results from real clients on Fiverr
        </p>
      </motion.div>

      <div className="relative flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
        <AnimatedStat
          value={195}
          label="Orders Completed"
          color="#00F0FF"
          delay={0.2}
        />
        <AnimatedStat
          value={100}
          label="Unique Clients"
          suffix="+"
          color="#8B5CF6"
          delay={0.4}
        />
        <AnimatedStat
          value={10}
          label="Revenue Generated"
          prefix="$"
          suffix="K+"
          color="#00F0FF"
          delay={0.6}
        />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-electric-cyan/5 blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-deep-violet/5 blur-xl"
        animate={{
          scale: [1.5, 1, 1.5],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
