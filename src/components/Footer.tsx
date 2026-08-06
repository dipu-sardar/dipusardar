import React from 'react';
import './Footer.css';

interface FooterProps {
  onNavClick?: (sectionId: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onShowToast }) => {
  const handleDiscussClick = () => {
    if (onNavClick) {
      onNavClick('contact');
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLegalClick = (title: string, msg: string) => {
    if (onShowToast) {
      onShowToast(`${title}: ${msg}`);
    } else {
      alert(`${title}: ${msg}`);
    }
  };

  return (
    <footer className="lime-footer-container">
      {/* Background Graphic Elements */}
      <div className="lime-footer-circle-backdrop" aria-hidden="true"></div>

      {/* Top 3-Column Section */}
      <div className="lime-footer-top">
        {/* Left Column: Contact Details */}
        <div className="lime-footer-col lime-footer-col-left">
          <span className="lime-footer-label">Contact</span>
          <div className="lime-footer-contact-info">
            <a 
              href="mailto:dipusardar.dev@gmail.com" 
              className="lime-footer-email"
              title="Send email to Dipu Sardar"
            >
              dipusardar.dev@gmail.com
            </a>
            <a 
              href="tel:+8801333655039" 
              className="lime-footer-phone"
              title="Call Dipu Sardar"
            >
              +880 1333-655039
            </a>
          </div>
        </div>

        {/* Center Column: CTA & Button */}
        <div className="lime-footer-col lime-footer-col-center">
          <h2 className="lime-footer-cta-title">
            Got a project? Want to collaborate?
          </h2>
          <button 
            className="lime-footer-btn"
            onClick={handleDiscussClick}
            aria-label="Discuss your project"
          >
            <span>Discuss your project</span>
            <svg 
              className="lime-footer-btn-icon" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        {/* Right Column: Location & Domain */}
        <div className="lime-footer-col lime-footer-col-right">
          <div className="lime-footer-location-block">
            <span className="lime-footer-location-title">Location</span>
            <p className="lime-footer-location-text">
              Dhaka, Bangladesh
            </p>
          </div>
          <div className="lime-footer-location-block">
            <span className="lime-footer-location-title">Domain &amp; Role</span>
            <p className="lime-footer-location-text">
              BSc Computer Science &amp; Engineering<br />
              ML Engineer &amp; Designer
            </p>
          </div>
        </div>
      </div>

      {/* Middle Bar: Copyright, Links & Socials */}
      <div className="lime-footer-mid">
        <div className="lime-footer-copyright">
          © Copyright {new Date().getFullYear()}. Dipu Sardar. All rights reserved.
        </div>

        <div className="lime-footer-terms">
          <button 
            onClick={() => handleLegalClick('Terms & Conditions', 'Feel free to explore and clone this open-source portfolio.')}
            className="lime-legal-link"
          >
            Terms &amp; Conditions
          </button>
          <span className="lime-legal-sep">•</span>
          <button 
            onClick={() => handleLegalClick('Privacy Policy', 'All project rights belong to respective research labs and partners.')}
            className="lime-legal-link"
          >
            Privacy Policy
          </button>
        </div>

        <div className="lime-footer-socials">
          {/* GitHub */}
          <a
            href="https://github.com/dipu-sardar"
            target="_blank"
            rel="noopener noreferrer"
            className="lime-social-link"
            aria-label="GitHub"
            title="GitHub Profile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/dipu-sardar-1b6a07321/"
            target="_blank"
            rel="noopener noreferrer"
            className="lime-social-link"
            aria-label="LinkedIn"
            title="LinkedIn Profile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61587013530024"
            target="_blank"
            rel="noopener noreferrer"
            className="lime-social-link"
            aria-label="Facebook"
            title="Facebook Profile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/xeedipu/"
            target="_blank"
            rel="noopener noreferrer"
            className="lime-social-link"
            aria-label="Instagram"
            title="Instagram Profile"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Direct Email Icon */}
          <a
            href="mailto:dipusardar.dev@gmail.com"
            className="lime-social-link"
            aria-label="Mail"
            title="Send Email"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Massive Display Text Banner at Bottom */}
      <div className="lime-footer-banner">
        <h1 className="lime-footer-banner-text">
          LET’S WORK TOGETHER
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
