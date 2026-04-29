import './Products.css';
import iconOto from '../assets/iconotoo.png';
import iconXeMay from '../assets/iconxemay.png';
import iconSucKhoe from '../assets/iconsuckhoe.png';
import iconDuLich from '../assets/icondulich.png';
import iconHangHoa from '../assets/hanghoa.png';
import iconNha from '../assets/nha.png';

const products = [
  { label: 'Bảo hiểm', name: 'Xe Ô Tô',    desc: 'Bảo vệ toàn diện cho xe và người ngồi trên xe',   img: iconOto },
  { label: 'Bảo hiểm', name: 'Xe Máy',      desc: 'An tâm vi vu trên mọi cung đường',                 img: iconXeMay },
  { label: 'Bảo hiểm', name: 'Sức Khỏe',    desc: 'Chăm sóc sức khỏe toàn diện cho bạn và gia đình', img: iconSucKhoe },
  { label: 'Bảo hiểm', name: 'Du Lịch',     desc: 'An tâm khám phá, trọn vẹn trải nghiệm',           img: iconDuLich },
  { label: 'Bảo hiểm', name: 'Hàng Hóa',    desc: 'Bảo vệ hàng hóa trong quá trình vận chuyển',      img: iconHangHoa },
  { label: 'Bảo hiểm', name: 'Nhà Tư Nhân', desc: 'Bảo vệ ngôi nhà và tài sản trước mọi rủi ro',     img: iconNha },
];

const ArrowBtn = () => (
  <span className="prod-arrow-btn">
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <circle cx="19" cy="19" r="18" stroke="#27ae60" strokeWidth="2"/>
      <path d="M16 13l6 6-6 6" stroke="#27ae60" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
);

const Products = () => (
  <section className="products" id="products">
    <div className="products-inner">

      <p className="prod-eyebrow">SẢN PHẨM NỔI BẬT</p>
      <h2 className="prod-heading">ĐA DẠNG GIẢI PHÁP BẢO HIỂM</h2>
      <p className="prod-subheading">Lựa chọn gói bảo hiểm phù hợp, tận hưởng hành trình trọn vẹn.</p>

      <div className="prod-grid">
        {products.map(({ label, name, desc, img }, i) => (
          <article className="prod-card" key={i} tabIndex={0} role="button" aria-label={`${label} ${name}`}>
            <p className="prod-card-label">{label}</p>
            <h3 className="prod-card-name">{name}</h3>

            {/* Thay img: null bằng import ảnh khi có */}
            <div className="prod-icon-wrap">
              {img
                ? <img src={img} alt={name} className="prod-icon-img" />
                : <div className="prod-icon-placeholder" />
              }
            </div>

            <p className="prod-card-desc">{desc}</p>
            <ArrowBtn />
          </article>
        ))}
      </div>

      <div className="prod-cta">
        <button className="prod-btn-all">XEM TẤT CẢ SẢN PHẨM</button>
      </div>

    </div>
  </section>
);

export default Products;
