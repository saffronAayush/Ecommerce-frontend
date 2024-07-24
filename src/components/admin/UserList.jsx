import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import {
    getAllUsers,
    deleteUser,
    ClearDeleteUserError,
    ClearAdminUserError,
} from "../../action/UserAction.js";
import { DELETE_USER_RESET } from "../../slices/AdminUserSlice";
import MySwal from "sweetalert2";

const UsersList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, users, deleteError, isDeleted, deleteMessage } = useSelector(
        (state) => state.AdminAllUsers
    );
    const { LogedUser } = useSelector((state) => state.User);

    const deleteUserHandler = (id) => {
        if (id === LogedUser._id) {
            MySwal.fire({
                icon: "error",
                text: "Cannot Remove Yourself",
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            return;
        }
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (error) {
            MySwal.fire({
                icon: "error",
                text: { error },
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            dispatch(ClearAdminUserError());
        }

        if (deleteError) {
            MySwal.fire({
                icon: "error",
                text: { deleteError },
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            dispatch(ClearDeleteUserError());
        }

        if (isDeleted) {
            MySwal.fire({
                icon: "success",
                text: "User has been removed",
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, isDeleted, deleteMessage]);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
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
                        <Link
                            to={`/admin/user/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(
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

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

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
        </Fragment>
    );
};

export default UsersList;
