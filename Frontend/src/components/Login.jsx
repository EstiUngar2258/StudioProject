import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchWorkerByIdAsync, loginUserAsync } from '../redux/thunk';
import bgImg from '../img/Music_Equalizer_5_by_Merlin2525.svg';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', idNumber: '' });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (user && !error) {
            navigate('/dashboard');
        }
    }, [user, error, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => {
            const updated = { ...prev, [name]: value };
            const newErrors = { ...errors };
            if (name === "username") {
                if (!value || value.length < 2) newErrors.username = "יש להזין שם משתמש (לפחות 2 תווים)";
                else delete newErrors.username;
            }
            if (name === "idNumber") {
                if (!value || !/^\d{9}$/.test(value)) newErrors.idNumber = "יש להזין תעודת זהות תקינה (9 ספרות)";
                else delete newErrors.idNumber;
            }
            setErrors(newErrors);
            return updated;
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!credentials.username || credentials.username.length < 2) {
            newErrors.username = "יש להזין שם משתמש (לפחות 2 תווים)";
        }
        if (!credentials.idNumber || !/^\d{9}$/.test(credentials.idNumber)) {
            newErrors.idNumber = "יש להזין תעודת זהות תקינה (9 ספרות)";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const resultAction = await dispatch(loginUserAsync(credentials));
            if (loginUserAsync.fulfilled.match(resultAction)) {
                const userData = resultAction.payload;
                dispatch(login(userData));
                localStorage.setItem('user', JSON.stringify(userData));
                if( userData.userType === 'Worker') {
                    console.log("user: ",user)
                    navigate('/workerDashboard');
                }if( userData.userType === 'Admin') {
                    navigate('/adminDashboard');}
                 else {
                navigate('/dashboard');}
            }
        } catch (error) {
            alert(error.response?.data?.message || 'שם משתמש או תעודת זהות שגויים');
        }
    };

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
            </svg>

            <div className="container" style={{ zIndex: 2, maxWidth: 420, marginTop: "100px" }}>
                <div
                    className="card shadow-lg border-0 rounded-4"
                    style={{
                        background: "rgba(34, 34, 60, 0.92)",
                        borderRadius: "2.5rem",
                        border: "1.5px solid rgba(67,206,162,0.18)",
                        boxShadow: "0 8px 32px 0 rgba(67,206,162,0.18), 0 1.5px 8px 0 #23234a",
                        backdropFilter: "blur(4px)",
                        padding: "2.5rem 2rem"
                    }}
                >
                    <h2 className="mb-4 text-center"
                        style={{
                            fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                            fontWeight: 900,
                            color: "#43cea2",
                            textShadow: "0 2px 24px #23234a, 0 1px 1px #43cea2",
                            fontSize: "2rem",
                            letterSpacing: "1.5px"
                        }}>
                        <i className="bi bi-person-circle me-2" style={{ color: "#43cea2" }}></i>
                        כניסה למערכת
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* שדה שם משתמש */}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label fw-bold" style={{ color: "#43cea2" }}>שם משתמש</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ background: "#23234a", color: "#43cea2" }}>
                                    <i className="bi bi-person"></i>
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    id="username"
                                    placeholder="שם משתמש"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                    style={{ background: "rgba(67,206,162,0.07)", color: "#fff" }}
                                />
                            </div>
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                        </div>

                        {/* שדה תעודת זהות */}
                        <div className="mb-4">
                            <label htmlFor="idNumber" className="form-label fw-bold" style={{ color: "#43cea2" }}>תעודת זהות</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ background: "#23234a", color: "#43cea2" }}>
                                    <i className="bi bi-card-text"></i>
                                </span>
                                <input
                                    type="text"
                                    name="idNumber"
                                    className="form-control"
                                    id="idNumber"
                                    placeholder="תעודת זהות"
                                    value={credentials.idNumber}
                                    onChange={handleChange}
                                    required
                                    style={{ background: "rgba(67,206,162,0.07)", color: "#fff" }}
                                />
                            </div>
                            {errors.idNumber && <div className="text-danger">{errors.idNumber}</div>}
                        </div>

                        <button type="submit" className="btn btn-lg rounded-pill w-100 shadow"
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
                            disabled={loading}
                        >
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            {loading ? 'טוען...' : 'כניסה'}
                        </button>
                        {loading && <div className="spinner-border text-info mt-3" role="status">
                            <span className="visually-hidden">טוען...</span>
                        </div>}
                        {error && <p className="text-danger mt-3">{error.message || 'אירעה שגיאה, נסה שוב.'}</p>}

                        {/* קישור להרשמה */}
                        <div className="text-center mt-4">
                            <span style={{ color: "#e0e0e0" }}>עדיין לא רשום?</span>
                            <button
                                type="button"
                                className="btn btn-link px-2"
                                style={{
                                    color: "#43cea2",
                                    fontWeight: 700,
                                    textDecoration: "underline",
                                    fontSize: "1.08rem"
                                }}
                                onClick={() => navigate('/addClient')}
                            >
                                להרשמה לחץ כאן
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
