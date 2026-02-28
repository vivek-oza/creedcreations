/**
 * Application Constants
 * Centralized configuration and constants for the application
 */

// Brand Colors — Orange, Black, White, Light Silver Grey
export const COLORS = {
  NEON_ORANGE: '#FF8B00',
  NEON_ORANGE_BRIGHT: '#FF1F00',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  LIGHT_SILVER: '#C4C4C4',
  GRAY: {
    100: '#F5F5F5',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    700: '#374151',
    900: '#111827',
  },
} as const;

// Animation Durations
export const ANIMATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  EXTRA_SLOW: 0.8,
} as const;

// Breakpoints (matches TailwindCSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Vanta.js Waves Configuration
export const VANTA_CONFIG = {
  color: 0x882200,
  shininess: 30,
  waveHeight: 15,
  waveSpeed: 1,
  zoom: 1,
  scale: 1.00,
  scaleMobile: 1.00,
} as const;

// Application Metadata
export const APP_CONFIG = {
  TITLE: 'CREED CREATIONS | Best Graphic Design & Video Editing in Gandhinagar',
  DESCRIPTION: 'Best graphic design agency in Gandhinagar. Professional video editing, thumbnail design, photography & branding. Led by Arun Baghel in Sargasan.',
  KEYWORDS: [
    'best graphic design in Gandhinagar',
    'video editor in Gandhinagar',
    'thumbnail design Gandhinagar',
    'best photography Gandhinagar',
    'Arun Baghel',
    'creative agency Gandhinagar',
    'brand design Sargasan',
    'logo design Gandhinagar',
    'video production Gujarat',
    'CREED CREATIONS',
  ],
  URL: 'https://creedcreations.com',
} as const;

// Social Media Links (for future use)
export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://instagram.com/creedcreations',
  BEHANCE: 'https://behance.net/creedcreations',
  DRIBBBLE: 'https://dribbble.com/creedcreations',
  LINKEDIN: 'https://linkedin.com/company/creedcreations',
} as const;

// Navigation Items — labels, section ids for scroll, and optional route for page navigation
// Home is handled by the logo; logo clicks navigate to home/hero
export const NAVIGATION = [
  { label: 'Portfolio', href: '#graphic-design', to: '/portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
] as const;