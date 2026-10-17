import { useState, useEffect, useCallback } from 'react';
import { lookbook } from '../data/lookbook';
import { CloseIcon, ChevronLeft, ChevronRight } from './Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function LookbookGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { ref, visible } = useScrollReveal();

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(() => setLightboxIndex(i => (i + 1) % lookbook.length), []);
  const prev = useCallback(() => setLightboxIndex(i => (i - 1 + lookbook.length) % lookbook.length), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') prev();
      if (e.key === 'ArrowLeft') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [lightboxIndex, closeLightbox, next, prev]);

  // Asymmetric layout classes
  const layoutClasses = ['wide', '', 'tall', '', '', 'tall', 'wide', ''];

  return (
    <section className="section" id="lookbook">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">الهام‌بخش</span>
          <h2 className="section-title">فضاهایی که <span className="gold-text">داستان می‌گویند</span></h2>
          <p className="section-intro">گالری منتخبی از فضاهای داخلی که با پارچه‌های ما شکل گرفته‌اند.</p>
        </div>
        <div ref={ref} className={`lookbook-grid reveal ${visible ? 'visible' : ''}`}>
          {lookbook.map((item, i) => (
            <button
              key={i}
              className={`lookbook-item ${layoutClasses[i] || ''}`}
              onClick={() => openLightbox(i)}
              aria-label={`مشاهده تصویر: ${item.caption}`}
            >
              <img src={item.image} alt={item.caption} loading="lazy" />
              <span className="caption">{item.caption}</span>
            </button>
          ))}
        </div>
      </div>
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-label="نمایشگر تصویر">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="بستن"><CloseIcon /></button>
          <img className="lightbox-img" src={lookbook[lightboxIndex].image} alt={lookbook[lightboxIndex].caption} onClick={(e) => e.stopPropagation()} />
          <p className="lightbox-caption">{lookbook[lightboxIndex].caption}</p>
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="قبلی"><ChevronRight /></button>
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="بعدی"><ChevronLeft /></button>
        </div>
      )}
    </section>
  );
}
