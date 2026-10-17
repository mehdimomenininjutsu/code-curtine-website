import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products, filterTabs } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickView } from '../components/ProductQuickView';
import { SearchIcon } from '../components/Icons';

const categoryLabels = {
  sheer: 'شفاف', blackout: 'بلک‌اوت', velvet: 'مخمل',
  linen: 'کتان', patterned: 'طرح‌دار', contemporary: 'معاصر',
};

export function ShopPage() {
  const { category } = useParams();
  const [activeFilter, setActiveFilter] = useState(category || 'all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    if (category) setActiveFilter(category);
    else setActiveFilter('all');
  }, [category]);

  const filtered = useMemo(() => {
    let result = products;
    if (activeFilter !== 'all') result = result.filter(p => p.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'fa'));
    return result;
  }, [activeFilter, search, sort]);

  const clearFilters = () => {
    setActiveFilter('all');
    setSearch('');
    setSort('default');
  };

  const title = category ? categoryLabels[category] || 'فروشگاه' : 'فروشگاه پارچه';

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>لومیر فابرکس</span>
          <h1>{title}</h1>
          <p>مجموعه‌ای منتخب از پارچه‌های پرده‌ای لوکس</p>
        </div>
        <div className="product-filters" role="tablist">
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
        <div className="shop-toolbar">
          <div className="shop-search">
            <SearchIcon />
            <input
              type="search"
              placeholder="جستجوی پارچه..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="جستجو"
            />
          </div>
          <select className="shop-sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="مرتب‌سازی">
            <option value="default">مرتب‌سازی: پیش‌فرض</option>
            <option value="price-asc">قیمت: کم به زیاد</option>
            <option value="price-desc">قیمت: زیاد به کم</option>
            <option value="name">نام: الفبایی</option>
          </select>
        </div>
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>نتیجه‌ای یافت نشد</h3>
            <p>پارچه‌ای با این مشخصات پیدا نشد. فیلترها را تغییر دهید.</p>
            <button className="btn btn-outline clear-filters" onClick={clearFilters}>پاک کردن فیلترها</button>
          </div>
        )}
      </div>
      {quickViewProduct && (
        <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
