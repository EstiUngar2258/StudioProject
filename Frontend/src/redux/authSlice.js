import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false, // האם המשתמש מחובר
    user: null, // פרטי המשתמש (אם יש)
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload; // שמירת פרטי המשתמש
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null; // איפוס פרטי המשתמש
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;