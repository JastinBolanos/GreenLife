import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Sun, 
  Droplets, 
  ShieldCheck, 
  Wind, 
  Moon, 
  Calendar,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { sound } from '../utils/audio';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, pot: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedPot, setSelectedPot] = useState<'Ceramic Charcoal' | 'Terra Cotta Moss' | 'Bioluminescent Glaze'>('Ceramic Charcoal');
  const [selectedSeason, setSelectedSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');
  const [activeStageIndex, setActiveStageIndex] = useState(2);
  const [nightModeGlow, setNightModeGlow] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    sound.playChime(760);
    setAddedAnimation(true);
    onAddToCart(product, quantity, selectedPot);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const getSeasonalFilter = () => {
    if (nightModeGlow) return 'contrast(1.2) brightness(0.9) saturate(1.8) hue-rotate(15deg)';
    switch (selectedSeason) {
      case 'summer': return 'saturate(1.25) contrast(1.05)';
      case 'autumn': return 'sepia(0.3) saturate(1.4) hue-rotate(-20deg)';
      case 'winter': return 'saturate(0.7) brightness(1.1) contrast(1.1)';
      default: return 'none';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-xl bg-black/80 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl xl:max-w-6xl bg-[#040e08] border border-emerald-500/40 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] max-h-[92vh] flex flex-col md:flex-row"
      >
        <button
          onClick={() => {
            sound.playChime(450);
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#030905]/80 hover:bg-emerald-950 text-zinc-300 hover:text-white border border-emerald-900/50 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#06150d] to-[#020704] border-b md:border-b-0 md:border-r border-emerald-950/60">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-emerald-900/50 bg-[#020603] shadow-inner flex items-center justify-center">
            {nightModeGlow && (
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-emerald-600/15 to-transparent z-10 animate-pulse pointer-events-none" />
            )}

            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-700"
              style={{ filter: getSeasonalFilter() }}
            />

            {nightModeGlow && (
              <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                <div className="w-48 h-48 bg-[#22c55e]/25 rounded-full blur-2xl" />
              </div>
            )}

            <button
              onClick={() => {
                sound.playSporeBloom();
                setNightModeGlow(!nightModeGlow);
              }}
              className={`absolute top-3 left-3 z-20 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer ${
                nightModeGlow
                  ? 'bg-[#22c55e] text-black shadow-[0_0_15px_#22c55e]'
                  : 'bg-black/60 text-zinc-300 hover:text-emerald-300 border border-emerald-900/60'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{nightModeGlow ? 'Canopy Glow Active' : 'Twilight View'}</span>
            </button>

            <button
              onClick={() => {
                sound.playChime(isWishlisted ? 420 : 700);
                onToggleWishlist(product);
              }}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md border border-emerald-900/60 text-zinc-300 hover:text-rose-400 cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-center gap-1 bg-[#020704]/80 backdrop-blur-md border border-emerald-900/50 rounded-xl p-1">
              <span className="text-[10px] text-zinc-400 font-semibold px-2 hidden sm:inline">Season:</span>
              {(['spring', 'summer', 'autumn', 'winter'] as const).map((season) => (
                <button
                  key={season}
                  onClick={() => {
                    sound.playChime(500);
                    setSelectedSeason(season);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer capitalize ${
                    selectedSeason === season && !nightModeGlow
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-emerald-900/30">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#22c55e]" />
                Arboreal Canopy Growth Stages
              </span>
              <span className="text-[11px] text-zinc-400">
                {product.growthStages[activeStageIndex]?.height} • {product.growthStages[activeStageIndex]?.age}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {product.growthStages.map((stage, idx) => (
                <button
                  key={stage.stage}
                  onClick={() => {
                    sound.playChime(520 + idx * 40);
                    setActiveStageIndex(idx);
                  }}
                  className={`py-1.5 px-1 rounded-lg text-center text-[10px] font-bold transition-all cursor-pointer ${
                    activeStageIndex === idx
                      ? 'bg-[#22c55e] text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                      : 'bg-[#030b06] text-zinc-400 hover:text-white border border-emerald-950'
                  }`}
                >
                  {stage.stage}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-zinc-300 italic bg-emerald-950/20 p-2 rounded-lg border border-emerald-900/30">
              "{product.growthStages[activeStageIndex]?.description}"
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[85vh] space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
              <span>{product.category}</span>
              <span>•</span>
              <span className="italic font-normal text-emerald-300/80">{product.botanicalSpecs.scientificName}</span>
            </div>

            <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-3xl font-black text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-base text-zinc-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#22c55e] text-black">
                  {product.badge.text}
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-2.5 mt-5">
              <div className="p-2.5 rounded-xl bg-[#06140c] border border-emerald-900/40 flex items-center gap-2.5">
                <Sun className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-[10px] text-zinc-400 block">Sunlight</span>
                  <span className="font-bold text-white">{product.botanicalSpecs.sunlight}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#06140c] border border-emerald-900/40 flex items-center gap-2.5">
                <Droplets className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-[10px] text-zinc-400 block">Watering</span>
                  <span className="font-bold text-white">{product.botanicalSpecs.watering}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#06140c] border border-emerald-900/40 flex items-center gap-2.5">
                <Wind className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-[10px] text-zinc-400 block">Air Purification</span>
                  <span className="font-bold text-[#4ade80]">{product.botanicalSpecs.airPurification}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#06140c] border border-emerald-900/40 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-[10px] text-zinc-400 block">Hardiness Zones</span>
                  <span className="font-bold text-white">USDA {product.botanicalSpecs.hardinessZones}</span>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                Nursery Acclimatized Planter:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Ceramic Charcoal', 'Terra Cotta Moss', 'Bioluminescent Glaze'] as const).map((pot) => (
                  <button
                    key={pot}
                    onClick={() => {
                      sound.playChime(560);
                      setSelectedPot(pot);
                    }}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center ${
                      selectedPot === pot
                        ? 'bg-emerald-900/60 border-[#22c55e] text-[#4ade80] shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                        : 'bg-[#030905] border-emerald-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {pot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-900/40 space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-xl bg-[#030905] border border-emerald-900/60 p-1">
                <button
                  onClick={() => {
                    sound.playChime(460);
                    setQuantity(Math.max(1, quantity - 1));
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-emerald-950 text-base font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    sound.playChime(560);
                    setQuantity(quantity + 1);
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-emerald-950 text-base font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <div className="text-right flex-1">
                <span className="text-[10px] text-zinc-400 block uppercase">Subtotal</span>
                <span className="text-xl font-black text-white">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-400 text-black shadow-[0_0_25px_#22c55e]'
                  : 'bg-[#22c55e] hover:bg-[#4ade80] text-[#030905] shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(74,222,128,0.7)]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-black stroke-[3]" />
                  <span>Specimen Reserved in Arbor Collection!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Living Arbor (${(product.price * quantity).toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
