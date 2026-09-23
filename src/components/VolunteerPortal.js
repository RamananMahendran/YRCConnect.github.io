import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./VolunteerPortal.css";
import Header from "./Header";
import Footer from "./Footer";
import {
  auth,
  googleProvider,
  isCollegeEmail,
  extractDigitalIdFromEmail,
  COLLEGE_DOMAIN
} from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export default function VolunteerPortal() {
  // Auth state
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [digitalId, setDigitalId] = useState("");

  // Portal Data state
  const [portalData, setPortalData] = useState(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState(null);

  // Google Apps Script Web App URL
  const API_URL =
    "https://script.google.com/macros/s/AKfycbyjU39HZ1-qXK7FwlTmvvYwbNdiFUCAQD2RlC4C1Devyt3yk__FLQe7k5mva5BVu6K2/exec";

  // Fetch Attendance Records for the authenticated Digital ID
  const fetchVolunteerRecords = useCallback((id) => {
    if (!id || id.trim().length < 2) {
      setPortalError("Valid Digital ID could not be identified from your account.");
      return;
    }

    setPortalLoading(true);
    setPortalError(null);

    const batch = id.substring(0, 2);
    const targetUrl = `${API_URL}?digitalId=${encodeURIComponent(id)}&batch=${encodeURIComponent(batch)}`;

    fetch(targetUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setPortalError(
            data.message ||
              "Your Digital ID was not found in the active volunteer records for Batch of 20" +
                batch +
                "."
          );
        } else {
          setPortalData(data);
        }
        setPortalLoading(false);
      })
      .catch((err) => {
        console.error("Portal API Fetch Error:", err);
        setPortalError("Failed to interface with attendance database. Please try again later.");
        setPortalLoading(false);
      });
  }, [API_URL]);

  // Process authenticated user
  const processAuthenticatedUser = useCallback((currentUser) => {
    if (!currentUser) {
      setUser(null);
      setDigitalId("");
      setPortalData(null);
      setPortalError(null);
      return;
    }

    const email = currentUser.email || "";

    // 1. Enforce college domain (@ssn.edu.in)
    if (!isCollegeEmail(email)) {
      signOut(auth);
      setUser(null);
      setDigitalId("");
      setAuthError(
        `Access restricted: "${email}" is not an official SSN account. Please sign in using your college email (@${COLLEGE_DOMAIN}).`
      );
      return;
    }

    // 2. Extract Digital ID from email prefix (e.g. ramanan2312001 -> 2312001)
    const extractedId = extractDigitalIdFromEmail(email);
    if (!extractedId) {
      signOut(auth);
      setUser(null);
      setDigitalId("");
      setAuthError(
        `Unable to identify your Digital ID from "${email}". Expected format: <name><digitalId>@${COLLEGE_DOMAIN}`
      );
      return;
    }

    // Valid authenticated volunteer
    setAuthError(null);
    setUser(currentUser);
    setDigitalId(extractedId);
    fetchVolunteerRecords(extractedId);
  }, [fetchVolunteerRecords]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      processAuthenticatedUser(currentUser);
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, [processAuthenticatedUser]);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setAuthLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      processAuthenticatedUser(result.user);
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setAuthError("Sign-in popup closed before authentication was completed.");
      } else if (err.code === "auth/cancelled-popup-request") {
        // Ignored
      } else if (err.code === "auth/network-request-failed") {
        setAuthError("Network connection failed. Please check your internet connection.");
      } else {
        setAuthError(err.message || "Failed to sign in with Google. Please try again.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Sign Out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDigitalId("");
      setPortalData(null);
      setPortalError(null);
      setAuthError(null);
    } catch (err) {
      console.error("Sign Out Error:", err);
    }
  };

  return (
    <div>
      <Header />
      <div className="portal-container">
        <div
          style={{
            flex: "1 0 auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {authChecking ? (
            <div className="portal-card" style={{ textAlign: "center", padding: "40px" }}>
              <div className="portal-loading-container">
                <div className="portal-spinner"></div>
                <p>Verifying volunteer credentials...</p>
              </div>
            </div>
          ) : !user ? (
            /* ==============================================================
               LOGGED-OUT VIEW: GOOGLE SIGN-IN CARD
               ============================================================== */
            <div className="portal-card portal-login-card">
              <h2>Volunteer Portal</h2>
              <p className="portal-subtitle">Official Attendance & Event Participation Records</p>

              <div className="portal-login-hero">
                <p className="portal-login-desc">
                  Sign in with your official college Google account to access your logged hours,
                  verified attendance records, and participation history.
                </p>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={authLoading}
                  className="portal-google-btn"
                >
                  <svg className="portal-google-icon" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span>{authLoading ? "Connecting to Google..." : "Sign in with SSN Google Account"}</span>
                </button>

                <div className="portal-domain-badge">
                  <span>🔒</span>
                  <span>Restricted to @{COLLEGE_DOMAIN}</span>
                </div>
              </div>

              {authError && (
                <div className="portal-auth-alert error">
                  <span>⚠️</span>
                  <div>{authError}</div>
                </div>
              )}
            </div>
          ) : (
            /* ==============================================================
               LOGGED-IN VIEW: DASHBOARD
               ============================================================== */
            <div className="portal-card">
              {/* Top Session Bar */}
              <div className="portal-session-bar">
                <div className="portal-session-user">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "Volunteer"}
                      className="portal-user-avatar"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      className="portal-user-avatar"
                      style={{
                        background: "#1e3a8a",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold"
                      }}
                    >
                      {(user.displayName || user.email || "V").charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="portal-user-meta">
                    <span className="portal-user-name">{user.displayName || "Volunteer"}</span>
                    <span className="portal-user-subtext">
                      <span className="portal-online-dot"></span>
                      <span>{user.email}</span>
                      <span className="portal-digital-pill">ID: {digitalId}</span>
                    </span>
                  </div>
                </div>

                <div className="portal-session-actions">
                  <button type="button" className="portal-action-btn danger" onClick={handleLogout}>
                    🚪 Sign Out
                  </button>
                </div>
              </div>

              <h2>Volunteer Dashboard</h2>
              <p className="portal-subtitle">Verified Attendance and Event Participation Records</p>

              {portalLoading && (
                <div className="portal-loading-container">
                  <div className="portal-spinner"></div>
                  <p>Fetching records for Digital ID {digitalId}...</p>
                </div>
              )}

              {portalError && !portalLoading && (
                <div className="portal-auth-alert error" style={{ margin: "1.5rem 0" }}>
                  <span>⚠️</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                      Attendance Record Notice
                    </div>
                    <div>{portalError}</div>
                    <p style={{ marginTop: "8px", fontSize: "0.88rem" }}>
                      If you attended recent events that are not yet reflected, you can submit an attendance inquiry via the{" "}
                      <Link to="/contact" style={{ color: "#9b1c1c", fontWeight: "700", textDecoration: "underline" }}>
                        Dashboard Support Form
                      </Link>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => fetchVolunteerRecords(digitalId)}
                      style={{
                        marginTop: "8px",
                        background: "none",
                        border: "none",
                        color: "#9b1c1c",
                        fontWeight: "600",
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0
                      }}
                    >
                      🔄 Retry Fetching Records
                    </button>
                  </div>
                </div>
              )}

              {portalData && !portalLoading && (
                <div className="portal-results-section">
                  <hr className="divider" />

                  <div className="student-info-header" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <h3>Welcome, {portalData.name}</h3>
                    <p>
                      {portalData.dept} - Batch of 20{digitalId.substring(0, 2)}
                    </p>
                  </div>

                  <div className="attendance-metric-card">
                    <h3 style={{ marginBottom: "1rem" }}>Aggregated Attendance Status</h3>
                    <div className="metric-display-badge">
                      <span className="metric-number">{portalData.attendance}</span>
                      <span className="metric-label">Hours Logged Attendance</span>
                    </div>
                  </div>

                  <div className="events-timeline-section">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "15px"
                      }}
                    >
                      <h3 style={{ margin: 0 }}>Attended Events ({portalData.events.length})</h3>
                      <button
                        type="button"
                        onClick={() => fetchVolunteerRecords(digitalId)}
                        className="portal-link-btn"
                        style={{ fontSize: "0.82rem" }}
                      >
                        🔄 Refresh Data
                      </button>
                    </div>

                    {portalData.events.length === 0 ? (
                      <p className="no-events-text">No verified attendance records found.</p>
                    ) : (
                      <ul className="events-list-wrapper">
                        {portalData.events.map((event, index) => (
                          <li key={index} className="event-item-card">
                            <div className="event-item-grid">
                              <div className="event-item-date">
                                <strong>{event.date}</strong>
                              </div>
                              <div className="event-item-title-block">
                                <h4 className="event-item-title">{event.name}</h4>
                                <span className="event-item-badge">{event.id}</span>
                              </div>
                              <div className="event-item-action">
                                {event.pdfLink && (
                                  <a
                                    href={event.pdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="event-pdf-link"
                                  >
                                    📄 View Records
                                  </a>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}