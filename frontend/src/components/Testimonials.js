import React, { useState } from 'react';
import './Testimonials.css';
import avt1 from '../assets/avt1.png';
import avt2 from '../assets/avt2.png';

const testimonials = [
  {
    name: 'Nguyễn Hoàng Nam',
    location: 'Khách hàng tại Hà Nội',
    review: 'Dịch vụ rất nhanh chóng và chuyên nghiệp. Tôi đã được bồi thường chỉ sau 2 ngày, rất hài lòng!',
    avatar: avt1,
    rating: 5,
  },
  {
    name: 'Trần Thu Trang',
    location: 'Khách hàng tại Đà Nẵng',
    review: 'Mua bảo hiểm online rất tiện lợi, thủ tục đơn giản. Nhân viên tư vấn nhiệt tình, hỗ trợ 24/7.',
    avatar: avt2,
    rating: 5,
  },
  {
    name: 'Lê Minh Đức',
    location: 'Khách hàng tại TP.HCM',
    review: 'Quyền lợi tốt, chi phí hợp lý. DBV là lựa chọn số 1 của tôi và gia đình.',
    avatar: avt1,
    rating: 5,
  },
  {
    name: 'Phạm Thị Lan',
    location: 'Khách hàng tại Hải Phòng',
    review: 'Tôi đã sử dụng dịch vụ bảo hiểm của DBV được 3 năm. Rất tin tưởng và hài lòng với chất lượng phục vụ.',
    avatar: '/api/placeholder/80/80',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCurrentTestimonials = () => {
    const start = currentSlide * itemsPerSlide;
    return testimonials.slice(start, start + itemsPerSlide);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ));
  };

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <p className="testimonials-eyebrow">KHÁCH HÀNG NÓI GÌ VỀ DBV</p>
        <h2 className="testimonials-heading">TRIỆU KHÁCH HÀNG TIN TƯƠNG</h2>
        
        <div className="testimonials-slider">
          <div className="testimonials-grid">
            {getCurrentTestimonials().map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-header">
                  <div className="avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                  <div className="customer-info">
                    <h3 className="customer-name">{testimonial.name}</h3>
                    <p className="customer-location">{testimonial.location}</p>
                  </div>
                </div>
                
                <p className="testimonial-review">{testimonial.review}</p>
                
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="slider-dots">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                className={`dot ${currentSlide === i ? 'active' : ''}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;