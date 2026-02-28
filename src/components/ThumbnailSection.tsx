import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const THUMBNAILS = [
  { src: '/thumbnails/thumbnail1.jpeg', title: 'Brand Identity', description: 'Visual identity that defines your business.' },
  { src: '/thumbnails/thumbnail2.jpeg', title: 'Logo Design', description: 'Memorable logos that stand the test of time.' },
  { src: '/thumbnails/thumbnail3.jpeg', title: 'Graphic Design', description: 'Striking visuals that capture attention.' },
  { src: '/thumbnails/thumbnail4.jpeg', title: 'Video Production', description: 'Cinematic storytelling for your brand.' },
  { src: '/thumbnails/thumbnail5.jpeg', title: 'Motion Graphics', description: 'Dynamic animations that engage viewers.' },
  { src: '/thumbnails/thumbnail6.jpeg', title: 'Social Media', description: 'Scroll-stopping content for your channels.' },
  { src: '/thumbnails/thumbnail7.jpeg', title: 'Marketing Materials', description: 'Professional assets that drive results.' },
  { src: '/thumbnails/thumbnail8.jpeg', title: 'Web & UI/UX', description: 'Digital experiences that convert.' },
];

const AUTO_ADVANCE_MS = 3000;

interface ThumbnailSectionProps {
  variant?: 'home' | 'portfolio';
}

const ThumbnailSection: React.FC<ThumbnailSectionProps> = ({ variant = 'home' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + THUMBNAILS.length) % THUMBNAILS.length);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % THUMBNAILS.length);
  }, []);

  useEffect(() => {
    const timer = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [goNext, activeIndex]);

  const current = THUMBNAILS[activeIndex];
  const isPortfolio = variant === 'portfolio';

  return (
    <section
      id={isPortfolio ? 'portfolio-thumbnails' : 'services-thumbnails'}
      className={`relative w-full overflow-hidden ${
        isPortfolio ? 'bg-white py-16 sm:py-20' : 'min-h-screen bg-neon-orange'
      }`}
    >
      {/* Section header — portfolio only */}
      {isPortfolio && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8"
        >
          <h2
            className="text-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            THUMBNAIL DESIGNS
          </h2>
          <p className="text-black/60 text-base sm:text-lg max-w-2xl">
            Best thumbnail design in Gandhinagar — a curated showcase of our design work for YouTube, reels, and social media. Browse through each project.
          </p>
        </motion.div>
      )}

      {/* Image area */}
      <div className={isPortfolio ? 'relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12' : 'absolute inset-0'}>
        <div className={isPortfolio ? 'relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-black/5' : 'absolute inset-0'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={isPortfolio ? 'absolute inset-0' : 'absolute inset-0'}
            >
              <img
                src={current.src}
                alt={current.title}
                className={`w-full h-full object-center ${
                  isPortfolio ? 'object-contain' : 'object-cover'
                }`}
              />
              {!isPortfolio && (
                <div
                  className="absolute inset-0 bg-gradient-to-t from-neon-orange via-neon-orange/60 to-neon-orange/20"
                  aria-hidden
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next buttons */}
        {isPortfolio ? (
          <div className="absolute left-6 sm:left-8 right-6 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous thumbnail"
              className="pointer-events-auto flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white/90 text-black backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-black/25"
            >
              <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next thumbnail"
              className="pointer-events-auto flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white/90 text-black backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-black/25"
            >
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
            </button>
          </div>
        ) : (
          <>
            <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-4 sm:pl-6">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous thumbnail"
                className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-neon-orange hover:border-white"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-4 sm:pr-6">
              <button
                type="button"
                onClick={goNext}
                aria-label="Next thumbnail"
                className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-neon-orange hover:border-white"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Content: overlay (home) or below (portfolio) */}
      {isPortfolio ? (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2"
            >
              <h2
                className="text-black text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                {current.title}
              </h2>
              <p className="text-black/70 text-base sm:text-lg max-w-2xl">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-2 mt-6">
            {THUMBNAILS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View thumbnail ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'w-8 bg-black' : 'w-2 bg-black/30 hover:bg-black/50'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-end px-6 sm:px-8 lg:px-12 pb-20 sm:pb-24 md:pb-32">
            <div className="max-w-7xl mx-auto w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3"
                >
                  <h2
                    className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase"
                    style={{ fontFamily: "'Archivo Black', sans-serif" }}
                  >
                    {current.title}
                  </h2>
                  <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute bottom-8 sm:bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {THUMBNAILS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View thumbnail ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ThumbnailSection;
