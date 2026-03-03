export interface PosterItem {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  likes: string;
  shares: string;
}

// Grid showcase — images from public/posters/ (Image1.jpeg … Image8.jpeg)
export const POSTERS: PosterItem[] = [
  {
    image: '/posters/Image1.jpeg',
    title: 'Popular — The Idol',
    subtitle: 'Music Poster Design',
    description: 'HBO original series poster featuring The Weeknd, Madonna & Playboi Carti — bold typography meets iconic profiles.',
    likes: '1.7k',
    shares: '600',
  },
  {
    image: '/posters/Image2.jpeg',
    title: 'RXXL — Jogador',
    subtitle: 'Artist Poster Design',
    description: '"Having the best boot doesn\'t make you the best player" — urban street aesthetic with neon green typography.',
    likes: '2.1k',
    shares: '480',
  },
  {
    image: '/posters/Image3.jpeg',
    title: 'Nike Air — Get On',
    subtitle: 'Brand Campaign Poster',
    description: 'Dynamic sneaker campaign with fluid motion graphics, lime green palette and athletic streetwear energy.',
    likes: '3.4k',
    shares: '920',
  },
  {
    image: '/posters/Image4.jpeg',
    title: 'Fashion Show',
    subtitle: 'Event Poster Design',
    description: 'High-contrast editorial poster for Maria Lebedeva\'s new collection — bold typography, red and black.',
    likes: '1.9k',
    shares: '540',
  },
  {
    image: '/posters/Image5.jpeg',
    title: 'Break Free',
    subtitle: 'Lifestyle Poster',
    description: 'Escape, embrace, adventure — a poster about self-discovery and the joy of exploration.',
    likes: '2.8k',
    shares: '710',
  },
  {
    image: '/posters/Image6.jpeg',
    title: 'Always Be Creative',
    subtitle: 'CreaThink Media Campaign',
    description: 'Celebrating the joy of creativity with bold yellow backgrounds and playful typography.',
    likes: '4.2k',
    shares: '1.1k',
  },
  {
    image: '/posters/Image7.jpeg',
    title: 'Toyota GR Supra MK5',
    subtitle: 'Automotive Poster',
    description: 'Built to reignite the thrill of driving — cinematic car poster with 382 HP, 0–60 in 4.1s.',
    likes: '5.1k',
    shares: '1.3k',
  },
  {
    image: '/posters/Image8.jpeg',
    title: 'Podium Hat-Trick',
    subtitle: 'Sports Poster Design',
    description: 'McLaren F1 podium celebration across Singapore, Japan & Qatar — bold typography and race-day energy.',
    likes: '3.7k',
    shares: '890',
  },
];
