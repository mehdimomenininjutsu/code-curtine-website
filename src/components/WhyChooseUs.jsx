import { useScrollReveal } from '../hooks/useScrollReveal';

const principles = [
  { num: '۰۱', title: 'کیفیت منتخب', desc: 'مجموعه‌ای مورد توجه از پارچه‌ها برای فضاهای متمایز.' },
  { num: '۰۲', title: 'بافت و شخصیت', desc: 'بافت‌هایی که عمق، نرمی و شخصیت را به یک فضا می‌آورند.' },
  { num: '۰۳', title: 'الهام طراحی', desc: 'ترکیب‌هایی از رنگ، بافت و نور برای پروژه بعدی شما.' },
  { num: '۰۴', title: 'پشتیبانی پروژه', desc: 'راهنمایی برای انتخاب پارچه‌هایی که با فضا و نیاز شما سازگارند.' },
];

export function WhyChooseUs() {
  const { ref, visible } = useScrollReveal();
  return (
    <section className="section" id="about" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">چرا لومیر فابرکس</span>
          <h2 className="section-title">با دقت انتخاب شده. <span className="gold-text">زیبا بافته شده.</span></h2>
        </div>
        <div ref={ref} className={`why-us-grid reveal ${visible ? 'visible' : ''}`}>
          {principles.map((p, i) => (
            <div className="principle" key={i}>
              <div className="num">{p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
