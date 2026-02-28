import React from 'react';
import { motion } from 'motion/react';

const MARQUEE_ITEMS = [
  'Brand Identity Design',
  'Logo Design',
  'Graphic Design',
  'Video Editing',
  'Videography',
  'Social Media Graphics',
  'Website Design',
  'UI/UX Design',
  'Motion Graphics',
  'Brand Strategy',
  'Marketing Materials',
  'Packaging Design',
  'Presentation Design',
  'Explainer Videos',
];

const SEPARATOR = '✦';

/**
 * MarqueeStrip Component
 * Infinite scrolling services strip below the hero section.
 * White background with dark grey italic text.
 */
const MarqueeStrip: React.FC = () => {
  const renderItems = () =>
    MARQUEE_ITEMS.map((item, idx) => (
      <span key={idx} className="flex items-center shrink-0">
        <span className="text-gray-900 font-archivo font-semibold italic text-xl sm:text-2xl md:text-3xl uppercase tracking-wider whitespace-nowrap">
          {item}
        </span>
        <span className="text-gray-600 mx-6 sm:mx-8 md:mx-10 text-lg italic">{SEPARATOR}</span>
      </span>
    ));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-white border-t border-b border-black/10 py-4 sm:py-5 md:py-6 overflow-hidden"
    >
      <div
        className="flex w-max"
        style={{
          animation: 'marquee 45s linear infinite',
        }}
      >
        <div className="flex shrink-0">{renderItems()}</div>
        <div className="flex shrink-0">{renderItems()}</div>
      </div>
    </motion.div>
  );
};

export default MarqueeStrip;