import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bgImg from '../img/Music_Equalizer_5_by_Merlin2525.svg';

import img1 from '../img/image (5).png';
import img2 from '../img/image (7).png';
import img3 from '../img/image (8).png';
import img4 from '../img/image (9).png';

const galleryImages = [img1, img2, img3, img4];

// דוגמה להמלצות
const testimonials = [
  {
    name: "דנה לוי",
    text: "הצוות מקצועי, האווירה מדהימה, והילד שלי פורח במוזיקה!",
    icon: "bi-emoji-smile"
  },
  {
    name: "יוסי כהן",
    text: "מורים ברמה גבוהה, יחס אישי וחם. ממליץ בחום!",
    icon: "bi-music-note-beamed"
  },
  {
    name: "נועה רז",
    text: "הפקות מוזיקליות ברמה בינלאומית. תודה על הכל!",
    icon: "bi-star-fill"
  }
];

const About = () => (
  <div
    style={{
      minHeight: "100vh",
      width: "100vw",
      background: `linear-gradient(135deg, #181828cc 0%, #23234acc 100%), url(${bgImg}) center/cover no-repeat`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
      position: "relative"
    }}
  >
    {/* קישוט SVG עליון */}
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "22vh",
        zIndex: 0
      }}
      viewBox="0 0 1440 320"
    >
      <path
        fill="#43cea2"
        fillOpacity="0.18"
        d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,181.3C1200,192,1320,192,1380,192L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      ></path>
      <circle cx="1200" cy="60" r="32" fill="#43cea2" fillOpacity="0.13" />
      <circle cx="200" cy="100" r="18" fill="#43cea2" fillOpacity="0.09" />
    </svg>

    {/* אייקון תקליט ברקע */}
    <i
      className="bi bi-vinyl"
      style={{
        position: "absolute",
        bottom: 60,
        left: 60,
        fontSize: "6rem",
        color: "#43cea2",
        opacity: 0.10,
        zIndex: 0
      }}
    ></i>

    {/* כרטיס אודות */}
    <div className="container py-5" style={{ zIndex: 2 }}>
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-7">
          <div
            className="card shadow-lg border-0 rounded-4"
            style={{
              background: "rgba(34, 34, 60, 0.85)",
              borderRadius: "2.5rem",
              border: "1.5px solid rgba(67,206,162,0.18)",
              boxShadow: "0 8px 32px 0 rgba(67,206,162,0.18), 0 1.5px 8px 0 #23234a",
              backdropFilter: "blur(4px)"
            }}
          >
            <div className="card-body p-5 text-center">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                  fontWeight: 900,
                  color: "#43cea2",
                  textShadow: "0 2px 24px #23234a, 0 1px 1px #43cea2",
                  fontSize: "2.5rem",
                  letterSpacing: "1.5px",
                  position: "relative",
                  display: "inline-block"
                }}
              >
                <i className="bi bi-info-circle me-2" style={{ color: "#43cea2" }}></i>
                אודותינו
                <span
                  style={{
                    display: "block",
                    height: "4px",
                    width: "60%",
                    margin: "12px auto 0 auto",
                    borderRadius: "2px",
                    background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                    boxShadow: "0 2px 12px #43cea2b0"
                  }}
                ></span>
              </h2>
              <p
                className="lead text-center"
                style={{
                  color: "#e0e0e0",
                  fontSize: "1.22rem",
                  lineHeight: "1.9",
                  textShadow: "0 1px 8px #23234a"
                }}
              >
                אנחנו מרכז מוזיקה מקצועי עם ניסיון רב בלימוד, הפקה וליווי מוזיקלי.<br />
                הצוות שלנו כולל מורים, מפיקים ויועצים מהשורה הראשונה, המעניקים יחס אישי לכל תלמיד ולקוח.
                <br /><br />
                נשמח ללוות אתכם בדרך המוזיקלית שלכם, בכל גיל ורמה!
              </p>
              <div className="mt-4">
                <i className="bi bi-music-note-beamed" style={{ fontSize: "2.2rem", color: "#43cea2", textShadow: "0 1px 8px #23234a" }}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  
    <div className="container my-5" style={{ zIndex: 2 }}>
      <h3 className="text-center mb-4" style={{
        color: "#43cea2",
        fontWeight: 700,
        letterSpacing: "1px",
        textShadow: "0 1px 8px #23234a"
      }}>
        גלריה
        <i className="bi bi-images ms-2"></i>
      </h3>
      <div className="row g-3 justify-content-center">
        {galleryImages.map((img, idx) => (
          <div className="col-6 col-md-3" key={idx}>
            <div style={{
              borderRadius: "1.2rem",
              overflow: "hidden",
              boxShadow: "0 4px 18px 0 #43cea2a0"
            }}>
              <img src={img} alt={`gallery${idx + 1}`} style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* אזור המלצות */}
    <div className="container my-5" style={{ zIndex: 2 }}>
      <h3 className="text-center mb-4" style={{
        color: "#43cea2",
        fontWeight: 700,
        letterSpacing: "1px",
        textShadow: "0 1px 8px #23234a"
      }}>
        המלצות
        <i className="bi bi-chat-quote ms-2"></i>
      </h3>
      <div className="row g-4 justify-content-center">
        {testimonials.map((t, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="shadow rounded-4 p-4 h-100"
              style={{
                background: "rgba(67,206,162,0.10)",
                border: "1.5px solid rgba(67,206,162,0.18)",
                color: "#fff",
                minHeight: "180px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}>
              <i className={`bi ${t.icon} mb-2`} style={{ fontSize: "2rem", color: "#43cea2" }}></i>
              <div style={{ fontSize: "1.08rem", marginBottom: "0.5rem" }}>{t.text}</div>
              <div style={{ fontWeight: 700, color: "#43cea2" }}>{t.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About;
