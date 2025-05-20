import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableAppointmentsByDateAsync } from "../redux/thunk";

const AvailableAppointmentsList = () => {
    const [date, setDate] = useState("");
    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector(state => state.appointments.availableByDate || {});

    const handleDateChange = (e) => {
        setDate(e.target.value);
        if (e.target.value) {
            dispatch(fetchAvailableAppointmentsByDateAsync(e.target.value));
        }
    };

    return (
        <div>
            <input type="date" value={date} onChange={handleDateChange} />
            {loading && <div>טוען...</div>}
            {error && <div>שגיאה: {error.message}</div>}
            <ul>
                {appointments && appointments.map(app => (
                    <li key={app.id}>{app.time}</li>
                ))}
            </ul>
        </div>
    );
};

export default AvailableAppointmentsList;