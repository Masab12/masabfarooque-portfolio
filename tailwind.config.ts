import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: { xs: '480px', '3xl': '1800px' },
      maxWidth: { shell: '88rem' },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        primary: '#DEDBC8',
        cream: '#E1E0CC',
        surface: {
          1: '#101010',
          2: '#212121',
          3: '#2a2a2a',
        },
      },
      borderColor: {
        DEFAULT: 'var(--line)',
        hair: 'var(--line)',
        hair2: 'var(--line-2)',
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
