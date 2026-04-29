import './StatsBanner.css';
import icon6 from '../assets/6.png';
import icon7 from '../assets/7.png';
import icon8 from '../assets/8.png';
import icon9 from '../assets/9.png';

const stats = [
  {
    icon: <img src={icon6} alt="Năm kinh nghiệm" style={{ width: '110px', height: '110px', objectFit: 'contain' }} />,
    number: '15+',
    label: 'Năm kinh nghiệm',
  },
  {
    icon: <img src={icon7} alt="Khách hàng tin tưởng" style={{ width: '110px', height: '110px', objectFit: 'contain' }} />,
    number: '500,000+',
    label: 'Khách hàng tin tưởng',
  },
  {
    icon: <img src={icon8} alt="Tỷ lệ bồi thường thành công" style={{ width: '110px', height: '110px', objectFit: 'contain' }} />,
    number: '98%',
    label: 'Tỷ lệ bồi thường thành công',
  },
  {
    icon: <img src={icon9} alt="Hỗ trợ khách hàng" style={{ width: '110px', height: '110px', objectFit: 'contain' }} />,
    number: '24/7',
    label: 'Hỗ trợ khách hàng',
  },
];

const StatsBanner = () => (
  <section className="stats-banner">
    <div className="stats-container">
      {stats.map((s, i) => (
        <div className="stat-item" key={i}>
          <div className="stat-icon">{s.icon}</div>
          <div className="stat-text">
            <p className="stat-number">{s.number}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBanner;
