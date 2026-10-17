import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ColorSwatches } from './ColorSwatches';
import { HeartIcon, HeartFilled, BagIcon } from './Icons';

const categoryLabels = {
  sheer: 'شفاف',
  blackout: 'بلک‌اوت',
  velvet: 'مخمل',
  linen: 'کتان',
  patterned: 'طرح‌دار',
  contemporary: 'معاصر',
};

const badgeLabels = {
  new: 'جدید',
  featured: 'ویژه',
};

export function ProductCard({ product, onQuickView }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wished = isWishlisted(product.id);

  return (
    <article className="product-card">
      <div className="product-card-image">
        {product.badge && (
          <span className="product-badge">{badgeLabels[product.badge]}</span>
        )}
        <button
          className={`product-wishlist-btn ${wished ? 'active' : ''}`}
          onClick={() => toggleItem(product)}
          aria-label={wished ? 'حذف از علاقه‌مندی' : 'افزودن به علاقه‌مندی'}
        >
          {wished ? <HeartFilled /> : <HeartIcon />}
        </button>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <button
          className="product-quickview"
          onClick={() => onQuickView?.(product)}
          aria-label="نمای سریع"
        >
          نمای سریع
        </button>
      </div>
      <div className="product-card-body">
        <span className="cat">{categoryLabels[product.category]}</span>
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <span className="price">${product.price} <span className="unit">/ {product.unit}</span></span>
        <ColorSwatches colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
        <div className="product-card-actions">
          <button className="btn btn-gold" onClick={() => addItem(product, 1, product.colors[selectedColor]?.name)}>
            <BagIcon style={{ width: 16, height: 16 }} /> افزودن
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-outline">مشاهده</Link>
        </div>
      </div>
    </article>
  );
}
