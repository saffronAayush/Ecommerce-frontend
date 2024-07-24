import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: {},
};

export const OrderDetailReducer = createSlice({
    name: "MyOrders",
    initialState,
    reducers: {
        ORDER_DETAILS_REQUEST: (state, action) => {
            state.loading = true;
        },
        ORDER_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        ORDER_DETAILS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ORDER_DETAILS_ERROR: (state, action) => {
            state.error = null;
        },
    },
});

export const {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    CLEAR_ORDER_DETAILS_ERROR,
} = OrderDetailReducer.actions;

export default OrderDetailReducer.reducer;
