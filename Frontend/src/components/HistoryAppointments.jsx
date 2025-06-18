import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFullQueuesForWorkerAsync } from '../redux/thunk';
import { parseISO, isAfter } from 'date-fns';

const FILTER_DATE = new Date(); // שנה לתאריך הרצוי

const HistoryAppointments = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.userAppointments.userAppointments);

    useEffect(() => {
        if (user?.userId) {
            dispatch(fetchFullQueuesForWorkerAsync(user.userId));
        }
    }, [dispatch, user?.userId]);
console.log("appointmants:", appointments);
    // סינון תורים שהתאריך שלהם גדול מהתאריך הרצוי
    const filteredAppointments = (appointments || []).filter(app => {
        if (!app.dateTime) return false;
        return new Date(app.dateTime) < new Date(FILTER_DATE);
    });

    console.log("Filtered Appointments:", filteredAppointments);

    return (
        <div className="user-appointments" style={{ color: "#fff" }}>
            {filteredAppointments.length ? (
                <div className="row g-3">
                    {filteredAppointments
                        .sort((a, b) => {
                            const dateA = parseISO(`${a.dateTime}T${a.hour || "00:00"}`);
                            const dateB = parseISO(`${b.dateTime}T${b.hour || "00:00"}`);
                            return dateA - dateB;
                        })
                        .map((appointment, index) => (
                            <div className="col-12" key={appointment.id || appointment.id || index}>
                                <div className="card shadow-sm border-0" style={{ background: "#23234a", color: "#43cea2" }}>
                                    <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between">
                                        <div>
                                            <i className="bi bi-calendar-event me-2"></i>
                                            <span style={{ fontWeight: 700 }}>
                                                Appointment at {appointment.dateTime} on {appointment.hour}
                                            </span>
                                        </div>
                                        <div>
                                            <i className="bi bi-person me-1"></i>
                                            <span style={{ fontSize: "0.95rem", color: "#fff" }}>
                                                Status: {appointment.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            ) : (
                <p>אין תורים זמינים עבורך.</p>
            )}
        </div>
    );
};

export default HistoryAppointments;
