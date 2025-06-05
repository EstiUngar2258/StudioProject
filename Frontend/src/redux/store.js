import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../redux/clientsSlice';
import userReducer from '../redux/userSlice';
import userAppointmentsSlice from './userAppointmentsSlice';
import appointmentsSlice from './appointmentsSlice';
import authReducer from './authSlice';
import servicesReducer from '../redux/servicesSlice'; // ייבוא יחיד ונכון

const store = configureStore({
    reducer: {
        clients: clientsReducer,
        user: userReducer,
        auth: authReducer,
        appointments: appointmentsSlice,
        userAppointments: userAppointmentsSlice,
        services: servicesReducer
    },
});

export default store;
