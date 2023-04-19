import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Main from "./includes/Main";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import ClientregistrationList from "./pages/clientregistration/clientregistrationList";

function RegLayouts() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <ClientregistrationList />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default RegLayouts;