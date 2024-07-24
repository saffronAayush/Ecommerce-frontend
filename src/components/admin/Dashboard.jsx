import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData.jsx";
import { Typography } from "@mui/material";
import { Doughnut, Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import {
    GetAdminProducts,
    ClearAdminProductError,
} from "../../action/ProductAction.js";
import { getAllUsers } from "../../action/UserAction.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../action/OrderAction.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products, error } = useSelector((state) => state.AdminProducts);
    const { orders } = useSelector((state) => state.AdminOrder);
    const { users } = useSelector((state) => state.AdminAllUsers);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(ClearAdminProductError());
        }

        dispatch(getAllUsers());
        dispatch(GetAdminProducts());
        dispatch(getAllOrders());
    }, [dispatch]);

    let totalAmount = 0;
    orders &&
        orders.forEach((itemm) => {
            totalAmount += itemm.totalPrice;
        });

    let outOfStock = 0;
    products &&
        products.forEach((item) => {
            if (item.stock === 0) {
                outOfStock += 1;
            }
        });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["red", "green"],
                hoverBackgroundColor: ["#830303", "#033401"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };
    const [orderCount, setOrderCount] = useState(0);
    console.log(orderCount);
    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>
                                {orders &&
                                    orders.reduce((acc, order) => {
                                        if (order.orderStatus !== "Delivered")
                                            return acc + 1;
                                        return acc;
                                    }, 0)}
                            </p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>
                                {users &&
                                    users.reduce((acc, user) => {
                                        if (user.role !== "admin") {
                                            return acc + 1;
                                        }
                                        return acc;
                                    }, 0)}
                            </p>
                        </Link>
                    </div>
                </div>
                <div className="charts">
                    <div style={{ width: "600px" }}>
                        <Line data={lineState} />
                    </div>
                    <div>
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
