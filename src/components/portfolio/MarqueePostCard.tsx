import React from 'react';
import SafeImage from '../SafeImage';
import type { PostItem } from '../../data/posts';

interface MarqueePostCardProps {
  post: PostItem;
  rowKey: string;
}

const CARD_CLASS =
  'shrink-0 w-[240px] min-[400px]:w-[272px] sm:w-[304px] md:w-[320px] min-w-0';

/**
 * Reusable marquee card for portfolio graphic design section.
 * Handles image load failures via SafeImage.
 */
const MarqueePostCard: React.FC<MarqueePostCardProps> = ({ post, rowKey }) => (
  <div key={rowKey} className={CARD_CLASS}>
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      <div className="aspect-[3/4] overflow-hidden bg-black/10">
        <SafeImage
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-white font-semibold text-sm">{post.title}</p>
        <p className="text-white/60 text-xs mt-1">{post.subtitle}</p>
      </div>
    </div>
  </div>
);

export default MarqueePostCard;
