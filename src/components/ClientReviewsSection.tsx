import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Review {
  name: string;
  handle: string;
  role: string;
  text: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    name: 'Aarav Mehta',
    handle: '@aarav.digital',
    role: 'Founder, Streetwear Label',
    text:
      'CREED CREATIONS took our visuals from basic to premium. Every drop now feels like a proper campaign — our look is consistent across posters, reels, and product shots.',
    rating: 5,
  },
  {
    name: 'Simran Kaur',
    handle: '@simran.studio',
    role: 'Content Creator',
    text:
      'They understand short-form content better than most agencies I have worked with. My reel thumbnails and graphics now actually match the energy of my videos.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    handle: '@rahul.verma',
    role: 'Marketing Lead, SaaS Startup',
    text:
      'We needed clear, fast design support for campaigns — they delivered tight deadlines, zero drama, and visuals that still feel on-brand months later.',
    rating: 4,
  },
  {
    name: 'Ananya Sharma',
    handle: '@ananya.design',
    role: 'Brand Strategist',
    text:
      'The team doesn’t just design for aesthetics, they think in systems. Our brand guidelines and templates have made every collab and new launch much smoother.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    handle: '@vikram.studios',
    role: 'Director & Filmmaker',
    text:
      'From raw footage to final export, the video edits are tight, cinematic, and clean. Their pacing, sound, and motion work feel extremely polished.',
    rating: 5,
  },
  {
    name: 'Neha Patel',
    handle: '@nehapatel',
    role: 'Co-Founder, D2C Brand',
    text:
      'CREED CREATIONS helped us refresh our entire visual identity before a big launch. Our new packaging, social grid, and website all feel connected.',
    rating: 5,
  },
  {
    name: 'Karan Gupta',
    handle: '@karan.gupta',
    role: 'Startup Founder',
    text:
      'They listen, ask the right questions, and then come back with visuals that are sharper than what we had in mind. Communication and delivery are on point.',
    rating: 4,
  },
  {
    name: 'Ishita Rao',
    handle: '@ishita.rao',
    role: 'Social Media Manager',
    text:
      'Our content calendar got a huge glow-up. Templates, typography, and colors now feel cohesive, and it’s much easier for our team to produce on-brand posts.',
    rating: 5,
  },
  {
    name: 'Dev Patel',
    handle: '@dev.codes',
    role: 'Full-Stack Developer',
    text:
      'Working with their design team made our product UI upgrades so much smoother. They hand over clean, organized files that are actually developer-friendly.',
    rating: 4,
  },
  {
    name: 'Aisha Khan',
    handle: '@aisha.creative',
    role: 'Freelance Producer',
    text:
      'Every time I bring CREED CREATIONS into a project, the client notices the difference. Their posters, titles, and motion graphics really elevate the final delivery.',
    rating: 5,
  },
  {
    name: 'Manav Joshi',
    handle: '@manav.j',
    role: 'Agency Partner',
    text:
      'We use them as our go-to design partner for high-priority briefs. They handle pressure well and still manage to keep the design thinking sharp.',
    rating: 4,
  },
  {
    name: 'Ritika Desai',
    handle: '@ritika.desai',
    role: 'Brand Manager',
    text:
      'Our brand finally looks like what we always talked about internally. The visuals feel premium, current, and still very “us”.',
    rating: 5,
  },
  {
    name: 'Siddharth Rao',
    handle: '@sid.rao',
    role: 'YouTube Creator',
    text:
      'Thumbnails, channel art, lower thirds — everything got a proper redesign. CTR went up and my channel now looks aligned with the content quality.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    handle: '@priyanair',
    role: 'Head of Marketing',
    text:
      'They are fast, flexible, and detail-obsessed. Even last-minute changes are handled with patience and precision, which is rare.',
    rating: 5,
  },
  {
    name: 'Yash Malhotra',
    handle: '@yash.malhotra',
    role: 'E-commerce Founder',
    text:
      'Our product photos, banners, and ad creatives finally feel like one strong visual system. Customers notice the difference immediately.',
    rating: 5,
  },
];

const ReviewCard: React.FC<{ review: Review; fillWidth?: boolean }> = ({
  review,
  fillWidth,
}) => (
  <article
    className={`[perspective:1000px] ${
      fillWidth
        ? 'w-full min-w-0'
        : 'shrink-0 w-[260px] sm:w-[320px] md:w-[360px]'
    }`}
  >
    <div
      className="group h-full rounded-2xl bg-gray-100 p-5 sm:p-6 flex flex-col gap-3 border border-light-silver/30 transform-gpu transition-all duration-500 ease-out shadow-[0_4px_6px_rgba(0,0,0,0.04),0_10px_25px_rgba(0,0,0,0.06)] hover:bg-neon-orange hover:border-neon-orange/80 hover:[transform:translateY(-8px)_rotateX(-2deg)_translateZ(12px)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1),0_0_0_1px_rgba(217,68,4,0.08)]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <span className="font-semibold text-base sm:text-lg text-black group-hover:text-white transition-colors duration-500 ease-out">
            {review.name}
          </span>
          <span className="text-sm sm:text-base text-gray-500 group-hover:text-white transition-colors duration-500 ease-out">
            {review.handle}
          </span>
        </div>
        <div className="flex items-center gap-0.5 text-base sm:text-lg leading-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`transition-colors duration-500 ease-out ${
                i < review.rating
                  ? 'text-neon-orange group-hover:text-white'
                  : 'text-light-silver/50 group-hover:text-white/40'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </header>
      <p className="text-sm sm:text-base leading-relaxed text-black/80 group-hover:text-white/95 transition-colors duration-500 ease-out">
        {review.text}
      </p>
      <div
        className="mt-auto h-1 w-12 rounded-full bg-neon-orange/20 group-hover:bg-white/40 transition-colors duration-500 ease-out"
        aria-hidden
      />
    </div>
  </article>
);

const MOBILE_REVIEW_LIMIT = 4;

const ClientReviewsSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const displayedReviews =
    isMobile && !expanded
      ? REVIEWS.slice(0, MOBILE_REVIEW_LIMIT)
      : REVIEWS;

  const renderCards = (reviews: Review[] = REVIEWS) =>
    reviews.map((review, idx) => (
      <ReviewCard key={`${review.handle}-${idx}`} review={review} />
    ));

  return (
    <section id="client-reviews" className="bg-white py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="section-heading text-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase mb-6"
        >
          CLIENT REVIEWS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="text-black/60 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed mb-8"
        >
          What our clients say about working with us.
        </motion.p>

        {/* Mobile: grid of reviews with View more */}
        {isMobile ? (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6">
              {displayedReviews.map((review, idx) => (
                <ReviewCard
                  key={`${review.handle}-${idx}`}
                  review={review}
                  fillWidth
                />
              ))}
            </div>
            {!expanded && (
              <motion.button
                type="button"
                onClick={() => setExpanded(true)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 w-full py-3 px-4 rounded-full border-2 border-neon-orange text-neon-orange text-sm font-semibold hover:bg-neon-orange hover:text-white transition-colors"
              >
                View more reviews
              </motion.button>
            )}
          </>
        ) : (
          <>
            {/* Marquee row 1 — desktop */}
            <div className="mt-8 mb-6 overflow-hidden [perspective:1000px] py-12">
              <div
                className="flex gap-6 w-max"
                style={{ animation: 'marquee 55s linear infinite' }}
              >
                {renderCards()}
                {renderCards()}
              </div>
            </div>

            {/* Marquee row 2 (reverse) — desktop */}
            <div className="overflow-hidden [perspective:1000px] py-12">
              <div
                className="flex gap-6 w-max"
                style={{ animation: 'marquee-reverse 70s linear infinite' }}
              >
                {[...REVIEWS].reverse().map((review, idx) => (
                  <ReviewCard key={`${review.handle}-rev-${idx}`} review={review} />
                ))}
                {[...REVIEWS].reverse().map((review, idx) => (
                  <ReviewCard key={`${review.handle}-revdup-${idx}`} review={review} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ClientReviewsSection;

