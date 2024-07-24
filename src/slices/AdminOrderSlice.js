import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const AdminOrderSlice = createSlice({
    name: "AdminOrders",
    initialState,
    reducers: {
        ADMIN_ORDER_REQUEST: (state, action) => {
            state.loading = true;
        },
        ADMIN_ORDER_SUCCESS: (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
        },
        ADMIN_ORDER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        ADMIN_ORDER_CLEAR_ERROR: (state, action) => {
            // state;
            state.error = null;
        },
        //
        UPDATE_ORDER_REQUEST: (state, action) => {
            state.updating = true;
        },
        UPDATE_ORDER_SUCCESS: (state, action) => {
            state.updating = false;
            state.isUpdated = true;
        },
        UPDATE_ORDER_FAIL: (state, action) => {
            state.updating = false;
            state.updateError = action.payload;
        },
        UPDATE_ORDER_RESET: (state, action) => {
            state.isUpdated = false;
        },
        UPDATE_ORDER_CLEAR_ERROR: (state, action) => {
            // state;
            state.updateError = null;
        },

        //
        DELETE_ORDER_REQUEST: (state, action) => {
            state.deleting = true;
        },
        DELETE_ORDER_SUCCESS: (state, action) => {
            state.deleting = false;
            state.isDeleted = true;
        },
        DELETE_ORDER_RESET: (state, action) => {
            state.isDeleted = false;
        },
        DELETE_ORDER_FAIL: (state, action) => {
            state.deleting = false;
            state.deleteError = action.payload;
        },
        DELETE_ORDER_CLEAR_ERROR: (state, action) => {
            // state;
            state.deleteError = null;
        },
    },
});

export const {
    ADMIN_ORDER_REQUEST,
    ADMIN_ORDER_FAIL,
    ADMIN_ORDER_SUCCESS,
    ADMIN_ORDER_CLEAR_ERROR,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_CLEAR_ERROR,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_CLEAR_ERROR,
} = AdminOrderSlice.actions;

export default AdminOrderSlice.reducer;
