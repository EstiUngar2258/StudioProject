import { createSlice } from '@reduxjs/toolkit';
import { fetchAvailableAppointmentsByDateAsync } from './thunk';

const initialState = {
    appointments: [], // כל התורים
    availableByDate: {
        appointments: [],
        loading: false,
        error: null,
    },
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchAvailableAppointmentsByDateAsync.pending, (state) => {
                state.availableByDate.loading = true;
                state.availableByDate.error = null;
            })
            .addCase(fetchAvailableAppointmentsByDateAsync.fulfilled, (state, action) => {
                state.availableByDate.loading = false;
                state.availableByDate.appointments = action.payload;
            })
            .addCase(fetchAvailableAppointmentsByDateAsync.rejected, (state, action) => {
                state.availableByDate.loading = false;
                state.availableByDate.error = action.payload;
            });
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
