import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../redux/thunk';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (user && !error) {
            navigate('/dashboard');
        }
    }, [user, error, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const idNumber = formData.get('idNumber').trim();
        const name = formData.get('name').trim();

        if (idNumber.length !== 9) {
            alert('מספר הזהות חייב להיות באורך 9 תווים.');
            return;
        }
        if (!name) {
            alert('יש להזין שם.');
            return;
        }

        const credentials = { idNumber, name };

        try {
            const resultAction = await dispatch(loginUserAsync(credentials));
            if (loginUserAsync.fulfilled.match(resultAction)) {
                navigate('/dashboard');
            } else {
                alert(resultAction.payload.message || 'אירעה שגיאה, נסה שוב.');
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('אירעה שגיאה, נסה שוב.');
        }
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
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="idNumber" className="form-label fw-bold">מספר זהות</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-credit-card-2-front"></i></span>
                                        <input
                                            type="text"
                                            name="idNumber"
                                            className="form-control"
                                            id="idNumber"
                                            placeholder="מספר זהות"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label fw-bold">שם</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-person"></i></span>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="name"
                                            placeholder="שם"
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-pill shadow" disabled={loading}>
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    {loading ? 'טוען...' : 'כניסה'}
                                </button>
                                {loading && <div className="spinner-border text-primary mt-3" role="status">
                                    <span className="visually-hidden">טוען...</span>
                                </div>}
                                {error && <p className="text-danger mt-3">{error.message || 'אירעה שגיאה, נסה שוב.'}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
