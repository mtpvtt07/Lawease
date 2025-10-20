import React from "react";
import "./Footer.css";

const Footer = ({ darkMode }) => {
  return (
    <footer className={darkMode ? "footer dark" : "footer light"}>
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section brand">
          <h1 className="footer-logo">LawEase</h1>
          <p className="footer-desc">
            India's most trusted legal platform connecting people with expert
            lawyers.
          </p>
          <div className="social-links">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            {["Property Law", "Family Law", "Business Law", "Criminal Law"].map(
              (service) => (
                <li key={service}>
                  <a href="#">{service}</a>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            {["About Us", "Careers", "Blog", "Partners"].map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>
              <i className="fas fa-phone"></i> 1800-LAW-EASE
            </li>
            <li>
              <i className="fas fa-envelope"></i> help@lawease.in
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i> Bangalore, India
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2023 LawEase. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
