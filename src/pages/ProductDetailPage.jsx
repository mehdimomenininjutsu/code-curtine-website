import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ColorSwatches } from '../components/ColorSwatches';
import { ProductCard } from '../components/ProductCard';
import { HeartIcon, HeartFilled, BagIcon, PlusIcon, MinusIcon, ArrowLeft, RulerIcon } from '../components/Icons';

const categoryLabels = {
  sheer: 'شفاف', blackout: 'بلک‌اوت', velvet: 'مخمل',
  linen: 'کتان', patterned: 'طرح‌دار', contemporary: 'معاصر',
};

export function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  // Measurement calculator state
  const [calc, setCalc] = useState({ width: '', drop: '', fullness: '2', unit: 'cm' });
  const [calcResult, setCalcResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setSelectedColor(0);
    setQty(1);
    setCalcResult(null);
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="empty-state">
            <h3>محصول یافت نشد</h3>
            <p>محصول مورد نظر وجود ندارد.</p>
            <Link to="/shop" className="btn btn-outline" style={{ marginTop: '1rem' }}>بازگشت به فروشگاه</Link>
          </div>
        </div>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const calculateFabric = () => {
    const width = parseFloat(calc.width);
    const drop = parseFloat(calc.drop);
    if (!width || !drop) return;
    const fullness = parseFloat(calc.fullness);
    const isMetric = calc.unit === 'cm';
    const fabricWidth = isMetric ? 137 : 54; // standard fabric width
    const hemAllowance = isMetric ? 20 : 8;
    const totalWidthNeeded = width * fullness;
    const numberOfWidths = Math.ceil(totalWidthNeeded / fabricWidth);
    const fabricNeeded = numberOfWidths * (drop + hemAllowance);
    setCalcResult({ fabricNeeded, numberOfWidths, unit: isMetric ? 'cm' : 'inch', fabricWidth });
  };

  return (
    <div className="product-detail">
      <div className="container">
        <nav className="breadcrumb" aria-label="مسیر">
          <Link to="/">خانه</Link>
          <span className="sep">/</span>
          <Link to="/shop">فروشگاه</Link>
          <span className="sep">/</span>
          <Link to={`/shop/${product.category}`}>{categoryLabels[product.category]}</Link>
          <span className="sep">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="product-gallery-main">
              <img src={product.gallery[selectedImage]} alt={product.name} />
            </div>
            {product.gallery.length > 1 && (
              <div className="product-gallery-thumbs">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    className={`product-gallery-thumb ${selectedImage === i ? 'active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`تصویر ${i + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-detail-info">
            <span className="cat">{categoryLabels[product.category]}</span>
            <h1>{product.name}</h1>
            <span className="price">${product.price} <span className="unit">/ {product.unit}</span></span>
            <p className="desc">{product.description}</p>

            {/* Color selector */}
            <div className="color-selector">
              <span className="label">رنگ:</span>
              <ColorSwatches colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} size={28} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{product.colors[selectedColor]?.name}</span>
            </div>

            {/* Quantity */}
            <div className="qty-selector">
              <span className="label">تعداد:</span>
              <div className="qty-input">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="کاهش"><MinusIcon /></button>
                <input type="number" value={qty} min="1" onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} aria-label="تعداد" />
                <button onClick={() => setQty(q => q + 1)} aria-label="افزایش"><PlusIcon /></button>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.unit}</span>
            </div>

            {/* Actions */}
            <div className="product-detail-actions">
              <button className="btn btn-gold" onClick={() => addItem(product, qty, product.colors[selectedColor]?.name)}>
                <BagIcon style={{ width: 18, height: 18 }} /> افزودن به سبد
              </button>
              <button className="btn btn-outline" onClick={() => toggleItem(product)}>
                {wished ? <HeartFilled style={{ width: 18, height: 18 }} /> : <HeartIcon style={{ width: 18, height: 18 }} />}
                علاقه‌مندی
              </button>
              <a href="#samples" className="btn btn-outline" onClick={(e) => {
                e.preventDefault();
                document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth' });
              }}>درخواست نمونه</a>
            </div>

            {/* Measurement Calculator */}
            <div className="product-detail-section">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <RulerIcon style={{ width: 20, height: 20, color: 'var(--gold)' }} />
                محاسبه مقدار پارچه
              </h3>
              <div className="calc-box">
                <div className="calc-row">
                  <div className="calc-field">
                    <label>عرض ریل پرده</label>
                    <input type="number" value={calc.width} onChange={(e) => setCalc(c => ({ ...c, width: e.target.value }))} placeholder={calc.unit === 'cm' ? 'سانتی‌متر' : 'اینچ'} />
                  </div>
                  <div className="calc-field">
                    <label>طول پرده (دراپ)</label>
                    <input type="number" value={calc.drop} onChange={(e) => setCalc(c => ({ ...c, drop: e.target.value }))} placeholder={calc.unit === 'cm' ? 'سانتی‌متر' : 'اینچ'} />
                  </div>
                </div>
                <div className="calc-row">
                  <div className="calc-field">
                    <label>میزان چین‌خوردگی (فولنس)</label>
                    <select value={calc.fullness} onChange={(e) => setCalc(c => ({ ...c, fullness: e.target.value }))}>
                      <option value="1.5">۱.۵ برابر</option>
                      <option value="2">۲ برابر</option>
                      <option value="2.5">۲.۵ برابر</option>
                      <option value="3">۳ برابر</option>
                    </select>
                  </div>
                  <div className="calc-field">
                    <label>واحد اندازه‌گیری</label>
                    <select value={calc.unit} onChange={(e) => setCalc(c => ({ ...c, unit: e.target.value }))}>
                      <option value="cm">سانتی‌متر</option>
                      <option value="inch">اینچ</option>
                    </select>
                  </div>
                </div>
                <button className="btn btn-outline" style={{ width: '100%' }} onClick={calculateFabric}>محاسبه</button>
                {calcResult && (
                  <div className="calc-result">
                    <div className="val">{calcResult.fabricNeeded} {calcResult.unit === 'cm' ? 'سانتی‌متر' : 'اینچ'}</div>
                    <div className="label">مقدار پارچه تخمینی (تقریباً {calcResult.numberOfWidths} لایه)</div>
                  </div>
                )}
                <p className="calc-note">
                  این محاسبه تخمینی است و بر اساس عرض استاندارد پارچه ({calcResult?.unit === 'cm' ? '۱۳۷ سانتی‌متر' : '۵۴ اینچ'}) و allowance درز انجام می‌شود.
                  برای اندازه‌گیری دقیق، با مشاور ما تماس بگیرید. این محاسبه جایگزین مشاوره حرفه‌ای نیست.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="related-products">
            <div className="section-head" style={{ marginBottom: '2rem' }}>
              <span className="eyebrow">پارچه‌های مرتبط</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>شاید این‌ها را هم بپسندید</h2>
            </div>
            <div className="product-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
