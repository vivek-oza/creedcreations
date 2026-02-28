import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  className?: string;
  onClick?: () => void;
  isLightBg?: boolean;
  isCompact?: boolean;
}

/**
 * Logo Component
 * Clean client logo positioned at top-left
 * Company icon acts as home link — navigates to home/hero
 */
const Logo: React.FC<LogoProps> = ({ className = '', onClick, isLightBg = false, isCompact = false }) => {
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const heroSection = document.getElementById('home');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    onClick?.();
  };

  return (
    <div
      className={`fixed top-4 left-4 sm:top-6 sm:left-6 z-50 transition-all duration-300 ${className} ${isCompact ? 'scale-90 sm:scale-[0.85] origin-top-left' : ''}`}
      data-cursor-context={isLightBg ? 'light' : 'dark'}
    >
      <Link
        to="/"
        onClick={handleLogoClick}
        className={`group relative block min-w-[44px] min-h-[44px] transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-30 rounded-2xl ${isLightBg ? 'focus:ring-black' : 'focus:ring-white'}`}
        aria-label="Go to homepage"
      >
        <img
          src="/newlogo.png"
          alt="CREED CREATIONS"
          className={`object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-lg ${isCompact ? 'w-16 h-16 sm:w-20 sm:h-22' : 'w-20 h-20 sm:w-24 sm:h-26'}`}
          style={{
            filter: isLightBg ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))' : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
          }}
        />
      </Link>
    </div>
  );
};

export default Logo;
