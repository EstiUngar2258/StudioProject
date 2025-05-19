import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../redux/clientsSlice';
import userReducer from '../redux/userSlice'

const store = configureStore({
    reducer: {
        clients: clientsReducer,
        user: userReducer, 
        
    },
});

export default store;
