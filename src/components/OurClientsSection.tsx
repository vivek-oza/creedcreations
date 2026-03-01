import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { titleAnim, descAnim } from '../utils/scrollAnimations';

const CLIENT_LOGOS = [
  '/clients/CLIENT-1.jpeg',
  '/clients/CLIENT-2.jpeg',
  '/clients/CLIENT-3.jpeg',
  '/clients/CLIENT-4.jpeg',
  '/clients/CLIENT-5.jpeg',
  '/clients/CLIENT-6.jpeg',
  '/clients/CLIENT-7.jpeg',
  '/clients/CLIENT-8.jpeg',
  '/clients/CLIENT-9.jpeg',
  '/clients/CLIENT-10.jpeg',
];

const OurClientsSection: React.FC = () => {
  return (
    <section id="our-clients" className="bg-white py-16 sm:py-20 md:py-24 overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.h2
          {...titleAnim}
          className="section-heading text-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase mb-6"
          style={{ fontFamily: "'Archivo Black', sans-serif" }}
        >
          OUR CLIENTS
        </motion.h2>
        <motion.p
          {...descAnim}
          className="text-black/60 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed mb-12"
        >
          Brands that trust us with their visual identity and creative vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16"
        >
          {CLIENT_LOGOS.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.12 + idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32',
                'grayscale opacity-60 hover:grayscale-0 hover:opacity-100',
                'rounded-lg hover:ring-2 hover:ring-neon-orange/40',
                'transition-all duration-300 ease-out'
              )}
            >
              <img
                src={src}
                alt={`Client ${idx + 1}`}
                className="w-full h-full object-contain object-center"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurClientsSection;
