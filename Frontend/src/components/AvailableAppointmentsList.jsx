import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableAppointmentsByDateAsync } from "../redux/thunk";

const AvailableAppointmentsList = ({ date }) => {
    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector(state => state.appointments.availableByDate || {});
    

    useEffect(() => {
        if (date) {
            dispatch(fetchAvailableAppointmentsByDateAsync({ dateOnly: date }));
        }
    }, [date, dispatch]);

    // אם התאריך לא מוגדר, אל תציג דבר
    if (!date) {
        return null;
    }

    // console.log("state", state);
    console.log("appointments", appointments);
    // console.log("availableByDate", state.appointments.availableByDate);
    return (
        <div>
            {loading && <div>טוען תורים פנויים...</div>}
            {error && <div>שגיאה: {error.message}</div>}
            {!loading && !error && appointments && appointments.length === 0 && (
                <div style={{ color: "#43cea2", fontWeight: 700, textAlign: "center" }}>
                    אין תורים פנויים בתאריך זה.
                </div>
            )}
            <ul>
                {appointments && appointments.map(app => (
                    <li key={app.id} style={{ color: "#43cea2", fontWeight: 700 }}>
                      {app.dateTime} בשעה {app.hour}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AvailableAppointmentsList;