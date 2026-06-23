'use client';

import { motion } from 'framer-motion';
import type { ProjectCategory } from '@/app/data/projects';

type Filter = ProjectCategory | 'all';

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'full-stack' },
  { label: 'AI & ML', value: 'ai-ml' },
  { label: 'SaaS', value: 'saas' },
  { label: 'Scraping', value: 'scraping' },
];

interface FilterBarProps {
  active: Filter;
  onChange: (f: Filter) => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {filters.map(f => {
        const isActive = active === f.value;
        return (
          <motion.button
            key={f.value}
            onClick={() => onChange(f.value)}
            className="relative px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-200 min-h-[44px] flex items-center"
            style={{
              color: isActive ? 'var(--bg-primary)' : 'rgba(160,160,171,0.9)',
              backgroundColor: isActive ? undefined : 'rgba(255,255,255,0.04)',
              border: isActive ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: 'var(--primary)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
