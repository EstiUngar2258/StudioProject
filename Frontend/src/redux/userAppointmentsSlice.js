import { createSlice } from '@reduxjs/toolkit';




const userAppointmentsSlice = createSlice({
    name: 'userAppointments',
    initialState:{
    userAppointments: [], // תורים של המשתמש המחובר
    showUserAppointments: false // מצב תצוגת התורים
},
    reducers: {
        setUserAppointments: (state, action) => {
            state.userAppointments = action.payload; // עדכון תורים של משתמש
        },
        toggleUserAppointments: (state) => {
            state.showUserAppointments = !state.showUserAppointments; // שינוי מצב התצוגה
        }
    },
});

export const { setUserAppointments , toggleUserAppointments } = userAppointmentsSlice.actions;

export default userAppointmentsSlice.reducer;
