import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Navigation, Logo, Footer, VideoSection, ThumbnailSection } from '../components';
import { useNavTheme } from '../hooks/useNavTheme';
import { useIsHeroInView } from '../hooks/useIsHeroInView';
import ContactModal from '../components/ContactModal';
import { SmoothCursor } from '../components/ui/smooth-cursor';
import { POSTERS } from '../data/posters';
import { Iphone } from '../components/ui/iphone';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { DraggableCardBody, DraggableCardContainer } from '../components/ui/draggable-card';

const HERO_TITLE = 'MY BEST WORK';

const INSTAGRAM_REELS = [
  { id: 'DRADg0GDCO9', title: 'Creative Motion', desc: 'Design in motion.' },
  { id: 'DQzakcgDI3R', title: 'Brand Story', desc: 'Storytelling through visuals.' },
  { id: 'DMNR_D1Rq2d', title: 'Visual Rhythm', desc: 'Flow and motion.' },
  { id: 'DRrCmGeDNda', title: 'Bold Typography', desc: 'Type meets motion.' },
  { id: 'DLxXMjSRqvb', title: 'Cinematic', desc: 'Short-form design.' },
  { id: 'DFQMrelvw5a', title: 'Design in Motion', desc: 'Moving visuals.' },
];

const VIDEO_SHORTS = [
  { id: '5_MQhfa0VwU' },
  { id: 'C-T-lGUTiP4' },
  { id: '7kZ6FWlx738' },
  { id: 'eR3pJXY8Cdw' },
  { id: 'KCfUg4vQbk4' },
  { id: 'zF4u7Wm3F_I' },
];

/**
 * Portfolio Page
 * Hero with text covering full area, Graphic Design sections with bento, marquee, grids
 */
const REEL_AUTO_ADVANCE_MS = 24000; // Auto-scroll after ~24s (typical reel length)

const PortfolioPage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const isLightBg = useNavTheme();
  const isHeroInView = useIsHeroInView();
  const isCompact = !isHeroInView;
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isReelsSectionInView, setIsReelsSectionInView] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const reelsScrollRef = useRef<HTMLDivElement>(null);
  const reelsSectionRef = useRef<HTMLElement>(null);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleReelsScroll = useCallback(() => {
    const el = reelsScrollRef.current;
    if (!el) return;
    const reelHeight = el.clientHeight;
    if (reelHeight <= 0) return;
    const idx = Math.round(el.scrollTop / reelHeight);
    const clamped = Math.min(Math.max(idx, 0), INSTAGRAM_REELS.length - 1);
    setActiveReelIndex((prev) => (prev === clamped ? prev : clamped));
  }, []);

  useEffect(() => {
    const el = reelsScrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(handleReelsScroll);
    ro.observe(el);
    return () => ro.disconnect();
  }, [handleReelsScroll]);

  useEffect(() => {
    const section = reelsSectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsReelsSectionInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isReelsSectionInView) {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
      return;
    }
    const scheduleNext = () => {
      autoAdvanceTimerRef.current = setTimeout(() => {
        const el = reelsScrollRef.current;
        if (!el) return;
        const reelHeight = el.clientHeight;
        const next = Math.min(activeReelIndex + 1, INSTAGRAM_REELS.length - 1);
        if (next > activeReelIndex) {
          el.scrollTo({ top: next * reelHeight, behavior: 'smooth' });
        } else {
          el.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, REEL_AUTO_ADVANCE_MS);
    };
    scheduleNext();
    return () => {
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    };
  }, [isReelsSectionInView, activeReelIndex]);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-white">
      <SmoothCursor isLightBg={isLightBg} />
      <Logo isLightBg={isLightBg} isCompact={isCompact} />
      <Navigation isLightBg={isLightBg} isCompact={isCompact} onContactClick={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <motion.section
        id="portfolio-hero"
        ref={heroRef}
        style={{ y, opacity, scale }}
        className="relative flex min-h-[85vh] sm:min-h-[90vh] items-center justify-center overflow-hidden bg-white pt-24 sm:pt-28"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-black uppercase overflow-hidden sm:whitespace-nowrap min-w-0"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            {HERO_TITLE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-black/50 max-w-xl"
          >
            A curated collection of graphic design and video work — brands, campaigns, and visuals
            that define our studio.
          </motion.p>
        </div>
      </motion.section>

      {/* GRAPHIC DESIGNS — Main section with multiple sub-sections */}
      <section id="graphic-designs" className="bg-white">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-8"
        >
          <h2
            className="text-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            GRAPHIC DESIGNS
          </h2>
          <p className="text-black/60 text-base sm:text-lg max-w-2xl">
            Posters, campaigns, and visual identity work by CREED CREATIONS studio.
          </p>
        </motion.div>

        {/* 1. Marquee cards strip — like home page (two rows, opposite directions) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="py-12 sm:py-16 overflow-hidden"
        >
          <div className="bg-black py-12 sm:py-16 overflow-hidden">
            <div className="mb-8 overflow-hidden">
              <div
                className="flex gap-6 w-max"
                style={{ animation: 'marquee 45s linear infinite' }}
              >
                {POSTERS.map((poster, idx) => (
                  <div
                    key={`m1-${idx}`}
                    className="shrink-0 w-[272px] sm:w-[304px] md:w-[320px]"
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={poster.image}
                          alt={poster.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-white font-semibold text-sm">{poster.title}</p>
                        <p className="text-white/60 text-xs mt-1">{poster.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {POSTERS.map((poster, idx) => (
                  <div
                    key={`m1dup-${idx}`}
                    className="shrink-0 w-[272px] sm:w-[304px] md:w-[320px]"
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={poster.image}
                          alt={poster.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-white font-semibold text-sm">{poster.title}</p>
                        <p className="text-white/60 text-xs mt-1">{poster.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className="flex gap-6 w-max"
                style={{ animation: 'marquee-reverse 55s linear infinite' }}
              >
                {[...POSTERS].reverse().map((poster, idx) => (
                  <div
                    key={`m2-${idx}`}
                    className="shrink-0 w-[272px] sm:w-[304px] md:w-[320px]"
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={poster.image}
                          alt={poster.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-white font-semibold text-sm">{poster.title}</p>
                        <p className="text-white/60 text-xs mt-1">{poster.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {[...POSTERS].reverse().map((poster, idx) => (
                  <div
                    key={`m2dup-${idx}`}
                    className="shrink-0 w-[272px] sm:w-[304px] md:w-[320px]"
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={poster.image}
                          alt={poster.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-white font-semibold text-sm">{poster.title}</p>
                        <p className="text-white/60 text-xs mt-1">{poster.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Staggered grid — tightly packed, no white space */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16"
        >
          <h3 className="text-black/40 text-sm font-semibold uppercase tracking-widest mb-2">
            Grid Showcase
          </h3>
          <p className="text-black/50 text-sm max-w-xl mb-6">
            Posters and campaigns across music, fashion, automotive, and lifestyle — each crafted
            with bold typography and a distinct visual language.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-2">
            {POSTERS.map((poster, idx) => (
              <motion.div
                key={poster.image}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-lg border border-black/5 bg-white aspect-[3/4]"
              >
                <img
                  src={poster.image}
                  alt={poster.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold text-sm sm:text-base">{poster.title}</p>
                  <p className="text-white/80 text-xs sm:text-sm">{poster.subtitle}</p>
                  <p className="text-white/70 text-xs mt-1 line-clamp-2 hidden sm:block">
                    {poster.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Thumbnail Display Section — full-screen carousel, description below, no overlay */}
      <ThumbnailSection variant="portfolio" />

      {/* Interactive Cards Section — black bg, draggable 3D cards with company logos */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-black py-16 sm:py-20 md:py-24 overflow-visible"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 overflow-visible">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            EXPERIENCE OUR WORK
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/90 text-base sm:text-lg max-w-2xl mb-12 sm:mb-16"
          >
            Drag and tilt these cards to explore our creative process — bold design meets interactive experience.
          </motion.p>
          <DraggableCardContainer className="flex flex-wrap justify-center gap-2 sm:gap-3 -m-1 overflow-visible">
            {[
              { src: '/clients/CLIENT-1.jpeg', title: 'Client 1' },
              { src: '/clients/CLIENT-2.jpeg', title: 'Client 2' },
              { src: '/clients/CLIENT-3.jpeg', title: 'Client 3' },
              { src: '/clients/CLIENT-4.jpeg', title: 'Client 4' },
              { src: '/clients/CLIENT-5.jpeg', title: 'Client 5' },
              { src: '/clients/CLIENT-6.jpeg', title: 'Client 6' },
            ].map((item) => (
              <DraggableCardBody
                key={item.src}
                className="!min-h-56 !w-48 sm:!min-h-64 sm:!w-56 !bg-black !border-white/20 !p-0 overflow-hidden shrink-0"
              >
                <div className="relative w-full h-full aspect-square flex items-center justify-center p-4">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-contain pointer-events-none select-none"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>
      </motion.section>

      {/* Video Section — same as home page */}
      <VideoSection
        title="VIDEO DESIGN"
        description="A showcase of our creative work — click to play and experience the vision we bring to every project."
        videoSrc="/videos/video3.mp4"
      />

      {/* Section: VIDEO DESIGNS — YouTube Shorts */}
      <motion.section
        id="video-designs"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white py-16 sm:py-20 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            VIDEO DESIGNS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-black/60 text-base sm:text-lg max-w-2xl mb-12 sm:mb-16"
          >
            YouTube Shorts — bite-sized video design work.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {VIDEO_SHORTS.map((video, idx) => (
              <motion.article
                key={video.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto overflow-hidden rounded-xl border border-black/10 bg-black/5 shadow-lg shadow-black/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/10 aspect-[9/16]">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title="YouTube Short"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                  <a
                    href={`https://youtube.com/shorts/${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
                    aria-label="Watch on YouTube"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section: INSTAGRAM REELS — hidden for now */}
      <motion.section
        ref={reelsSectionRef}
        id="instagram-reels"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hidden bg-black py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-0">
            {/* Left: text that changes with reel — scroll-based */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                className="text-white text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase mb-6"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                INSTAGRAM REELS
              </h2>
              <p className="text-white/70 text-base sm:text-lg max-w-xl mb-10">
                Scroll inside the phone — swipe through our reel designs, just like Instagram.
              </p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeReelIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="border-l-2 border-neon-orange pl-6"
                >
                  <p className="text-neon-orange text-sm font-semibold uppercase tracking-widest mb-2">
                    Now viewing
                  </p>
                  <h3
                    className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2"
                    style={{ fontFamily: "'Archivo Black', sans-serif" }}
                  >
                    {INSTAGRAM_REELS[activeReelIndex].title}
                  </h3>
                  <p className="text-white/60 text-base sm:text-lg">
                    {INSTAGRAM_REELS[activeReelIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <p className="text-white/40 text-sm mt-6">
                {activeReelIndex + 1} of {INSTAGRAM_REELS.length}
              </p>
            </motion.div>

            {/* Right: iPhone with scrollable reels — real Instagram UI */}
            <motion.div
              className="order-1 lg:order-2 flex justify-center lg:justify-end items-center"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] max-w-[90vw]">
                <Iphone bodyColor="#FFFFFF" dynamicIslandColor="#000000">
                  <div
                    ref={reelsScrollRef}
                    onScroll={handleReelsScroll}
                    className="reels-scroll-hide absolute inset-0 flex flex-col gap-0 bg-black overflow-y-auto overflow-x-hidden overscroll-contain snap-y snap-mandatory scroll-smooth"
                    style={{
                      touchAction: 'pan-y',
                      WebkitOverflowScrolling: 'touch',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    } as React.CSSProperties}
                  >
                    {INSTAGRAM_REELS.map((reel) => (
                      <div
                        key={reel.id}
                        className="relative shrink-0 w-full snap-start snap-always overflow-hidden bg-black p-0 m-0"
                        style={{ flex: '0 0 100%', minHeight: 0 }}
                      >
                        {isReelsSectionInView && (
                          <>
                            <iframe
                              src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                              title="Instagram Reel"
                              className="absolute inset-0 w-full h-full border-0 block"
                              style={{
                                transform: 'scale(1.06)',
                                transformOrigin: 'center center',
                              }}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                            <div
                              className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-4 pointer-events-none z-10"
                              aria-hidden
                            >
                              <Heart className="w-5 h-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" strokeWidth={2} />
                              <MessageCircle className="w-5 h-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" strokeWidth={2} />
                              <Share2 className="w-5 h-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" strokeWidth={2} />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </Iphone>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8 sm:pb-10">
        <Link
          to="/"
          className="inline-flex items-center text-black font-medium hover:text-neon-orange transition-colors duration-300"
        >
          ← Back to Home
        </Link>
      </div>
      <Footer onContactClick={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default PortfolioPage;
