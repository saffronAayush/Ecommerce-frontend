import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
};

export const AdminUserDetailSlice = createSlice({
    name: "MyOrders",
    initialState,
    reducers: {
        USER_DETAILS_REQUEST: (state, action) => {
            state.loading = true;
        },
        USER_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        },
        USER_DETAILS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_USER_DETAILS_ERROR: (state, action) => {
            state.error = null;
        },
    },
});

export const {
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    CLEAR_USER_DETAILS_ERROR,
} = AdminUserDetailSlice.actions;

export default AdminUserDetailSlice.reducer;
