import React, { useEffect, useState } from "react";
import "./EventsPage.css";

export default function SSNEventsList() {
  const [events, setEvents] = useState([]);
  const sheetScriptURL = "https://script.google.com/macros/s/AKfycbz89wycreXBuhfOAUQnfx81RPzYei-wNCIz5fEnAdB9LYR0bXY3jBQqwrOjntMWcs9WOg/exec"; // replace with your deployed script URL
  
  useEffect(() => {
    fetch(sheetScriptURL)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="ssn-events">
      <div className="events-scroll">
        {events.map((e, idx) => (
          <div key={idx} className="event-card">
            <p className="event-date"><strong>{e.date}</strong></p>
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