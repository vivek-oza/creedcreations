import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/** Section-to-nav-label mapping per route. Order matters for fallback. */
const SECTION_CONFIG: Record<string, { selector: string; label: string }[]> = {
  '/': [
    { selector: '#home', label: 'Home' },
    { selector: '#graphic-design', label: 'Portfolio' },
    { selector: '#video-design', label: 'Portfolio' },
    { selector: '#services-thumbnails', label: 'Services' },
    { selector: '#services', label: 'Services' },
    { selector: '#about', label: 'About Us' },
    { selector: '#team', label: 'About Us' },
    { selector: '#client-reviews', label: 'About Us' },
    { selector: '#our-clients', label: 'About Us' },
    { selector: '#get-quote', label: 'Contact Us' },
    { selector: '#stats', label: 'Contact Us' },
    { selector: 'footer', label: 'Contact Us' },
  ],
  '/portfolio': [
    { selector: '#portfolio-hero', label: 'Portfolio' },
    { selector: '#graphic-designs', label: 'Portfolio' },
    { selector: '#portfolio-thumbnails', label: 'Portfolio' },
    { selector: '#video-design', label: 'Portfolio' },
    { selector: '#video-designs', label: 'Portfolio' },
    { selector: '#instagram-reels', label: 'Portfolio' },
    { selector: 'footer', label: 'Contact Us' },
  ],
};

/**
 * Strict viewport-based section detection.
 * A section is active only when the center of the viewport lies within it.
 */
export function useActiveSection(): string {
  const [activeLabel, setActiveLabel] = useState<string>('Home');
  const location = useLocation();
  const path = location.pathname;
  const config = SECTION_CONFIG[path] ?? SECTION_CONFIG['/'];

  const checkSection = useCallback(() => {
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    let currentLabel = config[0]?.label ?? 'Home';

    for (let i = 0; i < config.length; i++) {
      const { selector, label } = config[i];
      const el = document.querySelector(selector);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;

      if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
        currentLabel = label;
        break;
      }
    }

    setActiveLabel((prev) => (prev === currentLabel ? prev : currentLabel));
  }, [path]);

  useEffect(() => {
    checkSection();
    const handleScroll = () => {
      requestAnimationFrame(checkSection);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [checkSection]);

  return activeLabel;
}
