import React, { useState } from 'react';

interface PosterCardProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  likes: string;
  shares: string;
}

/**
 * PosterCard Component
 * Glassmorphism card displaying a poster with engagement stats.
 * Features like/share interactions with icon-only buttons.
 */
const PosterCard: React.FC<PosterCardProps> = ({
  image,
  title,
  subtitle,
  description,
  likes,
  shares,
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="shrink-0 w-[272px] sm:w-[304px] md:w-[320px]">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Poster Image */}
        <div className="w-full aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-3">
          {/* Title & Subtitle */}
          <div>
            <h3 className="text-white font-archivo font-bold text-lg leading-tight">
              {title}
            </h3>
            <p className="text-gray-400 font-body text-sm mt-1">{subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-gray-300 font-body text-sm leading-relaxed line-clamp-1">
            {description}
          </p>

          {/* Engagement Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            {/* Like Button */}
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-2 text-sm transition-colors duration-200 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={liked ? '#FF8B00' : 'none'}
                stroke={liked ? '#FF8B00' : 'currentColor'}
                strokeWidth="2"
                className="w-5 h-5 text-gray-400 group-hover:text-neon-orange transition-colors duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span className={`${liked ? 'text-neon-orange' : 'text-gray-400'}`}>
                {likes}
              </span>
            </button>

            {/* Share Button */}
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 group-hover:text-white transition-colors duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
              <span>{shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterCard;