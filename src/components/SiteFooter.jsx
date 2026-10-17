import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { brand } from '../data/brand';
import { InstagramIcon, PinterestIcon, LinkedinIcon, ArrowUp } from './Icons';

const shopLinks = [
  { label: 'همه پارچه‌ها', to: '/shop' },
  { label: 'پرده‌های شفاف', to: '/shop/sheer' },
  { label: 'بلک‌اوت', to: '/shop/blackout' },
  { label: 'مخمل', to: '/shop/velvet' },
  { label: 'کتان', to: '/shop/linen' },
  { label: 'تازه‌ها', to: '/shop' },
];

const careLinks = [
  { label: 'تماس با ما', href: '#contact' },
  { label: 'سوالات متداول', href: '#faq' },
  { label: 'نمونه پارچه', href: '#samples' },
  { label: 'راهنمای اندازه‌گیری', href: '#faq' },
  { label: 'سیاست ارسال', href: '#faq' },
  { label: 'سیاست بازگشت', href: '#faq' },
];

const companyLinks = [
  { label: 'درباره ما', href: '#about' },
  { label: 'مجموعه‌های ما', href: '#collections' },
  { label: 'برنامه طراحان داخلی', href: '#trade' },
  { label: 'حریم خصوصی', href: '#' },
  { label: 'شرایط و قوانین', href: '#' },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <Logo />
              <span className="logo-text">LUMIÈRE <span className="accent">FABRICS</span></span>
            </Link>
            <p>{brand.description}</p>
            <div className="footer-social">
              <a href={brand.social.instagram} aria-label="اینستاگرام"><InstagramIcon /></a>
              <a href={brand.social.pinterest} aria-label="پینترست"><PinterestIcon /></a>
              <a href={brand.social.linkedin} aria-label="لینکدین"><LinkedinIcon /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>فروشگاه</h4>
            <ul>
              {shopLinks.map((l, i) => (
                <li key={i}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>پشتیبانی</h4>
            <ul>
              {careLinks.map((l, i) => (
                <li key={i}><a href={l.href} onClick={(e) => {
                  if (l.href.startsWith('#')) {
                    e.preventDefault();
                    document.getElementById(l.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>شرکت</h4>
            <ul>
              {companyLinks.map((l, i) => (
                <li key={i}><a href={l.href} onClick={(e) => {
                  if (l.href.startsWith('#') && l.href.length > 1) {
                    e.preventDefault();
                    document.getElementById(l.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} لومیر فابرکس. تمام حقوق محفوظ است.</p>
          <p>ظریفتی بافته‌شده در هر فضا</p>
        </div>
      </div>
    </footer>
  );
}
