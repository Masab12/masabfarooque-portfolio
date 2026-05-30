'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 36, height: 36 }} />;

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: `1px solid ${isDark ? 'rgba(0,240,255,0.25)' : 'rgba(0,127,160,0.3)'}`,
        background: isDark ? 'rgba(0,240,255,0.07)' : 'rgba(0,127,160,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.svg
            key="moon"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.22 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              stroke="rgb(0,240,255)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            initial={{ rotate: 30, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -30, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.22 }}
          >
            <circle cx="12" cy="12" r="4" stroke="#007fa0" strokeWidth="1.8"/>
            <line x1="12" y1="2" x2="12" y2="4" stroke="#007fa0" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="12" y1="20" x2="12" y2="22" stroke="#007fa0" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#007fa0" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#007fa0" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="2" y1="12" x2="4" y2="12" stroke="#007fa0" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="20" y1="12" x2="22" y2="12" stroke="#007fa0" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#007fa0" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#007fa0" strokeWidth="1.8" strokeLinecap="round"/>
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
