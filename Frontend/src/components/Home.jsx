import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bgImg from '../img/Music_Equalizer_5_by_Merlin2525.svg'; // תמונת רקע עליונה
import loveMusicImg from '../img/I_LOVE_MUSIC.svg'; // תמונה חדשה לגלילה
import { useSelector } from 'react-redux';

const buttons = [
  {
    label: "לצפייה בשירותים",
    href: "/services",
    icon: "bi-stars"
  },
  {
    label: "הרשמה",
    href: "/login",
    icon: "bi-person-plus"
  },
  {
    label: "אודותינו",
    href: "/about",
    icon: "bi-info-circle"
  }
  // אפשר להוסיף עוד כפתורים כאן
];

const Home = () => {
  const [showBtns, setShowBtns] = useState(Array(buttons.length).fill(false));
  const btnRefs = useRef([]);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    buttons.forEach((_, i) => {
      setTimeout(() => {
        setShowBtns(prev => {
          const copy = [...prev];
          copy[i] = true;
          return copy;
        });
      }, 1000 + i * 1000); // כל כפתור עולה 350ms אחרי הקודם
    });
    // ניקוי טיימרים לא חובה כאן כי אין setInterval
  }, []);

  return (
    <div>
      {/* אזור עיצוב ראשי */}
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: `linear-gradient(135deg, #181828cc 0%, #23234acc 100%), url(${bgImg}) center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {/* גלים דקורטיביים עליונים */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "32vh",
            zIndex: 0
          }}
          viewBox="0 0 1440 320"
        >
          <path
            fill="#43cea2"
            fillOpacity="0.25"
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,181.3C1200,192,1320,192,1380,192L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
          <circle cx="1200" cy="60" r="40" fill="#43cea2" fillOpacity="0.15" />
          <circle cx="200" cy="100" r="25" fill="#43cea2" fillOpacity="0.10" />
        </svg>

        {/* כרטיס מרכזי */}
        <div
          className="shadow-lg border-0"
          style={{
            background: "rgba(34, 34, 60, 0.95)",
            width: "420px",
            borderRadius: "2.5rem",
            zIndex: 2,
            boxShadow: "0 8px 32px 0 rgba(67,206,162,0.25), 0 1.5px 8px 0 #23234a",
            border: "1.5px solid rgba(67,206,162,0.18)",
            backdropFilter: "blur(2px)"
          }}
        >
          <div className="card-body p-5 text-center">
            <h1
              className="mb-4"
              style={{
                fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                fontWeight: 900,
                color: "#fff",
                textShadow: "0 2px 24px #43cea2, 0 1px 1px #23234a",
                fontSize: "2.5rem",
                letterSpacing: "1.5px"
              }}
            >
              <i className="bi bi-music-note-beamed me-2" style={{ color: "#43cea2", fontSize: "2.2rem", verticalAlign: "middle" }}></i>
              ברוכים הבאים למרכז המוזיקה
            </h1>
            <p className="lead" style={{ color: "#e0e0e0", fontSize: "1.18rem", lineHeight: "1.7" }}>
              שיעורי נגינה, הפקות מוזיקליות, ייעוץ מקצועי, צוות מורים מנוסה ואווירה משפחתית.<br />
              הצטרפו אלינו למסע מוזיקלי מרגש!
            </p>
            <div className="mt-4 d-flex flex-column gap-3 align-items-center">
              {buttons.map((btn, i) => (
                <a
                  key={btn.href}
                  ref={el => btnRefs.current[i] = el}
                  href={btn.href}
                  className="btn btn-lg rounded-pill shadow px-5"
                  style={{
                    background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    letterSpacing: "1px",
                    color: "#fff",
                    boxShadow: "0 4px 24px 0 #43cea2b0",
                    transition: "opacity 0.6s cubic-bezier(.68,-0.55,.27,1.55), transform 0.6s cubic-bezier(.68,-0.55,.27,1.55)",
                    opacity: showBtns[i] ? 1 : 0,
                    transform: showBtns[i] ? "translateY(0)" : "translateY(60px)",
                    pointerEvents: showBtns[i] ? "auto" : "none"
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = "scale(1.06)";
                    e.currentTarget.style.boxShadow = "0 8px 32px 0 #43cea2cc";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 24px 0 #43cea2b0";
                  }}
                >
                  <i className={`bi ${btn.icon} me-2`}></i>
                  {btn.label}
                </a>
              ))}
              {/* כפתור לאזור האישי למשתמש מחובר */}
              {isLoggedIn && (
                <div className="mt-2">
                  <a
                    href="/dashboard"
                    style={{
                      color: "#43cea2",
                      fontWeight: 700,
                      fontSize: "1.08rem",
                      textDecoration: "underline",
                      letterSpacing: "1px"
                    }}
                  >
                    <i className="bi bi-person-badge me-1"></i>
                    מעבר לאזור האישי
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* אייקון תקליט דקורטיבי */}
        <i
          className="bi bi-vinyl"
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            fontSize: "4.5rem",
            color: "#43cea2",
            opacity: 0.13,
            zIndex: 0
          }}
        ></i>

        {/* עיגול ניאון דקורטיבי */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #43cea2 0%, #23234a 80%)",
            opacity: 0.18,
            zIndex: 0,
            filter: "blur(2px)"
          }}
        ></div>
      </div>

      {/* אזור תמונה בגלילה */}
      <div
        style={{
          minHeight: "80vh",
          width: "100vw",
          background: `url(${loveMusicImg}) center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* אפשר להוסיף כאן טקסט/כותרת/אפקט מעל התמונה */}
      </div>
    </div>
  );
};

export default Home;
