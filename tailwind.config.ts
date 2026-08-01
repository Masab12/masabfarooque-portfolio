import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        '3xl': '1800px',
      },
      maxWidth: {
        shell: '96rem',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: 'var(--ink)',
          1: 'var(--ink-1)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
          4: 'var(--ink-4)',
        },
        bone: {
          DEFAULT: 'var(--bone)',
          2: 'var(--bone-2)',
          3: 'var(--bone-3)',
        },
        brass: {
          DEFAULT: 'var(--brass)',
          hi: 'var(--brass-hi)',
          lo: 'var(--brass-lo)',
        },
        ember: 'var(--ember)',
      },
      borderColor: {
        DEFAULT: 'var(--line)',
        hair: 'var(--line)',
        hair2: 'var(--line-2)',
        hair3: 'var(--line-3)',
        brass: 'var(--brass-edge)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        io: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      boxShadow: {
        plate: 'var(--shadow-plate)',
      },
    },
  },
  plugins: [],
};

export default config;
