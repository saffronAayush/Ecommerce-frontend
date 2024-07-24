import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

export const productSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        ALL_PRODUCT_REQUEST: (state, action) => {
            state.loading = true;
            state.products = [];
        },
        ALL_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
        },
        ALL_PRODUCT_FAIL: (state, action) => {
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
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
} = productSlice.actions;

export default productSlice.reducer;
