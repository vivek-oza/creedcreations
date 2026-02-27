import React from 'react';
import PosterCard from './PosterCard';

const POSTERS = [
  {
    image: '/posters/Image1.jpeg',
    title: 'Popular — The Idol',
    subtitle: 'Music Poster Design',
    description: 'HBO original series poster featuring The Weeknd, Madonna & Playboi Carti',
    likes: '1.7k',
    shares: '600',
  },
  {
    image: '/posters/Image2.jpeg',
    title: 'RXXL — Jogador',
    subtitle: 'Artist Poster Design',
    description: 'Bold urban typography poster with raw street fashion aesthetic',
    likes: '2.1k',
    shares: '480',
  },
  {
    image: '/posters/Image3.jpeg',
    title: 'Nike Air — Get On',
    subtitle: 'Brand Campaign Poster',
    description: 'Dynamic sneaker campaign with fluid motion graphics and neon palette',
    likes: '3.4k',
    shares: '920',
  },
  {
    image: '/posters/Image4.jpeg',
    title: 'Fashion Show',
    subtitle: 'Event Poster Design',
    description: 'High-contrast editorial poster for Maria Lebedeva\'s new collection',
    likes: '1.9k',
    shares: '540',
  },
  {
    image: '/posters/Image5.jpeg',
    title: 'Break Free',
    subtitle: 'Lifestyle Poster',
    description: 'Escape, embrace, adventure — a poster about self-discovery',
    likes: '2.8k',
    shares: '710',
  },
  {
    image: '/posters/Image6.jpeg',
    title: 'Always Be Creative',
    subtitle: 'Motivational Poster',
    description: 'CreaThink Media campaign celebrating the joy of creativity',
    likes: '4.2k',
    shares: '1.1k',
  },
  {
    image: '/posters/Image7.jpeg',
    title: 'Toyota GR Supra MK5',
    subtitle: 'Automotive Poster',
    description: 'Built to reignite the thrill of driving — cinematic car poster',
    likes: '5.1k',
    shares: '1.3k',
  },
  {
    image: '/posters/Image8.jpeg',
    title: 'Podium Hat-Trick',
    subtitle: 'Sports Poster Design',
    description: 'McLaren F1 podium celebration across Singapore, Japan & Qatar',
    likes: '3.7k',
    shares: '890',
  },
];

/**
 * PortfolioSection Component
 * Displays poster cards in a continuous marquee scroll.
 * Two rows scrolling in opposite directions for visual depth.
 */
const PortfolioSection: React.FC = () => {
  return (
    <section id="graphic-design" className="bg-black py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-12">
        <h2 className="section-heading text-white text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase mb-6">
          GRAPHIC DESIGNS
        </h2>
        <p className="text-white/90 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed">
          A collection of posters that define brands, tell stories, and break the mold.
        </p>
      </div>

      {/* Row 1 — Scrolls Left */}
      <div className="mb-8 overflow-hidden">
        <div
          className="flex gap-6 w-max"
          style={{ animation: 'marquee 40s linear infinite' }}
        >
          {POSTERS.map((poster, idx) => (
            <PosterCard key={`r1-${idx}`} {...poster} />
          ))}
          {POSTERS.map((poster, idx) => (
            <PosterCard key={`r1-dup-${idx}`} {...poster} />
          ))}
        </div>
      </div>

      {/* Row 2 — Scrolls Right */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 w-max"
          style={{ animation: 'marquee-reverse 45s linear infinite' }}
        >
          {[...POSTERS].reverse().map((poster, idx) => (
            <PosterCard key={`r2-${idx}`} {...poster} />
          ))}
          {[...POSTERS].reverse().map((poster, idx) => (
            <PosterCard key={`r2-dup-${idx}`} {...poster} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;