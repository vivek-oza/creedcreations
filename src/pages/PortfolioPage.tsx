import React, { useState, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navigation, Logo, Footer, VideoSection, ThumbnailSection } from '../components';
import { useScrollContext } from '../contexts/ScrollContext';
import { SmoothCursor } from '../components/ui/smooth-cursor';
import { DraggableCardBody, DraggableCardContainer } from '../components/ui/draggable-card';
import MarqueePostCard from '../components/portfolio/MarqueePostCard';
import SafeImage from '../components/SafeImage';
import { POSTS } from '../data/posts';
import {
  HERO_TITLE,
  VIDEO_SHORTS,
  FEATURED_VIDEOS,
  INSTAGRAM_REELS,
  getReelPreview,
  DRAGGABLE_CLIENT_ITEMS,
} from '../data/portfolio';

const ContactModal = lazy(() => import('../components/ContactModal'));

const PortfolioPage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { isLightBg, isHeroInView } = useScrollContext();
  const isCompact = !isHeroInView;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full min-w-0">
      <SmoothCursor isLightBg={isLightBg} />
      <Logo isLightBg={isLightBg} isCompact={isCompact} />
      <Navigation isLightBg={isLightBg} isCompact={isCompact} onContactClick={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <motion.section
        id="portfolio-hero"
        ref={heroRef}
        style={{ y, opacity, scale, paddingTop: 'max(6rem, env(safe-area-inset-top) + 5rem)' }}
        className="relative flex min-h-[85vh] sm:min-h-[90vh] items-center justify-center overflow-hidden bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl xs:text-2xl sm:text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl xl:text-fluid-6xl font-black tracking-tighter text-black uppercase break-words min-w-0"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            {HERO_TITLE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-8 text-fluid-base sm:text-fluid-lg text-black/50 max-w-xl"
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
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
            className="text-black text-2xl xs:text-3xl sm:text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl tracking-tight uppercase mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            GRAPHIC DESIGNS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1] as any,
            }}
            className="text-black/60 text-fluid-base sm:text-fluid-lg max-w-2xl"
          >
            Posters, campaigns, and visual identity work by CREED CREATIONS studio.
          </motion.p>
        </motion.div>

        {/* 1. Marquee cards strip — like home page (two rows, opposite directions) */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="py-12 sm:py-16 overflow-hidden"
        >
          <div className="bg-black py-12 sm:py-16 overflow-hidden">
            <div className="mb-8 overflow-hidden">
              <div
                className="flex gap-6 w-max"
                style={{ animation: 'marquee 45s linear infinite' }}
              >
                {POSTS.map((post, idx) => (
                  <MarqueePostCard key={`m1-${idx}`} post={post} rowKey={`m1-${idx}`} />
                ))}
                {POSTS.map((post, idx) => (
                  <MarqueePostCard key={`m1dup-${idx}`} post={post} rowKey={`m1dup-${idx}`} />
                ))}
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className="flex gap-6 w-max"
                style={{ animation: 'marquee-reverse 55s linear infinite' }}
              >
                {[...POSTS].reverse().map((post, idx) => (
                  <MarqueePostCard key={`m2-${idx}`} post={post} rowKey={`m2-${idx}`} />
                ))}
                {[...POSTS].reverse().map((post, idx) => (
                  <MarqueePostCard key={`m2dup-${idx}`} post={post} rowKey={`m2dup-${idx}`} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Staggered grid — tightly packed, no white space */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16"
        >
          <motion.h3
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
            className="text-black/40 text-sm font-semibold uppercase tracking-widest mb-2"
          >
            Grid Showcase
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1] as any,
            }}
            className="text-black/50 text-sm max-w-xl mb-6"
          >
            Our best poster and campaign work — music, fashion, automotive, and lifestyle. Each piece
            crafted with bold typography and a distinct visual language.
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-2">
            {POSTS.map((post, idx) => (
              <motion.div
                key={post.image}
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
                <SafeImage
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold text-sm sm:text-base">{post.title}</p>
                  <p className="text-white/80 text-xs sm:text-sm">{post.subtitle}</p>
                  <p className="text-white/70 text-xs mt-1 line-clamp-2 hidden sm:block">
                    {post.description}
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
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
        className="bg-black py-16 sm:py-20 md:py-24 overflow-visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 overflow-visible">
          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
            className="text-white text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            EXPERIENCE OUR WORK
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1] as any,
            }}
            className="text-white/90 text-base sm:text-lg max-w-2xl mb-12 sm:mb-16"
          >
            Drag and tilt these cards to explore our creative process — bold design meets interactive experience.
          </motion.p>
          <DraggableCardContainer className="flex flex-wrap justify-center gap-2 sm:gap-3 -m-1 overflow-visible">
            {DRAGGABLE_CLIENT_ITEMS.map((item) => (
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
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
        className="bg-white py-16 sm:py-20 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
            className="text-black text-2xl xs:text-3xl sm:text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl tracking-tight uppercase mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            VIDEO DESIGNS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1] as any,
            }}
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

      {/* Section: FEATURED VIDEOS — four-tile grid */}
      <motion.section
        id="featured-videos"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
        className="bg-white py-16 sm:py-20 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
            className="text-black text-2xl xs:text-3xl sm:text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl tracking-tight uppercase mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            FEATURED VIDEO PROJECTS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1] as any,
            }}
            className="text-black/60 text-base sm:text-lg max-w-2xl mb-10 sm:mb-12"
          >
            Longer-form edits, showreels, and campaign videos that go beyond shorts — a closer look
            at how we tell brand stories with motion, pacing, and sound.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {FEATURED_VIDEOS.map((video, idx) => (
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
                className="group flex flex-col gap-3"
              >
                <div className="relative w-full overflow-hidden rounded-xl border border-black/10 bg-black/5 shadow-lg shadow-black/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/10 aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-black text-base sm:text-lg font-semibold tracking-tight">
                    {video.title}
                  </h3>
                  <p className="text-black/60 text-sm sm:text-[15px]">
                    A focused case-study style edit that showcases our approach to pacing, framing,
                    typography in motion, and sound design for YouTube-first content.
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section: INSTAGRAM REELS — marquee strip + modal */}
      <section id="instagram-reels" className="bg-white py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
            className="text-black text-2xl xs:text-3xl sm:text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl tracking-tight uppercase mb-4"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            INSTAGRAM REELS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as any }}
            className="text-black/60 text-base sm:text-lg max-w-2xl mb-10"
          >
            A handpicked line of reels from our Instagram – design breakdowns, campaign snippets, and quick stories from the edit table. Scroll through and tap any card to open it directly on Instagram.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
            className="overflow-hidden"
          >
            <div
              className="flex gap-6 w-max"
              style={{ animation: 'marquee 70s linear infinite' }}
            >
              {INSTAGRAM_REELS.concat(INSTAGRAM_REELS).map((reel, idx) => (
                <div
                  key={`${reel.id}-${idx}`}
                  className="shrink-0 w-[220px] sm:w-[240px] md:w-[260px]"
                >
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative h-[340px] sm:h-[380px] w-full rounded-2xl overflow-hidden border border-black/10 shadow-sm hover:shadow-lg transition-all duration-300 bg-black"
                  >
                    <SafeImage
                      src={getReelPreview(reel.id)}
                      alt={reel.label}
                      width={260}
                      height={380}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                          {reel.label}
                        </p>
                        <p className="text-[11px] text-white/60">
                          Tap to watch on Instagram
                        </p>
                      </div>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black text-xs font-semibold">
                        IG
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-8 sm:pb-10"
      >
        <Link
          to="/"
          className="inline-flex items-center text-black font-medium hover:text-neon-orange transition-colors duration-300"
        >
          ← Back to Home
        </Link>
      </motion.div>
      <Footer onContactClick={() => setIsContactOpen(true)} />
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default PortfolioPage;
