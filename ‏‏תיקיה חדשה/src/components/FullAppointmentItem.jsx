import React from 'react';

const FullAppointmentItem = ({ appointment }) => {
    return (
        <div>
            <h3>תור מלא</h3>
            <p>{`תור ללקוח ${appointment.clientId} בשעה ${appointment.time} בתאריך ${appointment.date}`}</p>
        </div>
    );
};

export default FullAppointmentItem;
