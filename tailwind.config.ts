import type { Config } from 'tailwindcss';

/**
 * Colours are declared once, as RGB channels in globals.css, and read here
 * through `rgb(var(--x) / <alpha-value>)`. That keeps a single source of
 * truth and still lets any class take an opacity, as in `text-ink/60`.
 */
const channel = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: { xs: '480px', '3xl': '1800px', '4xl': '2400px' },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        paper: channel('paper'),
        plate: channel('plate'),
        sheet: channel('sheet'),
        sand: channel('sand'),
        ink: {
          DEFAULT: channel('ink'),
          2: channel('ink-2'),
          3: channel('ink-3'),
          4: channel('ink-4'),
        },
        sage: { DEFAULT: channel('sage'), wash: channel('sage-wash') },
        olive: channel('olive'),
        clay: { DEFAULT: channel('clay'), ink: channel('clay-ink') },
        cyan: channel('cyan'),
      },
      borderColor: {
        DEFAULT: 'var(--line)',
        hair: 'var(--line)',
        hair2: 'var(--line-2)',
        hair3: 'var(--line-3)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        card: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
