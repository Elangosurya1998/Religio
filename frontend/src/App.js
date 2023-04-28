import { Route } from 'react-router'
import { BrowserRouter, Routes } from "react-router-dom";
import Login from "./login/forms/Login";
import Register from "./login/forms/Register";
import DashLayouts from "./dashboard/Layoutsdash";
import Layoutsland from "./landing/Layoutsland";
import Layoutsblog from "./landing/Bloglayout";
import Layoutsdemo from "./landing/Demolayout";
import RegLayouts from './dashboard/registerationlayout';
import RegeditLayouts from './dashboard/ClientregistrationEdit';
import RegaddLayouts from './dashboard/ClientregistrationAdd';
import ConglistLayouts from './dashboard/CongregationListlayout';
import CongeditLayouts from './dashboard/Congregationeditlayout';
import CongaddLayouts from './dashboard/Congregationaddlayout';
import ProlistLayouts from './dashboard/Provincelistlayout';
import ProeditLayouts from './dashboard/Provinceeditlayout';
import ProaddLayouts from './dashboard/Provinceaddlayout';
import PrivateRoutes, { UserPrivate } from "./login/forms/private";
import User from './login/forms/User';

import ProjectstatusLayouts from './dashboard/projectstatuslayout';
import ProjectstatusaddLayouts from './dashboard/Projectstatusaddlayout';
import ProjectstatuseditLayouts from './dashboard/Projectstatuseditlayout';
import PaymentlistFile from './dashboard/PaymentlistFile';
import PaymentCreateFile from './dashboard/PaymentCreateFile';
import PaymentEditFile from './dashboard/PaymentEditFile';
import PaymentViewFile from './dashboard/PaymentViewFile';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Layoutsland />} />
        <Route exact path="/Religio/Demo" element={<Layoutsdemo />} />
        <Route exact path="/Religio/Blog" element={<Layoutsblog />} />

        <Route path='/login' element={<Login />}></Route>
        <Route element={<UserPrivate />}>
          <Route path='/UserPage' element={<User />}></Route>
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/register' element={<Register />}></Route>
          <Route exact path="/Religio/Dashboard" element={<DashLayouts />}></Route>
          <Route exact path="/Religio/Dashboard" element={<DashLayouts />} />
          <Route exact path="/Religio/ClientRegistration" element={<RegLayouts />} />
          <Route exact path="/Religio/Clientregistration/Edit/:id" element={<RegeditLayouts />} />
          <Route exact path="/Religio/Clientregistration/Add" element={<RegaddLayouts />} />
          <Route exact path="/Religio/Congregation" element={<ConglistLayouts />} />
          <Route exact path="/Religio/Congregation/Edit/:id" element={<CongeditLayouts />} />
          <Route exact path="/Religio/Congregation/Add" element={<CongaddLayouts />} />
          <Route exact path="/Religio/Province" element={<ProlistLayouts />} />
          <Route exact path="/Religio/Province/Edit/:id" element={<ProeditLayouts />} />
          <Route exact path="/Religio/Province/Add" element={<ProaddLayouts />} />
          <Route exact path="/Religio/ProjectstatusLayouts" element={<ProjectstatusLayouts />} />
          <Route exact path="/Religio/ProjectstatusAdd" element={< ProjectstatusaddLayouts />} />
          <Route exact path="/Religio/ProjectstatusEdit/:id" element={< ProjectstatuseditLayouts />} />
          <Route exact path="/Religio/PaymentStatus" element={<PaymentlistFile />} />
          <Route exact path="/Religio/PaymentCreate" element={<PaymentCreateFile />} />
          <Route exact path="/Religio/Payment/Edit/:id" element={<PaymentEditFile/>} />
          <Route exact path="/Religio/Payment/View/:id" element={<PaymentViewFile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
