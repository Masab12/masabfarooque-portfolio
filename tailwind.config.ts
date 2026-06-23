import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs:   '480px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      maxWidth: {
        '8xl':  '96rem',   /* 1536px */
        '9xl':  '112rem',  /* 1792px */
        '10xl': '130rem',  /* 2080px */
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        heading: ['var(--font-space-grotesk)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        'void-black':              'var(--bg-primary)',
        'deep-space':              'var(--bg-secondary)',
        'matte-charcoal':          '#1a1a2e',
        'electric-cyan':           'var(--accent-cyan)',
        'electric-cyan-muted':     'var(--accent-cyan)',
        'deep-violet':             'var(--accent-violet)',
        'deep-violet-muted':       'var(--accent-violet)',
        'text-primary':            'var(--text-1)',
        'text-secondary':          'var(--text-2)',
        'text-muted':              'var(--text-3)',
        // Editorial semantic accents
        'primary':                 'var(--primary)',
        'primary-deep':            'var(--primary-deep)',
        'secondary':               'var(--secondary)',
        'tertiary':                'var(--tertiary)',
        'mustard':                 'var(--accent-mustard)',
        'border-strong':           'var(--border-strong)',
        'surface-card':            'var(--bg-card)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ambient-glow': 'radial-gradient(circle at 50% 50%, rgba(191, 84, 44, 0.10) 0%, transparent 50%)',
        'ambient-glow-violet': 'radial-gradient(circle at 50% 50%, rgba(63, 88, 168, 0.10) 0%, transparent 50%)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
