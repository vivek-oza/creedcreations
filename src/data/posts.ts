export interface PostItem {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  likes: string;
  shares: string;
}

// Grid showcase — images from public/posters/ (Image1.jpeg … Image8.jpeg)
export const POSTS: PostItem[] = [
  {
    image: '/creatives/creative1.png',
    title: 'PSI Mains',
    subtitle: 'Asnwer Writing Program Poster',
    description: 'At Creed Creation, we crafted this clean, structured poster with bold headers, bilingual bullet points, and prominent data highlights to deliver maximum clarity and impact for PSI aspirants.',
    likes: '2.7k',
    shares: '980',
  },
  {
    image: '/creatives/creative2.png',
    title: 'Constable ',
    subtitle: 'Mentorship Program Poster',
    description: 'Creed Creation designed this bold, high-contrast poster with a dramatic black-to-red gradient background, oversized countdown typography, and stacked bilingual text to create urgency and visual impact for the Khalhi campaign launch',
    likes: '2.1k',
    shares: '480',
  },
  {
    image: '/creatives/creative3.png',
    title: 'ONE STOP FOR SOLUTION FOR PSI',
    subtitle: '5-Day Intensive Writing Program | 12th–16th February',
    description: 'The minimalist design with subtle blue accents ensures easy readability, helping aspirants quickly grasp the full workshop plan at a glance.',
    likes: '3.4k',
    shares: '920',
  },
  {
    image: '/creatives/creative4.png',
    title: 'PSI 2.0',
    subtitle: 'Complete PSI Course',
    description: 'Creed Creation designed this high-impact purple-gradient poster with a clean dual-column layout to organize massive course information into scannable sections.',
    likes: '1.9k',
    shares: '540',
  },
  {
    image: '/creatives/creative5.png',
    title: 'Break Free',
    subtitle: 'Lifestyle Poster',
    description: 'Escape, embrace, adventure — a poster about self-discovery and the joy of exploration.',
    likes: '2.8k',
    shares: '710',
  },
  {
    image: '/creatives/creative6.png',
    title: 'AO MAINS — MOCK TEST',
    subtitle: '5-Day Subject-Wise Mock Test Series',
    description: 'Creed Creation designed this clean, structured poster with a crisp white background and navy blue accents to convey professionalism and exam readiness.',
    likes: '4.2k',
    shares: '1.1k',
  },
  {
    image: '/creatives/creative7.png',
    title: 'RFO MAINS MOCK TEST WITH EVALUATION',
    subtitle: '5-Day Subject-Wise Mock Test Series',
    description: 'Creed Creation designed this bold, high-energy poster with a striking red-to-orange gradient background to grab attention instantly.',
    likes: '5.1k',
    shares: '1.3k',
  },
  {
    image: '/creatives/creative8.png',
    title: 'GPSC CLASS 1/2 SMART COURSE',
    subtitle: 'GPSC Poster Design',
    description: 'Creed Creation designed this professional, credibility-focused poster with a clean layout featuring headshots and detailed faculty profiles.',
    likes: '3.7k',
    shares: '890',
  },
];
