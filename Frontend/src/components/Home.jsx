import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => (
  <div
    style={{
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #f8ffae 0%, #43cea2 100%)",
      display: "flex",
      alignItems: "stretch",
      justifyContent: "stretch"
    }}
  >
    <div
      className="card shadow-lg border-0"
      style={{
        background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
        width: "100%",
        height: "100vh", // יתפוס את כל הגובה
        borderRadius: 0, // פינות ישרות
        boxShadow: "none" // אם לא רוצים צל
      }}
    >
      <div className="card-body p-5 text-center" style={{ height: "100%" }}>
        <h1
          className="mb-4"
          style={{
            fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
            fontWeight: 700,
            color: "#2a2a72",
            textShadow: "2px 2px 8px #e3e3e3",
            fontSize: "2.7rem"
          }}
        >
          <i className="bi bi-music-note-beamed me-2" style={{ color: "#43cea2" }}></i>
          ברוכים הבאים למרכז המוזיקה שלנו
        </h1>
        <p className="lead" style={{ color: "#444", fontSize: "1.2rem" }}>
          כאן תמצאו שיעורי נגינה, הפקות מוזיקליות, ייעוץ מקצועי, צוות מורים מנוסה ואווירה משפחתית.<br />
          הצטרפו אלינו למסע מוזיקלי מרגש!
        </p>
        <div className="mt-4">
          <a href="/services" className="btn btn-lg btn-success rounded-pill shadow px-4">
            <i className="bi bi-stars me-2"></i>
            לצפייה בשירותים
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
