import { MessageCircle, MapPin } from 'lucide-react';
import './SupportWidget.css';

const SupportWidget = ({
  contactSupport = {
    zaloUrl: 'https://zalo.me/0901234567',
  },
}) => {
  return (
    <div className="support-widget">
      <a
        className="support-widget__button support-widget__button--zalo"
        href={contactSupport.zaloUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat Zalo"
      >
        <MessageCircle size={18} strokeWidth={2} />
        <span>Zalo</span>
      </a>
      <a className="support-widget__button support-widget__button--map" href="#contact-map" aria-label="Bản đồ">
        <MapPin size={18} strokeWidth={2} />
        <span>Bản đồ</span>
      </a>
    </div>
  );
};

export default SupportWidget;
