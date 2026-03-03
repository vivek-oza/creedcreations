export const HERO_TITLE = 'MY BEST WORK';

export const VIDEO_SHORTS = [
  { id: '5_MQhfa0VwU' },
  { id: 'C-T-lGUTiP4' },
  { id: '7kZ6FWlx738' },
  { id: 'eR3pJXY8Cdw' },
  { id: 'KCfUg4vQbk4' },
  { id: 'zF4u7Wm3F_I' },
] as const;

export const FEATURED_VIDEOS = [
  { id: 'rGgrxO1WkdQ', title: 'CREED CREATIONS — Showreel' },
  { id: 'gx9uqip4xbY', title: 'Brand Film — Visual Story' },
  { id: 'Jv5Z_r5wZBU', title: 'Design Breakdown — Campaign' },
  { id: 'RKWkcTl0IIs', title: 'Thumbnail & Reel Design' },
] as const;

export interface InstagramReel {
  id: string;
  label: string;
  url: string;
}

export const INSTAGRAM_REELS: InstagramReel[] = [
  { id: 'DRADg0GDCO9', label: 'Reel 1', url: 'https://www.instagram.com/reel/DRADg0GDCO9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'DQzakcgDI3R', label: 'Reel 2', url: 'https://www.instagram.com/reel/DQzakcgDI3R/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'DMDaaBwxMEl', label: 'Reel 3', url: 'https://www.instagram.com/reel/DMDaaBwxMEl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'DMVTy18xQSy', label: 'Reel 4', url: 'https://www.instagram.com/reel/DMVTy18xQSy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'DMc0xkeR9ak', label: 'Reel 5', url: 'https://www.instagram.com/reel/DMc0xkeR9ak/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'DRrCmGeDNda', label: 'Reel 6', url: 'https://www.instagram.com/reel/DRrCmGeDNda/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
];

export const REEL_PREVIEWS: Record<string, string> = {
  DRADg0GDCO9: '/reels/Reel1.png',
  DQzakcgDI3R: '/reels/Reel2.png',
  DMDaaBwxMEl: '/reels/Reel3.png',
  DMVTy18xQSy: '/reels/Reel4.png',
  DMc0xkeR9ak: '/reels/Reel5.png',
  DRrCmGeDNda: '/reels/Reel6.png',
};

export function getReelPreview(id: string): string {
  return REEL_PREVIEWS[id] ?? '/reels/Reel1.png';
}

export const DRAGGABLE_CLIENT_ITEMS = [
  { src: '/clients/CLIENT-1.jpeg', title: 'Client 1' },
  { src: '/clients/CLIENT-2.jpeg', title: 'Client 2' },
  { src: '/clients/CLIENT-3.jpeg', title: 'Client 3' },
  { src: '/clients/CLIENT-4.jpeg', title: 'Client 4' },
  { src: '/clients/CLIENT-5.jpeg', title: 'Client 5' },
  { src: '/clients/CLIENT-6.jpeg', title: 'Client 6' },
] as const;
