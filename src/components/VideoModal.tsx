import React from 'react';
import { X, Youtube, ExternalLink, Calendar, Eye } from 'lucide-react';
import { BtsVideo } from '../types';

interface VideoModalProps {
  video: BtsVideo | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-[#150d27] border border-purple-700/60 rounded-3xl overflow-hidden shadow-2xl lavender-border-glow animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-purple-800/40 bg-purple-950/40">
          <div className="flex items-center gap-2 pr-4">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-purple-900 text-purple-200 border border-purple-700/50">
              {video.year}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
              {video.title} {video.koreanTitle ? `(${video.koreanTitle})` : ''}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-purple-300 hover:text-white transition-colors cursor-pointer"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Embed Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Modal Footer with details and direct YouTube redirect button */}
        <div className="p-5 sm:p-6 bg-[#130b22] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-purple-300 mb-1">
              <span className="font-semibold text-purple-100">{video.album}</span>
              <span>•</span>
              <span>{video.era}</span>
              <span>•</span>
              <span className="text-purple-400">{video.viewsText}</span>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/80 line-clamp-2 max-w-2xl">
              {video.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-red-950/50 cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
