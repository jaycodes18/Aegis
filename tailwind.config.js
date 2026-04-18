/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Aegis v3 — dark cyber palette
        // Surfaces
        'ag-bg':        '#0d0e12',   // deep near-black
        'ag-surface':   '#13151c',   // card surface
        'ag-surface2':  '#181b24',   // elevated surface
        'ag-border':    '#262b38',   // subtle border
        'ag-divider':   '#1e2230',   // thin divider
        // Text
        'ag-text':      '#e2e5ed',   // primary text
        'ag-muted':     '#7b8299',   // muted
        'ag-faint':     '#3d4358',   // faint
        // Primary accent — electric cyan-teal
        'ag-accent':    '#00c8ff',   // electric blue-cyan
        'ag-accent-d':  '#0099c4',   // darker hover
        'ag-accent-dim':'#0a3040',   // subtle bg tint
        // Secondary — indigo glow for variety
        'ag-indigo':    '#7c6fe0',
        'ag-indigo-d':  '#5c4fc9',
        // Semantic
        'ag-success':   '#22d67a',
        'ag-success-d': '#17a85c',
        'ag-success-dim':'#0a2e1c',
        'ag-warn':      '#f59e0b',
        'ag-warn-dim':  '#2c1e05',
        'ag-danger':    '#f04747',
        'ag-danger-d':  '#c23535',
        'ag-danger-dim':'#2d0f0f',
        // Difficulty badge colors
        'ag-easy':      '#22d67a',
        'ag-medium':    '#f59e0b',
        'ag-hard':      '#f04747',
      },
      fontFamily: {
        sans: ['"General Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease-out forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan-line':  'scanLine 4s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(0,200,255,0.2)' },
          '50%':       { boxShadow: '0 0 28px rgba(0,200,255,0.5)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'glow-sm':   '0 0 8px rgba(0,200,255,0.25)',
        'glow-md':   '0 0 20px rgba(0,200,255,0.35)',
        'glow-lg':   '0 0 40px rgba(0,200,255,0.3)',
        'card':      '0 4px 24px rgba(0,0,0,0.4)',
        'card-lg':   '0 8px 40px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
