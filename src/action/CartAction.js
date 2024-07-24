import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO,
} from "../slices/CartSlice";
import axios from "axios";

//add item to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

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

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().Cart.cartItems)
    );
};

// remvoe item from cart
export const removeCartItems = (id) => async (dispatch, getState) => {
    dispatch(REMOVE_FROM_CART(id));
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().Cart.cartItems)
    );
};

// save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch(SAVE_SHIPPING_INFO(data));

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};
