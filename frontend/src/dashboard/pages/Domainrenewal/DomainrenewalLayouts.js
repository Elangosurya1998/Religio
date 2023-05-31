import Navbar from "../../includes/Navbar";
import Sidemenubar from "../../includes/Sidemenubar";
import Footer from "../../includes/Footer";

import { useLocation } from "react-router-dom";

import DomainrenewalList from "./includes/DomainrenewalList";
import DomainrenewalCreate from "./includes/DomainrenewalCreate";
import DomainrenewalEdit from "./includes/DomainrenewalEdit";
import DomainrenewalView from "./includes/DomainrenewalView";

function DomainRenewalLayouts() {
  const { pathname } = useLocation();

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidemenubar />
        <div className="main-panel">
          {pathname == "/Religio/DomainRenewal" && <DomainrenewalList />}
          {pathname == "/Religio/DomainRenewal/Create" && (
            <DomainrenewalCreate />
          )}
          {pathname.includes("/Religio/DomainRenewal/Edit/") && (
            <DomainrenewalEdit />
          )}
          {pathname.includes("/Religio/DomainRenewal/View/") && (
            <DomainrenewalView />
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default DomainRenewalLayouts;
