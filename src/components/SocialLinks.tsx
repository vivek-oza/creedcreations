import React from 'react';
import { cn } from '../lib/utils';

interface SocialLink {
  name: string;
  href: string;
  icon: 'telephone' | 'gmail' | 'linkedin' | 'linkedin2' | 'instagram' | 'whatsapp' | 'youtube';
  label?: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Phone',
    href: 'tel:7600111331',
    icon: 'telephone',
  },
  {
    name: 'Gmail',
    href: 'mailto:creedcreationindia@gmail.com',
    icon: 'gmail',
  },
  {
    name: 'Company LinkedIn',
    href: 'https://www.linkedin.com/company/creedcreation/',
    icon: 'linkedin',
    label: 'Company',
  },
  {
    name: "Arun's LinkedIn",
    href: 'https://www.linkedin.com/in/arun-baghel-0b99a41a3/',
    icon: 'linkedin2',
    label: 'Arun',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/creed_creation/',
    icon: 'instagram',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/7600111331',
    icon: 'whatsapp',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@CreedCreation',
    icon: 'youtube',
  },
];

const ICON_MAP: Record<string, string> = {
  telephone: '/logos/telephone.png',
  gmail: '/logos/gmail.png',
  linkedin: '/logos/linkedin.png',
  linkedin2: '/logos/linkedin2.png',
  instagram: '/logos/instagram.png',
  whatsapp: '/logos/whatsapp.png',
  youtube: '/logos/youtube.png',
};

function SocialIcon({ link, isLast }: { link: SocialLink; isLast: boolean }) {
  const baseLinkClasses =
    'relative flex items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent shrink-0 min-w-[40px] min-h-[40px] w-10 h-10 sm:min-w-[44px] sm:min-h-[44px] sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14';
  const isExternal = link.href.startsWith('http');

  return (
    <a
      href={link.href}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      className={cn(baseLinkClasses, !isLast && 'sm:-mr-4')}
      aria-label={link.label || link.name}
      title={link.label || link.name}
    >
      <img
        src={ICON_MAP[link.icon]}
        alt={link.label || link.name}
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain p-1.5"
      />
    </a>
  );
}

export const SocialLinks: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-2 sm:gap-2',
        'w-full max-w-full sm:w-auto',
        'min-h-12 sm:min-h-14 md:min-h-16',
        'overflow-x-auto scrollbar-hide sm:overflow-visible',
        'px-0 sm:px-0',
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-0 sm:-mr-4 sm:last:mr-0">
        {SOCIAL_LINKS.map((link, idx) => (
          <SocialIcon
            key={`${link.icon}-${link.label || link.name}`}
            link={link}
            isLast={idx === SOCIAL_LINKS.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
