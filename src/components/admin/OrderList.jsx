import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import SideBar from "./Sidebar";
import {
    getAllOrders,
    deleteOrder,
    clearAdminOrderError,
    clearDeleteOrderError,
} from "../../action/OrderAction.js";
import { DELETE_ORDER_RESET } from "../../slices/AdminOrderSlice.js";
import MySwal from "sweetalert2";

const OrderList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, orders, deleting, isDeleted, deleteError } =
        useSelector((state) => state.AdminOrder);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            MySwal.fire({
                icon: "error",
                text: error,
                timer: 3000, // Auto-close after 3 seconds
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            dispatch(clearAdminOrderError());
        }

        if (deleteError) {
            MySwal.fire({
                icon: "error",
                text: deleteError,
                timer: 3000, // Auto-close after 3 seconds
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            dispatch(clearDeleteOrderError());
        }

        if (isDeleted) {
            MySwal.fire({
                icon: "success",
                text: "Order Deleted Success Fully",
                timer: 3000, // Auto-close after 3 seconds
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            navigate("/admin/orders");
            dispatch(DELETE_ORDER_RESET());
        }

        dispatch(getAllOrders());
    }, [dispatch, toast, error, deleteError, isDeleted]);

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
            flex: 0.4,
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
                    <Fragment>
                        <Link
                            to={`/admin/order/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteOrderHandler(
                                    params.getValue(params.id, "id")
                                )
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default OrderList;
