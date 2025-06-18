import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchWorkerShifts } from './thunk';



const workerSlice = createSlice({
  name: 'worker',
  initialState: {
    shifts: [],
    loading: false,
    error: null,
  },
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
      });
  },
});

export default workerSlice.reducer;