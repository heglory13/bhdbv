import { Phone, Mail, MapPin, ShieldCheck, Share2, PlayCircle, MessageCircle } from 'lucide-react';
import './Footer.css';

const ContactIcon = ({ type }) => {
  if (type === 'phone') return <Phone size={16} strokeWidth={1.8} />;
  if (type === 'email') return <Mail size={16} strokeWidth={1.8} />;
  return <MapPin size={16} strokeWidth={1.8} />;
};

const Footer = ({
  content = { links: {}, contacts: [] },
  contactSupport = {
    zaloUrl: 'https://zalo.me/0901234567',
    zaloLabel: 'Chat Zalo với tư vấn viên',
    mapEmbedUrl: 'https://www.google.com/maps?q=Quan+1,+Ho+Chi+Minh+City&z=15&output=embed',
    mapTitle: 'Bản đồ văn phòng DBV',
  },
}) => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon">
              <ShieldCheck size={36} strokeWidth={1.5} color="white" />
            </div>
            <div className="logo-text">
              <div className="logo-name">{content.brandName}</div>
              <div className="logo-subtitle">{content.brandSubtitle}</div>
            </div>
          </div>
          <p className="footer-description">{content.description}</p>
          <div className="footer-social">
            <a href="https://facebook.com" className="social-link" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Share2 size={16} strokeWidth={1.8} />
              <span>Facebook</span>
            </a>
            <a href="https://youtube.com" className="social-link" target="_blank" rel="noreferrer" aria-label="YouTube">
              <PlayCircle size={16} strokeWidth={1.8} />
              <span>YouTube</span>
            </a>
            <a href={contactSupport.zaloUrl} className="social-link" target="_blank" rel="noreferrer" aria-label="Zalo">
              <MessageCircle size={16} strokeWidth={1.8} />
              <span>Zalo</span>
            </a>
          </div>
        </div>

        {Object.entries(content.links || {}).map(([sectionTitle, links]) => (
          <div className="footer-column" key={sectionTitle}>
            <h3 className="footer-title">{sectionTitle}</h3>
            <ul className="footer-links">
              {links.map((link) => (
                <li key={`${sectionTitle}-${link.label}`}>
                  <a href={link.href === '#' ? '/#quote' : link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-column">
          <h3 className="footer-title">LIÊN HỆ</h3>
          <div className="footer-contact">
            {content.contacts.map((contact) => (
              <div className="contact-item" key={contact.type}>
                <ContactIcon type={contact.type} />
                <span>{contact.value}</span>
              </div>
            ))}
          </div>
          <a className="footer-zalo-link" href={contactSupport.zaloUrl} target="_blank" rel="noreferrer">
            {contactSupport.zaloLabel}
          </a>
        </div>
      </div>

      <div className="footer-map" id="contact-map">
        <div className="footer-map__copy">
          <p className="footer-map__eyebrow">Tìm đến DBV</p>
          <h3 className="footer-map__title">Bản đồ văn phòng và hỗ trợ Zalo</h3>
          <p className="footer-map__text">
            Khách hàng có thể xem vị trí văn phòng trên bản đồ và kết nối nhanh với bộ phận tư vấn qua Zalo.
          </p>
          <a className="footer-map__cta" href={contactSupport.zaloUrl} target="_blank" rel="noreferrer">
            Mở tư vấn qua Zalo
          </a>
        </div>
        <div className="footer-map__frame">
          <iframe
            title={contactSupport.mapTitle}
            src={contactSupport.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="footer-bottom">
        <p>{content.copyright}</p>
      </div>
    </div>
  </footer>
);

export default Footer;
