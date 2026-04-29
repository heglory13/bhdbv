import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    question: 'Bảo hiểm xe ô tô có bắt buộc không?',
    answer: 'Theo quy định của pháp luật Việt Nam, bảo hiểm trách nhiệm dân sự của chủ xe cơ giới là bắt buộc. Đây là loại bảo hiểm cơ bản nhất mà mọi chủ xe ô tô phải mua để được lưu hành trên đường.',
  },
  {
    question: 'Thời gian bồi thường mất bao lâu?',
    answer: 'Thời gian bồi thường phụ thuộc vào từng trường hợp cụ thể. Đối với các trường hợp đơn giản, thời gian bồi thường thường từ 7-15 ngày làm việc. Đối với các trường hợp phức tạp cần điều tra thêm, thời gian có thể kéo dài hơn nhưng không quá 30 ngày.',
  },
  {
    question: 'Tôi có thể mua bảo hiểm online được không?',
    answer: 'Có, bạn hoàn toàn có thể mua bảo hiểm online thông qua website chính thức của DBV. Quy trình đơn giản, nhanh chóng và an toàn. Bạn sẽ nhận được hợp đồng điện tử ngay sau khi thanh toán thành công.',
  },
  {
    question: 'Làm thế nào để yêu cầu bồi thường?',
    answer: 'Khi xảy ra sự cố, bạn cần: 1) Báo ngay cho công ty bảo hiểm qua hotline 24/7, 2) Bảo vệ hiện trường và thu thập bằng chứng, 3) Chuẩn bị đầy đủ hồ sơ theo yêu cầu, 4) Nộp hồ sơ tại văn phòng gần nhất hoặc online. Đội ngũ chuyên viên sẽ hỗ trợ bạn trong suốt quá trình.',
  },
  {
    question: 'Chi phí bảo hiểm được tính như thế nào?',
    answer: 'Chi phí bảo hiểm được tính dựa trên nhiều yếu tố như: loại xe, giá trị xe, mục đích sử dụng, khu vực hoạt động, lịch sử bồi thường, và các quyền lợi bổ sung bạn lựa chọn. DBV cung cấp nhiều gói bảo hiểm linh hoạt phù hợp với từng nhu cầu và ngân sách.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq-container">
        <p className="faq-eyebrow">CÂU HỎI THƯỜNG GẶP</p>
        <h2 className="faq-heading">GIẢI ĐÁP THẮC MẮC CỦA BẠN</h2>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              className={`faq-item ${openIndex === index ? 'active' : ''}`} 
              key={index}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span className="question-icon">›</span>
                <span className="question-text">{faq.question}</span>
                <span className="toggle-icon">+</span>
              </button>
              
              <div className="faq-answer">
                <div className="answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;