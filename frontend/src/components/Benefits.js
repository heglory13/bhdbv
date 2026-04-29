import './Benefits.css';
import icon10 from '../assets/10.png';
import icon11 from '../assets/11.png';
import icon12 from '../assets/12.png';
import icon13 from '../assets/13.png';
import icon14 from '../assets/14.png';

const benefits = [
  {
    icon: <img src={icon10} alt="Bảo vệ toàn diện" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />,
    title: 'Bảo vệ toàn diện',
    description: 'Đa dạng quyền lợi\nphù hợp nhu cầu',
  },
  {
    icon: <img src={icon11} alt="Chi phí hợp lý" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />,
    title: 'Chi phí hợp lý',
    description: 'Mức phí cạnh tranh,\nhiều ưu đãi hấp dẫn',
  },
  {
    icon: <img src={icon12} alt="Hỗ trợ 24/7" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />,
    title: 'Hỗ trợ 24/7',
    description: 'Tư vấn và hỗ trợ mọi lúc,\nmọi nơi',
  },
  {
    icon: <img src={icon13} alt="Bồi thường nhanh chóng" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />,
    title: 'Bồi thường nhanh chóng',
    description: 'Quy trình đơn giản,\nnhận bồi thường nhanh',
  },
  {
    icon: <img src={icon14} alt="Tự do lựa chọn" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />,
    title: 'Tự do lựa chọn',
    description: 'Linh hoạt lựa chọn gói\nbảo hiểm phù hợp',
  },
];

const Benefits = () => (
  <section className="benefits">
    <div className="benefits-container">
      <p className="benefits-eyebrow">QUYỀN LỢI KHI THAM GIA BẢO HIỂM DBV</p>
      <h2 className="benefits-heading">BẢO VỆ TOÀN DIỆN – AN TÂM TRỌN VẸN</h2>
      
      <div className="benefits-grid">
        {benefits.map((benefit, i) => (
          <div className="benefit-item" key={i}>
            <div className="benefit-icon">{benefit.icon}</div>
            <h3 className="benefit-title">{benefit.title}</h3>
            <p className="benefit-description">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
