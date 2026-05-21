import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/volunteer", label: "Volunteer Portal" },
  { to: "/contact", label: "Contact" },
];

const YRC_LOGO = "https://www.annauniv.edu/yrc/images/YRC.jpg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Capsule navbar */}
      <div className="navbar-container">
        <nav className="navbar">
          <Link to="/" className="logo-section">
            <img src={YRC_LOGO} alt="YRC Logo" className="logo" />
            <div className="logo-text">
              <div className="title">SSN YRC</div>
              <div className="subtitle">Youth Red Cross</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="nav-links">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`nav-link ${active ? "active" : ""}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Hamburger button */}
          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "✖" : "☰"}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="mobile-menu">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`mobile-link ${active ? "active" : ""}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
