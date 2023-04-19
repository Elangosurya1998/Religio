import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'



const PrivateRoutes = () => {
  
    const isLogedIn = JSON.parse(localStorage.getItem("userDetails"));

    if (isLogedIn) {
        return <Outlet />
    } else {
        return <Navigate to={"/login"} />
    }
}

export default PrivateRoutes;