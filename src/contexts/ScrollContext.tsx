import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';

/** Section-to-nav-label mapping per route */
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

const DARK_SECTIONS: Record<string, string[]> = {
  '/': ['#graphic-design', '#services', '#stats', 'footer'],
  '/portfolio': ['#video-design', '#instagram-reels', 'footer'],
};

const HERO_SELECTORS: Record<string, string> = {
  '/': '#home',
  '/portfolio': '#portfolio-hero',
};

const NAV_TOP_OFFSET = 120;
const HERO_THRESHOLD_RATIO = 0.4;

interface ScrollState {
  activeLabel: string;
  isLightBg: boolean;
  isHeroInView: boolean;
}

const defaultState: ScrollState = {
  activeLabel: 'Home',
  isLightBg: false,
  isHeroInView: true,
};

const ScrollContext = createContext<ScrollState>(defaultState);

/**
 * Single scroll listener that computes activeLabel, isLightBg, isHeroInView.
 * Replaces three separate hooks (useActiveSection, useNavTheme, useIsHeroInView)
 * to reduce scroll-handling work and improve performance.
 */
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ScrollState>(defaultState);
  const location = useLocation();
  const path = location.pathname;

  const check = useCallback(() => {
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    const viewportTop = window.scrollY + NAV_TOP_OFFSET;
    const heroThreshold = window.innerHeight * HERO_THRESHOLD_RATIO;

    const config = SECTION_CONFIG[path] ?? SECTION_CONFIG['/'];
    const lightSections = LIGHT_SECTIONS[path] ?? LIGHT_SECTIONS['/'];
    const darkSections = DARK_SECTIONS[path] ?? DARK_SECTIONS['/'];
    const heroSelector = HERO_SELECTORS[path] ?? HERO_SELECTORS['/'];

    let activeLabel = config[0]?.label ?? 'Home';
    for (let i = 0; i < config.length; i++) {
      const { selector, label } = config[i];
      const el = document.querySelector(selector);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;
      if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
        activeLabel = label;
        break;
      }
    }

    let isLightBg: boolean;
    let found = false;
    for (const selector of lightSections) {
      const el = document.querySelector(selector);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;
      if (viewportTop >= sectionTop && viewportTop <= sectionBottom) {
        isLightBg = true;
        found = true;
        break;
      }
    }
    if (!found) {
      for (const selector of darkSections) {
        const el = document.querySelector(selector);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        if (viewportTop >= sectionTop && viewportTop <= sectionBottom) {
          isLightBg = false;
          found = true;
          break;
        }
      }
    }
    if (!found) {
      isLightBg = path === '/portfolio';
    }

    let isHeroInView = true;
    const heroEl = document.querySelector(heroSelector);
    if (heroEl) {
      const rect = heroEl.getBoundingClientRect();
      isHeroInView = rect.bottom > heroThreshold;
    } else {
      isHeroInView = false;
    }

    setState((prev) => {
      if (
        prev.activeLabel === activeLabel &&
        prev.isLightBg === isLightBg &&
        prev.isHeroInView === isHeroInView
      ) {
        return prev;
      }
      return { activeLabel, isLightBg, isHeroInView };
    });
  }, [path]);

  useEffect(() => {
    check();
    const handleScroll = () => requestAnimationFrame(check);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [check]);

  const value = useMemo(
    () => ({
      activeLabel: state.activeLabel,
      isLightBg: state.isLightBg,
      isHeroInView: state.isHeroInView,
    }),
    [state.activeLabel, state.isLightBg, state.isHeroInView]
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useScrollContext(): ScrollState {
  return useContext(ScrollContext);
}
