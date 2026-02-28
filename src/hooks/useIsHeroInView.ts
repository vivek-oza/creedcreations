import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/** Hero section selectors per route */
const HERO_SELECTORS: Record<string, string> = {
  '/': '#home',
  '/portfolio': '#portfolio-hero',
};

/**
 * Returns true when the hero section is prominently in view (top of viewport).
 * Used to show full-size logo/nav; when false, show compact size for more screen space.
 */
export function useIsHeroInView(): boolean {
  const [isHeroInView, setIsHeroInView] = useState(true);
  const location = useLocation();
  const path = location.pathname;
  const heroSelector = HERO_SELECTORS[path] ?? HERO_SELECTORS['/'];

  const check = useCallback(() => {
    const el = document.querySelector(heroSelector);
    if (!el) {
      setIsHeroInView(false);
      return;
    }
    const rect = el.getBoundingClientRect();
    // Hero is "in view" when its bottom is above ~40% of viewport (hero still prominent)
    const threshold = window.innerHeight * 0.4;
    setIsHeroInView(rect.bottom > threshold);
  }, [heroSelector]);

  useEffect(() => {
    check();
    const handleScroll = () => requestAnimationFrame(check);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [check]);

  return isHeroInView;
}
