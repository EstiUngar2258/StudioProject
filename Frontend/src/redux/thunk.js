import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'; // ודא שה-import של axios קיים
import { addClient, fetchData, loginUser, fetchAvailableAppointmentsByDate, addAppointment, fetchFullQueuesForWorker, getAllServices } from "../api";

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
    async (credentials, { rejectWithValue, dispatch }) => {
        try {
            const response = await loginUser(credentials);
           
            console.log('response.data', response.data); // שימוש בפונקציה מ-api.js
            return response; // מחזיר את תגובת השרת
        } catch (error) {
            const handledError = {
                message: error.response?.data?.message || 'Login failed',
                status: error.response?.status,
            };
            dispatch(loginFailure(handledError)); // עדכון Redux במקרה של כישלון
            return rejectWithValue(handledError);
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
            const response = await getFreeAppointments(); // קריאה ל-getAsync
            return response; // החזרת התורים
        } catch (error) {
            console.error('Error fetching appointments:', error); // לוג לדיבוג
            return rejectWithValue(handleErrorResponse(error));
        }
    }
);

export const addAppointmentAsync = createAsyncThunk(
    'appointments/addAppointment',
    async (appointmentData, { rejectWithValue }) => {
        console.log("appointmentData", appointmentData);
        try {
            const data = await addAppointment(appointmentData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchAvailableAppointmentsByDateAsync = createAsyncThunk(
    'appointments/fetchAvailableByDate',
    async ({ dateOnly, timeOnly }, { rejectWithValue }) => {
        try {
            const data = await fetchAvailableAppointmentsByDate({ dateOnly }); // קריאה לפונקציה ב-api
            return data;
        } catch (error) {
            console.error('Error fetching available appointments:', error);
            return rejectWithValue(handleErrorResponse(error));
        }
    }
);

export const fetchFullQueuesForWorkerAsync = createAsyncThunk(
    'appointments/fetchFullQueuesForWorker',
    async (workerId, { rejectWithValue }) => {
        try {
            const data = await fetchFullQueuesForWorker(workerId);
            return data;
        } catch (error) {
            console.error('Error fetching full queues for worker:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, thunkAPI) => {
    try {
      const data = await getAllServices();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk
export const fetchWorkerShifts = createAsyncThunk(
  'worker/fetchWorkerShifts',
  async (workerId, thunkAPI) => {
    const response = await fetchFullQueuesForWorker(workerId);
    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }
    // כאן תוכל לעבד את הנתונים אם צריך
    // נניח שכל אובייקט כולל day ו-hours (מערך שעות)
    return response;
  }
);