import { useState, useEffect, useCallback } from 'react';

/** Sections with light (white) backgrounds — nav/cursor use dark theme when over these */
const LIGHT_SECTION_SELECTORS = ['#client-reviews', '#get-quote'];

/**
 * Detects whether the user has scrolled into a section with a light (white) background.
 * Returns true when nav/cursor should use dark theme (black text, black cursor) for contrast.
 */
export function useNavTheme(): boolean {
  const [isLightBg, setIsLightBg] = useState(false);
  const NAV_TOP_OFFSET = 100; // px from top — area considered "under" the nav

  const checkSection = useCallback(() => {
    const viewportTop = window.scrollY + NAV_TOP_OFFSET;

    for (const selector of LIGHT_SECTION_SELECTORS) {
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

    setIsLightBg(false);
  }, []);

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
