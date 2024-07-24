import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const AdminUserSlice = createSlice({
    name: "AdminUsers",
    initialState,
    reducers: {
        ADMIN_USER_REQUEST: (state, action) => {
            state.loading = true;
        },
        ADMIN_USER_SUCCESS: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
        },
        ADMIN_USER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        ADMIN_USER_CLEAR_ERROR: (state, action) => {
            // state;
            state.error = null;
        },
        //
        UPDATE_USER_REQUEST: (state, action) => {
            state.updating = true;
        },
        UPDATE_USER_SUCCESS: (state, action) => {
            state.updating = false;
            state.isUpdated = true;
        },
        UPDATE_USER_FAIL: (state, action) => {
            state.updating = false;
            state.updateError = action.payload;
        },
        UPDATE_USER_RESET: (state, action) => {
            state.isUpdated = false;
        },
        UPDATE_USER_CLEAR_ERROR: (state, action) => {
            // state;
            state.updateError = null;
        },

        //
        DELETE_USER_REQUEST: (state, action) => {
            state.deleting = true;
        },
        DELETE_USER_SUCCESS: (state, action) => {
            state.deleting = false;
            state.isDeleted = true;
            state.deleteMessage = action.payload.message;
        },
        DELETE_USER_RESET: (state, action) => {
            state.isDeleted = false;
        },
        DELETE_USER_FAIL: (state, action) => {
            state.deleting = false;
            state.deleteError = action.payload;
        },
        DELETE_USER_CLEAR_ERROR: (state, action) => {
            // state;
            state.deleteError = null;
        },
    },
});

export const {
    ADMIN_USER_REQUEST,
    ADMIN_USER_FAIL,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_CLEAR_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_CLEAR_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_CLEAR_ERROR,
} = AdminUserSlice.actions;

export default AdminUserSlice.reducer;
