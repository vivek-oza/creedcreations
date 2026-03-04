export interface DesignItem {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

// Grid showcase — personal and client designs from public/designs/ (Design1.jpeg … Design8.jpeg)
export const DESIGNS: DesignItem[] = [
  {
    image: '/designs/Design1.jpeg',
    title: 'FACE Magazine Cover',
    subtitle: 'Fashion Editorial Design',
    description:
      'A cinematic magazine cover layout featuring Medha Shankr — refined typography, gold accents, and soft portrait lighting.',
  },
  {
    image: '/designs/Design2.jpeg',
    title: '76th Indian Republic Day',
    subtitle: 'National Day Creative',
    description:
      'A patriotic composition with Red Fort, tricolour waves, and clean bilingual typography to celebrate the 76th Indian Republic Day.',
  },
  {
    image: '/designs/Design3.jpeg',
    title: 'Bhutan Travel Poster',
    subtitle: 'Tour Package Design',
    description:
      'Travel campaign for a Kerala-to-Bhutan package — serene temple photography paired with clear pricing and icon-based information.',
  },
  {
    image: '/designs/Design4.jpeg',
    title: 'Kerala Monsoon Escape',
    subtitle: 'Tourism Campaign Visual',
    description:
      'Lush aerial backwater imagery and bold “Kerala” typography to promote a monsoon travel package across God’s Own Country.',
  },
  {
    image: '/designs/Design5.jpeg',
    title: 'Shoona — Golden Era',
    subtitle: 'Character Poster',
    description:
      'Soft portrait illustration with floral elements and tall display typography to capture a nostalgic “Face Of A Golden Era.”',
  },
  {
    image: '/designs/Design6.jpeg',
    title: 'The Real Titan',
    subtitle: 'Tribute Poster',
    description:
      'Monochrome tribute to Ratan Naval Tata — strong type hierarchy over archival imagery honouring a legendary career.',
  },
  {
    image: '/designs/Design7.jpeg',
    title: 'Work Smart Not Hard',
    subtitle: 'Nike-Inspired Graphic',
    description:
      'High-contrast black and red graphic portrait with bold motivational copy and a strong sports-brand aesthetic.',
  },
  {
    image: '/designs/Design8.jpeg',
    title: 'Tim Hortons in India',
    subtitle: 'Brand Launch Visual',
    description:
      'Launch creative for Tim Hortons arriving in India — vivid red canvas, smoke-formed landmarks, and multilingual “coffee” typography.',
  },
];

