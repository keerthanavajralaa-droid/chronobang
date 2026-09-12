import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SongOfTheDaySection } from './components/SongOfTheDaySection';
import { ChronologicalVideosSection } from './components/ChronologicalVideosSection';
import { EpisodesSection } from './components/EpisodesSection';
import { ViewingGuideSection } from './components/ViewingGuideSection';
import { MembersSection } from './components/MembersSection';
import { VideoModal } from './components/VideoModal';
import { FavoritesModal } from './components/FavoritesModal';
import { Footer } from './components/Footer';
import { BtsVideo } from './types';
import { Sparkles, Heart, Music, Film, Compass, Tv, ArrowUp, ExternalLink, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'song-of-day' | 'videos' | 'episodes' | 'viewing-guide' | 'members'>('all');
  const [selectedVideo, setSelectedVideo] = useState<BtsVideo | null>(null);
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<{ id: string; type: 'video' | 'song' }[]>(() => {
    try {
      const saved = localStorage.getItem('borahae_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('borahae_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (id: string, type: 'video' | 'song') => {
    const exists = favorites.some((f) => f.id === id && f.type === type);
    if (exists) {
      setFavorites((prev) => prev.filter((f) => !(f.id === id && f.type === type)));
    } else {
      setFavorites((prev) => [...prev, { id, type }]);
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#c084fc', '#a855f7', '#7c3aed'],
      });
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch tab and smooth scroll to section if needed
  const handleTabChange = (tab: 'all' | 'song-of-day' | 'videos' | 'episodes' | 'viewing-guide' | 'members') => {
    setActiveTab(tab);
    if (tab === 'song-of-day') {
      document.getElementById('song-of-the-day')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'videos') {
      document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'episodes') {
      document.getElementById('episodes')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'viewing-guide') {
      document.getElementById('viewing-guide')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'members') {
      document.getElementById('members')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollToTop();
    }
  };

  return (
    <div className="min-h-screen bg-[#0e081c] text-purple-100 flex flex-col selection:bg-purple-600 selection:text-white relative">
      {/* Background celestial particles & lavender ambient aura */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-purple-700/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-violet-600/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-fuchsia-800/10 rounded-full blur-[100px]" />
      </div>

      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
      />

      {/* Hero Welcome Banner */}
      <div className="relative py-10 sm:py-16 overflow-hidden border-b border-purple-900/30 bg-gradient-to-b from-[#160c2b] to-[#0e081c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/60 border border-purple-600/40 text-purple-200 text-xs sm:text-sm font-semibold mb-5 shadow-lg shadow-purple-900/30">
            <Sparkles className="w-4 h-4 text-purple-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>The Ultimate BTS & ARMY Lavender Universe</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Welcome to the{' '}
            <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-fuchsia-300 bg-clip-text text-transparent">
              Borahae BTS Portal
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-purple-200/80 max-w-2xl mx-auto font-light leading-relaxed">
            Everything for ARMY in one dreamy lavender space: music videos arranged in chronological order with YouTube redirects, legendary show episodes, preferred viewing guides, and an auto-shuffling Song of the Day with Spotify redirection.
          </p>

          {/* Quick Action Navigation Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleTabChange('song-of-day')}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-900/40 cursor-pointer transition-all hover:scale-105"
            >
              <Music className="w-4 h-4" />
              <span>Song of the Day (Spotify)</span>
            </button>

            <button
              onClick={() => handleTabChange('videos')}
              className="px-5 py-2.5 rounded-2xl bg-purple-950/80 hover:bg-purple-900/80 border border-purple-700/50 text-purple-200 font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Film className="w-4 h-4 text-red-400" />
              <span>Chronological Videos (YouTube)</span>
            </button>

            <button
              onClick={() => handleTabChange('viewing-guide')}
              className="px-5 py-2.5 rounded-2xl bg-purple-950/80 hover:bg-purple-900/80 border border-purple-700/50 text-purple-200 font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Preferred Viewing Order</span>
            </button>

            <button
              onClick={() => handleTabChange('episodes')}
              className="px-5 py-2.5 rounded-2xl bg-purple-950/80 hover:bg-purple-900/80 border border-purple-700/50 text-purple-200 font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Tv className="w-4 h-4 text-purple-400" />
              <span>Episodes & Shows</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="flex-1 space-y-4">
        {/* Section 1: Song of the Day (Auto-Shuffling + Spotify Redirect) */}
        {(activeTab === 'all' || activeTab === 'song-of-day') && (
          <SongOfTheDaySection
            onToggleFavorite={(id) => toggleFavorite(id, 'song')}
            isFavorite={isFavorite}
          />
        )}

        {/* Section 2: Chronological BTS Videos (YouTube Redirect) */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <ChronologicalVideosSection
            onOpenVideoModal={(video) => setSelectedVideo(video)}
            onToggleFavorite={(id) => toggleFavorite(id, 'video')}
            isFavorite={isFavorite}
          />
        )}

        {/* Section 3: Preferred Order of Viewing Guide */}
        {(activeTab === 'all' || activeTab === 'viewing-guide') && (
          <ViewingGuideSection />
        )}

        {/* Section 4: Episodes & Variety Shows */}
        {(activeTab === 'all' || activeTab === 'episodes') && (
          <EpisodesSection
            onOpenEpisodePreview={(ytId, title) =>
              setSelectedVideo({
                id: ytId,
                title,
                date: '2023-01-01',
                year: 2023,
                era: 'Proof & Chapter 2 (2022-Present)',
                album: 'BANGTANTV Episode',
                youtubeId: ytId,
                youtubeUrl: `https://www.youtube.com/watch?v=${ytId}`,
                type: 'Special',
                viewsText: 'Official Episode',
                description: title,
              })
            }
          />
        )}

        {/* Section 5: The 7 Members & Fanchant */}
        {(activeTab === 'all' || activeTab === 'members') && (
          <MembersSection />
        )}
      </main>

      {/* Back to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-purple-600/90 hover:bg-purple-500 text-white shadow-xl shadow-purple-950/60 border border-purple-400/30 transition-all duration-300 hover:scale-110 cursor-pointer backdrop-blur-sm"
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Video Modal Preview */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        favorites={favorites}
        onRemoveFavorite={toggleFavorite}
        onSelectVideo={(videoId) => {
          // Open preview
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
