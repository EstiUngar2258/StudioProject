import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'; // ודא שה-import של axios קיים
import { addClient, fetchData, loginUser } from "../api";

import { loginFailure } from "./userSlice";

// יצירת Axios Instance לניהול קל של בקשות HTTP
const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// פונקציה לניהול שגיאות בצורה אחידה
export const handleErrorResponse = (error) => ({
    message: error.message,
    status: error.response ? error.response.status : null,
    data: error.response ? error.response.data : null,
});

// Thunk לשליפת נתונים
export const fetchDataAsyncAction = createAsyncThunk(
    'clients/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchData(); // קריאה לפונקציית ה-API
            return response.data; // החזרת הנתונים
        } catch (error) {
            console.error('Error fetching data:', error); // לוג לדיבוג
            return rejectWithValue(handleErrorResponse(error));
        }
    }
);

// // פונקציה לאימות נתונים
// const validateClient = (client) => {
//     if (!client.name || !client.email) {
//         throw new Error('Name and email are required');
//     }
//     // ניתן להוסיף אימותים נוספים לפי הצורך
// };

// Thunk להוספת קליינט
export const addClientAsync = createAsyncThunk(
    'clients/addClient',
    async (newClient, { rejectWithValue }) => {
        try {
        //    validateClient(newClient); // אימות נתונים לפני שליחה
            const response = await addClient(newClient); // קריאה ל-API
            return response.data; // החזרת הקליינט שנוסף
        } catch (error) {
            console.error('Error adding client:', error); // לוג לדיבוג
            return rejectWithValue(handleErrorResponse(error));
        }
    }
);


// Thunk ללוגאין
export const loginUserAsync = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue ,getState,dispatch}) => {
        const state = getState(); // גישה למצב הנוכחי של Redux
        
        try {
            const response = await axios.post('http://localhost:5235/api/User/Login', credentials, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)

            return response.data; // מחזיר את תגובת השרת
        } catch (error) {
            dispatch(loginFailure({
                message: error.response?.data?.message || 'Login failed',
                status: error.response?.status,
            }));
            return rejectWithValue({

                message: error.response?.data?.message || 'Login failed',
                status: error.response?.status,
            });
        }
    }
);

// פונקציה כללית לשליחת בקשות GET
export const getAsync = createAsyncThunk(
    'api/getData',
    async (endpoint, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(endpoint);
            return response.data; // החזרת הנתונים
        } catch (error) {
            console.error('Error during GET request:', error); // לוג לדיבוג
            return rejectWithValue(handleErrorResponse(error));
        }
    }
);

// פונקציה כללית לשליחת בקשות POST
export const postAsync = createAsyncThunk(
    'api/postData',
    async ({ endpoint, body }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(endpoint, body);
            return response.data; // החזרת הנתונים
        } catch (error) {
            console.error('Error during POST request:', error); // לוג לדיבוג
            return rejectWithValue(handleErrorResponse(error));
        }
    }
);

export const fetchAppointmentsAsync = createAsyncThunk(
    'appointments/fetchAppointments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAsync('Appointments'); // קריאה ל-getAsync
            return response; // החזרת התורים
        } catch (error) {
            console.error('Error fetching appointments:', error); // לוג לדיבוג
            return rejectWithValue(handleErrorResponse(error));
        }
    }
);

export const addAppointmentAsync = createAsyncThunk(
    'appointments/addAppointment',
    async (newAppointment, { rejectWithValue }) => {
        try {
            const response = await postAsync({ endpoint: 'Appointments', body: newAppointment }); // קריאה ל-postAsync
            return response; // החזרת התור שנוסף
        } catch (error) {
            console.error('Error adding appointment:', error); // לוג לדיבוג
            return rejectWithValue(handleErrorResponse(error));
        }
    }
);

export const fetchAvailableAppointmentsByDateAsync = createAsyncThunk(
    'appointments/fetchAvailableByDate',
    async ({ dateOnly, timeOnly }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                '/Appointments/available',
                { dateOnly, timeOnly }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching available appointments:', error);
            return rejectWithValue(handleErrorResponse(error));
        }
    }
);
