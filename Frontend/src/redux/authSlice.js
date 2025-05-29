import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false, // האם המשתמש מחובר
    user: null, // פרטי המשתמש (אם יש)
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isLoggedIn: false },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null; // איפוס פרטי המשתמש
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;