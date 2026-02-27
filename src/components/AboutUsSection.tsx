import React, { useState } from 'react';
import { CometCard } from './ui/comet-card';

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
      'Arun leads the studio with a strong vision for quality and innovation. With extensive experience in video editing, brand storytelling, and creative direction, he ensures that every project meets high creative and professional standards.',
      'His expertise lies in transforming raw concepts into powerful visual narratives that connect with audiences. From brand films to promotional content, Arun oversees every detail — ensuring clarity, consistency, and impact.',
    ],
  },
  {
    name: 'Umesh',
    role: 'Video Editor & Graphic Designer',
    image: '/teamimages/Umesh.jpg',
    paragraphs: [
      'Umesh brings a versatile skill set across video editing and graphic design. He specializes in creating dynamic video content and clean, modern visual designs that align with brand goals.',
      'With a strong understanding of pacing, composition, and audience psychology, he crafts visuals that are engaging and purpose-driven. His attention to detail ensures every frame and every layout feels polished and professional.',
    ],
  },
  {
    name: 'Mrugesh',
    role: 'Graphic Designer',
    image: '/teamimages/Mrugesh.jpg',
    paragraphs: [
      'Mrugesh focuses on precision, brand consistency, and strong visual systems. His experience in brand identity design allows him to create cohesive visuals that strengthen recognition and communication.',
      'He understands how typography, color theory, and layout structure work together to create impactful brand experiences. His designs are not just attractive — they are strategically aligned with business objectives.',
    ],
  },
  {
    name: 'Dhaval',
    role: 'Graphic Designer',
    image: '/teamimages/Dhaval.jpg',
    paragraphs: [
      'Dhaval specializes in modern, high-impact design solutions tailored to each client’s needs. His innovative approach to layout and digital creatives helps brands stand out in competitive markets.',
      'With experience in digital campaigns, social media visuals, and marketing materials, he ensures every design is both creative and performance-focused.',
    ],
  },
  {
    name: 'Mitesh',
    role: 'Videographer',
    image: '/teamimages/Mitesh.jpg',
    paragraphs: [
      'Mitesh is skilled in professional videography, cinematography, and visual storytelling. With a strong command of camera techniques, lighting setups, and framing, he captures footage that elevates brand perception.',
      'His understanding of composition and narrative flow ensures that every video project is visually compelling and production-ready.',
    ],
  },
];

const AboutUsSection: React.FC = () => {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

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

  return (
    <section id="team" className="py-16 sm:py-20 md:py-24 pt-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="section-heading text-white text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase mb-6">
          OUR TEAM
        </h2>
        <p className="text-white/90 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed mb-10">
          A focused team of editors, designers, and filmmakers building clear, sharp, and modern visuals for brands that want to stand out.
        </p>

        {/* Team grid — compact cards with expand */}
        <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-start">
          {TEAM.map((member, index) => (
            <CometCard key={member.name} className="h-full">
              <article
                className="relative rounded-2xl overflow-hidden border border-white/10 h-full flex flex-col"
                style={{
                  backgroundColor: '#d94404',
                  boxShadow:
                    '0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.7)',
                }}
              >
                {/* Image */}
                <div className="w-full bg-black overflow-hidden flex items-center justify-center aspect-[3/4] max-h-[200px] sm:max-h-[220px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Compact content — image + designation */}
                <div className="p-4 sm:p-5 flex flex-col gap-2 text-white flex-1 min-h-0">
                  <h3 className="section-heading text-base sm:text-lg tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium uppercase tracking-wide text-white/90">
                    {member.role}
                  </p>

                  {/* Expand button — white arrow */}
                  <button
                    type="button"
                    onClick={() => openModal(index)}
                    className="mt-auto flex items-center justify-center w-9 h-9 rounded-full border border-white/40 hover:bg-white/10 text-white transition-colors duration-300"
                    aria-label="Read more"
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
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </article>
            </CometCard>
          ))}
        </div>
      </div>

      {/* Team Member Modal */}
      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 sm:px-6"
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow:
                '0 0 0 1px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.2)',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white/90 text-black hover:bg-black hover:text-white transition-colors duration-300"
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
              {/* Left — description */}
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

                {/* Navigation — prev/next */}
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-black/10">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black hover:bg-neon-orange hover:text-white hover:border-neon-orange transition-colors duration-300"
                    aria-label="Previous team member"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black hover:bg-neon-orange hover:text-white hover:border-neon-orange transition-colors duration-300"
                    aria-label="Next team member"
                  >
                    ›
                  </button>
                  <span className="text-sm text-black/50 ml-2">
                    {modalIndex + 1} / {TEAM.length}
                  </span>
                </div>
              </div>

              {/* Right — large image */}
              <div className="w-full lg:w-[45%] min-h-[280px] sm:min-h-[320px] lg:min-h-full bg-black flex items-center justify-center">
                <img
                  src={TEAM[modalIndex].image}
                  alt={TEAM[modalIndex].name}
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

