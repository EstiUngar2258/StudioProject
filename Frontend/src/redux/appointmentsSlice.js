import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appointments: [], // כל התורים
};

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        addAppointment: (state, action) => {
            state.appointments.push({ ...action.payload, status: 'full' });
        },
        markAsAvailable: (state, action) => {
            const appointment = state.appointments.find(app => app.id === action.payload);
            if (appointment) {
                appointment.status = 'available';
            }
        },
        deleteAppointment: (state, action) => {
            state.appointments = state.appointments.filter(app => app.id !== action.payload); // מחיקת תור לפי ID
        },
        updateAppointment: (state, action) => {
            const index = state.appointments.findIndex(app => app.id === action.payload.id);
            if (index !== -1) {
                state.appointments[index] = { ...state.appointments[index], ...action.payload.data }; // עדכון תור קיים
            }
        },
        getAppointmentById: (state, action) => {
            return state.appointments.find(app => app.id === action.payload); // קבלת תור לפי ID
        },
    },
});

export const { 
    addAppointment, 
    markAsAvailable, 
    deleteAppointment, 
    updateAppointment, 
    getAppointmentById 
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
