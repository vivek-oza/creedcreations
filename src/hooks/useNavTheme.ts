import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Sections with light backgrounds (white, light gray, orange) where nav text should be dark for contrast.
 */
const LIGHT_SECTIONS: Record<string, string[]> = {
  '/': [
    '#home',
    '#video-design',
    '#services-thumbnails',
    '#about',
    '#team',
    '#client-reviews',
    '#our-clients',
    '#get-quote',
  ],
  '/portfolio': [
    '#portfolio-hero',
    '#graphic-designs',
    '#portfolio-thumbnails',
    '#video-designs',
  ],
};

/** Sections with dark backgrounds (black) where nav text should be light for contrast. */
const DARK_SECTIONS: Record<string, string[]> = {
  '/': ['#graphic-design', '#services', '#stats', 'footer'],
  '/portfolio': ['#video-design', '#instagram-reels', 'footer'],
};

const NAV_TOP_OFFSET = 120;

/**
 * Detects whether the section under the navbar has a light or dark background.
 * Returns true when nav should use dark text (black) for contrast on light backgrounds.
 */
export function useNavTheme(): boolean {
  const [isLightBg, setIsLightBg] = useState(false);
  const location = useLocation();
  const lightSections = LIGHT_SECTIONS[location.pathname] ?? LIGHT_SECTIONS['/'];
  const darkSections = DARK_SECTIONS[location.pathname] ?? DARK_SECTIONS['/'];

  const checkSection = useCallback(() => {
    const viewportTop = window.scrollY + NAV_TOP_OFFSET;

    for (const selector of lightSections) {
      const el = document.querySelector(selector);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;

      if (viewportTop >= sectionTop && viewportTop <= sectionBottom) {
        setIsLightBg(true);
        return;
      }
    }

    for (const selector of darkSections) {
      const el = document.querySelector(selector);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;

      if (viewportTop >= sectionTop && viewportTop <= sectionBottom) {
        setIsLightBg(false);
        return;
      }
    }

    // Fallback: above first section (e.g. hero) — Home page hero is orange (light text), Portfolio hero is white (dark text)
    if (location.pathname === '/portfolio') {
      setIsLightBg(true);
    } else {
      setIsLightBg(false);
    }
  }, [location.pathname, lightSections, darkSections]);

  useEffect(() => {
    checkSection();
    const handleScroll = () => {
      requestAnimationFrame(checkSection);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [checkSection]);

  return isLightBg;
}
