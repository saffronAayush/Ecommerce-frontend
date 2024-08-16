import { ToastContainer, toast } from "react-toastify";
import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearMyOrderError } from "../../action/OrderAction.js";
import Loader from "../layout/Loader/Loader.jsx";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";
import MetaData from "../layout/MetaData";

const MyOrders = () => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.MyOrders);
    const { LogedUser } = useSelector((state) => state.User);
    const user = LogedUser;

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearMyOrderError());
        }

        dispatch(myOrders());
    }, [dispatch, error]);

    return (
        <>
            <>
                <MetaData title={`${user.name} - Orders`} />

                {loading ? (
                    <Loader />
                ) : (
                    <div className="wraper">
                        <div className="myOrdersPage">
                            <Typography id="myOrdersHeading">
                                {user.name}'s Orders
                            </Typography>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className="myOrdersTable"
                                autoHeight
                            />
                        </div>
                    </div>
                )}
            </>
            <ToastContainer />
        </>
    );
};

export default MyOrders;
