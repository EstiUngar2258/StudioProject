import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUserAppointments } from '../redux/userAppointmentsSlice';
import UserAppointments from './UserAppointments';
import { useNavigate } from 'react-router-dom';
import bgImg from '../img/Music_Equalizer_5_by_Merlin2525.svg';
import { setUser } from '../redux/authSlice'; // ודא שיש לך פעולה כזו

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showUserAppointments = useSelector((state) => state.userAppointments.showUserAppointments);
    const user = useSelector((state) => state.auth.user);

    const handleToggleUserAppointments = () => {
        dispatch(toggleUserAppointments());
    };

    useEffect(() => {
        if (!user) {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                dispatch(setUser(JSON.parse(savedUser)));
            }
        }
    }, [user, dispatch]);

    return (
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

            {/* אייקון דקורטיבי */}
            <i
                className="bi bi-person-circle"
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

            <div className="container" style={{ zIndex: 2 }}>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div
                            className="card shadow-lg border-0 rounded-4"
                            style={{
                                background: "rgba(34, 34, 60, 0.90)",
                                borderRadius: "2.5rem",
                                border: "1.5px solid rgba(67,206,162,0.18)",
                                boxShadow: "0 8px 32px 0 rgba(67,206,162,0.18), 0 1.5px 8px 0 #23234a",
                                backdropFilter: "blur(4px)",
                                position: "relative" // חשוב!
                            }}
                        >
                            {/* כפתור התנתקות בפינה */}
                            <button
                                className="btn btn-link"
                                style={{
                                    position: "absolute",
                                    top: 18,
                                    left: 18,
                                    color: "#43cea2",
                                    fontWeight: 700,
                                    fontSize: "1.15rem",
                                    textDecoration: "none",
                                    zIndex: 2
                                }}
                                onClick={() => {
                                    localStorage.removeItem('user');
                                    dispatch(setUser(null));
                                    navigate('/');
                                }}
                                title="התנתקות"
                            >
                                <i className="bi bi-box-arrow-right me-1"></i> התנתקות
                            </button>
                            <div className="card-body p-5 text-center">
                                <h2
                                    className="mb-3"
                                    style={{
                                        fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                                        fontWeight: 900,
                                        color: "#43cea2",
                                        textShadow: "0 2px 24px #23234a, 0 1px 1px #43cea2",
                                        fontSize: "2.2rem",
                                        letterSpacing: "1.5px"
                                    }}
                                >
                                    <i className="bi bi-person-badge me-2" style={{ color: "#43cea2" }}></i>
                                    אזור אישי
                                </h2>
                                <div
                                    className="mb-4"
                                    style={{
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: "1.18rem",
                                        textShadow: "0 1px 8px #23234a"
                                    }}
                                >
                                    שלום {user?.userName || "משתמש"}!
                                </div>
                                <p className="lead" style={{ color: "#e0e0e0", fontSize: "1.08rem" }}>
                                    כאן תוכל לראות ולעדכן את המידע האישי שלך, לצפות בתורים, ולקבוע תור חדש.
                                </p>

                                {/* כפתורי ניווט מהירים */}
                                <div className="d-flex flex-wrap gap-3 justify-content-center my-4">
                                    <button
                                        className="btn btn-lg rounded-pill shadow px-4"
                                        style={{
                                            background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                                            border: "none",
                                            fontWeight: 700,
                                            fontSize: "1.08rem",
                                            letterSpacing: "1px",
                                            color: "#fff",
                                            boxShadow: "0 4px 24px 0 #43cea2b0",
                                            transition: "opacity 0.6s, transform 0.6s"
                                        }}
                                        onClick={() => navigate('/appointments')}
                                    >
                                        <i className="bi bi-calendar-plus me-2"></i>
                                        קביעת תור
                                    </button>
                                    <button
                                        className="btn btn-lg rounded-pill shadow px-4"
                                        style={{
                                            background: "linear-gradient(90deg, #185a9d 0%, #43cea2 100%)",
                                            border: "none",
                                            fontWeight: 700,
                                            fontSize: "1.08rem",
                                            letterSpacing: "1px",
                                            color: "#fff",
                                            boxShadow: "0 4px 24px 0 #185a9db0",
                                            transition: "opacity 0.6s, transform 0.6s"
                                        }}
                                        onClick={() => navigate('/services')}
                                    >
                                        <i className="bi bi-stars me-2"></i>
                                        שירותים
                                    </button>
                                    <button
                                        className="btn btn-lg rounded-pill shadow px-4"
                                        style={{
                                            background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                                            border: "none",
                                            fontWeight: 700,
                                            fontSize: "1.08rem",
                                            letterSpacing: "1px",
                                            color: "#fff",
                                            boxShadow: "0 4px 24px 0 #43cea2b0",
                                            transition: "opacity 0.6s, transform 0.6s"
                                        }}
                                        onClick={() => navigate('/')}
                                    >
                                        <i className="bi bi-house-door me-2"></i>
                                        דף הבית
                                    </button>
                                </div>

                                {/* כפתור הצגת/הסתרת תורים */}
                                <button
                                    className="btn btn-outline-info rounded-pill px-4 mb-3"
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "1.08rem",
                                        letterSpacing: "1px",
                                        border: "2px solid #43cea2",
                                        color: "#43cea2",
                                        background: "rgba(67,206,162,0.07)",
                                        boxShadow: "0 2px 8px #43cea2a0",
                                        transition: "background 0.2s, color 0.2s"
                                    }}
                                    onClick={handleToggleUserAppointments}
                                >
                                    {showUserAppointments ? 'הסתר תורים' : 'הצג תורים'}
                                </button>

                                {/* הצגת תורים */}
                                {showUserAppointments && (
                                    <div className="mt-4">
                                        <UserAppointments />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
