import React from 'react';
import { useSelector } from 'react-redux';

const UserAppointments = ({ userId }) => {
    const appointments = useSelector((state) => state.appointments);
    
    // פילטור התורים של המשתמש הנוכחי
    const userAppointments = appointments.filter(appointment => appointment.clientId === userId);

    return (
        <div className="user-appointments">
            <h2>התורים שלי</h2>
            {userAppointments.length > 0 ? (
                <ul>
                    {userAppointments.map((appointment) => (
                        <li key={appointment.id}>
                            {`תור בשעה ${appointment.time} בתאריך ${appointment.date}`}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>אין תורים זמינים עבורך.</p>
            )}
        </div>
    );
};

export default UserAppointments;
