import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {},
};

export const NewProductSlice = createSlice({
    name: "NewProduct",
    initialState,
    reducers: {
        NEW_PRODUCT_REQUEST: (state, action) => {
            state.loading = true;
        },
        NEW_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.product = action.payload.product;
        },
        NEW_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        NEW_PRODUCT_CLEAR_ERROR: (state, action) => {
            // state;
            state.error = null;
        },
        NEW_PRODUCT_RESET: (state, action) => {
            state.success = null;
            state.loading = null;
            state.error = null;
            state.product = null;
        },
    },
});

export const {
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_CLEAR_ERROR,
} = NewProductSlice.actions;

export default NewProductSlice.reducer;
