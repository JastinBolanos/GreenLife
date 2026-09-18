import { useState, useCallback, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/products';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1, selectedPot: 'Ceramic Charcoal' },
    { product: PRODUCTS[5], quantity: 1, selectedPot: 'Terra Cotta Moss' },
  ]);

  const addItem = useCallback((product: Product, quantity = 1, pot?: CartItem['selectedPot']) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedPot: pot || 'Ceramic Charcoal' }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [items]);

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    subtotal,
  };
}
