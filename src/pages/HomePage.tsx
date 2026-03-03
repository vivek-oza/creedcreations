import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { Hero, StatsSection, BlogsSection, Navigation, Logo, MarqueeStrip, WhiteStrip, PortfolioSection, VideoSection, AboutIntroSection, AboutUsSection, ThumbnailSection, ServicesSection, ClientReviewsSection, OurClientsSection, Footer } from '../components';
import { SmoothCursor } from '../components/ui/smooth-cursor';
import { useScrollContext } from '../contexts/ScrollContext';

const ContactModal = lazy(() => import('../components/ContactModal'));

const HomePage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { isLightBg, isHeroInView } = useScrollContext();
  const isCompact = !isHeroInView;

  return (
    <div className="App overflow-x-hidden w-full min-w-0">
      <SmoothCursor isLightBg={isLightBg} />
      <Logo isLightBg={isLightBg} isCompact={isCompact} />
      <Navigation isLightBg={isLightBg} isCompact={isCompact} onContactClick={() => setIsContactOpen(true)} />
      <Hero />
      <MarqueeStrip />
      <PortfolioSection />
      {false && <WhiteStrip />}
      <VideoSection
        title="VIDEO DESIGN"
        description="A showcase of our creative work — click to play and experience the vision we bring to every project."
        videoSrc="/videos/video3.mp4"
      />
      {false && <WhiteStrip />}
      {false && <ThumbnailSection />}
      <ServicesSection />
      {false && <WhiteStrip />}
      <div className="bg-white">
        <AboutIntroSection />
      </div>
      <div className="bg-black">
        <AboutUsSection />
      </div>
      {false && <WhiteStrip />}
      <ClientReviewsSection />
      <OurClientsSection />
      <section id="get-quote" className="bg-white py-8 sm:py-10 md:py-12 border-y border-black/5">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <p className="section-heading text-black text-lg xs:text-xl sm:text-fluid-2xl md:text-fluid-3xl tracking-tight">
            THINK, DESIGN, INNOVATE<br className="sm:hidden" /> AND DELIVER
          </p>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block h-px w-28 bg-black/10" />
            <span className="inline-flex items-center justify-center rounded-full border border-black/15 px-4 py-1 text-xs sm:text-sm font-medium tracking-wide text-black/70">
              GET A QUOTE FOR FREE
            </span>
          </div>
        </motion.div>
      </section>
      <StatsSection />
      <BlogsSection />
      <Footer onContactClick={() => setIsContactOpen(true)} />
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;
