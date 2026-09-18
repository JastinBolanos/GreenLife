import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { PlantFinderModal } from './components/PlantFinderModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product } from './types';
import { sound } from './utils/audio';
import { useCart } from './hooks/useCart';
import { useWishlist } from './hooks/useWishlist';

export default function App() {
  const {
    items: cartItems,
    addItem: addToCart,
    updateQuantity: updateCartQuantity,
    removeItem: removeFromCart,
    clearCart,
    totalCount: totalCartCount,
  } = useCart();

  const {
    wishlistIds,
    wishlistProducts,
    toggleWishlist,
    isInWishlist,
    count: wishlistCount,
  } = useWishlist();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isPlantFinderOpen, setIsPlantFinderOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playChime(540);
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleToggleWishlist = (product: Product) => {
    const wasInWishlist = isInWishlist(product.id);
    toggleWishlist(product);
    if (wasInWishlist) {
      showToast(`Removed "${product.name}" from Wishlist`);
    } else {
      showToast(`Saved "${product.name}" to Wishlist ✨`);
    }
  };

  const handleAddToCart = (product: Product, quantity = 1, pot?: any) => {
    addToCart(product, quantity, pot);
    showToast(`Added ${quantity}x "${product.name}" to Cart 🌿`);
  };

  return (
    <div className="min-h-screen bg-[#030905] text-[#e6f4ea] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#22c55e]/30 selection:text-[#4ade80]">
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="px-4 py-2.5 rounded-2xl bg-[#061e11]/95 backdrop-blur-xl border border-emerald-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-xs font-bold text-white flex items-center gap-2">
            <span className="text-[#22c55e]">🌱</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPlantFinder={() => setIsPlantFinderOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const el = document.getElementById('popular-picks');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        <Hero
          onShopTrees={() => {
            setActiveCategory('TREES');
            const el = document.getElementById('popular-picks');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreCollections={() => {
            setActiveCategory('ALL');
            const el = document.getElementById('popular-picks');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenARModal={() => {
            setSelectedProduct(PRODUCTS[0]);
          }}
        />

        <ProductSection
          products={PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onOpenQuickView={(product) => setSelectedProduct(product)}
          selectedCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />
      </main>

      <Footer />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? isInWishlist(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(product) => handleAddToCart(product, 1)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      <PlantFinderModal
        isOpen={isPlantFinderOpen}
        onClose={() => setIsPlantFinderOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />
    </div>
  );
}
