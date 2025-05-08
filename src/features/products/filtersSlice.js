import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: '',
    brand: '',
    model: '',
    search: '',
    variant: '',
    year: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateFilters: (state, action) => ({ ...state, ...action.payload }),
    },
});

export const { updateFilters } = filtersSlice.actions;
export default filtersSlice.reducer;  