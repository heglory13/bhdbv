import React from 'react';
import './Hero.css';
import pannerImg from '../assets/panner.png';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <img src={pannerImg} alt="DBV Insurance Banner" className="hero-banner" />

      {/* 2 nút overlay góc dưới trái */}
      <div className="hero-buttons">
        <button className="hero-btn hero-btn--primary">
          GỌI TƯ VẤN BẢO HIỂM
        </button>
        <button className="hero-btn hero-btn--outline">
          XEM SẢN PHẨM
        </button>
      </div>
    </section>
  );
};

export default Hero;
