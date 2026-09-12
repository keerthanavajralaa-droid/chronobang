import React from 'react';
import { Heart, Sparkles, Youtube, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Footer: React.FC = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#c084fc', '#a855f7', '#7e22ce', '#fae8ff'],
    });
  };

  return (
    <footer className="relative bg-[#0d0718] border-t border-purple-900/50 pt-12 pb-16 text-purple-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-purple-900/40">
          {/* Col 1: Brand & Borahae Meaning */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-violet-400 flex items-center justify-center font-bold text-white text-sm">
                방탄
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                BORAHAE BTS UNIVERSE
              </span>
            </div>

            <p className="text-xs sm:text-sm text-purple-300/80 leading-relaxed">
              “Purple is the last color of the rainbow colors. Purple means I will trust and love you for a long time.” — V (Kim Taehyung), November 13, 2016.
            </p>

            <div className="pt-2">
              <button
                onClick={triggerConfetti}
                className="px-3.5 py-1.5 rounded-full bg-purple-900/60 hover:bg-purple-800 border border-purple-700/50 text-xs font-semibold text-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
                <span>Send Purple Love (보라해)</span>
              </button>
            </div>
          </div>

          {/* Col 2: Official BTS Channels */}
          <div className="md:col-span-4 space-y-2 text-xs sm:text-sm">
            <h4 className="font-bold uppercase tracking-wider text-purple-200 text-xs mb-3">
              Official Platforms
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.youtube.com/@BTS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-400" />
                  <span>BANGTANTV (Official YouTube)</span>
                  <ExternalLink className="w-3 h-3 text-purple-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-emerald-400 font-bold">●</span>
                  <span>BTS on Spotify</span>
                  <ExternalLink className="w-3 h-3 text-purple-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://weverse.io/bts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400 font-bold">●</span>
                  <span>BTS on Weverse Community</span>
                  <ExternalLink className="w-3 h-3 text-purple-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ibighit.com/bts/eng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-purple-400 font-bold">●</span>
                  <span>BIGHIT MUSIC Official BTS Website</span>
                  <ExternalLink className="w-3 h-3 text-purple-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: The BTS Fanchant */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-purple-200 text-xs mb-2">
              The Official Fanchant
            </h4>
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs font-semibold text-purple-200 space-y-1">
              <p>김남준 (Kim Namjoon)</p>
              <p>김석진 (Kim Seokjin)</p>
              <p>민윤기 (Min Yoongi)</p>
              <p>정호석 (Jung Hoseok)</p>
              <p>박지민 (Park Jimin)</p>
              <p>김태형 (Kim Taehyung)</p>
              <p>전정국 (Jeon Jungkook)</p>
              <p className="text-purple-300 font-black pt-1">BTS! 💜</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-purple-400/80">
          <p>
            Dedicated to BTS and ARMY worldwide. All official video and audio rights belong to BIGHIT MUSIC & HYBE.
          </p>
          <div className="flex items-center gap-1 text-purple-300 font-medium">
            <span>Made with purple love for ARMY</span>
            <Heart className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
