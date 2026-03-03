import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { titleAnim, descAnim } from '../utils/scrollAnimations';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  paragraphs: string[];
}

const TEAM: TeamMember[] = [
  {
    name: 'Arun Baghel',
    role: 'CEO & Senior Video Editor',
    image: '/teamimages/arun.jpg',
    paragraphs: [
      'Arun Baghel leads CREED CREATIONS with a strong vision for quality and innovation. As one of the best video editors in Gandhinagar, he brings extensive experience in brand storytelling and creative direction, ensuring every project meets high creative and professional standards.',
      'His expertise lies in transforming raw concepts into powerful visual narratives that connect with audiences. From brand films to promotional content, Arun oversees every detail — ensuring clarity, consistency, and impact for brands across Gandhinagar and Gujarat.',
    ],
  },
  {
    name: 'Umesh',
    role: 'Video Editor & Graphic Designer',
    image: '/teamimages/Umesh.jpg',
    paragraphs: [
      'Umesh brings a versatile skill set across video editing and graphic design in Gandhinagar. He specializes in creating dynamic video content, thumbnail design, and clean, modern visual designs that align with brand goals.',
      'With a strong understanding of pacing, composition, and audience psychology, he crafts visuals that are engaging and purpose-driven. His attention to detail ensures every frame and layout feels polished and professional.',
    ],
  },
  {
    name: 'Mrugesh',
    role: 'Graphic Designer',
    image: '/teamimages/Mrugesh.jpg',
    paragraphs: [
      'Mrugesh focuses on precision and strong visual systems for graphic design in Gandhinagar. His experience in brand identity design allows him to create cohesive visuals that strengthen recognition and communication.',
      'He understands how typography, color theory, and layout structure work together to create impactful brand experiences. His designs are not just attractive — they are strategically aligned with business objectives.',
    ],
  },
  {
    name: 'Dhaval',
    role: 'Graphic Designer',
    image: '/teamimages/Dhaval.jpg',
    paragraphs: [
      "Dhaval specializes in modern, high-impact design solutions tailored to each client's needs. His innovative approach to layout and digital creatives helps brands stand out in competitive markets.",
      'With experience in digital campaigns, social media visuals, and marketing materials, he ensures every design is both creative and performance-focused.',
    ],
  },
  {
    name: 'Mitesh',
    role: 'Videographer',
    image: '/teamimages/Mitesh.jpg',
    paragraphs: [
      'Mitesh is skilled in professional videography and best photography services in Gandhinagar. With expertise in cinematography, lighting setups, and framing, he captures footage that elevates brand perception.',
      'His understanding of composition and narrative flow ensures that every video project is visually compelling and production-ready for clients across Gujarat.',
    ],
  },
];

const MOBILE_TEAM_LIMIT = 4;

const AboutUsSection: React.FC = () => {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const displayedTeam =
    isMobile && !expanded ? TEAM.slice(0, MOBILE_TEAM_LIMIT) : TEAM;

  const openModal = (index: number) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);

  const goPrev = () => {
    if (modalIndex === null) return;
    setModalIndex((prev) =>
      prev === null ? prev : (prev - 1 + TEAM.length) % TEAM.length,
    );
  };

  const goNext = () => {
    if (modalIndex === null) return;
    setModalIndex((prev) =>
      prev === null ? prev : (prev + 1) % TEAM.length,
    );
  };

  const renderCard = (member: TeamMember, index: number, key: string) => (
    <motion.article
      key={key}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: (index % TEAM.length) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group shrink-0 w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px]"
    >
      <button
        type="button"
        onClick={() => openModal(index % TEAM.length)}
        className="w-full text-left block"
      >
        {/* Square card — full image, no overlay */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-black">
          <img
            src={member.image}
            alt={`${member.name} - ${member.role} at CREED CREATIONS Gandhinagar`}
            width={420}
            height={420}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {/* Name and designation below image — white text */}
        <div className="mt-4">
          <h3 className="section-heading text-white text-lg sm:text-xl tracking-tight">
            {member.name}
          </h3>
          <p className="text-white/80 text-sm font-medium uppercase tracking-wide mt-0.5">
            {member.role}
          </p>
        </div>
      </button>
    </motion.article>
  );

  const marqueeRow = (rowKey: string) => (
    <div key={rowKey} className="flex shrink-0 gap-6 pr-6">
      {TEAM.map((member, idx) => renderCard(member, idx, `${rowKey}-${member.name}`))}
    </div>
  );

  return (
    <section id="team" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-10 sm:mb-14">
        <motion.h2
          {...titleAnim}
          className="section-heading text-white text-xl xs:text-2xl sm:text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl tracking-tight uppercase mb-4 sm:mb-6"
        >
          OUR TEAM
        </motion.h2>
        <motion.p
          {...descAnim}
          className="text-white/80 text-fluid-base sm:text-fluid-lg mt-3 max-w-3xl leading-relaxed"
        >
          A focused team of editors, designers, and filmmakers in Gandhinagar — offering the best graphic design, video editing, thumbnail design, and photography services. Building clear, sharp, and modern visuals for brands that want to stand out.
        </motion.p>
      </div>

      {/* Slow marquee — cards scroll horizontally (desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block w-full overflow-hidden"
      >
        <div
          className="flex w-max"
          style={{ animation: 'marquee-slow 90s linear infinite' }}
        >
          {marqueeRow('a')}
          {marqueeRow('b')}
        </div>
      </motion.div>

      {/* Mobile: static grid with view more */}
      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {displayedTeam.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                onClick={() => openModal(index)}
                className="w-full text-left block"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    width={420}
                    height={420}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="section-heading text-white text-base tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-white/80 text-xs font-medium uppercase tracking-wide mt-0.5">
                    {member.role}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
        {!expanded && (
          <motion.button
            type="button"
            onClick={() => setExpanded(true)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 w-full py-3 px-4 rounded-full border border-white/30 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            View more team members
          </motion.button>
        )}
      </div>

      {/* Team Member Modal */}
      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:px-6 overflow-y-auto bg-black/60"
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          <div
            className="relative w-full max-w-4xl my-auto rounded-2xl max-h-[90vh] overflow-y-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow:
                '0 0 0 1px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.2)',
            }}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 flex min-w-[44px] min-h-[44px] w-11 h-11 items-center justify-center rounded-full border border-black/15 bg-white/90 text-black hover:bg-black hover:text-white transition-colors duration-300"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col lg:flex-row min-h-[400px] sm:min-h-[450px]">
              <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <h2 className="section-heading text-black text-2xl sm:text-3xl tracking-tight mb-2">
                    {TEAM[modalIndex].name}
                  </h2>
                  <p className="text-neon-orange text-sm sm:text-base font-semibold uppercase tracking-wide mb-6">
                    {TEAM[modalIndex].role}
                  </p>
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-black/90">
                    {TEAM[modalIndex].paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-black/10">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex min-w-[44px] min-h-[44px] w-11 h-11 items-center justify-center rounded-full border border-black/20 text-black hover:bg-neon-orange hover:text-white hover:border-neon-orange transition-colors duration-300"
                    aria-label="Previous team member"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex min-w-[44px] min-h-[44px] w-11 h-11 items-center justify-center rounded-full border border-black/20 text-black hover:bg-neon-orange hover:text-white hover:border-neon-orange transition-colors duration-300"
                    aria-label="Next team member"
                  >
                    ›
                  </button>
                  <span className="text-sm text-black/50 ml-2">
                    {modalIndex + 1} / {TEAM.length}
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-[45%] min-h-[280px] sm:min-h-[320px] lg:min-h-full bg-black flex items-center justify-center">
                <img
                  src={TEAM[modalIndex].image}
                  alt={TEAM[modalIndex].name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUsSection;
