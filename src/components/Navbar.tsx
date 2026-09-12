import React from 'react';
import { Sparkles, Heart, Music, Film, Compass, Users, Tv, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  activeTab: 'all' | 'song-of-day' | 'videos' | 'episodes' | 'viewing-guide' | 'members';
  setActiveTab: (tab: 'all' | 'song-of-day' | 'videos' | 'episodes' | 'viewing-guide' | 'members') => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

interface NavItem {
  id: 'all' | 'song-of-day' | 'videos' | 'episodes' | 'viewing-guide' | 'members';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenFavorites,
}) => {
  const triggerBorahaeConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.2 },
      colors: ['#c084fc', '#a855f7', '#7e22ce', '#e9d5ff', '#fae8ff'],
    });
  };

  const navItems: NavItem[] = [
    { id: 'all', label: 'All-in-One Universe', icon: Sparkles },
    { id: 'song-of-day', label: 'Song of the Day', icon: Music, badge: 'Spotify' },
    { id: 'videos', label: 'Chronological Videos', icon: Film, badge: 'YouTube' },
    { id: 'episodes', label: 'Episodes & Shows', icon: Tv },
    { id: 'viewing-guide', label: 'Viewing Guide', icon: Compass, badge: 'BU Lore' },
    { id: 'members', label: '7 Members', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#120b22]/90 backdrop-blur-md border-b border-purple-900/40">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-purple-950 via-violet-900 to-purple-950 text-xs py-1.5 px-4 text-center border-b border-purple-800/30 text-purple-200 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-purple-400 animate-ping" />
        <span>Borahae! 💜 “I purple you” — BTS & ARMY Portal</span>
        <button
          onClick={triggerBorahaeConfetti}
          className="ml-2 px-2 py-0.5 rounded-full bg-purple-700/60 hover:bg-purple-600 text-[10px] font-semibold text-purple-100 transition-colors cursor-pointer inline-flex items-center gap-1"
          title="Send Purple Rain Confetti"
        >
          <span>Purple Sparkles ✨</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('all')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-400 flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform duration-300">
              <span className="font-bold text-white text-lg tracking-tighter">방탄</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-purple-200 via-purple-100 to-purple-300 bg-clip-text text-transparent">
                  BORAHAE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-purple-800/50 text-purple-300 border border-purple-700/50">
                  BTS Hub
                </span>
              </div>
              <p className="text-xs text-purple-400/80 hidden sm:block">
                Chronological Videos • Shows • Viewing Roadmap • Shuffling Songs
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenFavorites}
              className="relative px-3 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/50 border border-purple-700/40 text-purple-200 text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
              title="View Bookmarked Videos & Songs"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-purple-400 text-purple-400' : 'text-purple-300'}`} />
              <span className="hidden md:inline">Saved</span>
              {favoritesCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-purple-600 text-[11px] font-bold text-white flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <a
              href="https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/40 text-emerald-300 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <span>Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.youtube.com/@BTS"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-700/40 text-red-300 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <span>BANGTANTV</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                    : 'text-purple-300/80 hover:text-purple-100 hover:bg-purple-900/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                    isActive 
                      ? 'bg-purple-800 text-purple-200' 
                      : 'bg-purple-950 text-purple-400 border border-purple-800/40'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
