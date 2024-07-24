import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    LogedUser: [],
};

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        LOGIN_REQUEST: (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.LogedUser = action.payload.user;
        },
        LOGIN_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.LogedUser = null;
            state.error = action.payload;
        },

        REGISTER_REQUEST: (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        REGISTER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.LogedUser = action.payload.user;
        },
        REGISTER_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.LogedUser = null;
            state.error = action.payload;
        },

        LOAD_USER_REQUEST: (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        LOAD_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.LogedUser = action.payload;
        },
        LOGOUT_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.LogedUser = null;
        },
        LOGOUT_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.error = action.payload;
        },

        LOAD_USER_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.LogedUser = null;
            state.loadUsererror = action.payload;
        },
        CLEAR_LOGIN_ERRORS: (state, action) => {
            // state;
            state.error = null;
        },
    },
});

export const {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    CLEAR_LOGIN_ERRORS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} = userSlice.actions;

export default userSlice.reducer;
