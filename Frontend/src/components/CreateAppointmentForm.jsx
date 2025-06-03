import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../redux/appointmentsSlice';
import { startOfToday, addMonths } from 'date-fns';
import AvailableAppointmentsList from './AvailableAppointmentsList';
import bgImg from '../img/Music_Equalizer_5_by_Merlin2525.svg';
import { addAppointmentAsync } from '../redux/thunk';

const CreateAppointmentForm = () => {
    const user = useSelector((state) => state.auth.user);
    const [appointmentData, setAppointmentData] = useState({
        clientId: user ? user.userId : '', // שדה תעודת זהות
        serviceId: '',
        workerId: '',
        date: '',
        time: '',
        status: 'scheduled'
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData({
            ...appointmentData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (appointmentData.clientId && appointmentData.date && appointmentData.time) {
            dispatch(addAppointmentAsync(appointmentData));
            setAppointmentData({ clientId: user ? user.userId : '', serviceId: '', workerId: '', date: '', time: '', status: 'scheduled' });
        } else {
            alert("אנא מלא את כל השדות.");
        }
    };

    const today = startOfToday();
    const minDate = today.toISOString().split("T")[0];
    const oneMonthFromToday = addMonths(today, 1).toISOString().split("T")[0];

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
                    <h2 className="mb-4 text-center"
                        style={{
                            fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                            fontWeight: 900,
                            color: "#43cea2",
                            textShadow: "0 2px 24px #23234a, 0 1px 1px #43cea2",
                            fontSize: "2rem",
                            letterSpacing: "1.5px"
                        }}>
                        <i className="bi bi-calendar-plus me-2" style={{ color: "#43cea2" }}></i>
                        קביעת תור חדש
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* שדה תעודת זהות */}
                        <div className="mb-3">
                            <label className="form-label fw-bold" htmlFor="clientId" style={{ color: "#43cea2" }}>תעודת זהות</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ background: "#23234a", color: "#43cea2" }}>
                                    <i className="bi bi-person"></i>
                                </span>
                                <input
                                    type="text"
                                    id="clientId"
                                    name="clientId"
                                    className="form-control"
                                    value={appointmentData.clientId}
                                    onChange={handleChange}
                                    required
                                    style={{ background: "rgba(67,206,162,0.07)", color: "#fff" }}
                                    disabled={!!user}
                                />
                            </div>
                        </div>

                        {/* שדה תאריך */}
                        <div className="mb-3">
                            <label className="form-label fw-bold" htmlFor="date" style={{ color: "#43cea2" }}>תאריך</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ background: "#23234a", color: "#43cea2" }}>
                                    <i className="bi bi-calendar-event"></i>
                                </span>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="form-control"
                                    value={appointmentData.date}
                                    onChange={handleChange}
                                    required
                                    min={minDate}
                                    max={oneMonthFromToday}
                                    style={{
                                        background: "#fff", // רקע בהיר!
                                        color: "#23234a",
                                        colorScheme: "light"
                                    }}
                                />
                            </div>
                        </div>

                        {/* רשימת תורים פנויים */}
                        <AvailableAppointmentsList date={appointmentData.date} />

                        {/* שדה שעה */}
                        <div className="mb-4">
                            <label className="form-label fw-bold" htmlFor="time" style={{ color: "#43cea2" }}>שעה</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ background: "#23234a", color: "#fff" }}>
                                    <i className="bi bi-clock"></i>
                                </span>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    className="form-control"
                                    value={appointmentData.time}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        background: "#fff", // רקע בהיר!
                                        color: "#23234a",
                                        colorScheme: "light"
                                    }}
                                />
                            </div>
                        </div>

                        <button type="submit"
                            className="btn w-100 py-2 fw-bold rounded-pill shadow"
                            style={{
                                background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                                color: "#fff",
                                fontSize: "1.2rem",
                                letterSpacing: "1px",
                                border: "none",
                                boxShadow: "0 4px 24px 0 #43cea2b0"
                            }}>
                            <i className="bi bi-check-circle me-2"></i>
                            הוסף תור
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAppointmentForm;
