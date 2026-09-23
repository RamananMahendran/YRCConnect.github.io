// src/AboutPage.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./AboutPage.css";

const LEADERSHIP_DATA = [
  {
    level: "Global",
    icon: (
      <svg className="hierarchy-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    position: "IFRC President",
    bearer: "Ms. Kate Forbes",
    isOdd: true
  },
  {
    level: "National",
    icon: <span className="hierarchy-badge-icon">IN</span>,
    position: "IRCS President",
    bearer: "Hon'ble President of India",
    isOdd: false
  },
  {
    level: "State",
    icon: (
      <svg className="hierarchy-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 22h18M6 18v-6M10 18v-6M14 18v-6M18 18v-6M4 11l8-7 8 7M2 11h20" />
      </svg>
    ),
    position: "State IRCS President",
    bearer: "Hon'ble Governor of Tamil Nadu",
    isOdd: true
  },
  {
    level: "District",
    icon: (
      <svg className="hierarchy-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="22" x2="9" y2="16" />
        <line x1="15" y1="22" x2="15" y2="16" />
        <line x1="9" y1="16" x2="15" y2="16" />
        <path d="M8 6h.01M8 10h.01M12 6h.01M12 10h.01M16 6h.01M16 10h.01M12 14h.01" />
      </svg>
    ),
    position: "District IRCS President",
    bearer: "District Collector",
    isOdd: false
  },
  {
    level: "University",
    icon: (
      <svg className="hierarchy-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
    position: "University YRC Coordinator",
    bearer: "Nominee of Anna University Vice-Chancellor",
    isOdd: true
  },
  {
    level: "Institution",
    icon: (
      <svg className="hierarchy-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 22H2M4 22V10l8-5 8 5v12M12 5V2M10 2h4M10 14h4v8h-4z" />
      </svg>
    ),
    position: "College Patron",
    bearer: "Principal",
    isOdd: false
  },
  {
    level: "Faculty",
    icon: (
      <svg className="hierarchy-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M22 11h-6" />
      </svg>
    ),
    position: "YRC Programme Officer",
    bearer: "Faculty In-Charge",
    isOdd: true
  },
  {
    level: "Students",
    icon: (
      <svg className="hierarchy-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    position: "YRC Volunteers",
    bearer: "Student Members",
    isOdd: false
  }
];

const BLOOD_DONOR_DATA = [
  { sNo: 1, name: "Seran", date: "08/09/2025", place: "SIMS Hospital, Chennai" },
  { sNo: 2, name: "Karthik", date: "08/09/2025", place: "SIMS Hospital, Chennai" },
  { sNo: 3, name: "Praveen Rathinam", date: "08/09/2025", place: "SIMS Hospital, Chennai" },
  { sNo: 4, name: "Suriya", date: "08/09/2025", place: "SIMS Hospital, Chennai" },
  { sNo: 5, name: "Adley Brinton", date: "08/09/2025", place: "SIMS Hospital, Chennai" },
  { sNo: 6, name: "Mani Chidambaram", date: "08/09/2025", place: "SIMS Hospital, Chennai" },
  { sNo: 7, name: "Jai Krishnan", date: "09/09/2025", place: "Apollo Speciality Hospitals, Teynampet, Chennai" },
  { sNo: 8, name: "Kaushik Raj", date: "09/09/2025", place: "Apollo Speciality Hospitals, Teynampet, Chennai" },
  { sNo: 9, name: "Sanjay", date: "09/09/2025", place: "Apollo Speciality Hospitals, Teynampet, Chennai" },
  { sNo: 10, name: "Ganesh Priya Vardhan", date: "09/09/2025", place: "Apollo Speciality Hospitals, Teynampet, Chennai" },
  { sNo: 11, name: "Suresh Kannan", date: "09/09/2025", place: "Apollo Speciality Hospitals, Teynampet, Chennai" },
  { sNo: 12, name: "Adaikkala Raj", date: "09/09/2025", place: "Apollo Speciality Hospitals, Teynampet, Chennai" },
  { sNo: 13, name: "Naveen", date: "09/09/2025", place: "Apollo Speciality Hospitals, Teynampet, Chennai" },
  { sNo: 14, name: "Shanthosh. A", date: "11/07/2026", place: "Chettinad Hospital, Kelambakkam" },
  { sNo: 15, name: "Midhush Kanna V G", date: "11/07/2026", place: "Chettinad Hospital, Kelambakkam" },
  { sNo: 16, name: "PRAVEEN KUMAR. G", date: "11/07/2026", place: "Chettinad Hospital, Kelambakkam" },
  { sNo: 17, name: "Joshua C", date: "11/07/2026", place: "Chettinad Hospital, Kelambakkam" },
];
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
            <h2 className="hierarchy-title">Leadership Hierarchy</h2>
        </section>
        <section className="hierarchy-section">
          <div className="table-responsive">
            <table className="hierarchy-table">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Position</th>
                  <th>Office Bearer</th>
                </tr>
              </thead>
              <tbody>
                {LEADERSHIP_DATA.map((row, idx) => (
                  <tr key={idx} className={row.isOdd ? "row-odd" : "row-even"}>
                    <td>
                      <div className="level-cell">
                        {row.icon}
                        <span>{row.level}</span>
                      </div>
                    </td>
                    <td>{row.position}</td>
                    <td>{row.bearer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <p style ={{ whiteSpace: 'preserve', fontStyle: 'italic', marginTop: '1rem' }}>
            Darthi karo nirmal karo beeda prabu hey<br></br>
            Jeevan karo vujval nava jyothi baro hey-2<br></br>
            Dukki janonki seva num kare-2<br></br>
            Baththall thonko gale lagale-2<br></br>
            Shanthi badha shanthi kaarya shanthi varada hey!<br></br>
            Jeeevan karo vujval nava jyothi baro hey!<br></br>
            Nava Jyothi baro hey, nava hyothi baro hey<br></br>
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

        <section>
          <h2>BLOOD DONORS DIRECTORY</h2>
          <div className="table-responsive2">
            <table className="hierarchy-table2">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Donor Name</th>
                  <th>Donated Date</th>
                  <th>Donated Place</th>
                </tr>
              </thead>
              <tbody>
                {BLOOD_DONOR_DATA.map((donor) => (
                  <tr key={donor.sNo}>
                    <td>{donor.sNo}</td>
                    <td>{donor.name}</td>
                    <td>{donor.date}</td>
                    <td>{donor.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
