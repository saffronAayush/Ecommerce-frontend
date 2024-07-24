import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const OrderSlice = createSlice({
    name: "OrderDetails",
    initialState,
    reducers: {
        CREATE_ORDER_REQUEST: (state, action) => {
            state.loading = true;
        },
        CREATE_ORDER_SUCCESS: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        CREATE_ORDER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ORDER_ERROR: (state, action) => {
            state.error = null;
        },
    },
});

export const {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    CLEAR_ORDER_ERROR,
} = OrderSlice.actions;

export default OrderSlice.reducer;
