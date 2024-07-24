import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const NewReviewSlice = createSlice({
    name: "Review",
    initialState,
    reducers: {
        NEW_REVIEW_REQUEST: (state, action) => {
            state.loading = true;
        },
        NEW_REVIEW_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        NEW_REVIEW_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_NEW_REVIEW_ERROR: (state, action) => {
            state.error = null;
        },
        NEW_REVIEW_RESET: (state) => {
            state.loading = null;
            state.error = null;
            state.success = null;
        },
    },
});

export const {
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    CLEAR_NEW_REVIEW_ERROR,
    NEW_REVIEW_RESET,
} = NewReviewSlice.actions;

export default NewReviewSlice.reducer;
