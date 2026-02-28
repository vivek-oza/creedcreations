import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Hero, StatsSection, BlogsSection, Navigation, Logo, MarqueeStrip, WhiteStrip, PortfolioSection, VideoSection, AboutIntroSection, AboutUsSection, ThumbnailSection, ServicesSection, ClientReviewsSection, OurClientsSection, Footer } from '../components';
import { SmoothCursor } from '../components/ui/smooth-cursor';
import ContactModal from '../components/ContactModal';
import { useNavTheme } from '../hooks/useNavTheme';
import { useIsHeroInView } from '../hooks/useIsHeroInView';

const HomePage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const isLightBg = useNavTheme();
  const isHeroInView = useIsHeroInView();
  const isCompact = !isHeroInView;

  return (
    <div className="App">
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
      <div className="bg-neon-orange">
        <AboutIntroSection />
        <AboutUsSection />
      </div>
      {false && <WhiteStrip />}
      <ClientReviewsSection />
      <OurClientsSection />
      <section id="get-quote" className="bg-white py-10 sm:py-12 border-y border-black/5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="section-heading text-black text-2xl sm:text-3xl md:text-4xl tracking-tight">
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
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default HomePage;
