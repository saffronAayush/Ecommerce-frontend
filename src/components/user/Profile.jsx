import React, { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const { LogedUser, loading, isAuthenticated } = useSelector(
        (state) => state.User
    );

    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {" "}
                    <MetaData title={`${LogedUser.name}'s Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            {LogedUser && LogedUser.avatar && (
                                <img
                                    src={LogedUser.avatar.url}
                                    alt={LogedUser.name}
                                />
                            )}
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{LogedUser.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{LogedUser.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>
                                    {String(LogedUser.createdAt).substr(0, 10)}
                                </p>
                            </div>

                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Profile;
