import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Main from "./includes/Main";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import ClientRegistrationViews from "./pages/clientregistration/clientregistrationView";

function RegViewLayouts() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <ClientRegistrationViews />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default RegViewLayouts;