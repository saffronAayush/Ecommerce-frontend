import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
};

export const MyOrderSlice = createSlice({
    name: "MyOrders",
    initialState,
    reducers: {
        MY_ORDER_REQUEST: (state, action) => {
            state.loading = true;
        },
        MY_ORDER_SUCCESS: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        MY_ORDER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_MY_ORDER_ERROR: (state, action) => {
            state.error = null;
        },
    },
});

export const {
    MY_ORDER_REQUEST,
    MY_ORDER_FAIL,
    MY_ORDER_SUCCESS,
    CLEAR_MY_ORDER_ERROR,
} = MyOrderSlice.actions;

export default MyOrderSlice.reducer;
