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
            className="navbar navbar-expand-lg navbar-light bg-light"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                zIndex: 1050, // מעל כל התוכן
                boxShadow: "0 2px 8px rgba(44,62,80,0.08)"
            }}
        >
            <div className="w-100 d-flex justify-content-between align-items-center" style={{ padding: 0, margin: 0 }}>
                <NavLink to="/" className="navbar-brand">Brand</NavLink>
                <div className="d-flex align-items-center flex-grow-1">
                    <div className="navbar-nav flex-row flex-grow-1 ps-4">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Home</NavLink>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>About</NavLink>
                        <NavLink to="/services" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Services</NavLink>
                        <NavLink to="/addClient" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Sign up</NavLink>
                        {!isLoged && <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Sign in</NavLink>}
                    </div>
                    {/* תיבת פרטי המשתמש בצד ימין עם תפריט לוגאוט */}
                    {isLoged && user && (
                        <div
                            onMouseEnter={() => setShowMenu(true)}
                            onMouseLeave={() => setShowMenu(false)}
                            style={{
                                position: "relative",
                                background: "#f8f9fa",
                                borderRadius: "20px",
                                boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
                                padding: "8px 18px",
                                fontSize: "0.95rem",
                                color: "#2a2a72",
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
                            <i className="bi bi-person-circle me-2" style={{ color: "#4e54c8", fontSize: "1.3rem" }}></i>
                            <span className="fw-bold" onClick={handleProfileClick}>{user.userName}</span>
                            {/* תפריט קטן ללוגאוט */}
                            {showMenu && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "110%",
                                        right: 0,
                                        background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
                                        border: "none",
                                        borderRadius: "16px",
                                        boxShadow: "0 8px 24px rgba(44,62,80,0.18)",
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
                                            color: "#2a2a72",
                                            marginBottom: "10px",
                                            fontSize: "1.05rem",
                                            letterSpacing: "1px",
                                            textShadow: "0 1px 6px #e0e7ff"
                                        }}
                                    >
                                       
                                    </div>
                                    <button
                                        className="btn"
                                        style={{
                                            color: "#fff",
                                            background: "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontWeight: 600,
                                            fontSize: "1rem",
                                            padding: "7px 18px",
                                            boxShadow: "0 2px 8px rgba(44,62,80,0.10)",
                                            transition: "background 0.2s, box-shadow 0.2s",
                                            marginTop: "2px"
                                        }}
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>logout
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
