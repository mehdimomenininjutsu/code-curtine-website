import { Link } from 'react-router-dom';
import { AuroraBackground } from './AuroraBackground';
import { FINAL_CTA_BG } from '../data/images';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function FinalCTA() {
  const { ref, visible } = useScrollReveal();
  return (
    <section className="final-cta" id="contact">
      <div className="final-cta-bg">
        <img src={FINAL_CTA_BG} alt="" loading="lazy" />
      </div>
      <div className="final-cta-overlay" />
      <AuroraBackground />
      <div ref={ref} className={`final-cta-content reveal ${visible ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
        <h2>هر فضای زیبا با <span className="gold-text" style={{ background: 'var(--gold-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>پارچه‌ی درست</span> آغاز می‌شود</h2>
        <p>پارچه‌هایی را کشف کنید که چشم‌انداز شما را به زندگی می‌آورند.</p>
        <div className="hero-cta">
          <Link to="/shop" className="btn btn-gold">کاوش مجموعه</Link>
          <a href="#samples" className="btn btn-outline" onClick={(e) => {
            e.preventDefault();
            document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth' });
          }}>صحبت با تیم ما</a>
        </div>
      </div>
    </section>
  );
}
