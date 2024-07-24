import React, { Fragment } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { addItemsToCart, removeCartItems } from "../../action/CartAction";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.Cart);

    const decreaseQuantity = (product, quantity) => {
        const newQuantity = quantity - 1;
        if (newQuantity > 0) dispatch(addItemsToCart(product, newQuantity));
        else {
            toast.error("Hit the remove button to remove item form the cart", {
                autoClose: 4000,
            });
        }
    };

    const increaseQuantity = (product, quantity, stock) => {
        const newQuantity = quantity + 1;
        if (newQuantity < stock) dispatch(addItemsToCart(product, newQuantity));
        else {
            toast.error("You can't add more than the stock", {
                autoClose: 2000,
            });
        }
    };

    const deleteCartItems = (product) => {
        dispatch(removeCartItems(product));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping");
    };

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />

                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems &&
                            cartItems.map((item) => (
                                <div
                                    className="cartContainer"
                                    key={item.product}
                                >
                                    <CartItemCard
                                        item={item}
                                        deleteCartItems={deleteCartItems} //************* */
                                    />
                                    <div className="cartInput">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    //777777777777777777
                                                    item.product,
                                                    item.quantity
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            readOnly
                                        />
                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    //7777777777777
                                                    item.product,
                                                    item.quantity,
                                                    item.stock
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cartSubtotal">{`₹${
                                        item.price * item.quantity
                                    }`}</p>
                                </div>
                            ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`₹${cartItems.reduce(
                                    (acc, item) =>
                                        acc + item.quantity * item.price,
                                    0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
            <ToastContainer />
        </Fragment>
    );
};

export default Cart;
