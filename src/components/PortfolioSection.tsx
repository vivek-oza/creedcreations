import React from 'react';
import { motion } from 'motion/react';
import PosterCard from './PosterCard';
import { POSTERS } from '../data/posters';

/** Shared scroll animation settings */
const scrollAnim = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 } as const,
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const,
};

/**
 * PortfolioSection Component
 * Displays poster cards in a continuous marquee scroll.
 * Two rows scrolling in opposite directions for visual depth.
 */
const PortfolioSection: React.FC = () => {
  return (
    <section id="graphic-design" className="bg-black py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-12">
        <motion.h2
          {...scrollAnim}
          className="section-heading text-white text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase mb-6"
        >
          GRAPHIC DESIGNS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/90 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed"
        >
          A collection of posters that define brands, tell stories, and break the mold.
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