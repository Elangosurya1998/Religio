import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Main from "./includes/Main";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import Iosdatacreate from "./pages/Ios/IosCreate";



function Iosadd() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <Iosdatacreate/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Iosadd;