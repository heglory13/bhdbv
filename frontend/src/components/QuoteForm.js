import React, { useState } from 'react';
import './QuoteForm.css';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    insuranceType: '',
    licensePlate: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <section className="quote-form">
      <div className="quote-container">
        <div className="quote-content">
          <p className="quote-eyebrow">TÍNH PHÍ & MUA BẢO HIỂM NHANH CHÓNG</p>
          <h2 className="quote-heading">CHỈ 1 PHÚT - NHẬN NGAY BÁO GIÁ</h2>
          
          <form className="quote-form-wrapper" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <select 
                  name="insuranceType"
                  value={formData.insuranceType}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
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
                <select 
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
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
                <select 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
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
    </section>
  );
};

export default QuoteForm;