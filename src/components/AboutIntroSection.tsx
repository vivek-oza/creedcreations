import React from 'react';
import { motion } from 'motion/react';
import { SocialLinks } from './SocialLinks';
import { titleAnim, descAnim, slideRightAnim } from '../utils/scrollAnimations';

const AboutIntroSection: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Text on left (mobile: top for readability) */}
          <div>
            <motion.h2
              {...titleAnim}
              className="section-heading text-black text-xl xs:text-2xl sm:text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl tracking-tight uppercase mb-4 sm:mb-6"
            >
              ABOUT US
            </motion.h2>
            <div className="max-w-3xl space-y-6 sm:space-y-8">
              <motion.p
                {...descAnim}
                className="text-black/90 text-fluid-base sm:text-fluid-lg leading-relaxed"
              >
                At CreedCreations, we believe every brand has a story worth telling. Based in Gandhinagar, we are a creative design and digital agency focused on building strong, meaningful brand experiences. Led by Arun Baghel, we offer the best graphic design in Gandhinagar, professional video editing, thumbnail design, and photography services. From brand identity and logo creation to website design, development, and video production, we help businesses in Gujarat and beyond present themselves with clarity and confidence. Our approach is simple — understand your vision, design with purpose, and deliver with precision.
              </motion.p>
              <motion.p
                initial={descAnim.initial}
                whileInView={descAnim.whileInView}
                viewport={descAnim.viewport}
                transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="text-black/90 text-fluid-base sm:text-fluid-lg leading-relaxed"
              >
                We work closely with startups, growing businesses, and established brands across Gandhinagar and Gujarat to create consistent and impactful visual communication. Whether it's UI/UX design, social media graphics, packaging, motion graphics, or promotional videos, every project is handled with attention to detail and professionalism. At CreedCreations in Sargasan, we value trust, transparency, and long-term partnerships. Our goal is to help brands stand out in competitive markets while staying authentic. We don't just design — we build brands that grow.
              </motion.p>
            </div>
          </div>

          {/* Logo and social links on right */}
          <motion.div
            {...slideRightAnim}
            transition={{ ...slideRightAnim.transition, delay: 0.1 }}
            className="flex flex-col items-center lg:items-end shrink-0 gap-6"
          >
            <img
              src="/bgs/aboutarun.png"
              alt="Creed Creations"
              width={320}
              height={320}
              className="w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-contain mx-auto lg:mx-0"
              loading="lazy"
            />
            <SocialLinks className="mt-2" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntroSection;
