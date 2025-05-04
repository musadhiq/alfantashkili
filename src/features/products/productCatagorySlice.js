import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [],
    loading: false,
    error: null,
}

const catagoriesSlice = createSlice({
    name: 'catagory',
    initialState,
    reducers: {
        fetchCatagoriesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCatagoriesSuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        fetchCatagoriesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },

});

export const { fetchCatagoriesFailure, fetchCatagoriesStart, fetchCatagoriesSuccess } = catagoriesSlice.actions
export default catagoriesSlice.reducer