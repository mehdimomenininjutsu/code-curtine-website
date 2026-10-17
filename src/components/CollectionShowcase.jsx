import { Link } from 'react-router-dom';
import { collections } from '../data/collections';
import { ArrowLeft } from './Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function CollectionShowcase() {
  const { ref, visible } = useScrollReveal();
  return (
    <section className="section" id="collections">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">مجموعه‌های منتخب</span>
          <h2 className="section-title">مجموعه‌هایی با <span className="gold-text">شخصیت</span></h2>
        </div>
        <div ref={ref} className={`collections reveal ${visible ? 'visible' : ''}`}>
          {collections.map((coll, i) => (
            <div key={coll.id} className={`collection-panel ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="collection-image">
                <img src={coll.image} alt={coll.name} loading="lazy" />
              </div>
              <div className="collection-info">
                <span className="eyebrow">{coll.nameEn}</span>
                <h3>{coll.name}</h3>
                <p>{coll.desc}</p>
                <Link to={`/shop/${coll.filter}`} className="btn btn-outline">
                  کشف مجموعه <ArrowLeft style={{ width: 16, height: 16 }} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
