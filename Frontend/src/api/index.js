import axios from 'axios';

// פונקציה לשליפת תורים פנויים לפי תאריך
export const fetchAvailableAppointmentsByDate = async ({ dateOnly, timeOnly }) => {
    const response = await axios.post('http://localhost:5235/api/FreeQueue', {
        dateOnly,
        timeOnly,
    });
    return response.data;
};