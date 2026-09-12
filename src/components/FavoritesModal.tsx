import React from 'react';
import { X, Heart, Play, Youtube, ExternalLink, Trash2 } from 'lucide-react';
import { BTS_VIDEOS } from '../data/btsVideos';
import { BTS_SONGS } from '../data/btsSongs';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: { id: string; type: 'video' | 'song' }[];
  onRemoveFavorite: (id: string, type: 'video' | 'song') => void;
  onSelectVideo: (videoId: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectVideo,
}) => {
  if (!isOpen) return null;

  const favoriteVideos = BTS_VIDEOS.filter((v) =>
    favorites.some((f) => f.type === 'video' && f.id === v.id)
  );

  const favoriteSongs = BTS_SONGS.filter((s) =>
    favorites.some((f) => f.type === 'song' && f.id === s.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-[#160e2b] border border-purple-700/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-purple-800/40 bg-purple-950/50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-purple-400 text-purple-400" />
            <h3 className="text-lg font-bold text-white">
              My Saved BTS Collection ({favorites.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-purple-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-purple-300">
              <Heart className="w-10 h-10 mx-auto text-purple-600/60 mb-2" />
              <p className="font-semibold text-base">No saved favorites yet</p>
              <p className="text-xs text-purple-400 mt-1">
                Click the heart icon on any music video or song of the day to pin it here.
              </p>
            </div>
          ) : (
            <>
              {/* Saved Videos */}
              {favoriteVideos.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
                    Favorite Music Videos ({favoriteVideos.length})
                  </h4>
                  <div className="space-y-2.5">
                    {favoriteVideos.map((video) => (
                      <div
                        key={video.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-600/50 transition-colors gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`}
                            alt={video.title}
                            className="w-16 h-10 object-cover rounded-lg shrink-0 border border-purple-800/50"
                          />
                          <div className="truncate">
                            <p className="text-sm font-bold text-white truncate">
                              {video.title}
                            </p>
                            <p className="text-xs text-purple-400 truncate">
                              {video.year} • {video.album}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                            title="Watch on YouTube"
                          >
                            <Youtube className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => onRemoveFavorite(video.id, 'video')}
                            className="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800 text-purple-400 hover:text-red-400 transition-colors cursor-pointer"
                            title="Remove from favorites"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Songs */}
              {favoriteSongs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
                    Saved Songs ({favoriteSongs.length})
                  </h4>
                  <div className="space-y-2.5">
                    {favoriteSongs.map((song) => (
                      <div
                        key={song.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-600/50 transition-colors gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={song.albumArt}
                            alt={song.title}
                            className="w-10 h-10 object-cover rounded-lg shrink-0 border border-purple-800/50"
                          />
                          <div className="truncate">
                            <p className="text-sm font-bold text-white truncate">
                              {song.title}
                            </p>
                            <p className="text-xs text-purple-400 truncate">
                              {song.album} ({song.releaseYear})
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={song.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1 text-xs font-semibold"
                            title="Listen on Spotify"
                          >
                            <span>Spotify</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => onRemoveFavorite(song.id, 'song')}
                            className="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800 text-purple-400 hover:text-red-400 transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
