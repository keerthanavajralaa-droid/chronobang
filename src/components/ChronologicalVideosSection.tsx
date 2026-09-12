import React, { useState, useMemo } from 'react';
import { BtsVideo, EraTag } from '../types';
import { BTS_VIDEOS } from '../data/btsVideos';
import { Youtube, ExternalLink, Play, Search, Filter, ArrowUpDown, Calendar, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

interface ChronologicalVideosProps {
  onOpenVideoModal: (video: BtsVideo) => void;
  onToggleFavorite: (id: string, type: 'video') => void;
  isFavorite: (id: string) => boolean;
}

export const ChronologicalVideosSection: React.FC<ChronologicalVideosProps> = ({
  onOpenVideoModal,
  onToggleFavorite,
  isFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'chronological' | 'reverse'>('chronological');
  const [showBuOnly, setShowBuOnly] = useState(false);

  const eras: { label: string; value: string }[] = [
    { label: 'All Eras', value: 'all' },
    { label: 'School Trilogy (2013-14)', value: 'School Trilogy (2013-2014)' },
    { label: 'DARK & WILD (2014)', value: 'DARK & WILD (2014)' },
    { label: 'HYYH / Youth (2015-16)', value: 'HYYH / Youth (2015-2016)' },
    { label: 'WINGS & YNWA (2016-17)', value: 'WINGS & YNWA (2016-2017)' },
    { label: 'Love Yourself (2017-18)', value: 'Love Yourself (2017-2018)' },
    { label: 'Map of the Soul (2019-20)', value: 'Map of the Soul (2019-2020)' },
    { label: 'Dynamite & BE (2020)', value: 'Dynamite & BE (2020)' },
    { label: 'Butter & PTD (2021)', value: 'Butter & PTD (2021)' },
    { label: 'Proof & Chapter 2 (2022+)', value: 'Proof & Chapter 2 (2022-Present)' },
  ];

  const types = ['all', 'Title Track', 'B-Side', 'Solo / Sub-unit', 'Collaboration', 'Special'];

  // Filter & Sort
  const filteredVideos = useMemo(() => {
    let list = [...BTS_VIDEOS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          (v.koreanTitle && v.koreanTitle.toLowerCase().includes(q)) ||
          v.album.toLowerCase().includes(q) ||
          v.year.toString().includes(q)
      );
    }

    if (selectedEra !== 'all') {
      list = list.filter((v) => v.era === selectedEra);
    }

    if (selectedType !== 'all') {
      list = list.filter((v) => v.type === selectedType);
    }

    if (showBuOnly) {
      list = list.filter((v) => v.buRelated);
    }

    list.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'chronological' ? dateA - dateB : dateB - dateA;
    });

    return list;
  }, [searchQuery, selectedEra, selectedType, sortOrder, showBuOnly]);

  const years = useMemo(() => {
    const set = new Set(BTS_VIDEOS.map((v) => v.year));
    return Array.from(set).sort((a, b) => a - b);
  }, []);

  return (
    <section id="videos" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700/40 text-purple-300 text-xs font-semibold mb-2">
              <Youtube className="w-3.5 h-3.5 text-red-400" />
              <span>Official YouTube Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Chronological BTS Music Videos
            </h2>
            <p className="text-sm sm:text-base text-purple-300/80 mt-1 max-w-2xl">
              Arranged in chronological order from their 2013 debut to the present. Every video links directly to YouTube with authentic high-res thumbnails and release details.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-3 bg-purple-950/60 border border-purple-800/40 px-4 py-2.5 rounded-2xl text-xs text-purple-200">
            <div>
              <span className="font-bold text-white text-base mr-1">{BTS_VIDEOS.length}</span>
              <span className="text-purple-400">Total MVs</span>
            </div>
            <div className="h-5 w-px bg-purple-800/50" />
            <div>
              <span className="font-bold text-white text-base mr-1">2013 - 2024+</span>
              <span className="text-purple-400">Timeline</span>
            </div>
          </div>
        </div>

        {/* Chronological Year Jump Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none text-xs">
          <span className="text-purple-400/80 uppercase tracking-wider font-semibold whitespace-nowrap mr-1">
            Years:
          </span>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => {
                setSearchQuery(year.toString());
                setSelectedEra('all');
              }}
              className={`px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                searchQuery === year.toString()
                  ? 'bg-purple-600 border-purple-500 text-white font-bold'
                  : 'bg-purple-950/50 border-purple-800/40 text-purple-300 hover:bg-purple-900/60'
              }`}
            >
              {year}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-purple-400 underline hover:text-purple-200 text-xs ml-2 cursor-pointer whitespace-nowrap"
            >
              Reset Year
            </button>
          )}
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-[#150e27] p-4 sm:p-5 rounded-2xl border border-purple-800/40 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search song, album, or Hangul title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-purple-950/60 border border-purple-700/40 rounded-xl text-sm text-purple-100 placeholder-purple-400/60 focus:outline-none focus:border-purple-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-purple-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Era Dropdown */}
            <div className="md:col-span-4">
              <select
                value={selectedEra}
                onChange={(e) => setSelectedEra(e.target.value)}
                aria-label="Filter by BTS Era"
                className="w-full px-3 py-2.5 bg-purple-950/60 border border-purple-700/40 rounded-xl text-sm text-purple-100 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {eras.map((era) => (
                  <option key={era.value} value={era.value} className="bg-[#150e27] text-purple-200">
                    {era.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by Video Type"
                className="w-full px-3 py-2.5 bg-purple-950/60 border border-purple-700/40 rounded-xl text-sm text-purple-100 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="all" className="bg-[#150e27]">All Types</option>
                <option value="Title Track" className="bg-[#150e27]">Title Tracks</option>
                <option value="B-Side" className="bg-[#150e27]">B-Sides</option>
                <option value="Solo / Sub-unit" className="bg-[#150e27]">Solos</option>
                <option value="Collaboration" className="bg-[#150e27]">Collabs</option>
                <option value="Special" className="bg-[#150e27]">Special</option>
              </select>
            </div>

            {/* Sort Order Toggle */}
            <div className="md:col-span-2 flex items-center gap-2">
              <button
                onClick={() => setSortOrder(sortOrder === 'chronological' ? 'reverse' : 'chronological')}
                className="w-full py-2.5 px-3 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-700/40 text-xs font-semibold text-purple-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Toggle chronological vs reverse chronological order"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>{sortOrder === 'chronological' ? 'Oldest First (13→)' : 'Newest First (→24)'}</span>
              </button>
            </div>
          </div>

          {/* Quick Filters: BU Lore & Active Filter tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-purple-900/40 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowBuOnly(!showBuOnly)}
                className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showBuOnly
                    ? 'bg-purple-600 border-purple-400 text-white font-semibold'
                    : 'bg-purple-950/60 border-purple-800/40 text-purple-300 hover:text-white'
                }`}
              >
                <span>🎬 BU Lore Canon Only</span>
                {showBuOnly && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="text-purple-300/80">
              Showing <span className="font-bold text-purple-100">{filteredVideos.length}</span> of {BTS_VIDEOS.length} videos
            </div>
          </div>
        </div>

        {/* Videos Grid: Arranged in Chronological Order */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-16 bg-[#160d29] rounded-3xl border border-purple-800/30">
            <p className="text-lg text-purple-200 font-semibold">No videos found matching your filter</p>
            <p className="text-sm text-purple-400 mt-1">Try clearing your search query or selecting 'All Eras'</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedEra('all');
                setSelectedType('all');
                setShowBuOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold cursor-pointer hover:bg-purple-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video, index) => {
              const formattedDate = new Date(video.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={video.id}
                  className="group rounded-2xl bg-[#170e2c] border border-purple-800/30 hover:border-purple-500/50 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-900/20 flex flex-col justify-between"
                >
                  {/* Thumbnail & YouTube Overlay */}
                  <div className="relative aspect-video overflow-hidden bg-purple-950">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Timeline Sequence Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-purple-700/50 text-[11px] font-bold text-purple-200 flex items-center gap-1">
                      <span>#{index + 1}</span>
                      <span className="text-purple-400">•</span>
                      <span>{video.year}</span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => onToggleFavorite(video.id, 'video')}
                      className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-purple-300 hover:text-white transition-colors cursor-pointer"
                      title="Save to Favorites"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorite(video.id) ? 'fill-purple-400 text-purple-400' : ''
                        }`}
                      />
                    </button>

                    {/* Hover play buttons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4">
                      {/* Open in YouTube in new tab */}
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer transform group-hover:scale-105 transition-transform"
                      >
                        <Youtube className="w-4 h-4" />
                        <span>Watch on YT</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* In-app Preview Modal */}
                      <button
                        onClick={() => onOpenVideoModal(video)}
                        className="px-3 py-2 rounded-xl bg-purple-900/90 hover:bg-purple-800 text-purple-100 font-semibold text-xs flex items-center gap-1 backdrop-blur-sm border border-purple-600/40 cursor-pointer"
                        title="Watch preview directly in app"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Preview</span>
                      </button>
                    </div>

                    {/* Era & BU Tag bottom pills */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-950/90 backdrop-blur-sm text-purple-300 border border-purple-800/60">
                        {video.type}
                      </span>
                      {video.buRelated && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-900/90 text-indigo-200 border border-indigo-700/60">
                          BU Canon 🌀
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-purple-400 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formattedDate}</span>
                      </div>

                      <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                        {video.title}
                      </h3>

                      {video.koreanTitle && (
                        <p className="text-xs text-purple-300/80 mb-2">{video.koreanTitle}</p>
                      )}

                      <p className="text-xs text-purple-300/70 line-clamp-2 mt-1">
                        {video.description}
                      </p>
                    </div>

                    {/* Footer: Album, Views & YouTube Button */}
                    <div className="mt-4 pt-3 border-t border-purple-900/40 flex items-center justify-between">
                      <span className="text-[11px] text-purple-400 truncate max-w-[130px]" title={video.album}>
                        {video.album}
                      </span>

                      {/* Direct YouTube Redirection Button */}
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer group-hover:underline"
                      >
                        <Youtube className="w-3.5 h-3.5" />
                        <span>YouTube</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
