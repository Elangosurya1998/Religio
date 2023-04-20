import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Main from "./includes/Main";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import CongregationCreate from "./pages/Congregation/CongregationCreate";

function CongaddLayouts() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <CongregationCreate/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default CongaddLayouts;