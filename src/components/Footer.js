import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Organization Info */}
        <div className="footer-section">
          <h3>SSN YRC</h3>
          <p>Youth Red Cross</p>
          <p>Serve with Heart, Give with Love 💗</p>
          <p>A voluntary humanitarian movement at SSN College of Engineering.</p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4>NAVIGATE</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/volunteer">Volunteer Portal</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h4>CONNECT</h4>
          <div className="social-links">
            <a href="mailto:ssnyrcofficial@gmail.com" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 4h20v16H2V4zm2 2v12h16V6l-8 5-8-5z"/>
              </svg>
            </a>
            <a href="http://www.instagram.com/ssn_yrc" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 0116.5 4z"/>
              </svg>
            </a>
            <a href="http://www.linkedin.com/company/ssn-yrc" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66V24h-5v-7.6c0-1.81-.03-4.14-2.52-4.14-2.52 0-2.91 1.96-2.91 4v7.74h-5V8z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61572084284279" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="http://x.com/SSN_YRC" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.1 9.1 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.12 1.03A12.85 12.85 0 013 1.1a4.52 4.52 0 001.4 6.03A4.48 4.48 0 012.8 6.7v.06c0 2.2 1.56 4.04 3.64 4.46a4.52 4.52 0 01-2.04.08c.57 1.78 2.23 3.08 4.2 3.12A9.05 9.05 0 012 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © SSN Youth Red Cross 2026
      </div>
    </footer>
  );
}
