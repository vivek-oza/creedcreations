import { useState, useEffect, useCallback } from 'react';
import { NAVIGATION } from '../utils/constants';

/**
 * Detects which section is currently in view and returns the active nav label.
 */
export function useActiveSection(): string {
  const [activeLabel, setActiveLabel] = useState<string>('Home');
  const OFFSET = 150;

  const checkSection = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    let currentLabel = 'Home';

    if (scrollY >= docHeight - 200) {
      setActiveLabel('Contact Us');
      return;
    }

    for (let i = NAVIGATION.length - 1; i >= 0; i--) {
      const item = NAVIGATION[i];
      const selector = item.href;
      const el = document.querySelector(selector);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + scrollY - OFFSET;

      if (scrollY >= sectionTop) {
        currentLabel = item.label;
        break;
      }
    }

    setActiveLabel(currentLabel);
  }, []);

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
