import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SongOfTheDay } from '../types';
import { BTS_SONGS } from '../data/btsSongs';
import { Shuffle, ExternalLink, Play, Pause, Disc3, Heart, Sparkles, Volume2, Info, Clock, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SongOfTheDayProps {
  onToggleFavorite: (id: string, type: 'song') => void;
  isFavorite: (id: string) => boolean;
}

export const SongOfTheDaySection: React.FC<SongOfTheDayProps> = ({
  onToggleFavorite,
  isFavorite,
}) => {
  // Deterministic daily song based on day of year, but user can shuffle endlessly
  const getInitialSongIndex = () => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return dayOfYear % BTS_SONGS.length;
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialSongIndex);
  const [isAutoShuffling, setIsAutoShuffling] = useState(true);
  const [shuffleIntervalSeconds, setShuffleIntervalSeconds] = useState(15);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showEmbeddedPlayer, setShowEmbeddedPlayer] = useState(false);
  const [isShufflingAnimation, setIsShufflingAnimation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const song = BTS_SONGS[currentIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to shuffle to a random different song
  const shuffleToNewSong = useCallback(() => {
    setIsShufflingAnimation(true);
    let nextIndex = Math.floor(Math.random() * BTS_SONGS.length);
    if (nextIndex === currentIndex && BTS_SONGS.length > 1) {
      nextIndex = (currentIndex + 1) % BTS_SONGS.length;
    }
    
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsShufflingAnimation(false);
      setTimeLeft(shuffleIntervalSeconds);
    }, 280);
  }, [currentIndex, shuffleIntervalSeconds]);

  // Handle manual click
  const handleManualShuffle = () => {
    shuffleToNewSong();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.35 },
      colors: ['#c084fc', '#a855f7', '#d8b4fe'],
    });
  };

  // Timer effect for continuous auto-shuffling
  useEffect(() => {
    if (!isAutoShuffling) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          shuffleToNewSong();
          return shuffleIntervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoShuffling, shuffleIntervalSeconds, shuffleToNewSong]);

  const copyTrackLink = () => {
    navigator.clipboard.writeText(song.spotifyUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const progressPercent = ((shuffleIntervalSeconds - timeLeft) / shuffleIntervalSeconds) * 100;

  return (
    <section id="song-of-the-day" className="relative py-8 sm:py-12">
      {/* Background lavender nebula aura */}
      <div className="absolute inset-0 bg-radial from-purple-900/25 via-transparent to-transparent pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/50 text-purple-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>Continuous Shuffling Radio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>BTS Song of the Day</span>
              <span className="text-sm font-normal text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-800/60">
                #{currentIndex + 1} of {BTS_SONGS.length}
              </span>
            </h2>
            <p className="text-sm text-purple-300/80 mt-1 max-w-xl">
              Continuously rotates through BTS discography classics, emotional ballads, and solo hits with lyrics and instant Spotify redirection.
            </p>
          </div>

          {/* Controls: Auto Shuffle Toggle & Speed */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#170e2c]/80 p-2 rounded-2xl border border-purple-800/40">
            <button
              onClick={() => setIsAutoShuffling(!isAutoShuffling)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isAutoShuffling
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-purple-950/60 text-purple-300 hover:bg-purple-900/50'
              }`}
            >
              {isAutoShuffling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoShuffling ? 'Auto-Shuffling ON' : 'Auto-Shuffle Paused'}</span>
            </button>

            {isAutoShuffling && (
              <div className="flex items-center gap-1.5 text-xs text-purple-300 px-2">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Next in {timeLeft}s</span>
              </div>
            )}

            <button
              onClick={handleManualShuffle}
              disabled={isShufflingAnimation}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-purple-900/40 cursor-pointer disabled:opacity-50"
            >
              <Shuffle className={`w-3.5 h-3.5 ${isShufflingAnimation ? 'animate-spin' : ''}`} />
              <span>Shuffle Now</span>
            </button>
          </div>
        </div>

        {/* Progress bar for auto-shuffling */}
        {isAutoShuffling && (
          <div className="w-full h-1 bg-purple-950/80 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-violet-400 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Main Card: Lavender Theme with Glassmorphism */}
        <div className={`relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#1b1035] via-[#160c2b] to-[#120924] border border-purple-700/40 shadow-2xl lavender-glow transition-all duration-300 ${
          isShufflingAnimation ? 'scale-[0.99] opacity-75' : 'scale-100 opacity-100'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left: Album Cover & Animated Vinyl */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative group w-48 h-48 sm:w-56 sm:h-56">
                {/* Vinyl record slipping out */}
                <div className={`absolute inset-0 translate-x-8 rounded-full bg-[#0a0514] border-4 border-purple-900/70 shadow-xl flex items-center justify-center transition-transform duration-700 pointer-events-none ${
                  isAutoShuffling ? 'rotate-[360deg] animate-spin' : 'rotate-45'
                }`} style={{ animationDuration: '8s' }}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-800 to-violet-600 border-2 border-purple-950 flex items-center justify-center">
                    <Disc3 className="w-8 h-8 text-purple-200" />
                  </div>
                </div>

                {/* Album Cover */}
                <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-purple-950">
                  <img
                    src={song.albumArt}
                    alt={song.album}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-purple-200">
                    <span className="font-semibold px-2 py-0.5 rounded-md bg-purple-900/80 backdrop-blur-sm border border-purple-700/50">
                      {song.releaseYear}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-900/80 backdrop-blur-sm text-[11px] text-purple-300">
                      {song.tempo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Audio Equalizer visual simulation */}
              <div className="flex items-center gap-1 mt-6 h-6">
                {[40, 75, 100, 60, 85, 45, 95, 30, 80, 50, 90, 65].map((height, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-purple-400"
                    style={{
                      height: isAutoShuffling ? `${(height * (i % 3 + 1)) % 100}%` : '20%',
                      opacity: 0.7 + (i % 4) * 0.1,
                      transition: 'height 0.4s ease',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Song Information, Lyrics, Trivia & Spotify Actions */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                {/* Mood Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {song.mood.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200 border border-purple-700/40"
                    >
                      #{m}
                    </span>
                  ))}
                  {song.memberHighlight && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet-950/70 text-violet-300 border border-violet-800/40">
                      💜 {song.memberHighlight}
                    </span>
                  )}
                </div>

                {/* Title & Hangul */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {song.title}
                    </h3>
                    {song.koreanTitle && (
                      <p className="text-lg text-purple-300 font-medium mt-0.5">
                        {song.koreanTitle}
                      </p>
                    )}
                  </div>

                  {/* Favorite / Bookmark */}
                  <button
                    onClick={() => onToggleFavorite(song.id, 'song')}
                    className="p-3 rounded-2xl bg-purple-950/80 hover:bg-purple-900/80 border border-purple-700/50 text-purple-200 transition-colors cursor-pointer"
                    title="Add to My BTS Favorites"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite(song.id)
                          ? 'fill-purple-400 text-purple-400 scale-110'
                          : 'text-purple-300'
                      }`}
                    />
                  </button>
                </div>

                {/* Album subtitle */}
                <p className="text-sm sm:text-base text-purple-300/80 mt-1 flex items-center gap-2">
                  <span>Album:</span>
                  <span className="font-semibold text-purple-100">{song.album}</span>
                </p>

                {/* Lyrics Excerpt Card */}
                <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-purple-950/50 border border-purple-800/40 relative">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1.5 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Iconic Lyrics Excerpt</span>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-purple-100 italic">
                    “{song.lyricSnippetKr}”
                  </p>
                  <p className="text-xs sm:text-sm text-purple-300/90 mt-1">
                    "{song.lyricSnippetEn}"
                  </p>
                </div>

                {/* Trivia Note */}
                <div className="mt-4 flex items-start gap-2 text-xs text-purple-300/80">
                  <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <p>{song.trivia}</p>
                </div>
              </div>

              {/* ACTION BAR: Big Spotify Redirection Button */}
              <div className="mt-8 pt-6 border-t border-purple-800/40 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Primary Spotify Redirect Button */}
                  <a
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-2xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-lg shadow-[#1DB954]/25 hover:scale-102 cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.307c-.218.358-.684.47-1.042.252-2.856-1.745-6.452-2.14-10.686-1.172-.41.094-.817-.16-.91-.57-.094-.41.16-.818.57-.912 4.636-1.06 8.608-.61 11.816 1.36.358.218.47.684.252 1.042zm1.472-3.272c-.274.444-.86.586-1.304.312-3.27-2.01-8.254-2.592-12.122-1.417-.497.15-1.025-.137-1.176-.634-.15-.497.137-1.025.634-1.176 4.417-1.34 9.91-.69 13.656 1.61.444.275.586.86.312 1.305zm.126-3.41c-3.92-2.328-10.38-2.542-14.126-1.405-.6.182-1.24-.166-1.422-.767-.182-.6.166-1.24.767-1.422 4.306-1.307 11.436-1.054 15.93 1.614.538.32.713 1.02.394 1.558-.32.538-1.02.713-1.558.394z"/>
                    </svg>
                    <span>Listen on Spotify</span>
                    <ExternalLink className="w-4 h-4 text-black/70" />
                  </a>

                  {/* Toggle Embedded Mini Player */}
                  <button
                    onClick={() => setShowEmbeddedPlayer(!showEmbeddedPlayer)}
                    className="px-4 py-3 rounded-2xl bg-purple-900/60 hover:bg-purple-800/70 border border-purple-700/50 text-purple-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    {showEmbeddedPlayer ? 'Hide In-App Player' : 'Preview Player Here'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyTrackLink}
                    className="px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/50 text-xs text-purple-300 border border-purple-800/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                    <span>{copiedLink ? 'Link Copied!' : 'Copy Spotify Link'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Embedded Spotify Player */}
          {showEmbeddedPlayer && (
            <div className="mt-6 pt-6 border-t border-purple-800/40">
              <div className="flex items-center justify-between mb-3 text-xs text-purple-300">
                <span>Spotify Web Embed Preview</span>
                <span className="text-purple-400">Clicking play connects to your Spotify account</span>
              </div>
              <iframe
                src={`https://open.spotify.com/embed/track/${song.spotifyTrackId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl shadow-lg border border-purple-800/50"
                title={`Spotify Player: ${song.title}`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
