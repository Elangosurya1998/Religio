import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import MemberdataList from "./pages/Memberdata/MemberdataList";


function Memberdata() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <MemberdataList />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Memberdata;