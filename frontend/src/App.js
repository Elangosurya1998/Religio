import { Switch, Route } from 'react-router'
import { BrowserRouter, createBrowserRouter, RouterProvider, Routes } from "react-router-dom";

import DashLayouts from "./dashboard/Layoutsdash";
import Layoutsland from "./landing/Layoutsland";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layoutsland/>}/>
        <Route exact path="/Religio/Dashboard" element={<DashLayouts/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
