import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ admin }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.User);

    if (loading) {
        return <Loader />; // Replace with your actual loading component
    }
    if (admin && admin.role && admin.role !== "admin")
        return <Navigate to="/login" />;
    if (isAuthenticated === false) return <Navigate to="/login" />;
    else return <Outlet />;
};

export default ProtectedRoute;
