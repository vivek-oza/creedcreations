import React from 'react';
import { motion } from 'motion/react';
import PosterCard from './PosterCard';
import { POSTERS } from '../data/posters';
import { titleAnim, descAnim } from '../utils/scrollAnimations';

/**
 * PortfolioSection Component
 * Displays poster cards in a continuous marquee scroll.
 * Two rows scrolling in opposite directions for visual depth.
 */
const PortfolioSection: React.FC = () => {
  return (
    <section id="graphic-design" className="bg-black py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Section Header */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto mb-8 sm:mb-12">
        <motion.h2
          {...titleAnim}
          className="section-heading text-white text-xl xs:text-2xl sm:text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl tracking-tight uppercase mb-4 sm:mb-6"
        >
          GRAPHIC DESIGNS
        </motion.h2>
        <motion.p
          {...descAnim}
          className="text-white/90 text-fluid-base sm:text-fluid-lg mt-3 max-w-3xl leading-relaxed"
        >
          A collection of posters that define brands, tell stories, and break the mold — pulled from
          our favourite work in the posters gallery.
        </motion.p>
      </div>

      {/* Row 1 — Scrolls Left */}
      <div className="mb-8 overflow-hidden">
        <div
          className="flex gap-6 w-max"
          style={{ animation: 'marquee 40s linear infinite' }}
        >
          {POSTERS.map((poster, idx) => (
            <PosterCard key={`r1-${idx}`} {...poster} />
          ))}
          {POSTERS.map((poster, idx) => (
            <PosterCard key={`r1-dup-${idx}`} {...poster} />
          ))}
        </div>
      </div>

      {/* Row 2 — Scrolls Right */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 w-max"
          style={{ animation: 'marquee-reverse 45s linear infinite' }}
        >
          {[...POSTERS].reverse().map((poster, idx) => (
            <PosterCard key={`r2-${idx}`} {...poster} />
          ))}
          {[...POSTERS].reverse().map((poster, idx) => (
            <PosterCard key={`r2-dup-${idx}`} {...poster} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;