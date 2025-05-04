import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice';
import productReducer from "../features/products/productSlice";
import categoriesReducer from "../features/products/productCatagorySlice";
import filtersReducer from "../features/products/filtersSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        categories: categoriesReducer,
        filters: filtersReducer
    }
})