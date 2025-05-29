import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../redux/appointmentsSlice';
import { startOfToday, addMonths } from 'date-fns';
import AvailableAppointmentsList from './AvailableAppointmentsList';

const CreateAppointmentForm = () => {
const user= useSelector((state) => state.auth.user);
    const [appointmentData, setAppointmentData] = useState({
        clientId: user? [user.userId]:'', // שדה תעודת זהות
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
        if (appointmentData.clientId && appointmentData.serviceId && appointmentData.workerId && appointmentData.date && appointmentData.time) {
            dispatch(addAppointment(appointmentData));
            setAppointmentData({ clientId: '', serviceId: '', workerId: '', date: '', time: '', status: 'scheduled' });
        } else {
            alert("אנא מלא את כל השדות.");
        }
    };

    const today = startOfToday();
    const minDate = today.toISOString().split("T")[0];
    const oneMonthFromToday = addMonths(today, 1).toISOString().split("T")[0];

    return (
        <div className="container py-5" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #a18cd1 100%)" }}>
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4" style={{ background: "linear-gradient(120deg, #fdf6e3 0%, #f5f7fa 100%)" }}>
                        <div className="card-body p-5">
                            <h2 className="mb-4 text-center"
                                style={{
                                    fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                                    fontWeight: 700,
                                    color: "#6a3093",
                                    textShadow: "1px 1px 8px #e0c3fc"
                                }}>
                                <i className="bi bi-calendar-plus me-2" style={{ color: "#6a3093" }}></i>
                                צור תור חדש
                            </h2>
                            <form onSubmit={handleSubmit}>
                                {/* שדה תעודת זהות */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold" htmlFor="clientId" style={{ color: "#6a3093" }}>תעודת זהות</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ background: "#e0c3fc" }}><i className="bi bi-person" style={{ color: "#6a3093" }}></i></span>
                                        <input
                                            type="text"
                                            id="clientId"
                                            name="clientId"
                                            className="form-control"
                                            value={appointmentData.clientId}
                                            onChange={handleChange}
                                            required
                                            style={{ background: "#f8fafc" }}
                                        />
                                    </div>
                                </div>

                                {/* שדה תאריך */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold" htmlFor="date" style={{ color: "#6a3093" }}>תאריך</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ background: "#e0c3fc" }}><i className="bi bi-calendar-event" style={{ color: "#6a3093" }}></i></span>
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
                                            style={{ background: "#f8fafc" }}
                                        />
                                    </div>
                                </div>

                                {/* רשימת תורים פנויים */}
                                <AvailableAppointmentsList date={appointmentData.date} />

                                {/* שדה שעה */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold" htmlFor="time" style={{ color: "#6a3093" }}>שעה</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ background: "#e0c3fc" }}><i className="bi bi-clock" style={{ color: "#6a3093" }}></i></span>
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            className="form-control"
                                            value={appointmentData.time}
                                            onChange={handleChange}
                                            required
                                            style={{ background: "#f8fafc" }}
                                        />
                                    </div>
                                </div>

                                <button type="submit"
                                    className="btn w-100 py-2 fw-bold rounded-pill shadow"
                                    style={{
                                        background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
                                        color: "#fff",
                                        fontSize: "1.2rem",
                                        letterSpacing: "1px"
                                    }}>
                                    <i className="bi bi-check-circle me-2"></i>
                                    הוסף תור
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAppointmentForm;
