import './Process.css';

const steps = [
  {
    number: '1',
    title: 'Chọn sản phẩm',
    description: 'Lựa chọn gói bảo hiểm\nphù hợp nhu cầu',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M16 20 L32 20" stroke="white" strokeWidth="2"/>
        <path d="M16 24 L28 24" stroke="white" strokeWidth="2"/>
        <path d="M16 28 L24 28" stroke="white" strokeWidth="2"/>
        <path d="M28 28 L32 32 L36 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Cung cấp thông tin',
    description: 'Điền đầy đủ thông tin\ntheo hướng dẫn',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="6" width="28" height="36" rx="3" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M16 16 L32 16" stroke="white" strokeWidth="2"/>
        <path d="M16 22 L28 22" stroke="white" strokeWidth="2"/>
        <path d="M16 28 L24 28" stroke="white" strokeWidth="2"/>
        <circle cx="30" cy="30" r="6" fill="white"/>
        <path d="M27 30 L29 32 L33 28" stroke="#1a6b2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Thanh toán',
    description: 'Thanh toán trực tuyến\nnhanh chóng, an toàn',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="16" width="36" height="24" rx="4" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M6 24 L42 24" stroke="white" strokeWidth="2"/>
        <circle cx="14" cy="32" r="2" fill="white"/>
        <path d="M22 32 L34 32" stroke="white" strokeWidth="2"/>
        <path d="M18 8 L18 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 8 L24 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M30 8 L30 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '4',
    title: 'Nhận hợp đồng',
    description: 'Nhận hợp đồng điện tử\nvà giấy chứng nhận',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="20" r="8" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M12 36 C12 28 17 24 24 24 C31 24 36 28 36 36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="18" r="5" stroke="white" strokeWidth="1.5" fill="none"/>
        <circle cx="38" cy="18" r="5" stroke="white" strokeWidth="1.5" fill="none"/>
        <path d="M6 34 C6 30 7 28 10 28" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M42 34 C42 30 41 28 38 28" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const Process = () => (
  <section className="process">
    <div className="process-container">
      <p className="process-eyebrow">QUY TRÌNH THAM GIA BẢO HIỂM</p>
      <h2 className="process-heading">4 BƯỚC ĐƠN GIẢN</h2>
      
      <div className="process-steps">
        {steps.map((step, i) => (
          <div className="process-step" key={i}>
            <div className="step-circle">
              <div className="step-icon">{step.icon}</div>
            </div>
            {i < steps.length - 1 && <div className="step-connector"></div>}
            <div className="step-content">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;