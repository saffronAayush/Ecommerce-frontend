import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

export const AdminProductSlice = createSlice({
    name: "AdminProduct",
    initialState,
    reducers: {
        ADMIN_PRODUCT_REQUEST: (state, action) => {
            state.loading = true;
            state.products = [];
        },
        ADMIN_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        ADMIN_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        ADMIN_PRODUCT_CLEAR_ERROR: (state, action) => {
            // state;
            state.error = null;
        },
    },
});

export const {
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_CLEAR_ERROR,
} = AdminProductSlice.actions;

export default AdminProductSlice.reducer;
