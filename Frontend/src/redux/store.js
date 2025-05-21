import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../redux/clientsSlice';
import userReducer from '../redux/userSlice';
import userAppointmentsSlice from './userAppointmentsSlice';
import appointmentsSlice from './appointmentsSlice';
import authReducer from './authSlice'; // ייבוא authReducer

const store = configureStore({
    reducer: {
        clients: clientsReducer,
        user: userReducer,
        auth: authReducer, // הוספת authReducer
        appointments: appointmentsSlice,
        userAppointments: userAppointmentsSlice,
    },
});

export default store;
