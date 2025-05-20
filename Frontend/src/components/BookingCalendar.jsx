import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from './actions';

const BookingCalendar = () => {
    const [startDate, setStartDate] = useState(null);
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.appointments);

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const bookAppointment = () => {
        if (startDate) {
            dispatch(addAppointment(startDate));
            setStartDate(null); // Reset the date picker after booking
            alert('הזמנה בוצעה!');
        } else {
            alert('אנא בחר תאריך להזמנה.');
        }
    };

    return (
        <div>
            <h1>הזמן תור להקלטה</h1>
            <DatePicker selected={startDate} onChange={handleDateChange} />
            <button onClick={bookAppointment}>הזמן תור</button>
            <h2>תורים שהוזמנו:</h2>
            <ul>
                {appointments.map((appointment, index) => (
                    <li key={index}>{appointment.toLocaleString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookingCalendar;
