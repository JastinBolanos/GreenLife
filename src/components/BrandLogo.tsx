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
}) => {
  // Dimensions mapping
  const iconSizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const titleSizeMap = {
    sm: 'text-base tracking-[0.16em]',
    md: 'text-lg sm:text-xl md:text-2xl tracking-[0.18em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.2em]',
    xl: 'text-3xl sm:text-4xl tracking-[0.22em]',
  };

  const subtitleSizeMap = {
    sm: 'text-[8px] tracking-[0.24em]',
    md: 'text-[9px] sm:text-[10px] tracking-[0.28em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.34em]',
  };

  return (
    <div
      className={`group flex select-none ${
        variant === 'vertical'
          ? 'flex-col items-center text-center gap-3'
          : 'flex-row items-center gap-3'
      } ${className}`}
    >
      {/* Serious, Prestigious Botanical Seal (Solid Forest Green #0a2f1d & Solid White #ffffff) with Glowing Rotating Green Halo */}
      <div
        className={`relative ${iconSizeMap[size]} flex-shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
      >
        {/* Luminous Green Glow Ambient Backlight */}
        <div className="absolute -inset-1 rounded-full bg-[#22c55e]/25 blur-sm group-hover:bg-[#22c55e]/45 transition-colors pointer-events-none" />

        {/* Glowing Rotating Green Halo Ring */}
        <div 
          className="absolute -inset-1 pointer-events-none"
          style={{ animation: 'spin 9s linear infinite' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(34,197,94,0.9)]">
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeDasharray="22 10 38 12"
              strokeLinecap="round"
            />
            <circle cx="50" cy="1" r="2.2" fill="#86efac" />
            <circle cx="50" cy="99" r="2.2" fill="#86efac" />
          </svg>
        </div>

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full rounded-full shadow-md relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Solid Color 1: Deep Botanical Forest Green #0a2f1d */}
          <circle cx="50" cy="50" r="48" fill="#0a2f1d" />

          {/* Crisp Precision Perimeter Ring in Solid White */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="#ffffff" strokeWidth="2.5" />

          {/* Solid Color 2: Solid White #ffffff - Stately Heritage Specimen Tree */}
          <polygon
            points="50,20 59,32 54.5,32 63,44 58,44 67,58 53,58 53,74 47,74 47,58 33,58 42,44 37,44 45.5,32 41,32"
            fill="#ffffff"
          />

          {/* Solid Base / Pedestal Foundation */}
          <rect x="36" y="74" width="28" height="4" rx="1.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Typography with Serious Corporate / Arboretum Presence */}
      {variant !== 'icon-only' && (
        <div
          className={`flex flex-col ${
            variant === 'vertical' ? 'items-center' : 'items-start'
          }`}
        >
          {/* Main Brand Name */}
          <div className="flex items-center">
            <span
              className={`font-['Syne',sans-serif] font-bold uppercase text-white tracking-[0.2em] leading-none transition-colors duration-200 group-hover:text-emerald-100 ${titleSizeMap[size]}`}
            >
              GREEN<span className="text-[#34d399] font-extrabold">LIFE</span>
            </span>
          </div>

          {/* Tagline / Subtitle */}
          {showTagline && (
            <div
              className={`flex items-center gap-1.5 mt-1.5 ${subtitleSizeMap[size]} font-medium uppercase font-['Plus_Jakarta_Sans',sans-serif]`}
            >
              <span className="tracking-[0.32em] text-emerald-300/80 group-hover:text-emerald-200 transition-colors">
                BOTANICAL NURSERY
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
