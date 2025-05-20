import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../redux/clientsSlice';
import userReducer from '../redux/userSlice'
import userAppointmentsSlice from './userAppointmentsSlice';
import appointmentsSlice from './appointmentsSlice';


const store = configureStore({
    reducer: {
        clients: clientsReducer,
        user: userReducer, 
        appointments: appointmentsSlice,
        userAppointments: userAppointmentsSlice,

        
    },
});

export default store;
