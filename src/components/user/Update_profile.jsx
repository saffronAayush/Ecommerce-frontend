import React, { Fragment, useState, useEffect } from "react";
import "./Update_profile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
    UpdateProfile,
    ClearProfileError,
    LoadUser,
} from "../../action/UserAction";
import { UPDATE_PROFILE_RESET } from "../../slices/ProfileSlice";
import { useNavigate } from "react-router-dom";

const Update_profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { LogedUser } = useSelector((state) => state.User);
    const { error, isUpdated, loading } = useSelector((state) => state.Profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(UpdateProfile(myForm));
    };
    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (LogedUser) {
            setName(LogedUser.name);
            setEmail(LogedUser.email);
            setAvatarPreview(LogedUser.avatar.url);
        }

        if (error) {
            toast.error(error);
            dispatch(ClearProfileError());
        }

        if (isUpdated) {
            toast.success("Profile Updated Successfully");
            dispatch(LoadUser());

            navigate("/account");

            dispatch(UPDATE_PROFILE_RESET());
        }
    }, [dispatch, error, alert, LogedUser, isUpdated]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">
                                Update Profile
                            </h2>

                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div id="updateProfileImage">
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                    />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
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

export default Update_profile;
