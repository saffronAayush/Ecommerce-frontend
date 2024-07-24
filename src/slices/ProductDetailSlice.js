import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {},
};

export const productDetailsSlice = createSlice({
    name: "ProductDetail",
    initialState,
    reducers: {
        PRODUCT_DETAILS_REQUEST: (state, action) => {
            state.loading = true;
            // state.product = {};
        },
        PRODUCT_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        PRODUCT_DETAILS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERRORS: (state, action) => {
            // state;
            state.error = null;
        },
    },
});

export const {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
