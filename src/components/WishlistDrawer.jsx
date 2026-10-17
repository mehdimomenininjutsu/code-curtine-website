import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { CloseIcon, HeartIcon, BagIcon } from './Icons';

export function WishlistDrawer() {
  const { items, isOpen, setIsOpen, toggleItem } = useWishlist();
  const { addItem } = useCart();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} aria-hidden={!isOpen} />
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen} role="dialog" aria-label="علاقه‌مندی‌ها">
        <div className="drawer-head">
          <h3>علاقه‌مندی‌ها ({items.length})</h3>
          <button className="icon-btn" aria-label="بستن" onClick={() => setIsOpen(false)}><CloseIcon /></button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <HeartIcon />
              <p>لیست علاقه‌مندی‌های شما خالی است</p>
              <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => setIsOpen(false)}>
                کاوش پارچه‌ها
              </button>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.id}>
                <Link to={`/product/${item.id}`} onClick={() => setIsOpen(false)}>
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span className="price">${item.price} / {item.unit}</span>
                  <div className="cart-item-controls">
                    <button className="btn btn-gold" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => addItem(item, 1)}>
                      <BagIcon style={{ width: 14, height: 14 }} /> افزودن
                    </button>
                    <button className="cart-item-remove" onClick={() => toggleItem(item)}>حذف</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
