import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const WishlistContext = createContext(null);

const STORAGE_KEY = 'lumiere-wishlist';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* ignore */ }
  }, [items]);

  const toggleItem = useCallback((product) => {
    setItems(prev => {
      if (prev.some(i => i.id === product.id)) {
        return prev.filter(i => i.id !== product.id);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, unit: product.unit, image: product.image }];
    });
  }, []);

  const isWishlisted = useCallback((id) => items.some(i => i.id === id), [items]);

  return (
    <WishlistContext.Provider value={{
      items, count: items.length, isOpen, setIsOpen, toggleItem, isWishlisted,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
