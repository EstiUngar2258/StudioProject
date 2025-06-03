import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClientAsync } from '../redux/thunk';
import bgImg from '../img/Music_Equalizer_5_by_Merlin2525.svg';

const AddClient = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const error = useSelector((state) => state.clients.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newClient = {
            id,
            firstName,
            lastName,
            phone,
            age: age ? parseInt(age) : null,
            email,
        };
        const resultAction = await dispatch(addClientAsync(newClient));
        if (addClientAsync.fulfilled.match(resultAction)) {
            setSuccessMessage('הלקוח נוסף בהצלחה!');
            setId('');
            setFirstName('');
            setLastName('');
            setPhone('');
            setAge('');
            setEmail('');
            setShowForm(false);
        } else {
            setSuccessMessage('');
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setSuccessMessage('');
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
                <circle cx="1200" cy="60" r="32" fill="#43cea2" fillOpacity="0.13" />
                <circle cx="200" cy="100" r="18" fill="#43cea2" fillOpacity="0.09" />
            </svg>

            <div className="container" style={{ zIndex: 2, maxWidth: 480, marginTop: "100px" }}>
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
                    <h2
                        className="mb-4 text-center"
                        style={{
                            fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                            fontWeight: 900,
                            color: "#43cea2",
                            textShadow: "0 2px 24px #23234a, 0 1px 1px #43cea2",
                            fontSize: "2rem",
                            letterSpacing: "1.5px"
                        }}
                    >
                        <i className="bi bi-person-plus me-2" style={{ color: "#43cea2" }}></i>
                        הרשמת לקוח חדש
                    </h2>
                    <button
                        className="btn btn-lg rounded-pill shadow mb-4"
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
                        onClick={toggleForm}
                    >
                        {showForm ? 'ביטול' : 'הצג טופס הרשמה'}
                    </button>
                    {showForm && (
                        <form onSubmit={handleSubmit} className="mt-3">
                            <div className="mb-3">
                                <label className="form-label" style={{ color: "#43cea2", fontWeight: 600 }}>תעודת זהות:</label>
                                <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: "#43cea2", fontWeight: 600 }}>שם פרטי:</label>
                                <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: "#43cea2", fontWeight: 600 }}>שם משפחה:</label>
                                <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: "#43cea2", fontWeight: 600 }}>טלפון:</label>
                                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: "#43cea2", fontWeight: 600 }}>גיל:</label>
                                <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{ color: "#43cea2", fontWeight: 600 }}>אימייל:</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {error && <p className="text-danger">{error.message || error}</p>}
                            <button
                                type="submit"
                                className="btn btn-success btn-lg rounded-pill w-100 mt-3"
                                style={{
                                    background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                                    border: "none",
                                    fontWeight: 700,
                                    fontSize: "1.08rem",
                                    letterSpacing: "1px",
                                    boxShadow: "0 4px 24px 0 #43cea2b0"
                                }}
                            >
                                <i className="bi bi-person-plus me-2"></i>
                                הוסף לקוח
                            </button>
                        </form>
                    )}
                    {successMessage && <div className="alert alert-success mt-4 text-center">{successMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default AddClient;
