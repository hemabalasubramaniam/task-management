import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { loggedIn } = useContext(AuthContext);
    return (
        <>
            {
                loggedIn ? <Outlet /> : <Navigate to="/" />
            }
        </>
    );
};

export default ProtectedRoute;
