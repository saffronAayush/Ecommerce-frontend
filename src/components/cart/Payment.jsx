import React, { useEffect, useRef, useState } from "react";
import CheckoutSteps from "./CheckoutSteps.jsx";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { ToastContainer, toast } from "react-toastify";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import { Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { createOrder, clearOrderError } from "../../action/OrderAction.js";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const payBtn = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const { error } = useSelector((state) => state.Order);

    const { shippingInfo, cartItems } = useSelector((state) => state.Cart);
    const { LogedUser } = useSelector((state) => state.User);
    const user = LogedUser;

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const paymentData = {
                amount: Math.round(orderInfo.totalPrice * 100),
            };
            const { data } = await axios.post(
                "https://ecommerce-backend-for-fun.vercel.app/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                setIsProcessing(false);
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));
                    navigate("/success");
                } else {
                    toast.error(
                        "There was some error while processing payment"
                    );
                    setIsProcessing(false);
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            setIsProcessing(false);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearOrderError());
        }
    }, [dispatch, error]);

    return (
        <>
            <div className="pageContainer">
                <MetaData title="Payment" />
                <CheckoutSteps activeStep={2} />
                <div className="paymentContainer">
                    <form
                        className="paymentForm"
                        onSubmit={(e) => submitHandler(e)}
                    >
                        <Typography>Card Info</Typography>
                        <div>
                            <CreditCardIcon />
                            <CardNumberElement className="paymentInput" />
                        </div>
                        <div>
                            <EventIcon />
                            <CardExpiryElement className="paymentInput" />
                        </div>
                        <div>
                            <VpnKeyIcon />
                            <CardCvcElement className="paymentInput" />
                        </div>

                        <button
                            type="submit"
                            ref={payBtn}
                            className={`paymentFormBtn ${
                                isProcessing ? "processing" : ""
                            }`}
                        >
                            {isProcessing ? (
                                <span className="loadingSpinner"></span>
                            ) : (
                                `Pay - ₹${orderInfo && orderInfo.totalPrice}`
                            )}
                        </button>
                    </form>
                </div>
                <div className="testModeInfo">
                    <p>This is in test mode. Use the following card details:</p>
                    <p>
                        <strong>Card Number:</strong> 4242 4242 4242 4242
                    </p>
                    <p>
                        <strong>Expiry Date:</strong> 03/36
                    </p>
                    <p>
                        <strong>CVV:</strong> 336
                    </p>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Payment;
