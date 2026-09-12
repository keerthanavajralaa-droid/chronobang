export type EraTag = 
  | 'School Trilogy (2013-2014)'
  | 'DARK & WILD (2014)'
  | 'HYYH / Youth (2015-2016)'
  | 'WINGS & YNWA (2016-2017)'
  | 'Love Yourself (2017-2018)'
  | 'Map of the Soul (2019-2020)'
  | 'Dynamite & BE (2020)'
  | 'Butter & PTD (2021)'
  | 'Proof & Chapter 2 (2022-Present)';

export interface BtsVideo {
  id: string;
  title: string;
  koreanTitle?: string;
  date: string; // YYYY-MM-DD
  year: number;
  era: EraTag;
  album: string;
  youtubeId: string;
  youtubeUrl: string;
  type: 'Title Track' | 'B-Side' | 'Solo / Sub-unit' | 'Collaboration' | 'Special';
  viewsText: string;
  description: string;
  buRelated?: boolean; // Bangtan Universe storyline
}

export type SeriesCategory = 
  | 'run_bts' 
  | 'in_the_soop' 
  | 'bon_voyage' 
  | 'suchwita' 
  | 'docuseries' 
  | 'classic_variety';

export interface BtsEpisode {
  id: string;
  series: SeriesCategory;
  seriesName: string;
  title: string;
  episodeNumber?: string | number;
  season?: number | string;
  releaseYear: number;
  duration: string;
  platform: 'YouTube' | 'Weverse' | 'V LIVE Archive';
  externalUrl: string;
  youtubeId?: string;
  thumbnailUrl?: string;
  summary: string;
  iconicMoments: string[];
  vibe: string;
  essentialLevel: 'Must Watch 💜' | 'Recommended' | 'For Die-Hard ARMY';
}

export interface ViewingPhaseItem {
  order: number;
  title: string;
  type: 'Music Video' | 'Short Film' | 'Show Episode' | 'Docuseries' | 'Concert / Stage';
  year: string;
  url: string;
  whyWatch: string;
  loreOrContext?: string;
  isBuCanon?: boolean;
}

export interface ViewingGuide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  targetAudience: string;
  totalTime: string;
  description: string;
  color: string;
  items: ViewingPhaseItem[];
}

export interface SongOfTheDay {
  id: string;
  title: string;
  koreanTitle?: string;
  album: string;
  releaseYear: number;
  spotifyTrackId: string;
  spotifyUrl: string;
  albumArt: string;
  lyricSnippetKr: string;
  lyricSnippetEn: string;
  mood: string[];
  tempo: 'Chill & Comfort' | 'High Energy / Banger' | 'Emotional & Deep' | 'Funky & Uplifting';
  trivia: string;
  memberHighlight?: string;
}

export interface Member {
  id: string;
  stageName: string;
  realName: string;
  hangul: string;
  role: string;
  birthDate: string;
  zodiac: string;
  bt21: string;
  signatureQuote: string;
  soloWorks: string[];
  spotifyArtistUrl: string;
  accentColor: string;
}
