'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
  'ESTABLISHING CONNECTION',
  'LOADING RUNTIME',
  'MOUNTING SERVICES',
  'CALIBRATING AI PIPELINE',
  'DEPLOYING INTERFACE',
  'SYSTEM ONLINE',
];

const TECHS = ['NEXT.JS', 'FASTAPI', 'LANGCHAIN', 'POSTGRES', 'DOCKER', 'PLAYWRIGHT'];

const R_OUT = 108;
const R_MID = 76;
const R_IN  = 46;
const C     = 160; // center of 320×320 container
const SZ    = 320;

export default function PageLoader() {
  const [show, setShow]               = useState(true);
  const [progress, setProgress]       = useState(0);
  const [phase, setPhase]             = useState(0);
  const [activeTechs, setActiveTechs] = useState(0);

  useEffect(() => {
    let rafId: number;
    let t0: number | null = null;
    const DUR = 2300;

    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min(((ts - t0) / DUR) * 100, 100);
      setProgress(p);
      setPhase(Math.min(Math.floor((p / 100) * PHASES.length), PHASES.length - 1));
      setActiveTechs(Math.min(Math.floor((p / 100) * (TECHS.length + 1)), TECHS.length));
      if (p < 100) rafId = requestAnimationFrame(step);
      else setTimeout(() => setShow(false), 520);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => window.dispatchEvent(new CustomEvent('portfolio-loaded'))}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ backgroundColor: '#0a0a0f' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          {/* Corner brackets */}
          {[
            'top-5 left-5 border-t border-l',
            'top-5 right-5 border-t border-r',
            'bottom-5 left-5 border-b border-l',
            'bottom-5 right-5 border-b border-r',
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-6 h-6 ${cls}`}
              style={{ borderColor: 'rgba(0,240,255,0.3)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.07 }}
            />
          ))}

          {/* System label */}
          <motion.p
            className="absolute top-6 left-12 font-mono"
            style={{ fontSize: 10, color: 'rgba(0,240,255,0.28)', letterSpacing: '0.25em' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            PORTFOLIO.SYS · v2026
          </motion.p>

          {/* Coordinates */}
          <motion.p
            className="absolute top-6 right-12 font-mono"
            style={{ fontSize: 10, color: 'rgba(0,240,255,0.22)', letterSpacing: '0.08em' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          >
            33.6844°N · 73.0479°E
          </motion.p>

          {/* ── Radar ─────────────────────────────────────── */}
          <div className="relative" style={{ width: SZ, height: SZ }}>

            {/* SVG: rings, crosshairs, tick marks, dots */}
            <svg
              width={SZ} height={SZ}
              viewBox={`0 0 ${SZ} ${SZ}`}
              style={{ position: 'absolute', inset: 0 }}
            >
              {/* Crosshairs */}
              <line x1={C} y1={C-132} x2={C} y2={C+132} stroke="rgba(0,240,255,0.05)" strokeWidth="1"/>
              <line x1={C-132} y1={C} x2={C+132} y2={C} stroke="rgba(0,240,255,0.05)" strokeWidth="1"/>
              {/* Diagonal guides */}
              <line x1={C-93} y1={C-93} x2={C+93} y2={C+93} stroke="rgba(0,240,255,0.025)" strokeWidth="1"/>
              <line x1={C+93} y1={C-93} x2={C-93} y2={C+93} stroke="rgba(0,240,255,0.025)" strokeWidth="1"/>

              {/* Rings */}
              <circle cx={C} cy={C} r={R_IN}  fill="none" stroke="rgba(0,240,255,0.07)" strokeWidth="1"/>
              <circle cx={C} cy={C} r={R_MID} fill="none" stroke="rgba(0,240,255,0.05)" strokeWidth="1"/>
              <circle cx={C} cy={C} r={R_OUT} fill="none" stroke="rgba(0,240,255,0.1)"  strokeWidth="1" strokeDasharray="3 5"/>

              {/* Tick marks on inner ring at each tech position */}
              {TECHS.map((_, i) => {
                const rad = (i * 60 - 90) * (Math.PI / 180);
                return (
                  <line
                    key={i}
                    x1={C + (R_IN - 5) * Math.cos(rad)}
                    y1={C + (R_IN - 5) * Math.sin(rad)}
                    x2={C + (R_IN + 5) * Math.cos(rad)}
                    y2={C + (R_IN + 5) * Math.sin(rad)}
                    stroke="rgba(0,240,255,0.18)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Tech dots on outer ring */}
              {TECHS.map((tech, i) => {
                const rad = (i * 60 - 90) * (Math.PI / 180);
                const x = C + R_OUT * Math.cos(rad);
                const y = C + R_OUT * Math.sin(rad);
                const on = i < activeTechs;
                return (
                  <g key={tech}>
                    {on && <circle cx={x} cy={y} r={11} fill="rgba(0,240,255,0.04)"/>}
                    <circle
                      cx={x} cy={y} r={on ? 3.5 : 2}
                      fill={on ? 'rgb(0,240,255)' : 'rgba(0,240,255,0.18)'}
                      style={{ transition: 'all 0.4s ease' }}
                    />
                    {on && (
                      <circle cx={x} cy={y} r={3.5} fill="none" stroke="rgba(0,240,255,0.45)" strokeWidth="1"/>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Radar sweep arm */}
            <motion.div
              style={{
                position: 'absolute',
                width: R_OUT * 2,
                height: R_OUT * 2,
                top: C - R_OUT,
                left: C - R_OUT,
                borderRadius: '50%',
                overflow: 'hidden',
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(0,240,255,0.04) 20deg, rgba(0,240,255,0.14) 48deg, transparent 50deg)',
                willChange: 'transform',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }}
            />

            {/* Center pulsing core */}
            <div style={{ position: 'absolute', top: C - 5, left: C - 5, width: 10, height: 10 }}>
              {[0, 0.55, 1.1].map((delay) => (
                <motion.div
                  key={delay}
                  className="absolute inset-0 rounded-full"
                  style={{ border: '1px solid rgba(0,240,255,0.55)' }}
                  animate={{ scale: [1, 3.8], opacity: [0.65, 0] }}
                  transition={{ duration: 2.1, ease: 'easeOut', repeat: Infinity, delay }}
                />
              ))}
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgb(0,240,255)', boxShadow: '0 0 10px rgba(0,240,255,0.9)' }}
              />
            </div>

            {/* Tech labels (absolutely positioned, overflow: visible) */}
            {TECHS.map((tech, i) => {
              const rad = (i * 60 - 90) * (Math.PI / 180);
              const lr  = R_OUT + 24;
              const x   = C + lr * Math.cos(rad);
              const y   = C + lr * Math.sin(rad);
              return (
                <div
                  key={tech}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: 9,
                    letterSpacing: '0.1em',
                    color: i < activeTechs ? 'rgba(0,240,255,0.7)' : 'rgba(255,255,255,0.11)',
                    transition: 'color 0.4s ease',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}
                >
                  {tech}
                </div>
              );
            })}
          </div>

          {/* Phase text */}
          <div className="mt-3 h-5 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: 10,
                  color: 'rgba(0,240,255,0.48)',
                  letterSpacing: '0.22em',
                }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {PHASES[phase]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Name */}
          <div className="mt-3 overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="font-heading text-xl font-bold tracking-[0.3em]"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.9) 0%, rgba(139,92,246,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                MASAB FAROOQUE
              </span>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="mt-5" style={{ width: 224 }}>
            <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full"
                style={{
                  background: 'linear-gradient(90deg, rgb(0,240,255), rgb(139,92,246))',
                  boxShadow: '0 0 6px rgba(0,240,255,0.55)',
                }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.05 }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: 9, color: 'rgba(255,255,255,0.16)', letterSpacing: '0.12em' }}>
                SYS.INIT
              </span>
              <span className="tabular-nums" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: 9, color: 'rgba(0,240,255,0.48)', letterSpacing: '0.12em' }}>
                {String(Math.round(progress)).padStart(3, '0')}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
