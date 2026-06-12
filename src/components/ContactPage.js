import React, { useState, useEffect, useRef } from "react";
import "./ContactPage.css";
import Header from "./Header";
import Footer from "./Footer";

export default function ContactPage() {
  const [organizers, setOrganizers] = useState([]);
  const [loadingOrganizers, setLoadingOrganizers] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState("2026");
  const organizersCache = useRef({});

  // Configuration for dashboard support email routing
  const DASHBOARD_SUPPORT_API_URL = "https://script.google.com/macros/s/AKfycbwQ5bQqQ-odREoNb609QFv7xLuL9JJomMwvgbsUCYqxps4Mm1TcQDnlYWBh-bPgBB3C/exec"; // Paste the deployed Google Apps Script URL here

  // Support Form State variables
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [digitalId, setDigitalId] = useState("");
  const [deptYear, setDeptYear] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [base64File, setBase64File] = useState(null);
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitError, setSubmitError] = useState("");

  // PASTE YOUR NEW SEPARATE ORGANIZERS SCRIPT URL HERE
  const ORGANIZERS_API_URL = "https://script.google.com/macros/s/AKfycbwvVxo1-Wcd1fHtDGUbl8znxunM3eGcLPyTr1S0mY4hG3mHKwlaV733k2Y9jFezHNe2kg/exec";

  useEffect(() => {
    // Check if data is already cached
    if (organizersCache.current[selectedBatch]) {
      setOrganizers(organizersCache.current[selectedBatch]);
      setLoadingOrganizers(false);
      return;
    }

    setLoadingOrganizers(true);
    const targetUrl = `${ORGANIZERS_API_URL}?batch=${selectedBatch}`;

    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response unstable");
        return res.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setOrganizers(data);
          // Store in cache
          organizersCache.current[selectedBatch] = data;
        } else {
          setOrganizers([]);
        }
        setLoadingOrganizers(false);
      })
      .catch((err) => {
        console.error("Error fetching organizers:", err);
        setOrganizers([]);
        setLoadingOrganizers(false);
      });
  }, [selectedBatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File size exceeds 5MB limit. Please upload a smaller file.");
        setProofFile(null);
        setBase64File(null);
        return;
      }
      setFileError("");
      setProofFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64File(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setProofFile(null);
    setBase64File(null);
    setFileError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !studentEmail || !digitalId || !deptYear || !issueType || !description) {
      setSubmitError("All required fields must be filled.");
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);
    setSubmitError("");

    const payload = {
      name: studentName,
      email: studentEmail,
      digitalId: digitalId,
      deptYear: deptYear,
      issueType: issueType,
      description: description,
      fileData: base64File,
      fileName: proofFile ? proofFile.name : null,
      fileType: proofFile ? proofFile.type : null,
    };

    if (!DASHBOARD_SUPPORT_API_URL) {
      // Simulation mode if Apps Script is not configured yet
      console.log("Mocking support form submission. Payload:", payload);
      setTimeout(() => {
        setSubmitting(false);
        setSubmitStatus("success");
        // Clear fields
        setStudentName("");
        setStudentEmail("");
        setDigitalId("");
        setDeptYear("");
        setIssueType("");
        setDescription("");
        setProofFile(null);
        setBase64File(null);
      }, 1500);
      return;
    }

    try {
      await fetch(DASHBOARD_SUPPORT_API_URL, {
        method: "POST",
        mode: "no-cors", // Crucial: bypasses CORS blocks on Google Apps Script redirection
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      // Since mode is 'no-cors', we cannot read the response object.
      // However, if the fetch does not throw a network exception, it was sent successfully.
      setSubmitting(false);
      setSubmitStatus("success");
      // Clear fields
      setStudentName("");
      setStudentEmail("");
      setDigitalId("");
      setDeptYear("");
      setIssueType("");
      setDescription("");
      setProofFile(null);
      setBase64File(null);
    } catch (err) {
      console.error("Support form submission error:", err);
      setSubmitting(false);
      setSubmitStatus("error");
      setSubmitError("Failed to submit support request: " + err.message);
    }
  };

  return (
    <div className="contact-page-container">
      <Header />

      <main className="contact-main-single">
        {/* Core Organizer Directory Section */}
        <section className="contact-central-card">
          <h2>LEADERSHIP</h2>
          <p className="section-subtitle">YRC AT SSN IS LED BY:</p>
          <div className="organizer-row-card" href="https://www.ssn.edu.in/electronics-and-communication-engineering/faculty/dr-s-radha-senior-professor-and-principal/" target="_blank" rel="noopener noreferrer">
            <div className="org-avatar-circle">
              {'R'.charAt(0).toUpperCase()}
            </div>
            <div className="org-info-block">
              <div className="org-header-row">
                <h3><a href="https://www.ssn.edu.in/electronics-and-communication-engineering/faculty/dr-s-radha-senior-professor-and-principal/" target="_blank" rel="noopener noreferrer">DR. S. RADHA</a></h3>
                <span className="org-role-tag">PRINCIPAL OF SSNCE</span>
                <p className="org-description-text">The cornerstone of the YRC ecosystem at SSN — friend, philosopher, guide, and overall facilitator.</p>
              </div>
            </div>
          </div>
          <span className="leadership-divider"><pre></pre></span>
          <div className="organizer-row-card" >
            <div className="org-avatar-circle">
              {'Programme Officer'.charAt(0).toUpperCase()}
            </div>
            <div className="org-info-block">
              <div className="org-header-row">
                <h3><a href="https://www.ssn.edu.in/electrical-and-electronics-engineering-department/faculty/dr-v-thiyagarajan-associate-professor/" target="_blank" rel="noopener noreferrer">Dr. V. Thiyagarajan</a></h3>
                <span className="org-role-tag">YRC Programme Officer & In-Charge</span>
                <p className="org-description-text">Spearheads the unit. Strategic planning, financial budgeting, supervision, and direct liaison with College and District Red Cross headquarters.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-central-card">
          <h2>YRC Core Team & Organizers</h2>
          <p className="section-subtitle">Reach out directly to our student coordinators and program executives</p>

          {/* Batch Selector Tabs */}
          <div className="batch-tabs-container">
            {["2026", "2025", "2024", "2023", "2022"].map((batch) => (
              <button
                key={batch}
                className={`batch-tab-btn ${selectedBatch === batch ? "active" : ""}`}
                onClick={() => setSelectedBatch(batch)}
              >
                Batch {batch}
              </button>
            ))}
          </div>

          {loadingOrganizers ? (
            <div className="directory-loader">Loading Batch {selectedBatch} organizers directory...</div>
          ) : organizers.length === 0 ? (
            <p className="empty-directory-text">No active organizers listed in database registers for Batch {selectedBatch} currently.</p>
          ) : (
            <div className="single-column-stack">
              {organizers.map((org, index) => (
                <div key={index} className="organizer-row-card">
                  <div className="org-avatar-circle">
                    {org.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="org-info-block">
                    <div className="org-header-row">
                      <h3>{org.name}</h3>
                      <span className="org-role-tag">{org.role}</span>
                    </div>
                    <div className="org-links-row">
                      {org.phone && (
                        <a href={`https://www.${org.phone}`} className="contact-action-link">
                          <span className="icon-span">💻</span> {org.phone}
                        </a>
                      )}
                      {org.email && (
                        <a href={`mailto:${org.email}`} className="contact-action-link">
                          <span className="icon-span">✉️</span> {org.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SSN YRC Dashboard Support Form */}
        <section className="contact-central-card dashboard-support-card">
          <h2>SSN YRC Dashboard Support</h2>
          <p className="section-subtitle">
            Need help with your Volunteer Dashboard? Report issues like Invalid Digital ID or missing attendance.
          </p>

          {submitStatus === "success" ? (
            <div className="support-success-container">
              <div className="success-icon-check">✓</div>
              <h3>Submitted Successfully!</h3>
              <p className="success-text-msg">
                Your support request has been submitted successfully. The SSN YRC web team will review and resolve the issue as soon as possible.
              </p>
              <button onClick={() => setSubmitStatus(null)} className="support-reset-btn">
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="support-form-element">
              {!DASHBOARD_SUPPORT_API_URL && (
                <div className="support-warning-banner">
                  ℹ️ <strong>Developer Note:</strong> The backend script is not configured yet. Submitting will simulate a successful response for demonstration purposes.
                </div>
              )}

              {submitError && (
                <div className="support-error-banner">
                  ⚠️ {submitError}
                </div>
              )}

              <div className="support-form-grid">
                <div className="support-form-group">
                  <label htmlFor="studentName">Student Name <span className="required-star">*</span></label>
                  <input
                    id="studentName"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="support-form-group">
                  <label htmlFor="studentEmail">Student Email <span className="required-star">*</span></label>
                  <input
                    id="studentEmail"
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="e.g. student@ssn.edu.in"
                    required
                  />
                </div>

                <div className="support-form-group">
                  <label htmlFor="digitalId">Digital ID <span className="required-star">*</span></label>
                  <input
                    id="digitalId"
                    type="text"
                    value={digitalId}
                    onChange={(e) => setDigitalId(e.target.value)}
                    placeholder="e.g. 2311234"
                    required
                  />
                </div>

                <div className="support-form-group">
                  <label htmlFor="deptYear">Department & Year <span className="required-star">*</span></label>
                  <input
                    id="deptYear"
                    type="text"
                    value={deptYear}
                    onChange={(e) => setDeptYear(e.target.value)}
                    placeholder="e.g. CSE - 3rd Year"
                    required
                  />
                </div>

                <div className="support-form-group">
                  <label htmlFor="issueType">Issue Type <span className="required-star">*</span></label>
                  <select
                    id="issueType"
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select the issue type</option>
                    <option value="Invalid Digital ID">Invalid Digital ID</option>
                    <option value="Attendance Missing">Attendance Missing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="support-form-group full-width">
                <label htmlFor="description">Issue Description <span className="required-star">*</span></label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your issue in detail (e.g., event name, date, missing hours details)"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="support-form-group full-width">
                <label htmlFor="proofFile">Proof Upload <span className="optional-tag">(Optional)</span></label>
                <p className="file-help-text">Upload screenshots, attendance proofs, or supporting documents (Max 5MB)</p>
                <div className="file-upload-wrapper">
                  <input
                    id="proofFile"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  />
                  <label htmlFor="proofFile" className="file-upload-label">
                    <span className="file-upload-icon">📁</span>
                    {proofFile ? "Change File" : "Choose File / Browse"}
                  </label>
                  {proofFile && (
                    <div className="selected-file-badge">
                      <span className="file-name">{proofFile.name}</span>
                      <button type="button" onClick={handleRemoveFile} className="remove-file-btn" title="Remove file">×</button>
                    </div>
                  )}
                </div>
                {fileError && <p className="file-error-text">{fileError}</p>}
              </div>

              <button type="submit" disabled={submitting} className="support-submit-btn">
                {submitting ? (
                  <>
                    <span className="btn-spinner"></span> Submitting Request...
                  </>
                ) : (
                  "Submit Support Request"
                )}
              </button>
            </form>
          )}
        </section>

        {/* Google Maps Location Embedding Section */}
        <section className="location-maps-card">
          <h3>Our Location</h3>
          <p className="section-subtitle">Sri Sivasubramaniya Nadar College of Engineering, Rajiv Gandhi Salai (OMR), Kalavakkam, Tamil Nadu</p>
          <div className="map-iframe-wrapper">
            <iframe
              title="SSN College of Engineering Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.939423885504!2d80.2033321!3d12.7517236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52512f04729e11%3A0xbc4ea0ae50ca1aaa!2sSri%20Sivasubramaniya%20Nadar%20College%20of%20Engineering!5e1!3m2!1sen!2sin!4v1779540471544!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}