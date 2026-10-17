import { Link } from 'react-router-dom';
import { AuroraBackground } from './AuroraBackground';
import { HERO_IMAGE } from '../data/images';
import { ArrowLeft } from './Icons';

export function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <img src={HERO_IMAGE} alt="نشیمنکی لوکس با پرده‌های شفاف و نور طبیعی" />
      </div>
      <div className="hero-overlay" />
      <AuroraBackground />
      <div className="hero-content">
        <div className="hero-inner">
          <span className="eyebrow hero-eyebrow">هنر پارچه‌های لوکس</span>
          <h1 className="hero-title">
            فضای خود را با هنر<br />
            <span className="gold-text">پارچه</span> دگرگون کنید
          </h1>
          <p className="hero-subtitle">
            پارچه‌های پرده‌ای استثنایی را کشف کنید که گرمی، بافت و ظرفت جاودان را به هر فضایی می‌آورند.
          </p>
          <div className="hero-cta">
            <Link to="/shop" className="btn btn-gold">کاوش پارچه‌ها</Link>
            <a href="/#collections" className="btn btn-outline" onClick={(e) => {
              e.preventDefault();
              document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
            }}>مجموعه‌های ما را کشف کنید</a>
          </div>
          <p className="hero-trust">پارچه‌های منتخب برای فضاهای متمایز</p>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">SCROLL</div>
    </section>
  );
}
