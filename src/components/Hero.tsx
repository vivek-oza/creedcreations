import React from 'react';
import { useVanta } from '../hooks/useVanta';
import { FlipWords } from './ui/flip-words';
// RainbowButton hidden for now — will be re-enabled later
// import { RainbowButton } from './ui/rainbow-button';

/**
 * Hero Section Component
 * Features Vanta.js waves background with personal introduction
 * Left-aligned text layout with space reserved for image on right
 * Includes animated text generation effect and personal branding
 */
const Hero: React.FC = () => {
  const vantaRef = useVanta();

  return (
    <section id="home" className="relative min-h-screen min-h-[100dvh] w-full overflow-hidden bg-neon-orange">
      {/* Vanta.js Waves Background */}
      <div
        ref={vantaRef}
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Content Overlay - safe-area for notch, tighter mobile spacing */}
      <div
        className="relative z-10 flex min-h-screen min-h-[100dvh] items-center px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-28 md:pt-32 pb-6 sm:pb-8"
        style={{ paddingTop: 'max(5.5rem, env(safe-area-inset-top) + 4.5rem)' }}
      >
        <div className="w-full max-w-7xl mx-auto min-w-0">
          <div className="grid grid-cols-1 items-center min-w-0">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8 min-w-0">
              {/* Agency Name */}
              <h2
                className="text-2xl xs:text-3xl sm:text-fluid-5xl md:text-fluid-6xl lg:text-fluid-7xl text-white uppercase leading-[1.1] tracking-tight break-words"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                CREED CREATIONS
              </h2>

              {/* Main Headline with Flip Words */}
              <h1 className="font-heading text-white leading-tight text-lg xs:text-xl sm:text-fluid-2xl md:text-fluid-3xl lg:text-fluid-4xl font-bold tracking-tight italic min-w-0">
                <span className="block">
                  We develop{" "}
                  <FlipWords
                    words={["visual identity", "design language", "brand presence"]}
                    duration={3000}
                    className="text-white"
                  />
                </span>
                <span className="block">of your business</span>
              </h1>

              {/* CTA Button - Hidden for now */}
              {/* <div className="pt-4">
                <RainbowButton size="lg">
                  Book a call
                </RainbowButton>
              </div> */}
            </div>

          </div>
        </div>
      </div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-5" />
    </section>
  );
};

export default Hero;