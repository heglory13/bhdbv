import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const pct = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(pct);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang chủ', href: '#home' },
    { label: 'Sản phẩm', href: '#products' },
    { label: 'Quyền lợi', href: '#benefits' },
    { label: 'Tin tức', href: '#news' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-header--scrolled' : ''}`}>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="navbar-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Outer wrapper — thu hẹp max-width khi scroll */}
      <div className={`navbar-outer ${scrolled ? 'navbar-outer--scrolled' : ''}`}>

        {/* Inner pill — đổi shape khi scroll */}
        <div className={`navbar-inner ${scrolled ? 'navbar-inner--scrolled' : ''}`}>

          {/* Progress bar */}
          {scrolled && (
            <div
              className="navbar-progress"
              style={{ width: `${scrollProgress}%` }}
            />
          )}

          {/* Logo */}
          <div className="navbar-logo">
            <img src={logoImg} alt="DBV Insurance" className="navbar-logo__img" />
          </div>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="navbar-link">{link.label}</a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button className="navbar-cta">TÍNH PHÍ &amp; MUA BẢO HIỂM</button>

          {/* Hamburger */}
          <button
            className={`navbar-hamburger ${menuOpen ? 'navbar-hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="navbar-mobile">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="navbar-mobile__link"
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <button className="navbar-cta navbar-cta--full">
              TÍNH PHÍ &amp; MUA BẢO HIỂM
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
