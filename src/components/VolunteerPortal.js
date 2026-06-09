import React, { useState } from "react";
import "./VolunteerPortal.css";
import Header from "./Header";
import Footer from "./Footer";

export default function VolunteerPortal() {
  const [digitalId, setDigitalId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [portalData, setPortalData] = useState(null);

  // Replace with your newly deployed Google Apps Script Web App URL
  const API_URL = "https://script.google.com/macros/s/AKfycbwA9s2bO5lTtFBm2svOIH5hS0rGrnn29AMY34gxBQ7vV8wNC1PoDXOwij3SJSn1GwmgpA/exec";

  const handleFetchData = (e) => {
    e.preventDefault();
    
    // Ensure the ID is provided and is long enough to extract a 2-digit batch
    if (!digitalId || digitalId.trim().length < 2) {
      setError("Please enter a valid Digital ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setPortalData(null);

    // Extract the first two digits to determine the batch (e.g., "23", "24")
    const batch = digitalId.substring(0, 2);

    // Build query parameters
    const targetUrl = `${API_URL}?digitalId=${encodeURIComponent(digitalId)}&batch=${encodeURIComponent(batch)}`;

    fetch(targetUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setPortalData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Portal API Fetch Error:", err);
        setError("Failed to interface with server. Verify connection endpoints.");
        setLoading(false);
      });
  };

  return (
    <div className="portal-container">
      <Header />
      <div style={{ flex: "1 0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="portal-card">
          <h2>Volunteer Dashboard</h2>
          <p className="portal-subtitle">Access your Attendance and Event Records</p>
          
          <form onSubmit={handleFetchData} className="portal-form">
            <div className="form-group">
              <label htmlFor="digitalId">Digital ID</label>
              <input
                id="digitalId"
                type="text"
                placeholder="Eg. 2311234"
                value={digitalId}
                onChange={(e) => setDigitalId(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="portal-submit-btn">
              {loading ? "Accessing Records..." : "CHECK ATTENDANCE STATUS"}
            </button>
          </form>

          {error && <div className="portal-error-msg" style={{ color: 'red', marginTop: '10px' }}>⚠️ {error}</div>}

          {portalData && (
            <div className="portal-results-section">
              <hr className="divider" />
              
              <div className="student-info-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3>Welcome, {portalData.name}</h3>
                <p>Batch of 20{digitalId.substring(0, 2)}</p>
              </div>

              <div className="attendance-metric-card">
                <h3 style={{ marginBottom: '1rem'}}>Aggregated Attendance Status</h3>
                <div className="metric-display-badge">
                  <span className="metric-number">{portalData.attendance}</span>
                  <span className="metric-label">Hours Logged Attendance</span>
                </div>
              </div>

              <div className="events-timeline-section">
                <h3>Attended Events ({portalData.events.length})</h3>
                {portalData.events.length === 0 ? (
                  <p className="no-events-text">No verified attendance records found.</p>
                ) : (
                  <ul className="events-list-wrapper">
                    {portalData.events.map((event, index) => (
                      <li key={index} className="event-item-card" style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
                        <div className="event-meta-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {event.date && <p className="event-date-text" style={{ margin: '0.5rem 0' }}><strong>{event.date}</strong></p>}
                          <h4>{event.name}</h4>
                          <span className="event-badge-id" style={{ background: '#eee', padding: '2px 8px', borderRadius: '4px', fontSize: '0.9em' }}>{event.id}</span>
                        </div>
                        {event.pdfLink && (
                          <a 
                            href={event.pdfLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="event-pdf-link"
                            style={{ display: 'inline-block', marginTop: '0.5rem', color: '#0056b3', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            📄 View Documentation Report
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}