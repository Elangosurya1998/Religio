
import Dashboard from "../pages/Dashboard";
import { Switch, Route } from 'react-router'
import { BrowserRouter, createBrowserRouter, RouterProvider, Routes } from "react-router-dom";

import CongregationCreate from "../pages/Congregation/CongregationCreate";
import ProvinceCreate from "../pages/Province/ProvinceCreate";
import ClientRegistrationCreate from "../pages/clientregistration/clientregistrationCreate";
import CongregationList from "../pages/Congregation/CongregationList";
import ProvinceList from "../pages/Province/ProvinceList";
import ClientregistrationList from "../pages/clientregistration/clientregistrationList";
import CongregationEdit from "../pages/Congregation/CongregationEdit";
import ProvinceEdit from "../pages/Province/ProvinceEdit";
import ClientRegistrationEdit from "../pages/clientregistration/clientregistrationEdit";




function Main() {
    return (
      <>

<Dashboard />

       {/* <ClientRegistrationCreate />
<CongregationCreate />
< ProvinceCreate />
<CongregationList />
<ProvinceList />
<ClientregistrationList />
<CongregationEdit />
<ProvinceEdit />
<ClientRegistrationEdit /> */}
      </>
    )
}

export default Main;