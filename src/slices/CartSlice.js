import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
};

export const CartSlice = createSlice({
    name: "CartDetails",
    initialState,
    reducers: {
        ADD_TO_CART: (state, action) => {
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );
            if (isItemExist) {
                state.cartItems = state.cartItems.map((i) =>
                    i.product === isItemExist.product ? item : i
                );
            } else {
                state.cartItems.push(item);
            }
        },
        REMOVE_FROM_CART: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (i) => i.product !== action.payload
            );
        },
        SAVE_SHIPPING_INFO: (state, action) => {
            state.shippingInfo = action.payload;
        },
    },
});

export const { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } =
    CartSlice.actions;

export default CartSlice.reducer;
