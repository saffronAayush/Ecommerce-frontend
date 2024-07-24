import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: {},
};

export const forgotPasswordSlice = createSlice({
    name: "ProductDetail",
    initialState,
    reducers: {
        FORGOT_PASSWORD_REQUEST: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        FORGOT_PASSWORD_SUCCESS: (state, action) => {
            state.loading = false;

            state.message = action.payload.message;
        },
        FORGOT_PASSWORD_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        RESET_PASSWORD_REQUEST: (state, action) => {
            state.loading = true;
        },
        RESET_PASSWORD_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
        },
        RESET_PASSWORD_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_FORGET_ERRORS: (state, action) => {
            // state;
            state.error = null;
        },
    },
});

export const {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_FORGET_ERRORS,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
