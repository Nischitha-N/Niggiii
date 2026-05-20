/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'chaos-black': '#0a0a0a',
        'chaos-dark': '#111111',
        'chaos-card': '#1a1a1a',
        'chaos-border': '#2a2a2a',
        'chaos-red': '#e63946',
        'chaos-red-dim': '#9b1c1c',
        'chaos-purple': '#5865f2',
        'chaos-purple-dim': '#3d4591',
        'chaos-blue': '#1d9bf0',
        'chaos-green': '#00ba7c',
        'chaos-yellow': '#ffd700',
        'chaos-white': '#f0f0f0',
        'chaos-gray': '#8899a6',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'cursive'],
        anton: ['Anton', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'typing': 'typing 1s steps(20) infinite',
        'equalizer': 'equalizer 0.8s ease-in-out infinite alternate',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px #e63946, 0 0 10px #e63946' },
          '50%': { boxShadow: '0 0 20px #e63946, 0 0 40px #e63946' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(-3px, -3px)' },
          '60%': { transform: 'translate(3px, 3px)', filter: 'hue-rotate(-90deg)' },
          '80%': { transform: 'translate(3px, -3px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
    },
  },
  plugins: [],
}
