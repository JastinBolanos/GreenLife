import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { sound } from '../utils/audio';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end backdrop-blur-md bg-black/75 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#030b06] border-l border-emerald-500/30 flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.8)]"
      >
        <div className="p-4 sm:p-5 border-b border-emerald-900/50 flex items-center justify-between bg-[#041209]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-base font-extrabold text-white tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
              Arbor Curations Wishlist
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-950/60 text-rose-300 border border-rose-500/30">
              {wishlistProducts.length} Saved
            </span>
          </div>

          <button
            onClick={() => {
              sound.playChime(450);
              onClose();
            }}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-emerald-950/60 transition-colors cursor-pointer"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                <Heart className="w-8 h-8 opacity-40" />
              </div>
              <h4 className="text-base font-bold text-white">Your Arbor Wishlist is Vacant</h4>
              <p className="text-xs text-zinc-400 max-w-xs">
                Mark living canopies and ancient bonsai you cherish by tapping the heart icon on any specimen.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-2xl bg-[#05140b] border border-emerald-950 flex gap-3 items-center justify-between"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover border border-emerald-950 flex-shrink-0"
                />

                <div className="flex-1 min-w-0 px-2">
                  <h4 className="text-xs font-bold text-white truncate">{product.name}</h4>
                  <span className="text-[10px] text-emerald-400 block">{product.category}</span>
                  <span className="text-xs font-black text-white mt-1 block">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 items-end">
                  <button
                    onClick={() => {
                      sound.playChime(760);
                      onAddToCart(product);
                    }}
                    className="p-2 rounded-xl bg-[#22c55e] hover:bg-[#4ade80] text-black shadow-md transition-all cursor-pointer hover:scale-105"
                    title="Move to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      sound.playChime(350);
                      onRemoveFromWishlist(product);
                    }}
                    className="p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
