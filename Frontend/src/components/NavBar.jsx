import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
    const isLoged = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const handleProfileClick = () => {
        navigate('/dashboard');
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                zIndex: 1050,
                background: "linear-gradient(135deg, #181828 0%, #23234a 100%)",
                boxShadow: "0 2px 16px 0 #43cea2a0",
                borderBottom: "2px solid #43cea2",
                padding: "0.5rem 0"
            }}
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <NavLink
                    to="/"
                    className="navbar-brand fw-bold"
                    style={{
                        color: "#43cea2",
                        fontSize: "1.7rem",
                        letterSpacing: "2px",
                        textShadow: "0 2px 12px #23234a"
                    }}
                >
                    <i className="bi bi-music-note-beamed me-2" style={{ color: "#43cea2" }}></i>
                    Music Center
                </NavLink>
                <div className="d-flex align-items-center flex-grow-1">
                    <div className="navbar-nav flex-row flex-grow-1 ps-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            style={({ isActive }) => ({
                                color: isActive ? "#43cea2" : "#fff",
                                fontWeight: 600,
                                fontSize: "1.08rem",
                                marginLeft: "18px",
                                letterSpacing: "1px",
                                transition: "color 0.2s"
                            })}
                        >
                            דף הבית
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            style={({ isActive }) => ({
                                color: isActive ? "#43cea2" : "#fff",
                                fontWeight: 600,
                                fontSize: "1.08rem",
                                marginLeft: "18px",
                                letterSpacing: "1px",
                                transition: "color 0.2s"
                            })}
                        >
                            אודותינו
                        </NavLink>
                        <NavLink
                            to="/services"
                            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            style={({ isActive }) => ({
                                color: isActive ? "#43cea2" : "#fff",
                                fontWeight: 600,
                                fontSize: "1.08rem",
                                marginLeft: "18px",
                                letterSpacing: "1px",
                                transition: "color 0.2s"
                            })}
                        >
                            שירותים
                        </NavLink>
                        <NavLink
                            to="/addClient"
                            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            style={({ isActive }) => ({
                                color: isActive ? "#43cea2" : "#fff",
                                fontWeight: 600,
                                fontSize: "1.08rem",
                                marginLeft: "18px",
                                letterSpacing: "1px",
                                transition: "color 0.2s"
                            })}
                        >
                            הרשמה
                        </NavLink>
                        {!isLoged && (
                            <NavLink
                                to="/login"
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                style={({ isActive }) => ({
                                    color: isActive ? "#43cea2" : "#fff",
                                    fontWeight: 600,
                                    fontSize: "1.08rem",
                                    marginLeft: "18px",
                                    letterSpacing: "1px",
                                    transition: "color 0.2s"
                                })}
                            >
                                התחברות
                            </NavLink>
                        )}
                    </div>
                    {/* תיבת פרטי המשתמש בצד ימין עם תפריט לוגאוט */}
                    {isLoged && user && (
                        <div
                            onMouseEnter={() => setShowMenu(true)}
                            onMouseLeave={() => setShowMenu(false)}
                            style={{
                                position: "relative",
                                background: "rgba(67,206,162,0.08)",
                                borderRadius: "20px",
                                boxShadow: "0 2px 8px #43cea2a0",
                                padding: "8px 18px",
                                fontSize: "0.98rem",
                                color: "#43cea2",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: "box-shadow 0.2s",
                                marginRight: "16px",
                                marginLeft: "auto"
                            }}
                            className="user-profile-mini"
                            title="לאזור האישי"
                        >
                            <i className="bi bi-person-circle me-2" style={{ color: "#43cea2", fontSize: "1.3rem" }}></i>
                            <span className="fw-bold" onClick={handleProfileClick}>{user.userName}</span>
                            {/* תפריט קטן ללוגאוט */}
                            {showMenu && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "110%",
                                        right: 0,
                                        background: "linear-gradient(135deg, #23234a 60%, #43cea2 100%)",
                                        border: "none",
                                        borderRadius: "16px",
                                        boxShadow: "0 8px 24px #43cea2a0",
                                        padding: "18px 28px 12px 18px",
                                        minWidth: "140px",
                                        zIndex: 100,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        animation: "fadeInMenu 0.25s"
                                    }}
                                >
                                    <div
                                        style={{
                                            fontWeight: 700,
                                            color: "#43cea2",
                                            marginBottom: "10px",
                                            fontSize: "1.05rem",
                                            letterSpacing: "1px",
                                            textShadow: "0 1px 6px #23234a"
                                        }}
                                    >
                                        {user.userName}
                                    </div>
                                    <button
                                        className="btn"
                                        style={{
                                            color: "#fff",
                                            background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontWeight: 600,
                                            fontSize: "1rem",
                                            padding: "7px 18px",
                                            boxShadow: "0 2px 8px #43cea2a0",
                                            transition: "background 0.2s, box-shadow 0.2s",
                                            marginTop: "2px"
                                        }}
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>התנתקות
                                    </button>
                                    <style>
                                        {`
                                        @keyframes fadeInMenu {
                                            from { opacity: 0; transform: translateY(-10px);}
                                            to { opacity: 1; transform: translateY(0);}
                                        }
                                        `}
                                    </style>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
