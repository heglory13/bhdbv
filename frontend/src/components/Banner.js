import { PhoneCall } from 'lucide-react';
import './Banner.css';
import panner2 from '../assets/panner2.png';

const Banner = ({ content = {} }) => (
  <section className="banner-section">
    <div className="banner-container">
      <div className="banner-image">
        <img src={panner2} alt="Banner tư vấn bảo hiểm" className="banner-img" />
        <div className="banner-overlay">
          <div className="banner-content">
            <div className="banner-actions">
              <a className="banner-btn" href="#quote">
                {content.button_text || 'GỬI TƯ VẤN NGAY'}
              </a>
              <div className="banner-phone">
                <div className="phone-icon">
                  <PhoneCall size={24} strokeWidth={1.8} color="currentColor" />
                </div>
                <div className="phone-info">
                  <div className="phone-number">{content.phone_number || '1900 1234'}</div>
                  <div className="phone-text">{content.support_text || 'Hỗ trợ 24/7 miễn phí'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Banner;
