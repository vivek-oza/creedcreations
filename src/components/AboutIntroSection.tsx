import React from 'react';
import { motion } from 'motion/react';
import { SocialLinks } from './SocialLinks';

const scrollAnim = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, amount: 0.2 } as const,
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const,
};

const AboutIntroSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-10 lg:gap-12 items-center">
          <div>
            <motion.h2
              {...scrollAnim}
              className="section-heading text-white text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase mb-6"
            >
              ABOUT US
            </motion.h2>
            <div className="max-w-3xl space-y-6 sm:space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="text-white/90 text-base sm:text-lg leading-relaxed"
              >
                At CreedCreations, we believe every brand has a story worth telling. Based in Gandhinagar, we are a creative design and digital agency focused on building strong, meaningful brand experiences. Led by Arun Baghel, we offer the best graphic design in Gandhinagar, professional video editing, thumbnail design, and photography services. From brand identity and logo creation to website design, development, and video production, we help businesses in Gujarat and beyond present themselves with clarity and confidence. Our approach is simple — understand your vision, design with purpose, and deliver with precision.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="text-white/90 text-base sm:text-lg leading-relaxed"
              >
                We work closely with startups, growing businesses, and established brands across Gandhinagar and Gujarat to create consistent and impactful visual communication. Whether it's UI/UX design, social media graphics, packaging, motion graphics, or promotional videos, every project is handled with attention to detail and professionalism. At CreedCreations in Sargasan, we value trust, transparency, and long-term partnerships. Our goal is to help brands stand out in competitive markets while staying authentic. We don't just design — we build brands that grow.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center lg:items-end shrink-0 gap-6"
          >
            <img
              src="/newlogo.png"
              alt="Creed Creations"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-contain"
            />
            <SocialLinks className="mt-2" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntroSection;
