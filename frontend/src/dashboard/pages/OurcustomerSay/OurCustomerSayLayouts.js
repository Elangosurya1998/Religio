import Navbar from "../../includes/Navbar";
import Sidemenubar from "../../includes/Sidemenubar";
import Footer from "../../includes/Footer";

import { useLocation } from "react-router-dom";

import OurCustomerSayList from "./includes/OurCustomerSayList";
import OurCustomerSayCreate from "./includes/OurCustomerSayCreate";
import OurCustomerSayEdit from "./includes/OurCustomerSayEdit";
import OurCustomerSayView from "./includes/OurCustomerSayView";

function OurCustomerSayLayouts() {

    const { pathname } = useLocation();

    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
                <Sidemenubar />
                <div className="main-panel">
                    {pathname == "/Religio/HomeSections/OurCustomerSay" && <OurCustomerSayList />}
                    {pathname == "/Religio/HomeSections/OurCustomerSay/Create" && <OurCustomerSayCreate />}
                    {pathname.includes('/Religio/HomeSections/OurCustomerSay/Edit/') && <OurCustomerSayEdit />}
                    {pathname.includes('/Religio/HomeSections/OurCustomerSay/View/') && <OurCustomerSayView />}
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default OurCustomerSayLayouts;