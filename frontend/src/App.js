import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import WhyChoose from './components/WhyChoose';
import StatsBanner from './components/StatsBanner';
import Benefits from './components/Benefits';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import MobileApp from './components/MobileApp';
import News from './components/News';
import Partners from './components/Partners';
import Banner from './components/Banner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="products">
        <Products />
      </section>
      <WhyChoose />
      <StatsBanner />
      <section id="benefits">
        <Benefits />
      </section>
      <Process />
      <FAQ />
      <Testimonials />
      <MobileApp />
      <section id="news">
        <News />
      </section>
      <Partners />
      <Banner />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
}

export default App;
