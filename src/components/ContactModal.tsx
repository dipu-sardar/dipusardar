import React, { useState } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';
import './ContactModal.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate form submission
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('General Support');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="contact-modal-backdrop fade-in" onClick={onClose}>
      <div className="contact-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="contact-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-header">
              <div className="contact-icon-circle">
                <Mail size={22} />
              </div>
              <h2 className="contact-title">CONTACT DIPU SARDAR</h2>
              <p className="contact-subtitle">
                Looking to build a machine learning model, design an interface, or collaborate? Send me a message below.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">NAME</label>
              <input 
                type="text" 
                id="contact-name"
                className="form-input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">EMAIL</label>
              <input 
                type="email" 
                id="contact-email"
                className="form-input"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject" className="form-label">SUBJECT</label>
              <div className="select-wrapper">
                <select 
                  id="contact-subject"
                  className="form-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="General Support">General Inquiry</option>
                  <option value="Order Inquiry">Project Consulting</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Press">Research / Speaking</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">MESSAGE</label>
              <textarea 
                id="contact-message"
                className="form-textarea"
                placeholder="How can we help you?"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              SEND MESSAGE
            </button>
          </form>
        ) : (
          <div className="contact-success-state fade-in">
            <CheckCircle size={56} className="success-icon" />
            <h2 className="success-title">MESSAGE SENT</h2>
            <p className="success-desc">
              Thank you for reaching out. I will review your message and get back to you shortly.
            </p>
            <button className="success-close-btn" onClick={handleReset}>
              CLOSE WINDOW
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
