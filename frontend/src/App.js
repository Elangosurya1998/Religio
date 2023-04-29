import { Route } from 'react-router'
import { BrowserRouter, Routes } from "react-router-dom";
import Login from "./login/forms/Login";
import Register from "./login/forms/Register";
import DashLayouts from "./dashboard/Layoutsdash";
import Layoutsland from "./landing/Layoutsland";
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
import PrivateRoutes from "./login/forms/private";

import ProjectstatusLayouts from './dashboard/projectstatuslayout';
import ProjectstatusaddLayouts from './dashboard/Projectstatusaddlayout';
import ProjectstatuseditLayouts from './dashboard/Projectstatuseditlayout';
import PaymentlistFile from './dashboard/PaymentlistFile';
import PaymentCreateFile from './dashboard/PaymentCreateFile';
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






function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layoutsland />} />
        <Route exact path="/Religio/Demo" element={<Layoutsdemo />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route element={<PrivateRoutes />}>

          <Route exact path="/Religio/Dashboard" element={<DashLayouts />}></Route>
          <Route exact path="/Religio/Dashboard" element={<DashLayouts />} />
          <Route exact path="/Religio/ClientRegistration" element={<RegLayouts />} />
          <Route exact path="/Religio/ClientregistrationEdit/:id" element={<RegeditLayouts />} />
          <Route exact path="/Religio/RegistrationAdd" element={<RegaddLayouts />} />
          <Route exact path="/Religio/Congregation" element={<ConglistLayouts />} />
          <Route exact path="/Religio/CongregationEdit/:id" element={<CongeditLayouts />} />
          <Route exact path="/Religio/CongregationAdd" element={<CongaddLayouts />} />
          <Route exact path="/Religio/Province" element={<ProlistLayouts />} />
          <Route exact path="/Religio/ProvinceEdit/:id" element={<ProeditLayouts />} />
          <Route exact path="/Religio/ProvinceAdd" element={<ProaddLayouts />} />

          <Route exact path="/Religio/Projectstatus" element={<ProjectstatusLayouts />} />
          <Route exact path="/Religio/ProjectstatusAdd" element={< ProjectstatusaddLayouts />} />
          <Route exact path="/Religio/ProjectstatusEdit/:id" element={< ProjectstatuseditLayouts />} />
          <Route exact path="/Religio/PaymentStatus" element={<PaymentlistFile />} />
          <Route exact path="/Religio/PaymentCreate" element={<PaymentCreateFile />} />

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

          <Route exact path="/Religio/onlineedit/:id" element={< Onlinestatusedit />} />

          <Route exact path="/Religio/onsiteedit/:id" element={< Onsitetredit />} />
   


      



        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
