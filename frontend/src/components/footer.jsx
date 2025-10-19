import React from 'react';
import './footer.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="lawease-footer">
      <div className="lawease-footer-container">
        {/* Brand Section */}
        <div className="lawease-footer-section lawease-brand-section">
          <div className="lawease-footer-logo">
            <div className="lawease-logo-icon">⚖️</div>
            <h2>LawEase</h2>
          </div>
          <p className="lawease-tagline">Legal Solutions Simplified</p>
          <p className="lawease-description">
           India's most trusted legal platform connecting people with expert lawyers across 12+ languages.
          </p>
          
          {/* Social Media Icons */}
          <div className="lawease-social-icons">
            <a href="https://facebook.com/lawease" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com/lawease" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/company/lawease" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com/lawease" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Legal Categories Section */}
        <div className="lawease-footer-section">
          <h3>Legal Categories</h3>
          <ul>
            <li><a href="/categories/property-law">Property Law</a></li>
            <li><a href="/categories/family-law">Family Law</a></li>
            <li><a href="/categories/business-law">Business Law</a></li>
            <li><a href="/categories/criminal-law">Criminal Law</a></li>
            <li><a href="/categories/civil-law">Civil Law</a></li>
            <li><a href="/categories/labor-law">Labor Law</a></li>
          </ul>
        </div>

        {/* Platform Section */}
        <div className="lawease-footer-section">
          <h3>Platform</h3>
          <ul>
            <li><a href="/lawyer-connect">Connect with Lawyers</a></li>
            <li><a href="/legal-firms">Legal Firm Directory</a></li>
            <li><a href="/video-library">Video Library</a></li>
            <li><a href="/regional-languages">Regional Languages</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/chatbot">Chat Support</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="lawease-footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/mission">Our Mission</a></li>
            <li><a href="/blog">Blog & Resources</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/partners">Partners</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Support & Contact Section */}
        <div className="lawease-footer-section">
          <h3>Support</h3>
          <ul className="lawease-contact-list">
            <li>
              <span className="lawease-contact-icon">📧</span>
              <a href="mailto:support@lawease.in">support@lawease.in</a>
            </li>
            <li>
              <span className="lawease-contact-icon">💬</span>
              <a href="/help">Help Center</a>
            </li>
            <li>
              <span className="lawease-contact-icon">📚</span>
              <a href="/resources">User Guide</a>
            </li>
          </ul>
          
          {/* Newsletter Signup */}
          <div className="lawease-newsletter-section">
            <p className="lawease-newsletter-text">Subscribe for legal updates</p>
            <form className="lawease-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                aria-label="Email for newsletter"
              />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="lawease-footer-bottom">
        <div className="lawease-footer-container lawease-bottom-container">
          <p className="lawease-copyright">© 2023 LawEase. All rights reserved.</p>
          <div className="lawease-legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <span className="lawease-separator">•</span>
            <a href="/terms-of-service">Terms of Service</a>
            <span className="lawease-separator">•</span>
            <a href="/cookie-policy">Cookie Policy</a>
            <span className="lawease-separator">•</span>
            <a href="/disclaimer">Legal Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
