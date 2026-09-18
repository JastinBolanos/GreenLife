import React from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { sound } from '../utils/audio';

interface ProductSectionProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onOpenQuickView,
  selectedCategory,
  onSelectCategory,
}) => {
  const categoryFilters = [
    { id: 'ALL', label: 'All Living Arbors' },
    { id: 'TREES', label: 'Canopy Trees' },
    { id: 'FRUIT TREES', label: 'Fruit Arbors' },
    { id: 'FLOWERING', label: 'Flowering Canopies' },
    { id: 'SHRUBS', label: 'Botanical Shrubs' },
    { id: 'Bonsai', label: 'Heritage Bonsai' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'TREES') return p.category === 'Trees';
    if (selectedCategory === 'FRUIT TREES') return p.category === 'Fruit Trees';
    if (selectedCategory === 'FLOWERING') return p.name.includes('Blossom') || p.name.includes('Magnolia');
    if (selectedCategory === 'SHRUBS') return p.category === 'Shrubs';
    if (selectedCategory === 'Bonsai') return p.category === 'Bonsai';
    return true;
  });

  const displayList = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <section id="popular-picks" className="relative z-20 w-full pt-8 sm:pt-12 pb-16 sm:pb-24 bg-gradient-to-b from-[#020704] via-[#030d07] to-[#020603]">
      <div className="w-full max-w-[1760px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-emerald-950/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#84cc16] uppercase">
              <Sparkles className="w-4 h-4 text-[#84cc16]" />
              <span>ACCLIMATIZED LIVING ROOTSTOCKS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              Architectural Trees & Living Arbors
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              Master-tended specimens cultivated for structural heartwood, vigorous root systems, and expressive architectural canopies.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categoryFilters.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playChime(active ? 480 : 620);
                    onSelectCategory(cat.id);
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    active
                      ? 'bg-[#84cc16] text-black shadow-[0_0_18px_rgba(132,204,22,0.4)]'
                      : 'bg-[#041008] text-zinc-300 hover:text-white hover:bg-emerald-950/80 border border-emerald-900/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scaled Grid: 1 to 4 large prominent cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 xl:gap-10">
          {displayList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
