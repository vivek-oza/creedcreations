import React from 'react';
import { NAVIGATION } from '../utils/constants';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavigationProps {
  className?: string;
  onContactClick?: () => void;
  isLightBg?: boolean;
}

/**
 * Navigation Component
 * Glassmorphism design positioned at top-right
 * Clean alignment with Home, Portfolio, Services, About Us, Contact Us
 * Active state updates on scroll
 */
const Navigation: React.FC<NavigationProps> = ({ className = '', onContactClick, isLightBg = false }) => {
  const activeTab = useActiveSection();
  const navigationItems = NAVIGATION;

  const handleTabClick = (label: string, href: string) => {
    if (label === 'Contact Us' && onContactClick) {
      onContactClick();
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 ${className}`}>
      {/* Glassmorphism Container */}
      <div className="relative">
        {/* Background with glassmorphism effect */}
        <div 
          className="absolute inset-0 rounded-2xl transition-all duration-300"
          style={{
            background: isLightBg ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isLightBg ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: isLightBg ? '0 8px 32px rgba(0, 0, 0, 0.08)' : '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        />
        
        {/* Navigation Content */}
        <div className="relative px-4 py-2 sm:px-6 sm:py-3">
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Navigation Items */}
            <ul className="flex items-center space-x-3 sm:space-x-6">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleTabClick(item.label, item.href)}
                    className={`
                      relative px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium 
                      transition-all duration-300 ease-out focus:outline-none whitespace-nowrap
                      ${isLightBg
                        ? activeTab === item.label
                          ? 'text-black hover:text-black'
                          : 'text-black/70 hover:text-black'
                        : activeTab === item.label
                          ? 'text-white hover:text-white focus:text-white'
                          : 'text-gray-300 hover:text-gray-100'
                      }
                    `}
                  >
                    {/* Active indicator line */}
                    {activeTab === item.label && (
                      <span 
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isLightBg ? 'bg-black' : 'bg-white'}`}
                        style={{
                          boxShadow: isLightBg ? '0 0 8px rgba(0, 0, 0, 0.2)' : '0 0 8px rgba(255, 255, 255, 0.6)',
                        }}
                      />
                    )}
                    
                    {/* Text */}
                    <span className="relative z-10 font-archivo tracking-wide">
                      {item.label}
                    </span>
                    
                    {/* Hover effect background */}
                    <span 
                      className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: isLightBg ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                      }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;