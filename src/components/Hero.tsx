import React from 'react';
import './Hero.css';
import heroImg from '../assets/hero.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section fade-in" id="home">
      <div className="hero-grid-simple">
        {/* Left Side: Name and Subtitle */}
        <div className="hero-title-card-simple">
          <h1 className="hero-title-name">DIPU</h1>
          <h1 className="hero-title-name font-tight">SARDAR</h1>
          <p className="hero-subtitle-simple">ML ENGINEER & DESIGNER</p>
          
          <p className="hero-short-bio">
            Designing custom neural network architectures and technical design interfaces to bridge computation and aesthetics.
          </p>

          <div className="hero-buttons-group">
            <button 
              className="hero-btn primary-btn"
              onClick={() => alert('Resume download simulated: Resume file download will start shortly.')}
            >
              RESUME
            </button>
            <a 
              href="https://github.com/dipu-sardar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-btn secondary-btn"
            >
              GITHUB
            </a>
            <a 
              href="mailto:dipusardar.dev@gmail.com" 
              className="hero-btn secondary-btn"
            >
              MAIL
            </a>
          </div>
        </div>

        {/* Right Side: One Picture */}
        <div className="hero-image-card-simple">
          <img src={heroImg} alt="Dipu Sardar Portfolio Banner" className="hero-single-img" />
        </div>
      </div>
    </section>
  );
};
