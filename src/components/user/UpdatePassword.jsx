import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, ClearProfileError } from "../../action/UserAction";
import { UPDATE_PASSWORD_RESET } from "../../slices/ProfileSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, isUpdated, error } = useSelector((state) => state.Profile);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("second");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(ClearProfileError());
        }

        if (isUpdated) {
            toast.success("Profile Updated Successfully");

            navigate("/account");

            dispatch(UPDATE_PASSWORD_RESET());
        }
    }, [dispatch, error, isUpdated]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">
                                Update Profile
                            </h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        // value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
            <ToastContainer />
        </Fragment>
    );
};

export default UpdatePassword;
