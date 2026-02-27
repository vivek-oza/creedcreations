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
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-neon-orange">
      {/* Vanta.js Waves Background */}
      <div
        ref={vantaRef}
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen items-center px-6 sm:px-8 lg:px-12 pt-28 sm:pt-32 md:pt-36">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Agency Name */}
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase leading-none tracking-tight"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                CREED CREATIONS
              </h2>

              {/* Main Headline with Flip Words - Two lines only */}
              <h1 className="font-heading text-white leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-3xl font-bold tracking-tight italic">
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