import React, { useState, useEffect } from 'react';
import { ViewingGuide, ViewingPhaseItem } from '../types';
import { VIEWING_GUIDES } from '../data/btsViewingGuide';
import { Compass, CheckCircle2, Circle, ExternalLink, Play, Sparkles, BookOpen, Clock, Award, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ViewingGuideSectionProps {
  onOpenVideoLink?: (url: string, title: string) => void;
}

export const ViewingGuideSection: React.FC<ViewingGuideSectionProps> = ({
  onOpenVideoLink,
}) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(VIEWING_GUIDES[0].id);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('borahae_viewing_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentGuide = VIEWING_GUIDES.find((g) => g.id === selectedGuideId) || VIEWING_GUIDES[0];

  useEffect(() => {
    try {
      localStorage.setItem('borahae_viewing_progress', JSON.stringify(completedItems));
    } catch {
      // ignore
    }
  }, [completedItems]);

  const toggleItemCompleted = (guideId: string, itemOrder: number) => {
    const key = `${guideId}_${itemOrder}`;
    const nextState = !completedItems[key];
    setCompletedItems((prev) => ({
      ...prev,
      [key]: nextState,
    }));

    if (nextState) {
      confetti({
        particleCount: 20,
        spread: 35,
        origin: { y: 0.6 },
        colors: ['#c084fc', '#a855f7', '#7c3aed'],
      });
    }
  };

  const calculateGuideProgress = (guide: ViewingGuide) => {
    const total = guide.items.length;
    let done = 0;
    guide.items.forEach((item) => {
      if (completedItems[`${guide.id}_${item.order}`]) done++;
    });
    return { done, total, percent: Math.round((done / total) * 100) };
  };

  const progress = calculateGuideProgress(currentGuide);

  return (
    <section id="viewing-guide" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700/40 text-purple-300 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Curated ARMY Viewing Roadmaps</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Preferred Order of Viewing
          </h2>
          <p className="text-sm sm:text-base text-purple-300/80 mt-1 max-w-3xl">
            Whether you want to understand the time-travel tragedy of the Bangtan Universe (BU), trace their 10-year career step-by-step, laugh through healing variety, or follow a 7-day baby ARMY starter path.
          </p>
        </div>

        {/* Guide Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {VIEWING_GUIDES.map((guide) => {
            const isSelected = guide.id === selectedGuideId;
            const gProgress = calculateGuideProgress(guide);

            return (
              <button
                key={guide.id}
                onClick={() => setSelectedGuideId(guide.id)}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-900/80 to-indigo-950 border-purple-500 shadow-lg shadow-purple-900/30'
                    : 'bg-[#150e27]/80 border-purple-800/40 hover:border-purple-700/60 hover:bg-[#191130]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-950/80 border border-purple-700/40 text-purple-300">
                      {guide.badge}
                    </span>
                    <span className="text-xs text-purple-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.totalTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-white leading-tight">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-purple-300/70 mt-1 line-clamp-1">
                    {guide.subtitle}
                  </p>
                </div>

                {/* Micro progress indicator */}
                <div className="mt-4 pt-3 border-t border-purple-900/40 flex items-center justify-between text-[11px]">
                  <span className="text-purple-300">
                    {gProgress.done}/{gProgress.total} watched
                  </span>
                  <span className="font-bold text-purple-200">{gProgress.percent}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Guide Banner Card */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-950/90 via-[#1a0f35] to-purple-950/90 border border-purple-700/50 p-6 sm:p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-purple-300">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Audience: {currentGuide.targetAudience}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentGuide.title}
              </h3>
              <p className="text-sm text-purple-300 font-medium mt-0.5">
                {currentGuide.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-purple-200/80 mt-3 leading-relaxed">
                {currentGuide.description}
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="shrink-0 bg-[#120924]/80 p-5 rounded-2xl border border-purple-800/50 min-w-[200px] text-center">
              <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider mb-1">
                Your Progress
              </div>
              <div className="text-3xl font-black text-white">
                {progress.percent}%
              </div>
              <div className="text-xs text-purple-300 mt-1">
                {progress.done} of {progress.total} items completed
              </div>
              <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden mt-3 border border-purple-800/40">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-violet-400 transition-all duration-500"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              {progress.percent === 100 && (
                <div className="mt-2 text-xs font-bold text-amber-300 flex items-center justify-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Roadmap Mastered! 💜</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step-by-Step Chronological Timeline Items */}
        <div className="relative border-l-2 border-purple-800/40 ml-4 sm:ml-6 space-y-6 sm:space-y-8">
          {currentGuide.items.map((item) => {
            const isCompleted = Boolean(completedItems[`${currentGuide.id}_${item.order}`]);

            return (
              <div key={item.order} className="relative pl-6 sm:pl-8 group">
                {/* Timeline node circle */}
                <button
                  onClick={() => toggleItemCompleted(currentGuide.id, item.order)}
                  className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-purple-600 border-purple-400 text-white scale-110 shadow-md shadow-purple-600/40'
                      : 'bg-[#120924] border-purple-700 text-purple-400 hover:border-purple-400 hover:text-white'
                  }`}
                  title={isCompleted ? 'Mark as unwatched' : 'Mark as watched'}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 fill-current" />
                  ) : (
                    <span className="text-xs font-bold">{item.order}</span>
                  )}
                </button>

                {/* Timeline Card */}
                <div className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                  isCompleted
                    ? 'bg-[#150d26]/80 border-purple-900/50 opacity-80'
                    : 'bg-[#180f30] border-purple-800/40 hover:border-purple-600/60 shadow-lg'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800/50">
                        Step {item.order}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-900/60 text-purple-200">
                        {item.type}
                      </span>
                      <span className="text-xs text-purple-400">{item.year}</span>
                      {item.isBuCanon && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                          BU Canon Lore ⏳
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleItemCompleted(currentGuide.id, item.order)}
                        className={`text-xs px-3 py-1 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                          isCompleted
                            ? 'bg-purple-900/50 border-purple-700/50 text-purple-200'
                            : 'bg-purple-950/60 border-purple-800/40 text-purple-300 hover:text-white'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-purple-300" /> : <Circle className="w-3.5 h-3.5" />}
                        <span>{isCompleted ? 'Watched' : 'Mark as Watched'}</span>
                      </button>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                      >
                        <span>Watch Video</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                    {item.title}
                  </h4>

                  {/* Why Watch Explanation */}
                  <div className="mt-3 p-3.5 rounded-xl bg-purple-950/50 border border-purple-800/30">
                    <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                      <strong className="text-purple-300 font-semibold mr-1">Why to watch:</strong>
                      {item.whyWatch}
                    </p>
                    {item.loreOrContext && (
                      <p className="text-xs text-purple-400/90 mt-2 italic flex items-start gap-1">
                        <span className="font-semibold text-purple-300 not-italic shrink-0">Lore note:</span>
                        <span>{item.loreOrContext}</span>
                      </p>
                    )}
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
