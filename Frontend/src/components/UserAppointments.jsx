import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFullQueuesForWorkerAsync } from '../redux/thunk';

const UserAppointments = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.userAppointments.userAppointments);

    useEffect(() => {
        if (user?.userId) {
            dispatch(fetchFullQueuesForWorkerAsync(user.userId));
        }
    }, [dispatch, user?.userId]);

    return (
        <div className="user-appointments" style={{ color: "#fff" }}>
            {Array.isArray(appointments) && appointments.length ? (
                <div className="row g-3">
                    {[...appointments]
                        .sort((a, b) => {
                            // מיון לפי תאריך ואז שעה
                            const dateA = `${a.DateTime || a.dateTime}T${a.Hour || a.hour}`;
                            const dateB = `${b.DateTime || b.dateTime}T${b.Hour || b.hour}`;
                            return new Date(dateA) - new Date(dateB);
                        })
                        .map((appointment, index) => (
                            <div className="col-12" key={appointment.Id || appointment.id || index}>
                                <div className="card shadow-sm border-0" style={{ background: "#23234a", color: "#43cea2" }}>
                                    <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between">
                                        <div>
                                            <i className="bi bi-calendar-event me-2"></i>
                                            <span style={{ fontWeight: 700 }}>
                                                Appointment at {appointment.DateTime || appointment.dateTime} on  {appointment.Hour || appointment.hour}
                                            </span>
                                        </div>
                                        <div>
                                            <i className="bi bi-person me-1"></i>
                                            <span style={{ fontSize: "0.95rem", color: "#fff" }}>
                                                Status: {appointment.Status || appointment.status}
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

export default UserAppointments;
