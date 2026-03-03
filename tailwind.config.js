/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4k': '2560px',
      '4k-xl': '3840px',
    },
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
      fontSize: {
        'fluid-xs': ['clamp(0.7rem, 1.5vw + 0.5rem, 0.8125rem)', { lineHeight: '1.4' }],
        'fluid-sm': ['clamp(0.8125rem, 1.5vw + 0.5rem, 0.9375rem)', { lineHeight: '1.5' }],
        'fluid-base': ['clamp(0.875rem, 1.2vw + 0.6rem, 1.0625rem)', { lineHeight: '1.6' }],
        'fluid-lg': ['clamp(1rem, 1.2vw + 0.7rem, 1.1875rem)', { lineHeight: '1.5' }],
        'fluid-xl': ['clamp(1.125rem, 1.5vw + 0.8rem, 1.375rem)', { lineHeight: '1.4' }],
        'fluid-2xl': ['clamp(1.25rem, 2vw + 1rem, 1.75rem)', { lineHeight: '1.3' }],
        'fluid-3xl': ['clamp(1.5rem, 2.5vw + 1.25rem, 2.25rem)', { lineHeight: '1.2' }],
        'fluid-4xl': ['clamp(1.75rem, 3vw + 1.5rem, 2.5rem)', { lineHeight: '1.15' }],
        'fluid-5xl': ['clamp(2rem, 4vw + 1.5rem, 3rem)', { lineHeight: '1.1' }],
        'fluid-6xl': ['clamp(2.25rem, 5vw + 2rem, 3.75rem)', { lineHeight: '1.05' }],
        'fluid-7xl': ['clamp(2.5rem, 6vw + 2.5rem, 4.5rem)', { lineHeight: '1' }],
        'fluid-8xl': ['clamp(3rem, 7vw + 3rem, 5.5rem)', { lineHeight: '0.95' }],
        'fluid-9xl': ['clamp(3.5rem, 8vw + 3.5rem, 6.5rem)', { lineHeight: '0.9' }],
      },
      maxWidth: {
        'container': '1280px',
        'container-wide': '1536px',
        'container-narrow': '1024px',
        'screen-4k': '2560px',
      },
      spacing: {
        'section': 'clamp(4rem, 8vw, 6rem)',
        'section-sm': 'clamp(3rem, 6vw, 4.5rem)',
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