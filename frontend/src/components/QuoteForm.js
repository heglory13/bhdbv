import React, { useState } from 'react';
import './QuoteForm.css';

const QuoteForm = ({
  quoteSection = {},
  quoteOptions = { insuranceTypes: [], licensePlateRegions: [] },
  onSubmit,
  quoteState = { submitting: false, message: '', error: '' },
}) => {
  const [formData, setFormData] = useState({
    insuranceType: '',
    licensePlateRegion: '',
    phoneNumber: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const succeeded = await onSubmit(formData);

    if (succeeded) {
      setFormData({
        insuranceType: '',
        licensePlateRegion: '',
        phoneNumber: '',
      });
    }
  };

  return (
    <section className="quote-form" id="quote">
      <div className="quote-container">
        <div className="quote-content">
          <p className="quote-eyebrow">{quoteSection.eyebrow}</p>
          <h2 className="quote-heading">{quoteSection.heading}</h2>

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
                  {quoteOptions.insuranceTypes.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <select
                  name="licensePlateRegion"
                  value={formData.licensePlateRegion}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Chọn khu vực</option>
                  {quoteOptions.licensePlateRegions.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="form-select"
                  placeholder="Số điện thoại"
                  required
                />
              </div>

              <button type="submit" className="quote-button" disabled={quoteState.submitting}>
                {quoteState.submitting ? 'ĐANG GỬI...' : quoteSection.button_text || 'NHẬN BÁO GIÁ'}
              </button>
            </div>

            {quoteState.message && <p className="quote-feedback quote-feedback--success">{quoteState.message}</p>}
            {quoteState.error && <p className="quote-feedback quote-feedback--error">{quoteState.error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
