import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRouteProtection = () => {
    const { user,isLoggedIn } = useSelector(state => state?.user);
    if (user && isLoggedIn) {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to={'/login'} />
    }
}

export default AuthRouteProtection
