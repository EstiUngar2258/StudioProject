import React from 'react';
import { useSelector } from 'react-redux';
import AvailableAppointmentItem from './AvailableAppointmentItem';
import FullAppointmentItem from './FullAppointmentItem';

const AppointmentList = () => {
    const appointments = useSelector((state) => state.appointments) || [];

    const availableAppointments = appointments.filter(
        (appointment) => appointment && appointment.status === 'scheduled'
    );
    const bookedAppointments = appointments.filter(
        (appointment) => appointment && appointment.status !== 'scheduled'
    );

    return (
        <div className="appointment-list">
            <h2>תורים פנויים</h2>
            {availableAppointments.length > 0 ? (
                availableAppointments.map((appointment) => (
                    <AvailableAppointmentItem key={appointment.id} appointment={appointment} />
                ))
            ) : (
                <p>אין תורים פנויים.</p>
            )}

            <h2>תורים מלאים</h2>
            {bookedAppointments.length > 0 ? (
                bookedAppointments.map((appointment) => (
                    <FullAppointmentItem key={appointment.id} appointment={appointment} />
                ))
            ) : (
                <p>אין תורים מלאים.</p>
            )}
        </div>
    );
};

export default AppointmentList;
