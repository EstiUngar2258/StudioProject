import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => (
  <div className="container py-5" style={{ minHeight: "80vh", background: "linear-gradient(135deg, #f8ffae 0%, #43cea2 100%)" }}>
    <div className="row justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="col-md-8 col-lg-7">
        <div className="card shadow-lg border-0 rounded-4" style={{ background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)" }}>
          <div className="card-body p-5 text-center">
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
    </div>
  </div>
);

export default Home;
