// src/AboutPage.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <Header />

      <main className="about-content">
        <h1>About SSN Youth Red Cross</h1>
        <blockquote>
          "By this power, let there be peace & Order" — Henry Dunant, Father of Red Cross
        </blockquote>

        <section>
          <h2>The Global Red Cross Movement</h2>
          <p>
            The International Committee of the Red Cross (ICRC) was the first body formed to protect and assist victims of armed conflicts. This gave rise to the International Federation of Red Cross and Red Crescent Societies (IFRC) — a global humanitarian network that mobilizes local volunteers through National Societies.
          </p>
        </section>

        <section>
          <h2>The 7 Fundamental Principles</h2>
          <ol>
            <li><strong>Humanity:</strong> Prevent and alleviate human suffering wherever found.</li>
            <li><strong>Impartiality:</strong> No discrimination by nationality, race, religion, class, or politics.</li>
            <li><strong>Neutrality:</strong> Do not take sides in hostilities or controversies.</li>
            <li><strong>Independence:</strong> Maintain autonomy to act per Red Cross principles.</li>
            <li><strong>Voluntary Service:</strong> A relief movement not prompted by desire for gain.</li>
            <li><strong>Unity:</strong> Only one Red Cross Society in any country, open to all.</li>
            <li><strong>Universality:</strong> All societies share equal status and responsibilities.</li>
          </ol>
        </section>

        <section>
          <h2>Indian Red Cross Society (IRCS)</h2>
          <p>
            Established under the IRCS Act of 1920 by Act XV of 1920 in New Delhi. Focus areas include Humanitarian Principles, Disaster Management, Health & Community Care, and Blood Services.
          </p>
        </section>

        <section>
          <h2>Tamil Nadu Branch (IRCS, TN)</h2>
          <p>
            Formed November 27, 1920. State HQ: Egmore, Chennai. Activities include AIDS/HIV Awareness, Disaster Management, First Aid, Health Services, and Vocational Training.
          </p>
        </section>

        <section>
          <h2>Structure & Leadership</h2>
          <ul>
            <li><strong>Principal:</strong> Overall facilitator — institutional pillar, philosopher, and guide.</li>
            <li><strong>YRC Programme Officer:</strong> Core Faculty Coordinator — strategic planning, budgeting, supervision, and liaison.</li>
            <li><strong>Event Organizers:</strong> Senior or Active YRC Volunteers — logistics and on-ground operations.</li>
            <li><strong>500+ Student Volunteers:</strong> From every batch — the heart of every drive.</li>
          </ul>
          <p>
            Nearly 80% of SSN students are enrolled in the SSN YRC Club through official admission forms.
          </p>
        </section>

        <section>
          <h2>Campus Unit & Compliance</h2>
          <p>
            The unit adheres to model and frame standards. Officially registered with IRCS, Tamil Nadu Branch and operates per G.O. No. 149, Higher Education Department, dated 30-10-2017.
          </p>
        </section>

        <section>
          <h2>College Advisory Committee</h2>
          <ul>
            <li>Principal — Chairman</li>
            <li>YRC Programme Officer — Vice Chairman</li>
            <li>YRC Member (from batch in social work) — Member</li>
            <li>Student Representatives / Event Organizers — Members</li>
          </ul>
        </section>

        <section>
          <h2>YRC Anthem</h2>
          <p>
            Don’t walk alone hands needs palms hey<br/>
            Reach hands needs palms hey (x2)<br/>
            Shanthi shanthi hey shanthi hey (x2)<br/>
            Reach hands needs palms hey<br/>
            Don’t walk alone needs hands hey
          </p>
        </section>

        <section>
          <h2>Programme Officer’s Pledge</h2>
          <p>
            “As a Programme Officer of Youth Red Cross, I promise to serve, to work loyally for the promotion of health and the relief of suffering, wherever my duties may lead me and to lend a friendly hand to all Nations.”
          </p>
        </section>

        <section>
          <h2>YRC Member Pledge</h2>
          <p>
            “I pledge myself to care for the health of others, to help the sick and suffering especially children, and to look upon the youth all over the world as my friends.”
          </p>
        </section>

        <section>
          <h2>Statutory Records Maintained</h2>
          <ul>
            <li>Volunteer Enrollment Register</li>
            <li>Cash Register & Minutes Book</li>
            <li>Stock Register</li>
            <li>Volunteer Attendance Register</li>
            <li>Project & Progress Reports</li>
            <li>Visitors Book</li>
            <li>Blood Donors Directory</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
