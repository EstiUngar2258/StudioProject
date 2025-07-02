import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../redux/clientsSlice';
import userReducer from '../redux/userSlice';
import userAppointmentsSlice from './userAppointmentsSlice';
import appointmentsSlice from './appointmentsSlice';
import authReducer from './authSlice';
import servicesReducer from '../redux/servicesSlice'; 
import workerReducer from './workerSlice'
import workersReducer from './workersSlice'// ייבוא יחיד ונכון

const store = configureStore({
    reducer: {
        clients: clientsReducer,
        user: userReducer,
        auth: authReducer,
        appointments: appointmentsSlice,
        userAppointments: userAppointmentsSlice,
        services: servicesReducer,
        worker:workerReducer, 
        workers:workersReducer// הוספת ה-reducer של עובדים
    },
});

export default store;
