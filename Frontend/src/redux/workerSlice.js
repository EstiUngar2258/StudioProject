import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchWorkerShifts, fetchWorkerByIdAsync } from './thunk';

const initialState = {
  shifts: [],
  worker: null,
  loading: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const workerSlice = createSlice({
  name: 'worker',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkerShifts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkerShifts.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts = action.payload;
      })
      .addCase(fetchWorkerShifts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWorkerByIdAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWorkerByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.worker = action.payload;
      })
      .addCase(fetchWorkerByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default workerSlice.reducer;