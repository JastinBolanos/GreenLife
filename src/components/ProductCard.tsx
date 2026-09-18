import React from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { sound } from '../utils/audio';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenQuickView,
}) => {
  const getBadgeStyle = () => {
    switch (product.badge?.color) {
      case 'purple':
        return 'bg-[#9333ea] text-white font-extrabold';
      case 'blue':
        return 'bg-[#2563eb] text-white font-extrabold';
      case 'pink':
        return 'bg-[#db2777] text-white font-extrabold';
      case 'emerald':
      default:
        return 'bg-[#84cc16] text-black font-extrabold';
    }
  };

  const getPriceColor = () => {
    if (product.originalPrice || product.badge?.color === 'pink') {
      return 'text-[#db2777]';
    }
    if (
      product.name === 'Cherry Blossom Tree' ||
      product.name === 'Meyer Lemon Tree' ||
      product.name === 'Magnolia Tree'
    ) {
      return 'text-[#84cc16]';
    }
    return 'text-white';
  };

  return (
    <div 
      onClick={() => {
        sound.playChime(580);
        onOpenQuickView(product);
      }}
      className="group relative flex flex-col bg-[#051009]/95 hover:bg-[#07180e] rounded-2xl sm:rounded-3xl border border-emerald-950/90 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.15)] cursor-pointer"
    >
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#030805]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
        />

        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs tracking-wider uppercase inline-block shadow-md ${getBadgeStyle()}`}>
              {product.badge.text}
            </span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.playChime(isWishlisted ? 420 : 700);
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white/90 hover:text-white border border-emerald-900/40 transition-all cursor-pointer hover:scale-110"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8] ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-[#051009] via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span>{product.category}</span>
            <span>•</span>
            <span className="italic font-normal text-emerald-300/80 truncate">{product.botanicalSpecs.scientificName}</span>
          </div>

          <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-white group-hover:text-[#84cc16] transition-colors tracking-tight line-clamp-1 font-['Plus_Jakarta_Sans',sans-serif]">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Botanical Quick Spec Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-900/50 text-[10px] text-emerald-300 font-medium">
            ☀️ {product.botanicalSpecs.sunlight}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-900/50 text-[10px] text-emerald-300 font-medium">
            💧 {product.botanicalSpecs.watering}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-900/50 text-[10px] text-zinc-400 font-medium">
            Zone {product.botanicalSpecs.hardinessZones}
          </span>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-emerald-950/80 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className={`text-base sm:text-lg lg:text-xl font-extrabold ${getPriceColor()}`}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-zinc-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playChime(580);
                onOpenQuickView(product);
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#030905] hover:bg-emerald-950 text-zinc-300 hover:text-white border border-emerald-900/60 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              title="Inspect Specimen"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline text-xs">Inspect</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playSporeBloom();
                onAddToCart(product);
              }}
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(132,204,22,0.35)] hover:shadow-[0_0_20px_rgba(132,204,22,0.6)] flex items-center gap-1.5 cursor-pointer"
              title="Acquire Arbor"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="text-xs font-black">Acquire</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
