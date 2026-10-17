import { useState } from 'react';
import { FABRIC_WHITE } from '../data/images';
import { useScrollReveal } from '../hooks/useScrollReveal';

const fabricCategories = ['شفاف', 'بلک‌اوت', 'مخمل', 'کتان', 'طرح‌دار'];
const projectTypes = ['مسکونی', 'ویلا', 'هتل', 'رستوران', 'دفتر کار', 'سایر'];

export function SampleRequestForm() {
  const { ref, visible } = useScrollReveal();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', category: '', project: '', notes: '', consent: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'نام الزامی است';
    if (!form.email.trim()) e.email = 'ایمیل الزامی است';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'ایمیل معتبر نیست';
    if (!form.consent) e.consent = 'پذیرش الزامی است';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) { setStatus('error'); return; }
    // No backend configured — save locally as pending
    try {
      const pending = JSON.parse(localStorage.getItem('lumiere-pending-requests') || '[]');
      pending.push({ ...form, date: new Date().toISOString() });
      localStorage.setItem('lumiere-pending-requests', JSON.stringify(pending));
    } catch { /* ignore */ }
    setStatus('success');
    setForm({ name: '', email: '', phone: '', category: '', project: '', notes: '', consent: false });
  };

  const update = (field) => (e) => {
    const val = field === 'consent' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }));
  };

  return (
    <section className="section" id="samples">
      <div className="container">
        <div ref={ref} className={`form-section reveal ${visible ? 'visible' : ''}`}>
          <div className="form-visual">
            <img src={FABRIC_WHITE} alt="نمونه پارچه شفاف با بافت ظریف" loading="lazy" />
          </div>
          <div className="form-body">
            <span className="eyebrow">درخواست نمونه</span>
            <h2>بافت را قبل از انتخاب حس کنید</h2>
            <p className="intro">رنگ‌ها و بافت‌های مورد نظر خود را قبل از تصمیم‌گیری نهایی بررسی کنید.</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="form-field">
                  <label>نام و نام خانوادگی <span className="req">*</span></label>
                  <input value={form.name} onChange={update('name')} className={errors.name ? 'error' : ''} aria-invalid={!!errors.name} />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-field">
                  <label>ایمیل <span className="req">*</span></label>
                  <input type="email" value={form.email} onChange={update('email')} className={errors.email ? 'error' : ''} aria-invalid={!!errors.email} />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-field">
                  <label>تلفن (اختیاری)</label>
                  <input value={form.phone} onChange={update('phone')} />
                </div>
                <div className="form-field">
                  <label>دسته پارچه مورد نظر</label>
                  <select value={form.category} onChange={update('category')}>
                    <option value="">انتخاب کنید</option>
                    {fabricCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>نوع پروژه</label>
                  <select value={form.project} onChange={update('project')}>
                    <option value="">انتخاب کنید</option>
                    {projectTypes.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-field full">
                  <label>یادداشت (اختیاری)</label>
                  <textarea value={form.notes} onChange={update('notes')} placeholder="رنگ‌ها یا محصولات مورد نظر..." />
                </div>
              </div>
              <div className="form-consent">
                <input type="checkbox" id="sample-consent" checked={form.consent} onChange={update('consent')} />
                <label htmlFor="sample-consent">با ثبت درخواست، موافقم که لومیر فابرکس با من تماس بگیرد. <span className="req">*</span></label>
              </div>
              {errors.consent && <span className="error" style={{ display: 'block', marginBottom: '0.5rem', color: '#e88080', fontSize: '0.75rem' }}>{errors.consent}</span>}
              <button type="submit" className="btn btn-gold form-submit">درخواست نمونه پارچه</button>
              {status === 'success' && (
                <div className="form-message success show">
                  درخواست شما ثبت شد. تیم ما به‌زودی با شما تماس می‌گیرد.
                </div>
              )}
              {status === 'error' && Object.keys(errors).length > 0 && (
                <div className="form-message error show">
                  لطفاً خطاهای فرم را برطرف کنید.
                </div>
              )}
              <p className="form-note">
                توجه: در محیط توسعه، درخواست‌ها به‌صورت محلی ذخیره می‌شوند. برای ارسال واقعی، اتصال به سرویس ایمیل یا API پشتیبان پیکربندی شود.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
