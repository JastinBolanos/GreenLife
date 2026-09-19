import React from 'react';

interface BrandLogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  stylePreset?: 'emerald-sovereign' | 'obsidian-platinum' | 'heritage-gold';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showTagline = true,
  className = '',
  stylePreset = 'emerald-sovereign',
}) => {
  // Dimensions mapping
  const iconSizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const titleSizeMap = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-lg sm:text-xl md:text-2xl tracking-[0.22em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.24em]',
    xl: 'text-3xl sm:text-4xl tracking-[0.26em]',
  };

  const subtitleSizeMap = {
    sm: 'text-[8px] tracking-[0.28em]',
    md: 'text-[9px] sm:text-[10.5px] tracking-[0.32em]',
    lg: 'text-xs tracking-[0.36em]',
    xl: 'text-sm tracking-[0.38em]',
  };

  return (
    <div
      className={`group flex select-none ${
        variant === 'vertical'
          ? 'flex-col items-center text-center gap-3'
          : 'flex-row items-center gap-3.5'
      } ${className}`}
    >
      {/* Precision Vector Emblem (Isotipo Soberano) */}
      <div
        className={`relative ${iconSizeMap[size]} flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105`}
      >
        {/* Ambient Backlight Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-600/40 via-emerald-400/20 to-teal-400/10 blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />

        {/* Master SVG Emblem */}
        <svg
          viewBox="0 0 100 100"
          className="relative w-full h-full drop-shadow-[0_4px_16px_rgba(16,185,129,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Emerald Core Gradient */}
            <linearGradient id="gl-emerald-core" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="45%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Sovereign Rim Gradient */}
            <linearGradient id="gl-gold-rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="35%" stopColor="#10b981" />
              <stop offset="70%" stopColor="#065f46" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>

            {/* Subtle Metallic Titanium Highlight */}
            <linearGradient id="gl-luster" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#a7f3d0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>

            {/* Shield Background */}
            <linearGradient id="gl-shield-bg" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#041b0f" />
              <stop offset="100%" stopColor="#010804" />
            </linearGradient>
          </defs>

          {/* Outer Geometric Frame: Octagonal Sovereign Shield */}
          <path
            d="M50 4 L86 18 L96 52 L76 86 L50 96 L24 86 L4 52 L14 18 Z"
            fill="url(#gl-shield-bg)"
            stroke="url(#gl-gold-rim)"
            strokeWidth="1.75"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />

          {/* Inner Inset Hairline (Conveys High-End Luxury Precision & Vault Security) */}
          <path
            d="M50 10 L80 22 L88 51 L71 80 L50 88 L29 80 L12 51 L20 22 Z"
            stroke="url(#gl-emerald-core)"
            strokeWidth="0.8"
            strokeOpacity="0.45"
            strokeDasharray="1 2"
          />

          {/* Corner Micro-Pip Accents (Classic Luxury Seal Detailing) */}
          <circle cx="50" cy="8" r="1.5" fill="#4ade80" />
          <circle cx="88" cy="51" r="1.2" fill="#34d399" />
          <circle cx="12" cy="51" r="1.2" fill="#34d399" />
          <circle cx="50" cy="92" r="1.2" fill="#10b981" />

          {/* Deep Foundation Roots (Solidity, Authority, Heritage) */}
          <path
            d="M48 64 L48 76 L36 82 M52 64 L52 76 L64 82 M50 68 L50 80"
            stroke="url(#gl-emerald-core)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Monolithic Central Pillar / Trunk */}
          <path
            d="M47 48 L46 64 L54 64 L53 48 Z"
            fill="url(#gl-luster)"
            stroke="#10b981"
            strokeWidth="0.75"
          />

          {/* Architectural Canopy: Symmetric Majesty Crown & Interlocking G/L Crest */}
          {/* Left Wing (Forming the proud arc of 'G') */}
          <path
            d="M50 22 C34 22 24 33 24 45 C24 55 33 61 44 61 L46 54 C38 54 32 50 32 44 C32 37 39 30 50 30 Z"
            fill="url(#gl-emerald-core)"
            className="transition-all duration-300 group-hover:brightness-110"
          />

          {/* Right Wing (Forming the vertical/horizontal authority lines of 'L' and balanced canopy) */}
          <path
            d="M50 22 C66 22 76 33 76 45 C76 53 71 58 64 60 L62 53 C67 51 68 47 68 44 C68 37 61 30 50 30 Z"
            fill="url(#gl-emerald-core)"
            fillOpacity="0.9"
          />

          {/* Central Ascending Leaf Blade (The Sovereign Apex) */}
          <path
            d="M50 16 C53 26 58 35 58 44 C58 50 54 53 50 53 C46 53 42 50 42 44 C42 35 47 26 50 16 Z"
            fill="url(#gl-luster)"
            stroke="#059669"
            strokeWidth="0.6"
          />

          {/* Diamond Heart Core / Starburst (Luxury Signifier) */}
          <path
            d="M50 40 L53 44 L50 48 L47 44 Z"
            fill="#ffffff"
            className="drop-shadow-[0_0_6px_#4ade80]"
          />

          {/* Horizontal Meridian Balance Bar */}
          <line
            x1="36"
            y1="44"
            x2="64"
            y2="44"
            stroke="#a7f3d0"
            strokeWidth="0.75"
            strokeOpacity="0.7"
          />
        </svg>
      </div>

      {/* Typography: Prestigious Corporate & Living Arboretum Wordmark */}
      {variant !== 'icon-only' && (
        <div
          className={`flex flex-col ${
            variant === 'vertical' ? 'items-center' : 'items-start'
          }`}
        >
          {/* Main Brand Name: Powerful, Chiseled, High-Contrast */}
          <div className="flex items-center gap-1">
            <span
              className={`font-['Syne',sans-serif] font-black uppercase text-white tracking-[0.22em] leading-none transition-colors duration-300 group-hover:text-emerald-100 ${titleSizeMap[size]}`}
            >
              GREEN<span className="text-emerald-400 group-hover:text-[#4ade80]">LIFE</span>
            </span>
          </div>

          {/* Subtitle / Descriptor with Authority */}
          {showTagline && (
            <div
              className={`flex items-center gap-1.5 mt-1 sm:mt-1.5 ${subtitleSizeMap[size]} font-semibold text-emerald-400/90 uppercase font-['Plus_Jakarta_Sans',sans-serif]`}
            >
              <span className="inline-block w-2 sm:w-3.5 h-[1px] bg-gradient-to-r from-transparent to-emerald-500/70" />
              <span className="tracking-[0.32em] text-zinc-300 group-hover:text-emerald-300 transition-colors">
                LIVING ARBORETUM
              </span>
              <span className="inline-block w-2 sm:w-3.5 h-[1px] bg-gradient-to-l from-transparent to-emerald-500/70" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
