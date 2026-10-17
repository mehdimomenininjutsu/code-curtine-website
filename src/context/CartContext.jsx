import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'lumiere-cart';

export function CartProvider({ children }) {
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

  const addItem = useCallback((product, qty = 1, color = null) => {
    setItems(prev => {
      const key = `${product.id}-${color || ''}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i =>
          i.key === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { key, id: product.id, name: product.name, price: product.price, unit: product.unit, image: product.image, qty, color }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    setItems(prev => prev.filter(i => i.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => (i.key === key ? { ...i, qty } : i)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{
      items, count, subtotal, isOpen,
      setIsOpen, addItem, removeItem, updateQty, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
