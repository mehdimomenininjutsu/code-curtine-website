import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function NewsletterForm() {
  const { ref, visible } = useScrollReveal();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('ایمیل الزامی است'); setStatus('error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('ایمیل معتبر نیست'); setStatus('error'); return; }
    try {
      const subs = JSON.parse(localStorage.getItem('lumiere-newsletter') || '[]');
      subs.push({ email, date: new Date().toISOString() });
      localStorage.setItem('lumiere-newsletter', JSON.stringify(subs));
    } catch { /* ignore */ }
    setStatus('success');
    setEmail('');
    setError('');
  };

  return (
    <section className="section newsletter" id="newsletter" style={{ background: 'var(--bg-secondary)' }}>
      <div className="aurora" aria-hidden="true">
        <div className="aurora-glow gold" style={{ top: '0%', insetInlineStart: '20%' }} />
      </div>
      <div ref={ref} className={`newsletter-inner reveal ${visible ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '1rem' }}>خبرنامه</span>
        <h2>یادداشت‌هایی درباره بافت، رنگ و طراحی</h2>
        <p className="intro">الهام طراحی، به‌روزرسانی مجموعه‌ها و ایده‌های منتخب پارچه را دریافت کنید.</p>
        <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            placeholder="ایمیل خود را وارد کنید"
            aria-label="ایمیل"
            className={error ? 'error' : ''}
          />
          <button type="submit" className="btn btn-gold">عضویت</button>
        </form>
        {error && <p style={{ color: '#e88080', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>}
        {status === 'success' && (
          <p style={{ color: 'var(--gold-champagne)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            از عضویت شما سپاسگزاریم!
          </p>
        )}
        <p className="newsletter-consent">با عضویت، موافقت می‌کنید ایمیل‌های لومیر فابرکس را دریافت کنید.</p>
      </div>
    </section>
  );
}
