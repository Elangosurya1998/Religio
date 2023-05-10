import React from 'react'

import { Navigate, Outlet, useNavigate } from 'react-router-dom'



const PrivateRoutes = () => {

    const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));

    if (isLogedIn?.role == "admin") {
        return <Outlet />
    } else {
        return <Navigate to={"/Religio/Dashboard"} />
    }
}


export const UserPrivate = () => {

    const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));

    if (isLogedIn?.role == "user" || isLogedIn?.role == "admin") {
        return <Outlet />
    } else {
        return <Navigate to={"/login"} />
    }
}



export default PrivateRoutes;