import { useState } from 'react';
import { products, filterTabs } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductQuickView } from './ProductQuickView';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { ref, visible } = useScrollReveal();

  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <section className="section" id="products" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">انتخاب امضای ما</span>
          <h2 className="section-title">برای فضاهای <span className="gold-text">استثنایی</span></h2>
          <p className="section-intro">مجموعه‌ای منتخب از پارچه‌های پرده‌ای که کیفیت، بافت و زیبایی را در کنار هم گرد می‌آورند.</p>
        </div>
        <div className="product-filters" role="tablist" aria-label="فیلتر محصولات">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              className={`filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
              role="tab"
              aria-selected={activeFilter === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div ref={ref} className={`product-grid reveal ${visible ? 'visible' : ''}`}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </div>
      {quickViewProduct && (
        <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </section>
  );
}
