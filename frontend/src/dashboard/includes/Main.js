import ClientRegistration from "../pages/clientregistration";
import Dashboard from "../pages/Dashboard";

import { Switch, Route } from 'react-router'
import { BrowserRouter, createBrowserRouter, RouterProvider, Routes } from "react-router-dom";

function Main() {
    return (
      <>
        <Dashboard/>
        {/* <ClientRegistration/> */}
      </>
    )
}

export default Main;