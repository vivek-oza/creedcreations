import React from 'react';

interface LogoProps {
  className?: string;
  onClick?: () => void;
  isLightBg?: boolean;
}

/**
 * Logo Component
 * Clean client logo positioned in top-left corner
 * Sized to match navigation bar height for visual balance
 * No borders or backgrounds - minimal design
 * Clickable to navigate to hero section with smooth scroll
 */
const Logo: React.FC<LogoProps> = ({ className = '', onClick, isLightBg = false }) => {
  const handleLogoClick = () => {
    // Scroll to hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Call optional onClick handler
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`fixed top-4 left-4 sm:top-6 sm:left-6 z-50 ${className}`}>
      <button
        onClick={handleLogoClick}
        className={`group relative transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-30 rounded-2xl ${isLightBg ? 'focus:ring-black' : 'focus:ring-white'}`}
        aria-label="Go to homepage"
      >
        {/* Logo Image - Clean Design */}
        <img
          src="/newlogo.png"
          alt="Client Logo"
          className="w-20 h-20 sm:w-24 sm:h-26 object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-lg"
          style={{
            filter: isLightBg ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))' : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
          }}
        />
      </button>
    </div>
  );
};

export default Logo;