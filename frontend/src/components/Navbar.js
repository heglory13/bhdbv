import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logoImg from '../assets/logo.png';

const defaultLinks = [
  { label: 'Trang chủ', href: '#home' },
  { label: 'Sản phẩm', href: '#products' },
  { label: 'Quyền lợi', href: '#benefits' },
  { label: 'Tin tức', href: '#news' },
  { label: 'Liên hệ', href: '#contact' },
];

const ANNOUNCEMENT_ITEMS = [
  { icon: '🎉', text: 'Nhận báo giá — Giảm ngay 20% phí bảo hiểm!' },
  { icon: '📞', text: 'Hotline tư vấn miễn phí: 0396.379.426' },
  { icon: '⚡', text: 'Chỉ 1 phút nhận báo giá — Bảo vệ xe ngay hôm nay!' },
  { icon: '🎉', text: 'Nhận báo giá — Giảm ngay 20% phí bảo hiểm!' },
  { icon: '📞', text: 'Hotline tư vấn miễn phí: 0396.379.426' },
  { icon: '⚡', text: 'Chỉ 1 phút nhận báo giá — Bảo vệ xe ngay hôm nay!' },
];

const Navbar = ({ links = defaultLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setAnnouncementVisible(window.scrollY < 60);

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const pct = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(pct);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className={`announcement-bar ${announcementVisible ? '' : 'announcement-bar--hidden'}`}>
        <div className="announcement-track">
          {ANNOUNCEMENT_ITEMS.map((item, i) => (
            <a key={i} href="#quote" className="announcement-item">
              <span className="announcement-icon">{item.icon}</span>
              <span className="announcement-text">{item.text}</span>
              <span className="announcement-sep">✦</span>
            </a>
          ))}
        </div>
      </div>

      <header className={`navbar-header ${scrolled ? 'navbar-header--scrolled' : ''} ${announcementVisible ? 'navbar-header--with-bar' : ''}`}>
        {menuOpen && <div className="navbar-overlay" onClick={() => setMenuOpen(false)} />}

        <div className={`navbar-outer ${scrolled ? 'navbar-outer--scrolled' : ''}`}>
          <div className="navbar-shell">
            <a href="#home" className="navbar-logo" aria-label="DBV Insurance">
              <img src={logoImg} alt="Bảo hiểm ô tô DBV" className="navbar-logo__img" />
            </a>

            <div className={`navbar-inner ${scrolled ? 'navbar-inner--scrolled' : ''}`}>
              {scrolled && <div className="navbar-progress" style={{ width: `${scrollProgress}%` }} />}

              <ul className="navbar-links">
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="navbar-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a href="#quote" className="navbar-cta">TÍNH PHÍ VÀ MUA BẢO HIỂM</a>

              <button
                className={`navbar-hamburger ${menuOpen ? 'navbar-hamburger--open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Mở menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="navbar-mobile">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="navbar-mobile__link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#quote" className="navbar-cta navbar-cta--full" onClick={() => setMenuOpen(false)}>TÍNH PHÍ VÀ MUA BẢO HIỂM</a>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
