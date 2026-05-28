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
        xs: '480px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        heading: ['var(--font-space-grotesk)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Base colors - layered dark theme
        'void-black': '#0a0a0f',
        'deep-space': '#0f0f1a',
        'matte-charcoal': '#1a1a2e',
        
        // Accent colors - softened neons
        'electric-cyan': 'rgba(0, 240, 255, 0.9)',
        'electric-cyan-muted': 'rgba(0, 240, 255, 0.6)',
        'deep-violet': 'rgba(139, 92, 246, 0.9)',
        'deep-violet-muted': 'rgba(139, 92, 246, 0.6)',
        
        // Text colors
        'text-primary': '#f8f9fa',
        'text-secondary': '#e8e9ed',
        'text-muted': '#a0a0ab',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ambient-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%)',
        'ambient-glow-violet': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
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
