import React, { Fragment, useEffect, useId, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../slices/AdminUserSlice";
import {
    getUserDetails,
    updateUser,
    ClearUserDetailsError,
    ClearUpdateUserError,
} from "../../action/UserAction.js";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import MySwal from "sweetalert2";

const UserUpdate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, user } = useSelector((state) => state.AdminUser);

    const { updating, updateError, isUpdated } = useSelector(
        (state) => state.AdminAllUsers
    );
    const { LogedUser } = useSelector((state) => state.User);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = useParams().id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
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

            dispatch(ClearUserDetailsError());
        }

        if (updateError) {
            MySwal.fire({
                icon: "error",
                text: updateError,
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            dispatch(ClearUpdateUserError());
        }

        if (isUpdated) {
            MySwal.fire({
                icon: "success",
                text: "User is Updated Succesfully",
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });

            navigate("/admin/users");

            dispatch(UPDATE_USER_RESET());
            dispatch(getUserDetails(userId));
        }
    }, [dispatch, error, navigate, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        console.log(user._id);
        if (userId === LogedUser._id && role !== "admin") {
            MySwal.fire({
                icon: "error",
                text: "Can't Update Admin Role by themselve",
                timer: 3000,
                toast,
                position: "top-end",
                heightAuto: false,
                timerProgressBar: true,
                showConfirmButton: true,
            });
            return;
        }
        dispatch(updateUser(userId, myForm));
    };

    return (
        <Fragment>
            <MetaData title="Update User" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <form
                            className="createProductForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>

                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    disabled
                                />
                            </div>
                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    disabled
                                />
                            </div>

                            <div>
                                <VerifiedUserIcon />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={
                                    updating
                                        ? true
                                        : false || role === ""
                                        ? true
                                        : false
                                }
                            >
                                Update
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default UserUpdate;
