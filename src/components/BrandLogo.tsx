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
    sm: 'w-9 h-9 sm:w-10 sm:h-10',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const titleSizeMap = {
    sm: 'text-lg tracking-[0.16em]',
    md: 'text-xl sm:text-2xl md:text-[26px] tracking-[0.18em]',
    lg: 'text-2xl sm:text-3xl md:text-4xl tracking-[0.2em]',
    xl: 'text-4xl sm:text-5xl tracking-[0.22em]',
  };

  const subtitleSizeMap = {
    sm: 'text-[9px] tracking-[0.26em]',
    md: 'text-[10px] sm:text-[11px] md:text-xs tracking-[0.32em]',
    lg: 'text-xs sm:text-sm tracking-[0.34em]',
    xl: 'text-sm sm:text-base tracking-[0.36em]',
  };

  return (
    <div
      className={`group flex select-none ${
        variant === 'vertical'
          ? 'flex-col items-center text-center gap-3.5'
          : 'flex-row items-center gap-3.5 sm:gap-4'
      } ${className}`}
    >
      {/* Serious, Prestigious Botanical Seal (Solid Forest Green #0a2f1d & Solid White #ffffff) */}
      <div
        className={`relative ${iconSizeMap[size]} flex-shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full rounded-full shadow-md"
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
