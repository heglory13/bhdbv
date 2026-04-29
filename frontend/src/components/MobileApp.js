import './MobileApp.css';

const features = [
  {
    icon: '✓',
    text: 'Mua bảo hiểm nhanh chóng',
  },
  {
    icon: '✓',
    text: 'Theo dõi hợp đồng, lịch sử bồi thường',
  },
  {
    icon: '✓',
    text: 'Nhận thông báo và ưu đãi hấp dẫn',
  },
  {
    icon: '✓',
    text: 'Hỗ trợ 24/7 mọi lúc mọi nơi',
  },
];

const MobileApp = () => (
  <section className="mobile-app">
    {/* Quote Form Section */}
    <div className="quote-section">
      <div className="quote-container">
        <div className="quote-content">
          <p className="quote-eyebrow">TÍNH PHÍ & MUA BẢO HIỂM NHANH CHÓNG</p>
          <h2 className="quote-heading">CHỈ 1 PHÚT - NHẬN NGAY BÁO GIÁ</h2>
          
          <form className="quote-form-wrapper">
            <div className="form-row">
              <div className="form-group">
                <select className="form-select" required>
                  <option value="">Chọn loại bảo hiểm</option>
                  <option value="oto">Bảo hiểm xe ô tô</option>
                  <option value="xemay">Bảo hiểm xe máy</option>
                  <option value="suckhoe">Bảo hiểm sức khỏe</option>
                  <option value="dulich">Bảo hiểm du lịch</option>
                  <option value="hanghoa">Bảo hiểm hàng hóa</option>
                  <option value="nha">Bảo hiểm nhà tư nhân</option>
                </select>
                <div className="select-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <select className="form-select" required>
                  <option value="">Biển số xe</option>
                  <option value="hanoi">Hà Nội (29, 30, 31, 32, 33, 40)</option>
                  <option value="hcm">TP.HCM (50, 51, 52, 53, 54, 55, 56, 57, 58, 59)</option>
                  <option value="danang">Đà Nẵng (43)</option>
                  <option value="haiphong">Hải Phòng (15, 16)</option>
                  <option value="cantho">Cần Thơ (65)</option>
                  <option value="other">Tỉnh thành khác</option>
                </select>
                <div className="select-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <select className="form-select" required>
                  <option value="">Số điện thoại</option>
                  <option value="input">Nhập số điện thoại</option>
                </select>
                <div className="select-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <button type="submit" className="quote-button">
                NHẬN BÁO GIÁ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    {/* Mobile App Section */}
    <div className="mobile-app-container">
      <div className="app-content">
        <div className="app-text">
          <p className="app-eyebrow">ỨNG DỤNG DBV INSURANCE</p>
          <h2 className="app-heading">
            QUẢN LÝ BẢO HIỂM<br />
            DỄ DÀNG TRÊN ĐIỆN THOẠI
          </h2>
          
          <div className="app-features">
            {features.map((feature, index) => (
              <div className="feature-item" key={index}>
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-text">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <div className="download-buttons">
            <a href="#" className="download-btn app-store">
              <div className="btn-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.85 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" fill="white"/>
                </svg>
                <div className="btn-text">
                  <span className="btn-small">Download on the</span>
                  <span className="btn-large">App Store</span>
                </div>
              </div>
            </a>
            
            <a href="#" className="download-btn google-play">
              <div className="btn-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="white"/>
                </svg>
                <div className="btn-text">
                  <span className="btn-small">GET IT ON</span>
                  <span className="btn-large">Google Play</span>
                </div>
              </div>
            </a>
          </div>
        </div>
        
        <div className="app-mockup">
          <img src={require('../assets/mokup.png')} alt="DBV Mobile App" className="phone-mockup-image" />
        </div>
      </div>
    </div>
  </section>
);

export default MobileApp;