import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const AdminReviewsSlice = createSlice({
    name: "AdminReview",
    initialState,
    reducers: {
        ADMIN_REVIEW_REQUEST: (state, action) => {
            state.loading = true;
        },
        ADMIN_REVIEW_SUCCESS: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        ADMIN_REVIEW_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        ADMIN_REVIEW_CLEAR_ERROR: (state, action) => {
            // state;
            state.error = null;
        },

        //
        DELETE_REVIEW_REQUEST: (state, action) => {
            state.deleting = true;
        },
        DELETE_REVIEW_SUCCESS: (state, action) => {
            state.deleting = false;
            state.isDeleted = true;
        },
        DELETE_REVIEW_RESET: (state, action) => {
            state.isDeleted = false;
        },
        DELETE_REVIEW_FAIL: (state, action) => {
            state.deleting = false;
            state.deleteError = action.payload;
        },
        DELETE_REVIEW_CLEAR_ERROR: (state, action) => {
            // state;
            state.deleteError = null;
        },
    },
});

export const {
    ADMIN_REVIEW_REQUEST,
    ADMIN_REVIEW_FAIL,
    ADMIN_REVIEW_SUCCESS,
    ADMIN_REVIEW_CLEAR_ERROR,

    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_CLEAR_ERROR,
} = AdminReviewsSlice.actions;

export default AdminReviewsSlice.reducer;
