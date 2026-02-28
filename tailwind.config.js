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
        // Primary palette: Orange, Black, White, Light Silver Grey
        'neon-orange': '#d94404',
        'neon-orange-bright': '#FF1F00',
        black: '#000000',
        white: '#FFFFFF',
        'light-silver': '#C4C4C4',
        'dark-bg': '#000000',
        'glass': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
      },
      fontFamily: {
        'display': ['Roboto', 'system-ui', 'sans-serif'],
        'body': ['Roboto', 'system-ui', 'sans-serif'],
        'heading': ['Roboto', 'system-ui', 'sans-serif'],
        'archivo': ['Archivo Black', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 1s ease-out',
        'roll-digit': 'rollDigit 0.35s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'funky-glow': 'funkyGlow 3s ease-in-out infinite alternate',
        'text-float': 'textFloat 4s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'rainbow': 'rainbow 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { textShadow: '0 0 20px #FF8B00, 0 0 30px #FF8B00, 0 0 40px #FF8B00' },
          '100%': { textShadow: '0 0 30px #FF8B00, 0 0 40px #FF8B00, 0 0 50px #FF8B00' },
        },
        funkyGlow: {
          '0%': { 
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)',
            transform: 'skewY(-1deg) scale(1)',
          },
          '50%': { 
            textShadow: '0 0 50px rgba(255, 255, 255, 0.5), 0 0 100px rgba(255, 255, 255, 0.2)',
            transform: 'skewY(-0.5deg) scale(1.01)',
          },
          '100%': { 
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)',
            transform: 'skewY(-1deg) scale(1)',
          },
        },
        textFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(0.5deg)' },
          '50%': { transform: 'translateY(-3px) rotate(-0.5deg)' },
          '75%': { transform: 'translateY(-7px) rotate(0.3deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        rollDigit: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}