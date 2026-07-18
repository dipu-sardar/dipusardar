import React, { useState } from 'react';
import './Hero.css';
import heroImg from '../assets/hero.jpg';
import resumePdf from '../assets/EuroPassCV.pdf';

export const Hero: React.FC = () => {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
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
                onClick={() => setShowResume(true)}
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

      {/* Resume PDF Modal */}
      {showResume && (
        <div className="resume-modal-backdrop fade-in" onClick={() => setShowResume(false)}>
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="resume-modal-header">
              <div className="resume-modal-title">
                <span className="resume-modal-label">RESUME</span>
                <span className="resume-modal-name">Dipu Sardar</span>
              </div>
              <div className="resume-modal-actions">
                <a
                  href={resumePdf}
                  download="Dipu_Sardar_Resume.pdf"
                  className="resume-download-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  DOWNLOAD
                </a>
                <button
                  className="resume-close-btn"
                  onClick={() => setShowResume(false)}
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="resume-pdf-container">
              <iframe
                src={`${resumePdf}#toolbar=0&navpanes=0`}
                title="Dipu Sardar Resume"
                className="resume-pdf-iframe"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
