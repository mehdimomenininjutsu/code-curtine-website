import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CloseIcon, PlusIcon, MinusIcon, BagIcon } from './Icons';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, subtotal, count } = useCart();

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
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen} role="dialog" aria-label="سبد خرید">
        <div className="drawer-head">
          <h3>سبد خرید ({count})</h3>
          <button className="icon-btn" aria-label="بستن" onClick={() => setIsOpen(false)}><CloseIcon /></button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <BagIcon />
              <p>سبد خرید شما خالی است</p>
              <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => setIsOpen(false)}>
                ادامه خرید
              </button>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.key}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  {item.color && <span className="color">رنگ: {item.color}</span>}
                  <span className="price">${item.price} / {item.unit}</span>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.key, item.qty - 1)} aria-label="کاهش"><MinusIcon /></button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.key, item.qty + 1)} aria-label="افزایش"><PlusIcon /></button>
                    <button className="cart-item-remove" onClick={() => removeItem(item.key)}>حذف</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-subtotal">
              <span className="label">جمع کل</span>
              <span className="val">${subtotal.toFixed(2)}</span>
            </div>
            <button className="btn btn-gold" style={{ width: '100%' }}>تسویه حساب</button>
            <p className="cart-checkout-note">
              توجه: اتصال به درگاه پرداخت هنوز پیکربندی نشده است. این مرحله پس از راه‌اندازی کامل فعال می‌شود.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
