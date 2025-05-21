import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableAppointmentsByDateAsync } from "../redux/thunk";

const AvailableAppointmentsList = ({ date }) => {
    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector(state => state.appointments.availableByDate || {});

    // שליחת בקשה לשרת כאשר התאריך משתנה
    useEffect(() => {
        if (date) { // שלח בקשה רק אם התאריך מוגדר
            dispatch(fetchAvailableAppointmentsByDateAsync(date));
        }
    }, [date, dispatch]);

    // אם התאריך לא מוגדר, אל תציג דבר
    if (!date) {
        return null;
    }

    return (
        <div>
            {loading && <div>טוען תורים פנויים...</div>}
            {error && <div>שגיאה: {error.message}</div>}
            {!loading && !error && appointments && appointments.length === 0 && (
                <div>אין תורים פנויים בתאריך זה.</div>
            )}
            <ul>
                {appointments && appointments.map(app => (
                    <li key={app.id}>{app.time}</li>
                ))}
            </ul>
        </div>
    );
};

export default AvailableAppointmentsList;