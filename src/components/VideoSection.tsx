import React, { useRef, useState } from 'react';

interface VideoSectionProps {
  title: string;
  description: string;
  videoSrc: string;
}

/**
 * VideoSection Component
 * Title, description, and click-to-play video. Matches site design with Archivo Black and neon orange accents.
 */
const VideoSection: React.FC<VideoSectionProps> = ({ title, description, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videos = [
    videoSrc, // video3 plays first
    '/videos/video1.mp4',
    '/videos/video2.mp4',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    videoRef.current?.load();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    videoRef.current?.load();
  };

  return (
    <section id="video-design" className="bg-neon-orange py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="section-heading text-white text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase mb-6">
          {title}
        </h2>
        <p className="text-white/90 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed">
          {description}
        </p>

        {/* Video — auto-play on scroll */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden bg-black border border-white/10"
            style={{
              boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 24px 48px rgba(0,0,0,0.5)',
            }}
          >
            <video
              ref={videoRef}
              src={videos[currentIndex]}
              className="w-full aspect-video object-cover"
              playsInline
              autoPlay
              muted
              loop
              controls
            />

            {/* Carousel controls */}
            <button
              type="button"
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Previous video"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Next video"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;