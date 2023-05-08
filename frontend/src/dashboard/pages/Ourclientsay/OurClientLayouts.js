import Navbar from "../../includes/Navbar";
import Sidemenubar from "../../includes/Sidemenubar";
import Footer from "../../includes/Footer";

import { useLocation } from "react-router-dom";

import OurclientList from "./includes/OurclientList";
import OurclientCreate from "./includes/OurclientCreate";
import OurclientEdit from "./includes/OurclientEdit";
import OurclientView from "./includes/OurclientView";



function OurClientLayouts() {

    const { pathname } = useLocation();

    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
                <Sidemenubar />
                <div className="main-panel">
                    {pathname == "/Religio/HomeSections/OurClient" && <OurclientList />}
                    {pathname == "/Religio/HomeSections/OurClient/Create" && <OurclientCreate />}
                    {pathname == "" && <OurclientEdit />}
                    {pathname == "" && <OurclientView />}
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default OurClientLayouts;