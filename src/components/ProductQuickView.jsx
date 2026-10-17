import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ColorSwatches } from './ColorSwatches';
import { CloseIcon, HeartIcon, HeartFilled, BagIcon } from './Icons';

const categoryLabels = {
  sheer: 'شفاف', blackout: 'بلک‌اوت', velvet: 'مخمل',
  linen: 'کتان', patterned: 'طرح‌دار', contemporary: 'معاصر',
};

export function ProductQuickView({ product, onClose }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wished = isWishlisted(product.id);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quick-view" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`نمای سریع ${product.name}`}>
        <button className="quick-view-close" onClick={onClose} aria-label="بستن"><CloseIcon /></button>
        <div className="quick-view-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="quick-view-info">
          <span className="cat">{categoryLabels[product.category]}</span>
          <h2>{product.name}</h2>
          <span className="price">${product.price} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ {product.unit}</span></span>
          <p className="desc">{product.description}</p>
          <div className="swatch-row">
            <span className="label">رنگ:</span>
            <ColorSwatches colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} size={24} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{product.colors[selectedColor]?.name}</span>
          </div>
          <div className="actions">
            <button className="btn btn-gold" onClick={() => { addItem(product, 1, product.colors[selectedColor]?.name); onClose(); }}>
              <BagIcon style={{ width: 18, height: 18 }} /> افزودن به سبد
            </button>
            <button className="btn btn-outline" onClick={() => toggleItem(product)} aria-label="علاقه‌مندی">
              {wished ? <HeartFilled style={{ width: 18, height: 18 }} /> : <HeartIcon style={{ width: 18, height: 18 }} />}
            </button>
          </div>
          <Link to={`/product/${product.id}`} className="btn-ghost" onClick={onClose} style={{ marginTop: '0.5rem' }}>
            مشاهده جزئیات کامل
          </Link>
        </div>
      </div>
    </div>
  );
}
