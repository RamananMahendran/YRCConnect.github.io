// src/HomePage.js
import React from "react";
import Header from "./Header"; // import the new header
import "./HomePage.css"; // plain CSS for styling
import Carousel from "./Carousel"; // import the carousel component
import Footer from "./Footer"; // import the new footer
export default function HomePage() {
  return (
    <div className="homepage">
      {/* Header */}
      <Header />

      {/* Banner Section */}
      <section className="banner">
        <h4 style = {{ fontSize: "1.5rem" }}>WELCOME TO </h4>
        <h1>YOUTH RED CROSS</h1>
        <p>SRI SIVASUBRAMANIYA NADAR COLLEGE OF ENGINEERING</p>
        <p>(An autonomous institution, affiliated to Anna University)</p>
        <p>Kalavakkam-603110.</p>
        <p className="motto">Serve with Heart, Give with Love</p>
        <p className="tagline">A voluntary humanitarian movement at SSN College of Engineering</p>
        <Carousel />
      </section>
      
      <div className="two-columns">
        <div className="left-col">
            <section id="about" className="section">
                <h2>About Red Cross</h2>
                <p>
                The Red Cross Society is a globally recognized humanitarian organization,
                independent and non-religious, dedicated to helping people worldwide
                without discrimination. Motto: <strong style={{color: "#e7000b"}}>“To Serve.”</strong>
                </p>        
            </section>
            <section className="section alt">
                <h2>Affiliations & Portals</h2>
                <ul>
                <li><a href="https://www.ifrc.org" target="_blank" rel="noopener noreferrer">International Federation of Red Cross (IFRC)</a></li>
                <li><a href="https://www.indianredcross.org" target="_blank" rel="noopener noreferrer">Indian Red Cross Society (IRCS)</a></li>
                <li><a href="https://www.indianredcross.org/ircs/southzone/" target="_blank" rel="noopener noreferrer">IRCS – Tamil Nadu State Branch</a></li>
                </ul>
            </section>
            {/* Principles */}
            <section className="section">
                <h2>Core Principles</h2>
                <ol>
                <li>Protection of Health & Life</li>
                <li>Service to the Sick & Suffering</li>
                <li>National & International Friendship</li>
                </ol>
            </section>
            <section className="section alt">
                <h2>Main Objectives</h2>
                <ul>
                <li>Spreading Awareness</li>
                <li>Health and Care</li>
                <li>Civic Responsibility</li>
                <li>Spirit of Service</li>
                <li>Inclusivity</li>
                </ul>
            </section>

            {/* Activities */}
            <section className="section">
                <h2>Our Legacy & Key Activities</h2>
                <ul>
                <li>Blood Donation Camps</li>
                <li>Rural Village Camps</li>
                <li>Wall Painting Event</li>
                <li>Tree Plantation Drives</li>
                </ul>
            </section>
      </div>
      <div className="right-col">
            <section className="section">
              <h2>History of Youth Red Cross</h2>
              <img src="/images/founder.jpeg" alt="YRC History" className="history-image" />
              <p>
                The Red Cross was founded in 1863 in Geneva by Jean Henry Dunant,
                the first Nobel Peace Prize recipient in 1901. The <strong>Youth Red Cross </strong>
                 movement emerged after World War I and was officially recognized
                in 1922. Since then, it has grown into a global humanitarian
                initiative dedicated to health, service, and friendship across
                nations.
                <p>
                The Indian Red Cross Society (IRCS) is a voluntary humanitarian organization to protect human life and health based in India.
                It is part of the <strong>International Red Cross and Red Crescent Movement</strong> and shares the Fundamental Principles of the International Red Cross and Red Crescent Movement.
                The society's mission is to provide relief in times of disasters/emergencies and promote health and care of vulnerable people and communities.
                It has a network of over <strong>700</strong> branches throughout India.
                The Society uses the Red Cross as an emblem in common with other international Red Cross societies.
                Volunteering has been at the very heart of the Indian Red Cross Society since its inception in 1920, with the Society having Youth and Junior volunteering programmes.
                The Society is closely associated with <strong>St John Ambulance India</strong>.
            </p>
              </p>
              <p>
                At <strong style = {{color: 'blue', fontSize: 'larger', fontstyle: 'italic'}}>SSN College of Engineering</strong>, the Youth Red Cross continues this
                legacy through voluntary service, awareness programs, and
                community engagement, embodying the motto <strong>“To Serve.”</strong>
              </p>
            </section>
          </div>
        </div>
      {/* Group Photo */}
      <section className="section photo">
        <figure>
          <img
            src="/images/groupphoto.png"
            alt="YRC Group at SSNCE Fountain"
          />
          <figcaption>
            Date: 24-03-2026 | Place: In-front of Fountain, SSNCE
          </figcaption>
        </figure>
      </section>
      {/* Footer */}
        <Footer />
    </div>
  );
}
