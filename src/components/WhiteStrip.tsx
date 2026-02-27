import React from 'react';

const SENTENCE =
  'We combine creativity with strategy to create work that not only looks great but also drives real results — think, design, deliver.';

/**
 * Section separator — white strip with one long sentence in a smooth marquee.
 */
const WhiteStrip: React.FC = () => {
  return (
    <section className="bg-white py-5 sm:py-6 border-y border-black/5 overflow-hidden">
      <div
        className="flex w-max items-center gap-12 sm:gap-16"
        style={{ animation: 'marquee 45s linear infinite' }}
      >
        <span className="section-heading text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight whitespace-nowrap">
          {SENTENCE}
        </span>
        <span className="section-heading text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight whitespace-nowrap opacity-90">
          {SENTENCE}
        </span>
      </div>
    </section>
  );
};

export default WhiteStrip;
