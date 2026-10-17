import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { navItems } from '../data/navigation';
import { brand } from '../data/brand';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SearchIcon, HeartIcon, BagIcon, UserIcon, CloseIcon, ChevronLeft } from './Icons';

export function MobileMenu({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { count: cartCount, setIsOpen: setCartOpen } = useCart();
  const { count: wishCount, setIsOpen: setWishOpen } = useWishlist();
  const closeBtnRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      onClose();
      const id = href.substring(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    } else {
      onClose();
    }
  };

  return (
    <>
      <div className={`mobile-menu-overlay ${open ? 'open' : ''}`} onClick={onClose} aria-hidden={!open} />
      <aside
        className={`mobile-menu ${open ? 'open' : ''}`}
        aria-hidden={!open}
        aria-label="منوی موبایل"
        role="dialog"
      >
        <div className="mobile-menu-head">
          <Link to="/" onClick={onClose} className="logo">
            <Logo />
            <span className="logo-text">LUMIÈRE <span className="accent">FABRICS</span></span>
          </Link>
          <button ref={closeBtnRef} className="icon-btn" aria-label="بستن منو" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="mobile-menu-search">
          <SearchIcon />
          <input ref={searchRef} type="search" placeholder="جستجوی پارچه..." aria-label="جستجو" />
        </div>
        <nav className="mobile-menu-nav" aria-label="ناوبری موبایل">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
              <ChevronLeft />
            </a>
          ))}
        </nav>
        <div className="mobile-menu-shortcuts">
          <button className="icon-btn" aria-label="حساب کاربری" onClick={onClose}>
            <UserIcon /><span>حساب</span>
          </button>
          <button className="icon-btn" aria-label="علاقه‌مندی‌ها" onClick={() => { onClose(); setWishOpen(true); }}>
            <HeartIcon /><span>علاقه‌مندی ({wishCount})</span>
          </button>
          <button className="icon-btn" aria-label="سبد خرید" onClick={() => { onClose(); setCartOpen(true); }}>
            <BagIcon /><span>سبد ({cartCount})</span>
          </button>
        </div>
        <div className="mobile-menu-contact">
          {brand.email && <p>ایمیل: <a href={`mailto:${brand.email}`}>{brand.email}</a></p>}
          {brand.phone && <p>تلفن: {brand.phone}</p>}
          <p>لومیر فابرکس — ظریفتی بافته‌شده در هر فضا</p>
        </div>
      </aside>
    </>
  );
}
