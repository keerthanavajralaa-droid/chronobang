import React, { useState, useMemo } from 'react';
import { BtsEpisode, SeriesCategory } from '../types';
import { BTS_EPISODES } from '../data/btsEpisodes';
import { Tv, Play, ExternalLink, Sparkles, Youtube, CheckCircle, Search, Flame, Award } from 'lucide-react';

interface EpisodesSectionProps {
  onOpenEpisodePreview?: (youtubeId: string, title: string) => void;
}

export const EpisodesSection: React.FC<EpisodesSectionProps> = ({
  onOpenEpisodePreview,
}) => {
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const seriesTabs: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Shows & Series', count: BTS_EPISODES.length },
    { id: 'run_bts', label: 'Run BTS! (달려라 방탄)', count: BTS_EPISODES.filter(e => e.series === 'run_bts').length },
    { id: 'in_the_soop', label: 'In the SOOP', count: BTS_EPISODES.filter(e => e.series === 'in_the_soop').length },
    { id: 'bon_voyage', label: 'Bon Voyage', count: BTS_EPISODES.filter(e => e.series === 'bon_voyage').length },
    { id: 'suchwita', label: 'Suchwita (슈취타)', count: BTS_EPISODES.filter(e => e.series === 'suchwita').length },
    { id: 'docuseries', label: 'Burn The Stage & Docs', count: BTS_EPISODES.filter(e => e.series === 'docuseries').length },
    { id: 'classic_variety', label: 'Rookie Classics', count: BTS_EPISODES.filter(e => e.series === 'classic_variety').length },
  ];

  const filteredEpisodes = useMemo(() => {
    return BTS_EPISODES.filter((ep) => {
      const matchesCategory = selectedSeries === 'all' || ep.series === selectedSeries;
      const matchesSearch =
        searchQuery.trim() === '' ||
        ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.seriesName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.iconicMoments.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedSeries, searchQuery]);

  return (
    <section id="episodes" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700/40 text-purple-300 text-xs font-semibold mb-2">
              <Tv className="w-3.5 h-3.5 text-purple-400" />
              <span>Variety & Reality Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              BTS Episodes & Shows
            </h2>
            <p className="text-sm sm:text-base text-purple-300/80 mt-1 max-w-2xl">
              From the chaotic laugh-until-you-cry games of Run BTS! to peaceful lake mornings on In the SOOP and intimate Suchwita talks.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search episodes, zombies, waterpark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-purple-950/60 border border-purple-700/40 rounded-xl text-xs sm:text-sm text-purple-100 placeholder-purple-400/60 focus:outline-none focus:border-purple-500"
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
        </div>

        {/* Series Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none text-xs sm:text-sm">
          {seriesTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSeries(tab.id)}
              className={`px-4 py-2 rounded-xl border whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedSeries === tab.id
                  ? 'bg-purple-600 border-purple-500 text-white font-semibold shadow-md shadow-purple-600/30'
                  : 'bg-[#150e27] border-purple-800/40 text-purple-300/80 hover:text-purple-100 hover:bg-purple-900/40'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedSeries === tab.id ? 'bg-purple-800 text-purple-200' : 'bg-purple-950 text-purple-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEpisodes.map((episode) => {
            const isYt = episode.platform === 'YouTube' || Boolean(episode.youtubeId);

            return (
              <div
                key={episode.id}
                className="group rounded-3xl bg-[#160e2b] border border-purple-800/35 hover:border-purple-600/60 p-5 sm:p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800/60">
                      {episode.seriesName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                        episode.essentialLevel === 'Must Watch 💜'
                          ? 'bg-purple-900/70 border-purple-500/60 text-purple-200'
                          : 'bg-purple-950/50 border-purple-800/40 text-purple-300'
                      }`}>
                        {episode.essentialLevel}
                      </span>
                    </div>
                  </div>

                  {/* Title & Episode Number */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {episode.title}
                  </h3>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 text-xs text-purple-400/90 mt-2 mb-3">
                    <span>{episode.releaseYear}</span>
                    <span>•</span>
                    <span>{episode.duration}</span>
                    <span>•</span>
                    <span className="text-purple-300 font-medium italic">{episode.vibe}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                    {episode.summary}
                  </p>

                  {/* Iconic Moments List */}
                  <div className="mt-4 pt-3 border-t border-purple-900/40">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>Iconic Moments</span>
                    </div>
                    <ul className="space-y-1 text-xs text-purple-300/80">
                      {episode.iconicMoments.map((moment, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-purple-500 font-bold shrink-0">💜</span>
                          <span>{moment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer / Watch Buttons */}
                <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center justify-between gap-3">
                  <span className="text-xs text-purple-400 flex items-center gap-1">
                    <span>Platform:</span>
                    <span className="font-semibold text-purple-200">{episode.platform}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    {episode.youtubeId && onOpenEpisodePreview && (
                      <button
                        onClick={() => onOpenEpisodePreview(episode.youtubeId!, episode.title)}
                        className="px-3 py-1.5 rounded-xl bg-purple-900/70 hover:bg-purple-800 text-purple-200 text-xs font-semibold flex items-center gap-1 border border-purple-700/50 cursor-pointer"
                        title="Preview video here"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Preview</span>
                      </button>
                    )}

                    <a
                      href={episode.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                        isYt
                          ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/40'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950/40'
                      }`}
                    >
                      {isYt ? <Youtube className="w-3.5 h-3.5" /> : <Tv className="w-3.5 h-3.5" />}
                      <span>Watch Full Episode</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
