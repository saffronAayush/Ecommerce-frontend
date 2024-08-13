import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header.jsx";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/product/ProductDetails.js";
import Products from "./components/product/Products.jsx";
import Search from "./components/product/Search.jsx";
import LoginSignup from "./components/user/LoginSignup.jsx";
import Profile from "./components/user/Profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions.jsx";
import { LoadUser } from "./action/UserAction.js";
import ProtectedRoute from "./components/route/ProtectedRoute.jsx";
import Update_profile from "./components/user/Update_profile.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import ResetPassword from "./components/user/ResetPassword.jsx";
import { ClearLoginErrors } from "./action/UserAction.js";
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";
import Payment from "./components/cart/Payment.jsx";
import axios from "axios";
import Dashboard from "./components/admin/Dashboard.jsx";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import OrderSuccess from "./components/cart/OrderSuccess.jsx";
import MyOrders from "./components/order/MyOrders.jsx";
import OrderDetails from "./components/order/OrderDetails.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import NewProduct from "./components/admin/NewProduct.jsx";
import UpdateProduct from "./components/admin/UpdateProduct.jsx";
import OrderList from "./components/admin/OrderList.jsx";
import ProcessOrder from "./components/admin/ProcessOrder.jsx";
import UserList from "./components/admin/UserList.jsx";
import UserUpdate from "./components/admin/UserUpdate.jsx";
import ProductReviews from "./components/admin/ProductReviews.jsx";
import About from "./components/layout/about/About.jsx";
import Contact from "./components/layout/contact/Contact.jsx";
import NotFound from "./components/layout/notFound/NotFound.jsx";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, LogedUser, error } = useSelector(
        (state) => state.User
    );
    const [stripeApiKey, setSetstripeApiKey] = useState("");
    const [apiAllow, setApiAllow] = useState(false);

    const getStripeApiKey = async () => {
        try {
            // Fetch the Stripe API key from the backend
            const { data } = await axios.get(
                "https://ecommerce-backend-for-fun.vercel.app/api/v1/stripeapikey"
            );

            // Set the Stripe API key to the state
            setSetstripeApiKey(data.stripeApiKey);

            // Log the Stripe API key (for debugging purposes)
            console.log(data.stripeApiKey);
        } catch (error) {
            // Handle errors
            console.error("Error fetching Stripe API key:", error);

            // Optionally, you can set a default value or notify the user
            setSetstripeApiKey(null);

            // If you need to notify the user
            // alert('Failed to fetch payment credentials. Please try again later.');

            // Or handle the error in other ways as needed
        }
    };

    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "sans-serif"],
            },
        });
        dispatch(LoadUser());
        if (error) {
            dispatch(ClearLoginErrors());
        }

        getStripeApiKey();
    }, [error, dispatch]);

    return (
        <>
            <Router>
                <ScrollToTop />
                <Header />
                {isAuthenticated && <UserOptions user={LogedUser} />}
                {stripeApiKey && (
                    <>
                        <Elements stripe={loadStripe(stripeApiKey)}>
                            <Routes>
                                <Route element={<ProtectedRoute />}>
                                    <Route
                                        path="/process/payment"
                                        element={<Payment />}
                                    />
                                </Route>
                            </Routes>
                        </Elements>
                    </>
                )}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:keyword" element={<Products />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<LoginSignup />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/password/forgot"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/password/reset/:token"
                        element={<ResetPassword />}
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/account" element={<Profile />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/me/update" element={<Update_profile />} />
                        <Route
                            path="/password/update"
                            element={<UpdatePassword />}
                        />
                        <Route
                            path="/order/confirm"
                            element={<ConfirmOrder />}
                        />
                        <Route path="/success" element={<OrderSuccess />} />
                        <Route path="/orders" element={<MyOrders />} />
                        <Route path="/order/:id" element={<OrderDetails />} />
                    </Route>

                    <Route element={<ProtectedRoute admin={LogedUser} />}>
                        <Route
                            path="/admin/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/admin/products"
                            element={<ProductList />}
                        />
                        <Route path="/admin/product" element={<NewProduct />} />
                        <Route
                            path="/admin/product/:id"
                            element={<UpdateProduct />}
                        />
                        <Route path="/admin/orders" element={<OrderList />} />
                        <Route
                            path="/admin/order/:id"
                            element={<ProcessOrder />}
                        />
                        <Route path="/admin/users" element={<UserList />} />
                        <Route
                            path="/admin/user/:id"
                            element={<UserUpdate />}
                        />
                        <Route
                            path="/admin/reviews"
                            element={<ProductReviews />}
                        />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </Router>
        </>
    );
}
export default App;
