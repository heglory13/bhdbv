import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-content">
        {/* Logo và mô tả */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 2L35 10V30L20 38L5 30V10L20 2Z" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M15 18L18 21L25 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="logo-text">
              <div className="logo-name">DBV</div>
              <div className="logo-subtitle">Insurance</div>
            </div>
          </div>
          <p className="footer-description">
            DBV cam kết mang đến các giải pháp bảo hiểm ưu việt, bảo vệ bạn và gia đình trước mọi rủi ro.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <span>Zalo</span>
            </a>
          </div>
        </div>

        {/* Sản phẩm */}
        <div className="footer-column">
          <h3 className="footer-title">SẢN PHẨM</h3>
          <ul className="footer-links">
            <li><a href="#">Bảo hiểm xe ô tô</a></li>
            <li><a href="#">Bảo hiểm xe máy</a></li>
            <li><a href="#">Bảo hiểm sức khỏe</a></li>
            <li><a href="#">Bảo hiểm du lịch</a></li>
            <li><a href="#">Bảo hiểm hàng hóa</a></li>
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div className="footer-column">
          <h3 className="footer-title">HỖ TRỢ</h3>
          <ul className="footer-links">
            <li><a href="#">Hướng dẫn mua bảo hiểm</a></li>
            <li><a href="#">Hướng dẫn bồi thường</a></li>
            <li><a href="#">Câu hỏi thường gặp</a></li>
            <li><a href="#">Điều khoản bảo hiểm</a></li>
            <li><a href="#">Liên hệ hỗ trợ</a></li>
          </ul>
        </div>

        {/* Về DBV */}
        <div className="footer-column">
          <h3 className="footer-title">VỀ DBV</h3>
          <ul className="footer-links">
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Tin tức</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div className="footer-column">
          <h3 className="footer-title">LIÊN HỆ</h3>
          <div className="footer-contact">
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>1900 1234</span>
            </div>
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>hotro@dbv.com.vn</span>
            </div>
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Tầng 12, Tòa nhà DBV,<br/>Quận 1, TP. Hồ Chí Minh</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 DBV Insurance. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;