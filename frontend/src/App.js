import { Route } from 'react-router'
import { BrowserRouter, Routes } from "react-router-dom";
import Login from "./login/forms/Login";
import Register from "./login/forms/Register";
import DashLayouts from "./dashboard/Layoutsdash";
import Layoutsland from "./landing/Layoutsland";
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

import ScrolltoTop from "./landing/ScrollToTop";
import UsersList from './dashboard/UsersList';
import UsersListedit from './dashboard/UserListedit';
import UserCreate from './dashboard/UserCreate';
import ForgetPassword from './login/forms/Forget';
import ResetPassword from './login/forms/Reset';
import CongViewLayouts from './dashboard/CongregationViewlayout';
import ProViewLayouts from './dashboard/ProvinceViewlayout';
import RegViewLayouts from './dashboard/ClientregistrationView';

import Memberdataadd from './dashboard/Memberdataadd';
import Memberdata from './dashboard/Memberdata';
import Memberdataedit from './dashboard/Memberdataedit';
import Tabdata from './dashboard/Tab';
import 'react-tabs/style/react-tabs.css';
import HouseList from './dashboard/pages/Housecommunity/HousecommunityList';
import Housecommunityadd from './dashboard/Housecommunityadd';
import Housecommunityedit from './dashboard/Housecommunityedit';
import MobileappList from './dashboard/pages/Mobileapp/MobileappList';
import Mobileappadd from './dashboard/Mobileappadd';
import Mobileappedit from './dashboard/Mobileappedit';
import IosList from './dashboard/pages/Ios/IosList';
import Iosadd from './dashboard/Iosadd';
import Iosedit from './dashboard/Iosedit';
import TrainningstatusList from './dashboard/pages/Trainningstatus/TrainningstatusList';
import Trainningstatusadd from './dashboard/Trainningstatusadd';

import Onlinestatusedit from './dashboard/Olinetredit';
import Onsitetredit from './dashboard/Onsitetredit';
import OurClientLayouts from './dashboard/pages/Ourclientsay/OurClientLayouts';
import Datasupportadd from './dashboard/Datasupportadd';
import Datasupportedit from './dashboard/Datasupportedit';




function App() {
  return (
    <BrowserRouter>
      <ScrolltoTop />
      <Routes>
        <Route exact path="/" element={<Layoutsland />} />
        <Route exact path="/Religio/Demo" element={<Layoutsland />} />
        <Route exact path="/Religio/Blog" element={<Layoutsland />} />
        <Route path='/forget' element={<ForgetPassword />} />
        <Route path='/reset' element={<ResetPassword />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />} />
        <Route element={<UserPrivate />}>
          <Route path='/UserPage' element={<User />}></Route>
          <Route exact path="/Religio/Congregation" element={<ConglistLayouts />} />
          <Route exact path="/Religio/Congregation/View/:id" element={<CongViewLayouts />} />
          <Route exact path="/Religio/Province" element={<ProlistLayouts />} />
          <Route exact path="/Religio/Province/View/:id" element={<ProViewLayouts />} />
          <Route exact path="/Religio/ClientRegistration" element={<RegLayouts />} />
          <Route exact path="/Religio/Clientregistration/View/:id" element={<RegViewLayouts />} />
          <Route exact path="/Religio/PaymentStatus" element={<PaymentlistFile />} />
          <Route exact path="/Religio/Payment/View/:id" element={<PaymentViewFile />} />
          <Route exact path="/Religio/ProjectstatusLayouts" element={<ProjectstatusLayouts />} />
          <Route exact path="/Religio/UsersList" element={<UsersList />} />
          <Route exact path="/Religio/Tab" element={< Tabdata />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="/Religio/UserCreate" element={<UserCreate />} />
          <Route exact path="/Religio/UsersList" element={<UsersList />} />
          <Route exact path="/Religio/UserListEdit/:id" element={<UsersListedit />} />
          <Route exact path="/Religio/Dashboard" element={<DashLayouts />} />
          <Route exact path="/Religio/ClientRegistration" element={<RegLayouts />} />
          <Route exact path="/Religio/Clientregistration/Edit/:id" element={<RegeditLayouts />} />
          <Route exact path="/Religio/Clientregistration/View/:id" element={<RegViewLayouts />} />
          <Route exact path="/Religio/Clientregistration/Add" element={<RegaddLayouts />} />
          <Route exact path="/Religio/Congregation" element={<ConglistLayouts />} />
          <Route exact path="/Religio/Congregation/Edit/:id" element={<CongeditLayouts />} />
          <Route exact path="/Religio/Congregation/View/:id" element={<CongViewLayouts />} />
          <Route exact path="/Religio/Congregation/Add" element={<CongaddLayouts />} />
          <Route exact path="/Religio/Province" element={<ProlistLayouts />} />
          <Route exact path="/Religio/Province/Edit/:id" element={<ProeditLayouts />} />
          <Route exact path="/Religio/Province/View/:id" element={<ProViewLayouts />} />
          <Route exact path="/Religio/Province/Add" element={<ProaddLayouts />} />
          <Route exact path="/Religio/Payment/Edit/:id" element={<PaymentEditFile />} />
          <Route exact path="/Religio/Payment/View/:id" element={<PaymentViewFile />} />
          <Route exact path="/Religio/Projectstatus" element={<ProjectstatusLayouts />} />
          <Route exact path="/Religio/ProjectstatusAdd" element={< ProjectstatusaddLayouts />} />
          <Route exact path="/Religio/ProjectstatusEdit/:id" element={< ProjectstatuseditLayouts />} />
          <Route exact path="/Religio/PaymentStatus" element={<PaymentlistFile />} />
          <Route exact path="/Religio/PaymentCreate" element={<PaymentCreateFile />} />
          <Route exact path="/Religio/Payment/Edit/:id" element={<PaymentEditFile />} />
          <Route exact path="/Religio/Payment/View/:id" element={<PaymentViewFile />} />

          <Route exact path="/Religio/Memberdata" element={<Memberdata />} />
          <Route exact path="/Religio/Memberdataadd" element={< Memberdataadd />} />
          <Route exact path="/Religio/MemberdataEdit/:id" element={< Memberdataedit />} />

          <Route exact path="/Religio/Tab" element={< Tabdata />} />
          <Route exact path="/Religio/Housecommunity" element={< HouseList />} />
          <Route exact path="/Religio/Housecommunityadd" element={< Housecommunityadd />} />
          <Route exact path="/Religio/HousecommunityEdit/:id" element={< Housecommunityedit />} />
          <Route exact path="/Religio/MobileappList" element={< MobileappList />} />
          <Route exact path="/Religio/Mobileappadd" element={< Mobileappadd />} />
          <Route exact path="/Religio/Mobileappedit/:id" element={< Mobileappedit />} />
          <Route exact path="/Religio/IosList" element={< IosList />} />
          <Route exact path="/Religio/Iosadd" element={< Iosadd />} />
          <Route exact path="/Religio/Iosedit/:id" element={< Iosedit />} />
          <Route exact path="/Religio/Trainningstatus" element={< TrainningstatusList />} />
          <Route exact path="/Religio/Trainningstatusadd" element={< Trainningstatusadd />} />

          <Route exact path="/Religio/Datasupportadd" element={< Datasupportadd />} />
          <Route exact path="/Religio/DatasupportEdit/:id" element={< Datasupportedit />} />

          <Route exact path="/Religio/onlineedit/:id" element={< Onlinestatusedit />} />
         

          <Route exact path="/Religio/onsiteedit/:id" element={< Onsitetredit />} />

          <Route exact path="/Religio/HomeSections/OurClient" element={<OurClientLayouts />} />
          <Route exact path="/Religio/HomeSections/OurClient/Edit/:id" element={<OurClientLayouts />} />
          <Route exact path="/Religio/HomeSections/OurClient/View/:id" element={<OurClientLayouts />} />
          <Route exact path="/Religio/HomeSections/OurClient/Create" element={<OurClientLayouts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
