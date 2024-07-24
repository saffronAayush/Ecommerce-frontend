import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const UpdateProductSlice = createSlice({
    name: "UpdateProduct",
    initialState,
    reducers: {
        UPDATE_PRODUCT_REQUEST: (state, action) => {
            state.loading = true;
        },
        UPDATE_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.success;
        },
        UPDATE_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_PRODUCT_CLEAR_ERROR: (state, action) => {
            // state;
            state.error = null;
        },
        UPDATE_PRODUCT_RESET: (state, action) => {
            // state;
            state.isUpdated = null;
            state.error = null;
        },
    },
});

export const {
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_CLEAR_ERROR,
    UPDATE_PRODUCT_RESET,
} = UpdateProductSlice.actions;

export default UpdateProductSlice.reducer;
