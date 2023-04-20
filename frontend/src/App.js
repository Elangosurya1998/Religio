import { Route } from 'react-router'
import { BrowserRouter,Routes } from "react-router-dom";
import Login from "./login/forms/Login";
import Register from "./login/forms/Register";
import DashLayouts from "./dashboard/Layoutsdash";
import Layoutsland from "./landing/Layoutsland";
import PrivateRoutes from './login/forms/private';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layoutsland/>}/>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
      <Routes>
        <Route element={<PrivateRoutes />}>
        <Route exact path="/Religio/Dashboard" element={<DashLayouts/>}></Route>
      </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
