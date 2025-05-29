import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // ייבוא הפונקציה מקובץ api
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { loginUserAsync } from '../redux/thunk';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', idNumber: '' }); // עדכון state
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
            // נריץ בדיקה מחדש בכל שינוי שדה
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
        console.log('Sending credentials:', credentials); // בדיקה של הנתונים שנשלחים
        try {
            const resultAction = await dispatch(loginUserAsync(credentials));
            if (loginUserAsync.fulfilled.match(resultAction)) {
                // כאן resultAction.payload הוא אובייקט המשתמש
                const userData = resultAction.payload;
                dispatch(login(userData));
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error during login:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'שם משתמש או תעודת זהות שגויים');
        }
    };
        const handleProfileClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="container py-5" style={{ minHeight: "80vh", background: "linear-gradient(135deg, #fdf6e3 0%, #a1c4fd 100%)" }}>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-4" style={{ background: "linear-gradient(120deg, #f5f7fa 0%, #c9d6ff 100%)" }}>
                        <div className="card-body p-5">
                            <h2 className="mb-4 text-center"
                                style={{
                                    fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                                    fontWeight: 700,
                                    color: "#2a2a72",
                                    textShadow: "1px 1px 8px #e3e3e3"
                                }}>
                                <i className="bi bi-person-circle me-2" style={{ color: "#2a2a72" }}></i>
                                כניסה למערכת
                            </h2>
                            <form onSubmit={handleSubmit}>
                                {/* שדה שם משתמש */}
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label fw-bold">שם משתמש</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-person"></i></span>
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
                                        />
                                    </div>
                                    {errors.username && <div className="text-danger">{errors.username}</div>}
                                </div>

                                {/* שדה תעודת זהות */}
                                <div className="mb-4">
                                    <label htmlFor="idNumber" className="form-label fw-bold">תעודת זהות</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-card-text"></i></span>
                                        <input
                                            type="text"
                                            name="idNumber"
                                            className="form-control"
                                            id="idNumber"
                                            placeholder="תעודת זהות"
                                            value={credentials.idNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {errors.idNumber && <div className="text-danger">{errors.idNumber}</div>}
                                </div>

                                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-pill shadow" disabled={loading}>
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    {loading ? 'טוען...' : 'כניסה'}
                                </button>
                                {loading && <div className="spinner-border text-primary mt-3" role="status">
                                    <span className="visually-hidden">טוען...</span>
                                </div>}
                                {error && <p className="text-danger mt-3">{error.message || 'אירעה שגיאה, נסה שוב.'} ,</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
