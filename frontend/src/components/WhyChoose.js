import './WhyChoose.css';
import icon1 from '../assets/1.png';
import icon2 from '../assets/2.png';
import icon3 from '../assets/3.png';
import icon4 from '../assets/4.png';
import icon5 from '../assets/5.png';
import choiceBanner from '../assets/choice.png';

const reasons = [
  {
    icon: <img src={icon1} alt="Thương hiệu uy tín" className="why-reason-img" />,
    title: 'Thương hiệu uy tín',
    desc: 'Hơn 15 năm kinh nghiệm trong lĩnh vực bảo hiểm',
  },
  {
    icon: <img src={icon2} alt="Quy trình đơn giản" className="why-reason-img" />,
    title: 'Quy trình đơn giản',
    desc: 'Thủ tục nhanh gọn, dễ dàng, tiết kiệm thời gian',
  },
  {
    icon: <img src={icon3} alt="Bồi thường minh bạch" className="why-reason-img" />,
    title: 'Bồi thường minh bạch',
    desc: 'Cam kết bồi thường rõ ràng, đúng quy định',
  },
  {
    icon: <img src={icon4} alt="Mạng lưới rộng khắp" className="why-reason-img" />,
    title: 'Mạng lưới rộng khắp',
    desc: 'Hơn 200+ gara liên kết trên toàn quốc',
  },
  {
    icon: <img src={icon5} alt="Công nghệ hiện đại" className="why-reason-img" />,
    title: 'Công nghệ hiện đại',
    desc: 'Nền tảng trực tuyến thông minh, trải nghiệm tiện lợi',
  },
];

const stats = [
  {
    icon: null,
    number: '15+',
    label: 'Năm kinh nghiệm',
  },
  {
    icon: null,
    number: '500,000+',
    label: 'Khách hàng tin tưởng',
  },
  {
    icon: null,
    number: '98%',
    label: 'Tỷ lệ bồi thường thành công',
  },
  {
    icon: null,
    number: '24/7',
    label: 'Hỗ trợ khách hàng',
  },
];

const WhyChoose = () => (
  <section className="why-choose">
    <div className="why-top">
      <p className="why-eyebrow">VÌ SAO CHỌN DBV?</p>
      <h2 className="why-heading">CAM KẾT ĐỒNG HÀNH CÙNG BẠN</h2>

      <div className="why-reasons">
        {reasons.map((r, i) => (
          <div className="why-reason" key={i}>
            <div className="why-reason-icon">
              {r.icon || <div className="why-reason-icon-placeholder" />}
            </div>
            <h3 className="why-reason-title">{r.title}</h3>
            <p className="why-reason-desc">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChoose;
