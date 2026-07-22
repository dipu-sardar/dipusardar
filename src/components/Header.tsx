import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Briefcase, User, Cpu, BookOpen, Mail, Phone } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', section: 'home', icon: Home },
    { label: 'PROJECTS', section: 'projects', icon: Briefcase },
    { label: 'ABOUT', section: 'about', icon: User },
    { label: 'SKILLS', section: 'skills', icon: Cpu },
    { label: 'BLOGS', section: 'blogs', icon: BookOpen },
    { label: 'CONTACT', section: 'contact', icon: Mail }
  ];

  const handleNavItemClick = (section: string) => {
    onNavClick(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <div className="header-logo" onClick={() => handleNavItemClick('home')}>
          <div className="logo-line">DIPU</div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.label}
                className="nav-link-btn"
                onClick={() => handleNavItemClick(item.section)}
                title={item.label}
              >
                <span className="nav-text">{item.label}</span>
                <span className="nav-icon"><IconComponent size={18} /></span>
              </button>
            );
          })}
          <button 
            className="nav-btn-call-btn" 
            onClick={onCallClick}
            title="CALL"
          >
            <span className="nav-text">CALL</span>
            <span className="nav-icon"><Phone size={18} /></span>
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
