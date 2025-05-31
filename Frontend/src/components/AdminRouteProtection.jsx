import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRouteProtection = () => {
    const { user, isLoggedIn } = useSelector((state) => state?.user);

    if (user && isLoggedIn && user?.role === 'admin') {
        return <Outlet />;
    } else {
        return <Navigate to="/" />; // Or redirect to /login or /unauthorized
    }
};

export default AdminRouteProtection;
