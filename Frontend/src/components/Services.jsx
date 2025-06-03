import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bgImg from '../img/Music_Equalizer_5_by_Merlin2525.svg';

const serviceList = [
    {
        title: "שיעורי נגינה",
        desc: "שיעורים פרטיים במגוון כלים מוזיקליים עם מורים מקצועיים.",
        icon: "bi-music-note-beamed",
        color: "#43cea2"
    },
    {
        title: "הפקות מוזיקליות",
        desc: "הפקת שירים, עיבודים והקלטות באולפן מתקדם.",
        icon: "bi-headphones",
        color: "#185a9d"
    },
    {
        title: "ייעוץ והכוונה",
        desc: "ליווי אישי בבחירת מסלול מוזיקלי והתפתחות מקצועית.",
        icon: "bi-lightbulb",
        color: "#f7971e"
    },
    {
        title: "הרכבים מוזיקליים",
        desc: "הצטרפות להרכבים ולהקות, הופעות והקלטות משותפות.",
        icon: "bi-people-fill",
        color: "#fc5c7d"
    },
    {
        title: "סדנאות והעשרות",
        desc: "סדנאות יצירה, אילתור, הפקה דיגיטלית ועוד.",
        icon: "bi-easel2",
        color: "#6a82fb"
    },
    {
        title: "חוגי ילדים ונוער",
        desc: "חוגי מוזיקה חווייתיים לילדים ובני נוער.",
        icon: "bi-emoji-smile",
        color: "#ffb347"
    }
];

const Services = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleAddAppointment = (serviceTitle) => {
        if (!isLoggedIn) {
            alert("עליך להירשם כלקוח במערכת לפני הוספת תור.");
            navigate('/Login');
        } else {
            navigate(`/newAppointment?service=${encodeURIComponent(serviceTitle)}`);
        }
    };

    return (
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
            {/* קישוט עליון */}
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

            <div className="container py-5" style={{ zIndex: 2, marginTop: "100px" }}>
                <h1
                    className="text-center mb-4"
                    style={{
                        fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                        fontWeight: 900,
                        letterSpacing: "2px",
                        textShadow: "0 2px 24px #43cea2, 0 1px 1px #23234a",
                        color: "#43cea2",
                        fontSize: "2.7rem"
                    }}
                >
                    <i className="bi bi-stars me-2" style={{ color: "#43cea2" }}></i>
                    השירותים שלנו
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
                </h1>
                <p className="lead text-center mb-5" style={{ color: "#e0e0e0", fontSize: "1.18rem" }}>
                    אנו מציעים מגוון שירותים מקצועיים בתחום המוזיקה, לכל גיל ורמה.
                </p>
                <div className="row g-4 mb-4 justify-content-center">
                    {serviceList.map((service, idx) => (
                        <div className="col-12 col-md-6 col-lg-4" key={idx}>
                            <div
                                className="card h-100 shadow border-0 text-center"
                                style={{
                                    background: "rgba(34, 34, 60, 0.92)",
                                    borderRadius: "2rem",
                                    border: `1.5px solid ${service.color}55`,
                                    boxShadow: `0 4px 24px 0 ${service.color}55`,
                                    transition: "transform 0.2s",
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"}
                                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                            >
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <i
                                            className={`bi ${service.icon} mb-3`}
                                            style={{
                                                fontSize: "3rem",
                                                color: service.color,
                                                textShadow: `0 2px 12px ${service.color}99`
                                            }}
                                        ></i>
                                        <h5 className="card-title" style={{
                                            color: service.color,
                                            fontWeight: "bold",
                                            fontSize: "1.35rem"
                                        }}>
                                            {service.title}
                                        </h5>
                                        <p className="card-text" style={{ color: "#e0e0e0", minHeight: "60px" }}>{service.desc}</p>
                                    </div>
                                    <button
                                        onClick={() => handleAddAppointment(service.title)}
                                        className="btn mt-3"
                                        style={{
                                            background: `linear-gradient(90deg, ${service.color} 0%, #43cea2 100%)`,
                                            color: "#fff",
                                            fontWeight: "bold",
                                            border: "none",
                                            borderRadius: "2rem",
                                            boxShadow: `0 2px 12px ${service.color}99`,
                                            fontSize: "1.08rem",
                                            padding: "10px 28px",
                                            letterSpacing: "1px",
                                            transition: "background 0.2s, box-shadow 0.2s"
                                        }}
                                    >
                                        <i className="bi bi-plus-circle me-2"></i>
                                        הוסף תור
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;

