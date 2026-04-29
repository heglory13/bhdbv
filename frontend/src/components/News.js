import './News.css';

const newsArticles = [
  {
    category: 'Kinh nghiệm',
    categoryColor: '#1a6b2f',
    date: '20/04/2024',
    title: '5 kinh nghiệm lái xe an toàn mùa mưa bão',
    description: 'Những lưu ý quan trọng giúp bạn lái xe an toàn trong điều kiện thời tiết xấu.',
    image: 'https://bhdbv.com/wp-content/uploads/2020/10/bhdbv-baohiemxe-autocare-1024x512.jpg',
    link: '#'
  },
  {
    category: 'Tin tức',
    categoryColor: '#1a6b2f',
    date: '18/04/2024',
    title: 'DBV ra mắt gói bảo hiểm xe ô tô toàn diện mới',
    description: 'Quyền lợi vượt trội, phí cạnh tranh, bảo vệ tối ưu cho xe yêu của bạn.',
    image: 'https://bhdbv.com/wp-content/uploads/2026/03/dbv-allianz-partners-thailand-buoc-ngoat-bao-hiem-xe-co-gioi-viet-nam-1024x512.jpg',
    link: '#'
  },
  {
    category: 'Hướng dẫn',
    categoryColor: '#1a6b2f',
    date: '15/04/2024',
    title: 'Hướng dẫn yêu cầu bồi thường trực tuyến',
    description: 'Các bước đơn giản để yêu cầu bồi thường nhanh chóng và thuận tiện.',
    image: 'https://bhdbv.com/wp-content/uploads/2026/02/trien-khai-cap-giay-chung-nhan-dang-kiem-dien-tu-01-3-2026-1024x512.jpg',
    link: '#'
  }
];

const News = () => (
  <section className="news">
    <div className="news-container">
      <div className="news-header">
        <div className="news-titles">
          <p className="news-eyebrow">TIN TỨC MỚI NHẤT</p>
          <h2 className="news-heading">CẬP NHẬT THÔNG TIN HỮU ÍCH</h2>
        </div>
        <button className="view-all-btn">XEM TẤT CẢ</button>
      </div>
      
      <div className="news-grid">
        {newsArticles.map((article, index) => (
          <article className="news-card" key={index}>
            <div className="news-image">
              <img src={article.image} alt={article.title} />
              <div className="news-meta">
                <span 
                  className="news-category" 
                  style={{ backgroundColor: article.categoryColor }}
                >
                  {article.category}
                </span>
                <span className="news-date">{article.date}</span>
              </div>
            </div>
            
            <div className="news-content">
              <h3 className="news-title">{article.title}</h3>
              <p className="news-description">{article.description}</p>
              <a href={article.link} className="read-more">
                Đọc thêm →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default News;