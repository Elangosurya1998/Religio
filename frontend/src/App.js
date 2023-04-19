import { Switch, Route } from 'react-router'
import { BrowserRouter, createBrowserRouter, RouterProvider, Routes } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route exact path="/" element={<Layoutsland/>}/>
        <Route exact path="/Religio/Dashboard" element={<DashLayouts/>}/>
        <Route exact path="/Religio/ClientRegistration" element={<RegLayouts />}/>
        <Route exact path="/Religio/ClientregistrationEdit/:id" element={<RegeditLayouts/>}/>
        <Route exact path="/Religio/RegistrationAdd" element={<RegaddLayouts/>}/>
        <Route exact path="/Religio/Congregation" element={<ConglistLayouts />}/>
        <Route exact path="/Religio/CongregationEdit/:id" element={<CongeditLayouts />}/>
        <Route exact path="/Religio/CongregationAdd" element={<CongaddLayouts/>}/>
        <Route exact path="/Religio/Province" element={<ProlistLayouts />}/>
        <Route exact path="/Religio/ProvinceEdit/:id" element={<ProeditLayouts />}/>
        <Route exact path="/Religio/ProvinceAdd" element={<ProaddLayouts/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
