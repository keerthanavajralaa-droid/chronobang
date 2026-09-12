import React, { useState } from 'react';
import { Member } from '../types';
import { BTS_MEMBERS } from '../data/btsMembers';
import { Users, ExternalLink, Sparkles, Heart, Quote, Music, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MembersSection: React.FC = () => {
  const [activeFanchantIndex, setActiveFanchantIndex] = useState<number | null>(null);

  const triggerFanchantStep = (index: number) => {
    setActiveFanchantIndex(index);
    confetti({
      particleCount: 15,
      spread: 30,
      origin: { y: 0.7 },
      colors: ['#c084fc', '#a855f7', '#d8b4fe'],
    });
    setTimeout(() => {
      setActiveFanchantIndex(null);
    }, 1200);
  };

  const chantAll = () => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < BTS_MEMBERS.length) {
        setActiveFanchantIndex(step);
        step++;
      } else {
        clearInterval(interval);
        setActiveFanchantIndex(99); // BTS chant
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#e9d5ff', '#c084fc', '#a855f7', '#7e22ce'],
        });
        setTimeout(() => setActiveFanchantIndex(null), 1500);
      }
    }, 400);
  };

  return (
    <section id="members" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700/40 text-purple-300 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>Seven Members, One Heart</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The 7 Members of BTS
            </h2>
            <p className="text-sm sm:text-base text-purple-300/80 mt-1 max-w-2xl">
              Meet RM, Jin, SUGA, j-hope, Jimin, V, and Jung Kook. Explore their signature roles, BT21 counterparts, solo discographies, and individual Spotify profiles.
            </p>
          </div>

          {/* Interactive Fanchant Banner */}
          <div className="bg-[#180f30] p-3 rounded-2xl border border-purple-800/40 flex items-center gap-3">
            <button
              onClick={chantAll}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-900/40 cursor-pointer flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Chant Fanchant!</span>
            </button>
            <span className="text-xs text-purple-300/90 hidden sm:inline">
              Kim Namjoon • Kim Seokjin • Min Yoongi • Jung Hoseok • Park Jimin • Kim Taehyung • Jeon Jungkook • BTS!
            </span>
          </div>
        </div>

        {/* Fanchant Pills interactive bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none text-xs">
          {BTS_MEMBERS.map((member, idx) => (
            <button
              key={member.id}
              onClick={() => triggerFanchantStep(idx)}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap font-bold ${
                activeFanchantIndex === idx
                  ? 'bg-purple-500 border-purple-300 text-white scale-110 shadow-lg shadow-purple-600/50'
                  : 'bg-purple-950/60 border-purple-800/40 text-purple-300 hover:bg-purple-900/60'
              }`}
            >
              {member.realName.toUpperCase()}!
            </button>
          ))}
          <button
            onClick={() => triggerFanchantStep(99)}
            className={`px-4 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap font-extrabold ${
              activeFanchantIndex === 99
                ? 'bg-purple-600 border-purple-300 text-white scale-115 shadow-xl shadow-purple-600/60'
                : 'bg-purple-900/70 border-purple-700/50 text-purple-200 hover:bg-purple-800'
            }`}
          >
            BTS! 💜
          </button>
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {BTS_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="rounded-3xl bg-[#160d2a] border border-purple-800/40 hover:border-purple-600/60 p-5 sm:p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                {/* Header: Stage Name & Hangul */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                        {member.stageName}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800/50 font-medium">
                        {member.hangul}
                      </span>
                    </div>
                    <p className="text-xs text-purple-400 font-semibold mt-0.5">
                      {member.realName}
                    </p>
                  </div>

                  <span
                    className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: member.accentColor }}
                    title={`Signature Theme Color`}
                  />
                </div>

                {/* Role & Birthday */}
                <div className="space-y-1 text-xs text-purple-300/80 mb-4 bg-purple-950/40 p-3 rounded-xl border border-purple-900/40">
                  <p>
                    <strong className="text-purple-200">Role:</strong> {member.role}
                  </p>
                  <p>
                    <strong className="text-purple-200">Birthday:</strong> {member.birthDate} ({member.zodiac})
                  </p>
                  <p>
                    <strong className="text-purple-200">BT21:</strong> {member.bt21}
                  </p>
                </div>

                {/* Signature Quote */}
                <div className="relative p-3.5 rounded-xl bg-purple-950/60 border border-purple-800/30 mb-4">
                  <Quote className="w-4 h-4 text-purple-400/50 mb-1" />
                  <p className="text-xs text-purple-100 italic leading-relaxed">
                    “{member.signatureQuote}”
                  </p>
                </div>

                {/* Solo Discography highlights */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1.5 flex items-center gap-1">
                    <Music className="w-3 h-3 text-purple-400" />
                    <span>Solo Works</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.soloWorks.slice(0, 3).map((work) => (
                      <span
                        key={work}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-purple-900/40 text-purple-300 border border-purple-800/40"
                      >
                        {work}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spotify Redirect Button */}
              <div className="pt-4 border-t border-purple-900/40">
                <a
                  href={member.spotifyArtistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/50 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{member.stageName} on Spotify</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
