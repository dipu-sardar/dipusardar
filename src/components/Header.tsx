import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onNavClick: (section: string) => void;
  onCallClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavClick,
  onCallClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', section: 'home' },
    { label: 'PROJECTS', section: 'projects' },
    { label: 'ABOUT', section: 'about' },
    { label: 'SKILLS', section: 'skills' },
    { label: 'BLOGS', section: 'blogs' },
    { label: 'CONTACT', section: 'contact' }
  ];

  const handleNavItemClick = (section: string) => {
    onNavClick(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <div className="header-logo" onClick={() => handleNavItemClick('home')}>
          <div className="logo-line">DIPU</div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="nav-link"
              onClick={() => handleNavItemClick(item.section)}
            >
              {item.label}
            </button>
          ))}
          <button className="nav-btn-call" onClick={onCallClick}>
            CALL
          </button>
        </nav>

        {/* Right Controls */}
        <div className="header-controls">
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay fade-in">
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="mobile-nav-link"
                onClick={() => handleNavItemClick(item.section)}
              >
                {item.label}
              </button>
            ))}
            <button 
              className="mobile-nav-link call-nav-btn" 
              onClick={() => { onCallClick(); setMobileMenuOpen(false); }}
            >
              CALL
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
