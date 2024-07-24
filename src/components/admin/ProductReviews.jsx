import React, { Fragment, useEffect, useState } from "react";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
    ClearDeleteReviewError,
    ClearAdminReviewError,
    getAllReviews,
    deleteReviews,
} from "../../action/ProductAction.js";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import MySwal from "sweetalert2";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../slices/AdminReviewsSlice.js";
import { useNavigate } from "react-router-dom";
const ProductReviews = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { deleteError, isDeleted, error, reviews, loading } = useSelector(
        (state) => state.AdminReviews
    );

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            MySwal.fire({
                icon: "error",
                text: error,
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            dispatch(ClearAdminReviewError());
        }

        if (deleteError) {
            MySwal.fire({
                icon: "error",
                text: deleteError,
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            dispatch(ClearDeleteReviewError());
        }

        if (isDeleted) {
            MySwal.fire({
                icon: "success",
                text: "Review Deleted Successfully",
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            navigate("/admin/reviews");
            dispatch(DELETE_REVIEW_RESET());
        }
    }, [dispatch, error, deleteError, isDeleted, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,

            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor"
                    : "redColor";
            },
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
                        <Button
                            onClick={() =>
                                deleteReviewHandler(
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

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL REVIEWS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productReviewsContainer">
                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">
                            ALL REVIEWS
                        </h1>

                        <div>
                            <StarIcon />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                                loading
                                    ? true
                                    : false || productId === ""
                                    ? true
                                    : false
                            }
                        >
                            Search
                        </Button>
                    </form>

                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    ) : (
                        <h1 className="productReviewsFormHeading">
                            No Reviews Found
                        </h1>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductReviews;
