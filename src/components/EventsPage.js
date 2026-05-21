// src/EventsPage.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./EventsPage.css";
import SSNEventsList from "./EventsList";
import ImageGallery from "./ImageGallery";

export default function EventsPage() {
  const events = [
    { date: "4 January", event: "World Braille Day" },
    { date: "12 January", event: "National Youth Day" },
    { date: "24 January", event: "National Girl Child Day" },
    { date: "25 January", event: "National Voters Day" },
    { date: "26 January", event: "Republic Day" },
    { date: "4 February", event: "World Cancer Day" },
    { date: "3 March", event: "World Hearing Day" },
    { date: "8 March", event: "International Women's Day" },
    { date: "22 March", event: "World Water Day" },
    { date: "24 March", event: "World TB Day" },
    { date: "7 April", event: "World Health Day" },
    { date: "8 May", event: "World Red Cross Day / World Thalassaemia Day" },
    { date: "31 May", event: "World Anti-Tobacco Day" },
    { date: "5 June", event: "World Environment Day" },
    { date: "12 June", event: "World Day Against Child Labour" },
    { date: "14 June", event: "World Blood Donor Day" },
    { date: "21 June", event: "International Yoga Day" },
    { date: "1 July", event: "National Doctor's Day" },
    { date: "11 July", event: "World Population Day" },
    { date: "12 August", event: "International Youth Day" },
    { date: "15 August", event: "India's Independence Day" },
    { date: "19 August", event: "World Humanitarian Day" },
    { date: "20 August", event: "World Mosquito Day" },
    { date: "21 August", event: "World Senior Citizen Day" },
    { date: "5 September", event: "Teachers' Day (India)" },
    { date: "12 September", event: "World First Aid Day" },
    { date: "15 September", event: "National Engineer's Day" },
    { date: "21 September", event: "World Alzheimer's Day" },
    { date: "1 October", event: "International Day of Older Persons" },
    { date: "5 October", event: "World Teachers' Day" },
    { date: "13 October", event: "World Day for Natural Disaster Reduction" },
    { date: "15 October", event: "Global Hand Washing Day" },
    { date: "24 October", event: "World Polio Day" },
    { date: "14 November", event: "Children's Day" },
    { date: "1 December", event: "World AIDS Day" },
    { date: "3 December", event: "World Disability Day" },
    { date: "5 December", event: "International Volunteers Day" },
    { date: "10 December", event: "Pulse Polio Immunization Day" },
  ];

  // Group events by month
  const groupedEvents = events.reduce((acc, e) => {
    const month = e.date.split(" ")[1]; // e.g., "January"
    if (!acc[month]) acc[month] = [];
    acc[month].push(e);
    return acc;
  }, {});

  return (
    <div className="events-page">
      <Header />

      <main className="events-content">
        <h1>SSN YRC Events & Observances</h1>
        <p className="intro">
          Explore important humanitarian, health, and national observances recognized by the Indian Red Cross Society.
        </p>
        <div className="calendar-grid">
          {Object.keys(groupedEvents).map((month) => (
            <div key={month} className="month-card">
              <h2>{month}</h2>
              <ul>
                {groupedEvents[month].map((e, idx) => (
                  <li key={idx}>
                    <span className="date">{e.date}</span>
                    <span className="event">{e.event}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <h1>List Of Past Events</h1>
        <SSNEventsList />
        <h1>Gallery</h1>
        <ImageGallery />
      </main>

      <Footer />
    </div>
  );
}
