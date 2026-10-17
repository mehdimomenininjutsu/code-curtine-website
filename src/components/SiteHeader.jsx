import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { navItems } from '../data/navigation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SearchIcon, UserIcon, HeartIcon, BagIcon, MenuIcon } from './Icons';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count: cartCount, setIsOpen: setCartOpen } = useCart();
  const { count: wishCount, setIsOpen: setWishOpen } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.substring(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    }
  };

  const isHome = location.pathname === '/';
  const isScrolled = scrolled || !isHome;

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="logo" aria-label="لومیر فابرکس">
            <Logo />
            <span className="logo-text">LUMIÈRE <span className="accent">FABRICS</span></span>
          </Link>
          <nav className="desktop-nav" aria-label="ناوبری اصلی">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={location.pathname === item.href ? 'active' : ''}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="icon-btn" aria-label="جستجو"><SearchIcon /></button>
            <button className="icon-btn" aria-label="حساب کاربری"><UserIcon /></button>
            <button className="icon-btn" aria-label="علاقه‌مندی‌ها" onClick={() => setWishOpen(true)}>
              <HeartIcon />
              {wishCount > 0 && <span className="count-badge">{wishCount}</span>}
            </button>
            <button className="icon-btn cart-btn" aria-label="سبد خرید" onClick={() => setCartOpen(true)}>
              <BagIcon />
              {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
            </button>
            <button className="icon-btn menu-toggle" aria-label="باز کردن منو" onClick={() => setMenuOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
