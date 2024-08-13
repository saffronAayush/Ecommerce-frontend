import axios from "axios";
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO,
} from "../slices/CartSlice";

// Add item to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        // Fetch product details from the API
        const { data } = await axios.get(
            `https://ecommerce-backend-for-fun.vercel.app/api/v1/product/${id}`
        );

        // Dispatch the action to add item to the cart
        dispatch(
            ADD_TO_CART({
                product: data.product._id,
                quantity,
                image: data.product.images[0].url,
                price: data.product.price,
                name: data.product.name,
                stock: data.product.stock,
            })
        );

        // Save cart items to localStorage
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().Cart.cartItems)
        );
    } catch (error) {
        console.error("Failed to add item to cart:", error);
    }
};

// Remove item from cart
export const removeCartItems = (id) => async (dispatch, getState) => {
    try {
        // Dispatch the action to remove item from the cart
        dispatch(REMOVE_FROM_CART(id));

        // Save updated cart items to localStorage
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().Cart.cartItems)
        );
    } catch (error) {
        console.error("Failed to remove item from cart:", error);
    }
};

// Save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
    try {
        // Dispatch the action to save shipping information
        dispatch(SAVE_SHIPPING_INFO(data));

        // Save shipping information to localStorage
        localStorage.setItem("shippingInfo", JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save shipping information:", error);
    }
};
