'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { label: 'Full Stack', value: 95 },
  { label: 'AI / ML', value: 88 },
  { label: 'Scraping', value: 92 },
  { label: 'API Dev', value: 90 },
  { label: 'DevOps', value: 78 },
  { label: 'Game Dev', value: 72 },
];

const cx = 160;
const cy = 160;
const r = 110;
const N = skills.length;

function polarToCartesian(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function makePolygon(values: number[]) {
  return values
    .map((v, i) => {
      const angle = (360 / N) * i;
      const radius = (v / 100) * r;
      const pt = polarToCartesian(angle, radius);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');
}

const gridLevels = [25, 50, 75, 100];

export default function SkillsRadar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fullPolygon = makePolygon(skills.map(s => s.value));
  const zeroPolygon = makePolygon(skills.map(() => 0));

  return (
    <section className="section-emerald relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>
            Skill Profile
          </h2>
          <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }} />
        </motion.div>

        <div ref={ref} className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          <motion.div
            className="w-full max-w-[280px] sm:max-w-[320px] flex-shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 320 320" className="w-full h-auto">
              {gridLevels.map(level => {
                const poly = makePolygon(skills.map(() => level));
                return (
                  <polygon
                    key={level}
                    points={poly}
                    fill="none"
                    stroke="var(--border-base)"
                    strokeWidth="1"
                  />
                );
              })}

              {skills.map((_, i) => {
                const angle = (360 / N) * i;
                const outer = polarToCartesian(angle, r);
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="var(--border-base)"
                    strokeWidth="1"
                  />
                );
              })}

              <motion.polygon
                points={inView ? fullPolygon : zeroPolygon}
                fill="var(--accent-cyan-subtle)"
                stroke="var(--accent-cyan)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                initial={{ points: zeroPolygon }}
                animate={inView ? { points: fullPolygon } : {}}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />

              {skills.map((skill, i) => {
                const angle = (360 / N) * i;
                const dotPt = polarToCartesian(angle, (skill.value / 100) * r);
                const labelPt = polarToCartesian(angle, r + 22);
                return (
                  <g key={skill.label}>
                    <motion.circle
                      cx={dotPt.x}
                      cy={dotPt.y}
                      r="4"
                      fill="var(--accent-cyan)"
                      style={{ filter: 'none' }}
                      initial={{ opacity: 0, r: 0 }}
                      animate={inView ? { opacity: 1, r: 4 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                    />
                    <text
                      x={labelPt.x}
                      y={labelPt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="rgba(160,160,171,0.9)"
                      fontSize="11"
                      fontFamily="var(--font-inter)"
                    >
                      {skill.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 gap-3 w-full">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{skill.label}</span>
                  <span className="text-sm font-mono" style={{ color: 'var(--accent-cyan)' }}>{skill.value}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-base)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.value}%` } : {}}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.07 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
