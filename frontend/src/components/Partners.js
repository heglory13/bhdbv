import './Partners.css';
import toyotaLogo from '../assets/toyota.png';
import hondaLogo from '../assets/honda.png';
import fordLogo from '../assets/ford.png';
import vinLogo from '../assets/vin.png';
import thacoLogo from '../assets/thaco.png';

const Partners = () => (
  <section className="partners">
    <div className="partners-container">
      <h2 className="partners-heading">ĐỐI TÁC CỦA DBV</h2>
      
      <div className="partners-grid">
        <div className="partner-item">
          <img 
            src={toyotaLogo} 
            alt="Toyota"
            className="partner-logo"
          />
        </div>
        <div className="partner-item">
          <img 
            src={hondaLogo} 
            alt="Honda"
            className="partner-logo"
          />
        </div>
        <div className="partner-item">
          <img 
            src={fordLogo} 
            alt="Ford"
            className="partner-logo"
          />
        </div>
        <div className="partner-item">
          <img 
            src={vinLogo} 
            alt="VinFast"
            className="partner-logo"
          />
        </div>
        <div className="partner-item">
          <img 
            src={thacoLogo} 
            alt="Thaco"
            className="partner-logo"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Partners;