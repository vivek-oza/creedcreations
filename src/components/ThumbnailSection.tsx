import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { titleAnim, descAnim } from '../utils/scrollAnimations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 20 YouTube thumbnails from public/thumbnails/ (thumbnail1–12 .png, thumbnail13–20 .jpeg)
const THUMBNAILS = [
  { src: '/thumbnails/thumbnail1.png', title: 'Brand Identity', description: 'Visual identity that defines your business.' },
  { src: '/thumbnails/thumbnail2.png', title: 'Logo Design', description: 'Memorable logos that stand the test of time.' },
  { src: '/thumbnails/thumbnail3.png', title: 'Graphic Design', description: 'Striking visuals that capture attention.' },
  { src: '/thumbnails/thumbnail4.png', title: 'Video Production', description: 'Cinematic storytelling for your brand.' },
  { src: '/thumbnails/thumbnail5.png', title: 'Motion Graphics', description: 'Dynamic animations that engage viewers.' },
  { src: '/thumbnails/thumbnail6.png', title: 'Social Media', description: 'Scroll-stopping content for your channels.' },
  { src: '/thumbnails/thumbnail7.png', title: 'Marketing Materials', description: 'Professional assets that drive results.' },
  { src: '/thumbnails/thumbnail8.png', title: 'Web & UI/UX', description: 'Digital experiences that convert.' },
  { src: '/thumbnails/thumbnail9.png', title: 'YouTube Thumbnails', description: 'Click-worthy thumbnails that boost engagement.' },
  { src: '/thumbnails/thumbnail10.png', title: 'Reel Previews', description: 'Eye-catching previews for reels and shorts.' },
  { src: '/thumbnails/thumbnail11.png', title: 'Content Strategy', description: 'Visual content that aligns with your strategy.' },
  { src: '/thumbnails/thumbnail12.png', title: 'Creative Campaigns', description: 'Campaign visuals that connect and convert.' },
  { src: '/thumbnails/thumbnail13.jpeg', title: 'Thumbnail Design', description: 'Professional thumbnails for YouTube and social.' },
  { src: '/thumbnails/thumbnail14.jpeg', title: 'Video Covers', description: 'Striking covers that draw viewers in.' },
  { src: '/thumbnails/thumbnail15.jpeg', title: 'Digital Assets', description: 'High-impact digital visuals for your brand.' },
  { src: '/thumbnails/thumbnail16.jpeg', title: 'Social Covers', description: 'Scroll-stopping covers for social feeds.' },
  { src: '/thumbnails/thumbnail17.jpeg', title: 'Channel Art', description: 'Channel branding that builds recognition.' },
  { src: '/thumbnails/thumbnail18.jpeg', title: 'Visual Storytelling', description: 'Thumbnails that tell a story at a glance.' },
  { src: '/thumbnails/thumbnail19.jpeg', title: 'Creative Thumbnails', description: 'Bold, memorable thumbnails for your content.' },
  { src: '/thumbnails/thumbnail20.jpeg', title: 'Design Showcase', description: 'Our best thumbnail work in one place.' },
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
        isPortfolio ? 'bg-white py-12 sm:py-16 md:py-20' : 'min-h-screen min-h-[100dvh] bg-neon-orange'
      }`}
    >
      {/* Section header — portfolio only */}
      {isPortfolio && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-8"
        >
          <motion.h2
            {...titleAnim}
            className="text-black text-2xl xs:text-3xl sm:text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl tracking-tight uppercase mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            THUMBNAIL DESIGNS
          </motion.h2>
          <motion.p
            {...descAnim}
            className="text-black/60 text-fluid-base sm:text-fluid-lg max-w-2xl"
          >
            A curated showcase of our thumbnail designs for YouTube, reels, and social media — click through to explore each project.
          </motion.p>
        </motion.div>
      )}

      {/* Image area */}
      <div className={isPortfolio ? 'relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12' : 'absolute inset-0'}>
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
                width={1920}
                height={1080}
                loading="lazy"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8">
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
                className="text-black text-fluid-2xl sm:text-fluid-3xl md:text-fluid-4xl tracking-tight uppercase"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                {current.title}
              </h2>
                  <p className="text-black/70 text-fluid-base sm:text-fluid-lg max-w-2xl">
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
          <div className="relative z-10 flex min-h-screen min-h-[100dvh] flex-col items-center justify-end px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24 lg:pb-32" style={{ paddingBottom: 'max(4rem, env(safe-area-inset-bottom) + 4rem)' }}>
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
                    className="text-white text-fluid-2xl sm:text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl tracking-tight uppercase"
                    style={{ fontFamily: "'Archivo Black', sans-serif" }}
                  >
                    {current.title}
                  </h2>
                  <p className="text-white/90 text-fluid-base sm:text-fluid-lg md:text-fluid-xl max-w-2xl">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2" style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom) + 1rem)' }}>
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
