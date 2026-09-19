import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenPlantFinder: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenPlantFinder,
  activeCategory,
  onSelectCategory,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isAmbiencePlaying, setIsAmbiencePlaying] = useState(sound.getAmbienceStatus());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    sound.playChime(640);
  };

  const toggleAmbience = () => {
    const active = sound.toggleAmbience();
    setIsAmbiencePlaying(active);
  };

  const navItems = [
    { id: 'HOME', label: 'HERITAGE', isCurrent: activeCategory === 'ALL' },
    { 
      id: 'TREES', 
      label: 'CANOPY TREES', 
      hasDropdown: true,
      subItems: ['All Canopy Trees', 'Japanese Maples', 'Heritage Bonsai', 'Blue Spruce & Conifers', 'Estate Shade Trees']
    },
    { 
      id: 'FRUIT TREES', 
      label: 'FRUIT ARBORS', 
      hasDropdown: true,
      subItems: ['Meyer Lemons & Citrus', 'Dwarf Orchard Trees', 'Heritage Fig Arbors', 'Ancient Olive Canopies']
    },
    { 
      id: 'SHRUBS', 
      label: 'BOTANICAL SHRUBS', 
      hasDropdown: true,
      subItems: ['Hydrangea Bushes', 'Evergreen Boxwoods', 'Ornamental Shrubs', 'Flowering Hedges']
    },
    { 
      id: 'FLOWERING', 
      label: 'FLOWERING ARBORS', 
      hasDropdown: true,
      subItems: ['Blossoming Cherries', 'Saucer Magnolias', 'Fragrant Camellias', 'Crape Myrtles']
    },
    { 
      id: 'PLANTS', 
      label: 'EXOTIC SPECIMENS', 
      hasDropdown: true,
      subItems: ['Luminescent Cultivars', 'Prehistoric Cycads', 'Purifying Canopies', 'Architectural Ferns']
    },
    { 
      id: 'ACCESSORIES', 
      label: 'ARBOR CARE', 
      hasDropdown: true,
      subItems: ['Handcrafted Ceramic Vessels', 'Soil Hydrometers & Sensors', 'Mycorrhizal Nutrients', 'Pruning Steel']
    },
    { 
      id: 'SALE', 
      label: 'SPECIAL SELECTIONS', 
      isSale: true 
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#030805]/85 border-b border-emerald-950/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="bg-[#020503] border-b border-emerald-950/50 py-2 px-4 text-xs sm:text-sm font-medium text-zinc-300">
        <div className="w-full max-w-[1760px] 2xl:max-w-[1920px] mx-auto px-2 sm:px-6 lg:px-10 xl:px-12 flex items-center justify-between">
          <div className="hidden lg:flex items-center space-x-8 text-xs sm:text-sm">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <span className="text-[#84cc16]">🌲</span> Climate-Guarded Freight on Arbors Over $75
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <span className="text-[#84cc16]">🌿</span> Arborist Canopy & Rootstock Guidance
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <span className="text-[#84cc16]">🛡️</span> 365-Day Rootstock Vitality Warranty
            </span>
          </div>

          <div className="flex items-center justify-between w-full lg:w-auto text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-zinc-200 hover:text-white transition-colors cursor-pointer font-medium">
              <span className="text-[#84cc16]">🌱</span> Join GreenLife Arboreal Guild & Save 10%
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1760px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div 
            onClick={() => {
              sound.playChime(520);
              onSelectCategory('ALL');
            }}
            className="cursor-pointer group select-none flex-shrink-0"
            title="GreenLife Living Arboretum"
          >
            <BrandLogo size="md" variant="horizontal" showTagline={true} />
          </div>

          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
            {navItems.map((item) => {
              const isSelected = (item.id === 'HOME' && activeCategory === 'ALL') || activeCategory === item.id;

              return (
                <div 
                  key={item.id} 
                  className="relative py-2"
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <button
                    onClick={() => {
                      sound.playChime(580);
                      if (item.id === 'HOME') {
                        onSelectCategory('ALL');
                      } else {
                        onSelectCategory(item.id);
                      }
                    }}
                    className={`relative px-3.5 py-2 text-xs lg:text-sm font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                      isSelected 
                        ? 'text-[#84cc16]' 
                        : item.isSale 
                          ? 'text-pink-400 hover:text-pink-300' 
                          : 'text-zinc-200 hover:text-[#84cc16]'
                    }`}
                  >
                    <span>{item.label}</span>

                    {item.isSale && (
                      <span className="relative -top-2 ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-[#e11d48] text-white shadow-sm">
                        HOT
                      </span>
                    )}

                    {item.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                    )}

                    {isSelected && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#84cc16] rounded-full shadow-[0_0_8px_#84cc16]" />
                    )}
                  </button>

                  {item.hasDropdown && hoveredNav === item.id && (
                    <div className="absolute top-full left-0 w-60 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="bg-[#040e08]/95 backdrop-blur-2xl border border-emerald-500/30 rounded-2xl p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                        {item.subItems?.map((sub, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              sound.playChime(620);
                              onSelectCategory(item.id);
                              setHoveredNav(null);
                            }}
                            className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl text-emerald-100/90 hover:text-[#4ade80] hover:bg-emerald-900/40 transition-colors cursor-pointer flex items-center justify-between group"
                          >
                            <span>{sub}</span>
                            <span className="text-xs text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div 
              onClick={() => {
                sound.playChime(540);
                onOpenSearch();
              }}
              className="relative hidden md:flex items-center w-52 lg:w-64 h-10 px-3.5 rounded-full bg-[#0a150e]/95 border border-emerald-900/70 hover:border-emerald-500/70 shadow-inner text-xs sm:text-sm text-zinc-400 cursor-pointer group transition-all duration-200"
            >
              <span className="text-zinc-400 group-hover:text-emerald-300 text-xs sm:text-sm">Search living arbors...</span>
              <Search className="w-4 h-4 text-zinc-400 group-hover:text-[#4ade80] absolute right-3.5 transition-colors" />
            </div>

            <button
              onClick={() => {
                sound.playChime(540);
                onOpenSearch();
              }}
              className="md:hidden p-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-emerald-950/40 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-emerald-300" />
            </button>

            <button 
              onClick={() => {
                sound.playChime(500);
                onOpenPlantFinder();
              }}
              className="p-2.5 rounded-xl text-zinc-300 hover:text-[#4ade80] hover:bg-emerald-950/50 transition-colors cursor-pointer"
              title="Arboreal Specimen Matcher"
              aria-label="Specimen Matcher"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                sound.playChime(660);
                onOpenWishlist();
              }}
              className="relative p-2.5 rounded-xl text-zinc-300 hover:text-emerald-300 hover:bg-emerald-950/50 transition-colors cursor-pointer"
              aria-label="Wishlist"
              title="Arbor Curations"
            >
              <Heart className="w-5 h-5 transition-transform hover:scale-110 active:scale-95" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#84cc16] text-black text-[11px] font-black flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                sound.playChime(720);
                onOpenCart();
              }}
              className="relative p-2.5 rounded-xl text-zinc-300 hover:text-emerald-300 hover:bg-emerald-950/50 transition-colors cursor-pointer group"
              aria-label="Shopping Bag"
              title="Arbor Freight Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 active:scale-95 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#84cc16] text-black text-[11px] font-black flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl text-zinc-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-emerald-900/40 space-y-1 pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  sound.playChime(580);
                  if (item.id === 'HOME') onSelectCategory('ALL');
                  else onSelectCategory(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  (item.id === 'HOME' && activeCategory === 'ALL') || activeCategory === item.id
                    ? 'bg-emerald-900/40 text-[#4ade80]'
                    : item.isSale
                      ? 'text-pink-400'
                      : 'text-zinc-200 hover:bg-emerald-950/30'
                }`}
              >
                <span>{item.label}</span>
                {item.isSale && (
                  <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-pink-600 text-white">HOT</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
