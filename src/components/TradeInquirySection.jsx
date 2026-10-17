import { useState } from 'react';
import { TRADE_IMAGE } from '../data/images';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function TradeInquirySection() {
  const { ref, visible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', company: '', project: '', notes: '', consent: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'نام الزامی است';
    if (!form.email.trim()) e.email = 'ایمیل الزامی است';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'ایمیل معتبر نیست';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) { setStatus('error'); return; }
    try {
      const pending = JSON.parse(localStorage.getItem('lumiere-trade-inquiries') || '[]');
      pending.push({ ...form, date: new Date().toISOString() });
      localStorage.setItem('lumiere-trade-inquiries', JSON.stringify(pending));
    } catch { /* ignore */ }
    setStatus('success');
    setForm({ name: '', email: '', company: '', project: '', notes: '', consent: false });
  };

  const update = (field) => (e) => {
    const val = field === 'consent' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }));
  };

  return (
    <section className="section" id="trade" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div ref={ref} className={`form-section reverse reveal ${visible ? 'visible' : ''}`}>
          <div className="form-visual">
            <img src={TRADE_IMAGE} alt="اتاق خواب لوکس با پرده‌های مزین" loading="lazy" />
          </div>
          <div className="form-body">
            <span className="eyebrow">برنامه حرفه‌ای</span>
            <h2>برای متخصصان طراحی</h2>
            <p className="intro">مجموعه‌ای منتخب از پارچه‌ها برای طراحان داخلی، معماران، دکوراتورها و پروژه‌های پذیرایی.</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="form-field">
                  <label>نام <span className="req">*</span></label>
                  <input value={form.name} onChange={update('name')} className={errors.name ? 'error' : ''} />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-field">
                  <label>ایمیل <span className="req">*</span></label>
                  <input type="email" value={form.email} onChange={update('email')} className={errors.email ? 'error' : ''} />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-field">
                  <label>شرکت / استودیو</label>
                  <input value={form.company} onChange={update('company')} />
                </div>
                <div className="form-field">
                  <label>نوع پروژه</label>
                  <input value={form.project} onChange={update('project')} placeholder="مثلاً هتل، ویلا، رستوران..." />
                </div>
                <div className="form-field full">
                  <label>یادداشت</label>
                  <textarea value={form.notes} onChange={update('notes')} placeholder="شرح پروژه و نیازهای خود..." />
                </div>
              </div>
              <button type="submit" className="btn btn-gold form-submit">کاوش خدمات حرفه‌ای</button>
              {status === 'success' && (
                <div className="form-message success show">
                  درخواست شما ثبت شد. به‌زودی با شما تماس می‌گیریم.
                </div>
              )}
              {status === 'error' && (
                <div className="form-message error show">
                  لطفاً خطاهای فرم را برطرف کنید.
                </div>
              )}
              <p className="form-note">
                توجه: در محیط توسعه، درخواست‌ها به‌صورت محلی ذخیره می‌شوند. برای ارسال واقعی، اتصال به سرویس ایمیل پیکربندی شود.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
