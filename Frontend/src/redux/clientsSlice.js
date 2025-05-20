import { createSlice } from "@reduxjs/toolkit";
import { addClientAsync, fetchDataAsyncAction, handleErrorResponse} from "./thunk";



const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        clientsList: [],
        error: null,
        loading: false,
    },
    reducers: {},
  
   
extraReducers: (builder) => {
    builder
        .addCase(fetchDataAsyncAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.clientsList = [];
        })
        .addCase(fetchDataAsyncAction.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.clientsList = action.payload;
        })
        .addCase(fetchDataAsyncAction.rejected, (state, action) => {
            handleErrorResponse(state, action);
            state.clientsList = [];
        })
        .addCase(addClientAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addClientAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.clientsList.push(action.payload);
        })
        .addCase(addClientAsync.rejected, (state, action) => {
            handleErrorResponse(state, action);
        });
    },

});

export default clientsSlice.reducer;
