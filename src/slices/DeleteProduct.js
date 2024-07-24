import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const DeleteProductSlice = createSlice({
    name: "AdminProduct",
    initialState,
    reducers: {
        DELETE_PRODUCT_REQUEST: (state, action) => {
            state.loading = true;
        },
        DELETE_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        DELETE_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        DELETE_PRODUCT_CLEAR_ERROR: (state, action) => {
            // state;
            state.error = null;
        },
        DELETE_PRODUCT_RESET: (state, action) => {
            // state;
            state.isDeleted = null;
            state.error = null;
        },
    },
});

export const {
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_CLEAR_ERROR,
    DELETE_PRODUCT_RESET,
} = DeleteProductSlice.actions;

export default DeleteProductSlice.reducer;
