import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
    ClearAdminProductError,
    GetAdminProducts,
} from "../../action/ProductAction.js";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar.jsx";
import {
    DeleteProduct,
    ClearDeleteProductError,
} from "../../action/ProductAction.js";
import { DELETE_PRODUCT_RESET } from "../../slices/DeleteProduct.js";

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, products } = useSelector((state) => state.AdminProducts);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.DeleteProduct
    );

    const deleteProductHandler = (id) => {
        dispatch(DeleteProduct(id));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(ClearAdminProductError());
        }
        if (deleteError) {
            toast.error(deleteError);
            dispatch(ClearDeleteProductError());
        }

        if (isDeleted) {
            toast.success("Product Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch(DELETE_PRODUCT_RESET());
        }
        dispatch(GetAdminProducts());
    }, [dispatch, error, deleteError, isDeleted]);
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
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
                            to={`/admin/product/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandler(
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

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });
    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
