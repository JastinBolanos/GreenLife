import { useState, useCallback, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    PRODUCTS[1].id,
    PRODUCTS[3].id,
  ]);

  const toggleWishlist = useCallback((product: Product): boolean => {
    let isAdded = false;
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        isAdded = false;
        return prev.filter((id) => id !== product.id);
      } else {
        isAdded = true;
        return [...prev, product.id];
      }
    });
    return isAdded;
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  return {
    wishlistIds,
    wishlistProducts,
    toggleWishlist,
    isInWishlist,
    count: wishlistIds.length,
  };
}
