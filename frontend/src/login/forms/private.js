import React from 'react'

import { Navigate, Outlet, useNavigate } from 'react-router-dom'



const PrivateRoutes = () => {
  
    const isLogedIn = JSON.parse(localStorage.getItem("userDetails"));

    if (isLogedIn?.role == "admin") {
        return <Outlet />
    } else {
        return <Navigate to={"/UserPage"} />
    }
}


export const UserPrivate = () => {
  
    const isLogedIn = JSON.parse(localStorage.getItem("userDetails"));

    if (isLogedIn?.role == "user" || isLogedIn?.role == "admin") {
        return <Outlet />
    } else {
        return <Navigate to={"/"} />
    }
}



export default PrivateRoutes;