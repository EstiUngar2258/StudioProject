import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAppointment } from '../redux/appointmentsSlice';
import { startOfToday, addMonths } from 'date-fns';


const CreateAppointmentForm = () => {
    const [appointmentData, setAppointmentData] = useState({
        clientId: '',
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

    const today = startOfToday(); // מקבל את התאריך של היום
    const minDate = today.toISOString().split("T")[0]; // ממיר ל-ISO ומקבל את התאריך בפורמט YYYY-MM-DD
    const oneMonthFromToday = addMonths(today, 1).toISOString().split("T")[0];

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h2>צור תור חדש</h2>
            <div className="form-group">
                <label htmlFor="clientId">Client ID:</label>
                <input
                    type="number"
                    id="clientId"
                    name="clientId"
                    className="form-control"
                    value={appointmentData.clientId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="serviceId">Service ID:</label>
                <input
                    type="number"
                    id="serviceId"
                    name="serviceId"
                    className="form-control"
                    value={appointmentData.serviceId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="workerId">Worker ID:</label>
                <input
                    type="number"
                    id="workerId"
                    name="workerId"
                    className="form-control"
                    value={appointmentData.workerId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">תאריך:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    value={appointmentData.date}
                    onChange={handleChange}
                    required
                    min={minDate} // מאפשר לבחור תאריך מהיום ואילך
                    max={oneMonthFromToday}
                />
            </div>
            <div className="form-group">
                <label htmlFor="time">שעה:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    className="form-control"
                    value={appointmentData.time}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">הוסף תור</button>
        </form>
    );
};

export default CreateAppointmentForm;
