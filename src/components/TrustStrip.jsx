import { SparkleIcon, ScissorsIcon, RulerIcon, ShieldIcon } from './Icons';

const items = [
  { icon: SparkleIcon, text: 'انتخاب پارچه‌های ممتاز' },
  { icon: ScissorsIcon, text: 'مجموعه‌های منتخب' },
  { icon: RulerIcon, text: 'نمونه پارچه در دسترس' },
  { icon: ShieldIcon, text: 'پرداخت امن' },
];

export function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="container">
        <div className="trust-grid">
          {items.map((item, i) => (
            <div className="trust-item" key={i}>
              <item.icon />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
