import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../redux/thunk';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
        <div className="container mt-5">
            <form onSubmit={handleLogin} className="border p-4 rounded shadow">
                <h2 className="mb-4">כניסה</h2>
                <div className="mb-3">
                    <label htmlFor="idNumber" className="form-label">מספר זהות</label>
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
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">שם</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="שם"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'טוען...' : 'כניסה'}
                </button>

                {loading && <div className="spinner-border text-primary mt-3" role="status">
                    <span className="visually-hidden">טוען...</span>
                </div>}
                {error && <p className="text-danger mt-3">{error.message || 'אירעה שגיאה, נסה שוב.'}</p>}
            </form>
        </div>
    );
};

export default Login;
