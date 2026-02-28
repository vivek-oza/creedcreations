import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NAVIGATION } from '../utils/constants';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavigationProps {
  className?: string;
  onContactClick?: () => void;
  isLightBg?: boolean;
  isCompact?: boolean;
}

/**
 * Navigation Component
 * Glassmorphism design — responsive with hamburger on mobile
 * Touch targets ≥44px for accessibility
 * Services/About Us navigate to home when on Portfolio
 */
const Navigation: React.FC<NavigationProps> = ({ className = '', onContactClick, isLightBg = false, isCompact = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeTab = useActiveSection();
  const navigationItems = NAVIGATION;
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (label: string, href: string) => {
    setMobileOpen(false);
    if (label === 'Contact Us' && onContactClick) {
      onContactClick();
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: href.replace('#', '') });
    }
  };

  useEffect(() => {
    const handler = () => setMobileOpen(false);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const linkClass = (isActive: boolean) =>
    `relative block py-3 sm:py-2 px-4 sm:px-2 min-h-[44px] sm:min-h-0 min-w-[44px] sm:min-w-0 flex items-center font-medium transition-all duration-300 ease-out focus:outline-none whitespace-nowrap
    ${isCompact ? 'text-[11px] sm:text-xs' : 'text-xs sm:text-sm'}
    ${isLightBg
      ? isActive ? 'text-black hover:text-black' : 'text-black/75 hover:text-black'
      : isActive ? 'text-white hover:text-white focus:text-white' : 'text-white/80 hover:text-white'
    }`;

  const navContent = (
    <ul className={`flex flex-col sm:flex-row sm:items-center ${isCompact ? 'sm:space-x-2 md:space-x-4' : 'sm:space-x-3 md:space-x-6'} gap-0 sm:gap-0`}>
      {navigationItems.map((item) => {
        const hasRoute = 'to' in item && item.to;
        const isActive = activeTab === item.label;
        return (
          <li key={item.label}>
            {hasRoute ? (
              <Link
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={linkClass(isActive)}
              >
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full hidden sm:block ${isLightBg ? 'bg-black' : 'bg-white'}`}
                    style={{ boxShadow: isLightBg ? '0 0 8px rgba(0,0,0,0.15)' : '0 0 8px rgba(255,255,255,0.5)' }}
                  />
                )}
                <span className="relative z-10 font-archivo tracking-wide">{item.label}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleTabClick(item.label, item.href)}
                className={linkClass(isActive) + ' w-full sm:w-auto text-left sm:text-center'}
              >
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full hidden sm:block ${isLightBg ? 'bg-black' : 'bg-white'}`}
                    style={{ boxShadow: isLightBg ? '0 0 8px rgba(0,0,0,0.15)' : '0 0 8px rgba(255,255,255,0.5)' }}
                  />
                )}
                <span className="relative z-10 font-archivo tracking-wide">{item.label}</span>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <nav
        className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 transition-all duration-300 ${className} ${isCompact ? 'scale-90 sm:scale-[0.9] origin-top-right' : ''}`}
        data-cursor-context={isLightBg ? 'light' : 'dark'}
      >
        <div className="relative">
          <div
            className="absolute inset-0 rounded-2xl transition-all duration-300 sm:block"
            style={{
              background: isLightBg ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: isLightBg ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: isLightBg ? '0 8px 32px rgba(0, 0, 0, 0.08)' : '0 8px 32px rgba(0, 0, 0, 0.25)',
            }}
          />
          <div className={`relative transition-all duration-300 ${isCompact ? 'px-3 py-1.5 sm:px-5 sm:py-2' : 'px-4 py-2 sm:px-6 sm:py-3'}`}>
            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="sm:hidden flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl -m-2"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">{mobileOpen ? 'Close' : 'Menu'}</span>
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block w-6 h-0.5 rounded-full transition-all ${isLightBg ? 'bg-black' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <span
                  className={`block w-6 h-0.5 rounded-full transition-all ${isLightBg ? 'bg-black' : 'bg-white'} ${mobileOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`block w-6 h-0.5 rounded-full transition-all ${isLightBg ? 'bg-black' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </div>
            </button>
            {/* Desktop nav — hidden on mobile when using hamburger */}
            <div className="hidden sm:block">{navContent}</div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 sm:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-label="Close menu"
        />
        <div
          className={`absolute top-20 right-4 left-4 rounded-2xl p-4 transition-transform duration-300 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
          style={{
            background: isLightBg ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            border: isLightBg ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {navContent}
        </div>
      </div>
    </>
  );
};

export default Navigation;
