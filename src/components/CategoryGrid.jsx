import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { ArrowLeft } from './Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function CategoryGrid() {
  const { ref, visible } = useScrollReveal();
  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">کاوش بافت‌های ما</span>
          <h2 className="section-title">پارچه‌ی مناسب را پیدا کنید</h2>
          <p className="section-intro">از پرده‌های شفاف هوایی تا پارچه‌های جسورانه، بافت‌هایی را کشف کنید که فضای شما را تعریف می‌کنند.</p>
        </div>
        <div ref={ref} className={`category-grid reveal ${visible ? 'visible' : ''}`}>
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/shop/${cat.id}`}
              className={`category-card ${cat.featured ? 'featured' : ''}`}
            >
              <img src={cat.image} alt={cat.name} loading="lazy" />
              <div className="category-card-info">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <span className="category-card-link">
                  کاوش مجموعه <ArrowLeft />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
