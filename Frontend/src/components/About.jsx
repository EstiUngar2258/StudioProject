import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const About = () => (
  <div className="container py-5" style={{ minHeight: "80vh", background: "linear-gradient(135deg, #fdf6e3 0%, #a1c4fd 100%)" }}>
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-7">
        <div className="card shadow-lg border-0 rounded-4" style={{ background: "linear-gradient(120deg, #f5f7fa 0%, #c9d6ff 100%)" }}>
          <div className="card-body p-5">
            <h2 className="mb-4 text-center"
                style={{
                  fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                  fontWeight: 700,
                  color: "#2a2a72",
                  textShadow: "1px 1px 8px #e3e3e3"
                }}>
              <i className="bi bi-info-circle me-2" style={{ color: "#2a2a72" }}></i>
              אודותינו
            </h2>
            <p className="lead text-center" style={{ color: "#444", fontSize: "1.2rem" }}>
              אנחנו מרכז מוזיקה מקצועי עם ניסיון רב בלימוד, הפקה וליווי מוזיקלי.  
              הצוות שלנו כולל מורים, מפיקים ויועצים מהשורה הראשונה, המעניקים יחס אישי לכל תלמיד ולקוח.
              <br /><br />
              נשמח ללוות אתכם בדרך המוזיקלית שלכם, בכל גיל ורמה!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
