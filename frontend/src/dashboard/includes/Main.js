import ClientRegistration from "../pages/clientregistration";
import Congregation from "../pages/Congregation";
import Dashboard from "../pages/Dashboard";

import { Switch, Route } from 'react-router'
import { BrowserRouter, createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import Province from "../pages/Province";

function Main() {
    return (
      <>
        {/* <Dashboard/> */}
        <ClientRegistration/>
        <Congregation/>
        <Province />
      </>
    )
}

export default Main;