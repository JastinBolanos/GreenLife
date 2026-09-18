import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { sound } from '../utils/audio';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.botanicalSpecs.scientificName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ['Japanese Maple', 'Cherry Blossom', 'Heritage Bonsai', 'Meyer Lemon', 'Hydrangea', 'Blue Spruce'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 backdrop-blur-xl bg-black/80 animate-in fade-in duration-150">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#040e08] border border-emerald-500/40 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        <div className="p-4 border-b border-emerald-900/50 flex items-center gap-3 bg-[#06140b]">
          <Search className="w-5 h-5 text-[#22c55e]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by canopy species, foliage color, or botanical genus..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-zinc-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-400 hover:text-white text-xs px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => {
              sound.playChime(450);
              onClose();
            }}
            className="p-1 rounded-full text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-3 bg-[#030a05] border-b border-emerald-950 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#22c55e]" /> Arboretum Highlights:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                sound.playChime(520);
                setQuery(term);
              }}
              className="px-2.5 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/40 text-[11px] transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-zinc-500 text-xs">
              Enter a species or botanical keyword to explore our living tree inventory.
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-zinc-400 text-xs">
              No living specimens found matching "{query}". Search for "Maple", "Citrus", or "Spruce".
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  sound.playChime(620);
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-[#05140b] hover:bg-[#092213] border border-emerald-950 hover:border-emerald-500/50 flex items-center justify-between gap-3 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-emerald-900/50"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#4ade80] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-zinc-400 italic">
                      {product.botanicalSpecs.scientificName} • {product.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-extrabold text-[#22c55e]">
                    ${product.price.toFixed(2)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
