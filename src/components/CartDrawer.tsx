import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { CartItem } from '../types';
import { sound } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discountPercent;
  const freeShippingThreshold = 75;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  const total = subtotal - discountAmount + shippingCost;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GREEN10' || promoCode.trim().toUpperCase() === 'GREENLIFE') {
      sound.playSporeBloom();
      setPromoApplied(true);
      setDiscountPercent(0.1);
    } else {
      sound.playChime(300);
      alert('Invalid code. Try GREEN10 for 10% off your order!');
    }
  };

  const handleCheckout = () => {
    sound.playSporeBloom();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      sound.playChime(880);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end backdrop-blur-md bg-black/75 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#030b06] border-l border-emerald-500/30 flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.8)]"
      >
        <div className="p-4 sm:p-5 border-b border-emerald-900/50 flex items-center justify-between bg-[#041209]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#22c55e]" />
            <h3 className="text-base font-extrabold text-white tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
              Arboreal Specimen Cart
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              {items.reduce((acc, i) => acc + i.quantity, 0)} Arbors
            </span>
          </div>

          <button
            onClick={() => {
              sound.playChime(450);
              onClose();
            }}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-emerald-950/60 transition-colors cursor-pointer"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-[#05180c] border-b border-emerald-900/40">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-zinc-300 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#22c55e]" />
              {amountToFreeShipping === 0 ? (
                <span className="text-[#4ade80] font-bold">You qualify for FREE Climate-Insulated Transit! 🌲</span>
              ) : (
                <span>
                  Add <strong className="text-white">${amountToFreeShipping.toFixed(2)}</strong> for FREE Insulated Freight
                </span>
              )}
            </span>
            <span className="text-[11px] text-zinc-400 font-bold">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-emerald-950 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-[#22c55e] transition-all duration-500 rounded-full shadow-[0_0_8px_#22c55e]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {orderComplete ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-[#22c55e] flex items-center justify-center text-[#22c55e] shadow-[0_0_25px_rgba(34,197,94,0.5)]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-xl font-bold text-white font-['Syne',sans-serif]">Arbor Dispatch Confirmed!</h4>
              <p className="text-xs text-zinc-300 max-w-xs leading-relaxed">
                Your living specimens and rootstocks are being prepared with protective moisture wrap and climate-regulated packaging.
              </p>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-left text-xs text-zinc-300 space-y-1 w-full">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Dispatch ID:</span>
                  <span className="font-mono text-emerald-300">#GL-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Reserve Arbors Planted:</span>
                  <span className="font-bold text-[#4ade80]">+{items.length} Trees</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onClearCart();
                  setOrderComplete(false);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-[#22c55e] text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(34,197,94,0.5)] cursor-pointer"
              >
                Return to Arboretum
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h4 className="text-base font-bold text-white">Your Arbor Cart is Vacant</h4>
              <p className="text-xs text-zinc-400 max-w-xs">
                Explore our living collection of majestic Japanese maples, blossoming cherry canopies, and sub-alpine conifer sentinels.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Browse Arborist Selections
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.product.id}
                className="p-3 rounded-2xl bg-[#05140b] border border-emerald-950 hover:border-emerald-800/60 transition-all flex gap-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 rounded-xl object-cover border border-emerald-950 flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                      <span className="text-[10px] text-emerald-400/90 block">
                        {item.selectedPot || 'Ceramic Charcoal Planter'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        sound.playChime(350);
                        onRemoveItem(item.product.id);
                      }}
                      className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center rounded-lg bg-[#020703] border border-emerald-900/60 p-0.5">
                      <button
                        onClick={() => {
                          sound.playChime(450);
                          onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1));
                        }}
                        className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          sound.playChime(550);
                          onUpdateQuantity(item.product.id, item.quantity + 1);
                        }}
                        className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-extrabold text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary if items present */}
        {items.length > 0 && !orderComplete && (
          <div className="p-4 bg-[#041008] border-t border-emerald-900/60 space-y-3">
            
            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo Code (GREEN10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#020704] border border-emerald-900/60 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-700/50 cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <div className="flex items-center justify-between text-xs text-[#4ade80]">
                <span>🌿 10% Green Rewards Discount:</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="space-y-1.5 text-xs text-zinc-300 pt-2 border-t border-emerald-950">
              <div className="flex justify-between">
                <span className="text-zinc-400">Subtotal:</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Insulated Arbor Freight:</span>
                <span className={shippingCost === 0 ? 'text-[#4ade80] font-bold' : 'text-white'}>
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-emerald-900/40 text-sm font-extrabold text-white">
                <span>Total:</span>
                <span className="text-lg text-[#22c55e]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 rounded-xl bg-[#22c55e] hover:bg-[#4ade80] text-black font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.45)] hover:shadow-[0_0_30px_rgba(74,222,128,0.7)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isCheckingOut ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-black" />
                  <span>Acclimatizing Living Rootstock...</span>
                </>
              ) : (
                <>
                  <span>PROCEED TO ARBOR DISPATCH</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>365-Day Rootstock Vitality Warranty • Master Arborist Support</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
