import React, { useEffect, useState } from "react";
import "./EventsPage.css";

export default function SSNEventsList() {
  const [events, setEvents] = useState([]);
  const sheetScriptURL = "https://script.google.com/a/macros/ssn.edu.in/s/AKfycbxfbzaASw3CZl5Ur9uPoDVgNFOjpDVfIaA3TPQFsfr5t7nKAaC9XmXOXnGLzegvSVQ/exec"; 

  useEffect(() => {
    // 1. Try to load from localStorage cache first for near-instant rendering
    const cachedData = localStorage.getItem("yrc_events_cache");
    if (cachedData) {
      try {
        setEvents(JSON.parse(cachedData));
      } catch (e) {
        console.error("Failed to parse events cache:", e);
      }
    }

    // 2. Fetch fresh data in the background (Stale-While-Revalidate)
    fetch(sheetScriptURL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response unstable");
        return res.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setEvents(data);
          try {
            localStorage.setItem("yrc_events_cache", JSON.stringify(data));
          } catch (e) {
            console.warn("Storage quota exceeded. Events caching disabled:", e);
          }
        }
      })
      .catch((err) => console.error("Error fetching fresh events:", err));
  }, []);

  // Show shimmer skeleton rows during initial load (if cache is empty)
  if (events.length === 0) {
    return (
      <div className="ssn-events">
        <div className="events-scroll">
          {[1, 2, 3].map((n) => (
            <div key={n} className="event-card skeleton">
              <div className="skeleton-line date"></div>
              <div className="skeleton-line title"></div>
              <div className="skeleton-line link"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ssn-events">
      <div className="events-scroll">
        {events.map((e, idx) => (
          <div key={idx} className="event-card">
            <p className="event-date">
              <strong>{e.date}</strong>
            </p>
            <h3>{e.event}</h3>
            <p className="event-link-container">
              {e.documentaryReport && (
                <a href={e.documentaryReport} target="_blank" rel="noopener noreferrer">
                  View Documentation Report
                </a>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}