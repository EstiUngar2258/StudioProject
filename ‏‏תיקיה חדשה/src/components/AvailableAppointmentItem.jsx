import React from 'react';

const AvailableAppointmentItem = ({ appointment }) => {
    return (
        <div>
            <h3>תור זמין</h3>
            <p>{`תור ללקוח ${appointment.clientId} בשעה ${appointment.time} בתאריך ${appointment.date}`}</p>
        </div>
    );
};

export default AvailableAppointmentItem;
