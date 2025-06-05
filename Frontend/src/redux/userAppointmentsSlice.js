import { createSlice } from '@reduxjs/toolkit';
import { fetchFullQueuesForWorkerAsync } from './thunk'; // ייבוא ה-thunk

const userAppointmentsSlice = createSlice({
    name: 'userAppointments',
    initialState: {
        userAppointments: [], // תורים של המשתמש המחובר
        showUserAppointments: false // מצב תצוגת התורים
    },
    reducers: {
     
        toggleUserAppointments: (state) => {
            state.showUserAppointments = !state.showUserAppointments; // שינוי מצב התצוגה
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFullQueuesForWorkerAsync.fulfilled, (state, action) => {
            state.userAppointments = action.payload; // עדכון התורים מהשרת
        });
    }
});

export const {  toggleUserAppointments } = userAppointmentsSlice.actions;

export default userAppointmentsSlice.reducer;
