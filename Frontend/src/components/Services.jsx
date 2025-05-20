import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // הוסף אייקונים של Bootstrap
import '../App.css'; // ודא שיש לך קובץ כזה, או שנה לנתיב ה-CSS שלך

const serviceList = [
    {
        title: "שיעורי נגינה",
        desc: "שיעורים פרטיים במגוון כלים מוזיקליים עם מורים מקצועיים.",
        icon: "bi-music-note-beamed",
        color: "#6a82fb"
    },
    {
        title: "הפקות מוזיקליות",
        desc: "הפקת שירים, עיבודים והקלטות באולפן מתקדם.",
        icon: "bi-headphones",
        color: "#fc5c7d"
    },
    {
        title: "ייעוץ והכוונה",
        desc: "ליווי אישי בבחירת מסלול מוזיקלי והתפתחות מקצועית.",
        icon: "bi-lightbulb",
        color: "#f7971e"
    }
];

const Services = () => {
    return (
        <div className="container py-5" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
            <h1
                className="text-center mb-4 fancy-title"
                style={{
                    fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textShadow: "2px 2px 8px #e3e3e3",
                    color: "#2a2a72",
                    fontSize: "3rem"
                }}
            >
                השירותים שלנו
            </h1>
            <p className="lead text-center mb-5" style={{ color: "#444" }}>
                אנו מציעים מגוון שירותים בתחום המוזיקה.
            </p>
            <div className="row g-4 mb-4">
                {serviceList.map((service, idx) => (
                    <div className="col-md-4" key={idx}>
                        <div
                            className="card h-100 shadow border-0 text-center"
                            style={{
                                background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
                                borderRadius: "1.5rem"
                            }}
                        >
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <i
                                        className={`bi ${service.icon} display-4 mb-3`}
                                        style={{
                                            color: service.color,
                                            textShadow: "0 2px 8px #e3e3e3"
                                        }}
                                    ></i>
                                    <h5 className="card-title" style={{ color: service.color, fontWeight: "bold" }}>
                                        {service.title}
                                    </h5>
                                    <p className="card-text" style={{ color: "#555" }}>{service.desc}</p>
                                </div>
                                <Link
                                    to={`/newAppointment?service=${encodeURIComponent(service.title)}`}
                                    className="btn mt-3"
                                    style={{
                                        background: `linear-gradient(90deg, ${service.color} 0%, #43cea2 100%)`,
                                        color: "#fff",
                                        fontWeight: "bold",
                                        border: "none",
                                        borderRadius: "2rem",
                                        boxShadow: "0 2px 8px #e3e3e3"
                                    }}
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    הוסף תור
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
