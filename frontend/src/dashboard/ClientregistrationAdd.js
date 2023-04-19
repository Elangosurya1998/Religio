import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Main from "./includes/Main";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import ClientRegistrationEdit from "./pages/clientregistration/clientregistrationEdit";
import ClientRegistrationCreate from "./pages/clientregistration/clientregistrationCreate";

function RegaddLayouts() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                   <ClientRegistrationCreate/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default RegaddLayouts;