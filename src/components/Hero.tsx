import React, { useState } from 'react';
import { 
  Sprout, 
  Trees, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Sun,
  Flame,
  Droplets,
  Eye
} from 'lucide-react';
import { FireflyCanvas } from './FireflyCanvas';
import { HERO_TREE_IMAGE } from '../data/products';
import { sound } from '../utils/audio';

interface HeroProps {
  onShopTrees: () => void;
  onExploreCollections: () => void;
  onOpenARModal?: () => void;
}

type GlowPreset = 'ultra' | 'emerald' | 'aurora';

export const Hero: React.FC<HeroProps> = ({
  onShopTrees,
  onExploreCollections,
}) => {
  const [glowPreset, setGlowPreset] = useState<GlowPreset>('ultra');
  const [isSuperBright, setIsSuperBright] = useState(true);
  const [clickRipple, setClickRipple] = useState(false);

  const handleHeroClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;
    
    sound.playSporeBloom();
    setClickRipple(true);
    setTimeout(() => setClickRipple(false), 900);
  };

  const getImageFilter = () => {
    let filter = 'brightness-125 contrast-110 saturate-125';
    if (isSuperBright) {
      if (glowPreset === 'ultra') {
        filter = 'brightness-150 contrast-125 saturate-140 hue-rotate-[-5deg]';
      } else if (glowPreset === 'aurora') {
        filter = 'brightness-140 contrast-120 saturate-135 hue-rotate-[25deg]';
      } else {
        filter = 'brightness-135 contrast-115 saturate-130';
      }
    } else {
      filter = 'brightness-110 contrast-105 saturate-115';
    }
    return filter;
  };

  return (
    <section 
      onClick={handleHeroClick}
      className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[580px] xl:min-h-[620px] 2xl:min-h-[660px] w-full overflow-hidden bg-[#020704] flex items-center pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 select-none"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src={HERO_TREE_IMAGE}
          alt="Ancient Luminous Bonsai Tree Background"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-[72%_38%] sm:object-[68%_40%] lg:object-[64%_42%] xl:object-[60%_42%] transform transition-all duration-700 ${getImageFilter()}`}
        />

        <div 
          className={`absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] transition-opacity duration-700 pointer-events-none ${
            isSuperBright ? 'bg-emerald-400/35 opacity-100' : 'bg-emerald-500/20 opacity-70'
          }`} 
        />
        <div 
          className={`absolute top-1/2 right-1/6 w-[450px] h-[450px] rounded-full blur-[130px] transition-opacity duration-700 pointer-events-none ${
            glowPreset === 'aurora' ? 'bg-cyan-400/30' : 'bg-teal-400/25'
          } ${isSuperBright ? 'opacity-100' : 'opacity-50'}`} 
        />
        <div className="absolute bottom-10 right-1/3 w-[500px] h-[300px] bg-[#4ade80]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-1/2 bg-gradient-to-r from-[#020704] via-[#020704]/85 to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#020704] via-[#020704]/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-[#020704] via-[#020704]/30 to-transparent pointer-events-none" />

        {clickRipple && (
          <div className="absolute inset-0 bg-emerald-400/15 backdrop-blur-[1px] animate-ping pointer-events-none" />
        )}
      </div>

      <FireflyCanvas 
        glowMode={glowPreset === 'aurora' ? 'aurora' : 'emerald'} 
        className="pointer-events-none"
      />

      <div className="relative z-20 w-full max-w-[1760px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          <div className="lg:col-span-8 xl:col-span-7 2xl:col-span-7 space-y-4 sm:space-y-5 lg:space-y-6 pt-1 lg:pt-0">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-bold tracking-[0.22em] text-[#84cc16] uppercase">
              <span className="text-[#84cc16] text-base sm:text-lg">🌱</span>
              <span className="tracking-wider">
                TIMELESS ROOTS • ARCHITECTURAL CANOPIES
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold text-white tracking-tight leading-[1.04] font-['Plus_Jakarta_Sans',sans-serif]">
              Cultivate Living Canopies <br />
              <span className="text-[#84cc16] drop-shadow-[0_0_35px_rgba(132,204,22,0.85)] font-['Syne',sans-serif]">
                Rooted for
              </span>{' '}
              Life
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-zinc-200 font-normal leading-relaxed max-w-xl">
              Master-cultivated specimen trees and mature arbors, acclimatized to thrive in your landscape. Anchor your sanctuary with enduring natural grandeur.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2 sm:pt-3">
              <button
                onClick={() => {
                  sound.playChime(680);
                  onShopTrees();
                }}
                className="group relative inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#84cc16] hover:bg-[#a3e635] text-black font-extrabold text-xs sm:text-sm md:text-base tracking-wider uppercase transition-all duration-200 shadow-[0_0_25px_rgba(132,204,22,0.5)] hover:shadow-[0_0_35px_rgba(132,204,22,0.8)] cursor-pointer"
              >
                <span>ACQUIRE LIVING ARBORS</span>
                <Sprout className="w-5 h-5 text-black transition-transform group-hover:scale-110" />
              </button>

              <button
                onClick={() => {
                  sound.playChime(520);
                  onExploreCollections();
                }}
                className="group inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#040e07]/80 hover:bg-[#07190d] text-white border-2 border-[#22c55e]/60 hover:border-[#4ade80] font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase transition-all duration-200 cursor-pointer"
              >
                <span>BROWSE ARBORETUM</span>
                <Trees className="w-5 h-5 text-[#84cc16] group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 sm:gap-10 lg:gap-12 pt-4 sm:pt-6">
              <div className="flex items-center gap-3.5 text-xs sm:text-base text-zinc-300">
                <Sprout className="w-8 h-8 sm:w-10 sm:h-10 text-[#84cc16] stroke-[2] flex-shrink-0" />
                <div className="leading-tight">
                  <span className="font-extrabold text-white block text-sm sm:text-base">Vigorous Rootstock</span>
                  <span className="text-zinc-300 text-xs sm:text-sm">Arborist-Selected</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs sm:text-base text-zinc-300">
                <Truck className="w-8 h-8 sm:w-10 sm:h-10 text-[#84cc16] stroke-[2] flex-shrink-0" />
                <div className="leading-tight">
                  <span className="font-extrabold text-white block text-sm sm:text-base">Climate-Shielded</span>
                  <span className="text-zinc-300 text-xs sm:text-sm">Direct Transit</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs sm:text-base text-zinc-300">
                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#84cc16] stroke-[2] flex-shrink-0" />
                <div className="leading-tight">
                  <span className="font-extrabold text-white block text-sm sm:text-base">365-Day Vitality</span>
                  <span className="text-zinc-300 text-xs sm:text-sm">Canopy Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 xl:col-span-5 2xl:col-span-5 relative flex justify-center lg:justify-end items-center min-h-[180px] sm:min-h-[220px] lg:min-h-[300px]">
            <div 
              onClick={(e) => {
                e.stopPropagation();
                sound.playSporeBloom();
                setClickRipple(true);
                setTimeout(() => setClickRipple(false), 900);
              }}
              className="relative group/badge cursor-pointer self-center lg:mr-8 xl:mr-16 transition-transform duration-300 hover:scale-108 select-none"
              title="Touch to stimulate arbor vitality"
            >
              {/* Luminous Pulsing Glow Behind the Ring */}
              <div 
                className={`absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#22c55e]/40 via-[#84cc16]/50 to-[#4ade80]/40 blur-2xl transition-all duration-500 pointer-events-none ${
                  clickRipple ? 'opacity-100 scale-125 blur-3xl' : 'opacity-70 group-hover/badge:opacity-95'
                }`} 
              />

              {/* Primary Rotating Glowing Green Halo Ring (Spins Clockwise) */}
              <div 
                className="absolute -inset-2 sm:-inset-3 pointer-events-none"
                style={{ animation: 'spin 8s linear infinite' }}
              >
                <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_16px_rgba(132,204,22,0.95)]">
                  <defs>
                    <linearGradient id="hero-glowing-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#84cc16" />
                      <stop offset="35%" stopColor="#4ade80" />
                      <stop offset="70%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#a3e635" />
                    </linearGradient>
                  </defs>
                  {/* Glowing perimeter circular path */}
                  <circle
                    cx="60"
                    cy="60"
                    r="56"
                    fill="none"
                    stroke="url(#hero-glowing-ring)"
                    strokeWidth="2.5"
                    strokeDasharray="24 10 40 12"
                    strokeLinecap="round"
                  />
                  {/* Glowing Orbiting Celestial Light Nodes */}
                  <circle cx="60" cy="4" r="3.8" fill="#a3e635" className="filter drop-shadow-[0_0_8px_#84cc16]" />
                  <circle cx="116" cy="60" r="2.8" fill="#4ade80" className="filter drop-shadow-[0_0_8px_#4ade80]" />
                  <circle cx="60" cy="116" r="3.8" fill="#a3e635" className="filter drop-shadow-[0_0_8px_#84cc16]" />
                  <circle cx="4" cy="60" r="2.8" fill="#4ade80" className="filter drop-shadow-[0_0_8px_#4ade80]" />
                </svg>
              </div>

              {/* Secondary Counter-Rotating Celestial Energy Ring (Spins Counter-Clockwise) */}
              <div 
                className="absolute -inset-1 sm:-inset-1.5 pointer-events-none"
                style={{ animation: 'spin 14s linear infinite reverse' }}
              >
                <svg viewBox="0 0 120 120" className="w-full h-full opacity-80 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]">
                  <circle
                    cx="60"
                    cy="60"
                    r="57.5"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="1.2"
                    strokeDasharray="6 18"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Click Ripple Wave Ring */}
              {clickRipple && (
                <div className="absolute -inset-6 rounded-full border-2 border-[#a3e635] animate-ping pointer-events-none opacity-80" />
              )}

              {/* Central Badge Content with Solid Dark Glass Core */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 xl:w-52 xl:h-52 rounded-full border border-[#84cc16]/50 bg-[#020b05]/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 text-center shadow-[0_0_35px_rgba(132,204,22,0.45)] group-hover/badge:shadow-[0_0_55px_rgba(132,204,22,0.75)] transition-all">
                <div className="text-[#84cc16] mb-1.5 animate-pulse">
                  <Sprout className="w-7 h-7 sm:w-9 sm:h-9 xl:w-10 xl:h-10 drop-shadow-[0_0_8px_rgba(132,204,22,0.8)]" />
                </div>
                <span className="text-sm sm:text-base xl:text-lg font-black tracking-wider text-white uppercase font-['Syne',sans-serif] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  LIVING ARBORS
                </span>
                <span className="text-[11px] sm:text-xs xl:text-sm font-bold tracking-wider text-[#84cc16] uppercase mt-1 drop-shadow-[0_0_6px_rgba(132,204,22,0.6)]">
                  ENDURING ROOTS
                </span>
                <span className="text-[9px] sm:text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">
                  TOUCH TO PULSE
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
