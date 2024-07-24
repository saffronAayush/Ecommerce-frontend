import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: [],
};

export const ProfileSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        UPDATE_PROFILE_REQUEST: (state, action) => {
            state.loading = true;
        },
        UPDATE_PROFILE_SUCCESS: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.success;
        },
        UPDATE_PROFILE_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_PROFILE_RESET: (state, action) => {
            state.isUpdated = false;
        },
        UPDATE_PASSWORD_REQUEST: (state, action) => {
            state.loading = true;
        },
        UPDATE_PASSWORD_SUCCESS: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.success;
        },
        UPDATE_PASSWORD_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_PASSWORD_RESET: (state, action) => {
            state.isUpdated = false;
        },

        CLEAR_PROFILE_ERROR: (state, action) => {
            state.error = null;
        },
    },
});

export const {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    CLEAR_PROFILE_ERROR,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
