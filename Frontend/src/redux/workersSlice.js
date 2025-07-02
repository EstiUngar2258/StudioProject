import { createSlice } from '@reduxjs/toolkit';
import { fetchAllWorkersAsync, addWorkerAsync, updateWorkerAsync } from './thunk';

const initialState = {
    workers: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllWorkersAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllWorkersAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.workers = action.payload;
            })
            .addCase(fetchAllWorkersAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            // הוספת עובד
            .addCase(addWorkerAsync.fulfilled, (state, action) => {
                state.workers.push(action.payload);
            })
            // עדכון עובד
            .addCase(updateWorkerAsync.fulfilled, (state, action) => {
                const idx = state.workers.findIndex(w => w.id === action.payload.id);
                if (idx !== -1) state.workers[idx] = action.payload;
            });
    },
});

export default workersSlice.reducer;